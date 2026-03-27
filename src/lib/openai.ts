import "server-only";

import OpenAI from "openai";

import { requireEnv } from "@/lib/env";

let cachedClient: OpenAI | null = null;

export function getOpenAI() {
  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new OpenAI({
    apiKey: requireEnv("OPENAI_API_KEY"),
  });

  return cachedClient;
}
