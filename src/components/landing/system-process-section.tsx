import { FileText, Mic } from "lucide-react";

import { MetaLabel } from "@/components/landing/meta-label";
import { SectionShell } from "@/components/landing/section-shell";

const formatNodes = [
  { label: "Thread Structure", tag: "SOCIAL" },
  { label: "Professional Post", tag: "LINKEDIN" },
  { label: "Key Takeaways", tag: "SUMMARY" },
];

function NodeCorners() {
  return (
    <>
      <span className="absolute -left-[3px] -top-[3px] block size-1.5 border border-line-active bg-background" />
      <span className="absolute -bottom-[3px] -right-[3px] block size-1.5 border border-line-active bg-background" />
    </>
  );
}

function ConnectionArrow({ label }: { label: string }) {
  return (
    <div className="relative flex items-center">
      <div className="h-px w-20 bg-line" />
      <div
        className="absolute -right-[3px] -top-[3px] size-[6px] rotate-45 border-r border-t border-text-sub"
        aria-hidden="true"
      />
      <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.1em] text-text-sub">
        {label}
      </span>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function SystemProcessSection() {
  return (
    <SectionShell>
        {/* Header */}
        <div className="mb-20 flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <MetaLabel>System Architecture</MetaLabel>
            <h2 className="text-[2rem] font-normal tracking-[-0.02em]">
              Processing Pipeline
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[11px] uppercase tracking-[0.1em] text-text-sub sm:block">
            <div>ENGINE v2.4.1</div>
            <div className="mt-1 text-[#444]">LATENCY: 12ms</div>
          </div>
        </div>

        {/* Schematic — 5-col on desktop */}
        <div
          className="hidden items-center gap-5 lg:grid"
          style={{ gridTemplateColumns: "1fr auto 1.5fr auto 1.5fr" }}
        >
          {/* Node 1: Voice Input */}
          <div className="relative border border-line bg-panel p-8">
            <NodeCorners />
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-sub">
              <span className="flex size-6 items-center justify-center rounded-full border border-line">
                <Mic className="size-3" />
              </span>
              01. Voice Input
            </div>
            <p className="text-[1.1rem] font-light leading-relaxed text-[#d0d0d0]">
              Unstructured dictation capture.
            </p>
            <div
              className="mt-4 flex items-center gap-[3px]"
              style={{ height: 24 }}
              aria-hidden="true"
            >
              {[40, 80, 100, 60, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-text-sub"
                  style={{
                    height: `${h}%`,
                    animation: "wave-bar 1s infinite alternate ease-in-out",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-dashed border-line pt-4 font-mono text-[11px] text-[#555]">
              <span>STATE: RECORDING</span>
              <span
                className="inline-block size-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.4)]"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
            </div>
          </div>

          <ConnectionArrow label="STREAM" />

          {/* Node 2: Semantic Analysis */}
          <div className="relative border border-line bg-panel p-8">
            <NodeCorners />
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-sub">
              <span className="flex size-6 items-center justify-center rounded-full border border-line">
                <InfoIcon />
              </span>
              02. Semantic Analysis
            </div>
            <p className="text-[1.1rem] font-light leading-relaxed text-[#d0d0d0]">
              Extraction of core arguments, sentiment, and key logical
              structures.
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-dashed border-line pt-4 font-mono text-[11px] text-[#555]">
              <span>MODEL: TLK-LLM-7B</span>
              <span>100%</span>
            </div>
          </div>

          <ConnectionArrow label="PARSE" />

          {/* Node 3: Format Generation (sub-nodes) */}
          <div>
            <div className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-sub">
              <span className="flex size-6 items-center justify-center rounded-full border border-line">
                <FileText className="size-3" />
              </span>
              03. Format Generation
            </div>
            <div className="flex flex-col gap-4">
              {formatNodes.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border border-line px-5 py-4"
                >
                  <span className="text-[0.9rem]">{item.label}</span>
                  <span className="border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-sub">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: stacked version */}
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="border border-line bg-panel p-6">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-sub">
              <span className="flex size-6 items-center justify-center rounded-full border border-line">
                <Mic className="size-3" />
              </span>
              01. Voice Input
            </div>
            <p className="text-base font-light text-[#d0d0d0]">
              Unstructured dictation capture.
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-3 font-mono text-[11px] text-[#555]">
              <span>STATE: RECORDING</span>
              <span
                className="inline-block size-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.4)]"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-text-sub">
            <div className="h-px w-8 bg-line" />
            STREAM
            <div className="h-px w-8 bg-line" />
          </div>
          <div className="border border-line bg-panel p-6">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-sub">
              <span className="flex size-6 items-center justify-center rounded-full border border-line">
                <InfoIcon />
              </span>
              02. Semantic Analysis
            </div>
            <p className="text-base font-light text-[#d0d0d0]">
              Extraction of core arguments, sentiment, and key logical
              structures.
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-3 font-mono text-[11px] text-[#555]">
              <span>MODEL: TLK-LLM-7B</span>
              <span>100%</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-text-sub">
            <div className="h-px w-8 bg-line" />
            PARSE
            <div className="h-px w-8 bg-line" />
          </div>
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-sub">
              <span className="flex size-6 items-center justify-center rounded-full border border-line">
                <FileText className="size-3" />
              </span>
              03. Format Generation
            </div>
            <div className="flex flex-col gap-3">
              {formatNodes.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border border-line px-5 py-4"
                >
                  <span className="text-[0.9rem]">{item.label}</span>
                  <span className="border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-sub">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
    </SectionShell>
  );
}
