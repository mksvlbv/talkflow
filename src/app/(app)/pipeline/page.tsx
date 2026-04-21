import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

import { CornerMarkers } from "@/components/landing/corner-markers";
import { PipelineExportButton } from "@/components/app/pipeline-export";

const PIPELINE_CARDS = [
  {
    num: "01",
    label: "01 / INPUT",
    title: "Voice Capture",
    desc: "Real-time stream initialization and acoustic normalization.",
    status: "ACTIVE_STREAM",
    active: true,
  },
  {
    num: "02",
    label: "02 / PROCESS",
    title: "Semantic Sync",
    desc: "Natural language processing and core concept mapping.",
    status: "AWAITING_BUFFER",
    active: true,
  },
  {
    num: "03",
    label: "03 / GENERATE",
    title: "Transformation",
    desc: "Multi-modal formatting and content restructuring.",
    status: "PENDING_QUEUE",
    active: true,
  },
  {
    num: "04",
    label: "04 / REFINE",
    title: "Calibration",
    desc: "Tone adjustment and manual output verification.",
    status: "USER_GATE",
    active: true,
  },
  {
    num: "05",
    label: "05 / EXPORT",
    title: "Delivery",
    desc: "Final packet generation and destination routing.",
    status: "TARGET_NULL",
    active: true,
  },
];

