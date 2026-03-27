"use client";

import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UpgradeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason: "AUTH_REQUIRED" | "SUBSCRIPTION_REQUIRED" | null;
};

export function UpgradeDialog({
  open,
  onOpenChange,
  reason,
}: UpgradeDialogProps) {
  const isAuthRequired = reason === "AUTH_REQUIRED";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isAuthRequired ? "Use your free sample first, then sign in" : "Free mode is finished"}
          </DialogTitle>
          <DialogDescription>
            {isAuthRequired
              ? "The first recording is free. The second recording unlocks behind Clerk authentication and the Stripe sandbox subscription."
              : "You are signed in, but the paid workspace is protected by an active Stripe subscription before the next recording can be processed."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Link
            href={isAuthRequired ? "/sign-in?redirect_url=/pricing" : "/pricing"}
            className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
          >
            {isAuthRequired ? "Continue with Clerk" : "Open pricing"}
          </Link>
          <Link
            href="/sign-up?redirect_url=/pricing"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full",
            )}
          >
            Create account
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
