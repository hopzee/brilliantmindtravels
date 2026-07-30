import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  GraduationCap,
  Image,
  LayoutDashboard,
  LogOut,
  Mailbox,
  Menu,
  Plane,
  Quote,
  Settings,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const adminNav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/study-abroad", label: "Study Abroad", icon: GraduationCap },
  { to: "/admin/universities", label: "Universities", icon: Building2 },
  { to: "/admin/tours", label: "Tour Packages", icon: Plane },
  { to: "/admin/blog", label: "Blog", icon: BookOpen },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/media", label: "Media Library", icon: Image },
  { to: "/admin/messages", label: "Messages & Leads", icon: Mailbox },
  { to: "/admin/settings", label: "Website Settings", icon: Settings },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-[var(--soft)]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-68 flex-col bg-navy-deep text-navy-foreground transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-18 items-center justify-between px-6">
          <span className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.16em] text-gold">
            Brilliant Mind
          </span>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
          {adminNav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-gold text-gold-foreground font-semibold"
                    : "text-navy-foreground/70 hover:bg-navy-foreground/10 hover:text-navy-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-navy-foreground/10 p-3">
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-navy-foreground/70 transition-colors hover:bg-navy-foreground/10 hover:text-navy-foreground"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <div className="lg:pl-68">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur md:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <span className="text-sm font-semibold text-navy">Content Management</span>
          <a href="/" target="_blank" rel="noreferrer" className="ml-auto text-xs font-medium text-muted-foreground hover:text-navy">
            View website ↗
          </a>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}