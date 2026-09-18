import { createFileRoute } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  PhoneCall,
  Twitter,
  Youtube,
} from "lucide-react";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  PageHero,
  SectionHeading,
  useSettings,
  WhatsAppButton,
} from "@/components/public/ui";
import {
  BookingForm,
  ContactMessageForm,
} from "@/components/public/LeadForms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { enquiryMessage, waLink } from "@/lib/cms";

const title =
  "Contact Brilliant Mind Travels & Tours | Travel Agency in Ede, Osun";

const description =
  "Contact Brilliant Mind Travels & Tours in Ede, Osun for travel services, visa guidance, study abroad, tourism and consultation. Call, WhatsApp or visit our office.";

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

  const socials = [
    ["facebook_url", "Facebook", Facebook],
    ["instagram_url", "Instagram", Instagram],
    ["twitter_url", "X", Twitter],
    ["linkedin_url", "LinkedIn", Linkedin],
    ["tiktok_url", "TikTok", Music2],
    ["youtube_url", "YouTube", Youtube],
  ] as const;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Brilliant Mind Travels & Tours"
        title="Travel Agency & Consultancy in Ede, Osun"
        intro={
          s?.promise ??
          "Contact Brilliant Mind Travels & Tours for travel services, visa guidance, study abroad and tourism support in Ede, Osun."
        }
      />

      <section className="bg-background py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="Send a message or book a consultation"
            />

            <Tabs defaultValue="inquiry" className="mt-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="inquiry">
                  General inquiry
                </TabsTrigger>

                <TabsTrigger value="booking">
                  Book consultation
                </TabsTrigger>
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
              <h2 className="text-lg text-navy">
                Contact Brilliant Mind Travels & Tours
              </h2>

              <ul className="mt-5 space-y-5 text-sm text-muted-foreground">
                {s?.phone ? (
                  <li className="flex gap-3">
                    <PhoneCall className="mt-0.5 size-4 shrink-0 text-gold" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                        Phone
                      </p>

                      <a
                        href={`tel:${s.phone.replace(/\s/g, "")}`}
                        className="mt-1 inline-block hover:text-navy"
                      >
                        {s.phone}
                      </a>
                    </div>
                  </li>
                ) : null}

                {s?.whatsapp ? (
                  <li className="flex gap-3">
                    <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                        WhatsApp
                      </p>

                      <a
                        href={waLink(
                          s.whatsapp,
                          enquiryMessage(
                            s.company_name,
                            "services you offer",
                          ),
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block hover:text-navy"
                      >
                        {s.whatsapp}
                      </a>
                    </div>
                  </li>
                ) : null}

                {s?.email ? (
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-gold" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                        Email
                      </p>

                      <a
                        href={`mailto:${s.email}`}
                        className="mt-1 inline-block break-all hover:text-navy"
                      >
                        {s.email}
                      </a>
                    </div>
                  </li>
                ) : null}

                {s?.address ? (
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                        Office
                      </p>

                      <span className="mt-1 block">
                        {s.address}
                      </span>
                    </div>
                  </li>
                ) : null}
              </ul>

              {s?.business_hours ? (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">
                    Business hours
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {s.business_hours}
                  </p>
                </div>
              ) : null}

              <div className="mt-6">
                <WhatsAppButton
                  whatsapp={s?.whatsapp}
                  message={enquiryMessage(
                    s?.company_name,
                    "services you offer",
                  )}
                  className="w-full"
                />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                No checkout runs on this website. Fees are agreed directly
                with the CEO after your case is discussed, and eligible
                applicants may qualify for the pay after your visa is out
                arrangement.
              </p>
            </div>

            {socials.some(([key]) => s?.[key]) ? (
              <div className="rounded-xl border border-border bg-card p-7">
                <h2 className="text-lg text-navy">
                  Follow us
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Connect with Brilliant Mind Travels & Tours on social media.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {socials.map(([key, label, Icon]) =>
                    s?.[key] ? (
                      <a
                        key={key}
                        href={s[key] as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="flex size-10 items-center justify-center rounded-full border border-navy/15 text-navy/70 transition-all hover:border-gold hover:bg-gold hover:text-navy-deep"
                      >
                        <Icon className="size-4" />
                      </a>
                    ) : null,
                  )}
                </div>
              </div>
            ) : null}

            {s?.google_maps_link ? (
              <a
                href={s.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-border bg-card p-7 text-sm font-semibold text-navy transition-colors hover:text-gold"
              >
                <MapPin className="mr-2 inline-block size-4" />
                View our office on Google Maps →
              </a>
            ) : null}
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
