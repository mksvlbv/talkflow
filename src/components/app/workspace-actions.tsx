"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export function WorkspaceRegenerateButton({ documentId, transcript }: { documentId?: string, transcript?: string }) {
  const router = useRouter();
  const [isRegenerating, setIsRegenerating] = useState(false);

  return (
    <button
      type="button"
      disabled={isRegenerating}
      onClick={async () => {
        if (!documentId || !transcript) {
          toast("Regeneration failed: Missing data");
          return;
        }
        setIsRegenerating(true);
        toast("Regeneration started...");
        try {
          const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: transcript, recordingId: documentId })
          });
          if (!res.ok) throw new Error();
          toast("Document regenerated successfully");
          router.refresh();
        } catch {
          toast("Regeneration failed");
        } finally {
          setIsRegenerating(false);
        }
      }}
      className="flex w-full items-center justify-between border border-line bg-panel px-4 py-2.5 font-mono text-[0.7rem] uppercase text-white transition-all hover:border-primary hover:bg-[rgba(240,85,30,0.05)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:opacity-50"
    >
      <span>{isRegenerating ? "Regenerating..." : "Regenerate Section"}</span>
      <RefreshCw className={`size-3 ${isRegenerating ? "animate-spin" : ""}`} />
    </button>
  );
}

export function WorkspaceExportButton({ content }: { content?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (content) {
          navigator.clipboard.writeText(content);
          toast("Document exported to clipboard");
        } else {
          toast("No content available to export");
        }
      }}
      className="flex w-full items-center justify-center border border-primary bg-primary px-4 py-2.5 font-mono text-[0.7rem] font-bold uppercase text-black transition-all hover:bg-transparent hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      EXPORT_DOCUMENT
    </button>
  );
}
