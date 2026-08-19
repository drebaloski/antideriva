-- Remembers a user's chosen answer per practice question, so it's restored
-- when they revisit a unit's practice page. One row per (user, question);
-- selected_choice is used for multiple-choice questions, response for
-- free-response questions.
create table if not exists public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id text not null,
  selected_choice text,
  response text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, question_id)
);

create index if not exists question_attempts_user_id_question_id_idx
  on public.question_attempts (user_id, question_id);

alter table public.question_attempts enable row level security;

create policy "Users can view their own question attempts"
  on public.question_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own question attempts"
  on public.question_attempts
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own question attempts"
  on public.question_attempts
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own question attempts"
  on public.question_attempts
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
