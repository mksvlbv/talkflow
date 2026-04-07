"use client";

import { useTransition } from "react";

import { LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

type CheckoutButtonProps = {
  label?: string;
};

export function CheckoutButton({
  label = "Start Pro Trial",
}: CheckoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/stripe/checkout", {
          method: "POST",
        });
        const payload = (await response.json()) as {
          url?: string;
          message?: string;
          code?: string;
        };

        if (!response.ok) {
          if (payload.code === "AUTH_REQUIRED") {
            window.location.assign("/sign-in?redirect_url=/pricing");
            return;
          }

          throw new Error(payload.message ?? "Checkout failed.");
        }

        if (!payload.url) {
          throw new Error("Stripe did not return a checkout URL.");
        }

        window.location.assign(payload.url);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to start checkout right now.",
        );
      }
    });
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isPending}
      className="flex h-11 w-full items-center justify-center gap-2 bg-primary text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      {isPending ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Sparkles className="size-4" />
      )}
      {label}
    </button>
  );
}
