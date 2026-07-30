import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  CardSkeletons,
  EmptyState,
  PageHero,
  Reveal,
  SectionHeading,
} from "@/components/public/ui";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { fallbackImages, imageOr, publishedList, settingsQuery } from "@/lib/cms";

const title = "Study Abroad Destinations | Brilliant Mind Travels & Tours";
const description =
  "Explore study abroad destinations with admission requirements, tuition guidance, scholarships and student visa support for Nigerian students.";

export const Route = createFileRoute("/study-abroad/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudyAbroadPage,
});

function StudyAbroadPage() {
  const { data: s } = useQuery(settingsQuery);
  const { data, isLoading } = useQuery(
    publishedList("study_abroad_countries", { orderBy: "sort_order", ascending: true }),
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Study abroad"
        title="Choose your destination"
        intro="Admission processing, scholarship guidance and student visa support for top study destinations."
        image={imageOr(s?.hero_image_url, fallbackImages.study)}
      />

      <section className="bg-background py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Destinations" title="Where would you like to study?" />
          <div className="mt-12">
            {isLoading ? (
              <CardSkeletons />
            ) : !data?.length ? (
              <EmptyState
                title="Destinations coming soon"
                text="We're preparing detailed country guides. Contact a consultant for immediate help."
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((c: any, i: number) => (
                  <Reveal key={c.id} delay={i * 60}>
                    <Link
                      to="/study-abroad/$slug"
                      params={{ slug: c.slug }}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
                    >
                      <img
                        src={imageOr(c.featured_image, fallbackImages.study)}
                        alt={`Study in ${c.title}`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="text-lg text-navy">
                          {c.flag_emoji ? `${c.flag_emoji} ` : ""}
                          {c.title}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
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

      <WhatsAppCta />
    </SiteLayout>
  );
}