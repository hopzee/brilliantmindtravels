import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Hotel,
  MapPin,
  Plane,
  Wrench,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { publishedList } from "@/lib/cms";
import {
  CardSkeletons,
  EmptyState,
  Reveal,
  SectionHeading,
} from "@/components/public/ui";

const countryServiceOptions = [
  {
    key: "study",
    label: "Study",
    icon: GraduationCap,
  },
  {
    key: "work",
    label: "Work",
    icon: BriefcaseBusiness,
  },
  {
    key: "visit",
    label: "Visit",
    icon: MapPin,
  },
] as const;

const travelServiceCards = [
  {
    title: "Flight Booking",
    description: "Assistance with flight planning and booking for your journey.",
    icon: Plane,
  },
  {
    title: "Hotel Reservations",
    description: "Find suitable accommodation for your trip, study or work plans.",
    icon: Hotel,
  },
  {
    title: "Airport Pickup",
    description: "Arrange airport pickup support for a smoother arrival.",
    icon: MapPin,
  },
];

export function Services() {
  const { data: services, isLoading: servicesLoading } = useQuery(
    publishedList("services", {
      orderBy: "sort_order",
      ascending: true,
    }),
  );

  const { data: countries, isLoading: countriesLoading } = useQuery(
    publishedList("country_services", {
      orderBy: "sort_order",
      ascending: true,
    }),
  );

  return (
    <section className="surface-soft py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Professional services for every stage of your journey"
        />

        {/* General travel services */}
        <div className="mt-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Travel Services
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-navy md:text-3xl">
              Travel arrangements made easier
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {travelServiceCards.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.title} delay={index * 60}>
                  <div className="group h-full rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]">
                    <span className="inline-flex size-12 items-center justify-center rounded-lg bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                      <Icon className="size-5" />
                    </span>

                    <h3 className="mt-6 text-lg text-navy">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Consultancy services */}
        <div className="mt-20 md:mt-24">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Consultancy Services
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-navy md:text-3xl">
              Support for your travel and relocation plans
            </h2>
          </div>

          <div>
            {servicesLoading ? (
              <CardSkeletons />
            ) : !services?.length ? (
              <EmptyState
                title="Services coming soon"
                text="Our consultancy services are being published. Please check back shortly or reach out on WhatsApp."
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service: any, index: number) => (
                  <Reveal key={service.id} delay={index * 60}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
                    >
                      <span className="inline-flex size-12 items-center justify-center rounded-lg bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                        <Wrench className="size-5" />
                      </span>

                      <h3 className="mt-6 text-lg text-navy">
                        {service.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {service.short_description}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy/70 transition-colors group-hover:text-gold">
                        View details
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Countries */}
        <div className="mt-20 md:mt-24">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Countries We Support
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-navy md:text-3xl">
              Explore your options by country
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Available options vary by country. Select the country that
              matches your travel, study or work plans.
            </p>
          </div>

          <div>
            {countriesLoading ? (
              <CardSkeletons />
            ) : !countries?.length ? (
              <EmptyState
                title="Countries coming soon"
                text="Our current country services are being updated. Please check back shortly."
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {countries.map((country: any, index: number) => {
                  const availableOptions = countryServiceOptions.filter(
                    (option) => country[option.key],
                  );

                  return (
                    <Reveal key={country.id} delay={index * 50}>
                      <div className="h-full rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]">
                        <div className="flex items-start gap-4">
                          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-navy text-gold">
                            <Building2 className="size-5" />
                          </span>

                          <div>
                            <h3 className="text-lg font-semibold text-navy">
                              {country.country_name}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Available pathways
                            </p>
                          </div>
                        </div>

                        {availableOptions.length > 0 ? (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {availableOptions.map((option) => {
                              const Icon = option.icon;

                              return (
                                <span
                                  key={option.key}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-navy"
                                >
                                  <Icon className="size-3.5" />
                                  {option.label}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="mt-5 text-sm text-muted-foreground">
                            Contact us to discuss available options.
                          </p>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
