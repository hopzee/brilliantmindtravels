import { CheckCircle2, Compass, ShieldCheck, Users } from "lucide-react";
import consultation from "@/assets/consultation.jpg";
import { site } from "@/config/site";

const pillars = [
  { icon: ShieldCheck, title: "Integrity first", text: "Honest advice and transparent processes — no false promises." },
  { icon: Users, title: "Personalised guidance", text: "A dedicated consultant walks with you from file to flight." },
  { icon: Compass, title: "Global reach", text: "Study, work and travel pathways across five continents." },
];

export function About() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <img
            src={consultation}
            alt="Travel consultant reviewing visa documents with a client"
            width={1200}
            height={912}
            loading="lazy"
            className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
          />
          <div className="absolute -bottom-6 -right-2 hidden max-w-[15rem] rounded-lg bg-navy p-6 text-navy-foreground shadow-[var(--shadow-elegant)] sm:block">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-gold">10+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-navy-foreground/70">
              Years of combined consultancy experience
            </p>
          </div>
        </div>

        <div>
          <span className="eyebrow">About the company</span>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            A consultancy built on trust, expertise and results
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {site.name} is a travel and immigration consultancy based in {site.address}. We guide
            students, professionals and families through visa applications, admissions abroad and
            well-planned travel — with clarity at every step.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg surface-soft p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{site.vision}</p>
            </div>
            <div className="rounded-lg surface-soft p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{site.mission}</p>
            </div>
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

          <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy">
            <CheckCircle2 className="size-4 text-gold" /> {site.promise}
          </p>
        </div>
      </div>
    </section>
  );
}