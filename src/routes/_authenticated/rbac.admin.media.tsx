import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { deleteMedia, uploadMedia } from "@/lib/media";

export const Route = createFileRoute("/_authenticated/rbac/admin/media")({
  component: Page,
});

function Page() {
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [folder, setFolder] = useState("general");

  const { data } = useQuery({
    queryKey: ["media_library"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_library")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data ?? [];
    },
  });

  const onUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    setBusy(true);

    try {
      for (const file of Array.from(files)) {
        await uploadMedia(file, folder || "general");
      }

      toast.success("Upload complete");

      void qc.invalidateQueries({
        queryKey: ["media_library"],
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const folders = Array.from(new Set((data ?? []).map((m) => m.folder)));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl text-navy">Media Library</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Images and videos used across the website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="Folder"
            className="w-40"
            list="media-folders"
          />

          <datalist id="media-folders">
            {folders.map((f) => (
              <option key={f} value={f} />
            ))}
          </datalist>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => void onUpload(e.target.files)}
          />

          <Button
            variant="gold"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            Upload
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {(data ?? []).map((m) => (
          <div
            key={m.id}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            {m.mime_type?.startsWith("video") ? (
              <video
                src={m.url}
                className="h-32 w-full object-cover"
                controls
              />
            ) : (
              <img
                src={m.url}
                alt={m.alt_text ?? m.title ?? ""}
                loading="lazy"
                className="h-32 w-full object-cover"
              />
            )}

            <div className="space-y-2 p-3">
              <p className="truncate text-xs text-muted-foreground">
                {m.title}
              </p>

              <div className="flex items-center justify-between">
                <span className="rounded bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                  {m.folder}
                </span>

                <button
                  onClick={async () => {
                    if (!confirm("Delete this file?")) return;

                    await deleteMedia(m.file_path, m.id);

                    void qc.invalidateQueries({
                      queryKey: ["media_library"],
                    });
                  }}
                  aria-label="Delete file"
                >
                  <Trash2 className="size-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {(data?.length ?? 0) === 0 && (
          <p className="text-sm text-muted-foreground">
            No media uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
