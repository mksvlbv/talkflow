import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  Briefcase,
  FileText,
  MessageCircle,
  Plus,
} from "lucide-react";

import { UptimeCounter } from "@/components/app/uptime-counter";
import { CornerMarkers } from "@/components/landing/corner-markers";

export default async function DashboardPage() {
  const { userId } = await auth();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
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
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-mono text-[10px] text-white/30">UPTIME</span>
            <UptimeCounter />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-10 sm:flex">
            {[
              { label: "RECORDINGS", value: "3" },
              { label: "GENERATED", value: "9" },
              { label: "USAGE", value: "7:31" },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-white/30">{m.label}</span>
                <span className="font-mono text-[11px] text-white">{m.value}</span>
              </div>
            ))}
          </div>
          <div className="hidden h-4 w-px bg-line sm:block" />
          <span className="hidden font-mono text-[10px] text-text-sub sm:inline">
            SID: {userId?.slice(0, 8) ?? "PREVIEW"}
          </span>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Quick action */}
          <Link
            href="/create"
            className="group relative flex items-center justify-between border border-dashed border-line bg-panel p-8 transition-all hover:border-primary hover:bg-[rgba(240,85,30,0.02)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <CornerMarkers size={8} />
            <div className="flex items-center gap-6">
              <div className="flex size-14 items-center justify-center border border-line bg-[rgba(255,255,255,0.02)]">
                <Plus className="size-6 text-text-sub transition-colors group-hover:text-primary" />
              </div>
              <div>
                <p className="text-lg font-light">New Recording</p>
                <p className="mt-1 font-mono text-[10px] text-text-sub">
                  TAP TO BEGIN VOICE CAPTURE // PIPELINE READY
                </p>
              </div>
            </div>
            <ArrowRight className="size-5 text-text-sub transition-all group-hover:translate-x-1 group-hover:text-primary" />
          </Link>

          {/* 2-col layout */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Left: Last transcript / empty state */}
            <div className="relative border border-line bg-panel">
              <CornerMarkers size={6} />
              <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
                <div className="flex items-center gap-3">
                  <p className="sys-label">01 / Latest Transcript</p>
                  <span className="font-mono text-[8px] text-white/15">SAMPLE</span>
                </div>
                <span className="font-mono text-[10px] text-white/30">2:34 DURATION</span>
              </div>
              <div className="p-6">
                <p className="mb-3 font-mono text-[10px] uppercase text-white/30">The Architecture of Predictability</p>
                <p className="text-[15px] font-light leading-relaxed text-white/80">
                  &ldquo;The intersection of systemic design and user behavior is where the most interesting insights live. When we think about{" "}
                  <span className="border-b border-primary bg-[rgba(240,85,30,0.1)] px-1 text-primary">consistency</span>, we&apos;re not just talking about repeating the same actions — we&apos;re building{" "}
                  <span className="border-b border-primary bg-[rgba(240,85,30,0.1)] px-1 text-primary">predictable systems</span>{" "}
                  that compound over time.&rdquo;
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <div className="flex gap-4 font-mono text-[10px] text-white/30">
                    <span>Jun 12</span>
                    <span>3 FORMATS</span>
                    <span>CONF: 99.2%</span>
                  </div>
                  <Link
                    href="/history/1"
                    className="flex items-center gap-1.5 font-mono text-[10px] text-primary transition-colors hover:brightness-110"
                  >
                    VIEW FULL
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Output cards */}
            <div className="relative border border-line bg-panel">
              <CornerMarkers size={6} />
              <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
                <p className="sys-label">02 / Structured Outputs</p>
                <span className="font-mono text-[10px] text-white/30">3 FORMATS</span>
              </div>
              <div className="space-y-4 p-6">
                {[
                  {
                    icon: MessageCircle,
                    label: "Twitter Thread",
                    desc: "Record & generate a Twitter thread",
                    href: "/create?format=twitter",
                    meta: "RECORD → THREAD",
                  },
                  {
                    icon: Briefcase,
                    label: "LinkedIn Post",
                    desc: "Record & generate a LinkedIn post",
                    href: "/create?format=linkedin",
                    meta: "RECORD → POST",
                  },
                  {
                    icon: FileText,
                    label: "Core Summary",
                    desc: "Record & generate bullet-point takeaways",
                    href: "/create?format=summary",
                    meta: "RECORD → SUMMARY",
                  },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex items-center justify-between border border-line bg-[rgba(255,255,255,0.01)] p-5 transition-all hover:border-line-active hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-8 items-center justify-center border border-line bg-white/5">
                        <action.icon className="size-4 text-text-sub" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{action.label}</p>
                        <p className="mt-0.5 text-xs text-white/30">{action.desc}</p>
                        <p className="mt-0.5 font-mono text-[9px] text-white/20">{action.meta}</p>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-text-sub transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity list */}
          <div className="relative border border-line bg-panel">
            <CornerMarkers size={6} />
            <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
              <p className="sys-label">03 / Recent Activity</p>
              <span className="font-mono text-[10px] text-white/30">3 DOCUMENTS</span>
            </div>
            <div>
              {[
                { id: "1", title: "The Architecture of Predictability", time: "2:34", formats: 3, date: "Jun 12" },
                { id: "2", title: "Building Systems Over Motivation", time: "1:45", formats: 3, date: "Jun 10" },
                { id: "3", title: "Cognitive Load in Interface Design", time: "3:12", formats: 2, date: "Jun 8" },
              ].map((doc, i) => (
                <Link
                  key={doc.id}
                  href={`/history/${doc.id}`}
                  className="group flex items-center justify-between border-b border-line px-6 py-4 transition-colors last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{doc.title}</p>
                      <div className="mt-0.5 flex gap-3 font-mono text-[10px] text-white/30">
                        <span>{doc.time}</span>
                        <span>{doc.formats} FORMATS</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="size-3.5 text-text-sub transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
