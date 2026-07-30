import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading, useSettings } from "@/components/public/ui";

const faqs = [
  {
    q: "Do you guarantee visa approval?",
    a: "No honest consultancy can guarantee an embassy decision. What we guarantee is a complete, accurate and well-presented application that gives you the strongest possible chance.",
  },
  {
    q: "Can I pay online?",
    a: "We do not collect payments online. All consultations and service fees are arranged directly with our team by phone, WhatsApp or at our office.",
  },
  {
    q: "How long does the process take?",
    a: "Timelines depend on the destination and visa category. During your consultation we give you a realistic timeline based on current embassy processing times.",
  },
  {
    q: "Do you help with school admissions as well as visas?",
    a: "Yes. We handle university selection, admission processing, scholarship guidance, student visa filing and pre-departure support end to end.",
  },
  {
    q: "Can you help if a previous application was refused?",
    a: "Absolutely. We review the refusal reasons, correct the weaknesses in your file and advise on the best timing for a fresh application.",
  },
];

export function Faq() {
  const { data: s } = useSettings();

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            intro={s?.business_hours ? `Office hours — ${s.business_hours}` : null}
          />
        </div>
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base text-navy">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}