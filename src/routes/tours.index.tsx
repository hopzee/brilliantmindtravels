import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  CardSkeletons,
  EmptyState,
  PageHero,
  Reveal,
} from "@/components/public/ui";
import { TourCard } from "@/components/home/Tours";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { publishedList } from "@/lib/cms";
const title =
  "Tour Packages in Ede, Osun | Brilliant Mind Travels & Tours";
const description =
  "Explore tour packages and travel experiences from Brilliant Mind Travels & Tours in Ede, Osun. Find leisure, family and group travel options with planned itineraries.";
const canonicalUrl = "https://www.brilliantmindtravels.com/tours";
export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      {
        name: "author",
        content: "Brilliant Mind Travels & Tours",
      },
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
  component: ToursPage,
});
function ToursPage() {
  const { data, isLoading } = useQuery(publishedList("tour_packages"));
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Brilliant Mind Travels & Tours"
        title="Tour Packages in Ede, Osun"
        intro="Explore thoughtfully planned leisure, family and group travel experiences with Brilliant Mind Travels & Tours."
      />
      <section className="bg-background py-20">
        <div className="container-page">
          {isLoading ? (
            <CardSkeletons />
          ) : !data?.length ? (
            <EmptyState
              title="Tour packages coming soon"
              text="Contact Brilliant Mind Travels & Tours for a custom itinerary while we publish new tour packages."
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
