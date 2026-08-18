import Stripe from "stripe";
import { env } from "~/env";
import { createClient } from "~/lib/supabase/server";

export async function POST(req: Request) {
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PRICE_ID_PLUS_MONTHLY) {
    return Response.json(
      { error: "Stripe isn't configured yet." },
      { status: 500 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json(
      { error: "Log in before upgrading to Plus." },
      { status: 401 },
    );
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const origin = new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: env.STRIPE_PRICE_ID_PLUS_MONTHLY, quantity: 1 }],
      client_reference_id: user.id,
      customer_email: user.email,
      success_url: `${origin}/pricing?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      // Managed Payments (automatic tax) is on by default and requires a
      // product tax code we haven't set up — disable it for now.
      managed_payments: { enabled: false },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Something went wrong starting checkout.";
    return Response.json({ error: message }, { status: 500 });
  }
}
