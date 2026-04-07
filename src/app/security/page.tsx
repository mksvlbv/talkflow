import Link from "next/link";

import { ArrowLeft, Lock, Server, Shield, Zap } from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";

const practices = [
  {
    icon: Lock,
    title: "Encryption",
    items: [
      "TLS 1.3 for all data in transit",
      "AES-256 encryption for data at rest",
      "End-to-end encrypted audio processing pipeline",
      "Unique per-session encryption keys",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure",
    items: [
      "Isolated compute instances per processing session",
      "Zero-persistence audio processing (no raw audio stored)",
      "Geographic redundancy across multiple regions",
      "Automated security patching within 24 hours of CVE disclosure",
    ],
  },
  {
    icon: Shield,
    title: "Compliance",
    items: [
      "SOC 2 Type II certified",
      "GDPR compliant data handling",
      "Regular third-party penetration testing",
      "Annual security audits by independent firms",
    ],
  },
  {
    icon: Zap,
    title: "Access Control",
    items: [
      "Role-based access control (RBAC) for all internal systems",
      "Multi-factor authentication enforced for all team members",
      "API keys with granular permission scoping",
      "Automated anomaly detection on all endpoints",
    ],
  },
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="noise-overlay fixed inset-0 z-[100]" />
      <div className="grid-bg fixed inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-text-sub transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          <ArrowLeft className="size-3" />
          Back to Home
        </Link>

        <p className="sys-label mb-4">Infrastructure / Security</p>
        <h1 className="mb-2 text-3xl font-light tracking-tight lg:text-4xl">
          Security Practices
        </h1>
        <p className="mb-12 font-mono text-[11px] text-text-sub">
          PROTOCOL_VERSION: 2.4.1 // AUDIT_STATUS: PASSED
        </p>

        <div className="mb-12 relative border border-line bg-panel p-6 lg:p-8">
          <CornerMarkers size={6} />
          <p className="text-sm leading-relaxed text-white/60">
            Security is foundational to TalkFlow. Your voice data and generated content are protected by enterprise-grade infrastructure, strict access controls, and continuous monitoring. We operate on a zero-trust architecture where every request is authenticated and authorized.
          </p>
        </div>

        <div className="space-y-8">
          {practices.map((section, i) => (
            <div key={section.title} className="relative border border-line bg-panel p-6 lg:p-8">
              <CornerMarkers size={6} />
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center border border-line bg-white/5">
                  <section.icon className="size-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-base font-medium">{section.title}</h2>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 pl-1">
                    <span className="mt-1.5 inline-block size-1.5 shrink-0 bg-[#4ade80]" />
                    <p className="text-sm text-white/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-dashed border-line pt-8 text-center">
          <p className="font-mono text-[10px] text-text-sub">
            TALKFLOW_OS // SECURITY_MODULE_RENDER
          </p>
        </div>
      </div>
    </main>
  );
}
