import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { Sparkles } from "lucide-react";
import { whyChooseUsQuery } from "@/lib/cms";
import { Reveal, SectionHeading } from "@/components/public/ui";
import { SmartImage } from "@/components/public/media";

/** Resolves a lucide icon name saved in the CMS, falling back to a neutral mark. */
function CardIcon({ name }: { name?: string | null }) {
  const key = (name ?? "").trim();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Found = key ? ((Icons as any)[key] as any) : null;
  const Icon = typeof Found === "function" || typeof Found === "object" ? Found : Sparkles;
  return <Icon className="size-5" />;
}

export function WhyChooseUs() {
  const { data } = useQuery(whyChooseUsQuery);
  if (!data?.length) return null;

  return (
    <section className="surface-soft py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          center
          eyebrow="Why choose us"
          title="Reasons clients trust us with their journey"
          intro="Every file is handled by a consultant who treats your future as seriously as you do."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((card: any, i: number) => (
            <Reveal key={card.id} delay={i * 60}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                {card.image_url ? (
                  <SmartImage src={card.image_url} alt={card.title} ratio="aspect-16/9" />
                ) : null}
                <div className="flex flex-1 flex-col p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-navy/5 text-navy">
                    <CardIcon name={card.icon} />
                  </span>
                  <h3 className="mt-5 text-lg text-navy">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
