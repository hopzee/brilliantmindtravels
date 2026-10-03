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
import consultationImage from "@/assets/consultation.webp";
import homeTeam1 from "@/assets/home-team-1.jpg";
import logoUrl from "@/assets/brilliant-mind-logo.webp";

const title =
  "Brilliant Mind Travel and Tours | Travel & Study Abroad in Ede, Osun";

const description =
  "Brilliant Mind Travel and Tours in Ede, Osun provides travel, visa guidance, study abroad, flight booking and tourism services.";

const canonicalUrl = "https://www.brilliantmindtravels.com/";

const absoluteLogoUrl = new URL(logoUrl, canonicalUrl).toString();

const ogImageUrl =
  "https://www.brilliantmindtravels.com/og-image.png";

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${canonicalUrl}#travel-agency`,
  name: "Brilliant Mind Travel and Tours",
  url: canonicalUrl,
  logo: absoluteLogoUrl,
  image: ogImageUrl,
  description,
  telephone: "+2348165900571",
  email: "brilliantmindtravels1@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Olayia's Complex, Beside Eyiowu Awi Pharmacy",
    addressLocality: "Ede",
    postalCode: "102213",
    addressRegion: "Osun",
    addressCountry: "NG",
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+2348165900571",
    contactType: "customer service",
    areaServed: "NG",
    availableLanguage: ["English"],
  },
};

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
          "Brilliant Mind Travel and Tours - Travel and Study Abroad Services",
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

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(businessSchema),
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
            alt="Brilliant Mind Travel and Tours travel and educational consultancy in Ede, Osun"
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
