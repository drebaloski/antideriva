-- The second round of the diagnostic questionnaire now asks students to
-- rate their comfort level (very weak -> very strong, or not yet learned)
-- for each AP Calculus unit, instead of just flagging weak topics.
alter table public.diagnostic_responses
  drop column if exists weak_topics;

alter table public.diagnostic_responses
  add column if not exists topic_ratings jsonb not null default '{}'::jsonb;
