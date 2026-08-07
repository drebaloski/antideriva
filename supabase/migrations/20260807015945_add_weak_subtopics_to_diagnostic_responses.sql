-- Third round of the diagnostic questionnaire: for each unit flagged weak
-- (very weak / somewhat weak / haven't learned yet) in the comfort-level
-- question, students pick which specific subtopics they struggle with.
alter table public.diagnostic_responses
  add column if not exists weak_subtopics jsonb not null default '{}'::jsonb;
