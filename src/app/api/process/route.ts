import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

const MAX_AUDIO_SIZE = 20 * 1024 * 1024; // 20 MB

const SYSTEM_PROMPT = `You are a content formatting engine. Given raw text (a transcript or notes), generate three outputs:

1. **twitter**: A Twitter/X thread (2-5 tweets, numbered "1/", "2/", etc.). Punchy, clear, conversational. Use line breaks between tweets.
2. **linkedin**: A LinkedIn post. Professional but human. 1-3 short paragraphs. No hashtags.
3. **summary**: Bullet points (3-5) capturing the key ideas. Use "•" as bullet marker.

Respond ONLY with valid JSON in this exact format:
{"twitter":"...","linkedin":"...","summary":"..."}

No markdown, no code fences, no extra text.`;

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Sign in to use the processing pipeline." },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const audio = formData.get("audio");
    const tone = (formData.get("tone") as string) || "professional";

    if (!(audio instanceof File)) {
      return NextResponse.json(
        { message: "Audio file is required." },
        { status: 400 },
      );
    }

    if (audio.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { message: "Audio file must be under 20 MB." },
        { status: 400 },
      );
    }

    const openai = getOpenAI();

    // Step 1: Transcribe
    const bytes = await audio.arrayBuffer();
    const transcription = await openai.audio.transcriptions.create({
      file: new File([bytes], audio.name || "recording.webm", { type: audio.type || "audio/webm" }),
      model: "whisper-large-v3",
    });
    const transcript = transcription.text.trim();

    if (!transcript) {
      return NextResponse.json(
        { message: "No speech detected in the audio." },
        { status: 422 },
      );
    }

    // Step 2: Generate content
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1500,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Tone: ${tone}\n\nRaw text:\n${transcript}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    let outputs: { twitter: string; linkedin: string; summary: string };
    try {
      outputs = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { message: "Failed to parse AI output.", transcript },
        { status: 502 },
      );
    }

    return NextResponse.json({
      transcript,
      outputs,
    });
  } catch (error: any) {
    console.error("Process route failed:", error);
    return NextResponse.json(
      { message: `Processing failed: ${error?.message || "Unknown error"}` },
      { status: 500 },
    );
  }
}
