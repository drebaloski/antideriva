-- Fix ambiguous column reference: admin_list_users() returns a table with
-- an `id` column, which collided with the unqualified `id` in the internal
-- admin check's `where id = auth.uid()` clause. Qualify with a table alias.

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
  select coalesce((caller.raw_app_meta_data->>'is_admin')::boolean, false)
  into v_is_admin
  from auth.users caller
  where caller.id = auth.uid();

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
