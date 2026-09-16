import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cms } from "@/lib/db";
import { uploadMedia, deleteMedia } from "@/lib/media";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard/testimonials")({
  component: Page,
});

type TestimonialMedia = {
  id: string;
  featured_image: string | null;
  video_url: string | null;
  status: string;
  created_at: string;
  created_by: string | null;
};

async function getFileHash(file: File) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function Page() {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["testimonial-media"],
    queryFn: async () => {
      const { data, error } = await cms
        .from("testimonials")
        .select("id, featured_image, video_url, status, created_at, created_by")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as TestimonialMedia[];
    },
  });

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) return;

    setUploading(true);

    try {
      const { data: userRes } = await supabase.auth.getUser();
      const createdBy = userRes.user?.id ?? null;

      const existingNames = new Set(
        (data ?? []).map((item) => {
          const url = item.video_url || item.featured_image || "";
          return getFileNameFromUrl(url);
        }),
      );

      const batchHashes = new Set<string>();
      let uploadedCount = 0;
      let duplicateCount = 0;

      for (const file of Array.from(files)) {
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isImage && !isVideo) {
          toast.error(`${file.name} is not an image or video.`);
          continue;
        }

        const hash = await getFileHash(file);

        if (batchHashes.has(hash)) {
          duplicateCount++;
          continue;
        }

        batchHashes.add(hash);

        const fileName = file.name.toLowerCase().trim();

        if (existingNames.has(fileName)) {
          duplicateCount++;
          continue;
        }

        const { url, path } = await uploadMedia(file, "testimonials");

        const payload = {
          title: file.name,
          slug: crypto.randomUUID(),
          featured_image: isImage ? url : null,
          video_url: isVideo ? url : null,
          status: "published",
          created_by: createdBy,
          sort_order: 0,
        };

        const { error } = await cms.from("testimonials").insert(payload);

        if (error) {
          await deleteMedia(path);
          throw error;
        }

        uploadedCount++;
      }

      if (duplicateCount > 0) {
        toast.success(
          `${uploadedCount} uploaded, ${duplicateCount} duplicate${
            duplicateCount === 1 ? "" : "s"
          } skipped.`,
        );
      } else {
        toast.success(`${uploadedCount} media file${uploadedCount === 1 ? "" : "s"} uploaded.`);
      }

      await queryClient.invalidateQueries({
        queryKey: ["testimonial-media"],
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Upload failed",
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const toggleStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => {
      const { error } = await cms
        .from("testimonials")
        .update({
          status: status === "published" ? "draft" : "published",
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: async () => {
      toast.success("Status updated.");

      await queryClient.invalidateQueries({
        queryKey: ["testimonial-media"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["cms", "testimonials"],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (item: TestimonialMedia) => {
      const url = item.video_url || item.featured_image || "";
      const path = getStoragePath(url);

      if (path) {
        await deleteMedia(path);
      }

      const { error } = await cms
        .from("testimonials")
        .delete()
        .eq("id", item.id);

      if (error) throw error;
    },
    onSuccess: async () => {
      toast.success("Media deleted.");

      await queryClient.invalidateQueries({
        queryKey: ["testimonial-media"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["cms", "testimonials"],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl text-navy">Testimonials</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Upload client photos and video testimonials in bulk.
            Duplicate files are automatically skipped.
          </p>
        </div>

        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(event) => void uploadFiles(event.target.files)}
          />

          <Button
            variant="gold"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}

            {uploading ? "Checking / Uploading..." : "Upload Photos / Videos"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <Loader2 className="mx-auto size-6 animate-spin" />
        </div>
      ) : !data?.length ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">
            No testimonial photos or videos uploaded yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Media</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => {
                  const isVideo = Boolean(item.video_url);
                  const mediaUrl = item.video_url || item.featured_image;

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-4">
                        {isVideo ? (
                          <video
                            src={mediaUrl ?? undefined}
                            className="h-20 w-32 rounded-md border border-border object-cover"
                            muted
                            playsInline
                            controls
                          />
                        ) : (
                          <img
                            src={mediaUrl ?? ""}
                            alt=""
                            className="h-20 w-32 rounded-md border border-border object-cover"
                          />
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <Badge variant="outline">
                          {isVideo ? "Video" : "Photo"}
                        </Badge>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={item.status === "published"}
                            onCheckedChange={() =>
                              toggleStatus.mutate({
                                id: item.id,
                                status: item.status,
                              })
                            }
                            disabled={toggleStatus.isPending}
                          />

                          <span>
                            {item.status === "published"
                              ? "Published"
                              : "Draft"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          disabled={remove.isPending}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Delete this testimonial media permanently?",
                              )
                            ) {
                              remove.mutate(item);
                            }
                          }}
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function getFileNameFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    const pathname = decodeURIComponent(parsed.pathname);
    return pathname.split("/").pop()?.toLowerCase().trim() ?? "";
  } catch {
    return "";
  }
}

function getStoragePath(url: string) {
  try {
    const parsed = new URL(url);
    const marker = "/storage/v1/object/sign/media/";
    const index = parsed.pathname.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(
      parsed.pathname.slice(index + marker.length),
    );
  } catch {
    return null;
  }
}
