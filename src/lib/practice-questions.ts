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

const PRACTICE_QUESTIONS_BY_UNIT: Record<number, PracticeQuestion[]> = {
  1: UNIT_1_QUESTIONS,
  2: UNIT_2_QUESTIONS,
};

export function getPracticeQuestions(
  unit: number,
): PracticeQuestion[] | undefined {
  return PRACTICE_QUESTIONS_BY_UNIT[unit];
}
