"use client";

import { useTransition } from "react";

import { CreditCard, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function PortalButton() {
  const [isPending, startTransition] = useTransition();

  const handleOpenPortal = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/stripe/portal", {
          method: "POST",
        });
        const payload = (await response.json()) as {
          url?: string;
          message?: string;
        };

        if (!response.ok || !payload.url) {
          throw new Error(payload.message ?? "Unable to open billing portal.");
        }

        window.location.assign(payload.url);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to open billing portal.",
        );
      }
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleOpenPortal}
      disabled={isPending}
      className="rounded-full"
    >
      {isPending ? <LoaderCircle className="animate-spin" /> : <CreditCard />}
      Manage billing
    </Button>
  );
}
