---
name: verify
description: How to launch and drive this Next.js app for runtime verification
---

# Verifying changes in this repo

This is a Next.js (App Router) app. There's no dedicated verifier skill —
just the standard dev server, driven through the Browser pane.

## Launch

Use `preview_start` with `{name: "dev"}` (defined in `.claude/launch.json`,
runs `npm run dev` on port 3000). Do not run the dev server via Bash.

## Drive

- Sidebar nav lives in `src/components/navbar.tsx`, rendered from
  `src/app/layout.tsx` beside `{children}` in a flex row (no top bar —
  removed in favor of a full-height left sidebar).
- Auth-gated routes (`/admin`, `/questionnaire`) redirect unauthenticated
  users to `/login` server-side — check `window.location.pathname` after
  navigating rather than trusting the `navigate` tool's echoed URL, which
  can show the pre-redirect URL.
- No local Supabase/auth session is configured in this sandbox —
  `supabase.auth.getUser()` calls log `AuthRetryableFetchError` in the dev
  server logs on every request. This is expected/pre-existing here, not a
  regression; pages still render as the logged-out state.

## Known gaps (not bugs to "fix" reflexively, but worth knowing)

- The sidebar is a fixed `w-64` with no responsive/mobile collapse. Below
  ~768px it eats over half the viewport. Flag this if a change touches
  layout/responsiveness rather than silently patching it.
- "Question Bank" (under Explore > Study & Practice) intentionally reuses
  the `/units` route, so `/units` shows both "Units" and "Question Bank"
  highlighted active at once. This is a known, accepted tradeoff, not a bug.
