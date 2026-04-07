"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { toast } from "sonner";
import { Mic } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [activating, setActivating] = useState(false);
  const [micDenied, setMicDenied] = useState(false);

  const handleActivate = useCallback(async () => {
    setActivating(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Small delay so user sees the activation feedback
      setTimeout(() => router.push("/dashboard"), 600);
    } catch {
      setActivating(false);
      setMicDenied(true);
      toast.error("Microphone access denied. Grant permission in your browser settings or skip to the dashboard.");
    }
  }, [router]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* ── Header (onboarding-raw.html DNA) ── */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-line bg-background px-8">
        <div className="flex items-center gap-12">
          <span className="sys-label">ENGINE v2.4.1</span>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/30">CORE_PROCESS</span>
            <span className="font-mono text-[0.7rem] text-white">IDLE_INIT_SEQUENCE</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/30">WAITING_FOR_INPUT</span>
        </div>
      </header>

      {/* ── Main: activation zone ── */}
      <main className="relative z-20 flex flex-1 items-center justify-center">
        {/* Ambient effects (DNA) */}
        <div className="grid-bg fixed inset-0 z-0" />
        <div className="vignette" />

        <div className="flex flex-col items-center gap-12">
          {/* Top label + line */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="mb-2 font-mono text-[0.65rem] tracking-[0.2em] text-text-sub">
              INPUT_INTERFACE_READY
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-line to-transparent" />
          </div>

          {/* Activation zone */}
          <button
            type="button"
            onClick={handleActivate}
            disabled={activating}
            className="group relative flex w-full max-w-[480px] cursor-pointer items-center justify-between border border-line bg-[rgba(10,10,10,0.4)] px-6 py-5 backdrop-blur-sm transition-all hover:border-line-active hover:bg-[rgba(15,15,15,0.6)] sm:h-20 sm:px-6"
          >
            {/* Hover accent border */}
            <span className="pointer-events-none absolute inset-[-1px] border border-primary opacity-0 transition-opacity group-hover:opacity-15" />

            <div className="flex items-center gap-6">
              {/* Pulse core + ring */}
              <div className="relative flex size-8 items-center justify-center">
                <div className="size-2 rounded-full bg-primary" />
                <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary" style={{ animation: "pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite" }} />
              </div>
              <span className="font-mono text-[0.75rem] tracking-wider text-white/40">
                {activating ? "INITIALIZING..." : "ACTIVATE VOICE SYNTHESIS"}
              </span>
            </div>

            <div className="hidden items-center gap-4 sm:flex">
              <span className="font-mono text-[0.6rem] text-line-active">[ CLICK ]</span>
              <Mic className="size-4 text-text-sub" />
            </div>

            {/* Scanning line */}
            {!activating && (
              <span
                className="pointer-events-none absolute h-[40%] w-0.5 bg-primary opacity-40 shadow-[0_0_10px_var(--primary)]"
                style={{ animation: "scan-line 4s linear infinite" }}
              />
            )}
          </button>

          {/* Mic denied message */}
          {micDenied && (
            <p className="font-mono text-[0.65rem] text-red-400/70">
              MIC_ACCESS_DENIED — grant permission or skip below
            </p>
          )}

          {/* Skip link */}
          <Link
            href="/dashboard"
            className="font-mono text-[0.65rem] tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
          >
            SKIP_TO_DASHBOARD &rarr;
          </Link>

          {/* Status readouts */}
          <div className="mt-8 flex flex-wrap justify-center gap-10 sm:gap-16">
            {[
              { label: "MIC_STATUS", value: activating ? "CONNECTED // READY" : "PENDING" },
              { label: "LATENCY", value: "12MS" },
              { label: "ENCRYPTION", value: "AES-256" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/30">
                  {item.label}
                </span>
                <span className="font-mono text-[0.6rem] text-white/60">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer (onboarding-raw.html DNA) ── */}
      <footer className="relative z-10 flex h-10 shrink-0 items-center justify-between border-t border-line bg-background px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-[0.55rem] text-text-sub">
            <span className="inline-block size-1.5 bg-[#4ade80]" />
            SYSTEM_READY
          </div>
          <span className="hidden font-mono text-[0.55rem] text-text-sub sm:inline">
            LISTENING_FOR_TRIGGER: YES
          </span>
        </div>
        <span className="font-mono text-[0.55rem] text-text-sub">
          TALKFLOW_OS // BOOT_COMPLETE // 0.0.1-ALPHA
        </span>
      </footer>
    </div>
  );
}
