export interface McChoice {
  label: string;
  text: string;
}

export interface PracticeQuestion {
  id: string;
  chapter: string;
  type: "mc" | "frq";
  calculatorAllowed: boolean;
  prompt: string;
  choices?: McChoice[];
  correctChoice?: string;
  explanation: string;
}

// Unit 1: Limits and Continuity. Chapter names match the chapters in
// src/lib/units.ts for Unit 1 so questions can be grouped correctly.
const UNIT_1_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u1-c1-q1",
    chapter: "Estimating limits from graphs and tables",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "The table below shows values of f(x) near x = 1.\n\n" +
      "x:     0.9    0.99   0.999  1.001  1.01   1.1\n" +
      "f(x):  2.71   2.97   2.997  3.003  3.03   3.31\n\n" +
      "Based on the table, what is a reasonable estimate for lim(x→1) f(x)?",
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "2.997" },
      { label: "C", text: "3" },
      { label: "D", text: "The limit does not exist." },
    ],
    correctChoice: "C",
    explanation:
      "As x approaches 1 from both sides, f(x) gets closer and closer to 3 " +
      "(2.71, 2.97, 2.997, ... from the left and 3.31, 3.03, 3.003, ... from " +
      "the right). Since both sides trend toward the same value, lim(x→1) " +
      "f(x) ≈ 3.",
  },
  {
    id: "u1-c1-q2",
    chapter: "Estimating limits from graphs and tables",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "The graph of g consists of the line y = x + 1 for x < 2, a single " +
      "isolated point at (2, 5), and the line y = 3x − 3 for x > 2. What is " +
      "lim(x→2) g(x)?",
    choices: [
      { label: "A", text: "3" },
      { label: "B", text: "5" },
      { label: "C", text: "The limit does not exist because g(2) = 5." },
      {
        label: "D",
        text: "The limit does not exist because the two pieces are different lines.",
      },
    ],
    correctChoice: "A",
    explanation:
      "From the left, y = x + 1 approaches 2 + 1 = 3 as x → 2⁻. From the " +
      "right, y = 3x − 3 approaches 3(2) − 3 = 3 as x → 2⁺. Both one-sided " +
      "limits equal 3, so lim(x→2) g(x) = 3. The isolated point g(2) = 5 " +
      "affects the function's value at x = 2, not the limit — a limit " +
      "describes what g(x) approaches, not what g(2) actually is.",
  },
  {
    id: "u1-c1-q3",
    chapter: "Estimating limits from graphs and tables",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Let h(x) = sin(x)/x.\n\n" +
      "(a) Use your calculator to evaluate h(x) at x = ±0.1, ±0.01, and " +
      "±0.001 (round to five decimal places), and organize your results in " +
      "a table.\n" +
      "(b) Based on your table, estimate lim(x→0) h(x).\n" +
      "(c) Explain why a table of values only provides an estimate of a " +
      "limit, not a proof of its value.",
    explanation:
      "(a) h(±0.1) ≈ 0.99833, h(±0.01) ≈ 0.99998, h(±0.001) ≈ 0.9999998 — " +
      "all rounding toward the same value from both sides.\n" +
      "(b) The table suggests lim(x→0) h(x) = 1.\n" +
      "(c) A table only samples finitely many points near x = 0. It cannot " +
      "confirm what happens at every point arbitrarily close to 0, so it's " +
      "possible (in principle) for a function to behave erratically between " +
      "sampled points or to approach a different value than the trend " +
      "suggests. A table is strong evidence for a limit, not a guarantee.",
  },
  {
    id: "u1-c2-q1",
    chapter: "Algebraic techniques for evaluating limits",
    type: "mc",
    calculatorAllowed: false,
    prompt: "lim(x→3) (x² − 9)/(x − 3) =",
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "3" },
      { label: "C", text: "6" },
      { label: "D", text: "The limit does not exist." },
    ],
    correctChoice: "C",
    explanation:
      "Factor the numerator: (x² − 9)/(x − 3) = (x − 3)(x + 3)/(x − 3). For " +
      "x ≠ 3, this simplifies to x + 3. So lim(x→3) (x² − 9)/(x − 3) = " +
      "lim(x→3) (x + 3) = 6.",
  },
  {
    id: "u1-c2-q2",
    chapter: "Algebraic techniques for evaluating limits",
    type: "mc",
    calculatorAllowed: false,
    prompt: "lim(x→0) (√(x + 4) − 2)/x =",
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "1/4" },
      { label: "C", text: "1/2" },
      { label: "D", text: "The limit does not exist." },
    ],
    correctChoice: "B",
    explanation:
      "Multiply numerator and denominator by the conjugate √(x + 4) + 2: " +
      "[(√(x + 4) − 2)(√(x + 4) + 2)] / [x(√(x + 4) + 2)] = " +
      "(x + 4 − 4) / [x(√(x + 4) + 2)] = x / [x(√(x + 4) + 2)]. For x ≠ 0, " +
      "this simplifies to 1/(√(x + 4) + 2), which approaches 1/(2 + 2) = " +
      "1/4 as x → 0.",
  },
  {
    id: "u1-c2-q3",
    chapter: "Algebraic techniques for evaluating limits",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Evaluate lim(x→2) (x³ − 8)/(x² − 4). Show the algebraic steps that " +
      "justify your answer.",
    explanation:
      "Factor both the numerator and denominator: x³ − 8 = " +
      "(x − 2)(x² + 2x + 4), and x² − 4 = (x − 2)(x + 2). For x ≠ 2, the " +
      "expression simplifies to (x² + 2x + 4)/(x + 2). Substituting x = 2 " +
      "gives (4 + 4 + 4)/(2 + 2) = 12/4 = 3. So lim(x→2) (x³ − 8)/(x² − 4) " +
      "= 3.",
  },
  {
    id: "u1-c3-q1",
    chapter: "Limits involving infinity and asymptotic behavior",
    type: "mc",
    calculatorAllowed: false,
    prompt: "lim(x→∞) (3x² + 2x)/(5x² − 1) =",
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "3/5" },
      { label: "C", text: "1" },
      { label: "D", text: "∞" },
    ],
    correctChoice: "B",
    explanation:
      "The numerator and denominator have the same degree (2), so as " +
      "x → ∞ the limit equals the ratio of the leading coefficients: 3/5.",
  },
  {
    id: "u1-c3-q2",
    chapter: "Limits involving infinity and asymptotic behavior",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = (x + 1)/(x² − 1). Which statement correctly describes " +
      "the behavior of f near x = 1 and near x = −1?",
    choices: [
      {
        label: "A",
        text: "f has vertical asymptotes at both x = 1 and x = −1.",
      },
      {
        label: "B",
        text: "f has a vertical asymptote at x = 1 and a removable discontinuity (hole) at x = −1.",
      },
      {
        label: "C",
        text: "f has a removable discontinuity at x = 1 and a vertical asymptote at x = −1.",
      },
      {
        label: "D",
        text: "f has removable discontinuities at both x = 1 and x = −1.",
      },
    ],
    correctChoice: "B",
    explanation:
      "Factor: f(x) = (x + 1)/[(x − 1)(x + 1)] = 1/(x − 1) for x ≠ −1. At " +
      "x = −1, both the numerator and denominator are 0 — the factor " +
      "cancels, so f has a removable discontinuity (hole) there, not an " +
      "asymptote. At x = 1, the denominator (x − 1) is 0 but the numerator " +
      "(x + 1) equals 2, a nonzero value, so f has a true vertical " +
      "asymptote at x = 1.",
  },
  {
    id: "u1-c3-q3",
    chapter: "Limits involving infinity and asymptotic behavior",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Let f(x) = (2x³ − x)/(x³ + 1).\n\n" +
      "(a) Find lim(x→∞) f(x) algebraically.\n" +
      "(b) Use your calculator to evaluate f(10), f(100), and f(1000), and " +
      "explain how these values support your answer to part (a).\n" +
      "(c) Does the graph of f have a horizontal asymptote? If so, state " +
      "its equation.",
    explanation:
      "(a) The numerator and denominator both have degree 3, so the limit " +
      "equals the ratio of leading coefficients: lim(x→∞) f(x) = 2/1 = 2.\n" +
      "(b) f(10) = 1990/1001 ≈ 1.988, f(100) = 1,999,900/1,000,001 ≈ " +
      "1.9999, f(1000) ≈ 1.999999 — the values get closer and closer to 2 " +
      "as x grows, matching part (a).\n" +
      "(c) Yes. Since lim(x→∞) f(x) = 2 (and by symmetry of the algebra, " +
      "lim(x→−∞) f(x) = 2 as well), the graph has a horizontal asymptote " +
      "at y = 2.",
  },
  {
    id: "u1-c4-q1",
    chapter: "Continuity and identifying discontinuities",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = x² + k for x < 2 and f(x) = 3x − 1 for x ≥ 2. What value " +
      "of k makes f continuous at x = 2?",
    choices: [
      { label: "A", text: "−1" },
      { label: "B", text: "0" },
      { label: "C", text: "1" },
      { label: "D", text: "5" },
    ],
    correctChoice: "C",
    explanation:
      "For continuity at x = 2, the left-hand limit must equal f(2). The " +
      "left-hand limit is lim(x→2⁻) (x² + k) = 4 + k. Since f(2) = " +
      "3(2) − 1 = 5, set 4 + k = 5, so k = 1.",
  },
  {
    id: "u1-c4-q2",
    chapter: "Continuity and identifying discontinuities",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = (x² − 1)/(x − 1) for x ≠ 1, and f(1) = 3. Which " +
      "statement is true?",
    choices: [
      { label: "A", text: "f is continuous at x = 1." },
      {
        label: "B",
        text: "f is discontinuous at x = 1 because f(1) is undefined.",
      },
      {
        label: "C",
        text: "f is discontinuous at x = 1 because lim(x→1) f(x) ≠ f(1).",
      },
      {
        label: "D",
        text: "f is discontinuous at x = 1 because the limit does not exist.",
      },
    ],
    correctChoice: "C",
    explanation:
      "For x ≠ 1, (x² − 1)/(x − 1) simplifies to x + 1, so lim(x→1) f(x) = " +
      "1 + 1 = 2. Since f(1) = 3 is defined but doesn't match the limit " +
      "(2 ≠ 3), f fails the third condition of continuity — this is a " +
      "removable discontinuity.",
  },
  {
    id: "u1-c4-q3",
    chapter: "Continuity and identifying discontinuities",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let g(x) = (x² − 4)/(x − 2) for x < 2, g(2) = 1, and g(x) = −x + 3 " +
      "for x > 2.\n\n" +
      "Determine whether g is continuous at x = 2. If it is not, classify " +
      "the discontinuity. Justify your answer using the definition of " +
      "continuity.",
    explanation:
      "Continuity at x = 2 requires: (1) g(2) is defined, (2) lim(x→2) " +
      "g(x) exists, and (3) lim(x→2) g(x) = g(2).\n" +
      "(1) g(2) = 1 is given, so this condition is met.\n" +
      "(2) Check the one-sided limits. From the left, (x² − 4)/(x − 2) = " +
      "x + 2 for x ≠ 2, so lim(x→2⁻) g(x) = 2 + 2 = 4. From the right, " +
      "lim(x→2⁺) g(x) = −2 + 3 = 1. Since the one-sided limits (4 and 1) " +
      "are not equal, lim(x→2) g(x) does not exist.\n" +
      "Because condition (2) fails, g is not continuous at x = 2. Since " +
      "the one-sided limits are both finite but unequal, this is a jump " +
      "discontinuity.",
  },
  {
    id: "u1-c5-q1",
    chapter: "The Intermediate Value Theorem",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Which theorem guarantees that f(x) = x³ + x − 1 has at least one " +
      "real root in the interval (0, 1)?",
    choices: [
      { label: "A", text: "Mean Value Theorem" },
      { label: "B", text: "Extreme Value Theorem" },
      { label: "C", text: "Intermediate Value Theorem" },
      { label: "D", text: "Squeeze Theorem" },
    ],
    correctChoice: "C",
    explanation:
      "f is a polynomial, so it's continuous on [0, 1]. f(0) = −1 and " +
      "f(1) = 1. Since 0 is between f(0) and f(1), the Intermediate Value " +
      "Theorem guarantees some c in (0, 1) with f(c) = 0.",
  },
  {
    id: "u1-c5-q2",
    chapter: "The Intermediate Value Theorem",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "The table shows values of a continuous function h.\n\n" +
      "x:     1   2   3   4\n" +
      "h(x): −3  −1   2   6\n\n" +
      "According to the Intermediate Value Theorem, h(x) = 0 must have a " +
      "solution in which interval?",
    choices: [
      { label: "A", text: "(1, 2)" },
      { label: "B", text: "(2, 3)" },
      { label: "C", text: "(3, 4)" },
      {
        label: "D",
        text: "IVT cannot be applied since no table value equals 0.",
      },
    ],
    correctChoice: "B",
    explanation:
      "h is continuous, and 0 lies between h(2) = −1 and h(3) = 2 (a sign " +
      "change). By IVT, h must equal 0 somewhere in (2, 3). Note that " +
      "(1, 2) has both values negative and (3, 4) has both values positive " +
      "— IVT doesn't guarantee a root there, even though one isn't ruled " +
      "out.",
  },
  {
    id: "u1-c5-q3",
    chapter: "The Intermediate Value Theorem",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = x⁴ − 3x + 1. Show that there exists a value c in the " +
      "interval (1, 2) such that f(c) = 3. Justify your answer using the " +
      "Intermediate Value Theorem, addressing all conditions of the " +
      "theorem.",
    explanation:
      "f is a polynomial, so it is continuous everywhere, in particular on " +
      "the closed interval [1, 2]. Evaluate the endpoints: f(1) = 1 − 3 + " +
      "1 = −1, and f(2) = 16 − 6 + 1 = 11. Since f(1) = −1 < 3 < 11 = " +
      "f(2), the value 3 lies between f(1) and f(2). Because f is " +
      "continuous on [1, 2], the Intermediate Value Theorem guarantees " +
      "there exists at least one c in (1, 2) such that f(c) = 3.",
  },
];

