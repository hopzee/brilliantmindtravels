import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  GraduationCap,
  Mailbox,
  Plane,
  Quote,
  Star,
  CalendarClock,
  Wrench,
} from "lucide-react";
import { cms } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: Overview,
});

const cards = [
  { table: "services", label: "Services", icon: Wrench, to: "/dashboard/services" },
  { table: "study_abroad_countries", label: "Study Abroad Countries", icon: GraduationCap, to: "/dashboard/study-abroad" },
  { table: "tour_packages", label: "Tour Packages", icon: Plane, to: "/dashboard/tours" },
  { table: "blog_posts", label: "Blog Posts", icon: BookOpen, to: "/dashboard/blog" },
  { table: "testimonials", label: "Testimonials", icon: Quote, to: "/dashboard/testimonials" },
  { table: "reviews", label: "Reviews", icon: Star, to: "/dashboard/reviews" },
  { table: "appointments", label: "Appointments", icon: CalendarClock, to: "/dashboard/messages" },
  { table: "contact_messages", label: "Contact Messages", icon: Mailbox, to: "/dashboard/messages" },
];

function Overview() {
  const { data: counts } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const entries = await Promise.all(
        cards.map(async (c) => {
          const { count } = await cms.from(c.table).select("*", { count: "exact", head: true });
          return [c.table, count ?? 0] as const;
        }),
      );
      return Object.fromEntries(entries) as Record<string, number>;
    },
  });

  const { data: activity } = useQuery({
    queryKey: ["admin-activity"],
    queryFn: async () => {
      const [posts, msgs, reviews] = await Promise.all([
        supabase.from("blog_posts").select("title, updated_at").order("updated_at", { ascending: false }).limit(4),
        supabase.from("contact_messages").select("full_name, created_at").order("created_at", { ascending: false }).limit(4),
        supabase.from("reviews").select("customer_name, created_at").order("created_at", { ascending: false }).limit(4),
      ]);
      return [
        ...(posts.data ?? []).map((p) => ({ text: `Blog post updated — ${p.title}`, at: p.updated_at })),
        ...(msgs.data ?? []).map((m) => ({ text: `New contact message from ${m.full_name}`, at: m.created_at })),
        ...(reviews.data ?? []).map((r) => ({ text: `New review from ${r.customer_name}`, at: r.created_at })),
      ]
        .sort((a, b) => (a.at < b.at ? 1 : -1))
        .slice(0, 8);
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl text-navy">Dashboard overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Everything on the public website is managed from here.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-navy text-gold">
              <c.icon className="size-4.5" />
            </span>
            <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-navy">
              {counts?.[c.table] ?? "—"}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg text-navy">Recent activity</h2>
        <ul className="mt-4 space-y-3">
          {(activity ?? []).map((a, i) => (
            <li key={i} className="flex items-start justify-between gap-4 border-b border-border pb-3 text-sm last:border-0">
              <span className="text-foreground">{a.text}</span>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {a.at ? new Date(a.at).toLocaleDateString() : ""}
              </span>
            </li>
          ))}
          {(activity?.length ?? 0) === 0 && (
            <li className="text-sm text-muted-foreground">No activity yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}