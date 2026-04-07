import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly: account credentials (email, name), audio recordings submitted for processing, and generated content outputs. We also collect usage data including session duration, feature usage patterns, and device information to improve the Service.",
  },
  {
    title: "How We Use Your Data",
    body: "Your audio recordings are processed in real-time to generate text content and are not stored after processing completes unless you explicitly enable recording history. Generated outputs are stored in your account for your access. We use aggregated, anonymized usage data to improve our algorithms and service performance.",
  },
  {
    title: "Data Storage & Security",
    body: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Audio processing occurs on isolated compute instances that are terminated after each session. We maintain SOC 2 Type II compliance and conduct regular third-party security audits. Your data is stored in secure cloud infrastructure with geographic redundancy.",
  },
  {
    title: "Third-Party Services",
    body: "We use Clerk for authentication, Stripe for payment processing, and OpenAI for language model inference. Each third-party provider has their own privacy policy governing their use of data. We only share the minimum data necessary for each service to function. We do not sell your personal information to any third party.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or delete your personal data at any time through your account settings. You can export all your data in standard formats. You may request complete account deletion, which will remove all associated data within 30 days. EU users have additional rights under GDPR including data portability and the right to object to processing.",
  },
  {
    title: "Cookies & Tracking",
    body: "We use essential cookies for authentication and session management. We do not use third-party advertising cookies or cross-site tracking. Analytics data is collected using privacy-respecting, first-party tooling only. You can control cookie preferences through your browser settings.",
  },
  {
    title: "Data Retention",
    body: "Account data is retained for the duration of your account. Audio recordings are deleted immediately after processing unless you opt into recording history. Generated content is retained until you delete it or close your account. Billing records are retained for 7 years as required by financial regulations.",
  },
  {
    title: "Contact",
    body: "For privacy-related inquiries, data access requests, or concerns about our practices, contact our Data Protection Officer at privacy@talkflow.app. We respond to all privacy requests within 30 days.",
  },
];

export default function PrivacyPage() {
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

        <p className="sys-label mb-4">Legal / Privacy</p>
        <h1 className="mb-2 text-3xl font-light tracking-tight lg:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-12 font-mono text-[11px] text-text-sub">
          LAST_UPDATED: 2025-06-01 // VERSION: 1.0
        </p>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={s.title} className="relative border border-line bg-panel p-6 lg:p-8">
              <CornerMarkers size={6} />
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[10px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-base font-medium">{s.title}</h2>
              </div>
              <p className="text-sm leading-relaxed text-white/60">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-dashed border-line pt-8 text-center">
          <p className="font-mono text-[10px] text-text-sub">
            TALKFLOW_OS // PRIVACY_MODULE_RENDER
          </p>
        </div>
      </div>
    </main>
  );
}
