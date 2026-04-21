"use client";

import { toast } from "sonner";

export function PipelineExportButton() {
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText("TalkFlow Pipeline Schematic v2.4.1\n\n[01] Voice Capture\n[02] Semantic Sync\n[03] Transformation\n[04] Calibration\n[05] Delivery");
        toast("Schematic exported to clipboard");
      }}
      className="border border-line px-6 py-2 font-mono text-[0.7rem] text-text-sub transition-colors hover:border-line-active hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      EXPORT SCHEMATIC
    </button>
  );
}
