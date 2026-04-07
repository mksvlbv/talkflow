"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Mic } from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";

const PIPELINE_STEPS = [
  { num: "01 / CAPTURE", name: "Linear PCM Stream" },
  { num: "02 / DENOISE", name: "Ambient Filter v4" },
  { num: "03 / ANALYZE", name: "Semantic Extraction" },
  { num: "04 / SYNTHESIZE", name: "Format Mapping" },
  { num: "05 / EXPORT", name: "Markdown / JSON" },
];

const LOG_ENTRIES = [
  { ts: "14:22:01.12", msg: "[IO] Initializing audio bridge... OK" },
  { ts: "14:22:01.45", msg: "[CORE] Model loaded into VRAM (2.4GB)" },
  { ts: "14:22:02.01", msg: "[NET] Establishing socket handshake" },
  { ts: "14:22:02.10", msg: "[SYS] Calibrating noise threshold... -42db" },
  { ts: "14:22:05.12", msg: '[PROC] Segment detected: "The architecture..."' },
  { ts: "14:22:06.88", msg: '[NLP] Entity resolved: "modern systems"' },
  { ts: "14:22:08.32", msg: "[TRANS] Mapping to Structural Template: THREAD" },
  { ts: "14:22:10.04", msg: "[RUN] Optimizing token weights for concise output..." },
];

const SIGNAL_BARS = [40, 60, 85, 100, 70, 90, 100, 65, 45, 80, 100, 75, 30, 55, 90, 100, 60, 40];

