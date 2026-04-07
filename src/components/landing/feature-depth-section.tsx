import { MetaLabel } from "@/components/landing/meta-label";
import { SectionShell } from "@/components/landing/section-shell";
import { VoiceWaveform } from "@/components/landing/voice-waveform";

const sliders = [
  { left: "Casual", right: "Professional", fill: 70 },
  { left: "Academic", right: "Accessible", fill: 30 },
  { left: "Expansive", right: "Concise", fill: 85 },
];

const badges = [
  { label: "Twitter Thread", active: true },
  { label: "LinkedIn Post", active: true },
  { label: "Blog Outline", active: false },
  { label: "Key Takeaways", active: true },
  { label: "Newsletter", active: false },
  { label: "Action Items", active: false },
];

export function FeatureDepthSection() {
  return (
    <SectionShell>
        <div className="mb-16 flex flex-col gap-3">
          <MetaLabel>Deep Analysis</MetaLabel>
          <h2 className="text-[2rem] font-normal tracking-[-0.02em]">Precision at every layer.</h2>
        </div>
        {/* Transcription section */}
        <div className="border border-line bg-panel">
          <div className="flex items-center justify-between border-b border-dashed border-line px-8 py-5">
            <p className="sys-label">01 / Real-time Capture</p>
            <div className="flex items-center gap-6 font-mono text-[11px]">
              <span>
                <span className="text-white/40">LATENCY</span>{" "}
                <span className="text-white">12ms</span>
              </span>
              <span>
                <span className="text-white/40">ENGINE</span>{" "}
                <span className="text-white">V2.4.1</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#4ade80]">
                <span
                  className="inline-block size-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                  style={{ animation: "pulse-dot 1.5s infinite alternate" }}
                />
                RECORDING
              </span>
            </div>
          </div>
          <div className="flex items-center gap-8 p-8">
            <p className="flex-1 text-2xl font-light leading-relaxed text-white/90">
              The intersection of systemic design and user behavior is often
              where the most interesting insights live. When we think about{" "}
              <span className="relative bg-[rgba(240,85,30,0.1)] px-1 text-primary">
                consistency
                <span className="absolute -top-4 left-0 whitespace-nowrap font-mono text-[8px] text-primary opacity-70">
                  CONF: 99%
                </span>
              </span>
              , we&apos;re not just talking about repeating the same actions.
            </p>
            <div className="hidden w-[150px] shrink-0 border-l border-line pl-4 lg:flex">
              <VoiceWaveform
                barCount={8}
                className="h-16 border-0 bg-transparent px-0"
              />
            </div>
          </div>
        </div>

        {/* Bottom grid: gen preview + controls */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Gen preview */}
          <div className="border border-line bg-panel">
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <p className="sys-label">02 / Synthesis Engine</p>
              <div className="flex gap-4 font-mono text-xs">
                <span className="border-b border-primary pb-1 text-primary">
                  Structural
                </span>
                <span className="text-text-sub">Thematic</span>
                <span className="text-text-sub">Raw</span>
              </div>
            </div>
            <div className="space-y-5 p-6">
              <div className="relative border border-line bg-[rgba(255,255,255,0.02)] p-5">
                <span className="absolute -top-2 left-4 border border-line bg-panel px-2 font-mono text-[10px] text-text-sub">
                  TRANSFORMATION: THREAD
                </span>
                <p className="text-sm italic leading-relaxed text-text-sub">
                  Original: &ldquo;I think consistency matters more than
                  motivation...&rdquo;
                </p>
                <p className="mt-3 border-t border-dashed border-line pt-3 text-[15px] leading-relaxed text-[#d0d0d0]">
                  <strong>1/</strong> Motivation is a spark. Consistency is the
                  engine. Don&apos;t rely on feeling inspired to do the work.
                  Build systems that make doing the work inevitable. 🧵👇
                </p>
              </div>
              <div className="relative border border-line bg-[rgba(255,255,255,0.02)] p-5">
                <span className="absolute -top-2 left-4 border border-line bg-panel px-2 font-mono text-[10px] text-text-sub">
                  TRANSFORMATION: SUMMARY
                </span>
                <p className="text-sm italic leading-relaxed text-text-sub">
                  Extracting core arguments and logical structures...
                </p>
                <p className="mt-3 border-t border-dashed border-line pt-3 text-[15px] leading-relaxed text-[#d0d0d0]">
                  • <strong>Thesis:</strong> Consistency &gt; Motivation
                  <br />• <strong>Function 1:</strong> Motivation = Initiation
                  phase
                  <br />• <strong>Function 2:</strong> Consistency = System
                  building &amp; longevity
                </p>
              </div>
            </div>
          </div>

          {/* Controls column */}
          <div className="flex flex-col gap-6">
            {/* Semantic Parameters */}
            <div className="border border-line bg-panel p-6">
              <p className="mb-5 font-mono text-xs uppercase tracking-wider text-text-sub">
                Semantic Parameters
              </p>
              <div className="space-y-5">
                {sliders.map((s) => (
                  <div key={s.left}>
                    <div className="mb-2 flex justify-between font-mono text-[10px] text-white/40">
                      <span>{s.left}</span>
                      <span>{s.right}</span>
                    </div>
                    <div className="relative h-1 rounded-sm bg-line">
                      <div
                        className="absolute h-full rounded-sm bg-primary"
                        style={{ width: `${s.fill}%` }}
                      />
                      <div
                        className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ left: `${s.fill}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Formats */}
            <div className="flex-1 border border-line bg-panel p-6">
              <p className="mb-5 font-mono text-xs uppercase tracking-wider text-text-sub">
                Target Formats
              </p>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((p) => (
                  <div
                    key={p.label}
                    className={`flex items-center justify-between border p-3 font-mono text-[11px] transition-colors ${
                      p.active
                        ? "border-primary bg-[rgba(240,85,30,0.05)] text-[#d0d0d0]"
                        : "border-line text-text-sub hover:border-line-active hover:bg-[rgba(255,255,255,0.02)]"
                    }`}
                  >
                    {p.label}
                    <span
                      className={`size-1.5 rounded-full ${
                        p.active
                          ? "bg-primary shadow-[0_0_6px_rgba(240,85,30,0.6)]"
                          : "bg-white/20"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </SectionShell>
  );
}
