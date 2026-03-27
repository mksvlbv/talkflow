import "server-only";

export const GUEST_FREE_RECORD_COOKIE = "voice-mvp-free-recordings";
export const FREE_RECORD_LIMIT = 1;
export const MAX_AUDIO_SIZE_BYTES = 20 * 1024 * 1024;

export function countWords(text: string) {
  const normalized = text.trim();

  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).length;
}

export function createRecordingTitle(transcript: string) {
  const normalized = transcript.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return "Untitled recording";
  }

  const words = normalized.split(" ").slice(0, 6).join(" ");

  if (words.length <= 48) {
    return words;
  }

  return `${words.slice(0, 45).trimEnd()}...`;
}

export function readGuestFreeUsage(rawValue: string | undefined) {
  const parsed = Number.parseInt(rawValue ?? "0", 10);

  return Number.isNaN(parsed) ? 0 : parsed;
}
