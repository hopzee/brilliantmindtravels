import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { StudyAbroad } from "@/components/home/StudyAbroad";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";

const title = "Brilliant Mind Travels & Tours | Visa & Study Abroad Consultancy";
const description =
  "Trusted travel and immigration consultancy in Ede South, Osun State. Visa assistance, study abroad admissions, tour packages and flight booking guidance.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <StudyAbroad />
        <WhatsAppCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
