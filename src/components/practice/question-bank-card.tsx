"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { PracticeQuestion } from "~/lib/practice-questions";
import { cn } from "~/lib/utils";

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4-7 4V4.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

interface QuestionBankCardProps {
  question: PracticeQuestion;
  unit: number;
}

export function QuestionBankCard({ question, unit }: QuestionBankCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Unit {unit}</Badge>
            <Badge variant="outline">
              {question.type === "mc" ? "Multiple choice" : "Free response"}
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">
              {question.label}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSaved((s) => !s)}
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookmarkIcon className={cn("size-3.5", saved && "fill-current")} />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
        <h3 className="text-base font-semibold">{question.chapter}</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="line-clamp-2 text-sm whitespace-pre-line text-muted-foreground">
          {question.prompt}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground italic">
            Not attempted
          </span>
          <Button type="button" size="sm" asChild>
            <Link href={`/question-bank/${question.label}`}>Practice →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
