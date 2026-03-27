"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import {
  CreditCard,
  Database,
  LoaderCircle,
  Lock,
  Mic,
  ShieldCheck,
  Sparkles,
  Square,
  Waves,
} from "lucide-react";
import { toast } from "sonner";

import { UpgradeDialog } from "@/components/upgrade-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type WorkspaceRecording = {
  id: string;
  title: string;
  transcript: string;
  createdAt: string;
  wordCount: number;
  charCount: number;
  audioUrl?: string | null;
};

type TranscribeWorkspaceProps = {
  mode: "public" | "subscriber";
  isSignedIn: boolean;
  hasSubscription: boolean;
  initialFreeRecordUsed: boolean;
  initialRecordings?: WorkspaceRecording[];
};

type GateReason = "AUTH_REQUIRED" | "SUBSCRIPTION_REQUIRED" | null;

function formatRecordDate(value: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function countWordsLocally(text: string) {
  const normalized = text.trim();

  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).length;
}

function buildAssistantCopy(
  recording: WorkspaceRecording,
  hasSubscription: boolean,
) {
  if (hasSubscription) {
    return `Transcript saved to Prisma/Supabase with ${recording.wordCount} words and ${recording.charCount} characters.`;
  }

  return "Free sample ready. The next recording will ask for Clerk sign-in and then the Stripe sandbox subscription.";
}

