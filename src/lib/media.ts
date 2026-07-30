import { supabase } from "@/integrations/supabase/client";

const TEN_YEARS = 60 * 60 * 24 * 3650;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function uploadMedia(file: File, folder = "general") {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  const { data: signed, error: signErr } = await supabase.storage
    .from("media")
    .createSignedUrl(path, TEN_YEARS);
  if (signErr) throw signErr;

  const url = signed.signedUrl;

  const { data: userRes } = await supabase.auth.getUser();
  await supabase.from("media_library").insert({
    title: file.name,
    file_path: path,
    url,
    mime_type: file.type,
    file_size: file.size,
    folder,
    created_by: userRes.user?.id ?? null,
  });

  return { path, url };
}

export async function deleteMedia(path: string, id?: string) {
  await supabase.storage.from("media").remove([path]);
  if (id) await supabase.from("media_library").delete().eq("id", id);
}