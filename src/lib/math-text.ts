// The question bank writes math inline as plain unicode text (e.g. "√(x + 4)",
// "x⁻²", "∫₀ˣ"). That's fine for storage, but unicode glyphs like √ have no
// bar that stretches over their argument, so nested expressions render
// ambiguously. This module converts those runs into real LaTeX so they can
// be typeset with KaTeX, while leaving surrounding prose as plain text.

const SUPERSCRIPT_MAP: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁺": "+",
  "⁻": "-",
  ⁿ: "n",
  ⁱ: "i",
  ˣ: "x",
  "⁽": "(",
  "⁾": ")",
};

const SUBSCRIPT_MAP: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "₋": "-",
  ₐ: "a",
};

const SYMBOL_MAP: Record<string, string> = {
  "×": "\\times",
  "÷": "\\div",
  "±": "\\pm",
  "·": "\\cdot",
  "≤": "\\le",
  "≥": "\\ge",
  "≠": "\\neq",
  "≈": "\\approx",
  "→": "\\to",
  "−": "-",
  "∞": "\\infty",
  π: "\\pi",
  "∫": "\\int",
  "°": "^\\circ",
};

const FUNCTION_NAMES = [
  "arcsin",
  "arccos",
  "arctan",
  "sin",
  "cos",
  "tan",
  "sec",
  "csc",
  "cot",
  "ln",
  "log",
  "lim",
  "exp",
  "min",
  "max",
];
const FUNCTION_NAME_SET = new Set(FUNCTION_NAMES);
const FUNCTION_NAME_RE = new RegExp(`\\b(${FUNCTION_NAMES.join("|")})\\b`, "g");

const SUPER_RUN_RE = /[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿⁱˣ⁽⁾]+/g;
const SUB_RUN_RE = /[₀₁₂₃₄₅₆₇₈₉₋ₐ]+/g;

function mapRun(run: string, table: Record<string, string>): string {
  return [...run].map((c) => table[c] ?? "").join("");
}

function convertScripts(s: string): string {
  return s
    .replace(SUPER_RUN_RE, (m) => `^{${mapRun(m, SUPERSCRIPT_MAP)}}`)
    .replace(SUB_RUN_RE, (m) => `_{${mapRun(m, SUBSCRIPT_MAP)}}`);
}

/** Finds the index of the bracket matching the opener at `openIndex`. */
function findClosing(s: string, openIndex: number): number {
  const open = s[openIndex];
  const close = open === "(" ? ")" : open === "[" ? "]" : "}";
  let depth = 1;
  for (let k = openIndex + 1; k < s.length; k++) {
    if (s[k] === open) depth++;
    else if (s[k] === close) depth--;
    if (depth === 0) return k;
  }
  return -1;
}

/** Turns "√(...)" / "√x" into "\sqrt{...}" so the radical bar spans its argument. */
function convertSqrt(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "√") {
      out += s[i];
      continue;
    }
    const next = s[i + 1];
    if (next === "(" || next === "[") {
      const end = findClosing(s, i + 1);
      if (end !== -1) {
        out += `\\sqrt{${convertSqrt(s.slice(i + 2, end))}}`;
        i = end;
        continue;
      }
    }
    let k = i + 1;
    while (k < s.length && /[a-zA-Z0-9]/.test(s[k] ?? "")) k++;
    out += `\\sqrt{${s.slice(i + 1, k)}}`;
    i = k - 1;
  }
  return out;
}

/**
 * Turns explicit "^(...)" exponents into "^{...}". LaTeX's "^" only raises
 * the single token/group right after it, so a bare "^(1/2)" would only
 * superscript the opening paren — braces are required to raise the whole group.
 */
function convertCaretGroups(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "^" && s[i + 1] === "(") {
      const end = findClosing(s, i + 1);
      if (end !== -1) {
        out += `^{${s.slice(i + 2, end)}}`;
        i = end;
        continue;
      }
    }
    out += s[i];
  }
  return out;
}

