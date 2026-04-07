import { Briefcase, FileText, MessageCircle, Mic } from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";
import { MetaLabel } from "@/components/landing/meta-label";
import { SectionShell } from "@/components/landing/section-shell";
import { VoiceWaveform } from "@/components/landing/voice-waveform";

const outputs = [
  {
    icon: MessageCircle,
    label: "Twitter Post",
    text: "Motivation is a spark. Consistency is the engine. Don\u2019t rely on feeling inspired to do the work. Build systems that make doing the work inevitable. \ud83e\uddf5\ud83d\udc47",
    meta: "HOOK + THREAD (4 TWEETS)",
  },
  {
    icon: Briefcase,
    label: "LinkedIn Post",
    text: "We often over-index on motivation when building products or teams. But motivation is inherently fleeting. The most successful founders I know don\u2019t have more motivation...",
    meta: "PROFESSIONAL INSIGHT \u2022 150 WORDS",
  },
  {
    icon: FileText,
    label: "Core Summary",
    text: "\u2022 Thesis: Consistency > Motivation\n\u2022 Motivation = Initiation\n\u2022 Consistency = System building",
    meta: "BULLETED TAKEAWAYS",
  },
];

export function ProductDemoSection() {
  return (
    <SectionShell maxWidth={1100}>
        <div className="mb-16 flex flex-col gap-3">
          <MetaLabel>Live Pipeline</MetaLabel>
          <h2 className="text-[2rem] font-normal tracking-[-0.02em]">See the engine in action.</h2>
        </div>
        <div className="relative rounded-lg border border-line bg-panel/60 backdrop-blur-md">
          <CornerMarkers />
          <div className="grid gap-0 lg:grid-cols-[1fr_auto_1fr]">
            {/* Input panel */}
            <div className="border-b border-dashed border-line lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-dashed border-line bg-[rgba(255,255,255,0.02)] px-6 py-4">
                <p className="sys-label">
                  <Mic className="size-3" />
                  Raw Audio Input
                </p>
                <span className="flex items-center gap-2 font-mono text-[10px] text-[#4ade80]">
                  <span
                    className="inline-block size-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                    style={{ animation: "pulse-dot 1.5s infinite alternate" }}
                  />
                  CAPTURING
                </span>
              </div>
              <div className="p-6 lg:p-8">
                <VoiceWaveform />
                <p className="mt-8 text-lg font-light leading-relaxed text-white/90 lg:text-2xl">
                  &ldquo;I think consistency matters more than motivation.
                  Motivation gets you started, but consistency is what actually
                  builds the system.&rdquo;
                </p>
              </div>
            </div>

            {/* Process indicator (desktop) */}
            <div className="hidden flex-col items-center justify-center gap-4 px-4 lg:flex">
              <div className="h-24 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="flex size-12 items-center justify-center rounded-full border border-line-active bg-[rgba(255,255,255,0.05)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 animate-[spin-slow_4s_linear_infinite]"
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
              <div className="h-24 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <span
                className="font-mono text-[10px] uppercase tracking-widest text-text-sub"
                style={{ writingMode: "vertical-lr" }}
              >
                Synthesizing
              </span>
            </div>

            {/* Output panel */}
            <div className="border-t border-dashed border-line lg:border-t-0 lg:border-l-0">
              <div className="flex items-center justify-between border-b border-dashed border-line bg-[rgba(255,255,255,0.02)] px-6 py-4">
                <p className="sys-label">
                  <FileText className="size-3" />
                  Structured Outputs
                </p>
                <span className="font-mono text-[10px] text-white/50">
                  3 FORMATS
                </span>
              </div>
              <div className="space-y-4 p-6 lg:p-8">
                {outputs.map((item) => (
                  <div
                    key={item.label}
                    className="border border-line bg-[rgba(255,255,255,0.01)] p-5 transition-all hover:border-line-active hover:bg-[rgba(255,255,255,0.03)]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className="size-3.5 text-text-sub" />
                        <span className="text-xs font-medium">
                          {item.label}
                        </span>
                      </div>
                      <span className="bg-[rgba(74,222,128,0.15)] px-1.5 py-0.5 font-mono text-[9px] text-[#4ade80]">
                        READY
                      </span>
                    </div>
                    <p className="whitespace-pre-line text-sm font-light leading-relaxed text-white/80">
                      {item.text}
                    </p>
                    <p className="mt-3 border-t border-dashed border-line pt-2 font-mono text-[10px] text-white/40">
                      {item.meta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </SectionShell>
  );
}
