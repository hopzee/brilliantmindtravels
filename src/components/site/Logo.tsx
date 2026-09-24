import logo from "@/assets/brilliant-mind-logo.webp";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { useSettings } from "@/components/public/ui";

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  const { data: settings } = useSettings();
  const src = settings?.logo_url || logo;
  const name = settings?.company_name || site.name;
  const [first, ...rest] = name.split(" ");

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <img
        src={src}
        alt={`${name} logo`}
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
          {first} {rest[0] ?? ""}
        </span>
        <span className="block text-[0.62rem] font-medium uppercase tracking-[0.24em] text-gold">
          {rest.slice(1).join(" ") || "Travels & Tours"}
        </span>
      </span>
    </span>
  );
}