// Unit 2: Differentiation: Definition and Fundamental Properties. Chapter
// names match the chapters in src/lib/units.ts for Unit 2 so questions can
// be grouped correctly.
const UNIT_2_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u2-c1-q1",
    chapter: "Definition of the derivative (limit definition)",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Using the limit definition, f'(x) = lim(h→0) [f(x + h) − f(x)]/h. If f(x) = x² + 3x, what is f'(x)?",
    choices: [
      { label: "A", text: "2x" },
      { label: "B", text: "2x + 3" },
      { label: "C", text: "x + 3" },
      { label: "D", text: "2x + 3 + h" },
    ],
    correctChoice: "B",
    explanation:
      "f(x + h) = (x + h)² + 3(x + h) = x² + 2xh + h² + 3x + 3h. So " +
      "f(x + h) − f(x) = 2xh + h² + 3h. Dividing by h gives 2x + h + 3. " +
      "Taking the limit as h → 0 leaves f'(x) = 2x + 3.",
  },
  {
    id: "u2-c1-q2",
    chapter: "Definition of the derivative (limit definition)",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Which limit expression represents f'(3) for a function f, using the alternate (difference quotient) form of the derivative definition?",
    choices: [
      { label: "A", text: "lim(x→3) [f(x) − f(3)]/(x − 3)" },
      { label: "B", text: "lim(x→3) [f(x) + f(3)]/(x − 3)" },
      { label: "C", text: "lim(h→0) [f(3) − f(3 + h)]/3" },
      { label: "D", text: "lim(x→3) [f(x) − f(3)]/x" },
    ],
    correctChoice: "A",
    explanation:
      "The alternate form of the derivative at a point x = a is f'(a) = " +
      "lim(x→a) [f(x) − f(a)]/(x − a). Substituting a = 3 gives " +
      "lim(x→3) [f(x) − f(3)]/(x − 3), which computes the same slope as " +
      "the h-based definition but using x directly approaching 3.",
  },
  {
    id: "u2-c1-q3",
    chapter: "Definition of the derivative (limit definition)",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = √x.\n\n" +
      "(a) Use the limit definition f'(x) = lim(h→0) [f(x + h) − f(x)]/h to " +
      "find f'(x). (Hint: multiply by a conjugate.)\n" +
      "(b) State the domain of f'(x) and explain why it differs from the " +
      "domain of f(x).",
    explanation:
      "(a) f'(x) = lim(h→0) [√(x + h) − √x]/h. Multiply numerator and " +
      "denominator by the conjugate √(x + h) + √x: " +
      "[(x + h) − x] / [h(√(x + h) + √x)] = h / [h(√(x + h) + √x)]. For " +
      "h ≠ 0, this simplifies to 1/(√(x + h) + √x), which approaches " +
      "1/(2√x) as h → 0. So f'(x) = 1/(2√x).\n" +
      "(b) f(x) = √x has domain x ≥ 0, but f'(x) = 1/(2√x) has domain " +
      "x > 0. At x = 0, the denominator would be 0 (division by zero), " +
      "reflecting the fact that the graph of √x has a vertical tangent " +
      "line at x = 0, so the derivative doesn't exist there.",
  },
  {
    id: "u2-c2-q1",
    chapter: "Power, constant, and sum/difference rules",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If f(x) = 4x⁵ − 2x³ + 7x − 9, what is f'(x)?",
    choices: [
      { label: "A", text: "20x⁴ − 6x² + 7" },
      { label: "B", text: "20x⁴ − 6x² + 7x" },
      { label: "C", text: "4x⁴ − 2x² + 7" },
      { label: "D", text: "20x⁴ − 6x² − 9" },
    ],
    correctChoice: "A",
    explanation:
      "Differentiate term by term using the power rule: d/dx[4x⁵] = 20x⁴, " +
      "d/dx[−2x³] = −6x², d/dx[7x] = 7, and d/dx[−9] = 0 (the derivative " +
      "of a constant is 0). Summing gives f'(x) = 20x⁴ − 6x² + 7.",
  },
  {
    id: "u2-c2-q2",
    chapter: "Power, constant, and sum/difference rules",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Let g(x) = 3/x² + 5√x. What is g'(x)?",
    choices: [
      { label: "A", text: "−6/x³ + 5/(2√x)" },
      { label: "B", text: "6/x³ + 5/(2√x)" },
      { label: "C", text: "−6/x + 5/(2√x)" },
      { label: "D", text: "−6/x³ − 5/(2√x)" },
    ],
    correctChoice: "A",
    explanation:
      "Rewrite g(x) = 3x⁻² + 5x^(1/2). By the power rule, d/dx[3x⁻²] = " +
      "−6x⁻³ = −6/x³, and d/dx[5x^(1/2)] = (5/2)x^(−1/2) = 5/(2√x). " +
      "Summing gives g'(x) = −6/x³ + 5/(2√x).",
  },
  {
    id: "u2-c2-q3",
    chapter: "Power, constant, and sum/difference rules",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Let f(x) = x³ − 6x² + 9x + 1.\n\n" +
      "(a) Find f'(x).\n" +
      "(b) Find all values of x where the tangent line to f is horizontal.\n" +
      "(c) Find the equation of the tangent line to f at x = 0.",
    explanation:
      "(a) f'(x) = 3x² − 12x + 9.\n" +
      "(b) A horizontal tangent occurs where f'(x) = 0: 3x² − 12x + 9 = 0, " +
      "so x² − 4x + 3 = 0, giving (x − 1)(x − 3) = 0. Thus x = 1 and " +
      "x = 3.\n" +
      "(c) f(0) = 1 and f'(0) = 9. The tangent line at x = 0 passes " +
      "through (0, 1) with slope 9: y = 9x + 1.",
  },
  {
    id: "u2-c3-q1",
    chapter: "Product and quotient rules",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If h(x) = (x² + 1)(3x − 5), what is h'(x)?",
    choices: [
      { label: "A", text: "2x(3x − 5) + 3(x² + 1)" },
      { label: "B", text: "2x · 3" },
      { label: "C", text: "(2x)(3)" },
      { label: "D", text: "6x² − 10x" },
    ],
    correctChoice: "A",
    explanation:
      "By the product rule, (fg)' = f'g + fg'. With f(x) = x² + 1 " +
      "(f'(x) = 2x) and g(x) = 3x − 5 (g'(x) = 3): h'(x) = 2x(3x − 5) + " +
      "(x² + 1)(3).",
  },
  {
    id: "u2-c3-q2",
    chapter: "Product and quotient rules",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If f(x) = (2x + 1)/(x − 3), what is f'(x)?",
    choices: [
      { label: "A", text: "2/(x − 3)" },
      { label: "B", text: "[2(x − 3) − (2x + 1)]/(x − 3)²" },
      { label: "C", text: "[2(x − 3) + (2x + 1)]/(x − 3)²" },
      { label: "D", text: "−7/(x − 3)²" },
    ],
    correctChoice: "D",
    explanation:
      "By the quotient rule, (u/v)' = (u'v − uv')/v². With u = 2x + 1 " +
      "(u' = 2) and v = x − 3 (v' = 1): f'(x) = [2(x − 3) − (2x + 1)(1)] / " +
      "(x − 3)² = [2x − 6 − 2x − 1]/(x − 3)² = −7/(x − 3)².",
  },
  {
    id: "u2-c3-q3",
    chapter: "Product and quotient rules",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = x²(4 − x²)/x, defined for x ≠ 0.\n\n" +
      "(a) Simplify f(x) algebraically before differentiating, and find " +
      "f'(x) using the power rule.\n" +
      "(b) Now find f'(x) directly using the product and quotient rules " +
      "without simplifying first, and verify your two answers agree.",
    explanation:
      "(a) f(x) = x²(4 − x²)/x = (4x² − x⁴)/x = 4x − x³ for x ≠ 0. So " +
      "f'(x) = 4 − 3x².\n" +
      "(b) Let u(x) = x²(4 − x²) = 4x² − x⁴, so u'(x) = 8x − 4x³ (using " +
      "the product rule or expanding directly), and v(x) = x, so v'(x) = " +
      "1. By the quotient rule, f'(x) = [u'v − uv']/v² = " +
      "[(8x − 4x³)(x) − (4x² − x⁴)(1)]/x² = " +
      "[8x² − 4x⁴ − 4x² + x⁴]/x² = [4x² − 3x⁴]/x² = 4 − 3x², matching " +
      "part (a).",
  },
  {
    id: "u2-c4-q1",
    chapter: "Derivatives of trig, exponential, and log functions",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If f(x) = 3sin(x) − 2cos(x), what is f'(x)?",
    choices: [
      { label: "A", text: "3cos(x) + 2sin(x)" },
      { label: "B", text: "3cos(x) − 2sin(x)" },
      { label: "C", text: "−3cos(x) + 2sin(x)" },
      { label: "D", text: "−3sin(x) − 2cos(x)" },
    ],
    correctChoice: "A",
    explanation:
      "d/dx[sin(x)] = cos(x) and d/dx[cos(x)] = −sin(x). So f'(x) = " +
      "3cos(x) − 2(−sin(x)) = 3cos(x) + 2sin(x).",
  },
  {
    id: "u2-c4-q2",
    chapter: "Derivatives of trig, exponential, and log functions",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If g(x) = e^x · ln(x), what is g'(x)?",
    choices: [
      { label: "A", text: "e^x/x" },
      { label: "B", text: "e^x · ln(x) + e^x/x" },
      { label: "C", text: "e^x · ln(x)" },
      { label: "D", text: "e^x/x + ln(x)" },
    ],
    correctChoice: "B",
    explanation:
      "By the product rule with u = e^x (u' = e^x) and v = ln(x) " +
      "(v' = 1/x): g'(x) = e^x · ln(x) + e^x · (1/x) = e^x · ln(x) + e^x/x.",
  },
  {
    id: "u2-c4-q3",
    chapter: "Derivatives of trig, exponential, and log functions",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = tan(x) for −π/2 < x < π/2.\n\n" +
      "(a) Write tan(x) as sin(x)/cos(x) and use the quotient rule to show " +
      "f'(x) = sec²(x).\n" +
      "(b) Find the equation of the tangent line to f at x = π/4.",
    explanation:
      "(a) By the quotient rule with u = sin(x) (u' = cos(x)) and " +
      "v = cos(x) (v' = −sin(x)): f'(x) = [cos(x)·cos(x) − sin(x)·(−sin(x))] " +
      "/ cos²(x) = [cos²(x) + sin²(x)]/cos²(x) = 1/cos²(x) = sec²(x), " +
      "using the Pythagorean identity cos²(x) + sin²(x) = 1.\n" +
      "(b) At x = π/4, f(π/4) = tan(π/4) = 1, and f'(π/4) = sec²(π/4) = " +
      "1/cos²(π/4) = 1/(√2/2)² = 2. The tangent line is " +
      "y − 1 = 2(x − π/4), or y = 2x − π/2 + 1.",
  },
  {
    id: "u2-c5-q1",
    chapter: "Estimating derivatives from graphs and tables",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "The table shows values of a differentiable function f.\n\n" +
      "x:     1     2     3     4\n" +
      "f(x):  5     8    13    20\n\n" +
      "Using the average rate of change, which is the best estimate of " +
      "f'(3)?",
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "6" },
      { label: "C", text: "7" },
      { label: "D", text: "13" },
    ],
    correctChoice: "B",
    explanation:
      "The best estimate of f'(3) uses the symmetric difference quotient " +
      "with the table values on either side of x = 3: " +
      "[f(4) − f(2)]/(4 − 2) = (20 − 8)/2 = 12/2 = 6. A symmetric " +
      "difference quotient is generally a better estimate of the " +
      "instantaneous rate of change than a one-sided quotient because it " +
      "accounts for the function's behavior on both sides of the point.",
  },
  {
    id: "u2-c5-q2",
    chapter: "Estimating derivatives from graphs and tables",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "The graph of f is a smooth curve that is increasing and concave " +
      "down on the interval (0, 4). Which statement must be true?",
    choices: [
      { label: "A", text: "f'(x) > 0 and f'(x) is increasing on (0, 4)." },
      { label: "B", text: "f'(x) > 0 and f'(x) is decreasing on (0, 4)." },
      { label: "C", text: "f'(x) < 0 and f'(x) is increasing on (0, 4)." },
      { label: "D", text: "f'(x) < 0 and f'(x) is decreasing on (0, 4)." },
    ],
    correctChoice: "B",
    explanation:
      "f increasing means f'(x) > 0 on (0, 4). f concave down means the " +
      "slopes of the tangent lines are decreasing as x increases, i.e. " +
      "f'(x) is decreasing (equivalently f''(x) < 0). So f'(x) > 0 and " +
      "decreasing.",
  },
  {
    id: "u2-c5-q3",
    chapter: "Estimating derivatives from graphs and tables",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "The table shows the temperature T(t), in degrees Fahrenheit, of a " +
      "cup of coffee t minutes after being poured.\n\n" +
      "t:      0     2     5     9    12\n" +
      "T(t): 190   175   155   132   118\n\n" +
      "(a) Estimate T'(5) using a symmetric difference quotient with the " +
      "closest available data points. Show your work and include units.\n" +
      "(b) Estimate T'(0) using an appropriate one-sided difference " +
      "quotient, since a symmetric estimate isn't available. Show your " +
      "work and include units.\n" +
      "(c) Interpret the meaning of T'(5) in the context of the problem.",
    explanation:
      "(a) T'(5) ≈ [T(9) − T(2)]/(9 − 2) = (132 − 175)/7 = −43/7 ≈ " +
      "−6.14 °F/min.\n" +
      "(b) Since there's no data point before t = 0, use the forward " +
      "difference quotient: T'(0) ≈ [T(2) − T(0)]/(2 − 0) = " +
      "(175 − 190)/2 = −15/2 = −7.5 °F/min.\n" +
      "(c) T'(5) ≈ −6.14 °F/min means that at t = 5 minutes, the coffee's " +
      "temperature is decreasing at a rate of approximately 6.14 degrees " +
      "Fahrenheit per minute.",
  },
];

