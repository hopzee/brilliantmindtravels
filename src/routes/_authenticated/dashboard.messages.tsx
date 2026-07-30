import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cms } from "@/lib/db";

export const Route = createFileRoute("/_authenticated/admin/messages")({ component: Page });

const tabs = [
  { table: "contact_messages", label: "Contact Messages" },
  { table: "inquiries", label: "Inquiries" },
  { table: "appointments", label: "Appointments" },
];

function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Messages & Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enquiries submitted through the website.</p>
      </div>
      <Tabs defaultValue="contact_messages">
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.table} value={t.table}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t) => (
          <TabsContent key={t.table} value={t.table} className="mt-6">
            <LeadList table={t.table} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function LeadList({ table }: { table: string }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await cms.from(table).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data ?? []) as Record<string, any>[];
    },
  });

  if ((data?.length ?? 0) === 0) return <p className="text-sm text-muted-foreground">Nothing here yet.</p>;

  return (
    <div className="space-y-3">
      {data?.map((row) => (
        <div key={row.id} className="rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-navy">{row.full_name}</p>
              <p className="text-xs text-muted-foreground">
                {row.email}
                {row.phone ? ` · ${row.phone}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {row.subject && <Badge variant="secondary">{row.subject}</Badge>}
              {row.service && <Badge variant="secondary">{row.service}</Badge>}
              {row.preferred_date && <Badge variant="secondary">{row.preferred_date}</Badge>}
              <span className="text-xs text-muted-foreground">
                {new Date(row.created_at).toLocaleDateString()}
              </span>
              <button
                aria-label="Delete"
                onClick={async () => {
                  if (!confirm("Delete this entry?")) return;
                  await cms.from(table).delete().eq("id", row.id);
                  void qc.invalidateQueries({ queryKey: [table] });
                }}
              >
                <Trash2 className="size-4 text-destructive" />
              </button>
            </div>
          </div>
          {row.message && <p className="mt-3 text-sm text-muted-foreground">{row.message}</p>}
        </div>
      ))}
    </div>
  );
}