import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Hotel,
  Plane,
  Stamp,
  UsersRound,
} from "lucide-react";
import { whatsappLink } from "@/config/site";

const services = [
  { icon: GraduationCap, title: "Student Visa Assistance", text: "Admissions, documentation and student visa filing for top study destinations." },
  { icon: Stamp, title: "Tourist Visa", text: "Guided applications for holiday and family visit travel worldwide." },
  { icon: Briefcase, title: "Work Visa", text: "Skilled worker pathways, employer documentation and relocation support." },
  { icon: Plane, title: "Flight Booking", text: "Competitive fares, routing advice and reliable ticket issuance." },
  { icon: Hotel, title: "Hotel Reservation", text: "Verified accommodation bookings that satisfy embassy requirements." },
  { icon: UsersRound, title: "Travel Consultation", text: "One-on-one sessions to map the right route for your goals and budget." },
];

export function Services() {
  return (
    <section className="surface-soft py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">What we do</span>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            Professional services for every stage of your journey
          </h2>
          <span className="gold-rule mt-6" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <a
              key={s.title}
              href={whatsappLink(`Hello, I'd like to enquire about: ${s.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                <s.icon className="size-5.5" />
              </span>
              <h3 className="mt-6 text-lg text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy/70 transition-colors group-hover:text-gold">
                Enquire <ArrowUpRight className="size-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}