// Unit 3: Differentiation: Composite, Implicit, and Inverse Functions.
// Chapter names match the chapters in src/lib/units.ts for Unit 3 so
// questions can be grouped correctly.
const UNIT_3_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u3-c1-q1",
    chapter: "Chain rule",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If f(x) = (3x² + 1)⁵, what is f'(x)?",
    choices: [
      { label: "A", text: "5(3x² + 1)⁴" },
      { label: "B", text: "30x(3x² + 1)⁴" },
      { label: "C", text: "5(6x)⁴" },
      { label: "D", text: "6x(3x² + 1)⁴" },
    ],
    correctChoice: "B",
    explanation:
      "By the chain rule, d/dx[u⁵] = 5u⁴ · u', where u = 3x² + 1 and " +
      "u' = 6x. So f'(x) = 5(3x² + 1)⁴ · 6x = 30x(3x² + 1)⁴.",
  },
  {
    id: "u3-c1-q2",
    chapter: "Chain rule",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If g(x) = sin(x²), what is g'(x)?",
    choices: [
      { label: "A", text: "cos(x²)" },
      { label: "B", text: "2x cos(x²)" },
      { label: "C", text: "2x sin(x²)" },
      { label: "D", text: "x² cos(x²)" },
    ],
    correctChoice: "B",
    explanation:
      "By the chain rule, d/dx[sin(u)] = cos(u) · u', where u = x² and " +
      "u' = 2x. So g'(x) = cos(x²) · 2x = 2x cos(x²).",
  },
  {
    id: "u3-c1-q3",
    chapter: "Chain rule",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let h(x) = e^(cos(2x)).\n\n" +
      "(a) Find h'(x), using the chain rule twice.\n" +
      "(b) Find the equation of the tangent line to h at x = 0.",
    explanation:
      "(a) Let the outer function be e^u with u = cos(2x). " +
      "d/dx[e^u] = e^u · u'. Now u' = d/dx[cos(2x)] = −sin(2x) · 2 = " +
      "−2sin(2x), applying the chain rule again for the inner 2x. So " +
      "h'(x) = e^(cos(2x)) · (−2sin(2x)) = −2sin(2x)e^(cos(2x)).\n" +
      "(b) h(0) = e^(cos(0)) = e^1 = e, and h'(0) = −2sin(0)e^(cos(0)) = " +
      "−2(0)(e) = 0. The tangent line at x = 0 is horizontal: y = e.",
  },
  {
    id: "u3-c2-q1",
    chapter: "Implicit differentiation",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If x² + y² = 25, what is dy/dx?",
    choices: [
      { label: "A", text: "x/y" },
      { label: "B", text: "−x/y" },
      { label: "C", text: "y/x" },
      { label: "D", text: "−y/x" },
    ],
    correctChoice: "B",
    explanation:
      "Differentiate both sides with respect to x: 2x + 2y(dy/dx) = 0. " +
      "Solve for dy/dx: 2y(dy/dx) = −2x, so dy/dx = −x/y.",
  },
  {
    id: "u3-c2-q2",
    chapter: "Implicit differentiation",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If y³ + xy = 4, what is dy/dx in terms of x and y?",
    choices: [
      { label: "A", text: "−y/(3y² + x)" },
      { label: "B", text: "y/(3y² + x)" },
      { label: "C", text: "−y/(3y² − x)" },
      { label: "D", text: "(4 − xy)/(3y²)" },
    ],
    correctChoice: "A",
    explanation:
      "Differentiate both sides with respect to x, using the product " +
      "rule on xy: 3y²(dy/dx) + [x(dy/dx) + y] = 0. Group the dy/dx " +
      "terms: 3y²(dy/dx) + x(dy/dx) = −y, so (dy/dx)(3y² + x) = −y, " +
      "giving dy/dx = −y/(3y² + x).",
  },
  {
    id: "u3-c2-q3",
    chapter: "Implicit differentiation",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Consider the curve defined by x² + xy + y² = 7.\n\n" +
      "(a) Find dy/dx in terms of x and y.\n" +
      "(b) Find the equation of the tangent line to the curve at the " +
      "point (1, 2).",
    explanation:
      "(a) Differentiate both sides with respect to x, using the product " +
      "rule on xy: 2x + [x(dy/dx) + y] + 2y(dy/dx) = 0. Group the dy/dx " +
      "terms: x(dy/dx) + 2y(dy/dx) = −2x − y, so " +
      "dy/dx = (−2x − y)/(x + 2y).\n" +
      "(b) At (1, 2): dy/dx = (−2(1) − 2)/(1 + 2(2)) = −4/5. The tangent " +
      "line is y − 2 = (−4/5)(x − 1).",
  },
  {
    id: "u3-c3-q1",
    chapter: "Derivatives of inverse functions",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = x³ + 2x, and let g be the inverse function of f. Given " +
      "that f(1) = 3, what is g'(3)?",
    choices: [
      { label: "A", text: "1/5" },
      { label: "B", text: "5" },
      { label: "C", text: "1/3" },
      { label: "D", text: "3" },
    ],
    correctChoice: "A",
    explanation:
      "By the inverse function derivative formula, g'(f(a)) = 1/f'(a). " +
      "Since f(1) = 3, use a = 1: f'(x) = 3x² + 2, so f'(1) = 3 + 2 = 5. " +
      "Thus g'(3) = 1/f'(1) = 1/5.",
  },
  {
    id: "u3-c3-q2",
    chapter: "Derivatives of inverse functions",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let h be the inverse of f(x) = 2x⁵ + x + 4. Which expression gives " +
      "h'(4)?",
    choices: [
      { label: "A", text: "1/f'(0)" },
      { label: "B", text: "1/f'(4)" },
      { label: "C", text: "f'(0)" },
      { label: "D", text: "1/f(0)" },
    ],
    correctChoice: "A",
    explanation:
      "Since h is the inverse of f, h'(f(a)) = 1/f'(a). We need a such " +
      "that f(a) = 4: f(0) = 2(0) + 0 + 4 = 4, so a = 0. Thus " +
      "h'(4) = h'(f(0)) = 1/f'(0).",
  },
  {
    id: "u3-c3-q3",
    chapter: "Derivatives of inverse functions",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Let f(x) = x³ + 3x − 2, and let g be the inverse of f.\n\n" +
      "(a) Verify that f(2) = 12.\n" +
      "(b) Find g'(12).\n" +
      "(c) Explain why f must have an inverse function on the domain of " +
      "all real numbers.",
    explanation:
      "(a) f(2) = 8 + 6 − 2 = 12, confirming the given value.\n" +
      "(b) g'(f(a)) = 1/f'(a). Since f(2) = 12, use a = 2: " +
      "f'(x) = 3x² + 3, so f'(2) = 12 + 3 = 15. Thus g'(12) = 1/f'(2) = " +
      "1/15.\n" +
      "(c) f'(x) = 3x² + 3 ≥ 3 > 0 for all real x, so f is strictly " +
      "increasing everywhere. A strictly increasing (or strictly " +
      "decreasing) function is one-to-one on its whole domain, so f has " +
      "an inverse function there.",
  },
  {
    id: "u3-c4-q1",
    chapter: "Derivatives of inverse trigonometric functions",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If f(x) = arctan(3x), what is f'(x)?",
    choices: [
      { label: "A", text: "3/(1 + 9x²)" },
      { label: "B", text: "1/(1 + 9x²)" },
      { label: "C", text: "3/(1 + 3x²)" },
      { label: "D", text: "1/(1 + x²)" },
    ],
    correctChoice: "A",
    explanation:
      "Using d/dx[arctan(u)] = u'/(1 + u²) with u = 3x and u' = 3: " +
      "f'(x) = 3/(1 + (3x)²) = 3/(1 + 9x²).",
  },
  {
    id: "u3-c4-q2",
    chapter: "Derivatives of inverse trigonometric functions",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If g(x) = arcsin(x²), what is g'(x)?",
    choices: [
      { label: "A", text: "1/√(1 − x²)" },
      { label: "B", text: "2x/√(1 − x²)" },
      { label: "C", text: "2x/√(1 − x⁴)" },
      { label: "D", text: "x²/√(1 − x⁴)" },
    ],
    correctChoice: "C",
    explanation:
      "Using d/dx[arcsin(u)] = u'/√(1 − u²) with u = x² and u' = 2x: " +
      "g'(x) = 2x/√(1 − (x²)²) = 2x/√(1 − x⁴).",
  },
  {
    id: "u3-c4-q3",
    chapter: "Derivatives of inverse trigonometric functions",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = x · arccos(x) for −1 < x < 1.\n\n" +
      "(a) Use the product rule and the derivative of arccos(x) to find " +
      "f'(x).\n" +
      "(b) Evaluate f'(0).",
    explanation:
      "(a) By the product rule with u = x (u' = 1) and v = arccos(x) " +
      "(v' = −1/√(1 − x²)): " +
      "f'(x) = (1)arccos(x) + x(−1/√(1 − x²)) = " +
      "arccos(x) − x/√(1 − x²).\n" +
      "(b) f'(0) = arccos(0) − 0/√(1 − 0) = π/2 − 0 = π/2.",
  },
  {
    id: "u3-c5-q1",
    chapter: "Higher-order derivatives",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If f(x) = x⁴ − 6x² + 2x, what is f''(x)?",
    choices: [
      { label: "A", text: "4x³ − 12x + 2" },
      { label: "B", text: "12x² − 6" },
      { label: "C", text: "12x² − 12" },
      { label: "D", text: "24x" },
    ],
    correctChoice: "C",
    explanation:
      "f'(x) = 4x³ − 12x + 2. Differentiating again, " + "f''(x) = 12x² − 12.",
  },
  {
    id: "u3-c5-q2",
    chapter: "Higher-order derivatives",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Let g(x) = sin(x). What is g⁽⁴⁾(x) (the fourth derivative of g)?",
    choices: [
      { label: "A", text: "sin(x)" },
      { label: "B", text: "−sin(x)" },
      { label: "C", text: "cos(x)" },
      { label: "D", text: "−cos(x)" },
    ],
    correctChoice: "A",
    explanation:
      "g'(x) = cos(x), g''(x) = −sin(x), g'''(x) = −cos(x), and " +
      "g⁽⁴⁾(x) = sin(x). The derivatives of sin(x) cycle with period 4, " +
      "so the fourth derivative returns to sin(x).",
  },
  {
    id: "u3-c5-q3",
    chapter: "Higher-order derivatives",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "The position of a particle moving along a line is given by " +
      "s(t) = t³ − 9t² + 24t, where s is in meters and t is in seconds, " +
      "for t ≥ 0.\n\n" +
      "(a) Find the particle's velocity function v(t) and acceleration " +
      "function a(t).\n" +
      "(b) Find all times t ≥ 0 at which the particle is momentarily at " +
      "rest.\n" +
      "(c) Is the particle speeding up or slowing down at t = 1? Justify " +
      "your answer using the signs of v(t) and a(t).",
    explanation:
      "(a) v(t) = s'(t) = 3t² − 18t + 24. a(t) = v'(t) = s''(t) = " +
      "6t − 18.\n" +
      "(b) The particle is at rest when v(t) = 0: 3t² − 18t + 24 = 0, so " +
      "t² − 6t + 8 = 0, giving (t − 2)(t − 4) = 0. Thus t = 2 and t = 4.\n" +
      "(c) At t = 1: v(1) = 3 − 18 + 24 = 9 > 0, and " +
      "a(1) = 6 − 18 = −12 < 0. Since velocity and acceleration have " +
      "opposite signs, the particle is slowing down at t = 1.",
  },
];

// Unit 4: Contextual Applications of Differentiation. Chapter names match
// the chapters in src/lib/units.ts for Unit 4 so questions can be grouped
// correctly.
const UNIT_4_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u4-c1-q1",
    chapter: "Straight-line motion: position, velocity, and acceleration",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "A particle moves along a line with position s(t) = t³ − 3t² for " +
      "t ≥ 0. At t = 0.5, is the particle speeding up or slowing down?",
    choices: [
      { label: "A", text: "Speeding up, because v(0.5) > 0 and a(0.5) > 0." },
      { label: "B", text: "Speeding up, because v(0.5) < 0 and a(0.5) < 0." },
      { label: "C", text: "Slowing down, because v(0.5) > 0 and a(0.5) < 0." },
      { label: "D", text: "Slowing down, because v(0.5) < 0 and a(0.5) > 0." },
    ],
    correctChoice: "B",
    explanation:
      "v(t) = s'(t) = 3t² − 6t, so v(0.5) = 3(0.25) − 6(0.5) = " +
      "0.75 − 3 = −2.25, which is negative. a(t) = v'(t) = 6t − 6, so " +
      "a(0.5) = 3 − 6 = −3, also negative. Since velocity and " +
      "acceleration have the same sign (both negative), the speed is " +
      "increasing — the particle is speeding up.",
  },
  {
    id: "u4-c1-q2",
    chapter: "Straight-line motion: position, velocity, and acceleration",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "A particle moves along a line with velocity v(t) = t² − 4t + 3. " +
      "For what values of t > 0 is the particle moving to the left " +
      "(in the negative direction)?",
    choices: [
      { label: "A", text: "0 < t < 1" },
      { label: "B", text: "1 < t < 3" },
      { label: "C", text: "t > 3" },
      { label: "D", text: "0 < t < 1 and t > 3" },
    ],
    correctChoice: "B",
    explanation:
      "The particle moves left when v(t) < 0. Factor: " +
      "v(t) = t² − 4t + 3 = (t − 1)(t − 3), which is negative between its " +
      "roots. So v(t) < 0 for 1 < t < 3.",
  },
  {
    id: "u4-c1-q3",
    chapter: "Straight-line motion: position, velocity, and acceleration",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "A particle moves along a line with position s(t) = t³ − 6t² + 9t " +
      "for 0 ≤ t ≤ 4, where s is in meters and t is in seconds.\n\n" +
      "(a) Find v(t) and the times in [0, 4] when the particle is at " +
      "rest.\n" +
      "(b) Find the total distance traveled by the particle over " +
      "[0, 4].",
    explanation:
      "(a) v(t) = 3t² − 12t + 9 = 3(t² − 4t + 3) = 3(t − 1)(t − 3). The " +
      "particle is at rest when v(t) = 0, i.e. at t = 1 and t = 3.\n" +
      "(b) Compute position at each key time: s(0) = 0, s(1) = " +
      "1 − 6 + 9 = 4, s(3) = 27 − 54 + 27 = 0, s(4) = 64 − 96 + 36 = 4. " +
      "The particle moves from 0 to 4 (distance 4), then from 4 back to " +
      "0 (distance 4), then from 0 to 4 again (distance 4). Total " +
      "distance = 4 + 4 + 4 = 12 meters.",
  },
  {
    id: "u4-c2-q1",
    chapter: "Related rates",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "A circular oil spill is growing so that its radius increases at a " +
      "constant rate of 2 m/min. At the moment the radius is 5 m, how " +
      "fast is the area of the spill increasing?",
    choices: [
      { label: "A", text: "10π m²/min" },
      { label: "B", text: "20π m²/min" },
      { label: "C", text: "25π m²/min" },
      { label: "D", text: "4π m²/min" },
    ],
    correctChoice: "B",
    explanation:
      "A = πr². Differentiating with respect to time: dA/dt = 2πr(dr/dt). " +
      "At r = 5 with dr/dt = 2: dA/dt = 2π(5)(2) = 20π m²/min.",
  },
  {
    id: "u4-c2-q2",
    chapter: "Related rates",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "A 13-foot ladder leans against a vertical wall. The bottom of the " +
      "ladder slides away from the wall at 2 ft/s. At the moment the " +
      "bottom of the ladder is 5 feet from the wall, how fast is the top " +
      "of the ladder sliding down the wall?",
    choices: [
      { label: "A", text: "5/6 ft/s" },
      { label: "B", text: "5/12 ft/s" },
      { label: "C", text: "6/5 ft/s" },
      { label: "D", text: "10/12 ft/s" },
    ],
    correctChoice: "A",
    explanation:
      "Let x be the distance from the wall and y the height on the wall, " +
      "with x² + y² = 13² = 169. When x = 5, y = √(169 − 25) = 12. " +
      "Differentiating: 2x(dx/dt) + 2y(dy/dt) = 0, so " +
      "dy/dt = −x(dx/dt)/y = −(5)(2)/12 = −5/6 ft/s. The top slides down " +
      "at a rate of 5/6 ft/s.",
  },
  {
    id: "u4-c2-q3",
    chapter: "Related rates",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Water is draining out of an inverted conical tank (vertex down) " +
      "with height 12 m and base radius 4 m. The water level is falling " +
      "at a rate of 0.5 m/min at the moment the water depth is 6 m.\n\n" +
      "(a) Show that the radius r of the water's surface relates to its " +
      "depth h by r = h/3.\n" +
      "(b) The volume of water is V = (1/3)πr²h. Use part (a) to write V " +
      "as a function of h alone, and find dV/dt when h = 6.",
    explanation:
      "(a) By similar triangles, r/h = 4/12 = 1/3, so r = h/3.\n" +
      "(b) Substituting, V = (1/3)π(h/3)²h = (1/3)π(h²/9)h = πh³/27. " +
      "Differentiating with respect to time: dV/dt = (3πh²/27)(dh/dt) = " +
      "(πh²/9)(dh/dt). At h = 6 with dh/dt = −0.5 (falling): " +
      "dV/dt = (π(36)/9)(−0.5) = 4π(−0.5) = −2π m³/min. The volume is " +
      "decreasing at a rate of 2π m³/min.",
  },
  {
    id: "u4-c3-q1",
    chapter: "Linear approximation and local linearity",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = √x. Use the tangent line to f at x = 9 to approximate " +
      "√9.3.",
    choices: [
      { label: "A", text: "3" },
      { label: "B", text: "3.05" },
      { label: "C", text: "3.1" },
      { label: "D", text: "3.5" },
    ],
    correctChoice: "B",
    explanation:
      "f(9) = 3 and f'(x) = 1/(2√x), so f'(9) = 1/6. The linear " +
      "approximation is L(x) = f(9) + f'(9)(x − 9) = 3 + (1/6)(x − 9). " +
      "At x = 9.3: L(9.3) = 3 + (1/6)(0.3) = 3 + 0.05 = 3.05.",
  },
  {
    id: "u4-c3-q2",
    chapter: "Linear approximation and local linearity",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Suppose f is a function with f(2) = 5, f'(2) = 3, and f''(x) < 0 " +
      "for all x near 2. Which statement must be true about the tangent " +
      "line approximation to f at x = 2?",
    choices: [
      {
        label: "A",
        text: "It underestimates f(x) for x near 2, since f is concave down.",
      },
      {
        label: "B",
        text: "It overestimates f(x) for x near 2, since f is concave down.",
      },
      {
        label: "C",
        text: "It equals f(x) exactly for x near 2.",
      },
      {
        label: "D",
        text: "It underestimates f(x) for x near 2, since f is concave up.",
      },
    ],
    correctChoice: "B",
    explanation:
      "When a function is concave down (f''(x) < 0), its graph curves " +
      "downward away from any tangent line, so the graph lies below the " +
      "tangent line. This means the tangent line approximation gives " +
      "values greater than the actual function values — it overestimates " +
      "f(x) for x near 2.",
  },
  {
    id: "u4-c3-q3",
    chapter: "Linear approximation and local linearity",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = x^(1/3), and let L(x) be the linearization of f at " +
      "x = 8.\n\n" +
      "(a) Find L(x).\n" +
      "(b) Use L(x) to approximate 8.24^(1/3).\n" +
      "(c) Is your approximation in part (b) an overestimate or an " +
      "underestimate of the actual value? Justify your answer using the " +
      "concavity of f.",
    explanation:
      "(a) f(8) = 2 and f'(x) = (1/3)x^(−2/3), so f'(8) = " +
      "(1/3)(1/4) = 1/12. L(x) = 2 + (1/12)(x − 8).\n" +
      "(b) L(8.24) = 2 + (1/12)(0.24) = 2 + 0.02 = 2.02.\n" +
      "(c) f''(x) = (1/3)(−2/3)x^(−5/3) = −(2/9)x^(−5/3), which is " +
      "negative for x > 0. Since f is concave down near x = 8, the " +
      "tangent line lies above the curve, so the approximation is an " +
      "overestimate of the actual value.",
  },
  {
    id: "u4-c4-q1",
    chapter: "L'Hôpital's Rule for limits",
    type: "mc",
    calculatorAllowed: false,
    prompt: "lim(x→0) (sin(3x))/(5x) =",
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "3/5" },
      { label: "C", text: "1" },
      { label: "D", text: "5/3" },
    ],
    correctChoice: "B",
    explanation:
      "This limit has the indeterminate form 0/0, so L'Hôpital's Rule " +
      "applies: lim(x→0) (sin(3x))/(5x) = lim(x→0) (3cos(3x))/5 = " +
      "3cos(0)/5 = 3/5.",
  },
  {
    id: "u4-c4-q2",
    chapter: "L'Hôpital's Rule for limits",
    type: "mc",
    calculatorAllowed: false,
    prompt: "lim(x→∞) (ln(x))/x =",
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "1" },
      { label: "C", text: "∞" },
      { label: "D", text: "The limit does not exist." },
    ],
    correctChoice: "A",
    explanation:
      "As x → ∞, both ln(x) and x approach ∞, giving the indeterminate " +
      "form ∞/∞. By L'Hôpital's Rule, lim(x→∞) (ln(x))/x = " +
      "lim(x→∞) (1/x)/1 = lim(x→∞) 1/x = 0.",
  },
  {
    id: "u4-c4-q3",
    chapter: "L'Hôpital's Rule for limits",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Evaluate lim(x→0⁺) x·ln(x).\n\n" +
      "(a) Explain why this limit is not immediately in a form that " +
      "L'Hôpital's Rule applies to, and rewrite the expression as a " +
      "quotient so that it is.\n" +
      "(b) Apply L'Hôpital's Rule to evaluate the limit.",
    explanation:
      "(a) As x → 0⁺, x → 0 and ln(x) → −∞, so the product is the " +
      "indeterminate form 0·(−∞), which L'Hôpital's Rule does not apply " +
      "to directly. Rewrite x·ln(x) = ln(x)/(1/x), which now has the " +
      "form −∞/∞ as x → 0⁺.\n" +
      "(b) By L'Hôpital's Rule, lim(x→0⁺) ln(x)/(1/x) = " +
      "lim(x→0⁺) (1/x)/(−1/x²) = lim(x→0⁺) (−x²/x) = lim(x→0⁺) (−x) = 0. " +
      "So lim(x→0⁺) x·ln(x) = 0.",
  },
  {
    id: "u4-c5-q1",
    chapter: "Interpreting derivatives as rates of change in context",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let P(t) be the number of bacteria in a culture t hours after the " +
      "start of an experiment. If P'(5) = 120, which statement best " +
      "interprets this value?",
    choices: [
      { label: "A", text: "There are 120 bacteria in the culture at t = 5." },
      {
        label: "B",
        text: "The bacteria population is increasing at a rate of 120 bacteria per hour when t = 5.",
      },
      {
        label: "C",
        text: "The average rate of change of the population over [0, 5] is 120 bacteria per hour.",
      },
      {
        label: "D",
        text: "The population increased by a total of 120 bacteria between t = 0 and t = 5.",
      },
    ],
    correctChoice: "B",
    explanation:
      "P'(t) gives the instantaneous rate of change of the population, " +
      "in bacteria per hour, at time t. P'(5) = 120 means that at the " +
      "instant t = 5 hours, the population is increasing at a rate of " +
      "120 bacteria per hour — not a total or average change.",
  },
  {
    id: "u4-c5-q2",
    chapter: "Interpreting derivatives as rates of change in context",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "The table shows the volume V(t), in gallons, of water in a tank " +
      "at time t minutes.\n\n" +
      "t:     0    3    6    9\n" +
      "V(t): 80   62   50   44\n\n" +
      "Using the table, which is the best estimate of V'(6), and what " +
      "does it represent?",
    choices: [
      {
        label: "A",
        text: "≈ −3 gallons/min; the tank is draining at about 3 gal/min at t = 6.",
      },
      {
        label: "B",
        text: "≈ 3 gallons/min; the tank is filling at about 3 gal/min at t = 6.",
      },
      {
        label: "C",
        text: "≈ −6 gallons/min; the tank is draining at about 6 gal/min at t = 6.",
      },
      {
        label: "D",
        text: "≈ −2 gallons/min; the tank is draining at about 2 gal/min at t = 6.",
      },
    ],
    correctChoice: "A",
    explanation:
      "Estimate V'(6) with the symmetric difference quotient using the " +
      "surrounding data: [V(9) − V(3)]/(9 − 3) = (44 − 62)/6 = −18/6 = " +
      "−3 gallons/min. The negative sign means the volume is decreasing " +
      "— the tank is draining — at about 3 gallons per minute at t = 6.",
  },
  {
    id: "u4-c5-q3",
    chapter: "Interpreting derivatives as rates of change in context",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "The number of subscribers to a streaming service is modeled by " +
      "S(t) = 2000t² + 500t + 10000, where S is measured in subscribers " +
      "and t is measured in months since launch, for 0 ≤ t ≤ 24.\n\n" +
      "(a) Find S'(t), and state its units.\n" +
      "(b) Find S'(6) and interpret its meaning in context.\n" +
      "(c) Find the average rate of change of S over [0, 6], and explain " +
      "how it differs from S'(6).",
    explanation:
      "(a) S'(t) = 4000t + 500, measured in subscribers per month.\n" +
      "(b) S'(6) = 4000(6) + 500 = 24500 subscribers per month. This " +
      "means that at exactly 6 months after launch, the number of " +
      "subscribers is increasing at an instantaneous rate of 24,500 " +
      "subscribers per month.\n" +
      "(c) Average rate of change over [0, 6] is " +
      "[S(6) − S(0)]/(6 − 0) = [(2000(36) + 500(6) + 10000) − 10000]/6 " +
      "= [72000 + 3000]/6 = 75000/6 = 12500 subscribers per month. This " +
      "represents the overall average growth rate across the whole " +
      "6-month interval, while S'(6) is the instantaneous rate at the " +
      "single moment t = 6 — since S is increasing faster over time " +
      "(its derivative is increasing), the instantaneous rate at the end " +
      "of the interval is larger than the average rate across it.",
  },
];

