import { ArrowRight, Briefcase, FileText, MessageCircle } from "lucide-react";

import { MetaLabel } from "@/components/landing/meta-label";
import { SectionShell } from "@/components/landing/section-shell";
import { VoiceWaveform } from "@/components/landing/voice-waveform";

const outputCards = [
  {
    icon: MessageCircle,
    label: "Twitter Post",
    text: "1/ Design isn\u2019t just about the interface. It\u2019s about reducing cognitive load through systemic predictability. When users can predict outcomes, friction disappears. \ud83e\uddf5",
    meta: "HOOK + THREAD (4 TWEETS)",
  },
  {
    icon: Briefcase,
    label: "LinkedIn Post",
    text: "I\u2019ve been thinking a lot about systemic design lately. Too often, we focus on the \u201cnew,\u201d when the real value lies in \u201cpredictable.\u201d",
    meta: "PROFESSIONAL INSIGHT \u2022 150 WORDS",
  },
  {
    icon: FileText,
    label: "Core Summary",
    text: "\u2022 Consistency as a psychological framework\n\u2022 Cognitive load reduction via predictability\n\u2022 The role of systemic trust in user retention",
    meta: "BULLETED TAKEAWAYS",
  },
];

export function UseCaseSection() {
  return (
    <SectionShell>
        <div className="mb-16 flex flex-col gap-3">
          <MetaLabel>Use Case</MetaLabel>
          <h2 className="text-[2rem] font-normal tracking-[-0.02em]">From voice to content, instantly.</h2>
        </div>
        <div className="relative grid gap-10 lg:grid-cols-2">
          {/* Connector (desktop) */}
          <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex">
            <div className="absolute h-px w-20 bg-line" />
            <div className="relative z-10 flex size-8 items-center justify-center rounded-full border border-line-active bg-background">
              <ArrowRight className="size-3.5 text-text-sub" />
            </div>
          </div>

          {/* Input panel */}
          <div className="border border-line bg-panel">
            <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
              <p className="sys-label">01 / Raw Audio Capture</p>
              <span className="flex items-center gap-2 border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.15)] px-2.5 py-1 font-mono text-[10px] text-[#4ade80]">
                <span
                  className="inline-block size-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                  style={{ animation: "pulse-dot 1.5s infinite alternate" }}
                />
                RECORDING
              </span>
            </div>
            <div className="p-8">
              <VoiceWaveform className="mb-8" />
              <p className="mb-2 font-mono text-[10px] uppercase text-white/40">
                Live Transcription
              </p>
              <p className="text-2xl font-light leading-relaxed text-white/90">
                &ldquo;I think{" "}
                <span className="border-b border-primary bg-[rgba(240,85,30,0.1)] px-1 text-primary">
                  consistency
                </span>{" "}
                matters more than motivation. Motivation gets you started, but
                consistency is what actually builds the{" "}
                <span className="border-b border-primary bg-[rgba(240,85,30,0.1)] px-1 text-primary">
                  system
                </span>{" "}
                over the long term.&rdquo;
              </p>
              <div className="mt-8 flex gap-6 border-t border-line pt-5 font-mono text-[11px]">
                <span>
                  <span className="text-text-sub">LATENCY</span>{" "}
                  <span className="text-white">12ms</span>
                </span>
                <span>
                  <span className="text-text-sub">ENGINE</span>{" "}
                  <span className="text-white">V2.4.1</span>
                </span>
                <span>
                  <span className="text-text-sub">WORDS</span>{" "}
                  <span className="text-white">24</span>
                </span>
              </div>
            </div>
          </div>

          {/* Output panel */}
          <div className="border border-line bg-panel">
            <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
              <p className="sys-label">02 / Structured Outputs</p>
              <div className="font-mono text-[11px] text-text-sub">
                <span className="mr-1 text-white">3</span> Formats
              </div>
            </div>
            <div className="space-y-4 p-8">
              {outputCards.map((item) => (
                <div
                  key={item.label}
                  className="border border-line bg-[rgba(255,255,255,0.02)] p-5 transition-all hover:border-line-active hover:bg-[rgba(255,255,255,0.04)]"
                >
                  <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#d0d0d0]">
                      <item.icon className="size-3.5 text-text-sub" />
                      {item.label}
                    </div>
                    <span className="border border-line px-1.5 py-0.5 font-mono text-[9px] text-white/40">
                      GENERATED
                    </span>
                  </div>
                  <p className="whitespace-pre-line text-[15px] font-light leading-relaxed text-[#d0d0d0]">
                    {item.text}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase text-white/40">
                    {item.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </SectionShell>
  );
}
