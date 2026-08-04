import { redirect } from "next/navigation";
import { QuestionnaireForm } from "~/components/questionnaire-form";
import { createClient } from "~/lib/supabase/server";

export default async function QuestionnairePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-xl flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Diagnostic Questionnaire
        </h1>
        <p className="text-muted-foreground">
          Let's figure out which topics to focus on.
        </p>
      </div>
      <QuestionnaireForm />
    </main>
  );
}