// Unit 5: Analytical Applications of Differentiation. Chapter names match
// the chapters in src/lib/units.ts for Unit 5 so questions can be grouped
// correctly. Unit 5 has 8 chapters rather than 5, so questions are spread
// across all 8 (2 each, except 1 for the Mean Value Theorem) instead of
// the usual 3-per-chapter pattern.
const UNIT_5_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u5-c1-q1",
    chapter: "The Mean Value Theorem",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = x² − 4x + 3 on the interval [0, 4]. According to the " +
      "Mean Value Theorem, there exists a c in (0, 4) such that f'(c) " +
      "equals which value?",
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "2" },
      { label: "C", text: "−4" },
      { label: "D", text: "4" },
    ],
    correctChoice: "A",
    explanation:
      "f is a polynomial, so it's continuous on [0, 4] and differentiable " +
      "on (0, 4), satisfying the hypotheses of the MVT. The average rate " +
      "of change is [f(4) − f(0)]/(4 − 0) = (3 − 3)/4 = 0. The MVT " +
      "guarantees some c in (0, 4) with f'(c) = 0. Indeed, " +
      "f'(x) = 2x − 4, so f'(c) = 0 gives c = 2, confirming such a c " +
      "exists.",
  },
  {
    id: "u5-c2-q1",
    chapter: "Finding critical points and increasing/decreasing intervals",
    type: "mc",
    calculatorAllowed: false,
    prompt: "What are the critical points of f(x) = 2x³ − 9x² + 12x + 1?",
    choices: [
      { label: "A", text: "x = 1 only" },
      { label: "B", text: "x = 2 only" },
      { label: "C", text: "x = 1 and x = 2" },
      { label: "D", text: "x = 0 and x = 3" },
    ],
    correctChoice: "C",
    explanation:
      "f'(x) = 6x² − 18x + 12 = 6(x² − 3x + 2) = 6(x − 1)(x − 2). Setting " +
      "f'(x) = 0 gives x = 1 and x = 2, and f' is defined everywhere, so " +
      "these are the only critical points.",
  },
  {
    id: "u5-c2-q2",
    chapter: "Finding critical points and increasing/decreasing intervals",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let g(x) = x³ − 3x² − 9x + 5.\n\n" +
      "(a) Find g'(x) and its critical points.\n" +
      "(b) Determine the intervals on which g is increasing and " +
      "decreasing, using a sign analysis of g'(x).",
    explanation:
      "(a) g'(x) = 3x² − 6x − 9 = 3(x² − 2x − 3) = 3(x − 3)(x + 1). " +
      "Critical points: x = −1 and x = 3.\n" +
      "(b) Test each interval: for x < −1 (e.g. x = −2), " +
      "g'(−2) = 3(−5)(−1) = 15 > 0. For −1 < x < 3 (e.g. x = 0), " +
      "g'(0) = 3(−3)(1) = −9 < 0. For x > 3 (e.g. x = 4), " +
      "g'(4) = 3(1)(5) = 15 > 0. So g is increasing on (−∞, −1) and " +
      "(3, ∞), and decreasing on (−1, 3).",
  },
  {
    id: "u5-c3-q1",
    chapter: "First derivative test for relative extrema",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Suppose f'(x) changes sign from negative to positive at x = 3. " +
      "What does the First Derivative Test conclude about x = 3?",
    choices: [
      { label: "A", text: "f has a relative maximum at x = 3." },
      { label: "B", text: "f has a relative minimum at x = 3." },
      { label: "C", text: "f has neither a relative max nor min at x = 3." },
      {
        label: "D",
        text: "The First Derivative Test cannot determine this without f''.",
      },
    ],
    correctChoice: "B",
    explanation:
      "The First Derivative Test says that if f' changes from negative to " +
      "positive at a critical point, f has a relative minimum there — f " +
      "is decreasing just before x = 3 and increasing just after.",
  },
  {
    id: "u5-c3-q2",
    chapter: "First derivative test for relative extrema",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let h(x) = x⁴ − 8x² + 3.\n\n" +
      "(a) Find h'(x) and all critical points.\n" +
      "(b) Use the First Derivative Test to classify each critical point " +
      "as a relative maximum, relative minimum, or neither.",
    explanation:
      "(a) h'(x) = 4x³ − 16x = 4x(x² − 4) = 4x(x − 2)(x + 2). Critical " +
      "points: x = −2, x = 0, x = 2.\n" +
      "(b) Test each interval: for x < −2 (e.g. x = −3), " +
      "h'(−3) = 4(−3)(−5)(−1) = −60 < 0. For −2 < x < 0 (e.g. x = −1), " +
      "h'(−1) = 4(−1)(−3)(1) = 12 > 0. For 0 < x < 2 (e.g. x = 1), " +
      "h'(1) = 4(1)(−1)(3) = −12 < 0. For x > 2 (e.g. x = 3), " +
      "h'(3) = 4(3)(1)(5) = 60 > 0. So h' goes negative → positive at " +
      "x = −2 (relative minimum), positive → negative at x = 0 " +
      "(relative maximum), and negative → positive at x = 2 (relative " +
      "minimum).",
  },
  {
    id: "u5-c4-q1",
    chapter: "The Candidates Test for absolute (global) extrema",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Find the absolute maximum value of f(x) = x³ − 3x on [0, 3].",
    choices: [
      { label: "A", text: "−2, at x = 1" },
      { label: "B", text: "0, at x = 0" },
      { label: "C", text: "18, at x = 3" },
      { label: "D", text: "2, at x = −1" },
    ],
    correctChoice: "C",
    explanation:
      "f'(x) = 3x² − 3 = 3(x − 1)(x + 1), giving critical point x = 1 in " +
      "[0, 3] (x = −1 is outside the interval). By the Candidates Test, " +
      "evaluate f at the critical point and both endpoints: f(0) = 0, " +
      "f(1) = 1 − 3 = −2, f(3) = 27 − 9 = 18. The largest value, 18 at " +
      "x = 3, is the absolute maximum.",
  },
  {
    id: "u5-c4-q2",
    chapter: "The Candidates Test for absolute (global) extrema",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Let f(x) = x⁴ − 4x³ on the closed interval [−1, 4].\n\n" +
      "(a) Find f'(x) and all critical numbers in (−1, 4).\n" +
      "(b) Use the Candidates Test to find the absolute maximum and " +
      "absolute minimum values of f on [−1, 4].",
    explanation:
      "(a) f'(x) = 4x³ − 12x² = 4x²(x − 3). Setting f'(x) = 0 gives " +
      "x = 0 and x = 3, both in (−1, 4).\n" +
      "(b) Evaluate f at the critical numbers and both endpoints: " +
      "f(−1) = 1 + 4 = 5, f(0) = 0, f(3) = 81 − 108 = −27, " +
      "f(4) = 256 − 256 = 0. The absolute maximum is 5 at x = −1, and " +
      "the absolute minimum is −27 at x = 3.",
  },
  {
    id: "u5-c5-q1",
    chapter: "Concavity and the second derivative test",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "At which x-value does f(x) = x³ − 6x² + 9x + 2 have an inflection " +
      "point?",
    choices: [
      { label: "A", text: "x = 1" },
      { label: "B", text: "x = 2" },
      { label: "C", text: "x = 3" },
      { label: "D", text: "x = 4" },
    ],
    correctChoice: "B",
    explanation:
      "f''(x) = 6x − 12, which equals 0 at x = 2. f''(x) is negative for " +
      "x < 2 and positive for x > 2, so concavity changes sign at x = 2, " +
      "confirming an inflection point there.",
  },
  {
    id: "u5-c5-q2",
    chapter: "Concavity and the second derivative test",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let g(x) = 3x⁴ − 4x³ − 12x² + 5.\n\n" +
      "(a) Find g'(x) and its critical points.\n" +
      "(b) Use the Second Derivative Test to classify each critical point " +
      "as a relative maximum, relative minimum, or state if the test is " +
      "inconclusive.",
    explanation:
      "(a) g'(x) = 12x³ − 12x² − 24x = 12x(x² − x − 2) = " +
      "12x(x − 2)(x + 1). Critical points: x = −1, x = 0, x = 2.\n" +
      "(b) g''(x) = 36x² − 24x − 24. At x = −1: " +
      "g''(−1) = 36 + 24 − 24 = 36 > 0, so g has a relative minimum at " +
      "x = −1. At x = 0: g''(0) = −24 < 0, so g has a relative maximum " +
      "at x = 0. At x = 2: g''(2) = 144 − 48 − 24 = 72 > 0, so g has a " +
      "relative minimum at x = 2.",
  },
  {
    id: "u5-c6-q1",
    chapter: "Interpreting graphs of f, f′, and f″ together",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "The graph of f', the derivative of f, is negative on (0, 2) and " +
      "positive on (2, 5). What can be concluded about f?",
    choices: [
      { label: "A", text: "f has a relative maximum at x = 2." },
      { label: "B", text: "f has a relative minimum at x = 2." },
      { label: "C", text: "f is concave up on all of (0, 5)." },
      { label: "D", text: "f has an inflection point at x = 2." },
    ],
    correctChoice: "B",
    explanation:
      "Since f' is negative just before x = 2 and positive just after, f " +
      "is decreasing then increasing — by the First Derivative Test, f " +
      "has a relative minimum at x = 2.",
  },
  {
    id: "u5-c6-q2",
    chapter: "Interpreting graphs of f, f′, and f″ together",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "The graph of f', the derivative of f, is a continuous curve on " +
      "(−3, 5). f' is negative on (−3, 0), positive on (0, 3), and " +
      "negative on (3, 5). In addition, f' is increasing on (−3, 1) and " +
      "decreasing on (1, 5).\n\n" +
      "(a) Find all x-values in (−3, 5) where f has a relative extremum, " +
      "and classify each as a relative maximum or minimum.\n" +
      "(b) Find all x-values in (−3, 5) where f has a point of " +
      "inflection, and justify your answer.",
    explanation:
      "(a) f' changes from negative to positive at x = 0, so f has a " +
      "relative minimum at x = 0. f' changes from positive to negative " +
      "at x = 3, so f has a relative maximum at x = 3.\n" +
      "(b) f' increasing means f'' > 0, so f is concave up on (−3, 1); f' " +
      "decreasing means f'' < 0, so f is concave down on (1, 5). Since " +
      "concavity changes sign at x = 1, f has a point of inflection at " +
      "x = 1.",
  },
  {
    id: "u5-c7-q1",
    chapter: "Optimization word problems",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "A rectangular garden is to be enclosed by 200 feet of fencing " +
      "along three sides, with an existing wall forming the fourth side. " +
      "If x is the length of each of the two sides perpendicular to the " +
      "wall, which dimensions maximize the enclosed area?",
    choices: [
      { label: "A", text: "x = 50 ft, parallel side = 100 ft" },
      { label: "B", text: "x = 100 ft, parallel side = 0 ft" },
      { label: "C", text: "x = 33.3 ft, parallel side = 133.3 ft" },
      { label: "D", text: "x = 66.7 ft, parallel side = 66.7 ft" },
    ],
    correctChoice: "A",
    explanation:
      "Let x be each perpendicular side and y the side parallel to the " +
      "wall, so 2x + y = 200, giving y = 200 − 2x. The area is " +
      "A(x) = xy = x(200 − 2x) = 200x − 2x². A'(x) = 200 − 4x = 0 gives " +
      "x = 50, and A''(x) = −4 < 0 confirms a maximum. Then " +
      "y = 200 − 2(50) = 100.",
  },
  {
    id: "u5-c7-q2",
    chapter: "Optimization word problems",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "An open-top box is made by cutting squares of side length x from " +
      "each corner of a 12 in by 12 in sheet of cardboard, then folding " +
      "up the sides.\n\n" +
      "(a) Write the volume V(x) of the box as a function of x, and " +
      "state the domain of x that makes sense in context.\n" +
      "(b) Find the value of x that maximizes the volume, and find the " +
      "maximum volume. Justify that this value gives a maximum.",
    explanation:
      "(a) The base of the box is (12 − 2x) by (12 − 2x), and the height " +
      "is x, so V(x) = x(12 − 2x)² for 0 < x < 6.\n" +
      "(b) Expand: V(x) = x(144 − 48x + 4x²) = 4x³ − 48x² + 144x. " +
      "V'(x) = 12x² − 96x + 144 = 12(x² − 8x + 12) = 12(x − 2)(x − 6). " +
      "In the domain 0 < x < 6, the only critical point is x = 2 (x = 6 " +
      "is an endpoint of the domain, giving zero volume). " +
      "V''(x) = 24x − 96, and V''(2) = 48 − 96 = −48 < 0, confirming a " +
      "relative maximum at x = 2. The maximum volume is " +
      "V(2) = 2(12 − 4)² = 2(64) = 128 cubic inches.",
  },
  {
    id: "u5-c8-q1",
    chapter: "Analyzing behaviors of implicit relations",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "At which point(s) on the curve x² + y² = 25 does the curve have a " +
      "horizontal tangent line?",
    choices: [
      { label: "A", text: "(0, 5) and (0, −5)" },
      { label: "B", text: "(5, 0) and (−5, 0)" },
      { label: "C", text: "Only (0, 5)" },
      { label: "D", text: "The curve never has a horizontal tangent line." },
    ],
    correctChoice: "A",
    explanation:
      "Implicit differentiation gives dy/dx = −x/y. A horizontal tangent " +
      "requires dy/dx = 0, so x = 0 (with y ≠ 0). Substituting x = 0 into " +
      "x² + y² = 25 gives y² = 25, so y = ±5. The points are (0, 5) and " +
      "(0, −5).",
  },
  {
    id: "u5-c8-q2",
    chapter: "Analyzing behaviors of implicit relations",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Consider the curve defined by x² + xy + y² = 3.\n\n" +
      "(a) Find dy/dx in terms of x and y.\n" +
      "(b) Find all points on the curve where the tangent line is " +
      "horizontal.",
    explanation:
      "(a) Differentiate both sides with respect to x, using the product " +
      "rule on xy: 2x + [x(dy/dx) + y] + 2y(dy/dx) = 0. Grouping the " +
      "dy/dx terms: (dy/dx)(x + 2y) = −2x − y, so " +
      "dy/dx = −(2x + y)/(x + 2y).\n" +
      "(b) A horizontal tangent requires dy/dx = 0, so 2x + y = 0, i.e. " +
      "y = −2x. Substituting into the original equation: " +
      "x² + x(−2x) + (−2x)² = 3, so x² − 2x² + 4x² = 3, giving 3x² = 3 " +
      "and x = ±1. When x = 1, y = −2, and when x = −1, y = 2. Checking " +
      "both satisfy the original equation confirms the points " +
      "(1, −2) and (−1, 2).",
  },
];

