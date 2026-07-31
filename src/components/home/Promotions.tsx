import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { promotionsQuery } from "@/lib/cms";
import { Reveal, SectionHeading } from "@/components/public/ui";
import { SmartImage } from "@/components/public/media";

/**
 * Company flyers, campaigns and announcements uploaded in the dashboard.
 * Flyers are shown with `contain` so no part of the artwork is ever cropped.
 */
export function Promotions({
  placement = "homepage",
  eyebrow = "Announcements",
  title = "Current offers and campaigns",
}: {
  placement?: string;
  eyebrow?: string;
  title?: string;
}) {
  const { data } = useQuery(promotionsQuery(placement));
  if (!data?.length) return null;

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p: any, i: number) => {
            const images: string[] = [p.featured_image, ...(p.gallery_images ?? [])].filter(Boolean);
            const body = (
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                {images[0] ? (
                  <SmartImage src={images[0]} alt={p.title} ratio="aspect-3/4" fit="contain" />
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  {p.subtitle ? <span className="eyebrow text-navy/60">{p.subtitle}</span> : null}
                  <h3 className="mt-3 text-lg leading-snug text-navy">{p.title}</h3>
                  {p.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  ) : null}
                  {p.link_url ? (
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                      Learn more <ArrowUpRight className="size-4 text-gold" />
                    </span>
                  ) : null}
                </div>
              </article>
            );

            return (
              <Reveal key={p.id} delay={i * 60}>
                {p.link_url ? (
                  <a href={p.link_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
