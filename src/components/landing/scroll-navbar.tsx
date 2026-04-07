"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";

import { BrandLogo } from "@/components/brand-logo";

export function ScrollNavbar() {
  const { isSignedIn } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show navbar after scrolling past the hero (100vh)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-white/8 bg-[rgba(6,6,6,0.85)] backdrop-blur-[12px] transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"}`}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6 lg:px-12">
        <BrandLogo />

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link
            href="/demo"
            className="text-[13px] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Demo
          </Link>
          <Link
            href="/#pricing"
            className="text-[13px] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Pricing
          </Link>
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="text-[13px] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="text-[13px] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
