"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowRight,
  Briefcase,
  Copy,
  FileText,
  Loader2,
  MessageCircle,
  MicOff,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import { useAuth } from "@clerk/nextjs";

import { Navbar } from "@/components/landing/navbar";
import { CornerMarkers } from "@/components/landing/corner-markers";

const DEMO_OUTPUTS = {
  twitter:
    "1/ Consistency beats motivation every time.\n\nWhen you show up daily, results compound. Most people quit right before the inflection point.\n\nHere's what I've learned about building sustainable habits 🧵",
  linkedin:
    "I've been reflecting on why some people consistently outperform others.\n\nIt's not talent. It's not resources. It's predictability.\n\nWhen you commit to showing up every day — even when motivation fades — you build something powerful: compound momentum.\n\nThe best creators I know aren't the most inspired. They're the most consistent.",
  summary:
    "• Consistency outperforms motivation for long-term results\n• Daily action creates compound effects over time\n• Most people abandon efforts before reaching the inflection point\n• Sustainable habits beat sporadic bursts of productivity",
};

type Format = "twitter" | "linkedin" | "summary";

export default function DemoPage() {
  const { isSignedIn } = useAuth();
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputs, setOutputs] = useState<typeof DEMO_OUTPUTS | null>(null);
  const [activeTab, setActiveTab] = useState<Format>("twitter");
  const [copiedTab, setCopiedTab] = useState<Format | null>(null);

  async function handleGenerate() {
    if (!input.trim()) return;
    setIsProcessing(true);
    setOutputs(null);

    if (isSignedIn) {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input, tone: "professional" }),
        });
        if (res.ok) {
          const data = await res.json();
          setOutputs(data);
          setIsProcessing(false);
          return;
        }
      } catch { /* fall through to mock */ }
    }

    // Fallback: simulate processing for unauthenticated users
    await new Promise((r) => setTimeout(r, 2000));
    setOutputs(DEMO_OUTPUTS);
    setIsProcessing(false);
  }

  function handleCopy() {
    if (!outputs) return;
    navigator.clipboard.writeText(outputs[activeTab]);
    setCopiedTab(activeTab);
    setTimeout(() => setCopiedTab(null), 2000);
  }

  function handleReset() {
    setInput("");
    setOutputs(null);
    setIsProcessing(false);
  }

  const tabs: { key: Format; label: string; icon: typeof MessageCircle }[] = [
    { key: "twitter", label: "Thread", icon: MessageCircle },
    { key: "linkedin", label: "Post", icon: Briefcase },
    { key: "summary", label: "Summary", icon: FileText },
  ];

  return (
    <>
      <Navbar isSignedIn={Boolean(isSignedIn)} />
      <div className="noise-overlay fixed inset-0 z-[100]" />
      <div className="grid-bg fixed inset-0 z-0" />

      <main className="relative z-10 px-6 pb-32 pt-28 lg:px-12">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="sys-label mb-4 justify-center">Interactive Demo</p>
            <h1 className="text-3xl font-light tracking-tight sm:text-5xl">
              Try the <span className="text-primary">engine</span>.
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm font-light text-text-sub">
              Paste your thoughts below and watch them transform into
              structured, platform-ready content.
            </p>
          </div>

          {/* Main demo area */}
          <div className="grid gap-0 border border-line lg:grid-cols-2">
            {/* Input panel */}
            <div className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
                <p className="sys-label">Input</p>
                <span className="font-mono text-[10px] text-text-sub">
                  {input.length} CHARS
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your raw thoughts, meeting notes, or spoken ideas here..."
                  className="flex-1 resize-none bg-transparent text-base font-light leading-relaxed text-white/90 outline-none placeholder:text-white/20"
                  rows={8}
                />
                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={!input.trim() || isProcessing}
                    className="inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" />
                        Generate
                      </>
                    )}
                  </button>
                  {outputs && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex h-11 items-center gap-2 border border-line-active px-4 text-sm text-text-sub transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    >
                      <RefreshCw className="size-3.5" />
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Output panel */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
                <p className="sys-label">Output</p>
                {outputs && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 font-mono text-[10px] text-text-sub transition-colors hover:text-primary"
                  >
                    <Copy className="size-3" />
                    {copiedTab === activeTab ? "COPIED" : "COPY"}
                  </button>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-line">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                      activeTab === tab.key
                        ? "border-b border-primary text-primary"
                        : "text-text-sub hover:text-white/60"
                    }`}
                  >
                    <tab.icon className="size-3" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Output content */}
              <div className="flex flex-1 flex-col p-6">
                {isProcessing ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-4 text-text-sub">
                    <div className="flex items-center gap-2">
                      <div className="size-1.5 animate-[pulse-dot_1.5s_infinite] rounded-full bg-primary" />
                      <span className="font-mono text-xs uppercase tracking-wider">
                        Synthesizing
                      </span>
                    </div>
                    <p className="text-sm font-light">
                      Processing your thoughts…
                    </p>
                  </div>
                ) : outputs ? (
                  <div className="relative border border-line bg-[rgba(255,255,255,0.01)] p-5">
                    <CornerMarkers size={6} />
                    <p className="whitespace-pre-line text-sm font-light leading-relaxed text-white/80">
                      {outputs[activeTab]}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                    <MicOff className="size-6 text-white/10" />
                    <p className="text-sm font-light text-text-sub">
                      Enter your text and click Generate to see results.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA below demo */}
          <div className="mt-16 text-center">
            <p className="mb-4 text-sm text-text-sub">
              Ready for the full experience?
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/sign-up"
                className="inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Create Free Account
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/preview"
                className="inline-flex h-11 items-center gap-2 border border-line px-6 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Preview App
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
