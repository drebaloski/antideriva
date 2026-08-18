import type Stripe from "stripe";
import { getStripe } from "~/lib/stripe/client";
import { createServiceRoleClient } from "~/lib/supabase/service-role";

export interface SyncedPlan {
  plan: "free" | "plus";
  plan_status: string | null;
  stripe_subscription_id: string | null;
}

const ENTITLED_STATUSES: Stripe.Subscription.Status[] = ["active", "trialing"];

/**
 * Reconciles a user's plan against Stripe as the source of truth.
 *
 * Webhooks are the primary path in production, but they can't reach localhost
 * and can be missed or delayed anywhere — so this reads the user's real
 * subscription state from Stripe on demand and writes it to `profiles`.
 */
export async function syncPlanFromStripe(
  userId: string,
  email: string | undefined,
): Promise<SyncedPlan | null> {
  const stripe = getStripe();
  if (!stripe || !email) return null;

  const customers = await stripe.customers.list({ email, limit: 10 });

  let entitled: Stripe.Subscription | null = null;
  for (const customer of customers.data) {
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "all",
      limit: 20,
    });
    entitled =
      subscriptions.data.find((s) => ENTITLED_STATUSES.includes(s.status)) ??
      null;
    if (entitled) break;
  }

  const periodEnd = entitled?.items.data[0]?.current_period_end;
  const row = {
    id: userId,
    stripe_customer_id:
      (entitled?.customer as string | undefined) ??
      customers.data[0]?.id ??
      null,
    stripe_subscription_id: entitled?.id ?? null,
    plan: entitled ? ("plus" as const) : ("free" as const),
    plan_status: entitled?.status ?? null,
    current_period_end: periodEnd
      ? new Date(periodEnd * 1000).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  };

  const supabase = createServiceRoleClient();
  await supabase.from("profiles").upsert(row);

  return {
    plan: row.plan,
    plan_status: row.plan_status,
    stripe_subscription_id: row.stripe_subscription_id,
  };
}
