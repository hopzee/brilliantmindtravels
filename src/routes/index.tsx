import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/public/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Promotions } from "@/components/home/Promotions";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { Reveal } from "@/components/public/ui";
import consultationImage from "@/assets/consultation.jpg";
import homeTeam1 from "@/assets/home-team-1.jpg";
const title =
  "Brilliant Mind Travels & Tours | Travel & Study Abroad in Ede, Osun";
const description =
  "Brilliant Mind Travels & Tours is a travel and educational consultancy in Ede, Osun, providing travel, visa guidance, study abroad, flight booking and tourism services.";
const canonicalUrl = "const canonicalUrl = "https://www.brilliantmindtravels.com/";
export const Route = createFileRoute("/")({
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
        content: "Brilliant Mind Travels & Tours",
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
        content: "Brilliant Mind Travels & Tours",
      },
      {
        property: "og:locale",
        content: "en_NG",
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
    ],
  }),
  component: HomePage,
});
function HomeAboutImages() {
  const [showSecondImage, setShowSecondImage] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSecondImage(true);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container-page">
        <Reveal>
          <img
            src={showSecondImage ? homeTeam1 : consultationImage}
            alt="Brilliant Mind Travels & Tours travel and educational consultancy in Ede, Osun"
            width={1200}
            height={912}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <HomeAboutImages />
      <Services />
      <Promotions />
      <Testimonials />
      <Faq />
      <WhatsAppCta />
    </SiteLayout>
  );
}
