import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a world-class executive ghostwriter and content strategist. Your job is to transform raw, unfiltered voice transcripts into highly engaging, platform-native content. 

You do not simply summarize; you distill the core essence, amplify the value, and structure it for maximum engagement based on the requested tone.

You must generate three distinct outputs:

1. **twitter**: A Twitter/X thread. 
- Must start with a scroll-stopping hook. 
- Format as a thread (numbered "1/", "2/", etc.). 
- Keep each tweet under 280 characters. 
- Use line breaks. Be punchy, concise, and value-dense.

2. **linkedin**: A high-impact LinkedIn post. 
- The first line must be a compelling hook that creates curiosity. 
- The second line must provide context. 
- Use short paragraphs (1-3 sentences max) for readability. 
- End with a thought-provoking question or clear takeaway to drive comments. 
- Keep it authentic and human. No cliché corporate jargon. No hashtags.

3. **summary**: An Executive Summary. 
- Extract the absolute core concepts. 
- Format as 3-5 punchy bullet points using "•". 
- Focus on actionable insights, not just a recount of what was said.

You must adapt your vocabulary, pacing, and formatting to precisely match the user's requested TONE.

Respond ONLY with valid JSON in this exact format:
{"twitter":"...","linkedin":"...","summary":"..."}

No markdown wrappers, no code fences, no extra text whatsoever.`;

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
    const { text, tone = "professional", recordingId } = body as {
      text?: string;
      tone?: string;
      recordingId?: string;
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

    if (body.recordingId) {
      const { prisma } = await import("@/lib/prisma");
      await prisma.document.update({
        where: { recordingId: body.recordingId },
        data: {
          twitter: outputs.twitter,
          linkedin: outputs.linkedin,
          summary: outputs.summary,
          tone: tone,
        },
      });
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
