import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Navbar } from "~/components/navbar";
import { createClient } from "~/lib/supabase/server";
import { ThemeProvider } from "./theme-provider";
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
  if (user) {
    const { data } = await supabase.rpc("current_user_is_admin");
    isAdmin = data ?? false;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider>
          <Navbar
            user={user ? { email: user.email ?? null } : null}
            isAdmin={isAdmin}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
