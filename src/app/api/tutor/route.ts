import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { env } from "~/env";
import { createClient } from "~/lib/supabase/server";

export const maxDuration = 30;

const WEEKLY_LIMIT_BY_PLAN: Record<string, number> = {
  free: 10,
  plus: 1000,
};

interface QuestionContext {
  prompt: string;
  type: "mc" | "frq";
  calculatorAllowed: boolean;
  choices?: { label: string; text: string }[];
  explanation: string;
}

interface TutorRequestBody {
  messages: UIMessage[];
  question: QuestionContext;
  studentWork?: string;
}

function buildSystemPrompt(question: QuestionContext, studentWork?: string) {
  const choicesText = question.choices
    ?.map((choice) => `${choice.label}. ${choice.text}`)
    .join("\n");

  return `You are a patient AP Calculus tutor helping a student who is stuck on a practice problem. Use the Socratic method: ask guiding questions, point out what to look at next, and give hints — never state the final numeric answer, the correct multiple-choice letter, or walk through the full solution end-to-end, even if the student asks directly. If they ask for the answer outright, gently redirect them to the next concrete step in their own reasoning instead.

If the student states something mathematically incorrect, don't just say "wrong" — ask a question that helps them notice the error themselves.

If the student arrives at the correct final answer through their own reasoning, confirm it and briefly affirm why it's correct.

Keep responses short (2-5 sentences) and conversational, like a tutor sitting next to the student, not a textbook.

Question (${question.calculatorAllowed ? "calculator allowed" : "no calculator"}, ${question.type === "mc" ? "multiple choice" : "free response"}):
${question.prompt}
${choicesText ? `\nAnswer choices:\n${choicesText}` : ""}

Reference solution (for your guidance only — never reveal this directly to the student):
${question.explanation}
${studentWork ? `\nThe student's current work/answer so far:\n${studentWork}` : ""}`;
}

export async function POST(req: Request) {
  if (!env.GROQ_API_KEY) {
    return Response.json(
      {
        error:
          "The tutor isn't configured yet. Add GROQ_API_KEY to your environment.",
      },
      { status: 500 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Log in to ask the tutor for help.", { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .maybeSingle();

  const plan = profile?.plan ?? "free";
  const weeklyLimit = WEEKLY_LIMIT_BY_PLAN[plan] ?? WEEKLY_LIMIT_BY_PLAN.free;

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const { count: usageThisWeek } = await supabase
    .from("tutor_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", oneWeekAgo.toISOString());

  if ((usageThisWeek ?? 0) >= weeklyLimit) {
    return new Response(
      plan === "free"
        ? "You've used all 10 tutor messages for this week. Upgrade to Plus for 1,000/week."
        : "You've reached this week's tutor message limit. It resets 7 days after each message.",
      { status: 429 },
    );
  }

  await supabase.from("tutor_usage").insert({ user_id: user.id });
  const isLastMessageThisWeek = (usageThisWeek ?? 0) + 1 >= weeklyLimit;

  const { messages, question, studentWork } =
    (await req.json()) as TutorRequestBody;

  const groq = createGroq({ apiKey: env.GROQ_API_KEY });

  const result = streamText({
    model: groq("openai/gpt-oss-120b"),
    system: buildSystemPrompt(question, studentWork),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    headers: { "X-Tutor-Limit-Reached": String(isLastMessageThisWeek) },
  });
}
