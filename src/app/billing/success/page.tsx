import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import { ArrowRight, CheckCircle2, RefreshCcw } from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";
import { getAppUserByClerkId } from "@/lib/app-user";
import { syncCheckoutSession } from "@/lib/billing";
import { hasActiveSubscription } from "@/lib/subscription";

type BillingSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function BillingSuccessPage({
  searchParams,
}: BillingSuccessPageProps) {
  const { session_id } = await searchParams;
  const { userId } = await auth();

  if (userId && session_id) {
    try {
      await syncCheckoutSession(session_id, userId);
    } catch (error) {
      console.error("Unable to sync checkout session immediately:", error);
    }
  }

  const appUser = userId ? await getAppUserByClerkId(userId) : null;
  const isActive = hasActiveSubscription(appUser?.subscription);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="noise-overlay fixed inset-0 z-[100]" />
      <div className="grid-bg fixed inset-0 z-0" />
      <div className="relative z-10 w-full max-w-lg border border-line bg-panel p-10 text-center">
        <CornerMarkers size={8} />

        <div className="mb-6 flex justify-center text-primary">
          {isActive ? (
            <CheckCircle2 className="size-12" />
          ) : (
            <RefreshCcw className="size-12 animate-spin" />
          )}
        </div>

        <h1 className="text-2xl font-light tracking-tight">
          {isActive
            ? "Subscription activated."
            : "Processing payment…"}
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-relaxed text-text-sub">
          {isActive
            ? "Your Pro Pipeline is now active. Start creating unlimited content with your voice."
            : "Payment received. Waiting for confirmation — refresh in a moment if needed."}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Open Dashboard
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center border border-line-active px-6 text-sm text-text-sub transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Back to Pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
