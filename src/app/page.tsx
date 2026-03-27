import Link from "next/link";

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { CreditCard, Database, Mic, Sparkles } from "lucide-react";

import { TranscribeWorkspace } from "@/components/transcribe-workspace";
import { Badge } from "@/components/ui/badge";
import { getAppUserByClerkId } from "@/lib/app-user";
import {
  FREE_RECORD_LIMIT,
  GUEST_FREE_RECORD_COOKIE,
  readGuestFreeUsage,
} from "@/lib/recordings";
import { hasActiveSubscription } from "@/lib/subscription";

function ctaLinkClass(isPrimary = false) {
  return isPrimary
    ? "inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
    : "inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-white/85 px-5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5";
}

export default async function Home() {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const guestUsage = readGuestFreeUsage(
    cookieStore.get(GUEST_FREE_RECORD_COOKIE)?.value,
  );
  const appUser = userId ? await getAppUserByClerkId(userId) : null;
  const hasSubscription = hasActiveSubscription(appUser?.subscription);
  const freeRecordUsed = appUser
    ? appUser.freeTranscriptionCount >= FREE_RECORD_LIMIT
    : guestUsage >= FREE_RECORD_LIMIT;

  return (
    <main className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/60 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Mic className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Vibe Voice MVP</p>
              <p className="text-xs text-muted-foreground">
                Next.js + Clerk + OpenAI + Prisma + Stripe + shadcn/ui
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href={hasSubscription ? "/studio" : "/pricing"} className={ctaLinkClass()}>
              {hasSubscription ? "Open studio" : "Pricing"}
            </Link>
            {userId ? (
              <UserButton />
            ) : (
              <Link href="/sign-in" className={ctaLinkClass(true)}>
                Sign in
              </Link>
            )}
          </div>
        </header>

        <section className="grid gap-6 pb-10 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Micro MVP</Badge>
              <Badge variant="outline">1 free recording</Badge>
              <Badge variant="outline">Sandbox billing</Badge>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
                Voice-to-text with a clean paywall funnel instead of generic AI slop.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Speak once for free, then the second take walks through Clerk auth,
                Stripe sandbox subscription, and a paid studio that stores
                transcripts in Prisma on top of Supabase.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={hasSubscription ? "/studio" : "#workspace"}
                className={ctaLinkClass(true)}
              >
                {hasSubscription ? "Go to workspace" : "Try free recording"}
              </Link>
              <Link href="/pricing" className={ctaLinkClass()}>
                Review pricing flow
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Mic className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">OpenAI transcription</p>
                  <p className="text-xs text-muted-foreground">Audio to text in one request</p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <CreditCard className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Stripe subscription</p>
                  <p className="text-xs text-muted-foreground">Sandbox checkout + portal</p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Database className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Prisma + Supabase</p>
                  <p className="text-xs text-muted-foreground">Saved recordings for paid users</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="workspace"
          className="rounded-[40px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(255,249,242,0.44))] p-3 shadow-[0_30px_80px_-45px_rgba(38,25,18,0.35)] backdrop-blur sm:p-5"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-2 pt-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
                Demo workspace
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Free-first landing experience
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="size-4" />
              {freeRecordUsed && !hasSubscription
                ? "Free sample already used"
                : "One sample still available"}
            </div>
          </div>

          <TranscribeWorkspace
            mode="public"
            isSignedIn={Boolean(userId)}
            hasSubscription={hasSubscription}
            initialFreeRecordUsed={freeRecordUsed}
          />
        </section>
      </div>
    </main>
  );
}
