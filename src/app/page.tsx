import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const STRUGGLES = [
  {
    title: "Following steps isn't the same as understanding",
    body: "You can copy exactly what's on the board, or answer questions the same way — then freeze the moment you have to start a problem alone.",
  },
  {
    title: "It has to be said out loud to sink in",
    body: "Concepts often don't solidify by reading or watching. They click once you're explaining your own reasoning to someone else.",
  },
  {
    title: "Most explanations don't stick",
    body: "Lectures rarely connect new ideas to what you already know, tie them to something real, or ask you to predict before showing the answer.",
  },
];

const APPROACH = [
  {
    title: "Practice starting from a blank page",
    body: "Copying a teacher's steps is easy. Starting cold isn't. Antideriva has you solve every problem from scratch.",
  },
  {
    title: "Learn by explaining, not just watching",
    body: "Concepts click when you talk through your own reasoning. Antideriva has you explain your strategy as you solve.",
  },
  {
    title: "Explanations built to stick",
    body: "Antideriva connects new ideas to ones you know, ties them to real examples, and has you predict before you're told the answer.",
  },
];

const HOW_STEPS = [
  {
    title: "Tell us where you're stuck",
    body: 'A short diagnostic across every AP Calculus unit narrows down the exact concept and skill giving you trouble — not just "derivatives," but which part of derivatives.',
  },
  {
    title: "Get a lesson built for that gap",
    body: "Antideriva delivers an original, targeted lesson for that specific concept instead of re-teaching the whole unit — so you get unstuck fast, not eventually.",
  },
  {
    title: "Practice with real AP-style questions",
    body: "Confirm it clicked with multiple-choice and free-response questions modeled on the official exam format, calculator and non-calculator included.",
  },
];

const EXPECTATIONS = [
  {
    label: "Time",
    detail:
      "A 5-minute diagnostic, then lessons you can do in one sitting — no recurring schedule to keep.",
  },
  {
    label: "Privacy",
    detail:
      "No classroom, no raised hand. Work through what you don't get without anyone watching.",
  },
  {
    label: "Practice",
    detail:
      "Calculator and non-calculator, multiple choice and free response — split the way the real exam is.",
  },
  {
    label: "Clarity",
    detail:
      "You'll know exactly which concepts you're solid on and which ones still need work, not just a grade.",
  },
];

const PATHS = [
  {
    title: "Browse by unit",
    body: "Open the Units tab to see every AP Calculus AB and BC unit, expand any one for its chapters, and jump straight into lessons and practice questions for exactly what you want to work on.",
    href: "/units",
    cta: "Browse units",
  },
  {
    title: "Get a personalized path",
    body: "Take the diagnostic questionnaire and Antideriva builds a lesson plan around your specific weak spots, so you're not guessing which unit to start with.",
    href: "/questionnaire",
    cta: "Take the questionnaire",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-8 p-8">
      <div className="flex min-h-[calc(100vh-3.5rem-4rem)] max-w-2xl flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          AP Calc practice that starts with what you missed.
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Take a short diagnostic and Antideriva pinpoints exactly which topics,
          skills, and question types are holding you back — then builds you a
          lesson plan around just those gaps, using practice questions modeled
          after the College Board's official AP format so it feels like the real
          exam.
        </p>
        <Button asChild size="lg">
          <Link href="/questionnaire">Get Started</Link>
        </Button>
      </div>

      <section className="flex w-full max-w-4xl flex-col gap-8 border-t pt-16 pb-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Where students get stuck
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Most help for AP Calculus is too broad, too slow, or requires
            scheduling you don't have time for. We asked students where math
            actually falls apart for them — three problems came up again and
            again.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STRUGGLES.map((struggle) => (
            <Card key={struggle.title}>
              <CardHeader>
                <CardTitle className="text-lg">{struggle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{struggle.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex w-full max-w-4xl flex-col gap-8 border-t pt-16 pb-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="max-w-xl text-muted-foreground">
            No sign-up marathon, no scheduling a tutor — just open the browser
            and go, even at 11pm before a test.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {HOW_STEPS.map((step, index) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                {index + 1}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex w-full max-w-4xl flex-col gap-8 border-t pt-16 pb-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            The Antideriva approach
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Built directly around the problems above.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {APPROACH.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex w-full max-w-4xl flex-col gap-8 border-t pt-16 pb-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight">What to expect</h2>
          <p className="max-w-xl text-muted-foreground">
            A few things you can count on before you start.
          </p>
        </div>
        <dl className="divide-y divide-border border-y">
          {EXPECTATIONS.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6"
            >
              <dt className="font-semibold">{item.label}</dt>
              <dd className="text-sm text-muted-foreground">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex w-full max-w-4xl flex-col gap-8 border-t pt-16 pb-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Two ways to start
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Jump straight into a unit, or let a quick diagnostic point you to
            what matters most.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PATHS.map((path) => (
            <Card key={path.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{path.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground">{path.body}</p>
                <Button asChild variant="outline" className="self-start">
                  <Link href={path.href}>{path.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
