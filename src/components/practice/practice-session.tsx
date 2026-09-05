"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  type QuestionAttemptResult,
  QuestionCard,
} from "~/components/practice/question-card";
import { Button } from "~/components/ui/button";
import type { PracticeQuestion } from "~/lib/practice-questions";
import { cn } from "~/lib/utils";

type QuestionStatus = QuestionAttemptResult | "unanswered";

interface SessionState {
  status: Record<string, QuestionStatus>;
  marked: string[];
}

const EMPTY_SESSION: SessionState = { status: {}, marked: [] };

function storageKey(unitNumber: number) {
  return `antideriva:practice-session:unit-${unitNumber}`;
}

function loadSession(unitNumber: number): SessionState {
  if (typeof window === "undefined") return EMPTY_SESSION;
  try {
    const raw = window.localStorage.getItem(storageKey(unitNumber));
    if (!raw) return EMPTY_SESSION;
    const parsed = JSON.parse(raw) as Partial<SessionState>;
    return { status: parsed.status ?? {}, marked: parsed.marked ?? [] };
  } catch {
    return EMPTY_SESSION;
  }
}

function saveSession(unitNumber: number, session: SessionState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      storageKey(unitNumber),
      JSON.stringify(session),
    );
  } catch {
    // Private browsing / storage full — the session just won't persist.
  }
}

function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 21V4a1 1 0 0 1 1-1h10.5a1 1 0 0 1 .8 1.6l-2.6 3.4 2.6 3.4a1 1 0 0 1-.8 1.6H6v8" />
    </svg>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn("size-2.5 rounded-full", className)} />
      {label}
    </span>
  );
}

function QuestionJumpGrid({
  unitNumber,
  unitTitle,
  questions,
  session,
  onClose,
  onNavigate,
}: {
  unitNumber: number;
  unitTitle?: string;
  questions: PracticeQuestion[];
  session: SessionState;
  onClose: () => void;
  onNavigate: (label: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Jump to question"
        className="relative flex max-h-[80vh] w-full max-w-md flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 shadow-lg"
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold">Jump to question</h2>
            <p className="text-xs text-muted-foreground">
              Unit {unitNumber}
              {unitTitle ? `: ${unitTitle}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <LegendDot className="bg-primary" label="Correct" />
          <LegendDot className="bg-destructive" label="Incorrect" />
          <LegendDot className="bg-muted-foreground/40" label="Attempted" />
          <LegendDot className="border border-border" label="Unanswered" />
        </div>

        <div className="grid grid-cols-6 gap-2 overflow-y-auto">
          {questions.map((q, i) => {
            const status = session.status[q.label] ?? "unanswered";
            const isMarked = session.marked.includes(q.label);
            return (
              <button
                key={q.label}
                type="button"
                onClick={() => onNavigate(q.label)}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-md border text-sm font-medium transition-colors",
                  status === "correct" &&
                    "border-transparent bg-primary text-primary-foreground",
                  status === "incorrect" &&
                    "border-transparent bg-destructive text-white",
                  status === "attempted" &&
                    "border-transparent bg-muted-foreground/30 text-foreground",
                  status === "unanswered" &&
                    "border-border text-muted-foreground hover:bg-accent",
                )}
              >
                {i + 1}
                {isMarked && (
                  <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-background ring-1 ring-border">
                    <FlagIcon className="size-2.5 fill-primary text-primary" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface PracticeSessionProps {
  unitNumber: number;
  unitTitle?: string;
  questions: PracticeQuestion[];
  index: number;
  question: PracticeQuestion;
}

export function PracticeSession({
  unitNumber,
  unitTitle,
  questions,
  index,
  question,
}: PracticeSessionProps) {
  const router = useRouter();
  const [session, setSession] = useState<SessionState>(EMPTY_SESSION);
  const [gridOpen, setGridOpen] = useState(false);

  // Each question is its own page load, so re-read the persisted session
  // whenever we land on a (possibly different) question.
  useEffect(() => {
    setSession(loadSession(unitNumber));
  }, [unitNumber]);

  const marked = session.marked.includes(question.label);

  function toggleMarked() {
    setSession((prev) => {
      const next: SessionState = {
        ...prev,
        marked: marked
          ? prev.marked.filter((label) => label !== question.label)
          : [...prev.marked, question.label],
      };
      saveSession(unitNumber, next);
      return next;
    });
  }

  function handleReveal(result: QuestionAttemptResult) {
    setSession((prev) => {
      const next: SessionState = {
        ...prev,
        status: { ...prev.status, [question.label]: result },
      };
      saveSession(unitNumber, next);
      return next;
    });
  }

  const previous = questions[index - 1];
  const next = questions[index + 1];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          Question {index + 1} of {questions.length}
        </span>
        <button
          type="button"
          onClick={toggleMarked}
          className={cn(
            "flex items-center gap-1.5 text-sm font-medium transition-colors",
            marked
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <FlagIcon className={cn("size-4", marked && "fill-primary")} />
          {marked ? "Marked for review" : "Mark for review"}
        </button>
      </div>

      <QuestionCard question={question} index={index} onReveal={handleReveal} />

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <span className="font-mono text-xs text-muted-foreground">
          Question ref: {question.label}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setGridOpen(true)}
          >
            Question {index + 1} ▾
          </Button>
          {previous && (
            <Button type="button" variant="outline" asChild>
              <Link href={`/question-bank/${previous.label}`}>← Previous</Link>
            </Button>
          )}
          {next ? (
            <Button type="button" asChild>
              <Link href={`/question-bank/${next.label}`}>Next →</Link>
            </Button>
          ) : (
            <Button type="button" asChild>
              <Link href={`/question-bank#unit-${unitNumber}`}>
                Finish unit →
              </Link>
            </Button>
          )}
        </div>
      </div>

      {gridOpen && (
        <QuestionJumpGrid
          unitNumber={unitNumber}
          unitTitle={unitTitle}
          questions={questions}
          session={session}
          onClose={() => setGridOpen(false)}
          onNavigate={(label) => {
            setGridOpen(false);
            router.push(`/question-bank/${label}`);
          }}
        />
      )}
    </div>
  );
}
