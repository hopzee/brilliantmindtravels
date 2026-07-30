import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { navLinks, site, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="hidden bg-navy-deep text-navy-foreground/80 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="tracking-wide">{site.promise}</p>
          <div className="flex items-center gap-5">
            <span>{site.address}</span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-gold">
              <Phone className="size-3.5" /> {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "bg-background shadow-[0_10px_30px_-24px_rgba(11,31,58,0.8)]" : "bg-background/95",
        )}
      >
        <div className="container-page flex h-18 items-center justify-between gap-4">
          <a href="/" aria-label={site.name}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="relative text-sm font-medium text-foreground/75 transition-colors hover:text-navy after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="gold" size="lg" className="hidden sm:inline-flex">
              <a href={whatsappLink("Hello, I'd like to book a consultation.")} target="_blank" rel="noopener noreferrer">
                Book Consultation
              </a>
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-navy lg:hidden"
            >
              {open ? <Menu className="size-5" hidden /> : null}
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="container-page flex flex-col py-2">
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-sm font-medium text-foreground/80 last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}