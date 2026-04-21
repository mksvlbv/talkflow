"use client";

import { useState, useEffect } from "react";

import { UserProfile, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { toast } from "sonner";

import { CornerMarkers } from "@/components/landing/corner-markers";

type NavItem = "input" | "tone" | "output" | "privacy" | "api";

export default function SettingsPage() {
  const { isSignedIn } = useAuth();
  const [activeNav, setActiveNav] = useState<NavItem>("tone");
  const [persona, setPersona] = useState(0);
  const [sliders, setSliders] = useState([84, 62, 45, 71]);
  const [toggles, setToggles] = useState({ semantic: true, empathy: false, cognitive: true });
  const [privacyToggles, setPrivacyToggles] = useState({ autoDelete: false, anonymize: false, localOnly: false });
  const [templates, setTemplates] = useState<string[]>(["twitter", "linkedin", "summary"]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("talkflow_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.persona !== undefined) setPersona(parsed.persona);
        if (parsed.sliders) setSliders(parsed.sliders);
        if (parsed.toggles) setToggles(parsed.toggles);
        if (parsed.privacyToggles) setPrivacyToggles(parsed.privacyToggles);
        if (parsed.templates) setTemplates(parsed.templates);
      }
    } catch (e) {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("talkflow_settings", JSON.stringify({
      persona, sliders, toggles, privacyToggles, templates
    }));
  }, [persona, sliders, toggles, privacyToggles, templates]);

  const navItems: { key: NavItem; num: string; label: string }[] = [
    { key: "input", num: "01", label: "Input & Recognition" },
    { key: "tone", num: "02", label: "Tone Calibration" },
    { key: "output", num: "03", label: "Output Templates" },
    { key: "privacy", num: "04", label: "Privacy" },
    { key: "api", num: "05", label: "API Integration" },
  ];

  const personas = ["Technical Lead", "Product Strategist", "Content Writer", "Executive", "Researcher"];

  const sliderConfig = [
    { label: "ANALYTICAL RIGOR", idx: 0 },
    { label: "CREATIVE DENSITY", idx: 1 },
    { label: "VOCABULARY COMPLEXITY", idx: 2 },
    { label: "SENTIMENT BIAS", idx: 3 },
  ];

  const toggleConfig: { label: string; desc: string; key: keyof typeof toggles }[] = [
    { label: "Semantic Normalization", desc: "Normalize semantic structures across output formats for consistency", key: "semantic" },
    { label: "Empathy Filtering", desc: "Apply empathy-aware language adjustments to generated content", key: "empathy" },
    { label: "Cognitive Load Balancing", desc: "Optimize content density to reduce reader cognitive load", key: "cognitive" },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Ambient effects (DNA) */}
      <div className="grid-bg fixed inset-0 z-0" />

      {/* ── Header bar (variant DNA) ── */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-line bg-background px-8">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <span className="sys-label">Control Center</span>
            <span className="font-mono text-[8px] text-white/15">DEMO_INTERFACE</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-mono text-[10px] text-white/30">MODULE</span>
            <span className="font-mono text-[11px] text-white">SETTINGS_V2.4.1</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => toast("System logs opened in new session")} className="border border-line px-4 py-1.5 font-mono text-[10px] text-text-sub transition-all hover:border-line-active hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
            VIEW LOGS
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!isSignedIn) {
                toast("Sign in to manage billing");
                return;
              }
              try {
                const res = await fetch("/api/stripe/portal", { method: "POST" });
                const data = await res.json();
                if (data.url) {
                  window.location.href = data.url;
                } else {
                  toast(data.message || "No active subscription found");
                }
              } catch {
                toast("Unable to open billing portal");
              }
            }}
            className="border border-primary bg-primary px-4 py-1.5 font-mono text-[10px] font-bold text-black transition-all hover:bg-transparent hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            MANAGE BILLING
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* ── Left nav sidebar (variant DNA) ── */}
        <nav className="flex shrink-0 flex-row gap-0 overflow-x-auto border-b border-line bg-[#080808] lg:w-72 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveNav(item.key)}
              className={`relative flex items-center gap-4 whitespace-nowrap px-6 py-5 text-left transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                activeNav === item.key
                  ? "bg-[rgba(255,255,255,0.02)] text-white"
                  : "text-white/40 hover:bg-[rgba(255,255,255,0.01)] hover:text-white/60"
              }`}
            >
              {activeNav === item.key && (
                <span className="absolute bottom-0 left-0 top-0 w-0.5 bg-primary" />
              )}
              <span className={`font-mono text-[10px] ${activeNav === item.key ? "text-primary" : "text-white/20"}`}>
                {item.num}
              </span>
              <span className="text-xs font-medium tracking-widest uppercase">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* ── Main content area ── */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="mx-auto max-w-4xl space-y-16">
            {activeNav === "input" && (
              <div className="relative border border-line bg-panel">
                <CornerMarkers size={8} />
                <div className="border-b border-dashed border-line px-6 py-4">
                  <p className="sys-label">Profile & Account</p>
                </div>
                <div className="p-6">
                  {isSignedIn ? (
                    <UserProfile
                      appearance={{
                        baseTheme: dark,
                        elements: {
                          rootBox: "w-full",
                          cardBox: "shadow-none border-none bg-transparent w-full",
                          navbar: "hidden",
                          pageScrollBox: "p-0",
                        },
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <p className="text-sm text-text-sub">Sign up to manage your profile and account settings.</p>
                      <Link
                        href="/sign-up"
                        className="mt-4 inline-flex items-center gap-2 border border-primary bg-primary px-6 py-2 font-mono text-[11px] font-bold tracking-widest text-black transition-all hover:bg-transparent hover:text-primary"
                      >
                        CREATE ACCOUNT
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeNav === "tone" && (
              <>
                {/* System Persona Selection */}
                <div>
                  <span className="sys-label mb-6 block">System Persona Selection</span>
                  <div className="flex flex-wrap gap-2">
                    {personas.map((p, i) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPersona(i)}
                        className={`px-5 py-3 font-mono text-[11px] uppercase tracking-wider transition-all ${
                          persona === i
                            ? "bg-white text-[#060606]"
                            : "border border-line text-white/40 hover:border-line-active hover:text-white/70"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone Calibration Sliders */}
                <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:grid-cols-2">
                  {sliderConfig.map((s) => (
                    <div key={s.label} className="space-y-4">
                      <div className="flex items-end justify-between">
                        <span className="font-mono text-[10px] tracking-widest text-white/60">
                          {s.label}
                        </span>
                        <span className="font-mono text-[10px] text-primary">
                          {sliders[s.idx]}%
                        </span>
                      </div>
                      <div className="group relative">
                        <div className="relative h-[2px] bg-line">
                          <div
                            className="absolute h-full bg-primary transition-all"
                            style={{ width: `${sliders[s.idx]}%` }}
                          />
                          <div
                            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-white shadow-[0_0_10px_rgba(240,85,30,0.3)] transition-shadow group-hover:shadow-[0_0_15px_rgba(240,85,30,0.5)]"
                            style={{ left: `${sliders[s.idx]}%` }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliders[s.idx]}
                          onChange={(e) => {
                            const next = [...sliders];
                            next[s.idx] = Number(e.target.value);
                            setSliders(next);
                          }}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Toggle Switches */}
                <div className="space-y-0 divide-y divide-line border border-line">
                  {toggleConfig.map((t) => (
                    <div key={t.key} className="flex items-center justify-between px-8 py-6">
                      <div>
                        <p className="text-sm font-medium">{t.label}</p>
                        <p className="mt-1 max-w-md text-xs text-white/30">{t.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setToggles({ ...toggles, [t.key]: !toggles[t.key] })}
                        className={`relative h-5 w-10 shrink-0 transition-all ${
                          toggles[t.key]
                            ? "bg-[rgba(240,85,30,0.2)] border border-primary"
                            : "bg-line border border-line-active"
                        }`}
                      >
                        <span
                          className={`absolute top-[4px] h-2.5 w-2.5 transition-all ${
                            toggles[t.key] ? "left-[22px] bg-primary" : "left-[4px] bg-text-sub"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeNav === "output" && (
              <div className="relative border border-line bg-panel">
                <CornerMarkers size={8} />
                <div className="border-b border-dashed border-line px-6 py-4">
                  <p className="sys-label">Output Templates</p>
                </div>
                <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3">
                  {[
                    { key: "twitter", label: "Twitter Thread", isPro: false },
                    { key: "linkedin", label: "LinkedIn Post", isPro: false },
                    { key: "summary", label: "Summary / Notes", isPro: false },
                    { key: "blog", label: "Blog Outline", isPro: true },
                    { key: "newsletter", label: "Newsletter", isPro: true },
                    { key: "actionItems", label: "Action Items", isPro: true },
                  ].map((fmt) => {
                    const isActive = templates.includes(fmt.key);
                    return (
                      <button
                        key={fmt.key}
                        type="button"
                        onClick={() => {
                          if (fmt.isPro) {
                            toast("This template requires a PRO subscription.");
                            return;
                          }
                          setTemplates((prev) =>
                            prev.includes(fmt.key)
                              ? prev.filter((k) => k !== fmt.key)
                              : [...prev, fmt.key]
                          );
                        }}
                        className={`flex items-center justify-between border p-4 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                          isActive
                            ? "border-primary bg-[rgba(240,85,30,0.05)]"
                            : "border-line hover:border-line-active hover:bg-[rgba(255,255,255,0.02)]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[11px] ${isActive ? "text-white" : "text-[#d0d0d0]"}`}>
                            {fmt.label}
                          </span>
                          {fmt.isPro && (
                            <span className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[8px] uppercase text-white/30">
                              PRO
                            </span>
                          )}
                        </div>
                        <span
                          className={`size-1.5 rounded-full ${
                            isActive ? "bg-primary shadow-[0_0_6px_rgba(240,85,30,0.6)]" : "bg-white/20"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeNav === "privacy" && (
              <div className="relative border border-line bg-panel">
                <CornerMarkers size={8} />
                <div className="border-b border-dashed border-line px-6 py-4">
                  <p className="sys-label">Privacy & Data</p>
                </div>
                <div className="space-y-0 divide-y divide-line">
                  {([
                    { label: "Auto-delete recordings after processing", desc: "Audio files removed after transcription completes", key: "autoDelete" as const },
                    { label: "Anonymize output metadata", desc: "Strip personal identifiers from exported content", key: "anonymize" as const },
                    { label: "Local-only processing", desc: "Disable cloud API calls for sensitive content", key: "localOnly" as const },
                  ]).map((item) => (
                    <div key={item.label} className="flex items-center justify-between px-6 py-5">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="mt-0.5 font-mono text-[10px] text-white/30">{item.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPrivacyToggles({ ...privacyToggles, [item.key]: !privacyToggles[item.key] });
                          toast(!privacyToggles[item.key] ? "Enabled" : "Disabled");
                        }}
                        className={`relative h-5 w-10 shrink-0 transition-all ${
                          privacyToggles[item.key]
                            ? "bg-[rgba(240,85,30,0.2)] border border-primary"
                            : "bg-line border border-line-active"
                        }`}
                      >
                        <span
                          className={`absolute top-[4px] h-2.5 w-2.5 transition-all ${
                            privacyToggles[item.key] ? "left-[22px] bg-primary" : "left-[4px] bg-text-sub"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeNav === "api" && (
              <div className="space-y-6">
                <div className="relative border border-line bg-panel">
                  <CornerMarkers size={8} />
                  <div className="border-b border-dashed border-line px-6 py-4">
                    <p className="sys-label">Billing & Usage</p>
                  </div>
                  <div className="space-y-6 p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-line p-4">
                        <span className="font-mono text-[10px] text-white/30">PLAN</span>
                        <p className="mt-1 font-mono text-sm">FREE</p>
                      </div>
                      <div className="border border-line p-4">
                        <span className="font-mono text-[10px] text-white/30">USAGE</span>
                        <p className="mt-1 font-mono text-sm">0 / 30 min</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex justify-between font-mono text-[10px] text-white/30">
                        <span>USAGE</span><span>0%</span>
                      </div>
                      <div className="h-1 w-full bg-line">
                        <div className="h-1 w-0 bg-primary transition-all" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Billing portal requires an active subscription")}
                      className="flex h-11 w-full items-center justify-center border border-line-active font-mono text-[11px] uppercase tracking-wider text-text-sub transition-colors hover:border-primary hover:text-primary"
                    >
                      Manage Subscription
                    </button>
                  </div>
                </div>

                <div className="relative border border-line bg-panel">
                  <CornerMarkers size={8} />
                  <div className="border-b border-dashed border-line px-6 py-4">
                    <p className="sys-label">API Key</p>
                  </div>
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3 font-mono text-sm text-white/60">
                      <span className="rounded bg-white/5 px-3 py-2 text-xs">tlk_••••••••••••••••</span>
                    </div>
                    <button type="button" onClick={() => toast("New API key generated")} className="border border-line px-4 py-2 font-mono text-[10px] text-text-sub transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
                      REGENERATE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
