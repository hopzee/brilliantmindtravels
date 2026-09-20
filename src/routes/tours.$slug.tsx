import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  Gallery,
  PageHero,
  Prose,
  Reveal,
  useSettings,
  WhatsAppButton,
} from "@/components/public/ui";
import { InquiryForm } from "@/components/public/LeadForms";
import { Button } from "@/components/ui/button";
import { DetailSkeleton, NotAvailable } from "./services.$slug";
import { formatPrice } from "@/components/home/Tours";
import { enquiryMessage, publishedItem } from "@/lib/cms";
export const Route = createFileRoute("/tours/$slug")({
  head: ({ params }) => {
    const label = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    const title = `${label} Tour Package | Brilliant Mind Travels & Tours`;
    const description = `Explore the ${label} tour package from Brilliant Mind Travels & Tours in Ede, Osun. View the itinerary, inclusions, pricing and travel details.`;
    const canonicalUrl = `https://www.brilliantmindtravels.com/tours/${params.slug}`;
    return {
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
  if (isLoading) return <DetailSkeleton />;
  if (!item) return <NotAvailable />;
  const itinerary = Array.isArray(item.itinerary)
    ? (item.itinerary as any[])
    : [];
  const price = formatPrice(item.price, item.currency);
  return (
    <SiteLayout>
      <PageHero
        eyebrow={item.destination ?? "Tour package"}
        title={item.title}
        intro={item.short_description}
        image={item.featured_image}
      />
      <section className="bg-background py-16 md:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            <Reveal>
              <Prose text={item.description} />
            </Reveal>
            {itinerary.length ? (
              <Reveal>
                <h2 className="text-2xl text-navy">Tour Itinerary</h2>
                <ol className="mt-5 space-y-5">
                  {itinerary.map((d: any, i: number) => (
                    <li
                      key={i}
                      className="rounded-lg surface-soft p-5"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                        Day {d.day ?? i + 1}
                      </span>
                      <h3 className="mt-2 text-base text-navy">
                        {d.title}
                      </h3>
                      {d.description ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {d.description}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </Reveal>
            ) : null}
            <div className="grid gap-6 sm:grid-cols-2">
              {item.included_services?.length ? (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="text-base text-navy">
                    What is included
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {item.included_services.map((x: string) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.excluded_services?.length ? (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="text-base text-navy">
                    What is not included
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {item.excluded_services.map((x: string) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            {item.gallery_images?.length ? (
              <Reveal>
                <h2 className="text-2xl text-navy">
                  Tour Gallery
                </h2>
                <div className="mt-5">
                  <Gallery
                    images={item.gallery_images}
                    alt={item.title}
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-7">
              {price ? (
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
                  {price}
                </p>
              ) : null}
              <p className="mt-2 text-sm text-muted-foreground">
                Payments are arranged directly with our team, never online.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <WhatsAppButton
                  whatsapp={s?.whatsapp}
                  message={enquiryMessage(
                    s?.company_name,
                    `${item.title} tour package`,
                  )}
                />
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Book a consultation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-7">
              <h2 className="text-lg text-navy">
                Request this tour package
              </h2>
              <div className="mt-5">
                <InquiryForm
                  relatedType="tour_package"
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
