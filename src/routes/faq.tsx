import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Facebook,
  Instagram,
  Linkedin,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";
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

const canonicalUrl = "https://www.brilliantmindtravels.com/faq";

export const Route = createFileRoute("/faq")({
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
      { name: "twitter:card", content: "summary" },
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
    question: "What other travel services do you provide?",
    answer:
      "Our services also include travel consultation, flight booking support, visa guidance, study abroad and university admission support, tour planning, travel documentation assistance, tourism services and personalized travel planning. Contact our team to discuss the service you need.",
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

  const socials = [
    ["facebook_url", "Facebook", Facebook],
    ["instagram_url", "Instagram", Instagram],
    ["twitter_url", "X", Twitter],
    ["linkedin_url", "LinkedIn", Linkedin],
    ["tiktok_url", "TikTok", Music2],
    ["tiktok_url_2", "TikTok 2", Music2],
    ["youtube_url", "YouTube", Youtube],
  ] as const;

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

          {socials.some(([key]) => s?.[key]) ? (
            <Reveal>
              <div className="rounded-xl border border-border bg-card p-7 text-center">
                <SectionHeading
                  eyebrow="Stay Connected"
                  title="Follow Brilliant Mind Travels & Tours"
                />

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Follow us on social media for travel updates, visa
                  information, study abroad opportunities, tour packages,
                  announcements and other useful travel information.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {socials.map(([key, label, Icon]) =>
                    s?.[key] ? (
                      <a
                        key={key}
                        href={s[key] as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy/70 transition-all hover:border-gold hover:bg-gold hover:text-navy-deep"
                      >
                        <Icon className="size-5" />
                      </a>
                    ) : null,
                  )}
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <WhatsAppCta />
    </SiteLayout>
  );
}
