-- Fourth question of the diagnostic questionnaire: what usually causes the
-- student to get a problem wrong (concept gap, careless error, timing,
-- wording, or not knowing how to start), independent of specific topics.
alter table public.diagnostic_responses
  add column if not exists mistake_pattern text;

alter table public.diagnostic_responses
  add constraint diagnostic_responses_mistake_pattern_check
  check (
    mistake_pattern is null or mistake_pattern in (
      'I don''t understand the concept',
      'I understand the concept but make careless errors',
      'I run out of time',
      'I get confused by the wording of the problem',
      'I''m not sure how to start'
    )
  );
