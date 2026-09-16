import { Link } from "@tanstack/react-router";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music2,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Logo } from "./Logo";
import { footerLinks, navLinks } from "@/config/site";
import { useSettings } from "@/components/public/ui";

const socials = [
  ["facebook_url", "Facebook", Facebook],
  ["instagram_url", "Instagram", Instagram],
  ["twitter_url", "X", Twitter],
  ["linkedin_url", "LinkedIn", Linkedin],
  ["tiktok_url", "TikTok", Music2],
  ["youtube_url", "YouTube", Youtube],
] as const;

export function Footer() {
  const { data: s } = useSettings();

  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.2fr] lg:gap-16">
          <div className="space-y-5">
            <Logo light />

            <p className="max-w-md text-sm leading-relaxed text-navy-foreground/70">
              {s?.tagline}
            </p>

            <p className="max-w-md text-sm leading-relaxed text-navy-foreground/60">
              {s?.promise}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              {socials.map(([key, label, Icon]) =>
                s?.[key] ? (
                  <a
                    key={key}
                    href={s[key] as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex size-9 items-center justify-center rounded-full border border-navy-foreground/20 text-navy-foreground/70 transition-all hover:border-gold hover:bg-gold hover:text-navy-deep"
                  >
                    <Icon className="size-4" />
                  </a>
                ) : null,
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Company
            </h3>

            <ul className="mt-6 space-y-3 text-sm text-navy-foreground/70">
              {[...navLinks, ...footerLinks].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Get in touch
            </h3>

            <ul className="mt-6 space-y-5 text-sm text-navy-foreground/70">
              {s?.address ? (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />

                  <span className="leading-relaxed">
                    {s.address}
                  </span>
                </li>
              ) : null}

              {s?.phone ? (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" />

                  <a
                    href={`tel:${s.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-gold"
                  >
                    {s.phone}
                  </a>
                </li>
              ) : null}

              {s?.email ? (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" />

                  <a
                    href={`mailto:${s.email}`}
                    className="break-all transition-colors hover:text-gold"
                  >
                    {s.email}
                  </a>
                </li>
              ) : null}

              {s?.business_hours ? (
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-gold" />

                  <span className="leading-relaxed">
                    {s.business_hours}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-navy-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {s?.company_name}. All
            rights reserved.
          </p>

          <p>
            Travel &amp; Tours
          </p>
        </div>
      </div>
    </footer>
  );
}
