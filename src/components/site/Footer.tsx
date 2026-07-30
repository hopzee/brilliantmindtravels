import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "@/config/site";
import { publishedList } from "@/lib/cms";
import { useSettings } from "@/components/public/ui";

const socials = [
  ["facebook_url", "Facebook"],
  ["instagram_url", "Instagram"],
  ["twitter_url", "X"],
  ["linkedin_url", "LinkedIn"],
  ["tiktok_url", "TikTok"],
  ["youtube_url", "YouTube"],
] as const;

export function Footer() {
  const { data: s } = useSettings();
  const { data: services } = useQuery(publishedList("services", { orderBy: "sort_order", ascending: true, limit: 6 }));

  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm leading-relaxed text-navy-foreground/70">{s?.tagline}</p>
          <p className="text-sm leading-relaxed text-navy-foreground/60">{s?.promise}</p>
          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            {socials.map(([key, label]) =>
              s?.[key] ? (
                <a
                  key={key}
                  href={s[key] as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-navy-foreground/20 px-3 py-1 text-navy-foreground/70 transition-colors hover:border-gold hover:text-gold"
                >
                  {label}
                </a>
              ) : null,
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Company</h3>
          <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
            {(services ?? []).map((svc: any) => (
              <li key={svc.id}>
                <Link
                  to="/services/$slug"
                  params={{ slug: svc.slug }}
                  className="transition-colors hover:text-gold"
                >
                  {svc.title}
                </Link>
              </li>
            ))}
            {!services?.length ? <li className="text-navy-foreground/40">Coming soon</li> : null}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-sm text-navy-foreground/70">
            {s?.address ? (
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                {s.address}
              </li>
            ) : null}
            {s?.phone ? (
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {s.phone}
                </a>
              </li>
            ) : null}
            {s?.email ? (
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={`mailto:${s.email}`} className="hover:text-gold">
                  {s.email}
                </a>
              </li>
            ) : null}
            {s?.business_hours ? (
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                {s.business_hours}
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-navy-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {s?.company_name}. All rights reserved.
          </p>
          <p>{s?.address}</p>
        </div>
      </div>
    </footer>
  );
}