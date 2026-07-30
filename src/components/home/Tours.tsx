import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { fallbackImages, imageOr, publishedList } from "@/lib/cms";
import { CardSkeletons, EmptyState, Reveal, SectionHeading } from "@/components/public/ui";

export function formatPrice(price: number | null, currency: string | null) {
  if (price == null) return null;
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency ?? ""} ${price}`.trim();
  }
}

export function TourCard({ tour }: { tour: any }) {
  const price = formatPrice(tour.price, tour.currency);
  return (
    <Link
      to="/tours/$slug"
      params={{ slug: tour.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
    >
      <img
        src={imageOr(tour.featured_image, fallbackImages.hero)}
        alt={tour.title}
        loading="lazy"
        decoding="async"
        className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg text-navy">{tour.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{tour.short_description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {tour.destination ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-gold" /> {tour.destination}
            </span>
          ) : null}
          {tour.duration ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-gold" /> {tour.duration}
            </span>
          ) : null}
        </div>
        {price ? (
          <p className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-navy">
            {price}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export function Tours() {
  const { data, isLoading } = useQuery(publishedList("tour_packages", { limit: 3 }));

  return (
    <section className="surface-soft py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Curated travel" title="Tour packages" />
          <Button asChild variant="outline" size="lg">
            <Link to="/tours">
              All packages <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12">
          {isLoading ? (
            <CardSkeletons count={3} />
          ) : !data?.length ? (
            <EmptyState
              title="Packages coming soon"
              text="New tour packages are being curated. Contact us for a tailor-made itinerary."
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
      </div>
    </section>
  );
}