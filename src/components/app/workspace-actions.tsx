"use client";

import { ChevronDown, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function WorkspaceFormatDropdown() {
  return (
    <button
      type="button"
      onClick={() => toast("Format selector — Technical Article selected")}
      className="flex w-full items-center justify-between border border-line bg-panel px-4 py-2.5 font-mono text-[0.7rem] uppercase text-white transition-all hover:border-primary hover:bg-[rgba(240,85,30,0.05)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      <span>Technical Article</span>
      <ChevronDown className="size-3 text-text-sub" />
    </button>
  );
}

export function WorkspaceRegenerateButton() {
  return (
    <button
      type="button"
      onClick={() => toast("Section regenerated with updated parameters")}
      className="flex w-full items-center justify-between border border-line bg-panel px-4 py-2.5 font-mono text-[0.7rem] uppercase text-white transition-all hover:border-primary hover:bg-[rgba(240,85,30,0.05)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      <span>Regenerate Section</span>
      <RefreshCw className="size-3" />
    </button>
  );
}

export function WorkspaceExportButton() {
  return (
    <button
      type="button"
      onClick={() => toast("Document exported to clipboard")}
      className="flex w-full items-center justify-center border border-primary bg-primary px-4 py-2.5 font-mono text-[0.7rem] font-bold uppercase text-black transition-all hover:bg-transparent hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      EXPORT_DOCUMENT
    </button>
  );
}
