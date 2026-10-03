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

export const Route = createFileRoute("/tours/$slug")({
  head: ({ params }) => {
    const label = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const title = `${label} | Brilliant Mind Travel and Tours`;

    const description = `Explore ${label} with Brilliant Mind Travel and Tours in Ede, Osun, Nigeria. Get travel planning and tour package information.`;

    const canonicalUrl =
      `https://www.brilliantmindtravels.com/tours/${params.slug}`;

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
            "Brilliant Mind Travel and Tours - Tour Package",
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

  component: TourDetail,
});

function TourDetail() {
  const { slug } = Route.useParams();

  const { data: s } = useSettings();

  const { data, isLoading } = useQuery(
    publishedItem("tour_packages", slug),
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
            Tour package not available
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            This tour package may have been moved or is not currently
            published.
          </p>
        </div>
      </SiteLayout>
    );
  }

  const galleryImages = Array.isArray(item.gallery_images)
    ? item.gallery_images
    : [];

  const destination =
    item.destination ??
    item.location ??
    item.country ??
    "";

  const duration =
    item.duration ??
    item.duration_text ??
    "";

  const price =
    item.price ??
    item.price_text ??
    "";

  const overview =
    item.description ??
    item.overview ??
    item.short_description ??
    "";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tour Package"
        title={item.title}
        intro={
          item.short_description ??
          `Explore ${item.title} with Brilliant Mind Travel and Tours.`
        }
        image={item.featured_image}
      />

      <section className="bg-background py-16 md:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-10">
            {(destination || duration || price) && (
              <Reveal>
                <div className="grid gap-4 sm:grid-cols-3">
                  {destination ? (
                    <div className="rounded-xl border border-border bg-card p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        Destination
                      </p>
                      <p className="mt-2 text-sm font-semibold text-navy">
                        {destination}
                      </p>
                    </div>
                  ) : null}

                  {duration ? (
                    <div className="rounded-xl border border-border bg-card p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        Duration
                      </p>
                      <p className="mt-2 text-sm font-semibold text-navy">
                        {duration}
                      </p>
                    </div>
                  ) : null}

                  {price ? (
                    <div className="rounded-xl border border-border bg-card p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        Package
                      </p>
                      <p className="mt-2 text-sm font-semibold text-navy">
                        {price}
                      </p>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            )}

            {overview ? (
              <Reveal>
                <SectionHeading
                  eyebrow="Tour details"
                  title={`About ${item.title}`}
                />

                <Prose
                  className="mt-6"
                  text={overview}
                />
              </Reveal>
            ) : null}

            {item.itinerary ? (
              <Reveal>
                <SectionHeading
                  eyebrow="Itinerary"
                  title="What the trip includes"
                />

                <Prose
                  className="mt-6"
                  text={item.itinerary}
                />
              </Reveal>
            ) : null}

            {item.inclusions ? (
              <Reveal>
                <SectionHeading
                  eyebrow="Included"
                  title="What's included"
                />

                <Prose
                  className="mt-6"
                  text={item.inclusions}
                />
              </Reveal>
            ) : null}

            {item.exclusions ? (
              <Reveal>
                <SectionHeading
                  eyebrow="Not included"
                  title="What's not included"
                />

                <Prose
                  className="mt-6"
                  text={item.exclusions}
                />
              </Reveal>
            ) : null}

            {galleryImages.length > 0 ? (
              <Reveal>
                <SectionHeading
                  eyebrow="Gallery"
                  title={`Images from ${item.title}`}
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {galleryImages.map(
                    (image: string, index: number) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`${item.title} tour image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-64 w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
                      />
                    ),
                  )}
                </div>
              </Reveal>
            ) : null}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-7">
              <SectionHeading
                eyebrow="Plan your trip"
                title={`Ask about ${item.title}`}
              />

              <div className="mt-6">
                <WhatsAppButton
                  whatsapp={s?.whatsapp}
                  message={`Hello Brilliant Mind Travel and Tours, I would like to enquire about the ${item.title} tour package.`}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-7">
              <h2 className="text-lg text-navy">
                Send an enquiry
              </h2>

              <div className="mt-5">
                <InquiryForm
                  relatedType="tour"
                  relatedId={item.id}
                  defaultSubject={item.title}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
