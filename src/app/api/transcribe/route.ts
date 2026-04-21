import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getAppUserByClerkId, upsertAppUser } from "@/lib/app-user";
import { getDisplayName, getPrimaryEmailAddress } from "@/lib/clerk-user";
import { getOpenAI } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import {
  countWords,
  createRecordingTitle,
  FREE_RECORD_LIMIT,
  GUEST_FREE_RECORD_COOKIE,
  MAX_AUDIO_SIZE_BYTES,
  readGuestFreeUsage,
} from "@/lib/recordings";
import { hasActiveSubscription } from "@/lib/subscription";
import { uploadAudioToSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

function errorResponse(message: string, code: string, status: number) {
  return NextResponse.json(
    {
      message,
      code,
    },
    { status },
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audio = formData.get("audio");

    if (!(audio instanceof File)) {
      return errorResponse("Audio file is required.", "MISSING_AUDIO", 400);
    }

    if (audio.size > MAX_AUDIO_SIZE_BYTES) {
      return errorResponse(
        "Audio is too large. Please keep the file under 20 MB.",
        "AUDIO_TOO_LARGE",
        400,
      );
    }

    const { userId } = await auth();
    const cookieStore = await cookies();
    const guestUsage = readGuestFreeUsage(
      cookieStore.get(GUEST_FREE_RECORD_COOKIE)?.value,
    );

    let appUser = userId ? await getAppUserByClerkId(userId) : null;

    if (userId) {
      const clerkProfile = await currentUser();

      appUser = await upsertAppUser({
        clerkUserId: userId,
        email: getPrimaryEmailAddress(clerkProfile),
        name: getDisplayName(clerkProfile),
        imageUrl: clerkProfile?.imageUrl ?? null,
      });
    }

    const isSubscriber = hasActiveSubscription(appUser?.subscription);
    const hasFreeRecordLeft = appUser
      ? appUser.freeTranscriptionCount < FREE_RECORD_LIMIT
      : guestUsage < FREE_RECORD_LIMIT;

    if (!isSubscriber && !hasFreeRecordLeft) {
      return errorResponse(
        userId
          ? "Your free recording is already used. Start the subscription to keep transcribing."
          : "The next recording requires sign-in with Clerk.",
        userId ? "SUBSCRIPTION_REQUIRED" : "AUTH_REQUIRED",
        userId ? 402 : 401,
      );
    }

    const bytes = await audio.arrayBuffer();
    const transcription = await getOpenAI().audio.transcriptions.create({
      file: new File([bytes], audio.name || "recording.webm", {
        type: audio.type || "audio/webm",
      }),
      model: "whisper-large-v3",
    });
    const transcript = transcription.text.trim();

    if (!transcript) {
      return errorResponse(
        "The audio was processed, but no transcript text was returned.",
        "EMPTY_TRANSCRIPT",
        422,
      );
    }

    const title = createRecordingTitle(transcript);
    const wordCount = countWords(transcript);

    if (isSubscriber && appUser) {
      const uploadedAudio = await uploadAudioToSupabase({
        bytes,
        contentType: audio.type || "audio/webm",
        clerkUserId: userId!,
        fileName: audio.name || "recording.webm",
      }).catch((uploadError) => {
        console.error("Supabase upload failed:", uploadError);
        return null;
      });

      const recording = await prisma.recording.create({
        data: {
          userId: appUser.id,
          title,
          transcript,
          audioUrl: uploadedAudio?.publicUrl,
          audioStoragePath: uploadedAudio?.path,
          access: "SUBSCRIBER",
          charCount: transcript.length,
          wordCount,
        },
      });

      return NextResponse.json({
        mode: "subscriber",
        transcript,
        title,
        recording: {
          id: recording.id,
          title: recording.title,
          transcript: recording.transcript,
          createdAt: recording.createdAt.toISOString(),
          charCount: recording.charCount,
          wordCount: recording.wordCount,
          audioUrl: recording.audioUrl,
        },
      });
    }

    if (appUser) {
      await prisma.user.update({
        where: {
          id: appUser.id,
        },
        data: {
          freeTranscriptionCount: {
            increment: 1,
          },
        },
      });
    }

    const response = NextResponse.json({
      mode: "free",
      transcript,
      title,
      remainingFreeRecords: 0,
    });

    response.cookies.set(GUEST_FREE_RECORD_COOKIE, String(guestUsage + 1), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("Transcription route failed:", error);

    return errorResponse(
      "Transcription failed. Check your OpenAI configuration and try again.",
      "TRANSCRIPTION_FAILED",
      500,
    );
  }
}
