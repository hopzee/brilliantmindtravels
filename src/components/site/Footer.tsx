import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, site } from "@/config/site";

const services = [
  "Student Visa Assistance",
  "Tourist Visa",
  "Work Visa",
  "Business Travel",
  "Flight Booking",
  "Travel Consultation",
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm leading-relaxed text-navy-foreground/70">{site.tagline}</p>
          <p className="text-sm leading-relaxed text-navy-foreground/60">{site.promise}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Company</h3>
          <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
            {navLinks.map((l) => (
              <li key={l.to}>
                <a href={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-sm text-navy-foreground/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              {site.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-navy-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Ede South, Osun State, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}