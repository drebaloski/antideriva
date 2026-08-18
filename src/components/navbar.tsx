"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { createClient } from "~/lib/supabase/client";
import { cn } from "~/lib/utils";

interface NavbarProps {
  user: { email: string | null } | null;
  isAdmin: boolean;
  plan: "free" | "plus";
}

export function Navbar({ user, isAdmin, plan }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setSigningOut(false);
  }

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold tracking-tight">
            Antideriva
          </Link>
          <div className="flex gap-4">
            <Link
              href="/units"
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                pathname === "/units"
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              Units
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                pathname === "/pricing"
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              Pricing
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  pathname === "/admin"
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                Admin
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Badge variant={plan === "plus" ? "default" : "outline"}>
                {plan === "plus" ? "Plus" : "Free"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                disabled={signingOut}
                onClick={handleSignOut}
              >
                {signingOut ? "Signing out..." : "Sign Out"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
