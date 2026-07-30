import { ArrowUpRight, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { publishedList } from "@/lib/cms";
import { CardSkeletons, EmptyState, Reveal, SectionHeading } from "@/components/public/ui";

export function Services() {
  const { data, isLoading } = useQuery(
    publishedList("services", { orderBy: "sort_order", ascending: true }),
  );

  return (
    <section className="surface-soft py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Professional services for every stage of your journey"
        />

        <div className="mt-12">
          {isLoading ? (
            <CardSkeletons />
          ) : !data?.length ? (
            <EmptyState
              title="Services coming soon"
              text="Our consultancy services are being published. Please check back shortly or reach out on WhatsApp."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((s: any, i: number) => (
                <Reveal key={s.id} delay={i * 60}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
                  >
                    <span className="inline-flex size-12 items-center justify-center rounded-lg bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                      <Wrench className="size-5" />
                    </span>
                    <h3 className="mt-6 text-lg text-navy">{s.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {s.short_description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy/70 transition-colors group-hover:text-gold">
                      View details <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}