import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/public/SiteLayout";
import { PageHero } from "@/components/public/ui";
import { Services } from "@/components/home/Services";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { settingsQuery } from "@/lib/cms";

const title = "Our Services | Brilliant Mind Travels & Tours";
const description =
  "Visa assistance, study abroad admissions, work and relocation pathways, flight booking and travel advisory from a trusted Nigerian consultancy.";

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
        eyebrow="What we do"
        title="Consultancy services"
        intro={s?.promise}
        image={s?.hero_image_url}
      />
      <Services />
      <WhatsAppCta />
    </SiteLayout>
  );
}