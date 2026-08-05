import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center gap-8 p-8">
      <div className="flex max-w-2xl flex-col items-center gap-4 pt-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Learn smarter with Antideriva
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Antideriva identifies your weaknesses and recommends the lessons that
          will help you the most. Keep your notes close by on the{" "}
          <Link href="/notes" className="underline hover:text-foreground">
            Notes
          </Link>{" "}
          page as you work through each recommendation.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/questionnaire">Get Started</Link>
      </Button>
    </main>
  );
}
