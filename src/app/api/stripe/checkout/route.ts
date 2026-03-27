import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { upsertAppUser } from "@/lib/app-user";
import { getOrCreateStripeCustomer, getStripePriceId } from "@/lib/billing";
import { getDisplayName, getPrimaryEmailAddress } from "@/lib/clerk-user";
import { getAppUrl } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { hasActiveSubscription } from "@/lib/subscription";

export const runtime = "nodejs";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Sign in is required before checkout.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    const clerkProfile = await currentUser();
    const appUser = await upsertAppUser({
      clerkUserId: userId,
      email: getPrimaryEmailAddress(clerkProfile),
      name: getDisplayName(clerkProfile),
      imageUrl: clerkProfile?.imageUrl ?? null,
    });

    if (hasActiveSubscription(appUser.subscription)) {
      return NextResponse.json({
        url: `${getAppUrl()}/studio`,
        code: "ALREADY_SUBSCRIBED",
      });
    }

    const stripe = getStripe();
    const customerId = await getOrCreateStripeCustomer(appUser);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      allow_promotion_codes: true,
      line_items: [
        {
          price: getStripePriceId(),
          quantity: 1,
        },
      ],
      metadata: {
        clerkUserId: appUser.clerkUserId,
        appUserId: appUser.id,
      },
      subscription_data: {
        metadata: {
          clerkUserId: appUser.clerkUserId,
          appUserId: appUser.id,
        },
      },
      success_url: `${getAppUrl()}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getAppUrl()}/pricing`,
    });

    if (!session.url) {
      throw new Error("Stripe checkout session did not include a redirect URL.");
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout route failed:", error);

    return NextResponse.json(
      {
        message: "Unable to start Stripe checkout right now.",
        code: "CHECKOUT_FAILED",
      },
      { status: 500 },
    );
  }
}