// Unit 6: Integration and Accumulation of Change. Chapter names match the
// chapters in src/lib/units.ts for Unit 6 so questions can be grouped
// correctly. Unit 6 has 9 chapters, but the last 3 (integration by parts,
// partial fractions, and improper integrals) are BC-only, and the practice
// page has no AB/BC filtering — every question in a unit is shown to every
// student — so BC-only chapters are intentionally excluded here to avoid
// quizzing AB students on off-exam content. Questions are spread across
// the remaining 6 AB/BC-shared chapters as 3, 2, 3, 2, 3, 2 (15 total).
const UNIT_6_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u6-c1-q1",
    chapter: "Antiderivatives and indefinite integrals",
    type: "mc",
    calculatorAllowed: false,
    prompt: "What is ∫(3x² − 4x + 5) dx?",
    choices: [
      { label: "A", text: "3x³ − 2x² + 5x + C" },
      { label: "B", text: "x³ − 2x² + 5x + C" },
      { label: "C", text: "x³ − 4x² + 5x + C" },
      { label: "D", text: "6x − 4 + C" },
    ],
    correctChoice: "B",
    explanation:
      "Integrate term by term using the power rule for antiderivatives: " +
      "∫3x² dx = x³, ∫−4x dx = −2x², and ∫5 dx = 5x. Summing and adding " +
      "the constant of integration gives x³ − 2x² + 5x + C.",
  },
  {
    id: "u6-c1-q2",
    chapter: "Antiderivatives and indefinite integrals",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Find the general antiderivative of f(x) = 6x² − 4/√x + 3 for " +
      "x > 0. Show your work.",
    explanation:
      "Rewrite 4/√x as 4x^(−1/2). Antidifferentiate term by term: " +
      "∫6x² dx = 2x³. ∫4x^(−1/2) dx = 4 · [x^(1/2)/(1/2)] = 8x^(1/2) = " +
      "8√x, so the middle term contributes −8√x. ∫3 dx = 3x. Combining: " +
      "F(x) = 2x³ − 8√x + 3x + C.",
  },
  {
    id: "u6-c1-q3",
    chapter: "Antiderivatives and indefinite integrals",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Which function is an antiderivative of f(x) = 5x⁴ + 2x?",
    choices: [
      { label: "A", text: "x⁵ + x² " },
      { label: "B", text: "x⁵ + x² + C" },
      { label: "C", text: "5x⁵ + 2x² + C" },
      { label: "D", text: "20x³ + 2 + C" },
    ],
    correctChoice: "B",
    explanation:
      "Apply the power rule for antiderivatives term by term: " +
      "∫5x⁴ dx = 5 · x⁵/5 = x⁵, and ∫2x dx = 2 · x²/2 = x². Adding the " +
      "constant of integration gives x⁵ + x² + C. (One distractor is " +
      "missing the '+ C', and two others forget to divide by the new " +
      "exponent.)",
  },
  {
    id: "u6-c2-q1",
    chapter: "Riemann sums and definite integrals",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "The table gives selected values of f(x):\n\n" +
      "x:     0   2   4   6   8\n" +
      "f(x):  3   5   8   10  13\n\n" +
      "Use a left Riemann sum with the 4 subintervals shown to " +
      "approximate ∫₀⁸ f(x) dx.",
    choices: [
      { label: "A", text: "62" },
      { label: "B", text: "52" },
      { label: "C", text: "130" },
      { label: "D", text: "72" },
    ],
    correctChoice: "B",
    explanation:
      "A left Riemann sum uses the left endpoint of each subinterval. " +
      "With width 2 and left endpoints x = 0, 2, 4, 6 (f-values 3, 5, 8, " +
      "10), the sum is (3 + 5 + 8 + 10)(2) = 26(2) = 52.",
  },
  {
    id: "u6-c2-q2",
    chapter: "Riemann sums and definite integrals",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "The velocity of a particle, in m/s, is given by the table below " +
      "for selected times t (in seconds).\n\n" +
      "t:     0   3   6   9   12\n" +
      "v(t):  2   5   9   14  20\n\n" +
      "(a) Use a right Riemann sum with the 4 subintervals shown to " +
      "approximate ∫₀¹² v(t) dt, and interpret this integral in the " +
      "context of the problem.\n" +
      "(b) Does this right Riemann sum overestimate or underestimate the " +
      "actual distance traveled? Justify your answer.",
    explanation:
      "(a) With width 3 and right endpoints t = 3, 6, 9, 12 (v-values 5, " +
      "9, 14, 20), the sum is (5 + 9 + 14 + 20)(3) = 48(3) = 144. Since " +
      "v(t) ≥ 0, this integral represents the total distance, in " +
      "meters, traveled by the particle from t = 0 to t = 12 seconds.\n" +
      "(b) Because v is increasing on every subinterval shown, the right " +
      "endpoint gives the larger value on each piece, so the right " +
      "Riemann sum overestimates the actual distance traveled.",
  },
  {
    id: "u6-c3-q1",
    chapter: "The Fundamental Theorem of Calculus",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Evaluate ∫₁³ (2x + 1) dx using the Fundamental Theorem of Calculus.",
    choices: [
      { label: "A", text: "12" },
      { label: "B", text: "14" },
      { label: "C", text: "10" },
      { label: "D", text: "8" },
    ],
    correctChoice: "C",
    explanation:
      "An antiderivative of 2x + 1 is F(x) = x² + x. By the Fundamental " +
      "Theorem of Calculus, ∫₁³ (2x + 1) dx = F(3) − F(1) = " +
      "(9 + 3) − (1 + 1) = 12 − 2 = 10.",
  },
  {
    id: "u6-c3-q2",
    chapter: "The Fundamental Theorem of Calculus",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let f(x) = 3x² − 2.\n\n" +
      "(a) Find an antiderivative F(x) of f.\n" +
      "(b) Use the Fundamental Theorem of Calculus to evaluate " +
      "∫₋₁² f(x) dx.",
    explanation:
      "(a) F(x) = x³ − 2x (any antiderivative works, so this is one " +
      "valid choice with C = 0).\n" +
      "(b) By the Fundamental Theorem of Calculus, " +
      "∫₋₁² f(x) dx = F(2) − F(−1) = (8 − 4) − (−1 + 2) = 4 − 1 = 3.",
  },
  {
    id: "u6-c3-q3",
    chapter: "The Fundamental Theorem of Calculus",
    type: "mc",
    calculatorAllowed: true,
    prompt: "If F(x) = ∫₀ˣ (t² + 1) dt, what is F(3)?",
    choices: [
      { label: "A", text: "9" },
      { label: "B", text: "30" },
      { label: "C", text: "12" },
      { label: "D", text: "10" },
    ],
    correctChoice: "C",
    explanation:
      "By the Fundamental Theorem of Calculus, F(x) = ∫₀ˣ (t² + 1) dt = " +
      "[t³/3 + t] evaluated from 0 to x = x³/3 + x. So " +
      "F(3) = 27/3 + 3 = 9 + 3 = 12.",
  },
  {
    id: "u6-c4-q1",
    chapter: "u-substitution",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Evaluate ∫ 2x(x² + 1)³ dx.",
    choices: [
      { label: "A", text: "4(x² + 1)⁴ + C" },
      { label: "B", text: "(x² + 1)³/3 + C" },
      { label: "C", text: "(x² + 1)⁴ + C" },
      { label: "D", text: "(x² + 1)⁴/4 + C" },
    ],
    correctChoice: "D",
    explanation:
      "Let u = x² + 1, so du = 2x dx. The integral becomes " +
      "∫u³ du = u⁴/4 + C. Substituting back gives (x² + 1)⁴/4 + C.",
  },
  {
    id: "u6-c4-q2",
    chapter: "u-substitution",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Evaluate ∫₀² x√(x² + 5) dx using u-substitution. Show your " +
      "substitution, the new bounds, and the final numerical value.",
    explanation:
      "Let u = x² + 5, so du = 2x dx, i.e. x dx = du/2. When x = 0, " +
      "u = 5; when x = 2, u = 9. The integral becomes " +
      "∫₅⁹ √u (du/2) = (1/2) · (2/3)u^(3/2) evaluated from 5 to 9 = " +
      "(1/3)(9^(3/2) − 5^(3/2)) = (1/3)(27 − 5√5) ≈ (1/3)(27 − 11.18) " +
      "≈ 5.273.",
  },
  {
    id: "u6-c5-q1",
    chapter: "Accumulation functions",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Let g(x) = ∫₂ˣ f(t) dt, where f is continuous. By the " +
      "Fundamental Theorem of Calculus, g'(x) equals which of the " +
      "following?",
    choices: [
      { label: "A", text: "∫f(x) dx" },
      { label: "B", text: "f'(x)" },
      { label: "C", text: "f(2)" },
      { label: "D", text: "f(x)" },
    ],
    correctChoice: "D",
    explanation:
      "The Fundamental Theorem of Calculus, Part 1, states that if " +
      "g(x) = ∫ₐˣ f(t) dt, then g'(x) = f(x). The lower bound and the " +
      "specific antiderivative don't affect this result.",
  },
  {
    id: "u6-c5-q2",
    chapter: "Accumulation functions",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let g(x) = ∫₀ˣ f(t) dt, where the graph of f consists of " +
      "straight-line segments: f(t) = t for 0 ≤ t ≤ 2, and f(t) = 4 − t " +
      "for 2 ≤ t ≤ 6.\n\n" +
      "(a) Find g'(x) and determine any x-value in (0, 6) where g has a " +
      "relative extremum.\n" +
      "(b) Determine whether g is concave up or concave down on (2, 6), " +
      "and justify your answer.",
    explanation:
      "(a) By the Fundamental Theorem of Calculus, g'(x) = f(x). On " +
      "(0, 2), f(t) = t > 0, so g is increasing. On (2, 6), " +
      "f(t) = 4 − t, which is positive for t < 4 and negative for " +
      "t > 4, so g'(x) changes from positive to negative at x = 4 — by " +
      "the First Derivative Test, g has a relative maximum at x = 4.\n" +
      "(b) On (2, 6), f(t) = 4 − t is decreasing, so g'(x) = f(x) is " +
      "decreasing there, meaning g''(x) < 0. Thus g is concave down on " +
      "(2, 6).",
  },
  {
    id: "u6-c5-q3",
    chapter: "Accumulation functions",
    type: "mc",
    calculatorAllowed: true,
    prompt: "Let g(x) = ∫₁ˣ (2t − 4) dt. Find g(4).",
    choices: [
      { label: "A", text: "7" },
      { label: "B", text: "3" },
      { label: "C", text: "−3" },
      { label: "D", text: "12" },
    ],
    correctChoice: "B",
    explanation:
      "An antiderivative of 2t − 4 is t² − 4t, so " +
      "g(x) = [t² − 4t] evaluated from 1 to x = (x² − 4x) − (1 − 4) = " +
      "x² − 4x + 3. Then g(4) = 16 − 16 + 3 = 3.",
  },
  {
    id: "u6-c6-q1",
    chapter: "Integration using long division and completing the square",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Evaluate ∫ (x² + 3)/(x − 1) dx using polynomial long division.",
    choices: [
      { label: "A", text: "x + 4 ln|x − 1| + C" },
      { label: "B", text: "x²/2 + x + 4 ln|x − 1| + C" },
      { label: "C", text: "x²/2 + x + C" },
      { label: "D", text: "x²/2 + 4 ln|x − 1| + C" },
    ],
    correctChoice: "B",
    explanation:
      "Long division gives (x² + 3)/(x − 1) = x + 1 + 4/(x − 1), since " +
      "(x − 1)(x + 1) + 4 = x² + 3. Integrating term by term: " +
      "∫(x + 1) dx = x²/2 + x, and ∫4/(x − 1) dx = 4 ln|x − 1|. " +
      "Combined: x²/2 + x + 4 ln|x − 1| + C.",
  },
  {
    id: "u6-c6-q2",
    chapter: "Integration using long division and completing the square",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Evaluate ∫ 1/(x² − 6x + 13) dx by completing the square, and " +
      "express the antiderivative using an inverse trigonometric " +
      "function.",
    explanation:
      "Complete the square: x² − 6x + 13 = (x − 3)² + 4 = " +
      "(x − 3)² + 2². This matches the form 1/(u² + a²) with u = x − 3 " +
      "and a = 2, whose antiderivative is (1/a) arctan(u/a). So " +
      "∫ 1/(x² − 6x + 13) dx = (1/2) arctan((x − 3)/2) + C.",
  },
];