export default async function PipelinePage() {
  const { userId } = await auth();
  
  let userRecordingsCount = 0;
  let userDocsCount = 0;
  let logs: string[] = [
    `[${new Date().toISOString().slice(11, 19)}] INITIALIZING JOURNEY_MAP... DONE`,
    `[${new Date().toISOString().slice(11, 19)}] RESOLVING STAGE_01 -> STAGE_05 CONNECTORS`,
    `[${new Date().toISOString().slice(11, 19)}] VALIDATING PIPELINE INTEGRITY... 100%`,
  ];

  if (userId) {
    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (user) {
      userRecordingsCount = await prisma.recording.count({ where: { userId: user.id } });
      userDocsCount = await prisma.document.count({ where: { userId: user.id } });
      
      const recentRecs = await prisma.recording.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 3
      });

      if (recentRecs.length > 0) {
        logs = recentRecs.map((r, i) => `[${r.createdAt.toISOString().slice(11, 19)}] PROCESSED_RECORDING: ${r.title.toUpperCase()} -> ${r.charCount} BYTES`);
        logs.unshift(`[${new Date().toISOString().slice(11, 19)}] FETCHED ${userRecordingsCount} TOTAL RECORDINGS FROM DB`);
      }
    }
  }

  const SYSTEM_STATS = [
    { label: "THROUGHPUT", value: `${(userRecordingsCount * 42.4).toFixed(1)} KB/S` },
    { label: "LOAD_BALANCER", value: "NOMINAL" },
    { label: "DOCUMENTS_GENERATED", value: String(userDocsCount) },
  ];
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Ambient effects (DNA) */}
      <div className="grid-bg fixed inset-0 z-0" />

      {/* ── Header (user-flow-raw.html DNA) ── */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-line bg-background px-4 sm:px-8">
        <div className="flex items-center gap-6 sm:gap-12">
          <span className="sys-label">ENGINE v2.4.1</span>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-mono text-[0.65rem] text-white/30">MAPPING_ENGINE</span>
            <span className="font-mono text-[0.7rem] text-white">PIPELINE_VIEW</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 border border-line px-3 py-1">
            <span className="inline-block size-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]" style={{ animation: "pulse-dot 1.5s infinite alternate" }} />
            <span className="font-mono text-[0.65rem] tracking-widest text-[#4ade80]">LIVE_SYNC</span>
          </div>
          <div className="hidden h-4 w-px bg-line sm:block" />
          <span className="hidden font-mono text-[0.65rem] text-text-sub sm:inline">MAP_ID: JOURNEY_01</span>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="relative z-10 flex flex-1 flex-col overflow-y-auto p-6 sm:p-8 lg:p-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="sys-label mb-8 sm:mb-12">SYSTEM PIPELINE JOURNEY</p>

          {/* Pipeline cards (horizontal on desktop, vertical on mobile) */}
          <div className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
            {PIPELINE_CARDS.map((card, i) => (
              <div key={card.num} className="flex flex-col items-stretch lg:flex-row lg:items-center">
                {/* Card */}
                <div
                  className={`relative flex h-auto min-h-[200px] w-full flex-col p-6 lg:h-64 lg:w-52 ${
                    card.active
                      ? "border border-primary bg-panel"
                      : "border border-line bg-panel"
                  }`}
                >
                  <CornerMarkers size={6} />
                  <span className="sys-label mb-4 text-[0.6rem]">{card.label}</span>
                  <p className="mb-2 text-lg font-medium text-white">{card.title}</p>
                  <p className="text-xs leading-relaxed text-text-sub">{card.desc}</p>

                  {/* Step number watermark */}
                  <span className="absolute bottom-2.5 right-4 font-mono text-[3rem] leading-none text-white/[0.05]">
                    {card.num}
                  </span>

                  {/* Status footer */}
                  <div className="mt-auto flex items-center gap-2 border-t border-line pt-4">
                    <span className={`inline-block size-1.5 ${card.active ? "bg-primary" : "bg-line"}`} />
                    <span className="font-mono text-[0.55rem] text-white/50">{card.status}</span>
                  </div>
                </div>

                {/* Connector (not after last card) */}
                {i < PIPELINE_CARDS.length - 1 && (
                  <>
                    {/* Desktop: horizontal connector */}
                    <div className={`relative hidden min-w-[40px] flex-1 lg:block ${
                      i === 0 ? "h-px bg-primary" : "h-px bg-line"
                    }`}>
                      <span className={`absolute right-0 top-1/2 size-1 -translate-y-1/2 rotate-45 border-r border-t ${
                        i === 0 ? "border-primary" : "border-line"
                      }`} />
                    </div>
                    {/* Mobile: vertical connector */}
                    <div className={`mx-auto h-8 w-px lg:hidden ${i === 0 ? "bg-primary" : "bg-line"}`} />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Bottom: stats + construction log */}
          <div className="mt-12 flex flex-col justify-between gap-8 sm:mt-16 lg:flex-row lg:items-start">
            {/* System stats */}
            <div className="w-full lg:w-1/3">
              <p className="sys-label mb-4">SYSTEM STATS</p>
              <div className="space-y-2">
                {SYSTEM_STATS.map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-line pb-1">
                    <span className="font-mono text-[0.6rem] text-text-sub">{s.label}</span>
                    <span className="font-mono text-[0.6rem] text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Construction log */}
            <div className="relative w-full border border-line bg-panel p-4 lg:w-1/2">
              <CornerMarkers size={6} />
              <p className="mb-2 font-mono text-[0.6rem] text-text-sub">CONSTRUCTION_LOG</p>
              <div className="space-y-1 font-mono text-[0.55rem] text-white/30">
                {logs.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer (user-flow-raw.html DNA) ── */}
      <footer className="relative z-10 flex h-auto shrink-0 flex-col items-center justify-between gap-4 border-t border-line bg-panel px-6 py-4 sm:h-24 sm:flex-row sm:px-12">
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="border border-line px-6 py-2 font-mono text-[0.7rem] text-text-sub transition-colors hover:border-line-active hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            BACK TO DASHBOARD
          </Link>
          <PipelineExportButton />
          <Link
            href="/processing"
            className="border border-line px-6 py-2 font-mono text-[0.7rem] text-text-sub transition-colors hover:border-line-active hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            VIEW PROCESSING DEMO
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.6rem] text-text-sub">TOTAL PIPELINE DURATION: 0.82s</span>
          <div className="hidden h-4 w-px bg-line sm:block" />
          <Link
            href="/processing"
            className="border border-primary bg-primary px-8 py-2 font-mono text-[0.7rem] font-bold tracking-widest text-black transition-all hover:bg-transparent hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            RUN SIMULATION
          </Link>
        </div>
      </footer>
    </div>
  );
}
