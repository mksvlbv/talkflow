import "server-only";

import type { Subscription } from "@prisma/client";

export const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "trialing"]);

export function hasActiveSubscription(
  subscription: Pick<Subscription, "status"> | null | undefined,
) {
  return subscription ? ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.status) : false;
}
