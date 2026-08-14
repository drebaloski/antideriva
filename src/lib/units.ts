export interface Chapter {
  title: string;
  bcOnly?: boolean;
}

export interface Unit {
  number: number;
  title: string;
  bcOnly?: boolean;
  chapters: Chapter[];
}

// All 10 units of the AP Calculus AB/BC curriculum. Units 1-8 are shared
// between AB and BC (though BC goes further within a few of them); units 9
// and 10 only exist in BC. Chapters mirror the subtopics used in the
// diagnostic questionnaire so the two stay consistent.
export const UNITS: Unit[] = [
  {
    number: 1,
    title: "Limits and Continuity",
    chapters: [
      { title: "Estimating limits from graphs and tables" },
      { title: "Algebraic techniques for evaluating limits" },
      { title: "Limits involving infinity and asymptotic behavior" },
      { title: "Continuity and identifying discontinuities" },
      { title: "The Intermediate Value Theorem" },
    ],
  },
  {
    number: 2,
    title: "Differentiation: Definition and Fundamental Properties",
    chapters: [
      { title: "Definition of the derivative (limit definition)" },
      { title: "Power, constant, and sum/difference rules" },
      { title: "Product and quotient rules" },
      { title: "Derivatives of trig, exponential, and log functions" },
      { title: "Estimating derivatives from graphs and tables" },
    ],
  },
  {
    number: 3,
    title: "Differentiation: Composite, Implicit, and Inverse Functions",
    chapters: [
      { title: "Chain rule" },
      { title: "Implicit differentiation" },
      { title: "Derivatives of inverse functions" },
      { title: "Derivatives of inverse trigonometric functions" },
      { title: "Higher-order derivatives" },
    ],
  },
  {
    number: 4,
    title: "Contextual Applications of Differentiation",
    chapters: [
      { title: "Straight-line motion: position, velocity, and acceleration" },
      { title: "Related rates" },
      { title: "Linear approximation and local linearity" },
      { title: "L'Hôpital's Rule for limits" },
      { title: "Interpreting derivatives as rates of change in context" },
    ],
  },
  {
    number: 5,
    title: "Analytical Applications of Differentiation",
    chapters: [
      { title: "The Mean Value Theorem" },
      { title: "Finding critical points and increasing/decreasing intervals" },
      { title: "First derivative test for relative extrema" },
      { title: "The Candidates Test for absolute (global) extrema" },
      { title: "Concavity and the second derivative test" },
      { title: "Interpreting graphs of f, f′, and f″ together" },
      { title: "Optimization word problems" },
      { title: "Analyzing behaviors of implicit relations" },
    ],
  },
  {
    number: 6,
    title: "Integration and Accumulation of Change",
    chapters: [
      { title: "Antiderivatives and indefinite integrals" },
      { title: "Riemann sums and definite integrals" },
      { title: "The Fundamental Theorem of Calculus" },
      { title: "u-substitution" },
      { title: "Accumulation functions" },
      { title: "Integration using long division and completing the square" },
      { title: "Integration by parts", bcOnly: true },
      { title: "Integration using partial fractions", bcOnly: true },
      { title: "Evaluating improper integrals", bcOnly: true },
    ],
  },
  {
    number: 7,
    title: "Differential Equations",
    chapters: [
      { title: "Setting up differential equations from context" },
      { title: "Slope fields" },
      { title: "Separation of variables" },
      { title: "Exponential growth and decay models" },
      {
        title: "Euler's Method for approximating solutions",
        bcOnly: true,
      },
      { title: "Logistic models with differential equations", bcOnly: true },
    ],
  },
  {
    number: 8,
    title: "Applications of Integration",
    chapters: [
      { title: "Area between curves" },
      { title: "Volumes with known cross-sections" },
      { title: "Volumes using disk and washer methods" },
      { title: "Average value of a function" },
      { title: "Motion problems (position, velocity, acceleration)" },
      { title: "Arc length of a smooth, planar curve", bcOnly: true },
    ],
  },
  {
    number: 9,
    title:
      "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
    bcOnly: true,
    chapters: [
      { title: "Parametric equations and derivatives" },
      { title: "Vector-valued functions and motion" },
      { title: "Polar coordinates and curves" },
      { title: "Area in polar coordinates" },
      { title: "Arc length in parametric/polar form" },
    ],
  },
  {
    number: 10,
    title: "Infinite Sequences and Series",
    bcOnly: true,
    chapters: [
      { title: "Convergence and divergence of series" },
      { title: "Geometric series" },
      { title: "The nth term test for divergence" },
      { title: "Harmonic series and p-series" },
      { title: "Comparison, ratio, and integral tests" },
      { title: "Alternating series test" },
      { title: "Absolute vs. conditional convergence" },
      { title: "Taylor and Maclaurin series" },
      { title: "Power series and radius of convergence" },
      { title: "Error bounds for series approximations" },
    ],
  },
];
