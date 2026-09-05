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
- The Browser pane's `read_console_messages` accumulates history for a tab
  across navigations — it does not clear on page load. An old error from
  earlier in the session (e.g. before a bugfix) can still show up on a
  fresh page. If a console error looks stale, open a brand-new tab
  (`tabs_create`) and re-drive the exact repro there before trusting it.
- `/question-bank` is a real page (`src/app/question-bank/page.tsx`) listing
  every practice question, grouped by unit with `id="unit-N"` anchors.
  `/question-bank/[label]/page.tsx` is the single-question practice view
  (Next/Previous, Mark for review, jump-to-question grid) — each question
  gets its own URL via its short `label` (e.g. `/question-bank/44C1`,
  case-insensitive). The old `/units/[unit]/practice` route now just
  redirects to `/question-bank#unit-N` (couldn't be deleted — the sandbox
  blocks `rm`/`git rm` on repo files).
- Per-unit practice-session state (marked-for-review, correct/incorrect/
  attempted status per question) lives in `localStorage` under
  `antideriva:practice-session:unit-<N>` — there's no backend attempt
  tracking yet. Clear it with `window.localStorage.clear()` (or removeItem
  for one unit) to reset state between verification passes.

## Known gaps (not bugs to "fix" reflexively, but worth knowing)

- The sidebar is a fixed `w-64` with no responsive/mobile collapse. Below
  ~768px it eats over half the viewport. Flag this if a change touches
  layout/responsiveness rather than silently patching it.
- The Question Bank's filter sidebar (Added/Track/Unit/Chapter/Difficulty)
  is a visual shell only — clicking filters doesn't change which questions
  show. This is intentional (agreed scope), not a bug. The tabs
  (All/Unsolved/Solved/Incorrect/Correct) and the search box, by contrast,
  really do filter.
