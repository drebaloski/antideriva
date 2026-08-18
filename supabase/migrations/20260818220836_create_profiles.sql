-- Per-user billing profile: tracks Stripe subscription state and the
-- resulting plan tier ('free' vs 'plus') used to gate AI tutor usage.
-- Written only by the Stripe webhook via the service-role key; the client
-- may only read its own row.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text not null default 'free' check (plan in ('free', 'plus')),
  plan_status text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);
