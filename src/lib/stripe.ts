import "server-only";

import Stripe from "stripe";

import { requireEnv } from "@/lib/env";

let cachedStripe: Stripe | null = null;

export function getStripe() {
  if (cachedStripe) {
    return cachedStripe;
  }

  cachedStripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"));

  return cachedStripe;
}
