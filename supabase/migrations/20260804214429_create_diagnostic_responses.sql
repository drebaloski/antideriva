-- Diagnostic questionnaire responses: stores each student's answers to the
-- weakness-identification questionnaire. First question is which AP Calculus
-- course track (AB or BC) the student is taking.
create table if not exists public.diagnostic_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  track text not null check (track in ('AB', 'BC')),
  created_at timestamptz not null default now()
);

create index if not exists diagnostic_responses_user_id_idx
  on public.diagnostic_responses (user_id);

alter table public.diagnostic_responses enable row level security;

create policy "Users can view their own diagnostic responses"
  on public.diagnostic_responses
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own diagnostic responses"
  on public.diagnostic_responses
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
