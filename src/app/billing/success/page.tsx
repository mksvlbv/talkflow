import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import { CheckCircle2, RefreshCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl rounded-[36px] border border-white/65 bg-white/85 p-8 shadow-[0_30px_80px_-45px_rgba(38,25,18,0.35)] backdrop-blur">
        <Badge variant="secondary">Billing result</Badge>
        <div className="mt-5 flex items-center gap-3 text-primary">
          {isActive ? (
            <CheckCircle2 className="size-10" />
          ) : (
            <RefreshCcw className="size-10" />
          )}
          <h1 className="text-3xl font-semibold">
            {isActive
              ? "Subscription activated"
              : "Payment succeeded, waiting for final sync"}
          </h1>
        </div>

        <p className="mt-5 text-base leading-8 text-muted-foreground">
          {isActive
            ? "Your Stripe checkout completed and the application can now unlock the private studio."
            : "The success redirect landed correctly. If the webhook is still propagating, refresh once or open the studio page again."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/studio"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Open studio
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-white px-5 text-sm font-medium"
          >
            Back to pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
