import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Facebook,
  Image as ImageIcon,
  Instagram,
  MessageCircle,
  Play,
  Twitter,
} from "lucide-react";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  Gallery,
  PageHero,
  Prose,
} from "@/components/public/ui";
import { DetailSkeleton, NotAvailable } from "./services.$slug";
import { BlogCard, formatDate } from "@/components/home/Blog";
import { publishedItem, publishedList } from "@/lib/cms";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const label = params.slug.replace(/-/g, " ");
    const title = `${label} | Brilliant Mind Travels & Tours Blog`;
    const description = `Read "${label}" for travel, visa, study abroad, work opportunity and travel updates from Brilliant Mind Travels & Tours.`;

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

  const { data, isLoading } = useQuery(
    publishedItem("blog_posts", slug),
  );

  const { data: recentPosts } = useQuery(
    publishedList("blog_posts", {
      orderBy: "published_at",
      limit: 4,
    }),
  );

  const post = data as any;

  if (isLoading) return <DetailSkeleton />;
  if (!post) return <NotAvailable />;

  const relatedPosts =
    recentPosts?.filter((item: any) => item.slug !== post.slug) ?? [];

  const galleryImages = post["gallery-images"] ?? [];

  const socialLinks = [
    {
      name: "TikTok",
      url: post.tiktok_url,
      label: "Watch on TikTok",
      className:
        "border-border bg-card text-navy hover:border-navy hover:bg-navy hover:text-white",
    },
    {
      name: "Facebook",
      url: post.facebook_url,
      label: "View on Facebook",
      icon: Facebook,
      className:
        "border-border bg-card text-navy hover:border-navy hover:bg-navy hover:text-white",
    },
    {
      name: "YouTube",
      url: post.youtube_url,
      label: "Watch on YouTube",
      icon: Play,
      className:
        "border-border bg-card text-navy hover:border-navy hover:bg-navy hover:text-white",
    },
    {
      name: "WhatsApp",
      url: post.whatsapp_url,
      label: "Chat on WhatsApp",
      icon: MessageCircle,
      className:
        "border-border bg-card text-navy hover:border-navy hover:bg-navy hover:text-white",
    },
    {
      name: "Instagram",
      url: post.instagram_url,
      label: "View on Instagram",
      icon: Instagram,
      className:
        "border-border bg-card text-navy hover:border-navy hover:bg-navy hover:text-white",
    },
    {
      name: "X",
      url: post.twitter_url,
      label: "View on X",
      icon: Twitter,
      className:
        "border-border bg-card text-navy hover:border-navy hover:bg-navy hover:text-white",
    },
    {
      name: "Threads",
      url: post.threads_url,
      label: "View on Threads",
      className:
        "border-border bg-card text-navy hover:border-navy hover:bg-navy hover:text-white",
    },
    {
      name: "Image",
      url: post.image_url,
      label: "Open image",
      icon: ImageIcon,
      className:
        "border-border bg-card text-navy hover:border-navy hover:bg-navy hover:text-white",
    },
  ].filter((item) => item.url);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={post.category ?? "Article"}
        title={post.title}
        intro={post.excerpt}
        image={post.featured_image}
      />

      <article className="bg-background py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {post.category ? (
                <span className="text-gold">
                  {formatCategory(post.category)}
                </span>
              ) : null}

              {post.author_name ? (
                <>
                  <span>•</span>
                  <span>{post.author_name}</span>
                </>
              ) : null}

              {(post.published_at ?? post.created_at) ? (
                <>
                  <span>•</span>
                  <span>
                    {formatDate(post.published_at ?? post.created_at)}
                  </span>
                </>
              ) : null}
            </div>

            <Prose className="mt-8" text={post.content} />

            {galleryImages.length ? (
              <div className="mt-12">
                <Gallery
                  images={galleryImages}
                  alt={post.title}
                />
              </div>
            ) : null}

            {socialLinks.length > 0 ? (
              <div className="mt-12 border-t border-border pt-8">
                <p className="eyebrow text-gold">Related Links</p>

                <h2 className="mt-2 text-2xl text-navy">
                  Follow or view this update
                </h2>

                <div className="mt-6 flex flex-wrap gap-3">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${item.className}`}
                      >
                        {Icon ? (
                          <Icon className="size-4" />
                        ) : (
                          <span className="text-sm font-bold">
                            {item.name === "TikTok" ? "♪" : "@"}
                          </span>
                        )}

                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {post.tags?.length ? (
              <div className="mt-12 border-t border-border pt-6">
                <p className="mb-3 text-sm font-semibold text-navy">
                  Tags
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full surface-soft px-3 py-1.5 text-xs text-navy"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {relatedPosts.length > 0 ? (
            <section className="mx-auto mt-20 max-w-6xl border-t border-border pt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-gold">Keep reading</p>
                  <h2 className="mt-2 text-2xl text-navy md:text-3xl">
                    More from Brilliant Mind
                  </h2>
                </div>

                <Link
                  to="/blog"
                  className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
                >
                  View all articles
                </Link>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.slice(0, 3).map((item: any) => (
                  <BlogCard key={item.id} post={item} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </SiteLayout>
  );
}

function formatCategory(value?: string | null) {
  if (!value) return "Article";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
