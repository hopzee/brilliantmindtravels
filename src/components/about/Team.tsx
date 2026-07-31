import { useQuery } from "@tanstack/react-query";
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import { teamQuery } from "@/lib/cms";
import { Reveal, SectionHeading } from "@/components/public/ui";
import { SmartImage } from "@/components/public/media";
import { cn } from "@/lib/utils";

const socials = [
  ["linkedin_url", Linkedin, "LinkedIn"],
  ["facebook_url", Facebook, "Facebook"],
  ["instagram_url", Instagram, "Instagram"],
  ["twitter_url", Twitter, "X"],
] as const;

function MemberCard({ member, featured }: { member: any; featured?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-[var(--shadow-elegant)]",
        featured ? "flex-col md:flex-row" : "flex-col",
      )}
    >
      {member.featured_image ? (
        <SmartImage
          src={member.featured_image}
          alt={member.title}
          ratio={featured ? "aspect-4/5" : "aspect-3/4"}
          wrapperClassName={featured ? "md:w-2/5 md:shrink-0" : undefined}
          sizes={featured ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className={cn("text-navy", featured ? "text-2xl" : "text-lg")}>{member.title}</h3>
        {member.role_title ? (
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{member.role_title}</p>
        ) : null}
        {member.bio ? (
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3 text-muted-foreground">
          {socials.map(([key, Icon, label]) =>
            member[key] ? (
              <a
                key={key}
                href={member[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.title} on ${label}`}
                className="transition-colors hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ) : null,
          )}
          {member.email ? (
            <a href={`mailto:${member.email}`} aria-label={`Email ${member.title}`} className="hover:text-gold">
              <Mail className="size-4" />
            </a>
          ) : null}
          {member.phone ? (
            <a href={`tel:${member.phone.replace(/\s/g, "")}`} aria-label={`Call ${member.title}`} className="hover:text-gold">
              <Phone className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Team() {
  const { data } = useQuery(teamQuery);
  if (!data?.length) return null;

  const groups = data.filter((m: any) => m.is_group_photo);
  const people = data.filter((m: any) => !m.is_group_photo);
  const featured = people.find((m: any) => m.is_featured);
  const rest = people.filter((m: any) => m !== featured);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our team"
          title="The people behind every successful application"
          intro="Consultants, documentation specialists and support staff working on your file."
        />

        {featured ? (
          <Reveal className="mt-12">
            <MemberCard member={featured} featured />
          </Reveal>
        ) : null}

        {rest.length ? (
          <div
            className={cn(
              "mt-8 grid gap-6",
              rest.length === 1 ? "max-w-sm" : "sm:grid-cols-2 lg:grid-cols-4",
            )}
          >
            {rest.map((m: any, i: number) => (
              <Reveal key={m.id} delay={i * 60}>
                <MemberCard member={m} />
              </Reveal>
            ))}
          </div>
        ) : null}

        {groups.length ? (
          <div className="mt-12 space-y-8">
            {groups.map((g: any) => {
              const images: string[] = [g.featured_image, ...(g.gallery_images ?? [])].filter(Boolean);
              return (
                <Reveal key={g.id}>
                  <h3 className="text-lg text-navy">{g.title}</h3>
                  {g.bio ? <p className="mt-2 text-sm text-muted-foreground">{g.bio}</p> : null}
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    {images.map((src, i) => (
                      <SmartImage
                        key={src + i}
                        src={src}
                        alt={`${g.title} photo ${i + 1}`}
                        ratio="aspect-16/10"
                        wrapperClassName="rounded-xl shadow-[var(--shadow-elegant)]"
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
