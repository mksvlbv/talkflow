"use client";

import Link from "next/link";

import { useAuth } from "@clerk/nextjs";

import { BrandLogo } from "@/components/brand-logo";
import { HeroShaderCanvas } from "@/components/landing/hero-shader";

export function HeroSection() {
  const { isSignedIn } = useAuth();
  return (
    <section
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#0a0604]"
    >
      {/* WebGL shader background */}
      <HeroShaderCanvas />

      {/* Perimeter frame */}
      <div
        className="pointer-events-none absolute inset-6 z-10 rounded-2xl border border-white/12"
      />

      {/* UI layer */}
      <div
        className="pointer-events-none relative z-20 flex h-full w-full flex-col p-[clamp(24px,4vw,40px)_clamp(16px,4vw,48px)_clamp(24px,4vw,48px)]"
      >
        {/* Header — inside perimeter frame */}
        <header
          className="pointer-events-auto flex w-full items-center justify-between px-3"
        >
          <BrandLogo />

          {/* Nav links */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/demo"
              className="text-[13px] text-white/55 no-underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Demo
            </Link>
            <Link
              href="/#pricing"
              className="text-[13px] text-white/55 no-underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Pricing
            </Link>
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="text-[13px] text-white/55 no-underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="text-[13px] text-white/55 no-underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Sign In
              </Link>
            )}
          </nav>
        </header>

        {/* Main — grows to fill, centers hero content */}
        <div className="pointer-events-auto relative flex flex-1 flex-col items-center justify-center">
          {/* 3-column hero layout */}
          <div
            className="relative z-[2] grid w-full max-w-[1200px] items-center gap-[clamp(24px,4vw,64px)] lg:grid-cols-[1fr_auto_1fr]"
          >
            {/* Left: statement (right-aligned on desktop, centered on mobile) */}
            <div className="text-center lg:text-right">
              <h1
                className="mb-4 text-[clamp(32px,5vw,48px)] font-extralight leading-[1.1] tracking-[-0.02em] text-white"
              >
                Raw thought.
                <br />
                Refined structure.
              </h1>
              <p
                className="mx-auto max-w-[280px] text-[13px] leading-relaxed text-white/55 lg:ml-auto lg:mr-0"
              >
                Speak naturally into the void. Our engine captures the nuance
                and instantly synthesizes it into precise, platform-ready
                formats.
              </p>
            </div>

            {/* Center: CTA + status */}
            <div className="flex flex-col items-center gap-4">
              <Link
                href={isSignedIn ? "/create" : "/demo"}
                className="inline-block bg-primary px-8 py-3.5 text-[13px] font-medium text-white no-underline shadow-[0_0_24px_rgba(240,85,30,0.3)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0604]"
              >
                {isSignedIn ? "Open Studio" : "Start Flowing"}
              </Link>
              {!isSignedIn && (
                <Link
                  href="/preview"
                  className="inline-block border border-white/20 px-8 py-3.5 text-[13px] font-medium text-white/70 no-underline transition-all hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0604]"
                >
                  Preview App
                </Link>
              )}
              <div className="flex items-center gap-1.5">
                <span
                  className="size-1 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]"
                />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/55"
                >
                  Engine Online v2.4
                </span>
              </div>
            </div>

            {/* Right: app window (hidden on mobile/tablet) */}
            <div className="hidden pl-12 lg:block">
              <div
                className="w-[340px] overflow-hidden rounded-lg border border-white/12 bg-[rgba(10,6,4,0.45)] shadow-[0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-[20px]"
              >
                {/* Window header */}
                <div
                  className="flex items-center justify-between border-b border-white/12 bg-[rgba(255,255,255,0.02)] px-4 py-3"
                >
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/55"
                      aria-hidden="true"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/55"
                    >
                      Session_042
                    </span>
                  </div>
                  <span
                    className="font-mono text-[10px] text-white/30"
                  >
                    00:14
                  </span>
                </div>

                {/* Body */}
                <div className="px-4 py-5">
                  {/* Transcription */}
                  <div className="mb-6">
                    <div
                      className="mb-2 flex items-center justify-between font-mono text-[9px] text-white/55"
                    >
                      <span>INPUT // RAW</span>
                      <span>24 WORDS</span>
                    </div>
                    <p
                      className="text-sm font-light leading-normal text-white/90"
                    >
                      So the core idea is that design isn&apos;t just how it
                      looks, it&apos;s how it works at a systemic level. We need
                      to
                      <span
                        className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-white align-middle"
                      />
                    </p>
                  </div>

                  {/* Divider */}
                  <div
                    className="relative my-5 h-px bg-white/12"
                  >
                    <span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(10,6,4,0.45)] px-1 text-[10px] text-white/55"
                    >
                      ↓
                    </span>
                  </div>

                  {/* Output */}
                  <div
                    className="mb-2 font-mono text-[9px] text-white/55"
                  >
                    OUTPUT // SYNTHESIZED
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      {
                        icon: "twitter",
                        label: "Thread Draft",
                        meta: "3 TWEETS • HOOK OPTIMIZED",
                      },
                      {
                        icon: "linkedin",
                        label: "Professional Post",
                        meta: "SYSTEMIC DESIGN FOCUS",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded border border-white/12 bg-[rgba(255,255,255,0.01)] px-3 py-2.5"
                      >
                        <svg
                          className="size-4 shrink-0 text-white/70"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {item.icon === "twitter" ? (
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                          ) : (
                            <>
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </>
                          )}
                        </svg>
                        <div className="flex-1">
                          <p
                            className="mb-0.5 text-[11px] font-medium text-white"
                          >
                            {item.label}
                          </p>
                          <p
                            className="font-mono text-[9px] text-white/55"
                          >
                            {item.meta}
                          </p>
                        </div>
                        <span
                          className="rounded-full bg-[rgba(74,222,128,0.15)] px-1.5 py-0.5 text-[9px] text-[#4ade80]"
                        >
                          READY
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="pointer-events-auto flex w-full justify-between px-3 font-mono text-[10px]"
        >
          <div className="flex gap-4">
            <span className="text-white/30">LAT</span>
            <span className="text-white/60">34.0522° N</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/30">SYS</span>
            <span className="text-white/60">NOMINAL</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/30">MEM</span>
            <span className="text-white/60">0.04MB</span>
          </div>
        </div>
      </div>
    </section>
  );
}
