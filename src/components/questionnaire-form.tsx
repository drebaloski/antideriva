"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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

export function QuestionnaireForm() {
  const router = useRouter();
  const [track, setTrack] = useState<Track | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!track) return;
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

    const { error } = await supabase.from("diagnostic_responses").insert({
      user_id: user.id,
      track,
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
    <div className="flex w-full flex-col gap-4">
      <p className="text-left text-sm font-medium">
        Which course are you taking?
      </p>
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
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button disabled={!track || submitting} onClick={handleSubmit}>
        {submitting ? "Saving..." : "Continue"}
      </Button>
    </div>
  );
}
