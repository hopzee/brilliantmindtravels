import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/public/SiteLayout";
import { PageHero, Prose, Reveal, SectionHeading, useSettings } from "@/components/public/ui";
import { AnimatedStats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { fallbackImages, imageOr } from "@/lib/cms";

const title = "About Us | Brilliant Mind Travels & Tours";
const description =
  "Learn about Brilliant Mind Travels & Tours — our story, vision and mission as a trusted travel, study abroad and immigration consultancy in Nigeria.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  const { data: s } = useSettings();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Who we are"
        title={`About ${s?.company_name ?? "us"}`}
        intro={s?.tagline}
        image={imageOr(s?.hero_image_url, fallbackImages.consultation)}
      />

      <section className="bg-background py-20 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="Opening doors to global opportunity" />
            <Prose className="mt-8" text={s?.about_story} />
            {s?.promise ? (
              <p className="mt-8 rounded-lg surface-soft p-6 font-[family-name:var(--font-display)] text-lg text-navy">
                {s.promise}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={80} className="space-y-6">
            <img
              src={imageOr(null, fallbackImages.study)}
              alt="Students preparing to study abroad"
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
            />
            {s?.vision ? (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">Vision</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.vision}</p>
              </div>
            ) : null}
            {s?.mission ? (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">Mission</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.mission}</p>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-16 text-navy-foreground">
        <div className="container-page">
          <AnimatedStats />
        </div>
      </section>

      <Process />
      <WhatsAppCta />
    </SiteLayout>
  );
}