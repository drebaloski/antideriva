-- Second round of the diagnostic questionnaire: after picking a track
-- (AB/BC), students pick which broad topics they feel weak in.
alter table public.diagnostic_responses
  add column if not exists weak_topics text[] not null default '{}';