export function TranscribeWorkspace({
  mode,
  isSignedIn,
  hasSubscription,
  initialFreeRecordUsed,
  initialRecordings = [],
}: TranscribeWorkspaceProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialRecordings);
  const [selectedId, setSelectedId] = useState(initialRecordings[0]?.id ?? null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [freeRecordUsed, setFreeRecordUsed] = useState(initialFreeRecordUsed);
  const [gateReason, setGateReason] = useState<GateReason>(null);
  const [isPending, startTransition] = useTransition();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const selectedItem = useMemo(() => {
    return items.find((item) => item.id === selectedId) ?? items[0] ?? null;
  }, [items, selectedId]);

  function stopMediaStream() {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  }

  function resetTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setElapsedSeconds(0);
  }

  useEffect(() => {
    return () => {
      const activeRecorder = mediaRecorderRef.current;

      if (activeRecorder && activeRecorder.state !== "inactive") {
        activeRecorder.stop();
      }

      resetTimer();
      stopMediaStream();
    };
  }, []);

  async function submitRecording(blob: Blob, mimeType: string) {
    setIsSubmitting(true);

    try {
      const fileName = `recording-${Date.now()}.webm`;
      const formData = new FormData();
      formData.append(
        "audio",
        new File([blob], fileName, {
          type: mimeType || "audio/webm",
        }),
      );

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as {
        code?: GateReason | "TRANSCRIPTION_FAILED";
        message?: string;
        mode?: "free" | "subscriber";
        title?: string;
        transcript?: string;
        recording?: WorkspaceRecording;
      };

      if (!response.ok) {
        if (
          payload.code === "AUTH_REQUIRED" ||
          payload.code === "SUBSCRIPTION_REQUIRED"
        ) {
          setGateReason(payload.code);
          return;
        }

        throw new Error(payload.message ?? "Unable to transcribe audio.");
      }

      const incomingItem: WorkspaceRecording = payload.recording ?? {
        id: `local-${Date.now()}`,
        title: payload.title ?? "New transcript",
        transcript: payload.transcript ?? "",
        createdAt: new Date().toISOString(),
        wordCount: countWordsLocally(payload.transcript ?? ""),
        charCount: payload.transcript?.length ?? 0,
        audioUrl: null,
      };

      startTransition(() => {
        setItems((current) => [
          incomingItem,
          ...current.filter((item) => item.id !== incomingItem.id),
        ]);
        setSelectedId(incomingItem.id);
      });

      if (payload.mode === "free") {
        setFreeRecordUsed(true);
        toast.success("Free transcript ready.");
      } else {
        toast.success("Transcript saved to your workspace.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to transcribe audio.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("This browser does not support microphone recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferredMimeType = MediaRecorder.isTypeSupported(
        "audio/webm;codecs=opus",
      )
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      const recorder = new MediaRecorder(stream, {
        mimeType: preferredMimeType,
      });

      chunksRef.current = [];
      mediaRecorderRef.current = recorder;
      mediaStreamRef.current = stream;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const recordedMimeType =
          recorder.mimeType || preferredMimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, {
          type: recordedMimeType,
        });

        chunksRef.current = [];
        stopMediaStream();
        resetTimer();

        await submitRecording(blob, recordedMimeType);
      };

      recorder.start();
      setIsRecording(true);
      setElapsedSeconds(0);
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((current) => current + 1);
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Microphone permission was denied.");
      stopMediaStream();
    }
  }

  function stopRecording() {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") {
      return;
    }

    setIsRecording(false);
    mediaRecorderRef.current.stop();
  }

  const handleRecorderClick = () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    void startRecording();
  };

  const shouldShowPaywallHint = freeRecordUsed && !hasSubscription;
  const isBusy = isSubmitting || isPending;

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card className="border-white/60 bg-white/75 backdrop-blur">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                {hasSubscription ? "Paid workspace" : "Micro MVP flow"}
              </Badge>
              <CardTitle>
                {hasSubscription
                  ? "Latest saved recordings"
                  : "One free record, then auth + billing"}
              </CardTitle>
              <CardDescription>
                {hasSubscription
                  ? "Each paid recording is saved in Prisma and can optionally upload raw audio into Supabase Storage."
                  : "This screen demonstrates the exact gate requested in the brief."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mode === "subscriber" ? (
                <ScrollArea className="h-[310px] rounded-2xl border border-border/70 bg-background/70">
                  <div className="space-y-2 p-3">
                    {items.length ? (
                      items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedId(item.id)}
                          className={cn(
                            "w-full rounded-2xl border px-3 py-3 text-left transition-colors",
                            selectedId === item.id
                              ? "border-primary bg-primary/8"
                              : "border-border/70 bg-white/80 hover:bg-muted/70",
                          )}
                        >
                          <p className="line-clamp-1 text-sm font-medium">{item.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatRecordDate(item.createdAt)}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-border/80 p-4 text-sm text-muted-foreground">
                        Your paid recordings will appear here after the first successful transcription.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <Mic className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">1. Record for free</p>
                        <p className="text-xs text-muted-foreground">
                          The very first voice note is processed without auth.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <Lock className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">2. Clerk sign-in</p>
                        <p className="text-xs text-muted-foreground">
                          The next recording opens a modal and pushes into auth.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <CreditCard className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">3. Stripe + studio access</p>
                        <p className="text-xs text-muted-foreground">
                          After sandbox subscription, transcripts persist in the platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {shouldShowPaywallHint ? (
            <Card className="border-primary/20 bg-primary/7">
              <CardHeader>
                <Badge className="w-fit">Free pass used</Badge>
                <CardTitle>Ready for the paid platform</CardTitle>
                <CardDescription>
                  The next step is exactly what the task asks for: Clerk auth, Stripe sandbox subscription, then the `/studio` workspace.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between gap-3">
                <Button
                  onClick={() =>
                    router.push(
                      isSignedIn
                        ? "/pricing"
                        : "/sign-in?redirect_url=/pricing",
                    )
                  }
                  className="rounded-full"
                >
                  Unlock next record
                </Button>
                <Link
                  href="/pricing"
                  className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
                >
                  View billing details
                </Link>
              </CardFooter>
            </Card>
          ) : null}
        </div>

        <Card className="min-h-[640px] border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,250,243,0.82))] shadow-[0_30px_80px_-35px_rgba(38,25,18,0.45)] backdrop-blur">
          <CardHeader className="gap-4 border-b border-border/70">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-white/80">
                <Waves className="size-3.5" />
                Voice to text
              </Badge>
              <Badge variant="outline" className="bg-white/80">
                <Database className="size-3.5" />
                Prisma + Supabase
              </Badge>
              <Badge variant="outline" className="bg-white/80">
                <ShieldCheck className="size-3.5" />
                Clerk + Stripe
              </Badge>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {hasSubscription ? "Paid studio transcript view" : "ChatGPT-style transcript canvas"}
                </CardTitle>
                <CardDescription>
                  Press record, speak naturally, and the transcript lands here as a conversation thread.
                </CardDescription>
              </div>
              <div className="text-sm text-muted-foreground">
                {isRecording ? `Recording... ${elapsedSeconds}s` : "Recorder idle"}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex min-h-[420px] flex-1 flex-col px-0">
            <ScrollArea className="h-[420px] px-4">
              {selectedItem ? (
                <div className="space-y-6 py-5">
                  <div className="flex justify-end">
                    <div className="max-w-3xl rounded-[28px] bg-[linear-gradient(135deg,rgba(186,94,53,0.96),rgba(150,72,38,0.96))] px-5 py-4 text-sm text-white shadow-lg">
                      <div className="mb-2 flex items-center justify-between gap-3 text-xs text-white/70">
                        <span>You</span>
                        <span>{formatRecordDate(selectedItem.createdAt)}</span>
                      </div>
                      <p className="whitespace-pre-wrap leading-7">
                        {selectedItem.transcript}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-2xl rounded-[28px] border border-border/70 bg-white/95 px-5 py-4 text-sm shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        <Sparkles className="size-3.5" />
                        Assistant view
                      </div>
                      <p className="leading-7 text-foreground">
                        {buildAssistantCopy(selectedItem, hasSubscription)}
                      </p>
                      <Separator className="my-4" />
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{selectedItem.wordCount} words</span>
                        <span>{selectedItem.charCount} chars</span>
                        {selectedItem.audioUrl ? (
                          <Link
                            href={selectedItem.audioUrl}
                            target="_blank"
                            className="font-medium text-foreground underline-offset-4 hover:underline"
                          >
                            Supabase audio
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center py-12">
                  <div className="max-w-lg rounded-[32px] border border-dashed border-border/80 bg-white/70 p-8 text-center shadow-sm">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Mic className="size-7" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">
                      Record a short message to see the transcript appear here
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Try something simple like numbers or a short product thought. The first take is free; the next one demonstrates the auth and billing gate.
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>

          <CardFooter className="border-t border-border/70 bg-white/65">
            <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {isRecording
                    ? "Tap again to stop and send the audio."
                    : isBusy
                      ? "Processing the audio with OpenAI..."
                      : "Ready to capture your next sample."}
                </p>
                <p className="text-xs text-muted-foreground">
                  {hasSubscription
                    ? "Paid recordings are written to the database and visible in the sidebar."
                    : "Free mode does not require auth, but the next recording triggers the gate."}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {!hasSubscription && (
                  <Badge variant="outline" className="bg-white/80">
                    {freeRecordUsed ? "0 free records left" : "1 free record left"}
                  </Badge>
                )}

                <Button
                  onClick={handleRecorderClick}
                  disabled={isBusy}
                  size="icon-lg"
                  className={cn(
                    "size-16 rounded-full shadow-lg shadow-primary/25",
                    isRecording && "bg-destructive text-white hover:bg-destructive/90",
                  )}
                >
                  {isBusy ? (
                    <LoaderCircle className="animate-spin" />
                  ) : isRecording ? (
                    <Square />
                  ) : (
                    <Mic />
                  )}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <UpgradeDialog
        open={gateReason !== null}
        onOpenChange={(open) => {
          if (!open) {
            setGateReason(null);
          }
        }}
        reason={gateReason}
      />
    </>
  );
}
