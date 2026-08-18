import Stripe from "stripe";
import { env } from "~/env";
import { createServiceRoleClient } from "~/lib/supabase/service-role";

export async function POST(req: Request) {
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
    return Response.json(
      { error: "Stripe webhook isn't configured yet." },
      { status: 500 },
    );
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("Missing stripe-signature header");
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return Response.json({ error: message }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      if (!userId) break;

      const subscription = session.subscription
        ? await stripe.subscriptions.retrieve(session.subscription as string)
        : null;

      await supabase.from("profiles").upsert({
        id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscription?.id ?? null,
        plan: "plus",
        plan_status: subscription?.status ?? "active",
        current_period_end: subscription?.items.data[0]?.current_period_end
          ? new Date(
              subscription.items.data[0].current_period_end * 1000,
            ).toISOString()
          : null,
        updated_at: new Date().toISOString(),
      });
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const isActive =
        subscription.status === "active" || subscription.status === "trialing";

      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_subscription_id", subscription.id)
        .maybeSingle();

      if (!existing) break;

      await supabase
        .from("profiles")
        .update({
          plan: isActive ? "plus" : "free",
          plan_status: subscription.status,
          current_period_end: subscription.items.data[0]?.current_period_end
            ? new Date(
                subscription.items.data[0].current_period_end * 1000,
              ).toISOString()
            : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      break;
    }

    default:
      break;
  }

  return Response.json({ received: true });
}
