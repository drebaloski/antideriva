import { redirect } from "next/navigation";
import { AdminUserTable } from "~/components/admin-user-table";
import { createClient } from "~/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: isAdmin } = await supabase.rpc("current_user_is_admin");

  if (!isAdmin) {
    redirect("/");
  }

  const { data: users, error } = await supabase.rpc("admin_list_users");

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
        <p className="text-muted-foreground">
          All users and their diagnostic track.
        </p>
      </div>
      {error ? (
        <p className="text-sm text-destructive">Failed to load users.</p>
      ) : (
        <AdminUserTable users={users ?? []} />
      )}
    </main>
  );
}
