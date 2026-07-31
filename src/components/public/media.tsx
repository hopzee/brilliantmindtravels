import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Image that never stretches or crops awkwardly.
 * - `fit="cover"` fills a fixed ratio (cards, heroes)
 * - `fit="contain"` shows the whole picture on a soft backdrop (flyers, documents)
 * - `fit="natural"` keeps the file's own aspect ratio (portraits, uploads of unknown shape)
 */
export function SmartImage({
  src,
  alt,
  ratio,
  fit = "cover",
  priority = false,
  className,
  wrapperClassName,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  src?: string | null;
  alt: string;
  ratio?: string;
  fit?: "cover" | "contain" | "natural";
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
  sizes?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  if (!src) return null;

  const img = (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchPriority={(priority ? "high" : "auto") as any}
      decoding={priority ? "sync" : "async"}
      onLoad={() => setLoaded(true)}
      className={cn(
        "w-full transition-opacity duration-500",
        fit === "natural" ? "h-auto" : "size-full",
        fit === "contain" ? "object-contain" : fit === "cover" ? "object-cover" : "",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );

  if (fit === "natural") {
    return <div className={cn("overflow-hidden", wrapperClassName)}>{img}</div>;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        ratio ?? "aspect-4/3",
        fit === "contain" && "bg-navy/5",
        wrapperClassName,
      )}
    >
      {img}
    </div>
  );
}

export function youtubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return match ? match[1] : null;
}

function vimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Responsive video player.
 * Hosted files play inline with lazy loading and an optional poster thumbnail.
 * YouTube and Vimeo links load their iframe only after the viewer presses play,
 * so the embed never slows down first paint.
 */
export function SmartVideo({
  src,
  poster,
  title,
  ratio = "aspect-video",
  autoPlay = false,
  loop = false,
  muted = autoPlay,
  controls = true,
  className,
}: {
  src?: string | null;
  poster?: string | null;
  title: string;
  ratio?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only start autoplaying videos once they are actually on screen.
  useEffect(() => {
    if (!autoPlay) return;
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay]);

  if (!src) return null;

  const yt = youtubeId(src);
  const vimeo = vimeoId(src);

  if (yt || vimeo) {
    const embed = yt
      ? `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${vimeo}?autoplay=1`;
    const thumb = poster ?? (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null);

    return (
      <div ref={wrapRef} className={cn("relative overflow-hidden rounded-xl bg-navy", ratio, className)}>
        {active ? (
          <iframe
            src={embed}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play ${title}`}
            className="group size-full"
          >
            {thumb ? (
              <img src={thumb} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
            ) : null}
            <span className="absolute inset-0 grid place-items-center bg-navy/35 transition-colors group-hover:bg-navy/50">
              <span className="grid size-16 place-items-center rounded-full bg-gold text-gold-foreground shadow-lg">
                <Play className="size-6 translate-x-0.5 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl bg-navy", ratio, className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster ?? undefined}
        title={title}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline
        preload={autoPlay ? "metadata" : "none"}
        className="size-full object-cover"
      />
    </div>
  );
}
