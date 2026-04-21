import "server-only";

import OpenAI from "openai";

import { requireEnv } from "@/lib/env";

let cachedClient: OpenAI | null = null;

export function getOpenAI() {
  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new OpenAI({
    apiKey: requireEnv("GROQ_API_KEY"),
    baseURL: "https://api.groq.com/openai/v1",
  });

  return cachedClient;
}
