import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Voice MVP",
  description:
    "Micro MVP with Clerk auth, OpenAI voice transcription, Prisma on Supabase, Stripe subscription, and shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full">
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(210,118,70,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(62,120,106,0.16),transparent_35%),linear-gradient(180deg,rgba(255,251,245,1),rgba(247,240,232,1))]" />
            {children}
          </div>
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
