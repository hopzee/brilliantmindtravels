import { ArrowRight } from "lucide-react";
import studyAbroad from "@/assets/study-abroad.jpg";
import { Button } from "@/components/ui/button";

const countries = [
  { name: "Canada", note: "Post-study work & PR pathways" },
  { name: "United Kingdom", note: "1-year masters, graduate route" },
  { name: "Germany", note: "Low tuition public universities" },
  { name: "United States", note: "Scholarships & research funding" },
  { name: "Australia", note: "Skilled migration friendly" },
];

export function StudyAbroad() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <span className="eyebrow">Study abroad</span>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            Study in the world&rsquo;s leading education destinations
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            From course selection and admission to visa filing and departure briefing, we handle the
            details so you can focus on your future.
          </p>

          <ul className="mt-8 divide-y divide-border border-y border-border">
            {countries.map((c) => (
              <li key={c.name} className="flex items-center justify-between gap-4 py-4">
                <span className="font-[family-name:var(--font-display)] font-semibold text-navy">
                  {c.name}
                </span>
                <span className="text-right text-sm text-muted-foreground">{c.note}</span>
              </li>
            ))}
          </ul>

          <Button asChild variant="outlineNavy" size="xl" className="mt-8">
            <a href="/study-abroad">
              Explore destinations <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>

        <img
          src={studyAbroad}
          alt="International students walking across a university campus"
          width={1200}
          height={912}
          loading="lazy"
          className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
        />
      </div>
    </section>
  );
}