import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { enquiryMessage, fallbackImages, imageOr } from "@/lib/cms";
import { useSettings, WhatsAppButton } from "@/components/public/ui";
import { AnimatedStats } from "./Stats";

export function Hero() {
  const { data: s } = useSettings();
  const image = imageOr(s?.hero_image_url, fallbackImages.hero);

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pt-32 pb-20 text-navy-foreground md:pt-44 md:pb-28">
      {s?.hero_video_url ? (
        <video
          className="absolute inset-0 -z-10 size-full object-cover opacity-40"
          src={s.hero_video_url}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full object-cover object-center opacity-45"
        />
      )}

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--navy-deep)_18%,color-mix(in_oklab,var(--navy-deep)_72%,transparent)_58%,transparent_100%)]" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          {s?.address ? <span className="eyebrow">{s.address}</span> : null}

          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.06] sm:text-5xl lg:text-6xl">
            Brilliant Mind Travels & Tours
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">
            Brilliant Mind Travels & Tours is a travel and educational
            consultancy in Ede, Osun, providing travel, visa guidance, study
            abroad and tourism services.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl">
              <Link to="/contact">
                Book Consultation <ArrowRight className="size-4" />
              </Link>
            </Button>

            <WhatsAppButton
              whatsapp={s?.whatsapp}
              variant="outlineLight"
              message={enquiryMessage(
                s?.company_name,
                "services you offer"
              )}
              label="Chat On WhatsApp"
            />
          </div>

          <AnimatedStats className="mt-12 max-w-lg border-t border-navy-foreground/15 pt-8" />
        </div>

        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-xl border border-navy-foreground/15 bg-navy/70 p-8 backdrop-blur-md">
            <span className="gold-rule" />

            <p className="mt-6 font-[family-name:var(--font-display)] text-xl leading-snug">
              {s?.promise}
            </p>

            <p className="mt-4 text-sm italic text-navy-foreground/60">
              {s?.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