// Unit 7: Differential Equations. Chapter names match the chapters in
// src/lib/units.ts for Unit 7 so questions can be grouped correctly. Unit 7
// has 6 chapters, but the last 2 (Euler's Method and logistic models) are
// BC-only, and (as with Unit 6) the practice page shows every question in a
// unit to every student regardless of track, so those chapters are
// intentionally excluded here. Questions are spread across the remaining 4
// AB/BC-shared chapters as 4, 4, 4, 3 (15 total).
const UNIT_7_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u7-c1-q1",
    chapter: "Setting up differential equations from context",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "The rate of change of a population P with respect to time t is " +
      "proportional to the product of P and (500 − P). Which " +
      "differential equation models this?",
    choices: [
      { label: "A", text: "dP/dt = kP + 500" },
      { label: "B", text: "P = kt(500 − P)" },
      { label: "C", text: "dP/dt = kP(500 − P)" },
      { label: "D", text: "dP/dt = k(500 − P)" },
    ],
    correctChoice: "C",
    explanation:
      '"Proportional to the product of P and (500 − P)" translates ' +
      "directly to dP/dt = kP(500 − P) for some constant of " +
      "proportionality k.",
  },
  {
    id: "u7-c1-q2",
    chapter: "Setting up differential equations from context",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "A tank contains 100 gallons of brine (salt water) with 20 pounds " +
      "of dissolved salt. Brine containing 2 pounds of salt per gallon " +
      "flows in at a rate of 3 gal/min, and the well-mixed solution " +
      "flows out at the same rate. Let S(t) be the amount of salt (in " +
      "pounds) in the tank at time t (in minutes). Write a differential " +
      "equation for dS/dt in terms of S. (Do not solve it.)",
    explanation:
      "The rate salt enters the tank is (3 gal/min)(2 lb/gal) = 6 " +
      "lb/min. Since the tank stays at 100 gallons, the concentration " +
      "at time t is S/100 lb/gal, so the rate salt leaves is " +
      "(3 gal/min)(S/100 lb/gal) = 3S/100 lb/min. The net rate of " +
      "change is dS/dt = 6 − 3S/100.",
  },
  {
    id: "u7-c1-q3",
    chapter: "Setting up differential equations from context",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      'Which differential equation could represent "the rate at which ' +
      "a rumor spreads through a population of fixed size N is " +
      "proportional to the product of the number of people who have " +
      "heard it, y, and the number who haven't, N − y\"?",
    choices: [
      { label: "A", text: "dy/dt = k(N − y)" },
      { label: "B", text: "dy/dt = ky(N − y)" },
      { label: "C", text: "dy/dt = ky" },
      { label: "D", text: "dy/dt = kNy" },
    ],
    correctChoice: "B",
    explanation:
      'The phrase "proportional to the product of y and (N − y)" ' +
      "translates directly to dy/dt = ky(N − y).",
  },
  {
    id: "u7-c1-q4",
    chapter: "Setting up differential equations from context",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Newton's Law of Cooling states that the rate of change of an " +
      "object's temperature T is proportional to the difference " +
      "between T and the constant ambient temperature A.\n\n" +
      "(a) Write a differential equation for dT/dt in terms of T and A.\n" +
      "(b) If the object starts hotter than its surroundings (T > A), " +
      "what does your equation say about the sign of dT/dt, and does " +
      "that make sense in context?",
    explanation:
      "(a) dT/dt = k(A − T) for some positive constant k (equivalently " +
      "dT/dt = −k(T − A)).\n" +
      "(b) If T > A, then A − T < 0, so dT/dt = k(A − T) < 0 — the " +
      "temperature is decreasing. This makes sense: an object hotter " +
      "than its surroundings should cool down toward A.",
  },
  {
    id: "u7-c2-q1",
    chapter: "Slope fields",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "For the differential equation dy/dx = x − y, the slope field " +
      "segment has slope 0 at which of the following points?",
    choices: [
      { label: "A", text: "(0, 2)" },
      { label: "B", text: "(1, −1)" },
      { label: "C", text: "(2, 0)" },
      { label: "D", text: "(2, 2)" },
    ],
    correctChoice: "D",
    explanation:
      "The slope is 0 when x − y = 0, i.e. x = y. Of the given points, " +
      "only (2, 2) satisfies x = y, since 2 − 2 = 0.",
  },
  {
    id: "u7-c2-q2",
    chapter: "Slope fields",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Consider the differential equation dy/dx = x + y.\n\n" +
      "(a) Find the slope of the solution curve at the points (0, 0), " +
      "(1, 0), and (0, 1).\n" +
      "(b) The line x + y = 0 is called an isocline for this equation. " +
      "Explain what the slopes you found at (0, 0) tell you about the " +
      "slope field along this entire line.",
    explanation:
      "(a) At (0, 0): dy/dx = 0 + 0 = 0. At (1, 0): dy/dx = 1 + 0 = 1. " +
      "At (0, 1): dy/dx = 0 + 1 = 1.\n" +
      "(b) Along the line x + y = 0, every point has x + y = 0, so " +
      "dy/dx = 0 everywhere on that line — the slope field segments are " +
      "all horizontal along the entire isocline, not just at (0, 0).",
  },
  {
    id: "u7-c2-q3",
    chapter: "Slope fields",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "A slope field shows steep positive slopes where y is large and " +
      "positive, and slopes near 0 where y is close to 0 — regardless " +
      "of x. Which differential equation best matches this slope field?",
    choices: [
      { label: "A", text: "dy/dx = 1/y" },
      { label: "B", text: "dy/dx = x − y" },
      { label: "C", text: "dy/dx = y" },
      { label: "D", text: "dy/dx = x" },
    ],
    correctChoice: "C",
    explanation:
      "dy/dx = y makes the slope depend only on y (not x), matching " +
      "the description. The slope is large when y is large and " +
      "approaches 0 as y approaches 0, exactly as described.",
  },
  {
    id: "u7-c2-q4",
    chapter: "Slope fields",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Which statement about slope fields is true?",
    choices: [
      {
        label: "A",
        text: "Slope fields can only be drawn for separable differential equations.",
      },
      {
        label: "B",
        text: "The slope field is the same regardless of which differential equation produced it.",
      },
      {
        label: "C",
        text:
          "At each point (x, y), the slope field segment's slope " +
          "equals dy/dx evaluated at that point.",
      },
      {
        label: "D",
        text: "A slope field directly gives the exact equation of a solution curve.",
      },
    ],
    correctChoice: "C",
    explanation:
      "A slope field is built by evaluating dy/dx at a grid of points " +
      "and drawing a short segment with that slope at each point — it " +
      "sketches the family of solution curves visually but does not by " +
      "itself give an exact formula, and it depends entirely on the " +
      "differential equation used to generate it.",
  },
  {
    id: "u7-c3-q1",
    chapter: "Separation of variables",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Solve dy/dx = xy given y(0) = 2. What is y(x)?",
    choices: [
      { label: "A", text: "y = e^(2x²)" },
      { label: "B", text: "y = 2e^(x²/2)" },
      { label: "C", text: "y = x² + 2" },
      { label: "D", text: "y = 2eˣ" },
    ],
    correctChoice: "B",
    explanation:
      "Separate variables: dy/y = x dx. Integrating gives " +
      "ln|y| = x²/2 + C₁, so y = Ce^(x²/2). Applying y(0) = 2 gives " +
      "C = 2, so y = 2e^(x²/2).",
  },
  {
    id: "u7-c3-q2",
    chapter: "Separation of variables",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Solve the differential equation dy/dx = 2x/y with initial " +
      "condition y(0) = 3. Express y as an explicit function of x.",
    explanation:
      "Separate variables: y dy = 2x dx. Integrating both sides: " +
      "y²/2 = x² + C, so y² = 2x² + C₁. Applying y(0) = 3 gives " +
      "9 = C₁, so y² = 2x² + 9. Since y(0) = 3 > 0, take the positive " +
      "root: y = √(2x² + 9).",
  },
  {
    id: "u7-c3-q3",
    chapter: "Separation of variables",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Which of the following differential equations is separable?",
    choices: [
      { label: "A", text: "dy/dx = x + y" },
      { label: "B", text: "dy/dx = x² + y²" },
      { label: "C", text: "dy/dx = x/(x + y)" },
      { label: "D", text: "dy/dx = xy" },
    ],
    correctChoice: "D",
    explanation:
      "dy/dx = xy can be rewritten as dy/y = x dx, separating the x's " +
      "and y's onto opposite sides. The other equations mix x and y in " +
      "a sum that can't be split into a function of x times a function " +
      "of y.",
  },
  {
    id: "u7-c3-q4",
    chapter: "Separation of variables",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Consider the differential equation dy/dx = y cos(x), with " +
      "y(0) = 1.\n\n" +
      "(a) Solve the differential equation using separation of " +
      "variables, expressing y explicitly in terms of x.\n" +
      "(b) Find y(π/2).",
    explanation:
      "(a) Separate variables: dy/y = cos(x) dx. Integrating gives " +
      "ln|y| = sin(x) + C, so y = Ce^(sin x). Applying y(0) = 1 gives " +
      "C = 1, so y = e^(sin x).\n" +
      "(b) y(π/2) = e^(sin(π/2)) = e¹ = e.",
  },
  {
    id: "u7-c4-q1",
    chapter: "Exponential growth and decay models",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "A radioactive substance decays according to dA/dt = −kA, with " +
      "k > 0. If the substance's half-life is 10 years, what is k, " +
      "rounded to 3 decimal places?",
    choices: [
      { label: "A", text: "0.693" },
      { label: "B", text: "10" },
      { label: "C", text: "0.5" },
      { label: "D", text: "0.069" },
    ],
    correctChoice: "D",
    explanation:
      "The model is A(t) = A₀e^(−kt). Half-life means A(10) = A₀/2, so " +
      "0.5 = e^(−10k). Taking the natural log: ln(0.5) = −10k, so " +
      "k = ln(2)/10 ≈ 0.693/10 ≈ 0.069.",
  },
  {
    id: "u7-c4-q2",
    chapter: "Exponential growth and decay models",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "A population grows according to dP/dt = kP, with P(0) = 200 and " +
      "P(5) = 500.\n\n" +
      "(a) Find the value of k.\n" +
      "(b) Find P(10).",
    explanation:
      "(a) The model is P(t) = 200e^(kt). Using P(5) = 500: " +
      "500 = 200e^(5k), so e^(5k) = 2.5, giving " +
      "k = ln(2.5)/5 ≈ 0.183.\n" +
      "(b) P(10) = 200e^(10k) = 200(e^(5k))² = 200(2.5)² = " +
      "200(6.25) = 1250.",
  },
  {
    id: "u7-c4-q3",
    chapter: "Exponential growth and decay models",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "A bacteria culture triples every 4 hours. If P₀ is the initial " +
      "population and t is measured in hours, which equation models " +
      "the population P(t)?",
    choices: [
      { label: "A", text: "P(t) = P₀e^(3t)" },
      { label: "B", text: "P(t) = P₀e^((ln 3/4)t)" },
      { label: "C", text: "P(t) = 3P₀e^(t/4)" },
      { label: "D", text: "P(t) = P₀e^(4t/3)" },
    ],
    correctChoice: "B",
    explanation:
      "Tripling every 4 hours means P(t) = P₀ · 3^(t/4). Rewriting the " +
      "base as e^(ln 3): P(t) = P₀e^((ln 3)(t/4)) = P₀e^((ln 3/4)t).",
  },
];

