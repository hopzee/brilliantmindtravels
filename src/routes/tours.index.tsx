import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import { CardSkeletons, EmptyState, PageHero, Reveal } from "@/components/public/ui";
import { TourCard } from "@/components/home/Tours";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { publishedList } from "@/lib/cms";

const title = "Tour Packages | Brilliant Mind Travels & Tours";
const description =
  "Curated international and local tour packages with clear itineraries, inclusions and pricing. Book your next trip with expert travel planners.";

export const Route = createFileRoute("/tours/")({
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
  component: ToursPage,
});

function ToursPage() {
  const { data, isLoading } = useQuery(publishedList("tour_packages"));
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Travel"
        title="Tour packages"
        intro="Thoughtfully planned itineraries for leisure, family and group travel."
      />
      <section className="bg-background py-20">
        <div className="container-page">
          {isLoading ? (
            <CardSkeletons />
          ) : !data?.length ? (
            <EmptyState
              title="Packages coming soon"
              text="Contact our team for a custom itinerary while we publish new packages."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((t: any, i: number) => (
                <Reveal key={t.id} delay={i * 60}>
                  <TourCard tour={t} />
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