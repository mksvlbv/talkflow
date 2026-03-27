import Link from "next/link";

import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

import { PortalButton } from "@/components/portal-button";
import { TranscribeWorkspace } from "@/components/transcribe-workspace";
import { Badge } from "@/components/ui/badge";
import { upsertAppUser } from "@/lib/app-user";
import { getDisplayName, getPrimaryEmailAddress } from "@/lib/clerk-user";
import { prisma } from "@/lib/prisma";
import { hasActiveSubscription } from "@/lib/subscription";

export default async function StudioPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/studio");
  }

  const clerkProfile = await currentUser();
  const appUser = await upsertAppUser({
    clerkUserId: userId,
    email: getPrimaryEmailAddress(clerkProfile),
    name: getDisplayName(clerkProfile),
    imageUrl: clerkProfile?.imageUrl ?? null,
  });

  if (!hasActiveSubscription(appUser.subscription)) {
    redirect("/pricing");
  }

  const recordings = await prisma.recording.findMany({
    where: {
      userId: appUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge variant="secondary">Private studio</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Paid transcript workspace
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              This is the post-payment platform from the brief: record in the center,
              view saved transcripts in a sidebar, and manage billing separately.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-white/85 px-5 text-sm font-medium"
            >
              Marketing page
            </Link>
            <PortalButton />
            <UserButton />
          </div>
        </header>

        <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4" />
          Active subscription confirmed. New recordings are stored automatically.
        </div>

        <TranscribeWorkspace
          mode="subscriber"
          isSignedIn
          hasSubscription
          initialFreeRecordUsed
          initialRecordings={recordings.map((recording) => ({
            id: recording.id,
            title: recording.title,
            transcript: recording.transcript,
            createdAt: recording.createdAt.toISOString(),
            wordCount: recording.wordCount,
            charCount: recording.charCount,
            audioUrl: recording.audioUrl,
          }))}
        />
      </div>
    </main>
  );
}
