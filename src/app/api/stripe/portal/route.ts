import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getAppUserByClerkId } from "@/lib/app-user";
import { getAppUrl } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Sign in is required.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    const appUser = await getAppUserByClerkId(userId);

    if (!appUser?.stripeCustomerId) {
      return NextResponse.json(
        {
          message: "No Stripe customer is attached to this account yet.",
          code: "CUSTOMER_NOT_FOUND",
        },
        { status: 400 },
      );
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: appUser.stripeCustomerId,
      return_url: `${getAppUrl()}/studio`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe portal route failed:", error);

    return NextResponse.json(
      {
        message: "Unable to open the billing portal.",
        code: "PORTAL_FAILED",
      },
      { status: 500 },
    );
  }
}
