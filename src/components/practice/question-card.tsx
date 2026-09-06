"use client";

import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import type { PracticeQuestion } from "~/lib/practice-questions";
import { isBcOnlyChapter } from "~/lib/units";
import { cn } from "~/lib/utils";
import { MathText } from "./math-text";
import { TutorPanel } from "./tutor-panel";

export type QuestionAttemptResult = "correct" | "incorrect" | "attempted";

interface QuestionCardProps {
  question: PracticeQuestion;
  index: number;
  onReveal?: (result: QuestionAttemptResult) => void;
}

export function QuestionCard({ question, index, onReveal }: QuestionCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const studentWork =
    question.type === "mc"
      ? selectedChoice
        ? `Selected choice: ${selectedChoice}`
        : ""
      : response;

  const isCorrect =
    question.type === "mc" && selectedChoice === question.correctChoice;
  const canReveal = question.type === "frq" || selectedChoice !== null;

  function toggleRevealed() {
    const nextRevealed = !revealed;
    setRevealed(nextRevealed);
    if (nextRevealed) {
      onReveal?.(
        question.type === "mc"
          ? isCorrect
            ? "correct"
            : "incorrect"
          : "attempted",
      );
    }
  }

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Question {index + 1}</Badge>
          <Badge variant="secondary">{question.chapter}</Badge>
          <Badge variant="outline">
            {question.type === "mc" ? "Multiple choice" : "Free response"}
          </Badge>
          <Badge variant="outline">
            {question.calculatorAllowed
              ? "Calculator allowed"
              : "No calculator"}
          </Badge>
          <Badge variant="outline" className="font-mono">
            {question.label}
          </Badge>
          {isBcOnlyChapter(question.chapter) && (
            <Badge variant="default">BC</Badge>
          )}
        </div>
        <p className="whitespace-pre-line text-sm">
          <MathText text={question.prompt} />
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {question.type === "mc" && question.choices ? (
          <div className="flex flex-col gap-2">
            {question.choices.map((choice) => {
              const isSelected = selectedChoice === choice.label;
              const isTheCorrectChoice =
                choice.label === question.correctChoice;
              return (
                <button
                  key={choice.label}
                  type="button"
                  onClick={() => !revealed && setSelectedChoice(choice.label)}
                  disabled={revealed}
                  className={cn(
                    "flex items-start gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                    isSelected && !revealed && "border-primary bg-primary/5",
                    revealed &&
                      isTheCorrectChoice &&
                      "border-primary bg-primary/10",
                    revealed &&
                      isSelected &&
                      !isTheCorrectChoice &&
                      "border-destructive bg-destructive/10",
                    !isSelected && !revealed && "hover:bg-accent",
                  )}
                >
                  <span className="font-semibold">{choice.label}.</span>
                  <span>
                    <MathText text={choice.text} />
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Show your work..."
            disabled={revealed}
            className="min-h-24"
          />
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={toggleRevealed}
            disabled={!revealed && !canReveal}
          >
            {revealed
              ? "Hide solution"
              : question.type === "mc"
                ? "Check answer"
                : "Show solution"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setHelpOpen((o) => !o)}
          >
            {helpOpen ? "Close help" : "Ask for help"}
          </Button>
        </div>

        {revealed && (
          <div className="flex flex-col gap-1 rounded-md border bg-muted/30 p-3 text-sm">
            {question.type === "mc" && (
              <p
                className={cn(
                  "font-medium",
                  isCorrect ? "text-foreground" : "text-destructive",
                )}
              >
                {isCorrect
                  ? "✓ Correct!"
                  : `✗ Not quite — correct answer: ${question.correctChoice}`}
              </p>
            )}
            <p className="whitespace-pre-line text-muted-foreground">
              <MathText text={question.explanation} />
            </p>
          </div>
        )}

        {helpOpen && (
          <TutorPanel question={question} studentWork={studentWork} />
        )}
      </CardContent>
    </Card>
  );
}
