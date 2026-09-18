import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  EmptyState,
  PageHero,
  Reveal,
  SectionHeading,
  useSettings,
} from "@/components/public/ui";
import { FaqAccordion, type FaqItem } from "@/components/home/Faq";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { faqsQuery } from "@/lib/cms";

const title =
  "Frequently Asked Questions | Brilliant Mind Travels & Tours";

const description =
  "Find answers about travel consultation, visa guidance, flight booking, study abroad, university admissions, tour packages and other services from Brilliant Mind Travels & Tours in Ede, Osun.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://brilliantmindtravels.com/faq",
      },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://brilliantmindtravels.com/faq",
      },
    ],
  }),
  component: FaqPage,
});

const serviceFaqs: FaqItem[] = [
  {
    category: "Our Services",
    question: "What services does Brilliant Mind Travels & Tours provide?",
    answer:
      "Brilliant Mind Travels & Tours provides travel consultation, visa guidance, flight booking support, study abroad guidance, university admission support, tourism and tour packages, travel documentation assistance and personalized travel planning.",
  },
  {
    category: "Our Services",
    question: "Do you help with visa applications?",
    answer:
      "Yes. We provide visa guidance and support throughout the application process. Our consultants help clients understand requirements, prepare documents and follow the appropriate application process.",
  },
  {
    category: "Our Services",
    question: "Do you provide study abroad services?",
    answer:
      "Yes. We assist students with study abroad planning, university and course selection, admission guidance, documentation and student visa preparation.",
  },
  {
    category: "Our Services",
    question: "Can you help me choose a university abroad?",
    answer:
      "Yes. We can help you explore suitable universities and courses based on your academic background, preferred destination, study level and available options.",
  },
  {
    category: "Our Services",
    question: "Do you assist with flight booking?",
    answer:
      "Yes. We provide flight booking support and help clients identify suitable travel options based on their destination, travel dates and requirements.",
  },
  {
    category: "Our Services",
    question: "Do you offer tour packages?",
    answer:
      "Yes. We provide planned tour packages for leisure, family and group travel. We can also discuss customized travel arrangements based on your preferred destination and itinerary.",
  },
  {
    category: "Our Services",
    question: "Can you help me plan a complete trip?",
    answer:
      "Yes. Our travel consultants can help you plan your trip by discussing your destination, travel dates, documentation, flight options, accommodation needs and other relevant travel arrangements.",
  },
  {
    category: "Our Services",
    question: "Where is Brilliant Mind Travels & Tours located?",
    answer:
      "Brilliant Mind Travels & Tours is located beside Eyiowu Awi Pharmacy, Ede South, Osun State, Nigeria.",
  },
  {
    category: "Our Services",
    question: "How can I speak with a travel consultant?",
    answer:
      "You can contact Brilliant Mind Travels & Tours through WhatsApp, phone or our contact page to discuss your travel, visa, study abroad or tourism needs.",
  },
  {
    category: "Our Services",
    question: "Do you guarantee visa approval?",
    answer:
      "No. Visa decisions are made by the relevant embassy, consulate or immigration authority. We provide guidance and document preparation support, but the final decision is made by the appropriate authority.",
  },
];

function FaqPage() {
  const { data: s } = useSettings();
  const { data } = useQuery(faqsQuery);

  const items = (data ?? []) as (FaqItem & {
    category: string;
  })[];

  const categories = Array.from(
    new Set(
      items.map(
        (i) => i.category || "General Questions",
      ),
    ),
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Brilliant Mind Travels & Tours"
        title="Frequently Asked Questions"
        intro={
          s?.business_hours
            ? `Learn about our travel, visa, study abroad and tourism services. Our team is available ${s.business_hours}.`
            : description
        }
      />

      <section className="bg-background py-20">
        <div className="container-page max-w-4xl space-y-14">
          <Reveal>
            <SectionHeading
              eyebrow="Our Services"
              title="Questions about our travel and consultancy services"
            />

            <div className="mt-6">
              <FaqAccordion
                idPrefix="service-faq"
                items={serviceFaqs}
              />
            </div>
          </Reveal>

          {items.length ? (
            <>
              {categories.map((category, index) => (
                <Reveal
                  key={category}
                  delay={index * 60}
                >
                  <SectionHeading
                    eyebrow="Category"
                    title={category}
                  />

                  <div className="mt-6">
                    <FaqAccordion
                      idPrefix={category}
                      items={items.filter(
                        (i) =>
                          (i.category ||
                            "General Questions") ===
                          category,
                      )}
                    />
                  </div>
                </Reveal>
              ))}
            </>
          ) : (
            <EmptyState
              title="More questions coming soon"
              text="Our team is preparing more answers to the questions clients ask most often."
            />
          )}
        </div>
      </section>

      <WhatsAppCta />
    </SiteLayout>
  );
}
