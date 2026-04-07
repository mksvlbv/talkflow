"use client";

import { useState, useRef, useCallback, useMemo } from "react";

import {
  Briefcase,
  FileText,
  Loader2,
  MessageCircle,
  Square,
} from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";

type Format = "twitter" | "linkedin" | "summary";
type Tone = "casual" | "professional" | "bold";

interface Outputs {
  twitter: string;
  linkedin: string;
  summary: string;
}

export default function CreatePage() {
  const sessionId = useMemo(() => `SESSION_${Math.floor(Math.random() * 999).toString().padStart(3, "0")}`, []);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [outputs, setOutputs] = useState<Outputs | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [tone, setTone] = useState<Tone>("professional");
  const [copiedTab, setCopiedTab] = useState<Format | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : "audio/webm",
      });

      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (timerRef.current) clearInterval(timerRef.current);

        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        await processAudio(blob, recorder.mimeType);
      };

      recorder.start(250);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setElapsed(0);
      setOutputs(null);
      setTranscript("");

      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } catch {
      setError("Microphone access denied. Check browser permissions.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  async function processAudio(blob: Blob, mimeType: string) {
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append(
        "audio",
        new File([blob], `recording-${Date.now()}.webm`, {
          type: mimeType || "audio/webm",
        }),
      );
      formData.append("tone", tone);

      const res = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Processing failed.");

      setTranscript(data.transcript);
      setOutputs(data.outputs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleRegenerate() {
    if (!transcript) return;
    setIsRegenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript, tone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Regeneration failed.");

      setOutputs(data.outputs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Regeneration failed.");
    } finally {
      setIsRegenerating(false);
    }
  }

  function handleCopy(tab: Format) {
    if (!outputs) return;
    navigator.clipboard.writeText(outputs[tab]);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }

  const tabs: { key: Format; label: string; icon: typeof MessageCircle }[] = [
    { key: "twitter", label: "Thread", icon: MessageCircle },
    { key: "linkedin", label: "Post", icon: Briefcase },
    { key: "summary", label: "Summary", icon: FileText },
  ];

  const tones: { key: Tone; label: string }[] = [
    { key: "casual", label: "Casual" },
    { key: "professional", label: "Professional" },
    { key: "bold", label: "Bold" },
  ];

  const showResults = transcript || outputs;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto lg:overflow-hidden">
      {/* Ambient effects (DNA) */}
      <div className="grid-bg fixed inset-0 z-0" />

      {/* ── Header bar (variant DNA) ── */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-line bg-background px-8">
        <div className="flex items-center gap-12">
          <span className="sys-label">ENGINE v2.4.1</span>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-mono text-[10px] text-white/30">LATENCY</span>
            <span className="font-mono text-[11px] text-white">12ms</span>
          </div>
          {isRecording && (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="font-mono text-[10px] text-white/30">DURATION</span>
              <span className="font-mono text-[11px] text-white">{formatTime(elapsed)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          {isRecording ? (
            <div className="flex items-center gap-3 border border-line px-3 py-1">
              <span className="inline-block size-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]" style={{ animation: "pulse-dot 1.5s infinite alternate" }} />
              <span className="font-mono text-[10px] tracking-widest text-[#4ade80]">RECORDING</span>
            </div>
          ) : (
            <span className="font-mono text-[10px] text-white/30">IDLE</span>
          )}
          <div className="hidden h-4 w-px bg-line sm:block" />
          <span className="hidden font-mono text-[10px] text-text-sub sm:inline">{sessionId}</span>
        </div>
      </header>

      {!showResults ? (
        /* ── ACTIVATION ZONE ── */
        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <p className="sys-label mb-8">Voice Input Module</p>

          <div className="relative mb-12">
            {!isRecording && !isProcessing && (
              <>
                <div className="absolute left-1/2 top-1/2 size-16 rounded-full border border-primary/20" style={{ animation: "pulse-ring 3s cubic-bezier(0.25,0.46,0.45,0.94) infinite", animationDelay: "0s" }} />
                <div className="absolute left-1/2 top-1/2 size-16 rounded-full border border-primary/20" style={{ animation: "pulse-ring 3s cubic-bezier(0.25,0.46,0.45,0.94) infinite", animationDelay: "1s" }} />
                <div className="absolute left-1/2 top-1/2 size-16 rounded-full border border-primary/20" style={{ animation: "pulse-ring 3s cubic-bezier(0.25,0.46,0.45,0.94) infinite", animationDelay: "2s" }} />
              </>
            )}

            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`relative z-10 flex h-20 w-[480px] max-w-[90vw] items-center justify-center gap-4 border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                isRecording
                  ? "border-primary bg-[rgba(240,85,30,0.05)] shadow-[0_0_40px_rgba(240,85,30,0.15)]"
                  : "border-line bg-[rgba(255,255,255,0.02)] backdrop-blur hover:border-line-active hover:bg-[rgba(255,255,255,0.04)]"
              } disabled:opacity-40`}
            >
              {isRecording ? (
                <>
                  <Square className="size-5 text-primary" />
                  <span className="font-mono text-sm text-primary">STOP RECORDING</span>
                </>
              ) : isProcessing ? (
                <>
                  <Loader2 className="size-5 animate-spin text-primary" />
                  <span className="font-mono text-sm text-text-sub">Processing…</span>
                </>
              ) : (
                <>
                  <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(240,85,30,0.6)]" />
                  <span className="font-mono text-sm text-text-sub">TAP TO BEGIN VOICE CAPTURE</span>
                </>
              )}
            </button>

            {isRecording && (
              <div className="absolute left-0 top-[30%] h-[40%] w-[2px] bg-primary opacity-40 shadow-[0_0_10px_rgba(240,85,30,1)]" style={{ animation: "scan-line 4s linear infinite" }} />
            )}
          </div>

          {/* Hint */}
          {!isRecording && !isProcessing && !showResults && (
            <p className="mb-6 font-mono text-[10px] text-white/20">
              Record your thoughts → we generate Twitter, LinkedIn &amp; Summary
            </p>
          )}

          {/* Tone selector */}
          {!isRecording && !isProcessing && (
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-white/30">TONE</span>
              {tones.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTone(t.key)}
                  className={`px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${
                    tone === t.key
                      ? "border border-primary bg-[rgba(240,85,30,0.08)] text-white"
                      : "border border-line text-white/30 hover:border-line-active hover:text-white/60"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {isRecording && (
            <div className="flex h-24 items-center gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[4px] rounded-sm bg-primary"
                  style={{ animation: `bar-dance ${1.1 + (i % 3) * 0.2}s ease-in-out ${-(i * 0.15)}s infinite` }}
                />
              ))}
            </div>
          )}

          {error && (
            <div className="mt-6 border border-red-500/30 bg-red-500/5 px-6 py-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>
      ) : (
        /* ── RESULTS VIEW (variant DNA — 40/60 split) ── */
        <main className="flex flex-1 flex-col overflow-visible lg:flex-row lg:overflow-hidden">
          {/* Left: Live Transcription (40%) */}
          <section className="flex w-full flex-col gap-6 p-6 lg:w-[40%] lg:p-8">
            <div className="relative flex flex-1 flex-col border border-line bg-panel p-8">
              <CornerMarkers size={6} />

              <div className="mb-8 flex items-start justify-between">
                <span className="sys-label">01 / Live Transcription</span>
                <div className="flex h-10 items-center gap-[3px]">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[2px] rounded-sm bg-primary"
                      style={{
                        height: `${[40, 70, 100, 80, 50, 90, 30, 60][i]}%`,
                        animation: `wave-bar 1s ease-in-out ${(i * 0.1) - 0.4}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-4">
                <p className="text-2xl font-light leading-relaxed text-white/90">
                  {transcript}
                  <span className="ml-1 inline-block w-0.5 animate-pulse border-l-2 border-white">&nbsp;</span>
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-dashed border-line pt-6">
                <span className="font-mono text-[10px] text-text-sub">
                  CONFIDENCE: <span className="text-white">0.992</span>
                </span>
                <span className="font-mono text-[10px] text-text-sub">
                  WORDS: <span className="text-white">{transcript.split(/\s+/).filter(Boolean).length}</span>
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className="flex flex-1 items-center justify-center gap-3 border border-line bg-panel py-4 transition-colors hover:border-line-active"
              >
                <span className="size-2 bg-primary" />
                <span className="font-mono text-[11px] tracking-widest">
                  {isRecording ? "STOP CAPTURE" : "NEW CAPTURE"}
                </span>
              </button>
            </div>
          </section>

          {/* Right: Structured Outputs (60%) */}
          <section className="flex w-full flex-col gap-4 overflow-visible p-6 lg:w-[60%] lg:overflow-hidden lg:p-8">
            <span className="sys-label px-2">02 / Structured Outputs</span>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-2">
              {/* Output cards */}
              {tabs.map((tab) => (
                <div key={tab.key} className="group relative border border-line bg-panel p-6 transition-all hover:border-line-active">
                  <CornerMarkers size={6} />

                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center border border-line bg-white/5">
                        <tab.icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tab.label}</p>
                        <p className="font-mono text-[9px] text-text-sub">
                          TRANSFORMATION: {tab.key.toUpperCase()}_V4
                        </p>
                      </div>
                    </div>
                    {outputs && (
                      <span className="border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.05)] px-1.5 py-0.5 font-mono text-[9px] text-[#4ade80]">
                        READY
                      </span>
                    )}
                  </div>

                  {isProcessing || isRegenerating ? (
                    <div className="flex h-16 items-center gap-1">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-[3px] bg-primary"
                          style={{ animation: `bar-dance ${1.1 + (i % 3) * 0.2}s ease-in-out ${-(i * 0.2)}s infinite` }}
                        />
                      ))}
                      <span className="ml-3 font-mono text-xs text-text-sub">Generating…</span>
                    </div>
                  ) : outputs ? (
                    <p className="whitespace-pre-line text-sm leading-relaxed text-[#d0d0d0]">
                      {outputs[tab.key]}
                    </p>
                  ) : (
                    <p className="text-sm text-text-sub">Waiting for input…</p>
                  )}

                  {outputs && (
                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleRegenerate}
                        disabled={isRegenerating}
                        className="font-mono text-[9px] text-text-sub transition-colors hover:text-white disabled:opacity-40"
                      >
                        REGENERATE
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(tab.key)}
                        className="border border-line bg-white/5 px-3 py-1 font-mono text-[9px] text-white transition-colors hover:bg-white/10"
                      >
                        {copiedTab === tab.key ? "COPIED" : "COPY RAW"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="border border-red-500/30 bg-red-500/5 px-6 py-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
          </section>
        </main>
      )}

      {/* ── Footer bar (variant DNA) ── */}
      {showResults && (
        <footer className="shrink-0 border-t border-line bg-panel">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Semantic Parameters */}
            <div className="flex flex-col justify-between border-b border-line p-6 lg:w-[40%] lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between">
                <span className="sys-label">03 / Semantic Parameters</span>
                <span className="font-mono text-[9px] text-white/20">AUTO_CALIBRATED</span>
              </div>
              <div className="flex flex-col gap-4 opacity-60">
                {[
                  { left: "CASUAL", right: "PROFESSIONAL", fill: "70%" },
                  { left: "ACADEMIC", right: "ACCESSIBLE", fill: "30%" },
                  { left: "EXPANSIVE", right: "CONCISE", fill: "85%" },
                ].map((slider) => (
                  <div key={slider.left} className="flex items-center gap-4">
                    <span className="w-20 font-mono text-[9px] text-text-sub">{slider.left}</span>
                    <div className="relative h-0.5 flex-1 bg-line">
                      <div className="absolute h-full bg-primary" style={{ width: slider.fill }} />
                      <div
                        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-white"
                        style={{ left: slider.fill }}
                      />
                    </div>
                    <span className="w-20 text-right font-mono text-[9px] text-white">{slider.right}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Output Aggregation */}
            <div className="flex flex-col justify-between p-6 lg:w-[60%]">
              <span className="sys-label mb-4">04 / Output Aggregation</span>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {["Twitter", "LinkedIn", "Summary", "Blog Outline", "Newsletter", "Action Items"].map((fmt, i) => (
                    <button
                      key={fmt}
                      type="button"
                      disabled={i >= 3}
                      className={`flex items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase transition-all ${
                        i < 3
                          ? "border border-primary bg-[rgba(240,85,30,0.05)] text-white"
                          : "cursor-not-allowed border border-line text-text-sub opacity-40"
                      }`}
                    >
                      {fmt}
                      {i >= 3 && <span className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[8px] normal-case tracking-normal text-white/30">PRO</span>}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (outputs) {
                      const all = `Twitter:\n${outputs.twitter}\n\nLinkedIn:\n${outputs.linkedin}\n\nSummary:\n${outputs.summary}`;
                      navigator.clipboard.writeText(all);
                    }
                  }}
                  className="border border-primary bg-primary px-8 py-3 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-transparent hover:text-primary"
                >
                  EXPORT ALL
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
