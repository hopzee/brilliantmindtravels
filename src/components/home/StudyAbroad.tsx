import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { fallbackImages, imageOr, publishedList } from "@/lib/cms";
import { CardSkeletons, EmptyState, Reveal, SectionHeading } from "@/components/public/ui";

export function StudyAbroad() {
  const { data, isLoading } = useQuery(
    publishedList("study_abroad_countries", { orderBy: "sort_order", ascending: true, limit: 8 }),
  );

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured destinations" title="Study abroad pathways" />
          <Button asChild variant="outline" size="lg">
            <Link to="/study-abroad">
              All destinations <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <CardSkeletons count={4} />
          ) : !data?.length ? (
            <EmptyState
              title="Destinations coming soon"
              text="Study abroad destinations are being prepared. Speak to a consultant in the meantime."
            />
          ) : (
            <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
              {data.map((c: any, i: number) => (
                <Reveal key={c.id} delay={i * 60} className="w-72 shrink-0 snap-start lg:w-auto">
                  <Link
                    to="/study-abroad/$slug"
                    params={{ slug: c.slug }}
                    className="group block h-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
                  >
                    <img
                      src={imageOr(c.featured_image, fallbackImages.study)}
                      alt={`Study in ${c.title}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-6">
                      <h3 className="text-lg text-navy">
                        {c.flag_emoji ? `${c.flag_emoji} ` : ""}
                        {c.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {c.short_description}
                      </p>
                    </div>
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