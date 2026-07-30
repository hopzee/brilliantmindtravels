import logo from "@/assets/logo.png.asset.json";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <img
        src={logo.url}
        alt={`${site.name} logo`}
        width={48}
        height={48}
        className="size-11 rounded-full object-cover ring-1 ring-gold/40"
      />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-[family-name:var(--font-display)] text-[0.95rem] font-bold tracking-tight",
            light ? "text-navy-foreground" : "text-navy",
          )}
        >
          Brilliant Mind
        </span>
        <span className="block text-[0.62rem] font-medium uppercase tracking-[0.24em] text-gold">
          Travels &amp; Tours
        </span>
      </span>
    </span>
  );
}