// Unit 8: Applications of Integration. Chapter names match the chapters in
// src/lib/units.ts for Unit 8 so questions can be grouped correctly. Unit 8
// has 6 chapters, but the last one (arc length of a smooth, planar curve)
// is BC-only, and (as with Units 6-7) the practice page shows every
// question in a unit to every student regardless of track, so that chapter
// is intentionally excluded here. Questions are spread evenly across the
// remaining 5 AB/BC-shared chapters, 3 each, for 15 total.
const UNIT_8_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u8-c1-q1",
    chapter: "Area between curves",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Find the area of the region enclosed by y = x and y = x² on " +
      "[0, 1].",
    choices: [
      { label: "A", text: "5/6" },
      { label: "B", text: "1/3" },
      { label: "C", text: "1/6" },
      { label: "D", text: "1/2" },
    ],
    correctChoice: "C",
    explanation:
      "On [0, 1], y = x lies above y = x² (since x ≥ x² there). The " +
      "area is ∫₀¹ (x − x²) dx = [x²/2 − x³/3] from 0 to 1 = " +
      "1/2 − 1/3 = 1/6.",
  },
  {
    id: "u8-c1-q2",
    chapter: "Area between curves",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Let R be the region enclosed by y = 6x − x² and y = x².\n\n" +
      "(a) Find the x-coordinates of the points where the curves " +
      "intersect.\n" +
      "(b) Find the area of R.",
    explanation:
      "(a) Set 6x − x² = x², so 6x = 2x², giving 2x² − 6x = 0, i.e. " +
      "2x(x − 3) = 0. The curves intersect at x = 0 and x = 3.\n" +
      "(b) On [0, 3], 6x − x² lies above x² (check x = 1: " +
      "6 − 1 = 5 > 1). The area is " +
      "∫₀³ [(6x − x²) − x²] dx = ∫₀³ (6x − 2x²) dx = " +
      "[3x² − 2x³/3] from 0 to 3 = (27 − 18) − 0 = 9.",
  },
  {
    id: "u8-c1-q3",
    chapter: "Area between curves",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "Find the area of the region enclosed by y = x + 2 and y = x² on " +
      "the interval [−1, 2].",
    choices: [
      { label: "A", text: "6" },
      { label: "B", text: "3" },
      { label: "C", text: "9/4" },
      { label: "D", text: "9/2" },
    ],
    correctChoice: "D",
    explanation:
      "On [−1, 2], y = x + 2 lies above y = x² (check x = 0: 2 > 0). " +
      "The area is ∫₋₁² [(x + 2) − x²] dx = " +
      "[x²/2 + 2x − x³/3] from −1 to 2. At x = 2: 2 + 4 − 8/3 = 10/3. " +
      "At x = −1: 1/2 − 2 + 1/3 = −7/6. The area is " +
      "10/3 − (−7/6) = 20/6 + 7/6 = 27/6 = 9/2.",
  },
  {
    id: "u8-c2-q1",
    chapter: "Volumes with known cross-sections",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "The base of a solid is the region bounded by y = √x, the x-axis, " +
      "and x = 4. Cross-sections perpendicular to the x-axis are " +
      "squares. Find the volume of the solid.",
    choices: [
      { label: "A", text: "4" },
      { label: "B", text: "32" },
      { label: "C", text: "8" },
      { label: "D", text: "16" },
    ],
    correctChoice: "C",
    explanation:
      "Each square cross-section has side length √x (the height of the " +
      "region at that x), so its area is (√x)² = x. The volume is " +
      "∫₀⁴ x dx = [x²/2] from 0 to 4 = 8.",
  },
  {
    id: "u8-c2-q2",
    chapter: "Volumes with known cross-sections",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "The base of a solid is the region bounded by y = 4 − x² and the " +
      "x-axis. Cross-sections perpendicular to the x-axis are " +
      "equilateral triangles with one side lying in the base region.\n\n" +
      "(a) Write an integral expression for the volume of the solid.\n" +
      "(b) Evaluate the integral. (Recall: an equilateral triangle with " +
      "side length s has area (√3/4)s².)",
    explanation:
      "(a) For each x in [−2, 2], the base region has height " +
      "4 − x², which is the side length of the triangular " +
      "cross-section, so its area is (√3/4)(4 − x²)². The volume is " +
      "V = ∫₋₂² (√3/4)(4 − x²)² dx.\n" +
      "(b) Expand (4 − x²)² = 16 − 8x² + x⁴. Using symmetry, " +
      "V = (√3/4) · 2∫₀² (16 − 8x² + x⁴) dx. Evaluating: " +
      "∫₀² 16 dx = 32, ∫₀² 8x² dx = 64/3, ∫₀² x⁴ dx = 32/5. So " +
      "∫₀² (16 − 8x² + x⁴) dx = 32 − 64/3 + 32/5 = 256/15. " +
      "Then V = (√3/4) · 2 · (256/15) = 128√3/15.",
  },
  {
    id: "u8-c2-q3",
    chapter: "Volumes with known cross-sections",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "The base of a solid is the upper half-disk bounded by " +
      "y = √(9 − x²) and the x-axis for −3 ≤ x ≤ 3. Cross-sections " +
      "perpendicular to the x-axis are squares. Find the volume.",
    choices: [
      { label: "A", text: "9π" },
      { label: "B", text: "18" },
      { label: "C", text: "72" },
      { label: "D", text: "36" },
    ],
    correctChoice: "D",
    explanation:
      "Each square has side length √(9 − x²), so its area is 9 − x². " +
      "The volume is ∫₋₃³ (9 − x²) dx = [9x − x³/3] from −3 to 3 = " +
      "(27 − 9) − (−27 + 9) = 18 − (−18) = 36.",
  },
  {
    id: "u8-c3-q1",
    chapter: "Volumes using disk and washer methods",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "The region bounded by y = √x, the x-axis, and x = 4 is revolved " +
      "about the x-axis. Find the volume using the disk method.",
    choices: [
      { label: "A", text: "4π" },
      { label: "B", text: "32π" },
      { label: "C", text: "8π" },
      { label: "D", text: "16π" },
    ],
    correctChoice: "C",
    explanation:
      "Using disks, V = π∫₀⁴ (√x)² dx = π∫₀⁴ x dx = π[x²/2] from 0 to " +
      "4 = π(8) = 8π.",
  },
  {
    id: "u8-c3-q2",
    chapter: "Volumes using disk and washer methods",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "The region bounded by y = x and y = x² on [0, 1] is revolved " +
      "about the x-axis.\n\n" +
      "(a) Identify the outer and inner radius functions for the " +
      "washer method.\n" +
      "(b) Find the volume of the resulting solid.",
    explanation:
      "(a) On [0, 1], y = x lies above y = x², so the outer radius is " +
      "R(x) = x and the inner radius is r(x) = x².\n" +
      "(b) V = π∫₀¹ [x² − (x²)²] dx = π∫₀¹ (x² − x⁴) dx = " +
      "π[x³/3 − x⁵/5] from 0 to 1 = π(1/3 − 1/5) = π(2/15) = 2π/15.",
  },
  {
    id: "u8-c3-q3",
    chapter: "Volumes using disk and washer methods",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "The region bounded by y = x² and y = 4 is revolved about the " +
      "x-axis. Which integral represents the volume using the washer " +
      "method?",
    choices: [
      { label: "A", text: "π∫₋₂² (4 − x²)² dx" },
      { label: "B", text: "π∫₋₂² (16 − x⁴) dx" },
      { label: "C", text: "2π∫₀² x(4 − x²) dx" },
      { label: "D", text: "π∫₋₂² (x⁴ − 16) dx" },
    ],
    correctChoice: "B",
    explanation:
      "The curves intersect where x² = 4, at x = ±2. The outer radius " +
      "is 4 (the line) and the inner radius is x² (the parabola), so " +
      "the washer's area is π(outer² − inner²) = π(4² − (x²)²) = " +
      "π(16 − x⁴). The volume is π∫₋₂² (16 − x⁴) dx. (One distractor " +
      "makes the common mistake of squaring the difference of the " +
      "radii instead of subtracting their squares.)",
  },
  {
    id: "u8-c4-q1",
    chapter: "Average value of a function",
    type: "mc",
    calculatorAllowed: true,
    prompt: "Find the average value of f(x) = x² on [0, 3].",
    choices: [
      { label: "A", text: "6" },
      { label: "B", text: "1" },
      { label: "C", text: "3" },
      { label: "D", text: "9" },
    ],
    correctChoice: "C",
    explanation:
      "The average value is (1/(3 − 0)) ∫₀³ x² dx = (1/3)[x³/3] from " +
      "0 to 3 = (1/3)(9) = 3.",
  },
  {
    id: "u8-c4-q2",
    chapter: "Average value of a function",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Let f(x) = sin(x) on [0, π].\n\n" +
      "(a) Find the average value of f on [0, π].\n" +
      "(b) By the Mean Value Theorem for Integrals, there exists a " +
      "value c in [0, π] with f(c) equal to the average value. Explain " +
      "why the equation sin(c) = your answer to (a) is guaranteed to " +
      "have a solution on [0, π].",
    explanation:
      "(a) The average value is (1/π) ∫₀^π sin(x) dx = " +
      "(1/π)[−cos(x)] from 0 to π = (1/π)(−cos(π) + cos(0)) = " +
      "(1/π)(1 + 1) = 2/π.\n" +
      "(b) Since sin(x) is continuous on [0, π], the Mean Value " +
      "Theorem for Integrals guarantees some c in [0, π] where f(c) " +
      "equals the average value 2/π. Because sin(x) ranges continuously " +
      "from 0 up to 1 and back to 0 on [0, π], and 2/π ≈ 0.637 is " +
      "between those extremes, the Intermediate Value Theorem confirms " +
      "such a c exists.",
  },
  {
    id: "u8-c4-q3",
    chapter: "Average value of a function",
    type: "mc",
    calculatorAllowed: false,
    prompt: "If the average value of f on [1, 5] is 7, what is ∫₁⁵ f(x) dx?",
    choices: [
      { label: "A", text: "7" },
      { label: "B", text: "28" },
      { label: "C", text: "35" },
      { label: "D", text: "4" },
    ],
    correctChoice: "B",
    explanation:
      "The average value formula is avg = (1/(5 − 1)) ∫₁⁵ f(x) dx. " +
      "Setting this equal to 7: 7 = (1/4) ∫₁⁵ f(x) dx, so " +
      "∫₁⁵ f(x) dx = 28.",
  },
  {
    id: "u8-c5-q1",
    chapter: "Motion problems (position, velocity, acceleration)",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "A particle moves along a line with velocity v(t) = 3t² − 6t " +
      "(m/s) for t ≥ 0. Find the particle's displacement from t = 0 to " +
      "t = 3.",
    choices: [
      { label: "A", text: "9 m" },
      { label: "B", text: "−9 m" },
      { label: "C", text: "0 m" },
      { label: "D", text: "18 m" },
    ],
    correctChoice: "C",
    explanation:
      "Displacement is ∫₀³ v(t) dt = ∫₀³ (3t² − 6t) dt = " +
      "[t³ − 3t²] from 0 to 3 = (27 − 27) − 0 = 0.",
  },
  {
    id: "u8-c5-q2",
    chapter: "Motion problems (position, velocity, acceleration)",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "A particle moves along a line with velocity v(t) = 3t² − 6t " +
      "(m/s) for t ≥ 0.\n\n" +
      "(a) Find the time(s) in (0, 3) at which the particle changes " +
      "direction.\n" +
      "(b) Find the total distance traveled by the particle from t = 0 " +
      "to t = 3.",
    explanation:
      "(a) v(t) = 3t² − 6t = 3t(t − 2), so v(t) = 0 at t = 0 and t = 2. " +
      "Testing t = 1: v(1) = 3 − 6 = −3 < 0, and v is positive for " +
      "t > 2 (e.g. v(3) = 27 − 18 = 9 > 0). Since v changes sign at " +
      "t = 2, the particle changes direction there.\n" +
      "(b) Total distance is ∫₀² |v(t)| dt + ∫₂³ |v(t)| dt. " +
      "∫₀² (3t² − 6t) dt = [t³ − 3t²] from 0 to 2 = 8 − 12 = −4, so " +
      "this piece contributes |−4| = 4. " +
      "∫₂³ (3t² − 6t) dt = [t³ − 3t²] from 2 to 3 = " +
      "(27 − 27) − (8 − 12) = 0 − (−4) = 4. The total distance is " +
      "4 + 4 = 8 meters.",
  },
  {
    id: "u8-c5-q3",
    chapter: "Motion problems (position, velocity, acceleration)",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "A particle has acceleration a(t) = 6t − 4 (m/s²) for t ≥ 0, and " +
      "initial velocity v(0) = 3 m/s. Find v(2).",
    choices: [
      { label: "A", text: "16 m/s" },
      { label: "B", text: "7 m/s" },
      { label: "C", text: "12 m/s" },
      { label: "D", text: "3 m/s" },
    ],
    correctChoice: "B",
    explanation:
      "v(t) = ∫a(t) dt = 3t² − 4t + C. Using v(0) = 3 gives C = 3, so " +
      "v(t) = 3t² − 4t + 3. Then v(2) = 3(4) − 4(2) + 3 = 12 − 8 + 3 = 7.",
  },
];

// Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued
// Functions. Chapter names match the chapters in src/lib/units.ts for Unit
// 9 so questions can be grouped correctly. Unlike Units 6-8, Unit 9 itself
// is entirely BC-only (see units.ts), so every chapter is fair game here —
// no chapter-level exclusion is needed. Questions are spread evenly across
// all 5 chapters, 3 each, for 15 total.
const UNIT_9_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u9-c1-q1",
    chapter: "Parametric equations and derivatives",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "A curve is defined parametrically by x = t² − 1 and y = 2t + 1. " +
      "Find dy/dx in terms of t.",
    choices: [
      { label: "A", text: "t" },
      { label: "B", text: "2t" },
      { label: "C", text: "1/t" },
      { label: "D", text: "1/(2t)" },
    ],
    correctChoice: "C",
    explanation:
      "dx/dt = 2t and dy/dt = 2, so dy/dx = (dy/dt)/(dx/dt) = 2/(2t) = " +
      "1/t.",
  },
  {
    id: "u9-c1-q2",
    chapter: "Parametric equations and derivatives",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Given the parametric equations x = t² and y = t³ − 3t:\n\n" +
      "(a) Find dy/dx in terms of t.\n" +
      "(b) Find the value(s) of t in (−2, 2) where the curve has a " +
      "horizontal tangent line.",
    explanation:
      "(a) dx/dt = 2t and dy/dt = 3t² − 3, so " +
      "dy/dx = (3t² − 3)/(2t) for t ≠ 0.\n" +
      "(b) A horizontal tangent requires dy/dt = 0 while dx/dt ≠ 0. " +
      "Setting 3t² − 3 = 0 gives t = ±1, and at both values " +
      "dx/dt = 2t ≠ 0. So the tangent is horizontal at t = −1 and " +
      "t = 1.",
  },
  {
    id: "u9-c1-q3",
    chapter: "Parametric equations and derivatives",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "A curve is defined parametrically by x = t³ and y = t². Find " +
      "dy/dx in terms of t.",
    choices: [
      { label: "A", text: "3t/2" },
      { label: "B", text: "2/(3t)" },
      { label: "C", text: "2t/3" },
      { label: "D", text: "3/(2t)" },
    ],
    correctChoice: "B",
    explanation:
      "dx/dt = 3t² and dy/dt = 2t, so dy/dx = (dy/dt)/(dx/dt) = " +
      "2t/(3t²) = 2/(3t).",
  },
  {
    id: "u9-c2-q1",
    chapter: "Vector-valued functions and motion",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "A particle's position is given by r(t) = ⟨t², 2t − 1⟩. Find the " +
      "velocity vector v(t) = r'(t).",
    choices: [
      { label: "A", text: "⟨2, 2t⟩" },
      { label: "B", text: "⟨t², 2t − 1⟩" },
      { label: "C", text: "⟨2t, 0⟩" },
      { label: "D", text: "⟨2t, 2⟩" },
    ],
    correctChoice: "D",
    explanation:
      "The velocity vector is found by differentiating each component " +
      "of the position vector: r'(t) = ⟨2t, 2⟩.",
  },
  {
    id: "u9-c2-q2",
    chapter: "Vector-valued functions and motion",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "A particle moves along the path r(t) = ⟨t², ln(t)⟩ for t > 0.\n\n" +
      "(a) Find the velocity vector v(t) and the acceleration vector " +
      "a(t).\n" +
      "(b) Find the speed of the particle at t = 1.",
    explanation:
      "(a) v(t) = r'(t) = ⟨2t, 1/t⟩. a(t) = r''(t) = ⟨2, −1/t²⟩.\n" +
      "(b) Speed is the magnitude of velocity: " +
      "|v(1)| = √(2(1))² + (1/1)² = √(4 + 1) = √5.",
  },
  {
    id: "u9-c2-q3",
    chapter: "Vector-valued functions and motion",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "A particle's position is given by r(t) = ⟨cos(2t), sin(2t)⟩. " +
      "Find the speed |v(t)| of the particle.",
    choices: [
      { label: "A", text: "2" },
      { label: "B", text: "4" },
      { label: "C", text: "1" },
      { label: "D", text: "2t" },
    ],
    correctChoice: "A",
    explanation:
      "v(t) = ⟨−2sin(2t), 2cos(2t)⟩, so " +
      "|v(t)| = √(4sin²(2t) + 4cos²(2t)) = √4 = 2.",
  },
  {
    id: "u9-c3-q1",
    chapter: "Polar coordinates and curves",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Which rectangular equation is equivalent to r = 4 cos θ?",
    choices: [
      { label: "A", text: "x² + y² = 16" },
      { label: "B", text: "(x − 4)² + y² = 16" },
      { label: "C", text: "(x − 2)² + y² = 4" },
      { label: "D", text: "(x + 2)² + y² = 4" },
    ],
    correctChoice: "C",
    explanation:
      "Multiply both sides by r: r² = 4r cos θ. Since r² = x² + y² and " +
      "r cos θ = x, this becomes x² + y² = 4x, i.e. x² − 4x + y² = 0. " +
      "Completing the square: (x − 2)² + y² = 4, a circle centered at " +
      "(2, 0) with radius 2.",
  },
  {
    id: "u9-c3-q2",
    chapter: "Polar coordinates and curves",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Consider the cardioid r = 1 + cos θ.\n\n" +
      "(a) Find dr/dθ.\n" +
      "(b) Using y = r sin θ, find dy/dθ, and find a value of θ in " +
      "[0, π] where the tangent line is horizontal.",
    explanation:
      "(a) dr/dθ = −sin θ.\n" +
      "(b) y = (1 + cos θ) sin θ = sin θ + sin θ cos θ = " +
      "sin θ + (1/2) sin(2θ), so dy/dθ = cos θ + cos(2θ). Setting " +
      "dy/dθ = 0 and using cos(2θ) = 2cos²θ − 1 gives " +
      "2cos²θ + cos θ − 1 = 0, which factors as " +
      "(2cos θ − 1)(cos θ + 1) = 0. So cos θ = 1/2 or cos θ = −1, " +
      "giving θ = π/3 or θ = π in [0, π]. At θ = π/3 the tangent line " +
      "is horizontal.",
  },
  {
    id: "u9-c3-q3",
    chapter: "Polar coordinates and curves",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "For the polar curve r = θ, find dy/dx at θ = π/2, using " +
      "x = r cos θ and y = r sin θ.",
    choices: [
      { label: "A", text: "2/π" },
      { label: "B", text: "π/2" },
      { label: "C", text: "−π/2" },
      { label: "D", text: "−2/π" },
    ],
    correctChoice: "D",
    explanation:
      "x = θ cos θ, so dx/dθ = cos θ − θ sin θ. y = θ sin θ, so " +
      "dy/dθ = sin θ + θ cos θ. At θ = π/2: cos θ = 0 and sin θ = 1, so " +
      "dx/dθ = 0 − (π/2)(1) = −π/2, and dy/dθ = 1 + (π/2)(0) = 1. " +
      "Then dy/dx = (dy/dθ)/(dx/dθ) = 1/(−π/2) = −2/π.",
  },
  {
    id: "u9-c4-q1",
    chapter: "Area in polar coordinates",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "Find the area enclosed by the polar curve r = 2 sin θ for " +
      "0 ≤ θ ≤ π.",
    choices: [
      { label: "A", text: "2π" },
      { label: "B", text: "π" },
      { label: "C", text: "4π" },
      { label: "D", text: "π/2" },
    ],
    correctChoice: "B",
    explanation:
      "Area = (1/2)∫₀^π (2 sin θ)² dθ = (1/2)∫₀^π 4sin²θ dθ = " +
      "2∫₀^π sin²θ dθ. Since ∫₀^π sin²θ dθ = π/2, the area is " +
      "2(π/2) = π.",
  },
  {
    id: "u9-c4-q2",
    chapter: "Area in polar coordinates",
    type: "frq",
    calculatorAllowed: true,
    prompt: "Find the total area enclosed by the cardioid r = 2 + 2cos θ.",
    explanation:
      "Area = (1/2)∫₀^(2π) (2 + 2cos θ)² dθ = " +
      "(1/2)∫₀^(2π) (4 + 8cos θ + 4cos²θ) dθ. Evaluating each piece: " +
      "∫₀^(2π) 4 dθ = 8π, ∫₀^(2π) 8cos θ dθ = 0, and " +
      "∫₀^(2π) 4cos²θ dθ = 4π. Summing: 8π + 0 + 4π = 12π. The area " +
      "is (1/2)(12π) = 6π.",
  },
  {
    id: "u9-c4-q3",
    chapter: "Area in polar coordinates",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Which integral represents the area of one petal of the rose " +
      "r = cos(2θ), traced for −π/4 ≤ θ ≤ π/4?",
    choices: [
      { label: "A", text: "(1/2)∫₋π/4^(π/4) cos²(2θ) dθ" },
      { label: "B", text: "∫₋π/4^(π/4) cos²(2θ) dθ" },
      { label: "C", text: "(1/2)∫₋π/4^(π/4) cos(2θ) dθ" },
      { label: "D", text: "(1/2)∫₀^(π/4) cos²(2θ) dθ" },
    ],
    correctChoice: "A",
    explanation:
      "The area enclosed by a polar curve is (1/2)∫ r² dθ over the " +
      "interval that traces the region once. Here r² = cos²(2θ), and " +
      "the petal is traced for θ from −π/4 to π/4, so the area is " +
      "(1/2)∫₋π/4^(π/4) cos²(2θ) dθ.",
  },
  {
    id: "u9-c5-q1",
    chapter: "Arc length in parametric/polar form",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Which integral gives the arc length of the parametric curve " +
      "x = t² and y = t³ for 0 ≤ t ≤ 1?",
    choices: [
      { label: "A", text: "∫₀¹ (4t² + 9t⁴) dt" },
      { label: "B", text: "∫₀¹ √(2t + 3t²) dt" },
      { label: "C", text: "∫₀¹ √(4t + 9t²) dt" },
      { label: "D", text: "∫₀¹ √(4t² + 9t⁴) dt" },
    ],
    correctChoice: "D",
    explanation:
      "Arc length for a parametric curve is " +
      "∫ √((dx/dt)² + (dy/dt)²) dt. Here dx/dt = 2t and dy/dt = 3t², " +
      "so (dx/dt)² + (dy/dt)² = 4t² + 9t⁴, giving " +
      "∫₀¹ √(4t² + 9t⁴) dt.",
  },
  {
    id: "u9-c5-q2",
    chapter: "Arc length in parametric/polar form",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Find the arc length of the parametric curve x = 3cos(t), " +
      "y = 3sin(t) for 0 ≤ t ≤ π, and verify your answer using the " +
      "formula for the circumference of a circle.",
    explanation:
      "dx/dt = −3sin(t) and dy/dt = 3cos(t), so the speed is " +
      "√(9sin²t + 9cos²t) = √9 = 3. The arc length is " +
      "∫₀^π 3 dt = 3π. This curve traces a semicircle of radius 3, " +
      "and half the circumference of a circle with radius 3 is " +
      "(1/2)(2π · 3) = 3π, which matches.",
  },
  {
    id: "u9-c5-q3",
    chapter: "Arc length in parametric/polar form",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Which integral gives the arc length of the polar curve r = θ " +
      "for 0 ≤ θ ≤ π? (Recall: arc length in polar form is " +
      "∫ √(r² + (dr/dθ)²) dθ.)",
    choices: [
      { label: "A", text: "∫₀^π θ dθ" },
      { label: "B", text: "∫₀^π √θ dθ" },
      { label: "C", text: "∫₀^π √(θ² + 1) dθ" },
      { label: "D", text: "∫₀^π (θ² + 1) dθ" },
    ],
    correctChoice: "C",
    explanation:
      "Here r = θ, so dr/dθ = 1. The arc length is " +
      "∫₀^π √(θ² + 1²) dθ = ∫₀^π √(θ² + 1) dθ.",
  },
];

