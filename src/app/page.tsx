import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const topics = [
  {
    title: "Limits",
    description:
      "Build intuition for limits and continuity, from direct substitution to L'Hopital's rule.",
  },
  {
    title: "Derivatives",
    description:
      "Master differentiation rules, implicit differentiation, and real-world rate-of-change problems.",
  },
  {
    title: "Integration",
    description:
      "Work through antiderivatives, definite integrals, and integration techniques step by step.",
  },
  {
    title: "Series",
    description:
      "Tackle sequences, convergence tests, and Taylor and Maclaurin series with guided practice.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center gap-12 p-8">
      <div className="flex max-w-2xl flex-col items-center gap-4 pt-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Master AP Calculus with antideriva
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          A focused study companion for AP Calculus students, covering
          everything from limits to series. Keep your notes close by on the{" "}
          <Link href="/notes" className="underline hover:text-foreground">
            Notes
          </Link>{" "}
          page as you work through each topic.
        </p>
      </div>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <Card key={topic.title}>
            <CardHeader>
              <CardTitle className="text-xl">{topic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {topic.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
