"use client";

import { useTransition } from "react";

import { LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type CheckoutButtonProps = {
  label?: string;
};

export function CheckoutButton({
  label = "Start Stripe subscription",
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
    <Button
      onClick={handleCheckout}
      disabled={isPending}
      size="lg"
      className="h-11 rounded-full px-5"
    >
      {isPending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Sparkles />
      )}
      {label}
    </Button>
  );
}
