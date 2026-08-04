-- Admin support: check whether the calling user is an admin, and list all
-- users with the track from their most recent diagnostic response. Both
-- functions are SECURITY DEFINER because ordinary authenticated/anon roles
-- have no SELECT grant on auth.users.

create or replace function public.current_user_is_admin()
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_is_admin boolean;
begin
  select coalesce((raw_app_meta_data->>'is_admin')::boolean, false)
  into v_is_admin
  from auth.users
  where id = auth.uid();

  return coalesce(v_is_admin, false);
end;
$$;

revoke all on function public.current_user_is_admin() from public;
revoke all on function public.current_user_is_admin() from anon;
grant execute on function public.current_user_is_admin() to authenticated;

create or replace function public.admin_list_users()
returns table (
  id uuid,
  email text,
  created_at timestamptz,
  track text
)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_is_admin boolean;
begin
  select coalesce((raw_app_meta_data->>'is_admin')::boolean, false)
  into v_is_admin
  from auth.users
  where id = auth.uid();

  if not coalesce(v_is_admin, false) then
    raise exception 'not authorized';
  end if;

  return query
    select
      u.id,
      u.email::text,
      u.created_at,
      latest.track
    from auth.users u
    left join lateral (
      select dr.track
      from public.diagnostic_responses dr
      where dr.user_id = u.id
      order by dr.created_at desc
      limit 1
    ) latest on true
    order by u.created_at desc;
end;
$$;

revoke all on function public.admin_list_users() from public;
revoke all on function public.admin_list_users() from anon;
grant execute on function public.admin_list_users() to authenticated;
