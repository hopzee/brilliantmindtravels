import { CheckCircle2, Compass, ShieldCheck, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { fallbackImages, imageOr } from "@/lib/cms";
import { Prose, Reveal, useSettings } from "@/components/public/ui";
import { useEffect, useState } from "react";

import homeTeam1 from "@/assets/home-team-1.jpg";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Integrity first",
    text: "Honest advice and transparent processes — no false promises.",
  },
  {
    icon: Users,
    title: "Personalised guidance",
    text: "A dedicated consultant walks with you from file to flight.",
  },
  {
    icon: Compass,
    title: "Global reach",
    text: "Study, work and travel pathways across five continents.",
  },
];

export function About() {
  const { data: s } = useSettings();
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSecondImage(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <img
            src={
              showSecondImage
                ? homeTeam1
                : imageOr(null, fallbackImages.consultation)
            }
            alt="Brilliant Mind Travels and Tours"
            width={1200}
            height={912}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
          />

          {s?.stat_years_experience ? (
            <div className="absolute -bottom-6 -right-2 hidden max-w-60 rounded-lg bg-navy p-6 text-navy-foreground shadow-[var(--shadow-elegant)] sm:block">
              <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-gold">
                {s.stat_years_experience}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-navy-foreground/70">
                Years of consultancy experience
              </p>
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={80}>
          <span className="eyebrow">About the company</span>

          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            A consultancy built on trust, expertise and results
          </h2>

          <Prose className="mt-5" text={s?.about_story} />

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {s?.vision ? (
              <div className="rounded-lg surface-soft p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Our Vision
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.vision}
                </p>
              </div>
            ) : null}

            {s?.mission ? (
              <div className="rounded-lg surface-soft p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Our Mission
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.mission}
                </p>
              </div>
            ) : null}
          </div>

          <ul className="mt-8 space-y-4">
            {pillars.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-navy/5 text-navy">
                  <p.icon className="size-4.5" />
                </span>

                <div>
                  <p className="font-semibold text-navy">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          {s?.promise ? (
            <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy">
              <CheckCircle2 className="size-4 text-gold" />
              {s.promise}
            </p>
          ) : null}

          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn more about us</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
