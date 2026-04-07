import Link from "next/link";

import { ArrowRight, Mic, Plus } from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";

const MOCK_DOCS = [
  { id: "1", title: "The Architecture of Predictability", time: "2:34", formats: 3, date: "Jun 12" },
  { id: "2", title: "Building Systems Over Motivation", time: "1:45", formats: 3, date: "Jun 10" },
  { id: "3", title: "Cognitive Load in Interface Design", time: "3:12", formats: 2, date: "Jun 8" },
];

export default function HistoryPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Ambient effects (DNA) */}
      <div className="grid-bg fixed inset-0 z-0" />

      {/* ── Header bar (variant DNA) ── */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-line bg-background px-8">
        <div className="flex items-center gap-12">
          <span className="sys-label">Document Workspace</span>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-mono text-[10px] text-white/30">PROJECT</span>
            <span className="font-mono text-[11px] text-white">SYSTEMIC_DESIGN_V3</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-white/30">{MOCK_DOCS.length} DOCUMENTS</span>
          <div className="hidden h-4 w-px bg-line sm:block" />
          <span className="hidden font-mono text-[10px] text-text-sub sm:inline">DOCUMENT_VIEW_A</span>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Quick action */}
          <Link
            href="/create"
            className="group flex items-center gap-4 border border-dashed border-line bg-panel px-6 py-4 transition-all hover:border-primary hover:bg-[rgba(240,85,30,0.02)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <div className="flex size-10 items-center justify-center border border-line bg-[rgba(255,255,255,0.02)]">
              <Plus className="size-4 text-text-sub transition-colors group-hover:text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">New Recording</p>
              <p className="mt-0.5 font-mono text-[10px] text-text-sub">
                CAPTURE VOICE // GENERATE DOCUMENTS
              </p>
            </div>
          </Link>

          {/* Document list */}
          <div className="relative border border-line bg-panel">
            <CornerMarkers size={6} />
            <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
              <p className="sys-label">June 2025</p>
              <span className="font-mono text-[10px] text-white/30">{MOCK_DOCS.length} DOCUMENTS</span>
            </div>
            {MOCK_DOCS.map((doc, i) => (
              <Link
                key={doc.id}
                href={`/history/${doc.id}`}
                className="group flex items-center justify-between border-b border-line px-6 py-5 transition-colors last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[10px] text-white/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{doc.title}</p>
                    <div className="mt-1 flex gap-4 font-mono text-[10px] text-white/30">
                      <span>{doc.time} DURATION</span>
                      <span>{doc.formats} FORMATS</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="size-4 text-text-sub transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
