import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  PageHero,
  Prose,
  Reveal,
  SectionHeading,
  useSettings,
} from "@/components/public/ui";
import { AnimatedStats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { Leadership } from "@/components/about/Leadership";
import { Team } from "@/components/about/Team";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { fallbackImages, imageOr } from "@/lib/cms";

import studyAbroad from "@/assets/study-abroad.jpg";
import filename1 from "@/assets/filename1.jpg";
import filename2 from "@/assets/filename2.jpg";
import filename3 from "@/assets/filename3.jpg";

const title =
  "About Brilliant Mind Travels & Tours | Travel & Study Abroad in Ede, Osun";

const description =
  "Learn about Brilliant Mind Travels & Tours, a travel and educational consultancy in Ede, Osun, providing travel, visa guidance, study abroad and tourism services.";

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
        eyebrow="About Brilliant Mind Travels & Tours"
        title="Brilliant Mind Travels & Tours"
        intro={
          s?.tagline ??
          "Travel and educational consultancy in Ede, Osun, providing travel, visa guidance, study abroad and tourism services."
        }
        image={imageOr(s?.hero_image_url, fallbackImages.consultation)}
      />

      <section className="bg-background py-20 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="Opening doors to global opportunity"
            />

            <Prose className="mt-8" text={s?.about_story} />

            {s?.promise ? (
              <p className="mt-8 rounded-lg surface-soft p-6 font-[family-name:var(--font-display)] text-lg text-navy">
                {s.promise}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={80} className="space-y-6">
            <div className="space-y-4">
              <img
                src={studyAbroad}
                alt="Students preparing to study abroad with Brilliant Mind Travels & Tours"
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
              />

              <div className="grid grid-cols-3 gap-3">
                <img
                  src={filename1}
                  alt="Brilliant Mind Travels & Tours"
                  loading="lazy"
                  decoding="async"
                  className="h-32 w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
                />

                <img
                  src={filename2}
                  alt="Brilliant Mind Travels & Tours"
                  loading="lazy"
                  decoding="async"
                  className="h-32 w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
                />

                <img
                  src={filename3}
                  alt="Brilliant Mind Travels & Tours"
                  loading="lazy"
                  decoding="async"
                  className="h-32 w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
                />
              </div>
            </div>

            {s?.vision ? (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Vision
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.vision}
                </p>
              </div>
            ) : null}

            {s?.mission ? (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Mission
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.mission}
                </p>
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

      <Leadership />

      <Team />

      <Process />

      <WhatsAppCta />
    </SiteLayout>
  );
}
