import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  EmptyState,
  PageHero,
  Reveal,
  SectionHeading,
} from "@/components/public/ui";
import { Stars } from "@/components/home/Testimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cms } from "@/lib/db";
import { approvedReviewsQuery } from "@/lib/cms";

const title =
  "Client Reviews | Brilliant Mind Travels & Tours in Ede, Osun";

const description =
  "Read client reviews about Brilliant Mind Travels & Tours in Ede, Osun and share your experience with our travel, visa, study abroad and tourism services.";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReviewsPage,
});

const schema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(2, "Enter your name")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255)
    .optional()
    .or(z.literal("")),

  rating: z.coerce.number().min(1).max(5),

  content: z
    .string()
    .trim()
    .min(10, "Tell us a little more")
    .max(1500),
});

function ReviewsPage() {
  const { data } = useQuery(approvedReviewsQuery);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = schema.safeParse(
      Object.fromEntries(new FormData(e.currentTarget)),
    );

    if (!parsed.success) {
      return toast.error(parsed.error.issues[0].message);
    }

    setBusy(true);

    const { error } = await cms
      .from("reviews")
      .insert({
        ...parsed.data,
        email: parsed.data.email || null,
      });

    setBusy(false);

    if (error) {
      return toast.error(
        "We couldn't submit your review. Please try again.",
      );
    }

    toast.success(
      "Thank you. Your review is now live on the site.",
    );

    setDone(true);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Brilliant Mind Travels & Tours"
        title="Client Reviews"
        intro="Read reviews from clients about their experience with our travel, visa guidance, study abroad and tourism services."
      />

      <section className="bg-background py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Client Experiences"
              title="What our clients say"
            />

            <div className="mt-8 space-y-5">
              {!data?.length ? (
                <EmptyState
                  title="No reviews yet"
                  text="Be the first to share your experience with Brilliant Mind Travels & Tours."
                />
              ) : (
                data.map((r: any, i: number) => (
                  <Reveal
                    key={r.id}
                    delay={i * 50}
                  >
                    <article className="rounded-xl border border-border bg-card p-6">
                      <Stars rating={r.rating} />

                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {r.content}
                      </p>

                      <p className="mt-4 text-sm font-semibold text-navy">
                        {r.customer_name}
                      </p>
                    </article>
                  </Reveal>
                ))
              )}
            </div>
          </div>

          <aside className="rounded-xl border border-border bg-card p-7 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-lg text-navy">
              Share your experience
            </h2>

            {done ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Thank you. Your review is published immediately unless
                our automatic checks flag it for review.
              </p>
            ) : (
              <form
                onSubmit={submit}
                className="mt-5 space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="customer_name">
                    Your name
                  </Label>

                  <Input
                    id="customer_name"
                    name="customer_name"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email (optional)
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={255}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">
                    Rating (1–5)
                  </Label>

                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min={1}
                    max={5}
                    defaultValue={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">
                    Your review
                  </Label>

                  <Textarea
                    id="content"
                    name="content"
                    rows={5}
                    required
                    maxLength={1500}
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={busy}
                  className="w-full"
                >
                  Submit review
                </Button>
              </form>
            )}
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
