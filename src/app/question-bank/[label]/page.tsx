import Link from "next/link";
import { notFound } from "next/navigation";
import { PracticeSession } from "~/components/practice/practice-session";
import {
  findQuestionByLabel,
  getPracticeQuestions,
} from "~/lib/practice-questions";
import { UNITS } from "~/lib/units";

export default async function QuestionPracticePage({
  params,
}: {
  params: Promise<{ label: string }>;
}) {
  const { label } = await params;
  const location = findQuestionByLabel(label.toUpperCase());

  if (!location) {
    notFound();
  }

  const { unit: unitNumber, index, question } = location;
  const unit = UNITS.find((u) => u.number === unitNumber);
  const questions = getPracticeQuestions(unitNumber) ?? [];

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/question-bank#unit-${unitNumber}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to question bank
        </Link>
      </div>

      <h1 className="text-2xl font-bold tracking-tight">
        Unit {unitNumber}
        {unit ? `: ${unit.title}` : ""}
      </h1>

      <PracticeSession
        unitNumber={unitNumber}
        unitTitle={unit?.title}
        questions={questions}
        index={index}
        question={question}
      />
    </main>
  );
}
