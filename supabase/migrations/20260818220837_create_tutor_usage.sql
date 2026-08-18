-- One row per AI tutor request a user makes. Used to enforce the weekly
-- quota (10/week free, 1,000/week plus) by counting rows from the last 7 days.
create table if not exists public.tutor_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists tutor_usage_user_id_created_at_idx
  on public.tutor_usage (user_id, created_at);

alter table public.tutor_usage enable row level security;

create policy "Users can view their own tutor usage"
  on public.tutor_usage
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own tutor usage"
  on public.tutor_usage
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
