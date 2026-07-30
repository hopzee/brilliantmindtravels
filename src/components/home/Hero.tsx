import { ArrowRight, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/config/site";

const stats = [
  { value: "500+", label: "Clients guided" },
  { value: "20+", label: "Destination countries" },
  { value: "98%", label: "Client satisfaction" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pt-32 pb-20 text-navy-foreground md:pt-44 md:pb-28">
      <img
        src={heroImage}
        alt="Traveller with passport in an international airport terminal"
        width={1600}
        height={1104}
        className="absolute inset-0 -z-10 size-full object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--navy-deep)_18%,color-mix(in_oklab,var(--navy-deep)_72%,transparent)_58%,transparent_100%)]" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="eyebrow">{site.address}</span>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.06] sm:text-5xl lg:text-6xl">
            Your Trusted Partner For{" "}
            <span className="bg-[linear-gradient(92deg,var(--gold),color-mix(in_oklab,var(--gold)_55%,white))] bg-clip-text text-transparent">
              Global Travel
            </span>{" "}
            And Opportunities
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">
            Helping individuals and families achieve their travel, study abroad, and visa goals with
            professional, transparent guidance from start to landing.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl">
              <a href="/contact">
                Book Consultation <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <a
                href={whatsappLink("Hello Brilliant Mind, I'd like to speak with a consultant.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" /> Chat On WhatsApp
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-navy-foreground/15 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-[family-name:var(--font-display)] text-2xl font-bold text-gold sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-navy-foreground/60">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-xl border border-navy-foreground/15 bg-navy/70 p-8 backdrop-blur-md">
            <span className="gold-rule" />
            <p className="mt-6 font-[family-name:var(--font-display)] text-xl leading-snug">
              {site.promise}
            </p>
            <p className="mt-4 text-sm italic text-navy-foreground/60">{site.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}