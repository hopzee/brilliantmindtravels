import { MapPin, PhoneCall, Wallet } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { enquiryMessage } from "@/lib/cms";
import { useSettings, WhatsAppButton } from "@/components/public/ui";

export function WhatsAppCta() {
  const { data: s } = useSettings();

  return (
    <section className="relative overflow-hidden bg-navy py-20 text-navy-foreground md:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="eyebrow">Ready when you are</span>

          <h2 className="mt-4 max-w-xl text-3xl leading-tight sm:text-4xl">
            Speak with a consultant today
          </h2>

          <div className="mt-5 max-w-xl overflow-hidden">
            <p className="consultation-message text-base leading-relaxed text-navy-foreground/75">
              <span className="block">
                Every consultation starts with a conversation. Reach us on
                WhatsApp, call the office,
              </span>

              <span className="block">
                or book an appointment. Fees are agreed directly with the CEO
                once your case is discussed.
              </span>
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <WhatsAppButton
              whatsapp={s?.whatsapp}
              message={enquiryMessage(
                s?.company_name,
                "services you offer",
              )}
            />

            {s?.phone ? (
              <Button asChild variant="outlineLight" size="lg">
                <a
                  href={`tel:${s.phone.replace(/\s/g, "")}`}
                >
                  <PhoneCall className="size-4" />
                  {s.phone}
                </a>
              </Button>
            ) : null}

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-navy-foreground hover:bg-navy-foreground/10"
            >
              <Link to="/contact">
                Book a consultation
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-navy-foreground/15 bg-navy-deep/60 p-8">
          <ul className="space-y-6 text-sm">
            <li className="flex gap-4">
              <Wallet className="mt-0.5 size-5 shrink-0 text-gold" />

              <span>
                <strong className="block font-semibold">
                  Payment after discussion
                </strong>

                <span className="text-navy-foreground/70">
                  Nothing is charged through this website. Fees
                  are settled directly with the CEO once a deal is
                  sealed, and eligible applicants may qualify for
                  our pay after your visa is out arrangement, with
                  eligibility decided personally by the CEO.
                </span>
              </span>
            </li>

            {s?.address ? (
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />

                <span>
                  <strong className="block font-semibold">
                    Visit our office
                  </strong>

                  <span className="text-navy-foreground/70">
                    {s.address}
                  </span>
                </span>
              </li>
            ) : null}

            {s?.business_hours ? (
              <li className="flex gap-4">
                <PhoneCall className="mt-0.5 size-5 shrink-0 text-gold" />

                <span>
                  <strong className="block font-semibold">
                    Office hours
                  </strong>

                  <span className="text-navy-foreground/70">
                    {s.business_hours}
                  </span>
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <style>{`
        .consultation-message {
          animation: consultationFade 5s ease-in-out infinite;
        }

        @keyframes consultationFade {
          0% {
            opacity: 0.35;
            transform: translateY(8px);
          }

          20% {
            opacity: 1;
            transform: translateY(0);
          }

          75% {
            opacity: 1;
            transform: translateY(0);
          }

          100% {
            opacity: 0.35;
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
}
