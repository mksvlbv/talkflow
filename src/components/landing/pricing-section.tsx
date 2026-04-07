import Link from "next/link";

import { MetaLabel } from "@/components/landing/meta-label";
import { SectionShell } from "@/components/landing/section-shell";

const starterFeatures = [
  { label: "30 mins / mo", sub: "Capture limit", active: true },
  { label: "Basic Export", sub: "TXT / MD Format", active: true },
  { label: "AI Analysis", sub: "Pro feature", active: false },
];

const proCore = [
  { label: "Unlimited Voice Capture", sub: "No hourly restrictions" },
  { label: "Real-time Synthesis", sub: "TLK-LLM-7B Engine" },
  { label: "Multi-Format Generation", sub: "Social / Blog / Summary" },
];

const proAccess = [
  { label: "API Integration", sub: "Full endpoint access" },
  { label: "Custom Semantic Models", sub: "Parameter control" },
  { label: "Priority Processing", sub: "< 15ms Latency" },
];

function FeatureCheck({
  label,
  sub,
  active = true,
}: {
  label: string;
  sub: string;
  active?: boolean;
}) {
  return (
    <div className="grid grid-cols-[24px_1fr] items-start gap-4">
      <div
        className={`mt-1 flex size-3.5 items-center justify-center border ${active ? "border-line-active" : "border-line"}`}
      >
        {active && <span className="block size-1.5 bg-primary" />}
      </div>
      <div className={active ? "opacity-100" : "opacity-40"}>
        <p className="text-[15px] text-[#d0d0d0]">{label}</p>
        <span className="mt-1 block font-mono text-[10px] uppercase text-text-sub">
          {sub}
        </span>
      </div>
    </div>
  );
}

function CardCorners() {
  return (
    <>
      <span className="absolute -left-px -top-px size-2.5 border-l border-t border-line-active" />
      <span className="absolute -bottom-px -right-px size-2.5 border-b border-r border-line-active" />
    </>
  );
}

export function PricingSection() {
  return (
    <SectionShell id="pricing">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between border-b border-line pb-6">
          <div className="flex flex-col gap-2">
            <MetaLabel>Subscription Model</MetaLabel>
            <h2 className="text-[2.5rem] font-light tracking-[-0.03em]">
              Scale your output.
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[11px] text-text-sub sm:block">
            VER: 4.0.2 // REVISED 2025
            <br />
            <span className="text-primary">● SYSTEM STATUS: ACTIVE</span>
          </div>
        </div>

        {/* Pricing grid: narrow Starter + wide Pro */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Starter */}
          <div className="relative border border-line bg-panel p-10">
            <CardCorners />
            <div className="mb-12">
              <span className="mb-3 block font-mono text-[11px] text-text-sub">
                01 / BASIC
              </span>
              <h3 className="mb-2 text-2xl font-normal">Starter</h3>
              <p className="flex items-baseline gap-2 text-[3rem] font-light">
                <span className="text-xl text-text-sub">$</span>0
                <span className="font-mono text-sm text-text-sub">/mo</span>
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-5">
              {starterFeatures.map((f) => (
                <FeatureCheck key={f.label} {...f} />
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/sign-up"
                className="flex w-full items-center justify-center border border-line py-4 font-mono text-xs uppercase tracking-[0.1em] transition-all hover:border-white hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Deploy Basic
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="relative border border-line-active bg-panel p-10">
            <CardCorners />
            <span className="absolute right-5 top-5 border border-primary px-2 py-1 font-mono text-[10px] text-primary">
              RECOMMENDED
            </span>
            <div className="mb-12">
              <span className="mb-3 block font-mono text-[11px] text-text-sub">
                02 / UNLIMITED
              </span>
              <h3 className="mb-2 text-2xl font-normal">Pro Pipeline</h3>
              <div className="mb-6 h-px w-24 bg-gradient-to-r from-primary to-transparent" />
              <p className="flex items-baseline gap-2 text-[3rem] font-light">
                <span className="text-xl text-text-sub">$</span>19
                <span className="font-mono text-sm text-text-sub">/mo</span>
              </p>
            </div>

            {/* 2-col features */}
            <div className="grid gap-12 sm:grid-cols-2">
              <div>
                <span className="mb-6 block border-b border-dashed border-line pb-2 font-mono text-[11px] text-text-sub">
                  CORE CAPABILITIES
                </span>
                <div className="flex flex-col gap-5">
                  {proCore.map((f) => (
                    <FeatureCheck key={f.label} {...f} active />
                  ))}
                </div>
              </div>
              <div>
                <span className="mb-6 block border-b border-dashed border-line pb-2 font-mono text-[11px] text-text-sub">
                  SYSTEM ACCESS
                </span>
                <div className="flex flex-col gap-5">
                  {proAccess.map((f) => (
                    <FeatureCheck key={f.label} {...f} active />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <Link
                href="/sign-up"
                className="flex flex-1 items-center justify-center whitespace-nowrap bg-primary px-4 py-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-black transition-all hover:bg-transparent hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Activate Pipeline
              </Link>
              <Link
                href="/demo"
                className="flex flex-1 items-center justify-center whitespace-nowrap border border-line px-4 py-4 font-mono text-xs uppercase tracking-[0.1em] transition-all hover:border-white hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
    </SectionShell>
  );
}
