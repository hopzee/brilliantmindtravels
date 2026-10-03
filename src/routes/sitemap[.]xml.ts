import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://www.brilliantmindtravels.com";

type SitemapItem = {
  slug: string;
  updated_at?: string | null;
  published_at?: string | null;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getSupabaseConfig() {
  const url =
    import.meta.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";

  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    "";

  return {
    url: url.replace(/\/+$/, ""),
    key,
  };
}

async function fetchPublishedItems(
  table: string,
): Promise<SitemapItem[]> {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    return [];
  }

  try {
    const endpoint =
      `${url}/rest/v1/${table}` +
      `?select=slug,updated_at,published_at` +
      `&status=eq.published` +
      `&order=updated_at.desc`;

    const response = await fetch(endpoint, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Sitemap: failed to load ${table}: ${response.status}`,
      );
      return [];
    }

    const data = (await response.json()) as SitemapItem[];

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Sitemap: failed to load ${table}:`, error);
    return [];
  }
}

function createUrl(
  path: string,
  lastModified?: string | null,
) {
  const lastmod = lastModified
    ? `<lastmod>${escapeXml(lastModified)}</lastmod>`
    : "";

  return `  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>
    ${lastmod}
  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [
          blogPosts,
          services,
          tours,
          studyAbroadCountries,
        ] = await Promise.all([
          fetchPublishedItems("blog_posts"),
          fetchPublishedItems("services"),
          fetchPublishedItems("tour_packages"),
          fetchPublishedItems("study_abroad_countries"),
        ]);

        const staticPages = [
          {
            path: "/",
          },
          {
            path: "/about",
          },
          {
            path: "/services",
          },
          {
            path: "/tours",
          },
          {
            path: "/blog",
          },
          {
            path: "/testimonials",
          },
          {
            path: "/reviews",
          },
          {
            path: "/faq",
          },
          {
            path: "/downloads",
          },
          {
            path: "/contact",
          },
        ];

        const urls = [
          ...staticPages.map((page) =>
            createUrl(page.path),
          ),

          ...services.map((item) =>
            createUrl(
              `/services/${encodeURIComponent(item.slug)}`,
              item.updated_at || item.published_at,
            ),
          ),

          ...tours.map((item) =>
            createUrl(
              `/tours/${encodeURIComponent(item.slug)}`,
              item.updated_at || item.published_at,
            ),
          ),

          ...studyAbroadCountries.map((item) =>
            createUrl(
              `/study-abroad/${encodeURIComponent(item.slug)}`,
              item.updated_at || item.published_at,
            ),
          ),

          ...blogPosts.map((item) =>
            createUrl(
              `/blog/${encodeURIComponent(item.slug)}`,
              item.updated_at || item.published_at,
            ),
          ),
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls.join("\n")}
</urlset>`;

        return new Response(sitemap, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control":
              "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
