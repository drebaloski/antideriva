import Stripe from "stripe";
import { env } from "~/env";

// Returns null when Stripe isn't configured, so callers can degrade gracefully.
export function getStripe() {
  if (!env.STRIPE_SECRET_KEY) return null;
  return new Stripe(env.STRIPE_SECRET_KEY);
}
