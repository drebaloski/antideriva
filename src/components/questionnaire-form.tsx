"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { createClient } from "~/lib/supabase/client";
import { cn } from "~/lib/utils";

const TRACKS = [
  {
    value: "AB",
    label: "AP Calculus AB",
    description:
      "Limits, derivatives, and integrals — a full year of single-variable calculus.",
  },
  {
    value: "BC",
    label: "AP Calculus BC",
    description:
      "Everything in AB, plus series, parametric and polar functions, and more.",
  },
] as const;

type Track = (typeof TRACKS)[number]["value"];

const UNITS = [
  { key: "limits", shortLabel: "Limits & Continuity", bcOnly: false },
  { key: "diff-basics", shortLabel: "Differentiation: Basics", bcOnly: false },
  {
    key: "diff-composite",
    shortLabel: "Differentiation: Composite/Implicit",
    bcOnly: false,
  },
  {
    key: "contextual-apps",
    shortLabel: "Contextual Applications of Differentiation",
    bcOnly: false,
  },
  {
    key: "analytical-apps",
    shortLabel: "Analytical Applications of Differentiation",
    bcOnly: false,
  },
  {
    key: "integration",
    shortLabel: "Integration & Accumulation of Change",
    bcOnly: false,
  },
  { key: "diff-eq", shortLabel: "Differential Equations", bcOnly: false },
  {
    key: "integration-apps",
    shortLabel: "Applications of Integration",
    bcOnly: false,
  },
  {
    key: "parametric-polar-vector",
    shortLabel: "Parametric, Polar & Vector Functions",
    bcOnly: true,
  },
  { key: "series", shortLabel: "Infinite Sequences & Series", bcOnly: true },
] as const;

const COMFORT_LEVELS = [
  "Very weak",
  "Somewhat weak",
  "Haven't learned yet",
  "Somewhat strong",
  "Very strong",
];

const DEFAULT_RATING = 2;
const WEAK_RATING_THRESHOLD = 2;
const NOT_SURE_OPTION = "Not sure — I need a refresher on the whole unit";

const QUESTION_FORMATS = [
  { key: "mc-no-calc", label: "Multiple choice, no calculator" },
  { key: "mc-calc", label: "Multiple choice, calculator allowed" },
  { key: "frq-no-calc", label: "Free response, no calculator" },
  { key: "frq-calc", label: "Free response, calculator allowed" },
] as const;

const MISTAKE_PATTERNS = [
  "I don't understand the concept",
  "I understand the concept but make careless errors",
  "I run out of time",
  "I get confused by the wording of the problem",
  "I'm not sure how to start",
];

const SUBTOPICS: Record<string, string[]> = {
  limits: [
    "Estimating limits from graphs and tables",
    "Algebraic techniques for evaluating limits",
    "Limits involving infinity and asymptotic behavior",
    "Continuity and identifying discontinuities",
    "The Intermediate Value Theorem",
  ],
  "diff-basics": [
    "Definition of the derivative (limit definition)",
    "Power, constant, and sum/difference rules",
    "Product and quotient rules",
    "Derivatives of trig, exponential, and log functions",
    "Estimating derivatives from graphs and tables",
  ],
  "diff-composite": [
    "Chain rule",
    "Implicit differentiation",
    "Derivatives of inverse functions",
    "Higher-order derivatives",
  ],
  "contextual-apps": [
    "Related rates",
    "Linear approximation and local linearity",
    "L'Hôpital's Rule for limits",
    "Interpreting derivatives as rates of change in context",
  ],
  "analytical-apps": [
    "Finding critical points and increasing/decreasing intervals",
    "First derivative test for relative extrema",
    "Concavity and the second derivative test",
    "Interpreting graphs of f, f′, and f″ together",
    "Optimization word problems",
  ],
  integration: [
    "Antiderivatives and indefinite integrals",
    "Riemann sums and definite integrals",
    "The Fundamental Theorem of Calculus",
    "u-substitution",
    "Accumulation functions",
  ],
  "diff-eq": [
    "Setting up differential equations from context",
    "Slope fields",
    "Separation of variables",
    "Exponential growth and decay models",
  ],
  "integration-apps": [
    "Area between curves",
    "Volumes with known cross-sections",
    "Volumes using disk and washer methods",
    "Average value of a function",
    "Motion problems (position, velocity, acceleration)",
  ],
  "parametric-polar-vector": [
    "Parametric equations and derivatives",
    "Vector-valued functions and motion",
    "Polar coordinates and curves",
    "Arc length in parametric/polar form",
  ],
  series: [
    "Convergence and divergence of series",
    "Comparison, ratio, and integral tests",
    "Taylor and Maclaurin series",
    "Power series and radius of convergence",
    "Error bounds for series approximations",
  ],
};

