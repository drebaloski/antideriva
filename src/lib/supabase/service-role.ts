import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "~/env";

// Bypasses RLS — only use for writes outside a user's own session (e.g. the Stripe webhook).
export function createServiceRoleClient() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  }

  return createSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );
}
