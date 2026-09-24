import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { enquiryMessage, publishedItem } from "@/lib/cms";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const label = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const title = `${label} in Ede, Osun | Brilliant Mind Travels & Tours`;

    const description = `Brilliant Mind Travels & Tours offers ${label} support in Ede, Osun, with professional travel consultancy guidance.`;

    const canonicalUrl = `https://www.brilliantmindtravels.com/services/${params.slug}`;

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

  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { data: s } = useSettings();
  const { data, isLoading } = useQuery(publishedItem("services", slug));
  const item = data as any;

  if (isLoading) return <DetailSkeleton />;
  if (!item) return <NotAvailable />;

  const faqs = Array.isArray(item.faqs) ? (item.faqs as any[]) : [];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Brilliant Mind Travels & Tours"
        title={item.title}
        intro={
          item.short_description ??
          `${item.title} support from Brilliant Mind Travels & Tours in Ede, Osun.`
        }
        image={item.featured_image}
      />

      <section className="bg-background py-16 md:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            <Reveal>
              <Prose text={item.description} />
            </Reveal>

            {item.requirements ? (
              <Reveal>
                <h2 className="text-2xl text-navy">
                  {item.title} requirements
                </h2>
                <Prose className="mt-4" text={item.requirements} />
              </Reveal>
            ) : null}

            {item.processing_info ? (
              <Reveal>
                <h2 className="text-2xl text-navy">
                  {item.title} processing & timelines
                </h2>
                <Prose className="mt-4" text={item.processing_info} />
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

            {faqs.length ? (
              <Reveal>
                <h2 className="text-2xl text-navy">
                  Frequently asked questions about {item.title}
                </h2>

                <Accordion type="single" collapsible className="mt-4">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base text-navy">
                        {f.question ?? f.q}
                      </AccordionTrigger>

                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {f.answer ?? f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            ) : null}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-7">
              <SectionHeading
                eyebrow="Get started"
                title={`Talk to a consultant about ${item.title}`}
              />

              <div className="mt-6 flex flex-col gap-3">
                <WhatsAppButton
                  whatsapp={s?.whatsapp}
                  message={enquiryMessage(s?.company_name, item.title)}
                />

                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Book a consultation</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-7">
              <h2 className="text-lg text-navy">
                Ask about {item.title}
              </h2>

              <div className="mt-5">
                <InquiryForm
                  relatedType="service"
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

export function DetailSkeleton() {
  return (
    <SiteLayout>
      <div className="container-page pt-40 pb-20">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="mt-4 h-5 w-1/2" />
        <Skeleton className="mt-10 h-64 w-full rounded-xl" />
      </div>
    </SiteLayout>
  );
}

export function NotAvailable() {
  return (
    <SiteLayout>
      <div className="container-page pt-40 pb-24 text-center">
        <h1 className="text-3xl text-navy">
          This page isn't available
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          The content you're looking for may have been moved or is not yet
          published.
        </p>

        <Button asChild variant="outline" className="mt-8">
          <Link to="/">
            <ArrowLeft className="size-4" />
            Back home
          </Link>
        </Button>
      </div>
    </SiteLayout>
  );
}
