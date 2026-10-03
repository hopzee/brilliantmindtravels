import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  PageHero,
  Prose,
  Reveal,
  SectionHeading,
  useSettings,
  WhatsAppButton,
} from "@/components/public/ui";
import { InquiryForm } from "@/components/public/LeadForms";
import { publishedItem } from "@/lib/cms";

const ogImageUrl =
  "https://www.brilliantmindtravels.com/og-image.png";

export const Route = createFileRoute("/study-abroad/$slug")({
  head: ({ params }) => {
    const country = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const title =
      `Study in ${country} | Study Abroad Consultancy | Brilliant Mind Travel and Tours`;

    const description =
      `Explore study abroad opportunities in ${country} with Brilliant Mind Travel and Tours in Ede, Osun. Get guidance on universities, applications, documents and visa preparation.`;

    const canonicalUrl =
      `https://www.brilliantmindtravels.com/study-abroad/${params.slug}`;

    return {
      meta: [
        {
          title,
        },
        {
          name: "description",
          content: description,
        },
        {
          name: "robots",
          content: "index, follow",
        },
        {
          name: "author",
          content: "Brilliant Mind Travel and Tours",
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "og:url",
          content: canonicalUrl,
        },
        {
          property: "og:site_name",
          content: "Brilliant Mind Travel and Tours",
        },
        {
          property: "og:locale",
          content: "en_NG",
        },
        {
          property: "og:image",
          content: ogImageUrl,
        },
        {
          property: "og:image:alt",
          content:
            "Brilliant Mind Travel and Tours - Study Abroad Consultancy",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: ogImageUrl,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ],
    };
  },

  component: StudyAbroadDetail,
});

function StudyAbroadDetail() {
  const { slug } = Route.useParams();

  const { data: settings } = useSettings();

  const { data, isLoading } = useQuery(
    publishedItem("study_abroad_countries", slug),
  );

  const item = data as any;

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="container-page pt-40 pb-20">
          <div className="h-10 w-2/3 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-5 w-1/2 animate-pulse rounded bg-muted" />
          <div className="mt-10 h-64 w-full animate-pulse rounded-xl bg-muted" />
        </div>
      </SiteLayout>
    );
  }

  if (!item) {
    return (
      <SiteLayout>
        <div className="container-page pt-40 pb-24 text-center">
          <h1 className="text-3xl text-navy">
            Study abroad information not available
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            This country information may have been moved or is not currently
            published.
          </p>
        </div>
      </SiteLayout>
    );
  }

  const country =
    item.country_name ??
    item.country ??
    item.title ??
    "";

  const description =
    item.description ??
    item.overview ??
    item.content ??
    "";

  const requirements =
    item.requirements ??
    item.admission_requirements ??
    "";

  const visaInformation =
    item.visa_information ??
    item.visa_requirements ??
    "";

  const applicationProcess =
    item.application_process ??
    item.process ??
    "";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Study Abroad"
        title={
          item.title ??
          `Study in ${country}`
        }
        intro={
          item.short_description ??
          `Explore study opportunities in ${country} with Brilliant Mind Travel and Tours.`
        }
        image={item.featured_image}
      />

      <section className="bg-background py-16 md:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            {description ? (
              <Reveal>
                <SectionHeading
                  eyebrow={`Study in ${country}`}
                  title={`Study abroad opportunities in ${country}`}
                />

                <Prose
                  className="mt-6"
                  text={description}
                />
              </Reveal>
            ) : null}

            {requirements ? (
              <Reveal>
                <SectionHeading
                  eyebrow="Requirements"
                  title={`Requirements to study in ${country}`}
                />

                <Prose
                  className="mt-6"
                  text={requirements}
                />
              </Reveal>
            ) : null}

            {visaInformation ? (
              <Reveal>
                <SectionHeading
                  eyebrow="Visa guidance"
                  title={`${country} student visa guidance`}
                />

                <Prose
                  className="mt-6"
                  text={visaInformation}
                />
              </Reveal>
            ) : null}

            {applicationProcess ? (
              <Reveal>
                <SectionHeading
                  eyebrow="Application process"
                  title={`How to apply to study in ${country}`}
                />

                <Prose
                  className="mt-6"
                  text={applicationProcess}
                />
              </Reveal>
            ) : null}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-7">
              <SectionHeading
                eyebrow="Study abroad consultation"
                title={`Plan your studies in ${country}`}
              />

              <div className="mt-6">
                <WhatsAppButton
                  whatsapp={settings?.whatsapp}
                  message={`Hello Brilliant Mind Travel and Tours, I would like to enquire about studying in ${country}.`}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-7">
              <h2 className="text-lg text-navy">
                Send an enquiry
              </h2>

              <div className="mt-5">
                <InquiryForm
                  relatedType="study_abroad_country"
                  relatedId={item.id}
                  defaultSubject={`Study in ${country}`}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
