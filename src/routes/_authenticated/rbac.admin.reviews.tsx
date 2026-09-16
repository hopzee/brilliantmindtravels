import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard/reviews")({ component: Page });

function Page() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const approve = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: boolean }) => {
      const { error } = await supabase.from("reviews").update({ is_approved: value }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Review updated");
      void qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Review deleted");
      void qc.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Customer Reviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">Approve reviews before they appear on the website.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(data ?? []).map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-navy">{r.customer_name}</p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={i < r.rating ? "size-3.5 fill-gold text-gold" : "size-3.5 text-muted-foreground/40"}
                    />
                  ))}
                </div>
              </div>
              <Badge variant={r.is_approved ? "default" : "secondary"}>
                {r.is_approved ? "Published" : "Pending"}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{r.content}</p>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant={r.is_approved ? "outlineNavy" : "gold"}
                onClick={() => approve.mutate({ id: r.id, value: !r.is_approved })}
              >
                <Check className="size-4" /> {r.is_approved ? "Unpublish" : "Approve"}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => remove.mutate(r.id)}>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
        {(data?.length ?? 0) === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
      </div>
    </div>
  );
}
