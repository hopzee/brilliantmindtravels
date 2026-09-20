import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  CardSkeletons,
  EmptyState,
  PageHero,
  Reveal,
} from "@/components/public/ui";
import { TestimonialCard } from "@/components/home/Testimonials";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { publishedList } from "@/lib/cms";

const title =
  "Client Testimonials | Brilliant Mind Travels & Tours in Ede, Osun";

const description =
  "Read client testimonials about Brilliant Mind Travels & Tours in Ede, Osun and learn about experiences with travel, visa guidance, study abroad and tourism services.";

const canonicalUrl =
  "https://www.brilliantmindtravels.com/testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Brilliant Mind Travels & Tours" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      {
        property: "og:site_name",
        content: "Brilliant Mind Travels & Tours",
      },
      { property: "og:locale", content: "en_NG" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { data, isLoading } = useQuery(publishedList("testimonials"));

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Brilliant Mind Travels & Tours"
        title="Client Testimonials"
        intro="Read client experiences with our travel, visa guidance, study abroad and tourism services in Ede, Osun."
      />

      <section className="bg-background py-20">
        <div className="container-page">
          {isLoading ? (
            <CardSkeletons />
          ) : !data?.length ? (
            <EmptyState
              title="Client testimonials coming soon"
              text="Client testimonials will be published here as more experiences are added."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((t: any, i: number) => (
                <Reveal key={t.id} delay={i * 60}>
                  <TestimonialCard item={t} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <WhatsAppCta />
    </SiteLayout>
  );
}
