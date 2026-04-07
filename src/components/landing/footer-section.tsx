import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { SectionShell } from "@/components/landing/section-shell";

export function FooterSection() {
  return (
    <SectionShell as="footer" className="py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_auto]">
        {/* Brand */}
        <BrandLogo href="/" showText={false} size={12}>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
            TALKFLOW / CORE_V1.02
          </span>
        </BrandLogo>

        {/* Nav columns */}
        <div className="flex gap-16 sm:gap-20">
          <div className="flex flex-col gap-3">
            <Link
              href="/preview"
              className="text-[11px] text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Preview App
            </Link>
            <Link
              href="/demo"
              className="text-[11px] text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Demo
            </Link>
            <Link
              href="/#pricing"
              className="text-[11px] text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Pricing
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/terms"
              className="text-[11px] text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-[11px] text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/security"
              className="text-[11px] text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-line pt-6">
        <p className="font-mono text-[10px] text-white/25">
          &copy; {new Date().getFullYear()} TalkFlow. All rights reserved.
        </p>
      </div>
    </SectionShell>
  );
}
