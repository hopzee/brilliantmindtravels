import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import { CardSkeletons, EmptyState, PageHero, Reveal } from "@/components/public/ui";
import { TestimonialCard } from "@/components/home/Testimonials";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { publishedList } from "@/lib/cms";

const title = "Client Testimonials | Brilliant Mind Travels & Tours";
const description =
  "Real success stories from clients who secured visas, admissions and travel plans with Brilliant Mind Travels & Tours.";

export const Route = createFileRoute("/testimonials")({
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
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { data, isLoading } = useQuery(publishedList("testimonials"));
  return (
    <SiteLayout>
      <PageHero eyebrow="Client stories" title="Testimonials" intro="Journeys we've helped make possible." />
      <section className="bg-background py-20">
        <div className="container-page">
          {isLoading ? (
            <CardSkeletons />
          ) : !data?.length ? (
            <EmptyState title="Stories coming soon" text="Client stories will be published here shortly." />
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