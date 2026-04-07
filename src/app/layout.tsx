import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TalkFlow — Voice to Structured Content",
  description:
    "Turn your voice into publish-ready content. Record, transcribe, and generate Twitter threads, LinkedIn posts, and summaries in seconds.",
  metadataBase: new URL("https://talkflow-five.vercel.app"),
  openGraph: {
    title: "TalkFlow — Voice to Structured Content",
    description:
      "Turn your voice into publish-ready content. Record, transcribe, and generate Twitter threads, LinkedIn posts, and summaries in seconds.",
    type: "website",
    locale: "en_US",
    siteName: "TalkFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "TalkFlow — Voice to Structured Content",
    description:
      "Turn your voice into publish-ready content. Record, transcribe, and generate Twitter threads, LinkedIn posts, and summaries in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html
        lang="en"
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      >
        <body className="min-h-full bg-background text-foreground">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
          <Toaster
            richColors
            position="top-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0a0a0a",
                border: "1px solid #242424",
                color: "#ffffff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
