import { useEffect, useRef, useState, type ReactNode } from "react";
import { MessageCircle, Inbox } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { settingsQuery, waLink } from "@/lib/cms";

export function useSettings() {
  return useQuery(settingsQuery);
}

/** Fades content in as it scrolls into view. Respects reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow?: string;
  title: string;
  intro?: string | null;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</p> : null}
      <span className={cn("gold-rule mt-6", center && "mx-auto")} />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string | null;
  image?: string | null;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pt-32 pb-16 text-navy-foreground md:pt-40 md:pb-20">
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="absolute inset-0 -z-10 size-full object-cover opacity-35"
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--navy-deep)_20%,color-mix(in_oklab,var(--navy-deep)_70%,transparent)_70%)]" />
      <div className="container-page">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">{title}</h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-foreground/75">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
      <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-navy/5 text-navy">
        <Inbox className="size-5" />
      </span>
      <h3 className="mt-5 text-lg text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export function CardSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-6">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="mt-5 h-5 w-2/3" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}

/** Renders CMS long-form text: preserves paragraphs, never injects raw HTML. */
export function Prose({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null;
  const blocks = text.split(/\n{2,}/).filter(Boolean);
  return (
    <div className={cn("space-y-4 text-base leading-relaxed text-muted-foreground", className)}>
      {blocks.map((block, i) => (
        <p key={i} className="whitespace-pre-line">
          {block}
        </p>
      ))}
    </div>
  );
}

export function WhatsAppButton({
  whatsapp,
  message,
  label = "Chat on WhatsApp",
  variant = "gold",
  className,
}: {
  whatsapp: string | null | undefined;
  message: string;
  label?: string;
  variant?: "gold" | "outlineLight" | "outline";
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size="lg" className={className}>
      <a href={waLink(whatsapp, message)} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="size-4" /> {label}
      </a>
    </Button>
  );
}

export function Gallery({ images, alt }: { images?: string[] | null; alt: string }) {
  if (!images?.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={`${alt} — photo ${i + 1}`}
          loading="lazy"
          decoding="async"
          className="aspect-4/3 w-full rounded-lg object-cover shadow-[var(--shadow-elegant)]"
        />
      ))}
    </div>
  );
}