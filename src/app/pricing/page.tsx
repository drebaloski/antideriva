"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const FREE_FEATURES = [
  "Full diagnostic questionnaire",
  "Browse every unit & chapter",
  "Unit 1 practice questions, unlimited",
  '10 tutor "Ask for help" messages / week',
];

const PLUS_FEATURES = [
  "Everything in Free",
  "Unlimited practice questions, every unit",
  "1,000 AI tutor messages / week",
  "Personalized plan from your diagnostic",
];

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justCheckedOut = searchParams.get("checkout") === "success";
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(justCheckedOut);
  const hasSynced = useRef(false);

  // Returning from Checkout: read the real subscription state from Stripe and
  // persist it, so the plan is correct even if the webhook never arrived.
  useEffect(() => {
    if (!justCheckedOut || hasSynced.current) return;
    hasSynced.current = true;

    (async () => {
      try {
        const res = await fetch("/api/stripe/sync", { method: "POST" });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error ?? "Could not confirm your subscription.");
        } else {
          router.refresh();
        }
      } catch {
        setError("Could not confirm your subscription.");
      } finally {
        setIsSyncing(false);
      }
    })();
  }, [justCheckedOut, router]);

  // Manual recovery for anyone who paid but whose plan didn't stick.
  async function handleRefreshStatus() {
    setError(null);
    setIsSyncing(true);
    try {
      const res = await fetch("/api/stripe/sync", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Could not refresh your subscription.");
      } else {
        router.refresh();
      }
    } catch {
      setError("Could not refresh your subscription.");
    } finally {
      setIsSyncing(false);
    }
  }

  async function handleUpgrade() {
    setError(null);
    setIsRedirecting(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong starting checkout.");
        setIsRedirecting(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong starting checkout.");
      setIsRedirecting(false);
    }
  }

  return (
    <main className="flex flex-col items-center gap-8 p-8">
      <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Simple pricing</h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Start free. Upgrade any time for unlimited practice and more AI tutor
          help.
        </p>
        {isSyncing && (
          <p className="text-sm text-muted-foreground">
            Confirming your subscription…
          </p>
        )}
        {justCheckedOut && !isSyncing && !error && (
          <p className="text-sm font-medium">
            You're on Plus — 1,000 AI tutor messages a week.
          </p>
        )}
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <p className="text-3xl font-bold">$0</p>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="text-sm text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="relative border-primary">
          <Badge className="absolute -top-3 left-6">Suggested</Badge>
          <CardHeader>
            <CardTitle className="text-2xl">Plus</CardTitle>
            <p className="text-3xl font-bold">
              $6.99<span className="text-base font-normal"> / mo</span>
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="flex flex-col gap-3">
              {PLUS_FEATURES.map((feature) => (
                <li key={feature} className="text-sm text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
            <Button onClick={handleUpgrade} disabled={isRedirecting}>
              {isRedirecting ? "Redirecting…" : "Upgrade to Plus"}
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
        </Card>
      </div>

      <button
        type="button"
        onClick={handleRefreshStatus}
        disabled={isSyncing}
        className="text-sm text-muted-foreground underline-offset-4 hover:underline disabled:opacity-50"
      >
        {isSyncing ? "Checking…" : "Already subscribed? Refresh status"}
      </button>
    </main>
  );
}
