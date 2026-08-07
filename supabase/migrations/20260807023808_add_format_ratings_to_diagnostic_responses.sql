-- Fifth question of the diagnostic questionnaire: comfort level with each
-- AP question format (multiple choice / free response, with or without a
-- calculator), on the same five-point comfort scale as the topic ratings.
alter table public.diagnostic_responses
  add column if not exists format_ratings jsonb not null default '{}'::jsonb;
