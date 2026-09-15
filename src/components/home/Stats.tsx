import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/components/public/ui";

function useCountUp(target: string, active: boolean) {
  const numeric = Number((target.match(/\d+/) ?? ["0"])[0]);
  const suffix = target.replace(/[\d,]/g, "");
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || !numeric) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(numeric);
      return;
    }

    let frame = 0;
    const total = 48;

    const id = window.setInterval(() => {
      frame += 1;
      setValue(Math.round(numeric * Math.min(1, frame / total)));

      if (frame >= total) {
        window.clearInterval(id);
      }
    }, 18);

    return () => window.clearInterval(id);
  }, [active, numeric]);

  return numeric ? `${value}${suffix}` : target;
}

function Stat({
  value,
  label,
  active,
}: {
  value: string;
  label: string;
  active: boolean;
}) {
  const display = useCountUp(value, active);

  return (
    <div>
      <dt className="font-[family-name:var(--font-display)] text-2xl font-bold text-gold sm:text-3xl">
        {display}
      </dt>

      <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-navy-foreground/60">
        {label}
      </dd>
    </div>
  );
}

export function AnimatedStats({ className }: { className?: string }) {
  const { data: s } = useSettings();

  const ref = useRef<HTMLDListElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        io.disconnect();
      }
    });

    io.observe(el);

    return () => io.disconnect();
  }, []);

  const stats = [
    {
      value: s?.stat_successful_applications || "500+",
      label: "Successful applications",
    },
    {
      value: s?.stat_countries_covered || "20+",
      label: "Countries covered",
    },
    {
      value: s?.stat_happy_clients || "1000+",
      label: "Happy clients",
    },
    {
      value: s?.stat_years_experience || "10+",
      label: "Years of experience",
    },
  ];

  return (
    <dl
      ref={ref}
      className={cn("grid grid-cols-2 gap-6 sm:grid-cols-4", className)}
    >
      {stats.map((stat) => (
        <Stat
          key={stat.label}
          value={stat.value}
          label={stat.label}
          active={active}
        />
      ))}
    </dl>
  );
}
