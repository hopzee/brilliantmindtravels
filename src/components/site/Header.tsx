import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { navLinks, site } from "@/config/site";
import { cn } from "@/lib/utils";
import { useSettings } from "@/components/public/ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: settings } = useSettings();

  const phone = settings?.phone ?? "";
  const address = settings?.address ?? "";
  const promise = settings?.promise ?? "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="hidden bg-navy-deep text-navy-foreground/80 md:block">
        <div className="mx-auto flex h-9 w-full max-w-[80rem] items-center px-6 lg:px-8 xl:px-10">
          <div className="flex min-w-0 flex-1 items-center">
            <p className="truncate text-xs tracking-wide">
              {promise}
            </p>
          </div>

          <div className="ml-10 flex shrink-0 items-center gap-6 border-l border-navy-foreground/15 pl-6">
            {address ? (
              <span className="max-w-[280px] truncate text-xs">
                {address}
              </span>
            ) : null}

            {phone ? (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex shrink-0 items-center gap-1.5 text-xs transition-colors hover:text-gold"
              >
                <Phone className="size-3.5" />
                {phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-background shadow-[0_10px_30px_-24px_rgba(11,31,58,0.8)]"
            : "bg-background/95",
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8 xl:px-10">
          <Link
            to="/"
            aria-label={
              settings?.company_name ?? site.name
            }
            className="shrink-0"
          >
            <Logo />
          </Link>

          <nav
            className="hidden items-center gap-5 lg:flex xl:gap-6"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{
                  exact: link.to === "/",
                }}
                activeProps={{
                  className: "text-navy after:w-full",
                }}
                className="relative whitespace-nowrap text-sm font-medium text-foreground/75 transition-colors hover:text-navy after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              variant="gold"
              size="lg"
              className="hidden sm:inline-flex"
            >
              <Link to="/contact">
                Book Consultation
              </Link>
            </Button>

            <button
              type="button"
              aria-label={
                open ? "Close menu" : "Open menu"
              }
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-navy transition-colors hover:bg-muted lg:hidden"
            >
              {open ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            className="border-t border-border bg-background lg:hidden"
            aria-label="Mobile"
          >
            <div className="mx-auto flex w-full max-w-[80rem] flex-col px-5 py-2 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-sm font-medium text-foreground/80 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
