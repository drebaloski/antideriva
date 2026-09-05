import katex from "katex";
import { splitMathSegments } from "~/lib/math-text";

function renderLatex(latex: string): string {
  try {
    return katex.renderToString(latex, { throwOnError: false, output: "html" });
  } catch {
    return latex;
  }
}

/**
 * Renders question text that mixes prose with plain-text math notation
 * (e.g. "√(x + 4)", "x⁻²"), typesetting the math parts with KaTeX so
 * radicals, fractions, and exponents render properly instead of relying on
 * unicode glyphs that don't stretch to fit their argument.
 */
export function MathText({ text }: { text: string }) {
  const segments = splitMathSegments(text);
  return (
    <>
      {segments.map((segment, i) =>
        segment.type === "text" ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: segments are a stable, order-only split of static text
          <span key={i}>{segment.value}</span>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: segments are a stable, order-only split of static text
          <span key={i}>
            <span
              className="whitespace-normal"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: output is from KaTeX's own renderer, not user input
              dangerouslySetInnerHTML={{ __html: renderLatex(segment.latex) }}
            />
            {segment.trailingText}
          </span>
        ),
      )}
    </>
  );
}
