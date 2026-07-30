import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/config/site";

export function WhatsAppCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-navy-foreground md:py-24">
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-page relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">Start today</span>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            Ready to begin your journey? Talk to a consultant now.
          </h2>
          <p className="mt-4 text-base text-navy-foreground/70">
            Send us a message on WhatsApp or call the office in {site.address}. No payment online —
            we agree the plan first, then you pay at the office or by direct arrangement.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <a
              href={whatsappLink("Hello Brilliant Mind, I'd like to start my travel process.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" /> Chat On WhatsApp
            </a>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
              <PhoneCall className="size-4" /> Call the office
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}