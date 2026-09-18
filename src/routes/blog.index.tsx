import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  CardSkeletons,
  EmptyState,
  PageHero,
  Reveal,
} from "@/components/public/ui";
import { BlogCard } from "@/components/home/Blog";
import { publishedList } from "@/lib/cms";
import { Button } from "@/components/ui/button";

const title =
  "Travel, Visa & Study Abroad Blog | Brilliant Mind Travels & Tours";

const description =
  "Read travel updates, visa information, study abroad opportunities, scholarships, work opportunities and useful travel tips from Brilliant Mind Travels & Tours in Ede, Osun.";

const categories = [
  { value: "all", label: "All" },
  { value: "visa-travel", label: "Visa & Travel" },
  { value: "study-abroad", label: "Study Abroad" },
  { value: "work-opportunities", label: "Work Opportunities" },
  { value: "scholarships", label: "Scholarships" },
  { value: "offers-promotions", label: "Offers & Promotions" },
  { value: "events-activities", label: "Events & Activities" },
  { value: "travel-tips", label: "Travel Tips" },
  { value: "company-news", label: "Company News" },
];

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data, isLoading } = useQuery(
    publishedList("blog_posts", {
      orderBy: "published_at",
    }),
  );

  const filteredPosts = useMemo(() => {
    if (!data) return [];

    if (activeCategory === "all") {
      return data;
    }

    return data.filter(
      (post: any) => post.category === activeCategory,
    );
  }, [data, activeCategory]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Brilliant Mind Travels & Tours Blog"
        title="Travel, Visa & Study Abroad Updates"
        intro="Useful travel information, visa updates, study abroad opportunities, scholarships, work opportunities and company news from Brilliant Mind Travels & Tours."
      />

      <section className="bg-background py-16 md:py-20">
        <div className="container-page">
          <div className="mb-10 overflow-x-auto">
            <div className="flex min-w-max gap-2 pb-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  type="button"
                  variant={
                    activeCategory === category.value
                      ? "gold"
                      : "outlineNavy"
                  }
                  onClick={() => setActiveCategory(category.value)}
                  className="whitespace-nowrap"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <CardSkeletons />
          ) : !data?.length ? (
            <EmptyState
              title="Articles coming soon"
              text="Travel updates, opportunities and useful information will be published here."
            />
          ) : !filteredPosts.length ? (
            <EmptyState
              title="No posts in this category yet"
              text="Check another category or come back later for new updates."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post: any, i: number) => (
                <Reveal key={post.id} delay={i * 60}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
