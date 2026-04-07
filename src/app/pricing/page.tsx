import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/landing/navbar";
import { CornerMarkers } from "@/components/landing/corner-markers";
import { CheckoutButton } from "@/components/checkout-button";
import { getAppUserByClerkId } from "@/lib/app-user";
import { hasActiveSubscription } from "@/lib/subscription";

export default async function PricingPage() {
  const { userId } = await auth();
  const appUser = userId ? await getAppUserByClerkId(userId) : null;
  const hasSubscription = hasActiveSubscription(appUser?.subscription);

  if (hasSubscription) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar isSignedIn={Boolean(userId)} />
      <div className="noise-overlay fixed inset-0 z-[100]" />
      <div className="grid-bg fixed inset-0 z-0" />

      <main className="relative z-10 px-6 pb-32 pt-28 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <p className="sys-label mb-4 justify-center">Pricing</p>
            <h1 className="text-3xl font-light tracking-tight sm:text-5xl">
              Scale your output.
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm font-light text-text-sub">
              Start free. Upgrade when you need unlimited voice capture
              and multi-format generation.
            </p>
          </div>

          {/* Plans */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Starter */}
            <div className="relative border border-line bg-panel p-8">
              <CornerMarkers size={6} />
              <p className="font-mono text-xs uppercase tracking-wider text-text-sub">
                Starter
              </p>
              <p className="mt-2 text-4xl font-light">Free</p>
              <p className="mt-1 text-sm text-text-sub">For trying it out</p>
              <div className="mt-8 space-y-4">
                {[
                  "30 minutes per month",
                  "Basic text export (TXT / MD)",
                  "Single format output",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <Check className="size-3.5 text-text-sub" />
                    {f}
                  </div>
                ))}
                <div className="flex items-center gap-3 text-sm text-white/30">
                  <Check className="size-3.5 text-white/20" />
                  <span className="line-through">AI analysis</span>
                  <span className="ml-1 font-mono text-[9px] text-text-sub">
                    PRO
                  </span>
                </div>
              </div>
              <Link
                href="/sign-up"
                className="mt-8 flex h-11 w-full items-center justify-center border border-line-active text-sm font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="relative border border-primary bg-panel p-8">
              <CornerMarkers size={6} />
              <div className="mb-4 inline-block bg-accent-dim px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                Recommended
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-sub">
                Pro Pipeline
              </p>
              <p className="mt-2 text-4xl font-light">
                $19<span className="text-base text-text-sub">/mo</span>
              </p>
              <p className="mt-1 text-sm text-text-sub">
                For serious creators
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Unlimited voice capture",
                  "Real-time synthesis",
                  "Multi-format generation",
                  "Tone & style control",
                  "API integration",
                  "Priority processing",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <Check className="size-3.5 text-primary" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <CheckoutButton />
              </div>
            </div>
          </div>

          {/* FAQ-like note */}
          <div className="mt-16 border border-dashed border-line p-6 text-center">
            <p className="text-sm text-text-sub">
              Payments processed securely through Stripe.{" "}
              <span className="text-muted-foreground">
                Cancel anytime from your account settings.
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
