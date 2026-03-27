import "server-only";

import { createClient } from "@supabase/supabase-js";

import { hasSupabaseStorageConfig, requireEnv } from "@/lib/env";

type UploadAudioInput = {
  bytes: ArrayBuffer;
  contentType: string;
  clerkUserId: string;
  fileName: string;
};

function sanitizeSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSupabaseAdminClient() {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export async function uploadAudioToSupabase({
  bytes,
  contentType,
  clerkUserId,
  fileName,
}: UploadAudioInput) {
  if (!hasSupabaseStorageConfig()) {
    return null;
  }

  const supabase = getSupabaseAdminClient();
  const extension = fileName.includes(".") ? fileName.split(".").pop() : "webm";
  const path = `${sanitizeSegment(clerkUserId)}/${Date.now()}-${crypto.randomUUID()}.${sanitizeSegment(
    extension ?? "webm",
  )}`;

  const upload = await supabase.storage
    .from(requireEnv("SUPABASE_STORAGE_BUCKET"))
    .upload(path, bytes, {
      contentType,
      upsert: false,
    });

  if (upload.error) {
    throw new Error(`Failed to upload audio to Supabase: ${upload.error.message}`);
  }

  const { data } = supabase.storage
    .from(requireEnv("SUPABASE_STORAGE_BUCKET"))
    .getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
  };
}
