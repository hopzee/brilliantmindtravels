import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { fallbackImages, imageOr, publishedList } from "@/lib/cms";
import { CardSkeletons, EmptyState, Reveal, SectionHeading } from "@/components/public/ui";

export function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: any }) {
  const date = formatDate(post.published_at ?? post.created_at);
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
    >
      <img
        src={imageOr(post.featured_image, fallbackImages.consultation)}
        alt={post.title}
        loading="lazy"
        decoding="async"
        className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-6">
        {post.category ? <span className="eyebrow text-navy/60">{post.category}</span> : null}
        <h3 className="mt-3 text-lg leading-snug text-navy">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        {date ? (
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5 text-gold" /> {date}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export function LatestBlog() {
  const { data, isLoading } = useQuery(
    publishedList("blog_posts", { orderBy: "published_at", limit: 3 }),
  );

  return (
    <section className="surface-soft py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Travel & migration updates" />
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">
              Visit the blog <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12">
          {isLoading ? (
            <CardSkeletons count={3} />
          ) : !data?.length ? (
            <EmptyState
              title="Articles coming soon"
              text="Visa tips, study abroad guides and travel updates will be published here."
            />
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
      </div>
    </section>
  );
}