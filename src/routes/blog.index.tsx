import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import { CardSkeletons, EmptyState, PageHero, Reveal } from "@/components/public/ui";
import { BlogCard } from "@/components/home/Blog";
import { publishedList } from "@/lib/cms";

const title = "Blog & Travel Insights | Brilliant Mind Travels & Tours";
const description =
  "Visa tips, study abroad guides, scholarship updates and travel advice from Brilliant Mind Travels & Tours.";

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
  const { data, isLoading } = useQuery(publishedList("blog_posts", { orderBy: "published_at" }));
  return (
    <SiteLayout>
      <PageHero eyebrow="Insights" title="Travel & migration blog" intro="Practical guidance from our consultants." />
      <section className="bg-background py-20">
        <div className="container-page">
          {isLoading ? (
            <CardSkeletons />
          ) : !data?.length ? (
            <EmptyState title="Articles coming soon" text="New articles are being published shortly." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((p: any, i: number) => (
                <Reveal key={p.id} delay={i * 60}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}