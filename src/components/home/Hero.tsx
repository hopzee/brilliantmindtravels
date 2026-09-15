import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { enquiryMessage, fallbackImages, imageOr } from "@/lib/cms";
import { useSettings, WhatsAppButton } from "@/components/public/ui";
import { AnimatedStats } from "./Stats";
import { useEffect, useState } from "react";

import consultation from "@/assets/consultation.jpg";
import homeTeam1 from "@/assets/home-team-1.jpg";
import homeTeam2 from "@/assets/home-team-2.jpg";
import homeTeam3 from "@/assets/home-team-3.jpg";
import homeTeam4 from "@/assets/home-team-4.jpg";
import homeTeam5 from "@/assets/home-team-5.jpg";
import homeTeam6 from "@/assets/home-team-6.jpg";
import homeTeam7 from "@/assets/home-team-7.jpg";

export function Hero() {
  const { data: s } = useSettings();
  const image = imageOr(s?.hero_image_url, fallbackImages.hero);

  const images = [
  consultation,
  homeTeam1,
  homeTeam2,
  homeTeam3,
  homeTeam4,
  homeTeam5,
  homeTeam6,
  homeTeam7,
];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [images.length]);

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
        <>
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 -z-10 size-full object-cover object-center opacity-45 transition-opacity duration-1000 ${
                index === currentImage ? "opacity-45" : "opacity-0"
              }`}
            />
          ))}
        </>
      )}

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--navy-deep)_18%,color-mix(in_oklab,var(--navy-deep)_72%,transparent)_58%,transparent_100%)]" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          {s?.address ? <span className="eyebrow">{s.address}</span> : null}

          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.06] sm:text-5xl lg:text-6xl">
            {s?.hero_headline ?? s?.company_name ?? ""}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">
            {s?.hero_subheadline ?? s?.promise ?? ""}
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
