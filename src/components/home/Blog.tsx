import { ArrowRight, CalendarDays, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  fallbackImages,
  imageOr,
  publishedList,
} from "@/lib/cms";
import {
  CardSkeletons,
  EmptyState,
  Reveal,
  SectionHeading,
} from "@/components/public/ui";

export function formatDate(value?: string | null) {
  if (!value) return null;

  return new Date(value).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getTikTokEmbedUrl(url?: string | null) {
  if (!url) return null;

  const match = url.match(/\/video\/(\d+)/);

  if (!match) return null;

  return `https://www.tiktok.com/player/v1/${match[1]}?description=1&music_info=1`;
}

function getYouTubeEmbedUrl(url?: string | null) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "").split("/")[0];

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      const pathParts = parsed.pathname.split("/").filter(Boolean);

      if (pathParts[0] === "shorts" && pathParts[1]) {
        return `https://www.youtube.com/embed/${pathParts[1]}`;
      }

      if (pathParts[0] === "embed" && pathParts[1]) {
        return `https://www.youtube.com/embed/${pathParts[1]}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function formatCategory(value?: string | null) {
  if (!value) return null;

  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export function BlogCard({ post }: { post: any }) {
  const date = formatDate(post.published_at ?? post.created_at);

  const tikTokEmbed = getTikTokEmbedUrl(post.tiktok_url);
  const youTubeEmbed = getYouTubeEmbedUrl(post.youtube_url);

  const category = formatCategory(post.category);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      {tikTokEmbed ? (
        <div className="overflow-hidden bg-black">
          <div className="aspect-[9/16] max-h-[520px] w-full">
            <iframe
              src={tikTokEmbed}
              title={`TikTok video: ${post.title}`}
              className="h-full w-full"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </div>
      ) : youTubeEmbed ? (
        <div className="overflow-hidden bg-black">
          <div className="aspect-video w-full">
            <iframe
              src={youTubeEmbed}
              title={`YouTube video: ${post.title}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          aria-label={`Read ${post.title}`}
        >
          <img
            src={imageOr(
              post.featured_image,
              fallbackImages.consultation,
            )}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-6">
        {category ? (
          <span className="eyebrow text-navy/60">
            {category}
          </span>
        ) : null}

        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="block"
        >
          <h3 className="mt-3 text-lg leading-snug text-navy transition-colors hover:text-gold">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {post.excerpt}
        </p>

        {date ? (
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5 text-gold" />
            {date}
          </span>
        ) : null}

        <div className="mt-auto pt-5">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold"
          >
            {tikTokEmbed || youTubeEmbed ? (
              <>
                <Play className="size-4" />
                Open full post
              </>
            ) : (
              <>
                Read article
                <ArrowRight className="size-4" />
              </>
            )}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function LatestBlog() {
  const { data, isLoading } = useQuery(
    publishedList("blog_posts", {
      orderBy: "published_at",
      limit: 3,
    }),
  );

  return (
    <section className="surface-soft py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Insights"
            title="Travel & migration updates"
          />

          <Button asChild variant="outline" size="lg">
            <Link to="/blog">
              Visit the blog
              <ArrowRight className="size-4" />
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
