import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/public/SiteLayout";
import { PageHero } from "@/components/public/ui";
import { LatestBlog } from "@/components/home/LatestBlog";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";

const title =
  "Travel & Visa Blog | Brilliant Mind Travel and Tours";

const description =
  "Read travel, visa, study abroad and tourism updates from Brilliant Mind Travel and Tours in Ede, Osun State, Nigeria.";

const canonicalUrl = "https://www.brilliantmindtravels.com/blog";

const ogImageUrl =
  "https://www.brilliantmindtravels.com/og-image.png";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    links: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],

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
          "Brilliant Mind Travel and Tours - Travel and Visa Blog",
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
  }),

  component: BlogPage,
});

function BlogPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Travel & Visa Updates"
        title="Travel, Visa & Study Abroad Insights"
        intro="Stay informed with travel updates, visa guidance, study abroad information and useful advice from Brilliant Mind Travel and Tours."
      />

      <LatestBlog />

      <WhatsAppCta />
    </SiteLayout>
  );
}
