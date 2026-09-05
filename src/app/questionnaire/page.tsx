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
    <main className="mx-auto flex min-h-screen max-w-5xl p-8">
      <QuestionnaireForm />
    </main>
  );
}
