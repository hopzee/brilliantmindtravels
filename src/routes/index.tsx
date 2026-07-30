import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/public/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { StudyAbroad } from "@/components/home/StudyAbroad";
import { Tours } from "@/components/home/Tours";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { LatestBlog } from "@/components/home/Blog";
import { Faq } from "@/components/home/Faq";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";

const title = "Brilliant Mind Travels & Tours | Visa, Study Abroad & Tour Consultancy";
const description =
  "Trusted travel and immigration consultancy in Ede South, Osun State. Visa assistance, study abroad admissions, work pathways and curated tour packages.";

export const Route = createFileRoute("/")({
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
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Services />
      <StudyAbroad />
      <Tours />
      <Process />
      <Testimonials />
      <LatestBlog />
      <Faq />
      <WhatsAppCta />
    </SiteLayout>
  );
}