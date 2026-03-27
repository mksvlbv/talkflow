import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { requireEnv } from "@/lib/env";
import { syncStripeSubscription } from "@/lib/billing";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function resolveSubscriptionFromCheckoutSession(
  session: Stripe.Checkout.Session,
) {
  if (!session.subscription) {
    throw new Error(`Stripe session ${session.id} completed without a subscription.`);
  }

  if (typeof session.subscription !== "string") {
    return session.subscription;
  }

  return getStripe().subscriptions.retrieve(session.subscription);
}

export async function POST(request: Request) {
  try {
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return new Response("Missing Stripe signature.", { status: 400 });
    }

    const payload = await request.text();
    const event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      requireEnv("STRIPE_WEBHOOK_SECRET"),
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const subscription = await resolveSubscriptionFromCheckoutSession(session);

        await syncStripeSubscription(
          subscription,
          session.metadata?.clerkUserId ?? null,
        );
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await syncStripeSubscription(event.data.object);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook failed:", error);

    return new Response("Webhook handling failed.", { status: 400 });
  }
}
