import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

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
        { message: "Sign in to use the generation pipeline." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { text, tone = "professional" } = body as {
      text?: string;
      tone?: string;
    };

    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return NextResponse.json(
        { message: "Text must be at least 10 characters." },
        { status: 400 },
      );
    }

    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1500,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Tone: ${tone}\n\nRaw text:\n${text.trim()}`,
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
        { message: "Failed to parse AI output.", raw },
        { status: 502 },
      );
    }

    return NextResponse.json({ outputs });
  } catch (error) {
    console.error("Generate route failed:", error);
    return NextResponse.json(
      { message: "Content generation failed. Try again." },
      { status: 500 },
    );
  }
}
