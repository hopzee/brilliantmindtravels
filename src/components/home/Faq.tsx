import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsQuery } from "@/lib/cms";
import { Reveal, SectionHeading, useSettings } from "@/components/public/ui";

export type FaqItem = { id: string; question: string; answer: string; category?: string | null };

export function FaqAccordion({ items, idPrefix = "faq" }: { items: FaqItem[]; idPrefix?: string }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((f, i) => (
        <AccordionItem key={f.id} value={`${idPrefix}-${i}`}>
          <AccordionTrigger className="text-left text-base text-navy">{f.question}</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {f.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Faq({ limit = 6 }: { limit?: number }) {
  const { data: s } = useSettings();
  const { data } = useQuery(faqsQuery);
  const items = (data ?? []).slice(0, limit) as FaqItem[];
  if (!items.length) return null;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            intro={s?.business_hours ? `Office hours: ${s.business_hours}` : null}
          />
        </div>
        <Reveal>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
