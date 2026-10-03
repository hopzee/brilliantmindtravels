import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/public/SiteLayout";
import { PageHero } from "@/components/public/ui";
import { Tours } from "@/components/home/Tours";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";

const title =
  "Tour Packages & Travel Experiences | Brilliant Mind Travel and Tours";

const description =
  "Explore tour packages and travel experiences from Brilliant Mind Travel and Tours in Ede, Osun State, Nigeria.";

const canonicalUrl = "https://www.brilliantmindtravels.com/tours";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    links: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Brilliant Mind Travel and Tours" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      {
        property: "og:site_name",
        content: "Brilliant Mind Travel and Tours",
      },
      { property: "og:locale", content: "en_NG" },
      {
        property: "og:image",
        content: "https://www.brilliantmindtravels.com/og-image.png",
      },
      {
        property: "og:image:alt",
        content:
          "Brilliant Mind Travel and Tours - Tour Packages and Travel Experiences",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      {
        name: "twitter:image",
        content: "https://www.brilliantmindtravels.com/og-image.png",
      },
    ],
  }),

  component: ToursPage,
});

function ToursPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tour Packages"
        title="Explore Our Travel Experiences"
        intro="Discover carefully planned tour packages and travel experiences with Brilliant Mind Travel and Tours."
      />

      <Tours />
      <WhatsAppCta />
    </SiteLayout>
  );
}