/** Walks backward from the end of `out` to grab the operand of a "/". */
function extractLeftOperand(out: string): { operand: string; rest: string } {
  const end = out.length;
  if (end === 0) return { operand: "", rest: out };
  const last = out[end - 1];
  if (last === "}" || last === ")" || last === "]") {
    const openChar = last === "}" ? "{" : last === ")" ? "(" : "[";
    let depth = 1;
    let k = end - 2;
    while (k >= 0 && depth > 0) {
      if (out[k] === last) depth++;
      else if (out[k] === openChar) depth--;
      k--;
    }
    const start = k + 1;
    let cmdStart = start;
    while (cmdStart > 0 && /[a-zA-Z]/.test(out[cmdStart - 1] ?? "")) cmdStart--;
    if (cmdStart > 0 && out[cmdStart - 1] === "\\") cmdStart--;
    return { operand: out.slice(cmdStart, end), rest: out.slice(0, cmdStart) };
  }
  let k = end - 1;
  while (k >= 0 && /[a-zA-Z0-9.]/.test(out[k] ?? "")) k--;
  return { operand: out.slice(k + 1, end), rest: out.slice(0, k + 1) };
}

/** Walks forward from `start` (just past a "/") to grab the other operand. */
function extractRightOperand(
  s: string,
  start: number,
): { operand: string; next: number } {
  if (start >= s.length) return { operand: "", next: start };
  const ch = s[start];
  if (ch === "(" || ch === "[") {
    const end = findClosing(s, start);
    if (end !== -1) return { operand: s.slice(start, end + 1), next: end + 1 };
  }
  let k = start;
  while (k < s.length && /[a-zA-Z0-9.]/.test(s[k] ?? "")) k++;
  return { operand: s.slice(start, k), next: k };
}

/** Turns "a/b" into "\frac{a}{b}" so division renders as a stacked fraction. */
function convertFractions(s: string): string {
  let out = "";
  let i = 0;
  while (i < s.length) {
    if (s.startsWith("\\text{", i)) {
      const braceStart = i + "\\text".length;
      const end = findClosing(s, braceStart);
      const stop = end === -1 ? s.length : end + 1;
      out += s.slice(i, stop);
      i = stop;
      continue;
    }
    if (s[i] === "/") {
      const { operand: left, rest } = extractLeftOperand(out);
      const { operand: right, next } = extractRightOperand(s, i + 1);
      if (left && right) {
        out = `${rest}\\frac{${left}}{${right}}`;
        i = next;
        continue;
      }
    }
    out += s[i];
    i++;
  }
  return out;
}

function convertSymbols(s: string): string {
  let out = "";
  for (const ch of s) {
    out += ch in SYMBOL_MAP ? `${SYMBOL_MAP[ch]} ` : ch;
  }
  return out;
}

function convertFunctionNames(s: string): string {
  return s.replace(FUNCTION_NAME_RE, (name) => `\\${name}`);
}

/** Full pipeline for a run of tokens already identified as "math". */
function convertMathRun(raw: string): string {
  let s = raw;
  s = convertScripts(s);
  s = convertSqrt(s);
  s = convertCaretGroups(s);
  s = convertFractions(s);
  s = convertSymbols(s);
  s = convertFunctionNames(s);
  return s;
}

const MATH_CHAR_RE =
  /[0-9√≤≥≠≈→∞∫π×÷±°·^_=+<>(){}[\]/¹²³⁰⁴⁵⁶⁷⁸⁹⁻⁺ⁿⁱˣ⁽⁾₀₁₂₃₄₅₆₇₈₉₋ₐ−]/;
const WORDY_SINGLE_LETTERS = new Set(["a", "A", "I"]);