// Unit 10: Infinite Sequences and Series. Chapter names match the chapters
// in src/lib/units.ts for Unit 10 so questions can be grouped correctly.
// Like Unit 9, Unit 10 itself is entirely BC-only, so every chapter is fair
// game. Unit 10 has 10 chapters rather than 5, so questions are spread
// across all 10 as 2, 1, 2, 1, 2, 1, 1, 2, 2, 1 (15 total), weighting the
// chapters most central to the BC exam (geometric series, the nth term
// test, comparison/ratio/integral tests, Taylor/Maclaurin series, and power
// series) with 2 questions each.
const UNIT_10_QUESTIONS: PracticeQuestion[] = [
  {
    id: "u10-c1-q1",
    chapter: "Convergence and divergence of series",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Which statement correctly defines convergence of an infinite " +
      "series ∑aₙ?",
    choices: [
      { label: "A", text: "The series converges if lim(n→∞) aₙ = 0." },
      {
        label: "B",
        text:
          "The series converges if the sequence of partial sums Sₙ " +
          "approaches a finite limit L.",
      },
      {
        label: "C",
        text: "The series converges if aₙ is a decreasing sequence.",
      },
      {
        label: "D",
        text: "The series converges if the terms aₙ are all positive.",
      },
    ],
    correctChoice: "B",
    explanation:
      "A series ∑aₙ converges by definition when its sequence of " +
      "partial sums Sₙ = a₁ + a₂ + ... + aₙ approaches a finite limit L " +
      "as n → ∞. (lim aₙ = 0 is a necessary condition for convergence, " +
      "by the nth term test, but is not sufficient on its own — the " +
      "harmonic series is a classic counterexample.)",
  },
  {
    id: "u10-c2-q1",
    chapter: "Geometric series",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Find the sum of the geometric series ∑_{n=0}^∞ 3(1/2)ⁿ.",
    choices: [
      { label: "A", text: "3" },
      { label: "B", text: "1.5" },
      { label: "C", text: "6" },
      { label: "D", text: "The series diverges." },
    ],
    correctChoice: "C",
    explanation:
      "This is a geometric series with first term a = 3 and common " +
      "ratio r = 1/2. Since |r| < 1, it converges to " +
      "a/(1 − r) = 3/(1/2) = 6.",
  },
  {
    id: "u10-c2-q2",
    chapter: "Geometric series",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Consider the two series:\n" +
      "(i) ∑_{n=1}^∞ 4(3/2)^(n−1)\n" +
      "(ii) ∑_{n=0}^∞ 6(−1/4)ⁿ\n\n" +
      "(a) Determine whether each series converges or diverges, and " +
      "explain why.\n" +
      "(b) For each series that converges, find its sum.",
    explanation:
      "(a) Series (i) is geometric with r = 3/2. Since |r| > 1, it " +
      "diverges. Series (ii) is geometric with r = −1/4. Since " +
      "|r| < 1, it converges.\n" +
      "(b) Series (i) has no sum (it diverges). Series (ii) converges " +
      "to a/(1 − r) = 6/(1 − (−1/4)) = 6/(5/4) = 24/5 = 4.8.",
  },
  {
    id: "u10-c3-q1",
    chapter: "The nth term test for divergence",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Which series can be shown to diverge using the nth term test?",
    choices: [
      { label: "A", text: "∑ 1/n²" },
      { label: "B", text: "∑ 1/n" },
      { label: "C", text: "∑ (1/2)ⁿ" },
      { label: "D", text: "∑ n/(n + 1)" },
    ],
    correctChoice: "D",
    explanation:
      "For ∑ n/(n + 1), lim(n→∞) n/(n + 1) = 1 ≠ 0, so by the nth term " +
      "test this series diverges. (∑ 1/n also diverges, but not by the " +
      "nth term test — its terms do approach 0. ∑ 1/n² and ∑ (1/2)ⁿ " +
      "both converge.)",
  },
  {
    id: "u10-c3-q2",
    chapter: "The nth term test for divergence",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "For the series ∑_{n=1}^∞ (2n² + 1)/(n² + 3), what does the nth " +
      "term test say?",
    choices: [
      {
        label: "A",
        text: "The series diverges since lim aₙ = 2 ≠ 0.",
      },
      { label: "B", text: "The series converges since lim aₙ = 2." },
      { label: "C", text: "The test is inconclusive." },
      { label: "D", text: "The series diverges since aₙ is increasing." },
    ],
    correctChoice: "A",
    explanation:
      "lim(n→∞) (2n² + 1)/(n² + 3) = 2 (divide numerator and " +
      "denominator by n²). Since this limit is 2, not 0, the nth term " +
      "test says the series diverges.",
  },
  {
    id: "u10-c4-q1",
    chapter: "Harmonic series and p-series",
    type: "mc",
    calculatorAllowed: false,
    prompt: "For which value of p does ∑_{n=1}^∞ 1/nᵖ converge?",
    choices: [
      { label: "A", text: "p = 1" },
      { label: "B", text: "p = 0.5" },
      { label: "C", text: "p = −1" },
      { label: "D", text: "p = 2" },
    ],
    correctChoice: "D",
    explanation:
      "A p-series ∑ 1/nᵖ converges if and only if p > 1. Of the given " +
      "options, only p = 2 satisfies this (p = 1 gives the divergent " +
      "harmonic series, and p = 0.5 and p = −1 are both ≤ 1).",
  },
  {
    id: "u10-c5-q1",
    chapter: "Comparison, ratio, and integral tests",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Using the Ratio Test, determine whether ∑_{n=1}^∞ 2ⁿ/n! " +
      "converges or diverges.",
    choices: [
      { label: "A", text: "Diverges, since the limit of the ratio is 2." },
      { label: "B", text: "Converges, since the limit of the ratio is 0." },
      { label: "C", text: "Converges, since the limit of the ratio is 1." },
      { label: "D", text: "The Ratio Test is inconclusive." },
    ],
    correctChoice: "B",
    explanation:
      "With aₙ = 2ⁿ/n!, the ratio is " +
      "aₙ₊₁/aₙ = [2ⁿ⁺¹/(n+1)!] / [2ⁿ/n!] = 2/(n+1), which approaches 0 " +
      "as n → ∞. Since this limit is less than 1, the series converges " +
      "by the Ratio Test.",
  },
  {
    id: "u10-c5-q2",
    chapter: "Comparison, ratio, and integral tests",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Use the Integral Test to determine whether " +
      "∑_{n=2}^∞ 1/(n(ln n)²) converges or diverges. Show the integral " +
      "you evaluate and state its value (or explain why it diverges).",
    explanation:
      "Let f(x) = 1/(x(ln x)²), which is positive, continuous, and " +
      "decreasing for x ≥ 2, so the Integral Test applies. Using " +
      "u = ln x, du = dx/x: " +
      "∫₂^∞ 1/(x(ln x)²) dx = ∫_(ln 2)^∞ 1/u² du = " +
      "[−1/u] from ln 2 to ∞ = 0 − (−1/ln 2) = 1/ln 2, a finite value. " +
      "Since the integral converges, the series ∑ 1/(n(ln n)²) also " +
      "converges by the Integral Test.",
  },
  {
    id: "u10-c6-q1",
    chapter: "Alternating series test",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Which conditions are required to apply the Alternating Series " +
      "Test to ∑ (−1)ⁿ bₙ, where bₙ > 0?",
    choices: [
      { label: "A", text: "bₙ is increasing and lim bₙ = ∞." },
      { label: "B", text: "lim bₙ = 0 is the only condition needed." },
      { label: "C", text: "bₙ is decreasing and lim bₙ = 0." },
      { label: "D", text: "bₙ must be positive and bounded." },
    ],
    correctChoice: "C",
    explanation:
      "The Alternating Series Test requires two conditions on bₙ: it " +
      "must be (eventually) decreasing, and its limit as n → ∞ must be " +
      "0. If both hold, ∑ (−1)ⁿ bₙ converges.",
  },
  {
    id: "u10-c7-q1",
    chapter: "Absolute vs. conditional convergence",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "The series ∑_{n=1}^∞ (−1)ⁿ/n converges by the Alternating " +
      "Series Test, but ∑_{n=1}^∞ 1/n (the harmonic series) diverges. " +
      "This means ∑_{n=1}^∞ (−1)ⁿ/n is:",
    choices: [
      { label: "A", text: "Conditionally convergent" },
      { label: "B", text: "Absolutely convergent" },
      { label: "C", text: "Divergent" },
      { label: "D", text: "Not classifiable with the given information" },
    ],
    correctChoice: "A",
    explanation:
      "A series is absolutely convergent if the series of absolute " +
      "values also converges, and conditionally convergent if the " +
      "series itself converges but the series of absolute values " +
      "diverges. Here ∑ (−1)ⁿ/n converges, but ∑ |(−1)ⁿ/n| = ∑ 1/n " +
      "diverges, so the series is conditionally convergent.",
  },
  {
    id: "u10-c8-q1",
    chapter: "Taylor and Maclaurin series",
    type: "mc",
    calculatorAllowed: false,
    prompt:
      "Find the first three nonzero terms of the Maclaurin series for " + "eˣ.",
    choices: [
      { label: "A", text: "1 − x + x²/2" },
      { label: "B", text: "x + x²/2 + x³/6" },
      { label: "C", text: "1 + x²/2 + x⁴/24" },
      { label: "D", text: "1 + x + x²/2" },
    ],
    correctChoice: "D",
    explanation:
      "The Maclaurin series for eˣ is ∑_{n=0}^∞ xⁿ/n! = " +
      "1 + x + x²/2! + x³/3! + ... = 1 + x + x²/2 + x³/6 + .... The " +
      "first three nonzero terms are 1 + x + x²/2.",
  },
  {
    id: "u10-c8-q2",
    chapter: "Taylor and Maclaurin series",
    type: "frq",
    calculatorAllowed: false,
    prompt:
      "Find the third-degree Taylor polynomial for f(x) = ln(x) " +
      "centered at x = 1. Show the derivatives you use and their " +
      "values at x = 1.",
    explanation:
      "f(x) = ln x, so f(1) = 0. f'(x) = 1/x, so f'(1) = 1. " +
      "f''(x) = −1/x², so f''(1) = −1. f'''(x) = 2/x³, so f'''(1) = 2. " +
      "The third-degree Taylor polynomial centered at x = 1 is " +
      "P₃(x) = f(1) + f'(1)(x − 1) + [f''(1)/2!](x − 1)² + " +
      "[f'''(1)/3!](x − 1)³ = " +
      "(x − 1) − (1/2)(x − 1)² + (1/3)(x − 1)³.",
  },
  {
    id: "u10-c9-q1",
    chapter: "Power series and radius of convergence",
    type: "mc",
    calculatorAllowed: false,
    prompt: "Find the radius of convergence of ∑_{n=1}^∞ xⁿ/n.",
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "1" },
      { label: "C", text: "∞" },
      { label: "D", text: "2" },
    ],
    correctChoice: "B",
    explanation:
      "By the Ratio Test, the ratio of consecutive terms is " +
      "|xⁿ⁺¹/(n+1)| / |xⁿ/n| = |x| · n/(n+1), which approaches |x| as " +
      "n → ∞. The series converges when |x| < 1, so the radius of " +
      "convergence is R = 1.",
  },
  {
    id: "u10-c9-q2",
    chapter: "Power series and radius of convergence",
    type: "frq",
    calculatorAllowed: true,
    prompt:
      "Find the radius and interval of convergence of " +
      "∑_{n=1}^∞ (x − 2)ⁿ/(n · 3ⁿ), checking both endpoints.",
    explanation:
      "By the Ratio Test, the ratio of consecutive terms approaches " +
      "|x − 2|/3 · n/(n+1) → |x − 2|/3. The series converges when " +
      "|x − 2|/3 < 1, i.e. |x − 2| < 3, so the radius of convergence " +
      "is R = 3, giving the open interval (−1, 5) before checking " +
      "endpoints. At x = 5: the series becomes ∑ 3ⁿ/(n · 3ⁿ) = " +
      "∑ 1/n, the divergent harmonic series. At x = −1: the series " +
      "becomes ∑ (−3)ⁿ/(n · 3ⁿ) = ∑ (−1)ⁿ/n, the alternating harmonic " +
      "series, which converges (conditionally) by the Alternating " +
      "Series Test. So the interval of convergence is [−1, 5).",
  },
  {
    id: "u10-c10-q1",
    chapter: "Error bounds for series approximations",
    type: "mc",
    calculatorAllowed: true,
    prompt:
      "The alternating series ∑_{n=1}^∞ (−1)^(n+1)/n! is approximated " +
      "by the sum of its first 4 terms. By the Alternating Series " +
      "Estimation Theorem, the error in this approximation is bounded " +
      "by:",
    choices: [
      { label: "A", text: "1/24" },
      { label: "B", text: "1/6" },
      { label: "C", text: "1/120" },
      { label: "D", text: "1" },
    ],
    correctChoice: "C",
    explanation:
      "The Alternating Series Estimation Theorem says the error is no " +
      "more than the absolute value of the first omitted term. The " +
      "first 4 terms use n = 1 through 4, so the first omitted term is " +
      "at n = 5: |(−1)⁶/5!| = 1/120.",
  },
];

const PRACTICE_QUESTIONS_BY_UNIT: Record<number, PracticeQuestion[]> = {
  1: UNIT_1_QUESTIONS,
  2: UNIT_2_QUESTIONS,
  3: UNIT_3_QUESTIONS,
  4: UNIT_4_QUESTIONS,
  5: UNIT_5_QUESTIONS,
  6: UNIT_6_QUESTIONS,
  7: UNIT_7_QUESTIONS,
  8: UNIT_8_QUESTIONS,
  9: UNIT_9_QUESTIONS,
  10: UNIT_10_QUESTIONS,
};

export function getPracticeQuestions(
  unit: number,
): PracticeQuestion[] | undefined {
  return PRACTICE_QUESTIONS_BY_UNIT[unit];
}
