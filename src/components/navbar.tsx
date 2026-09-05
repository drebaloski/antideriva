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

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function UnitsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function PricingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L3.83 9A2 2 0 0 0 3.24 10.41L12.83 20a2 2 0 0 0 2.83 0l4.93-4.93a2 2 0 0 0 0-2.83Z" />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AdminIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3 4.5 6v6c0 4.5 3.2 7.3 7.5 9 4.3-1.7 7.5-4.5 7.5-9V6L12 3Z" />
    </svg>
  );
}

function StudyPracticeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 5v14" />
      <path d="M12 5c-1.8-1.3-4.3-2-7-2v14c2.7 0 5.2.7 7 2" />
      <path d="M12 5c1.8-1.3 4.3-2 7-2v14c-2.7 0-5.2.7-7 2" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const STUDY_PRACTICE_SUBTABS: { href: string; label: string }[] = [
  { href: "/lessons", label: "Lessons" },
  { href: "/question-bank", label: "Question Bank" },
  { href: "/diagnostic", label: "Diagnostic Test" },
];

function getNavItems(isAdmin: boolean) {
  return [
    { href: "/", label: "Home", icon: HomeIcon, exact: true },
    { href: "/units", label: "Units", icon: UnitsIcon, exact: false },
    { href: "/pricing", label: "Pricing", icon: PricingIcon, exact: false },
    ...(isAdmin
      ? [
          {
            href: "/admin",
            label: "Admin",
            icon: AdminIcon,
            exact: false,
          },
        ]
      : []),
  ];
}

export function Navbar({ user, isAdmin, plan }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [studyPracticeOpen, setStudyPracticeOpen] = useState(() =>
    STUDY_PRACTICE_SUBTABS.some((subtab) => pathname.startsWith(subtab.href)),
  );

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setSigningOut(false);
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-background">
      <div className="px-5 py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Antideriva
        </Link>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {getNavItems(isAdmin).map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 flex flex-col gap-1 px-3">
        <p className="px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Explore
        </p>
        <button
          type="button"
          onClick={() => setStudyPracticeOpen((open) => !open)}
          aria-expanded={studyPracticeOpen}
          className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="flex items-center gap-3">
            <StudyPracticeIcon className="size-4" />
            Study &amp; Practice
          </span>
          <ChevronDownIcon
            className={cn(
              "size-4 transition-transform",
              studyPracticeOpen && "rotate-180",
            )}
          />
        </button>
        {studyPracticeOpen && (
          <div className="flex flex-col gap-1 py-1 pl-9">
            {STUDY_PRACTICE_SUBTABS.map((subtab) => (
              <Link
                key={subtab.href}
                href={subtab.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  pathname === subtab.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {subtab.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t border-border px-3 py-4">
        {user ? (
          <>
            <Badge
              variant={plan === "plus" ? "default" : "outline"}
              className="w-fit"
            >
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
    </aside>
  );
}
