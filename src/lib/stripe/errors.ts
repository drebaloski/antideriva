// Stripe errors (bad price/product config, API key mode mismatches, etc.)
// can contain internal identifiers and must never reach the client directly —
// log the real error server-side and return a generic message instead.
export function stripeErrorResponse(err: unknown, fallbackMessage: string) {
  console.error(fallbackMessage, err);
  return Response.json({ error: fallbackMessage }, { status: 500 });
}
