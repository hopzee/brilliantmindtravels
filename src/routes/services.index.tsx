import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import { PageHero } from "@/components/public/ui";
import { Services } from "@/components/home/Services";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { settingsQuery } from "@/lib/cms";

const title =
  "Travel, Visa & Study Abroad Services in Ede, Osun | Brilliant Mind Travels & Tours";

const description =
  "Brilliant Mind Travels & Tours provides travel, visa guidance, study abroad, flight booking, tourism and travel support services in Ede, Osun.";

export const Route = createFileRoute("/services/")({
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
          "Brilliant Mind Travels & Tours provides travel, visa guidance, study abroad and tourism support for individuals and families."
        }
        image={s?.hero_image_url}
      />

      <Services />

      <WhatsAppCta />
    </SiteLayout>
  );
}
