import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MetaLabel } from "@/components/landing/meta-label";
import { SectionShell } from "@/components/landing/section-shell";

export function CtaSection() {
  return (
    <SectionShell>
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "80vw",
          height: "80vh",
          background:
            "radial-gradient(circle, rgba(240,85,30,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto max-w-[1200px]">
        {/* Separator with EOF label */}
        <div className="relative mb-10 h-px bg-line">
          <span className="absolute -top-3.5 right-0 font-mono text-[9px] text-white/20">
            01 // EOF
          </span>
        </div>

        <MetaLabel className="mb-6">BEGIN / 01 — UPLINK_READY</MetaLabel>

        {/* Headline */}
        <h2
          className="mb-16 font-medium leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
        >
          Start creating content
          <br />
          with your voice.
        </h2>

        {/* CTA zone: button + system specs */}
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-3 bg-[#f9f9f9] px-12 py-5 text-base font-medium text-[#060606] transition-transform hover:scale-[1.02] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Try for free
              <ArrowRight className="size-[18px]" />
            </Link>
            <Link
              href="/preview"
              className="inline-flex items-center gap-3 border border-line px-12 py-5 text-base font-medium text-white/70 transition-all hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Preview App
            </Link>
          </div>

          <div className="text-right font-mono text-[11px] leading-relaxed text-white/40 sm:text-right">
            [ LATENCY: 12ms ]
            <br />
            [ ENGINE: TF-PRO-CORE ]
            <br />
            [ STATUS: AWAITING INPUT ]
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
