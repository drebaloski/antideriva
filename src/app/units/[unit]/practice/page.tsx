import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionCard } from "~/components/practice/question-card";
import { getPracticeQuestions } from "~/lib/practice-questions";
import { createClient } from "~/lib/supabase/server";
import { UNITS } from "~/lib/units";

export default async function UnitPracticePage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit: unitParam } = await params;
  const unitNumber = Number(unitParam);
  const unit = UNITS.find((u) => u.number === unitNumber);

  if (!unit) {
    notFound();
  }

  const questions = getPracticeQuestions(unitNumber);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const savedAnswersByQuestionId: Record<
    string,
    { selectedChoice: string | null; response: string | null }
  > = {};

  if (user && questions) {
    const { data: attempts } = await supabase
      .from("question_attempts")
      .select("question_id, selected_choice, response")
      .eq("user_id", user.id)
      .in(
        "question_id",
        questions.map((q) => q.id),
      );

    for (const attempt of attempts ?? []) {
      savedAnswersByQuestionId[attempt.question_id] = {
        selectedChoice: attempt.selected_choice,
        response: attempt.response,
      };
    }
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <Link
          href="/units"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to units
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          Unit {unit.number} Practice: {unit.title}
        </h1>
        <p className="text-muted-foreground">
          {questions
            ? `${questions.length} questions covering every chapter in this unit.`
            : "Practice questions for this unit are coming soon."}
        </p>
      </div>
      {questions && (
        <div className="flex flex-col gap-6">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              initialSelectedChoice={
                savedAnswersByQuestionId[question.id]?.selectedChoice ?? null
              }
              initialResponse={
                savedAnswersByQuestionId[question.id]?.response ?? ""
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}
