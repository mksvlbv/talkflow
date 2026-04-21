import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { WorkspaceExportButton, WorkspaceFormatDropdown, WorkspaceRegenerateButton } from "@/components/app/workspace-actions";

import { prisma } from "@/lib/prisma";
import { getAppUserByClerkId } from "@/lib/app-user";
import { auth } from "@clerk/nextjs/server";

type WorkspacePageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { id } = await params;
  const { userId } = await auth();
  const appUser = userId ? await getAppUserByClerkId(userId) : null;

  if (!appUser) notFound();

  const recording = await prisma.recording.findUnique({
    where: { id, userId: appUser.id },
    include: { document: true }
  });

  if (!recording) notFound();

  const doc = recording.document;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Ambient effects (DNA) */}
      <div className="grid-bg fixed inset-0 z-0" />

      {/* ── Header (workspace-raw.html DNA) ── */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-line bg-background px-8">
        <div className="flex items-center gap-12">
          <span className="sys-label">ENGINE v2.4.1</span>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/30">
              PROJECT
            </span>
            <span className="font-mono text-[0.7rem] text-white">
              SYSTEMIC_DESIGN_V3
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-3 border border-line px-3 py-1 sm:flex">
            <span className="font-mono text-[0.65rem] tracking-widest text-text-sub">
              WORKSPACE_ID: {recording.id.slice(-8).toUpperCase()}
            </span>
          </div>
          <div className="hidden h-4 w-px bg-line sm:block" />
          <span className="sys-label">SESSION_{recording.id.slice(0, 4).toUpperCase()}</span>
        </div>
      </header>

      {/* ── Main ── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Article body */}
        <section className="flex flex-1 flex-col items-center overflow-y-auto px-6 py-12 lg:px-12 lg:py-20">
          <div className="w-full max-w-[800px]">
            {/* Back link */}
            <Link
              href="/history"
              className="mb-8 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-text-sub transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <ArrowLeft className="size-3" />
              Back to History
            </Link>

            <p className="sys-label mb-4">RECORDING / {recording.wordCount} WORDS</p>
            <h1 className="mb-12 text-3xl font-light leading-tight text-white lg:text-4xl">
              {recording.title}
            </h1>

            {doc ? (
              <>
                {/* Executive Summary */}
                <h2 className="mb-5 mt-12 flex items-center gap-4 text-2xl font-normal tracking-tight text-white">
                  <span className="font-mono text-[0.65rem] text-primary">01</span>
                  Executive Summary
                </h2>
                <div className="mb-6 space-y-4">
                  {doc.summary.split("\n").filter(Boolean).map((bullet, k) => {
                    const text = bullet.replace(/^[•\-\*]\s*/, "");
                    if (!text) return null;
                    return (
                      <div key={k} className="relative pl-6 text-white/80">
                        <span className="absolute left-0 font-mono text-primary">→</span>
                        {text}
                      </div>
                    );
                  })}
                </div>

                {/* LinkedIn Post */}
                <h2 className="mb-5 mt-12 flex items-center gap-4 text-2xl font-normal tracking-tight text-white">
                  <span className="font-mono text-[0.65rem] text-primary">02</span>
                  LinkedIn Post
                </h2>
                {doc.linkedin.split("\n\n").map((p, j) => (
                  <p key={j} className="mb-6 text-lg leading-relaxed text-white/60">
                    {p}
                  </p>
                ))}

                {/* Twitter Thread */}
                <h2 className="mb-5 mt-12 flex items-center gap-4 text-2xl font-normal tracking-tight text-white">
                  <span className="font-mono text-[0.65rem] text-primary">03</span>
                  Twitter Thread
                </h2>
                <div className="space-y-6 border-l border-dashed border-line pl-6">
                  {doc.twitter.split("\n\n").map((tweet, j) => (
                    <div key={j} className="text-white/80 text-lg leading-relaxed">
                      {tweet}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center text-white/50">
                Document is still processing or formats are unavailable.
              </div>
            )}

            {/* Source footer */}
            <div className="mt-20 flex justify-between border-t border-dashed border-line pt-8">
              <span className="font-mono text-[0.65rem] text-text-sub">
                SOURCE_DATA: RAW_TRANSCRIPT
              </span>
              <span className="font-mono text-[0.65rem] text-text-sub">
                COMPLETED: {new Intl.DateTimeFormat("en-US", { timeStyle: "medium" }).format(recording.createdAt)}
              </span>
            </div>
            
            {/* Raw Transcript (Appended to source footer) */}
            <div className="mt-8 rounded-md bg-white/[0.02] p-6 font-mono text-xs leading-relaxed text-white/40">
              <p className="mb-4 text-white/20">--- RAW CAPTURE DATA ---</p>
              {recording.transcript}
            </div>

            {/* Mobile sidebar content (hidden on desktop where aside is visible) */}
            <div className="mt-12 space-y-8 lg:hidden">
              <div className="flex flex-col gap-3">
                <p className="sys-label">OUTPUT_FORMAT</p>
                <WorkspaceFormatDropdown />
              </div>

              <div className="flex flex-col gap-4">
                <p className="sys-label">METRICS</p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-end justify-between">
                    <span className="font-mono text-[0.65rem] text-text-sub">CHARACTERS</span>
                    <span className="font-mono text-[0.65rem] text-white">{recording.charCount}</span>
                  </div>
                  <div className="mt-2 h-[2px] w-full bg-line">
                    <div className="h-full bg-primary" style={{ width: "100%" }} />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="font-mono text-[0.65rem] text-text-sub">TONE CALIBRATION</span>
                    <span className="font-mono text-[0.65rem] text-white uppercase">{doc?.tone || "DEFAULT"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <WorkspaceRegenerateButton />
                <WorkspaceExportButton content={`Title: ${recording.title}\n\nSummary:\n${doc?.summary}\n\nLinkedIn:\n${doc?.linkedin}\n\nTwitter:\n${doc?.twitter}`} />
              </div>
            </div>
          </div>
        </section>

        {/* Right sidebar */}
        <aside className="relative z-20 hidden w-80 flex-col gap-8 border-l border-line bg-panel/50 p-6 backdrop-blur-sm lg:flex">
          {/* Output format */}
          <div className="flex flex-col gap-3">
            <p className="sys-label">OUTPUT_FORMAT</p>
            <WorkspaceFormatDropdown />
          </div>

          {/* Quality metrics */}
          <div className="flex flex-col gap-4">
            <p className="sys-label">METRICS</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <span className="font-mono text-[0.65rem] text-text-sub">CHARACTERS</span>
                <span className="font-mono text-[0.65rem] text-white">{recording.charCount}</span>
              </div>
              <div className="mt-2 h-[2px] w-full bg-line">
                <div className="h-full bg-primary" style={{ width: "100%" }} />
              </div>
              <div className="flex items-end justify-between">
                <span className="font-mono text-[0.65rem] text-text-sub">TONE CALIBRATION</span>
                <span className="font-mono text-[0.65rem] text-white uppercase">{doc?.tone || "DEFAULT"}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-3">
            <WorkspaceRegenerateButton />
            <WorkspaceExportButton content={`Title: ${recording.title}\n\nSummary:\n${doc?.summary}\n\nLinkedIn:\n${doc?.linkedin}\n\nTwitter:\n${doc?.twitter}`} />
          </div>
        </aside>
      </div>

      {/* ── Footer (workspace-raw.html DNA) ── */}
      <footer className="relative z-10 flex h-10 shrink-0 items-center justify-between border-t border-line bg-background px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-[0.55rem] text-text-sub">
            <span className="inline-block size-1.5 bg-[#4ade80]" />
            SYSTEM_STABLE
          </div>
          <span className="hidden font-mono text-[0.55rem] text-text-sub sm:inline">
            SYNC_OFFLINE: NO
          </span>
        </div>
        <span className="font-mono text-[0.55rem] text-text-sub">
          TALKFLOW_OS // WORKSPACE_RENDER_INIT
        </span>
      </footer>
    </div>
  );
}
