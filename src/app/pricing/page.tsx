import Link from "next/link";

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Check, CreditCard, Database, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

import { CheckoutButton } from "@/components/checkout-button";
import { Badge } from "@/components/ui/badge";
import { getAppUserByClerkId } from "@/lib/app-user";
import { hasActiveSubscription } from "@/lib/subscription";

export default async function PricingPage() {
  const { userId } = await auth();
  const appUser = userId ? await getAppUserByClerkId(userId) : null;
  const hasSubscription = hasActiveSubscription(appUser?.subscription);

  if (hasSubscription) {
    redirect("/studio");
  }

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge variant="secondary">Stripe sandbox</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Subscribe to unlock the paid studio
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              This page is the billing step between Clerk auth and the private
              ChatGPT-style transcript workspace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-white/85 px-5 text-sm font-medium"
            >
              Back home
            </Link>
            {userId ? <UserButton /> : null}
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,251,245,0.95),rgba(244,232,222,0.88))] p-8 shadow-[0_30px_80px_-45px_rgba(38,25,18,0.36)]">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
              Paid access
            </p>
            <div className="mt-5 flex items-end gap-3">
              <h2 className="text-5xl font-semibold tracking-[-0.05em]">$9</h2>
              <p className="pb-2 text-muted-foreground">/ month in Stripe sandbox</p>
            </div>

            <div className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
              <div className="flex gap-3">
                <Check className="mt-1 size-4 text-primary" />
                <p>Unlimited voice transcriptions after the first free take.</p>
              </div>
              <div className="flex gap-3">
                <Database className="mt-1 size-4 text-primary" />
                <p>Each paid transcript is stored through Prisma with Supabase-backed persistence.</p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-1 size-4 text-primary" />
                <p>Clerk keeps the platform private; Stripe webhooks maintain subscription state.</p>
              </div>
              <div className="flex gap-3">
                <CreditCard className="mt-1 size-4 text-primary" />
                <p>Billing portal route is included for upgrades, cancellations, and test card management.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[36px] border border-white/65 bg-white/85 p-8 shadow-[0_30px_80px_-45px_rgba(38,25,18,0.36)] backdrop-blur">
            <Badge variant="outline">Checkout session</Badge>
            <h2 className="mt-5 text-3xl font-semibold">Launch the subscription flow</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              If you are not signed in yet, the button will first move you into Clerk auth. Once payment succeeds, the app redirects into the success screen and then the private studio.
            </p>

            <div className="mt-8">
              <CheckoutButton />
            </div>

            <p className="mt-6 text-xs leading-6 text-muted-foreground">
              Use any Stripe test card configured in your sandbox account. The `STRIPE_PRICE_ID` env points this button to the recurring plan.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
