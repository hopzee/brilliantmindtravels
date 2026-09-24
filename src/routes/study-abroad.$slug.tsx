import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2, ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  Gallery,
  PageHero,
  Prose,
  Reveal,
  SectionHeading,
  useSettings,
  WhatsAppButton,
} from "@/components/public/ui";
import { InquiryForm } from "@/components/public/LeadForms";
import { Button } from "@/components/ui/button";
import { DetailSkeleton, NotAvailable } from "./services.$slug";
import {
  enquiryMessage,
  publishedItem,
  universitiesForCountry,
} from "@/lib/cms";

export const Route = createFileRoute("/study-abroad/$slug")({
  head: ({ params }) => {
    const label = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const title = `Study in ${label} | Brilliant Mind Travels & Tours`;

    const description = `Study in ${label} with Brilliant Mind Travels & Tours in Ede, Osun. Get admission guidance, tuition information, scholarships and student visa support.`;

    const canonicalUrl = `https://www.brilliantmindtravels.com/study-abroad/${params.slug}`;

    return {
      links: [
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ],
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Brilliant Mind Travels & Tours" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
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
    };
  },

  component: CountryDetail,
});

function CountryDetail() {
  const { slug } = Route.useParams();
  const { data: s } = useSettings();

  const { data, isLoading } = useQuery(
    publishedItem("study_abroad_countries", slug),
  );

  const item = data as any;

  const { data: unis } = useQuery({
    ...universitiesForCountry(item?.id ?? ""),
    enabled: Boolean(item?.id),
  });

  if (isLoading) return <DetailSkeleton />;
  if (!item) return <NotAvailable />;

  const blocks = [
    { heading: "Why study there", text: item.why_study_there },
    { heading: "Admission requirements", text: item.admission_requirements },
    { heading: "Visa requirements", text: item.visa_requirements },
    { heading: "Tuition & living costs", text: item.tuition_info },
    { heading: "Scholarships", text: item.scholarships },
  ].filter((b) => Boolean(b.text));

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Study abroad"
        title={`${item.flag_emoji ? `${item.flag_emoji} ` : ""}Study in ${item.title}`}
        intro={
          item.short_description ??
          `Explore study opportunities, admission requirements and student visa guidance for ${item.title}.`
        }
        image={item.featured_image}
      />

      <section className="bg-background py-16 md:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            <Reveal>
              <Prose text={item.description} />
            </Reveal>

            {blocks.map((b) => (
              <Reveal key={b.heading}>
                <h2 className="text-2xl text-navy">{b.heading}</h2>
                <Prose className="mt-4" text={b.text} />
              </Reveal>
            ))}

            {unis?.length ? (
              <Reveal>
                <h2 className="text-2xl text-navy">Partner universities</h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {unis.map((u: any) => (
                    <div
                      key={u.id}
                      className="rounded-lg border border-border bg-card p-5"
                    >
                      <span className="inline-flex size-9 items-center justify-center rounded-md bg-navy/5 text-navy">
                        <Building2 className="size-4" />
                      </span>

                      <h3 className="mt-4 text-base text-navy">
                        {u.title}
                      </h3>

                      {u.city ? (
                        <p className="text-xs text-muted-foreground">
                          {u.city}
                        </p>
                      ) : null}

                      {u.description ? (
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                          {u.description}
                        </p>
                      ) : null}

                      {u.website_url ? (
                        <a
                          href={u.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-gold"
                        >
                          Visit website
                          <ExternalLink className="size-3.5" />
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {item.gallery_images?.length ? (
              <Reveal>
                <h2 className="text-2xl text-navy">Gallery</h2>

                <div className="mt-5">
                  <Gallery images={item.gallery_images} alt={item.title} />
                </div>
              </Reveal>
            ) : null}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-7">
              <SectionHeading
                eyebrow="Get started"
                title={`Apply to study in ${item.title}`}
              />

              <div className="mt-6 flex flex-col gap-3">
                <WhatsAppButton
                  whatsapp={s?.whatsapp}
                  message={enquiryMessage(
                    s?.company_name,
                    `study abroad opportunities in ${item.title}`,
                  )}
                />

                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Book a consultation</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-7">
              <h2 className="text-lg text-navy">
                Request {item.title} study details
              </h2>

              <div className="mt-5">
                <InquiryForm
                  relatedType="study_abroad_country"
                  relatedId={item.id}
                  defaultSubject={`Study in ${item.title}`}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
