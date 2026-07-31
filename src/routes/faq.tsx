import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import { EmptyState, PageHero, Reveal, SectionHeading, useSettings } from "@/components/public/ui";
import { FaqAccordion, type FaqItem } from "@/components/home/Faq";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { faqsQuery } from "@/lib/cms";

const title = "Frequently Asked Questions | Brilliant Mind Travels & Tours";
const description =
  "Answers to common questions about visas, study abroad admissions, tour packages and how our consultancy works.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://brilliantmindtravels.lovable.app/faq" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://brilliantmindtravels.lovable.app/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { data: s } = useSettings();
  const { data } = useQuery(faqsQuery);
  const items = (data ?? []) as (FaqItem & { category: string })[];

  const categories = Array.from(new Set(items.map((i) => i.category || "General Questions")));

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Help centre"
        title="Frequently asked questions"
        intro={s?.business_hours ? `Still unsure? Our team is available ${s.business_hours}.` : description}
      />

      <section className="bg-background py-20">
        <div className="container-page max-w-4xl space-y-14">
          {!items.length ? (
            <EmptyState
              title="Questions coming soon"
              text="Our team is preparing answers to the questions clients ask most often."
            />
          ) : (
            categories.map((category, index) => (
              <Reveal key={category} delay={index * 60}>
                <SectionHeading eyebrow="Category" title={category} />
                <div className="mt-6">
                  <FaqAccordion
                    idPrefix={category}
                    items={items.filter((i) => (i.category || "General Questions") === category)}
                  />
                </div>
              </Reveal>
            ))
          )}
        </div>
      </section>

      <WhatsAppCta />
    </SiteLayout>
  );
}
