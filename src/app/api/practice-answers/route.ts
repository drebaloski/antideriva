import { createClient } from "~/lib/supabase/server";

interface SaveAnswerBody {
  questionId: string;
  selectedChoice?: string | null;
  response?: string | null;
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Log in to save your answers.", { status: 401 });
  }

  const { questionId, selectedChoice, response } =
    (await req.json()) as SaveAnswerBody;

  if (!questionId) {
    return new Response("questionId is required.", { status: 400 });
  }

  const { error } = await supabase.from("question_attempts").upsert(
    {
      user_id: user.id,
      question_id: questionId,
      selected_choice: selectedChoice ?? null,
      response: response ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,question_id" },
  );

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
