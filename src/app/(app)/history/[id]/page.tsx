import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { WorkspaceExportButton, WorkspaceFormatDropdown, WorkspaceRegenerateButton } from "@/components/app/workspace-actions";

/* ── Mock data (static for MVP) ── */
const MOCK_DOCUMENTS: Record<
  string,
  {
    title: string;
    subtitle: string;
    session: string;
    time: string;
    paragraphs: { heading?: string; body: string[] }[];
    bullets: string[];
    metrics: { label: string; value: number }[];
    versions: { label: string; time: string; current?: boolean }[];
  }
> = {
  "1": {
    title: "The Architecture of Predictability:",
    subtitle: "Reducing Cognitive Load in Interface Design",
    session: "SESSION_482",
    time: "14:22:01",
    paragraphs: [
      {
        body: [
          "Systemic design is not merely a collection of UI patterns; it is a strategic framework built to align with human psychology. By establishing a predictable environment, we allow the user\u2019s cognitive resources to focus on high-value tasks rather than navigating the interface itself.",
        ],
      },
      {
        heading: "Defining Cognitive Friction",
        body: [
          "Friction occurs when a user\u2019s expectations diverge from the actual behavior of the system. In high-performance software, this friction translates directly to lost productivity. Every time a user has to \u201Cre-learn\u201D where an action lives, we introduce a micro-delay in their workflow.",
        ],
      },
      {
        heading: "The Trust Mechanism",
        body: [
          "Predictability builds trust at scale. When an interface behaves consistently across different modules, the user develops a sense of agency. This agency is the foundation of long-term retention.",
          "To build this trust, we must prioritize functional logic over aesthetic novelty. A \u201Cboring\u201D but consistent interaction is often more valuable to a professional user than a \u201Cdelightful\u201D but erratic one.",
        ],
      },
    ],
    bullets: [
      "Visual noise acts as a tax on attention spans.",
      "Predictable patterns enable \u201Cmuscle memory\u201D development in digital spaces.",
    ],
    metrics: [
      { label: "SEMANTIC_COHERENCE", value: 98.4 },
      { label: "TONE_CONSISTENCY", value: 92.1 },
    ],
    versions: [
      { label: "V3 / CORE_LOGIC", time: "14:22:01", current: true },
      { label: "V2 / SYNTH_EXPANSIVE", time: "14:18:45" },
      { label: "V1 / INITIAL_DRAFT", time: "14:15:12" },
    ],
  },
  "2": {
    title: "Building Systems Over Motivation:",
    subtitle: "Why Habits Scale Better Than Willpower",
    session: "SESSION_471",
    time: "11:08:33",
    paragraphs: [
      {
        body: [
          "Motivation is a finite resource that depletes under stress. Systems, by contrast, operate independently of emotional state. The most productive creators aren\u2019t the most motivated\u2014they\u2019re the most systematic.",
        ],
      },
      {
        heading: "The Motivation Trap",
        body: [
          "Relying on motivation creates a boom-bust cycle. High-energy days produce output, low-energy days produce nothing. Over a quarter, the systematic creator outperforms the motivated one by a factor of three.",
        ],
      },
      {
        heading: "Designing for Consistency",
        body: [
          "The key is reducing activation energy. When the system does the heavy lifting\u2014auto-scheduling, default templates, pre-configured environments\u2014the human only needs to show up.",
        ],
      },
    ],
    bullets: [
      "Systems eliminate decision fatigue at the point of creation.",
      "Default behaviors should optimize for the 80% use case.",
    ],
    metrics: [
      { label: "SEMANTIC_COHERENCE", value: 95.2 },
      { label: "TONE_CONSISTENCY", value: 89.7 },
    ],
    versions: [
      { label: "V2 / REFINED", time: "11:08:33", current: true },
      { label: "V1 / RAW_CAPTURE", time: "11:02:17" },
    ],
  },
  "3": {
    title: "Cognitive Load in Interface Design:",
    subtitle: "A Framework for Measurable Simplicity",
    session: "SESSION_459",
    time: "09:45:18",
    paragraphs: [
      {
        body: [
          "Every element on screen competes for the user\u2019s attention. The goal of interface design isn\u2019t minimalism for its own sake\u2014it\u2019s strategic reduction. Remove what doesn\u2019t serve the current task; emphasize what does.",
        ],
      },
      {
        heading: "Measuring Cognitive Load",
        body: [
          "Cognitive load can be approximated by tracking task completion time, error rates, and user-reported confidence. When these metrics improve without adding features, you\u2019ve successfully reduced load.",
        ],
      },
      {
        heading: "The Hierarchy of Attention",
        body: [
          "Primary actions should be immediately visible. Secondary actions should be discoverable. Tertiary actions should be accessible but never intrusive. This three-tier model prevents the interface from overwhelming the user.",
        ],
      },
    ],
    bullets: [
      "Simplicity is not the absence of complexity\u2014it\u2019s the management of it.",
      "Every added element should justify its cognitive cost.",
    ],
    metrics: [
      { label: "SEMANTIC_COHERENCE", value: 97.1 },
      { label: "TONE_CONSISTENCY", value: 94.3 },
    ],
    versions: [
      { label: "V3 / POLISHED", time: "09:45:18", current: true },
      { label: "V2 / STRUCTURED", time: "09:40:02" },
      { label: "V1 / INITIAL_DRAFT", time: "09:35:44" },
    ],
  },
};

type WorkspacePageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { id } = await params;
  const doc = MOCK_DOCUMENTS[id];
  if (!doc) notFound();
  let sectionCounter = 0;

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
              WORKSPACE_ID: DOCUMENT_VIEW_A
            </span>
          </div>
          <div className="hidden h-4 w-px bg-line sm:block" />
          <span className="sys-label">{doc.session}</span>
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

            <p className="sys-label mb-4">DOCUMENT / ARTICLE GENERATION</p>
            <h1 className="mb-12 text-3xl font-light leading-tight text-white lg:text-4xl">
              {doc.title}
              <br />
              {doc.subtitle}
            </h1>

            {doc.paragraphs.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="mb-5 mt-12 flex items-center gap-4 text-2xl font-normal tracking-tight text-white">
                    <span className="font-mono text-[0.65rem] text-primary">
                      {`0${++sectionCounter}`}
                    </span>
                    {section.heading}
                  </h2>
                )}
                {section.body.map((p, j) => (
                  <p
                    key={j}
                    className="mb-6 text-lg leading-relaxed text-white/60"
                  >
                    {p}
                  </p>
                ))}
                {/* Insert bullets after first heading section */}
                {i === 1 && doc.bullets.length > 0 && (
                  <div className="mb-6 space-y-4">
                    {doc.bullets.map((bullet, k) => (
                      <div
                        key={k}
                        className="relative pl-6 text-white/80"
                      >
                        <span className="absolute left-0 font-mono text-primary">
                          →
                        </span>
                        {bullet}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Source footer */}
            <div className="mt-20 flex justify-between border-t border-dashed border-line pt-8">
              <span className="font-mono text-[0.65rem] text-text-sub">
                SOURCE_DATA: {doc.session}_AUDIO
              </span>
              <span className="font-mono text-[0.65rem] text-text-sub">
                COMPLETED: {doc.time}
              </span>
            </div>

            {/* Mobile sidebar content (hidden on desktop where aside is visible) */}
            <div className="mt-12 space-y-8 lg:hidden">
              <div className="flex flex-col gap-3">
                <p className="sys-label">OUTPUT_FORMAT</p>
                <WorkspaceFormatDropdown />
              </div>

              <div className="flex flex-col gap-4">
                <p className="sys-label">QUALITY_METRICS</p>
                <div className="flex flex-col gap-4">
                  {doc.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-end justify-between">
                        <span className="font-mono text-[0.65rem] text-text-sub">
                          {metric.label}
                        </span>
                        <span className="font-mono text-[0.65rem] text-white">
                          {metric.value}%
                        </span>
                      </div>
                      <div className="mt-2 h-[2px] w-full bg-line">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="sys-label">ITERATION_HISTORY</p>
                <div className="flex flex-col gap-4">
                  {doc.versions.map((v, vi) => (
                    <div
                      key={vi}
                      className={`relative border-l pl-4 ${
                        v.current
                          ? "border-primary"
                          : "border-line opacity-40"
                      }`}
                    >
                      {v.current && (
                        <span className="absolute -left-[3px] top-0 size-[5px] bg-primary" />
                      )}
                      <p className="font-mono text-[0.65rem] text-white">
                        {v.label}
                      </p>
                      <p className="font-mono text-[0.55rem] text-text-sub">
                        {v.time}
                        {v.current && " — CURRENT"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <WorkspaceRegenerateButton />
                <WorkspaceExportButton />
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
            <p className="sys-label">QUALITY_METRICS</p>
            <div className="flex flex-col gap-4">
              {doc.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-end justify-between">
                    <span className="font-mono text-[0.65rem] text-text-sub">
                      {metric.label}
                    </span>
                    <span className="font-mono text-[0.65rem] text-white">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="mt-2 h-[2px] w-full bg-line">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Iteration history */}
          <div className="flex flex-col gap-4">
            <p className="sys-label">ITERATION_HISTORY</p>
            <div className="flex flex-col gap-4">
              {doc.versions.map((v, i) => (
                <div
                  key={i}
                  className={`relative border-l pl-4 ${
                    v.current
                      ? "border-primary"
                      : "border-line opacity-40 transition-opacity hover:opacity-100"
                  }`}
                >
                  {v.current && (
                    <span className="absolute -left-[3px] top-0 size-[5px] bg-primary" />
                  )}
                  <p className="font-mono text-[0.65rem] text-white">
                    {v.label}
                  </p>
                  <p className="font-mono text-[0.55rem] text-text-sub">
                    {v.time}
                    {v.current && " — CURRENT"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-3">
            <WorkspaceRegenerateButton />
            <WorkspaceExportButton />
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