export function QuestionnaireForm() {
  const router = useRouter();
  const [step, setStep] = useState<
    "track" | "topics" | "subtopics" | "confidence" | "formats"
  >("track");
  const [track, setTrack] = useState<Track | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [subtopics, setSubtopics] = useState<Record<string, string[]>>({});
  const [mistakePattern, setMistakePattern] = useState<string | null>(null);
  const [formatRatings, setFormatRatings] = useState<Record<string, number>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeUnits = UNITS.filter((unit) => !(unit.bcOnly && track === "AB"));
  const weakUnits = activeUnits.filter(
    (unit) => (ratings[unit.key] ?? DEFAULT_RATING) <= WEAK_RATING_THRESHOLD,
  );

  function setRating(unitKey: string, value: number) {
    setRatings((prev) => ({ ...prev, [unitKey]: value }));
  }

  function setFormatRating(formatKey: string, value: number) {
    setFormatRatings((prev) => ({ ...prev, [formatKey]: value }));
  }

  function toggleSubtopic(unitKey: string, subtopic: string) {
    setSubtopics((prev) => {
      const current = prev[unitKey] ?? [];
      if (subtopic === NOT_SURE_OPTION) {
        return {
          ...prev,
          [unitKey]: current.includes(NOT_SURE_OPTION) ? [] : [NOT_SURE_OPTION],
        };
      }
      const withoutNotSure = current.filter((s) => s !== NOT_SURE_OPTION);
      const next = withoutNotSure.includes(subtopic)
        ? withoutNotSure.filter((s) => s !== subtopic)
        : [...withoutNotSure, subtopic];
      return { ...prev, [unitKey]: next };
    });
  }

  function handleTopicsContinue() {
    setStep(weakUnits.length > 0 ? "subtopics" : "confidence");
  }

  async function handleSubmit() {
    if (!track || !mistakePattern) return;
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const topicRatings = Object.fromEntries(
      activeUnits.map((unit) => [
        unit.key,
        ratings[unit.key] ?? DEFAULT_RATING,
      ]),
    );
    const weakSubtopics = Object.fromEntries(
      weakUnits.map((unit) => [unit.key, subtopics[unit.key] ?? []]),
    );
    const formatRatingsPayload = Object.fromEntries(
      QUESTION_FORMATS.map((format) => [
        format.key,
        formatRatings[format.key] ?? DEFAULT_RATING,
      ]),
    );

    const { error } = await supabase.from("diagnostic_responses").insert({
      user_id: user.id,
      track,
      topic_ratings: topicRatings,
      weak_subtopics: weakSubtopics,
      mistake_pattern: mistakePattern,
      format_ratings: formatRatingsPayload,
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-12 md:flex-row md:gap-20">
      <div className="flex shrink-0 flex-col justify-center md:w-64">
        <p className="text-center text-3xl font-bold tracking-tight">
          <span
            className="inline-block rotate-[-1deg] px-3 py-1 text-white [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
            style={{
              backgroundColor: "#E76F51",
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
            }}
          >
            Let&apos;s start with one problem you have right now.
          </span>
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        {step === "topics" && track ? (
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-tight">
              How comfortable are you with each of the following topics?
            </h1>
            <div className="overflow-x-auto">
              <div className="flex min-w-[640px] flex-col gap-1">
                <div className="flex items-center gap-4">
                  <div className="w-40 shrink-0 sm:w-52" />
                  <div className="flex flex-1 justify-between">
                    {COMFORT_LEVELS.map((level) => (
                      <span
                        key={level}
                        className="w-1/5 text-center text-xs font-medium text-muted-foreground"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4 pt-2">
                  {activeUnits.map((unit) => (
                    <div key={unit.key} className="flex items-center gap-4">
                      <div className="w-40 shrink-0 text-xs font-medium sm:w-52 sm:text-sm">
                        {unit.shortLabel}
                      </div>
                      <div className="flex-1">
                        <div className="px-[10%]">
                          <Slider
                            min={0}
                            max={4}
                            step={1}
                            value={[ratings[unit.key] ?? DEFAULT_RATING]}
                            onValueChange={([value]) =>
                              value !== undefined && setRating(unit.key, value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("track")}>
                Back
              </Button>
              <Button onClick={handleTopicsContinue} className="flex-1">
                Continue
              </Button>
            </div>
          </div>
        ) : step === "subtopics" && track ? (
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-tight">
              Which specific skills do you struggle with most?
            </h1>
            <p className="text-sm text-muted-foreground">
              Select all that apply for each topic you&apos;re still working on.
            </p>
            <div className="flex flex-col gap-6">
              {weakUnits.map((unit) => (
                <fieldset key={unit.key} className="flex flex-col gap-2">
                  <legend className="text-sm font-semibold">
                    {unit.shortLabel}
                  </legend>
                  <div className="flex flex-col gap-1.5">
                    {[...SUBTOPICS[unit.key], NOT_SURE_OPTION].map(
                      (subtopic) => {
                        const checked = (subtopics[unit.key] ?? []).includes(
                          subtopic,
                        );
                        return (
                          <label
                            key={subtopic}
                            className="flex items-start gap-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              className="mt-0.5 size-4 accent-primary"
                              checked={checked}
                              onChange={() =>
                                toggleSubtopic(unit.key, subtopic)
                              }
                            />
                            <span
                              className={cn(
                                subtopic === NOT_SURE_OPTION &&
                                  "text-muted-foreground italic",
                              )}
                            >
                              {subtopic}
                            </span>
                          </label>
                        );
                      },
                    )}
                  </div>
                </fieldset>
              ))}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("topics")}>
                Back
              </Button>
              <Button onClick={() => setStep("confidence")} className="flex-1">
                Continue
              </Button>
            </div>
          </div>
        ) : step === "confidence" && track ? (
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-tight">
              When you get a problem wrong, it&apos;s usually because:
            </h1>
            <div className="flex flex-col gap-2">
              {MISTAKE_PATTERNS.map((pattern) => (
                <label
                  key={pattern}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors",
                    mistakePattern === pattern
                      ? "border-primary"
                      : "hover:border-foreground/30",
                  )}
                >
                  <input
                    type="radio"
                    name="mistake-pattern"
                    className="size-4 accent-primary"
                    checked={mistakePattern === pattern}
                    onChange={() => setMistakePattern(pattern)}
                  />
                  {pattern}
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setStep(weakUnits.length > 0 ? "subtopics" : "topics")
                }
              >
                Back
              </Button>
              <Button
                disabled={!mistakePattern}
                onClick={() => setStep("formats")}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        ) : step === "formats" && track ? (
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-tight">
              How comfortable are you with each AP question format?
            </h1>
            <div className="overflow-x-auto">
              <div className="flex min-w-[640px] flex-col gap-1">
                <div className="flex items-center gap-4">
                  <div className="w-40 shrink-0 sm:w-52" />
                  <div className="flex flex-1 justify-between">
                    {COMFORT_LEVELS.map((level) => (
                      <span
                        key={level}
                        className="w-1/5 text-center text-xs font-medium text-muted-foreground"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4 pt-2">
                  {QUESTION_FORMATS.map((format) => (
                    <div key={format.key} className="flex items-center gap-4">
                      <div className="w-40 shrink-0 text-xs font-medium sm:w-52 sm:text-sm">
                        {format.label}
                      </div>
                      <div className="flex-1">
                        <div className="px-[10%]">
                          <Slider
                            min={0}
                            max={4}
                            step={1}
                            value={[
                              formatRatings[format.key] ?? DEFAULT_RATING,
                            ]}
                            onValueChange={([value]) =>
                              value !== undefined &&
                              setFormatRating(format.key, value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("confidence")}>
                Back
              </Button>
              <Button
                disabled={submitting}
                onClick={handleSubmit}
                className="flex-1"
              >
                {submitting ? "Saving..." : "Finish"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-tight">
              Which course are you taking?
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TRACKS.map((t) => (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => setTrack(t.value)}
                  className="text-left"
                >
                  <Card
                    className={cn(
                      "h-full transition-colors",
                      track === t.value
                        ? "border-primary"
                        : "hover:border-foreground/30",
                    )}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{t.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {t.description}
                      </p>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
            <Button disabled={!track} onClick={() => setStep("topics")}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
