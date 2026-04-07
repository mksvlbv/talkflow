import { HeroSection } from "@/components/landing/hero-section";
import { ScrollNavbar } from "@/components/landing/scroll-navbar";
import { ProductDemoSection } from "@/components/landing/product-demo-section";
import { SystemProcessSection } from "@/components/landing/system-process-section";
import { FeatureDepthSection } from "@/components/landing/feature-depth-section";
import { UseCaseSection } from "@/components/landing/use-case-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <>
      <ScrollNavbar />
      <div className="noise-overlay fixed inset-0 z-[100]" />
      <div className="grid-bg fixed inset-0 z-0" />
      <main id="main-content" className="relative">
        {/* ── 1. HERO ── */}
        <HeroSection />

        {/* Gradient transition from hero to dark sections */}
        <div
          className="pointer-events-none relative z-[2] -mt-1"
          style={{
            height: 160,
            background: "linear-gradient(to bottom, #0a0604 0%, #060606 100%)",
          }}
        />

        {/* ── 2. PRODUCT DEMO ── */}
        <ProductDemoSection />

        {/* ── 3. SYSTEM PROCESS ── */}
        <SystemProcessSection />

        {/* ── 4. FEATURE DEPTH ── */}
        <FeatureDepthSection />

        {/* ── 5. USE CASE DEMO ── */}
        <UseCaseSection />

        {/* ── 6. PRICING ── */}
        <PricingSection />

        {/* ── 7. FINAL CTA ── */}
        <CtaSection />

        {/* ── 8. FOOTER ── */}
        <FooterSection />
      </main>
    </>
  );
}
