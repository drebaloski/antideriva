import { Badge } from "~/components/ui/badge";

interface AdminUserRow {
  id: string;
  email: string | null;
  created_at: string;
  track: string | null;
}

export function AdminUserTable({ users }: { users: AdminUserRow[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Email</th>
            <th className="px-4 py-2 font-medium">Category</th>
            <th className="px-4 py-2 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-border">
              <td className="px-4 py-2">{u.email ?? "—"}</td>
              <td className="px-4 py-2">
                {u.track ? (
                  <Badge variant="secondary">{u.track}</Badge>
                ) : (
                  <Badge variant="outline">Not started</Badge>
                )}
              </td>
              <td className="px-4 py-2 text-muted-foreground">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
