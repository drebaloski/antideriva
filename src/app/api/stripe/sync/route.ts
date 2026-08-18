import { syncPlanFromStripe } from "~/lib/stripe/sync-plan";
import { createClient } from "~/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    const synced = await syncPlanFromStripe(user.id, user.email);
    if (!synced) {
      return Response.json(
        { error: "Stripe isn't configured yet." },
        { status: 500 },
      );
    }
    return Response.json(synced);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not sync subscription.";
    return Response.json({ error: message }, { status: 500 });
  }
}
