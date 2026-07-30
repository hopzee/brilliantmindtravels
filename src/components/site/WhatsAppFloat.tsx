import { CalendarCheck, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { enquiryMessage, waLink } from "@/lib/cms";
import { useSettings } from "@/components/public/ui";

export function WhatsAppFloat() {
  const { data: s } = useSettings();
  if (!s?.whatsapp) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-end gap-2 p-4 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:p-0">
      <Link
        to="/contact"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5 sm:flex-none"
      >
        <CalendarCheck className="size-5" />
        <span>Book consultation</span>
      </Link>
      <a
        href={waLink(s.whatsapp, enquiryMessage(s.company_name, "services you offer"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-navy-foreground shadow-[var(--shadow-elegant)] ring-1 ring-gold/40 transition-transform hover:-translate-y-0.5 sm:flex-none"
      >
        <MessageCircle className="size-5 text-gold" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}