export default function ProcessingPage() {
  const [activeStep, setActiveStep] = useState(2);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const completed = activeStep >= 4;

  // Simulate pipeline progression
  useEffect(() => {
    if (elapsed > 0 && elapsed % 4 === 0 && activeStep < 4) {
      setActiveStep((s) => s + 1);
    }
  }, [elapsed, activeStep]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Ambient effects (DNA) */}
      <div className="grid-bg fixed inset-0 z-0" />

      {/* ── Header (processing-raw.html DNA) ── */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-line bg-background px-4 sm:px-8">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/dashboard" className="font-mono text-[0.65rem] text-text-sub transition-colors hover:text-white">
            ← BACK
          </Link>
          <span className="font-mono text-[0.65rem] text-text-sub">
            TalkFlow // CORE_PROCESSOR
          </span>
          <span className="hidden font-mono text-[0.55rem] text-white/30 sm:inline">
            SID: 882-AX-0912 // ENGINE_V2.4.1
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {[
            { label: "LATENCY", value: "11.4ms" },
            { label: "CONFIDENCE", value: "99.82%" },
            { label: "THROUGHPUT", value: "42 TK/S" },
          ].map((m) => (
            <div key={m.label} className="hidden items-center gap-2 sm:flex">
              <span className="font-mono text-[0.55rem] text-white/30">{m.label}</span>
              <span className="font-mono text-[0.65rem] text-white">{m.value}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.55rem] text-white/30">STATUS</span>
            <span className={`flex items-center gap-1.5 font-mono text-[0.65rem] ${completed ? "text-[#4ade80]" : "text-[#4ade80]"}`}>
              <span className={`inline-block size-1.5 rounded-full ${completed ? "bg-[#4ade80]" : "bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]"}`} style={completed ? undefined : { animation: "pulse-dot 1.5s infinite alternate" }} />
              {completed ? "PIPELINE_COMPLETE" : "LIVE_STREAMING"}
            </span>
          </div>
        </div>
      </header>

      {/* ── 3-col content grid (processing-raw.html DNA) ── */}
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Left: Pipeline stages */}
        <aside className="flex shrink-0 flex-row gap-0 overflow-x-auto border-b border-line bg-background lg:w-[280px] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">
          <div className="hidden border-b border-line px-5 py-3 lg:block">
            <span className="sys-label">Pipeline Stages</span>
          </div>
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.num}>
              <div
                className={`relative flex items-center gap-4 whitespace-nowrap px-5 py-4 transition-all ${
                  i === activeStep
                    ? "bg-[rgba(255,255,255,0.02)]"
                    : i < activeStep
                      ? "opacity-50"
                      : "opacity-30"
                }`}
              >
                {i === activeStep && (
                  <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-primary" />
                )}
                <div>
                  <span className={`font-mono text-[0.6rem] tracking-wider ${i === activeStep ? "text-primary" : "text-white/30"}`}>
                    {step.num}
                  </span>
                  <p className={`mt-1 text-xs ${i === activeStep ? "text-white" : "text-text-sub"}`}>
                    {step.name}
                  </p>
                </div>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="hidden h-px bg-line lg:block" />
              )}
            </div>
          ))}
        </aside>

        {/* Center: Visualization */}
        <main className="flex flex-1 flex-col overflow-y-auto border-b border-line p-6 lg:border-b-0 lg:border-r lg:p-8">
          {/* Viz header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[0.6rem] text-text-sub">
              <Mic className="size-3" />
              INPUT: BROWSER_MEDIA_DEVICE
            </div>
            <span className="sys-label">Real-time Spectral Wave</span>
          </div>

          {/* Signal bars */}
          <div className="flex flex-1 items-center justify-center gap-1" style={{ minHeight: "200px" }}>
            {SIGNAL_BARS.map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-sm bg-primary ${
                  i % 3 === 0 ? "animate-[bar-dance_1.2s_infinite_ease-in-out]"
                  : i % 3 === 1 ? "animate-[bar-dance_1.5s_infinite_ease-in-out_-0.3s]"
                  : "animate-[bar-dance_1.1s_infinite_ease-in-out_-0.7s]"
                }`}
                style={{ height: `${h}%`, minHeight: "4px" }}
              />
            ))}
          </div>

          {/* Live transcript / completion banner */}
          <div className="mt-auto border-t border-line pt-8">
            {completed ? (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <p className="font-mono text-[11px] tracking-widest text-[#4ade80]">ALL STAGES COMPLETE — OUTPUT READY</p>
                <Link
                  href="/dashboard"
                  className="border border-primary bg-primary px-8 py-3 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-transparent hover:text-primary"
                >
                  OPEN DASHBOARD
                </Link>
              </div>
            ) : (
              <p className="text-xl font-light leading-relaxed text-white/30 sm:text-[1.4rem]">
                &ldquo;The architecture of modern systems requires{" "}
                <span className="border-b border-primary text-white">
                  deep integration between capture and synthesis
                </span>{" "}
                where the latency of the feedback loop...&rdquo;
              </p>
            )}
          </div>
        </main>

        {/* Right: System logs */}
        <aside className="flex w-full shrink-0 flex-col lg:w-[340px]">
          <div className="border-b border-line px-5 py-3">
            <span className="sys-label">System Operations</span>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto border border-line bg-[rgba(255,255,255,0.01)] p-5 font-mono text-[0.7rem]">
            {LOG_ENTRIES.map((entry, i) => (
              <div
                key={i}
                className={`flex gap-2.5 leading-relaxed ${
                  i === LOG_ENTRIES.length - 1
                    ? "border-l-2 border-primary bg-[rgba(255,255,255,0.03)] p-2 text-white"
                    : "text-white/30"
                }`}
              >
                <span className={`shrink-0 ${i === LOG_ENTRIES.length - 1 ? "text-primary" : "text-white/15"}`}>
                  {entry.ts}
                </span>
                <span>{entry.msg}</span>
              </div>
            ))}
          </div>

          {/* System footer */}
          <div className="flex items-center justify-between border-t border-line px-4 py-3 font-mono text-[0.6rem] text-white/30">
            <span>CPU: 12%</span>
            <span>MEM: 4.1GB / 32GB</span>
            <span>TX: 128kbps</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
