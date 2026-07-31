import { Quote } from "lucide-react";
import { Prose, Reveal, SectionHeading, useSettings } from "@/components/public/ui";
import { SmartImage, SmartVideo } from "@/components/public/media";

/**
 * Leadership block driven entirely by Website Settings, so the CEO photo,
 * video and messages are replaced from the dashboard without touching code.
 */
export function Leadership() {
  const { data: s } = useSettings();
  const hasContent =
    s?.ceo_photo_url || s?.ceo_video_url || s?.ceo_intro || s?.ceo_message || s?.ceo_vision;
  if (!hasContent) return null;

  const name = s?.ceo_name ?? "Our Chief Executive Officer";
  const role = s?.ceo_title ?? "Chief Executive Officer";

  return (
    <section className="surface-soft py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Leadership" title="A message from our leadership" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal className="space-y-6">
            {s?.ceo_photo_url ? (
              <SmartImage
                src={s.ceo_photo_url}
                alt={`${name}, ${role}`}
                fit="natural"
                sizes="(min-width: 1024px) 40vw, 100vw"
                wrapperClassName="rounded-xl bg-card shadow-[var(--shadow-elegant)]"
              />
            ) : null}
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-[family-name:var(--font-display)] text-xl text-navy">{name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{role}</p>
              {s?.ceo_intro ? (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.ceo_intro}</p>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={80} className="space-y-8">
            {s?.ceo_video_url ? (
              <SmartVideo
                src={s.ceo_video_url}
                poster={s?.ceo_photo_url}
                title={`${name} speaks about ${s?.company_name ?? "the company"}`}
                className="shadow-[var(--shadow-elegant)]"
              />
            ) : null}

            {s?.ceo_message ? (
              <div className="rounded-xl border border-border bg-card p-7">
                <Quote className="size-6 text-gold" />
                <Prose className="mt-4" text={s.ceo_message} />
              </div>
            ) : null}

            {s?.ceo_vision ? (
              <div className="rounded-xl bg-navy p-7 text-navy-foreground">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                  Vision from the CEO
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-navy-foreground/80">
                  {s.ceo_vision.split(/\n{2,}/).map((block, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {block}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
