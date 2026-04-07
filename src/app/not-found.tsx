import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { CornerMarkers } from "@/components/landing/corner-markers";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="relative w-full max-w-md border border-line bg-panel p-12 text-center">
        <CornerMarkers size={8} />

        <p className="font-mono text-6xl font-light text-primary">404</p>

        <h1 className="mt-4 text-xl font-light tracking-tight">
          Page not found.
        </h1>

        <p className="mt-3 text-sm font-light text-text-sub">
          The route you requested doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center gap-2 border border-line-active px-6 text-sm text-text-sub transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back Home
        </Link>
      </div>
    </main>
  );
}
