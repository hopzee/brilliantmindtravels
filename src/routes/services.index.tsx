import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import { PageHero } from "@/components/public/ui";
import { Services } from "@/components/home/Services";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { settingsQuery } from "@/lib/cms";

const title =
  "Travel, Visa & Study Abroad Services in Ede, Osun | Brilliant Mind Travel and Tours";

const description =
  "Brilliant Mind Travel and Tours offers travel, visa guidance, study abroad, flight booking and tourism services in Ede, Osun State.";

const canonicalUrl = "https://www.brilliantmindtravels.com/services";

const ogImageUrl =
  "https://www.brilliantmindtravels.com/og-image.png";

export const Route = createFileRoute("/services/")({
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
      {
        name: "author",
        content: "Brilliant Mind Travel and Tours",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      {
        property: "og:site_name",
        content: "Brilliant Mind Travel and Tours",
      },
      { property: "og:locale", content: "en_NG" },
      { property: "og:image", content: ogImageUrl },
      {
        property: "og:image:alt",
        content:
          "Brilliant Mind Travel and Tours - Travel, Visa and Study Abroad Services",
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

  component: ServicesPage,
});

function ServicesPage() {
  const { data: s } = useQuery(settingsQuery);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Travel, Visa & Study Abroad Services"
        title="Travel and Consultancy Services in Ede, Osun"
        intro={
          s?.promise ??
          "Brilliant Mind Travel and Tours provides travel, visa guidance, study abroad and tourism support for individuals and families."
        }
        image={s?.hero_image_url}
      />

      <Services />
      <WhatsAppCta />
    </SiteLayout>
  );
}
