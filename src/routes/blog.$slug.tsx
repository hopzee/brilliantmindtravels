import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import { Gallery, PageHero, Prose } from "@/components/public/ui";
import { DetailSkeleton, NotAvailable } from "./services.$slug";
import { formatDate } from "@/components/home/Blog";
import { publishedItem } from "@/lib/cms";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const label = params.slug.replace(/-/g, " ");
    const title = `${label} | Brilliant Mind Travels & Tours Blog`;
    const description = `Read "${label}" — travel, visa and study abroad insights from Brilliant Mind Travels & Tours.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PostDetail,
});

function PostDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery(publishedItem("blog_posts", slug));
  const post = data as any;

  if (isLoading) return <DetailSkeleton />;
  if (!post) return <NotAvailable />;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={post.category ?? "Article"}
        title={post.title}
        intro={post.excerpt}
        image={post.featured_image}
      />
      <article className="bg-background py-16">
        <div className="container-page max-w-3xl">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {[post.author_name, formatDate(post.published_at ?? post.created_at)]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <Prose className="mt-8" text={post.content} />
          {post.gallery_images?.length ? (
            <div className="mt-10">
              <Gallery images={post.gallery_images} alt={post.title} />
            </div>
          ) : null}
          {post.tags?.length ? (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((t: string) => (
                <span key={t} className="rounded-full surface-soft px-3 py-1 text-xs text-navy">
                  #{t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </SiteLayout>
  );
}