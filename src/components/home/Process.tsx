import { Reveal, SectionHeading } from "@/components/public/ui";

const steps = [
  { title: "Free consultation", text: "We listen to your goals and assess the pathways that genuinely fit your profile." },
  { title: "Document review", text: "Your academic, financial and travel documents are checked against embassy requirements." },
  { title: "Application & filing", text: "We prepare, package and submit a complete, compelling application on your behalf." },
  { title: "Approval & departure", text: "Interview coaching, travel planning and pre-departure briefing until you land." },
];

export function Process() {
  return (
    <section className="bg-navy-deep py-20 text-navy-foreground md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            A clear, guided path from first call to boarding pass
          </h2>
          <span className="gold-rule mt-6" />
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <li className="relative border-t border-navy-foreground/15 pt-6">
                <span className="font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.2em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}