import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using TalkFlow ('the Service'), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you may not use the Service. We reserve the right to update these terms at any time, and your continued use of the Service constitutes acceptance of any modifications.",
  },
  {
    title: "Description of Service",
    body: "TalkFlow provides voice-to-content transformation services, including real-time transcription, semantic analysis, and multi-format content generation. The Service processes audio input through our proprietary pipeline to generate structured text outputs including social media posts, professional content, and summarized insights.",
  },
  {
    title: "User Accounts",
    body: "You must create an account to access the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration and keep your account information updated.",
  },
  {
    title: "Acceptable Use",
    body: "You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service. You may not attempt to gain unauthorized access to any part of the Service, or any systems or networks connected to the Service. Content generated through the Service must comply with applicable laws and regulations.",
  },
  {
    title: "Intellectual Property",
    body: "You retain ownership of all content you input into the Service. Generated outputs are owned by you, subject to these Terms. The Service itself, including its algorithms, interface design, and underlying technology, remains the exclusive property of TalkFlow. You may not reverse-engineer, decompile, or attempt to extract the source code of the Service.",
  },
  {
    title: "Subscription & Billing",
    body: "Paid features are available through subscription plans billed monthly. All fees are non-refundable except as required by law. You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. We reserve the right to modify pricing with 30 days advance notice.",
  },
  {
    title: "Limitation of Liability",
    body: "The Service is provided 'as is' without warranties of any kind. TalkFlow shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid for the Service in the twelve months preceding the claim.",
  },
  {
    title: "Termination",
    body: "We may suspend or terminate your access to the Service at any time for violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use the Service ceases immediately. Provisions that by their nature should survive termination shall remain in effect.",
  },
];

export default function TermsPage() {
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

        <p className="sys-label mb-4">Legal / Terms</p>
        <h1 className="mb-2 text-3xl font-light tracking-tight lg:text-4xl">
          Terms of Service
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
            TALKFLOW_OS // LEGAL_MODULE_RENDER
          </p>
        </div>
      </div>
    </main>
  );
}
