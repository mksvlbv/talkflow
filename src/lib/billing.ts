import "server-only";

import type Stripe from "stripe";

import { requireEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

function toDate(unixSeconds: number | null | undefined) {
  return unixSeconds ? new Date(unixSeconds * 1000) : null;
}

function extractCustomerId(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
) {
  if (!customer) {
    return null;
  }

  return typeof customer === "string" ? customer : customer.id;
}

async function findUserForSubscription(
  customerId: string | null,
  clerkUserId?: string | null,
) {
  const candidates = [
    customerId ? { stripeCustomerId: customerId } : null,
    clerkUserId ? { clerkUserId } : null,
  ].filter(Boolean) as Array<{ stripeCustomerId: string } | { clerkUserId: string }>;

  if (!candidates.length) {
    return null;
  }

  return prisma.user.findFirst({
    where: {
      OR: candidates,
    },
  });
}

export function getStripePriceId() {
  return requireEnv("STRIPE_PRICE_ID");
}

export async function getOrCreateStripeCustomer(appUser: {
  id: string;
  clerkUserId: string;
  email?: string | null;
  name?: string | null;
  stripeCustomerId?: string | null;
}) {
  if (appUser.stripeCustomerId) {
    return appUser.stripeCustomerId;
  }

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email: appUser.email ?? undefined,
    name: appUser.name ?? undefined,
    metadata: {
      clerkUserId: appUser.clerkUserId,
      appUserId: appUser.id,
    },
  });

  await prisma.user.update({
    where: {
      id: appUser.id,
    },
    data: {
      stripeCustomerId: customer.id,
    },
  });

  return customer.id;
}

export async function syncStripeSubscription(
  subscription: Stripe.Subscription,
  clerkUserId?: string | null,
) {
  const stripeCustomerId = extractCustomerId(subscription.customer);
  const user = await findUserForSubscription(stripeCustomerId, clerkUserId);

  if (!user) {
    throw new Error(
      `Unable to match Stripe subscription ${subscription.id} to an application user.`,
    );
  }

  if (stripeCustomerId && user.stripeCustomerId !== stripeCustomerId) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId,
      },
    });
  }

  const primaryItem = subscription.items.data[0];
  const currentPeriodEnd =
    primaryItem?.current_period_end != null
      ? toDate(primaryItem.current_period_end)
      : toDate(subscription.cancel_at);

  return prisma.subscription.upsert({
    where: {
      userId: user.id,
    },
    update: {
      stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: primaryItem?.price.id ?? null,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd,
    },
    create: {
      userId: user.id,
      stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: primaryItem?.price.id ?? null,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd,
    },
  });
}

export async function syncCheckoutSession(
  sessionId: string,
  clerkUserId?: string | null,
) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });

  if (!session.subscription) {
    throw new Error(`Checkout session ${sessionId} has no subscription attached.`);
  }

  if (typeof session.subscription === "string") {
    const subscription = await stripe.subscriptions.retrieve(session.subscription);

    return syncStripeSubscription(
      subscription,
      clerkUserId ?? session.metadata?.clerkUserId ?? null,
    );
  }

  return syncStripeSubscription(
    session.subscription,
    clerkUserId ?? session.metadata?.clerkUserId ?? null,
  );
}
