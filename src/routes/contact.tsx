import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { SiteLayout } from "@/components/public/SiteLayout";
import { PageHero, SectionHeading, useSettings, WhatsAppButton } from "@/components/public/ui";
import { BookingForm, ContactMessageForm } from "@/components/public/LeadForms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { enquiryMessage } from "@/lib/cms";

const title = "Contact & Book a Consultation | Brilliant Mind Travels & Tours";
const description =
  "Send a general inquiry or book a consultation with Brilliant Mind Travels & Tours. Call, WhatsApp or visit our office in Ede South, Osun State.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data: s } = useSettings();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's plan your next move"
        intro="Choose a general inquiry or book a consultation. We respond quickly on every channel."
      />

      <section className="bg-background py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading eyebrow="Get in touch" title="Send a message or book a slot" />
            <Tabs defaultValue="inquiry" className="mt-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="inquiry">General inquiry</TabsTrigger>
                <TabsTrigger value="booking">Book consultation</TabsTrigger>
              </TabsList>
              <TabsContent value="inquiry" className="mt-8">
                <ContactMessageForm />
              </TabsContent>
              <TabsContent value="booking" className="mt-8">
                <BookingForm />
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-7">
              <h2 className="text-lg text-navy">Office details</h2>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                {s?.phone ? (
                  <li className="flex gap-3">
                    <PhoneCall className="mt-0.5 size-4 shrink-0 text-gold" />
                    <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-navy">
                      {s.phone}
                    </a>
                  </li>
                ) : null}
                {s?.email ? (
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                    <a href={`mailto:${s.email}`} className="hover:text-navy">
                      {s.email}
                    </a>
                  </li>
                ) : null}
                {s?.address ? (
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                    <span>{s.address}</span>
                  </li>
                ) : null}
              </ul>
              {s?.business_hours ? (
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {s.business_hours}
                </p>
              ) : null}
              <div className="mt-6">
                <WhatsAppButton
                  whatsapp={s?.whatsapp}
                  message={enquiryMessage(s?.company_name, "services you offer")}
                  className="w-full"
                />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                No checkout runs on this website. Fees are agreed directly with the CEO after your case is discussed, and eligible applicants may qualify for the pay after your visa is out arrangement.
              </p>
            </div>

            {s?.google_maps_link ? (
              <a
                href={s.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-border bg-card p-7 text-sm font-semibold text-navy hover:text-gold"
              >
                View our office on Google Maps →
              </a>
            ) : null}
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}