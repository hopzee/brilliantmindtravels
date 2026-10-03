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
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { reviewsQuery } from "@/lib/cms";

const title =
  "Reviews | Brilliant Mind Travel and Tours in Ede, Osun";

const description =
  "Read customer reviews and experiences with Brilliant Mind Travel and Tours, a travel agency and educational consultancy in Ede, Osun State, Nigeria.";

const canonicalUrl =
  "https://www.brilliantmindtravels.com/reviews";

const ogImageUrl =
  "https://www.brilliantmindtravels.com/og-image.png";

export const Route = createFileRoute("/reviews")({
  head: () => ({
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
        content: "website",
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
          "Customer reviews for Brilliant Mind Travel and Tours",
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
  }),

  component: ReviewsPage,
});

function ReviewsPage() {
  const { data: settings } = useSettings();
  const { data, isLoading } = useQuery(reviewsQuery);

  const reviews = Array.isArray(data) ? data : [];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Customer Reviews"
        title="Reviews of Brilliant Mind Travel and Tours"
        intro={
          settings?.promise ??
          "See what clients have shared about their experience with our travel, visa, study abroad and tourism services."
        }
      />

      <section className="bg-background py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Client experiences"
              title="What our clients say"
            />
          </Reveal>

          {isLoading ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-52 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                title="No reviews available yet"
                text="Customer reviews will appear here as they are published."
              />
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review: any, index) => {
                const name =
                  review.name ??
                  review.full_name ??
                  review.client_name ??
                  "Client";

                const comment =
                  review.comment ??
                  review.review ??
                  review.message ??
                  "";

                const rating =
                  typeof review.rating === "number"
                    ? review.rating
                    : Number(review.rating ?? 0);

                return (
                  <Reveal
                    key={review.id ?? index}
                    delay={index * 50}
                  >
                    <article className="h-full rounded-xl border border-border bg-card p-7">
                      {rating > 0 ? (
                        <div
                          className="flex gap-1 text-gold"
                          aria-label={`${rating} out of 5 stars`}
                        >
                          {Array.from({ length: 5 }).map(
                            (_, starIndex) => (
                              <span key={starIndex}>
                                {starIndex < rating ? "★" : "☆"}
                              </span>
                            ),
                          )}
                        </div>
                      ) : null}

                      {comment ? (
                        <blockquote className="mt-5 text-sm leading-7 text-muted-foreground">
                          “{comment}”
                        </blockquote>
                      ) : null}

                      <div className="mt-6 border-t border-border pt-5">
                        <p className="font-medium text-navy">
                          {name}
                        </p>

                        {review.service ? (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {review.service}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}

          <Reveal className="mt-16">
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <SectionHeading
                eyebrow="Need help?"
                title="Ready to discuss your travel plans?"
              />

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Whether you need visa guidance, study abroad assistance,
                flight booking or a tour package, our team can discuss your
                requirements and explain the next steps.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <WhatsAppCta />
    </SiteLayout>
  );
}
