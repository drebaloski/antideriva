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

const PRACTICE_QUESTIONS_BY_UNIT: Record<number, PracticeQuestion[]> = {
  1: UNIT_1_QUESTIONS,
};

export function getPracticeQuestions(
  unit: number,
): PracticeQuestion[] | undefined {
  return PRACTICE_QUESTIONS_BY_UNIT[unit];
}
