import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hello Brilliant Mind Travels & Tours, I would like to make an enquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-navy-foreground shadow-[var(--shadow-elegant)] ring-1 ring-gold/40 transition-transform hover:-translate-y-0.5"
    >
      <MessageCircle className="size-5 text-gold" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}