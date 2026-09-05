import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Navbar } from "~/components/navbar";
import { createClient } from "~/lib/supabase/server";
import { ThemeProvider } from "./theme-provider";
import "katex/dist/katex.min.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Antideriva",
  description:
    "Antideriva identifies your weak spots and recommends the lessons to fix them.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  let plan: "free" | "plus" = "free";
  if (user) {
    const [{ data: isAdminData }, { data: profile }] = await Promise.all([
      supabase.rpc("current_user_is_admin"),
      supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle(),
    ]);
    isAdmin = isAdminData ?? false;
    plan = profile?.plan === "plus" ? "plus" : "free";
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Navbar
              user={user ? { email: user.email ?? null } : null}
              isAdmin={isAdmin}
              plan={plan}
            />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