function splitPunct(tok: string): {
  lead: string;
  core: string;
  trail: string;
} {
  const m = /^([("'[]*)([\s\S]*?)([)"'\].,!?;:]*)$/.exec(tok);
  if (!m) return { lead: "", core: tok, trail: "" };
  return { lead: m[1] ?? "", core: m[2] ?? "", trail: m[3] ?? "" };
}

/** Is this whitespace-delimited token, on its own, clearly math notation? */
function isMathToken(tok: string): boolean {
  const { core } = splitPunct(tok);
  if (core === "") return false;
  if (MATH_CHAR_RE.test(tok)) return true;
  if (FUNCTION_NAME_SET.has(core.toLowerCase())) return true;
  if (/^d[a-zA-Z]$/.test(core)) return true; // differentials: dx, dy, dt...
  if (/^[a-zA-Z]'{1,2}$/.test(core)) return true; // derivative notation: f', g''
  if (/^[a-zA-Z]$/.test(core) && !WORDY_SINGLE_LETTERS.has(core)) return true;
  return false;
}

function escapeLatexText(s: string): string {
  return s.replace(/([&%$#_{}])/g, "\\$1");
}

interface RunToken {
  kind: "math" | "word";
  lead: string;
  core: string;
  trail: string;
}

function isBareNumber(tok: RunToken): boolean {
  return tok.kind === "math" && /^[+-]?\d+(\.\d+)?$/.test(tok.core);
}

/** Renders a forced-in-math English word as \text{...}, keeping punctuation literal. */
function renderRunToken(tok: RunToken): string {
  if (tok.kind === "word") {
    return `${tok.lead}\\text{${escapeLatexText(tok.core)}}${tok.trail}`;
  }
  return `${tok.lead}${tok.core}${tok.trail}`;
}

export interface TextSegment {
  type: "text";
  value: string;
}
export interface MathSegment {
  type: "math";
  latex: string;
  /** Sentence-ending punctuation trailing the run (e.g. ".", "?") kept as plain text. */
  trailingText: string;
}
export type MathTextSegment = TextSegment | MathSegment;

/**
 * Splits mixed prose + math text into segments, converting math runs into
 * LaTeX. Parenthesized/bracketed spans are tracked so a stray English word
 * inside a math expression's grouping (e.g. "(assuming x ≠ 0)") still gets
 * folded into that math run — as \text{...} — instead of breaking it apart.
 */
export function splitMathSegments(text: string): MathTextSegment[] {
  const parts = text.split(/(\s+)/);
  const segments: MathTextSegment[] = [];
  let mathBuf: RunToken[] = [];
  let textBuf: string[] = [];
  let depth = 0;
  let pendingSpace = "";

  function flushText() {
    if (textBuf.length) {
      segments.push({ type: "text", value: textBuf.join("") });
      textBuf = [];
    }
  }
  function flushMath() {
    if (mathBuf.length) {
      let raw = "";
      for (let i = 0; i < mathBuf.length; i++) {
        const tok = mathBuf[i];
        if (!tok) continue;
        if (i > 0) {
          const prev = mathBuf[i - 1];
          // KaTeX puts zero space between two bare "ordinary" atoms, so a
          // run of plain numbers (e.g. a data table's rows) would otherwise
          // render mashed together with no gap at all.
          const bothBareNumbers =
            prev && isBareNumber(prev) && isBareNumber(tok);
          raw +=
            prev?.kind === "word" || tok.kind === "word" || bothBareNumbers
              ? "\\ "
              : " ";
        }
        raw += renderRunToken(tok);
      }
      mathBuf = [];
      // Sentence punctuation trailing the run (e.g. "F(3)?", "= 3.") reads
      // oddly typeset in KaTeX's math font, so keep it as plain text.
      const trailingMatch = /[.,!?;:]+$/.exec(raw);
      const trailingText = trailingMatch?.[0] ?? "";
      const mathSource = trailingText
        ? raw.slice(0, raw.length - trailingText.length)
        : raw;
      if (mathSource.trim()) {
        segments.push({
          type: "math",
          latex: convertMathRun(mathSource),
          trailingText,
        });
      } else if (trailingText) {
        segments.push({ type: "text", value: trailingText });
      }
    }
  }

  for (const piece of parts) {
    if (piece === "") continue;
    if (/^\s+$/.test(piece)) {
      if (piece.includes("\n")) {
        // A line break (e.g. between rows of a plain-text data table) is a
        // hard boundary: never let a math run swallow it, since KaTeX
        // collapses whitespace and would crush multi-line content onto one
        // unreadable line.
        flushText();
        flushMath();
        depth = 0;
        segments.push({ type: "text", value: piece });
      } else {
        pendingSpace = piece;
      }
      continue;
    }

    const forced = depth > 0;
    const mathy = forced || isMathToken(piece);

    for (const ch of piece) {
      if (ch === "(" || ch === "[") depth++;
      else if (ch === ")" || ch === "]") depth = Math.max(0, depth - 1);
    }

    if (mathy) {
      flushText();
      if (mathBuf.length === 0 && pendingSpace) {
        segments.push({ type: "text", value: pendingSpace });
      }
      const isWordy = !isMathToken(piece); // forced-in-math only, not genuinely mathy
      mathBuf.push({ ...splitPunct(piece), kind: isWordy ? "word" : "math" });
    } else {
      flushMath();
      if (textBuf.length === 0 && pendingSpace) {
        textBuf.push(pendingSpace);
      } else if (textBuf.length > 0) {
        textBuf.push(pendingSpace);
      }
      textBuf.push(piece);
    }
    pendingSpace = "";
  }
  flushText();
  flushMath();
  return segments;
}
