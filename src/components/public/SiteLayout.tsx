import type { ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-navy-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1 animate-in fade-in duration-500">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <div className="h-16 sm:h-0" aria-hidden="true" />
    </div>
  );
}