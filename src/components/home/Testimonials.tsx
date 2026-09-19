import { ArrowRight, Quote, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { publishedList } from "@/lib/cms";
import {
  CardSkeletons,
  EmptyState,
  Reveal,
  SectionHeading,
} from "@/components/public/ui";
export function Stars({ rating }: { rating?: number | null }) {
  if (!rating) return null;
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "size-4 fill-gold text-gold"
              : "size-4 text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
}
function youtubeEmbed(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : null;
}
export function TestimonialCard({ item }: { item: any }) {
  const embed = item.video_url
    ? youtubeEmbed(item.video_url)
    : null;
  const hasName =
    typeof item.client_name === "string" &&
    item.client_name.trim().length > 0;
  const hasContent =
    typeof item.content === "string" &&
    item.content.trim().length > 0;
  const hasRating = Boolean(item.rating);
  const serviceDetails = [
    item.service_used,
    item.country,
  ]
    .filter(Boolean)
    .join(" · ");
  const hasServiceDetails = serviceDetails.length > 0;
  const hasDetails =
    hasContent ||
    hasName ||
    hasRating ||
    hasServiceDetails;
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      {embed ? (
        <iframe
          src={embed}
          title={
            hasName
              ? `${item.client_name} video testimonial`
              : "Client video testimonial"
          }
          loading="lazy"
          allowFullScreen
          className="aspect-video w-full"
        />
      ) : item.video_url ? (
        <video
          src={item.video_url}
          controls
          preload="none"
          className="aspect-video w-full bg-navy"
        />
      ) : item.featured_image ? (
        <img
          src={item.featured_image}
          alt={
            hasName
              ? `${item.client_name} testimonial`
              : "Client testimonial"
          }
          loading="lazy"
          decoding="async"
          className="aspect-video w-full object-cover"
        />
      ) : null}
      {hasDetails && (
        <div className="flex flex-1 flex-col p-7">
          {hasContent && (
            <>
              <Quote className="size-6 text-gold" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.content}
              </blockquote>
            </>
          )}
          {(hasName || hasRating || hasServiceDetails) && (
            <figcaption
              className={
                hasContent
                  ? "mt-6"
                  : "flex flex-1 flex-col justify-end"
              }
            >
              {hasRating && <Stars rating={item.rating} />}
              {hasName && (
                <p
                  className={
                    hasRating
                      ? "mt-2 font-semibold text-navy"
                      : "font-semibold text-navy"
                  }
                >
                  {item.client_name}
                </p>
              )}
              {hasServiceDetails && (
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {serviceDetails}
                </p>
              )}
            </figcaption>
          )}
        </div>
      )}
    </figure>
  );
}
export function Testimonials() {
  const { data, isLoading } = useQuery(
    publishedList("testimonials", { limit: 3 }),
  );
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Client stories"
            title="Success that speaks for itself"
          />
          <Button asChild variant="outline" size="lg">
            <Link to="/testimonials">
              All stories <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12">
          {isLoading ? (
            <CardSkeletons count={3} />
          ) : !data?.length ? (
            <EmptyState
              title="Stories coming soon"
              text="Client success stories will appear here as soon as they are published."
            />
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {data.map((t: any, i: number) => (
                <Reveal key={t.id} delay={i * 60}>
                  <TestimonialCard item={t} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
