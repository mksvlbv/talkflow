"use client";

import Link from "next/link";
import { useState } from "react";

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";

export function Navbar({ isSignedIn }: { isSignedIn: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-12">
        <BrandLogo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/demo"
            className="text-[13px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Demo
          </Link>
          <Link
            href="/#pricing"
            className="text-[13px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Pricing
          </Link>
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-[13px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                App
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="text-[13px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex size-10 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="size-5 text-text-sub" />
          ) : (
            <Menu className="size-5 text-text-sub" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-[rgba(6,6,6,0.9)] backdrop-blur-md px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/demo"
              onClick={() => setMobileOpen(false)}
              className="text-[13px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Demo
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileOpen(false)}
              className="text-[13px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Pricing
            </Link>
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-xs uppercase tracking-wider text-text-sub transition-colors hover:text-primary"
                >
                  App
                </Link>
                <UserButton />
              </>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-full items-center justify-center border border-line-active font-mono text-xs uppercase tracking-wider text-text-sub transition-colors hover:border-primary hover:text-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
