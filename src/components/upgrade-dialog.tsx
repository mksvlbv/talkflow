"use client";

import Link from "next/link";

import { ArrowRight, X } from "lucide-react";

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
  if (!open) return null;

  const isAuthRequired = reason === "AUTH_REQUIRED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md border border-line bg-panel p-8">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-text-sub transition-colors hover:text-white"
        >
          <X className="size-4" />
        </button>

        <p className="sys-label mb-3 flex items-center gap-2">
          <span className="inline-block size-1 bg-primary" />
          {isAuthRequired ? "Sign In Required" : "Upgrade Required"}
        </p>

        <h2 className="text-xl font-light tracking-tight">
          {isAuthRequired
            ? "Sign in to continue."
            : "Free tier limit reached."}
        </h2>

        <p className="mt-3 text-sm font-light leading-relaxed text-text-sub">
          {isAuthRequired
            ? "Your free recording is ready. Sign in to access it and unlock more features."
            : "Upgrade to Pro Pipeline for unlimited voice capture, multi-format generation, and tone control."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={isAuthRequired ? "/sign-in?redirect_url=/pricing" : "/pricing"}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-primary text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            {isAuthRequired ? "Sign In" : "View Plans"}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/sign-up?redirect_url=/pricing"
            className="inline-flex h-11 flex-1 items-center justify-center border border-line-active text-sm text-text-sub transition-colors hover:border-primary hover:text-primary"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
