"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import type { PracticeQuestion } from "~/lib/practice-questions";
import { cn } from "~/lib/utils";

interface TutorPanelProps {
  question: PracticeQuestion;
  studentWork: string;
}

export function TutorPanel({ question, studentWork }: TutorPanelProps) {
  const [transport] = useState(
    () => new DefaultChatTransport({ api: "/api/tutor" }),
  );
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({ transport });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage(
      { text },
      {
        body: {
          question: {
            prompt: question.prompt,
            type: question.type,
            calculatorAllowed: question.calculatorAllowed,
            choices: question.choices,
            explanation: question.explanation,
          },
          studentWork,
        },
      },
    );
  }

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-3">
      <p className="text-xs font-medium text-muted-foreground">
        Ask for help — your tutor will guide you, not give away the answer.
      </p>
      <div className="flex flex-col gap-2">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            Stuck? Tell the tutor what you've tried or where you're confused.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
              message.role === "user"
                ? "self-end bg-primary text-primary-foreground"
                : "self-start bg-background",
            )}
          >
            {message.parts.map((part, index) =>
              part.type === "text" ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: message parts don't have stable ids
                <span key={index}>{part.text}</span>
              ) : null,
            )}
          </div>
        ))}
        {status === "submitted" && (
          <p className="self-start text-sm text-muted-foreground">Thinking…</p>
        )}
        {error && (
          <p className="text-sm text-destructive">
            Something went wrong reaching the tutor. Try again.
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What are you stuck on?"
          className="min-h-9 flex-1 resize-none"
          rows={1}
        />
        <Button type="submit" size="sm" disabled={isBusy || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
