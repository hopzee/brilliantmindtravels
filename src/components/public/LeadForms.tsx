import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cms, publishedList } from "@/lib/cms";

const base = {
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional(),
};

const inquirySchema = z.object({
  ...base,
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

const bookingSchema = z.object({
  ...base,
  service: z.string().trim().min(1, "Select a service").max(150),
  preferred_date: z.string().trim().min(1, "Choose a preferred date"),
  preferred_time: z.string().trim().min(1, "Choose a preferred time"),
  message: z.string().trim().max(2000).optional(),
});

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} {...props} />
    </div>
  );
}

function Sent({ text, onReset }: { text: string; onReset: () => void }) {
  return (
    <div className="rounded-xl border border-gold/40 bg-gold/5 p-8 text-center">
      <h3 className="text-lg text-navy">Thank you — we've received your request</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{text}</p>
      <Button variant="outline" className="mt-6" onClick={onReset}>
        Send another
      </Button>
    </div>
  );
}

export function InquiryForm({
  relatedType,
  relatedId,
  defaultSubject,
}: {
  relatedType?: string;
  relatedId?: string;
  defaultSubject?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = inquirySchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setBusy(true);
    const { error } = await cms.from("inquiries").insert({
      ...parsed.data,
      related_type: relatedType ?? null,
      related_id: relatedId ?? null,
    });
    setBusy(false);
    if (error) return toast.error("We couldn't send your message. Please try WhatsApp instead.");
    toast.success("Inquiry sent — our team will reply shortly.");
    setDone(true);
  };

  if (done)
    return (
      <Sent
        text="A consultant will respond to your inquiry by email or phone, usually within one business day."
        onReset={() => setDone(false)}
      />
    );

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="full_name" label="Full name" required maxLength={100} autoComplete="name" />
        <Field id="email" label="Email" type="email" required maxLength={255} autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone (optional)" type="tel" maxLength={30} autoComplete="tel" />
        <Field id="subject" label="Subject" maxLength={150} defaultValue={defaultSubject} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" name="message" rows={5} required maxLength={2000} />
      </div>
      <Button type="submit" variant="gold" size="lg" disabled={busy} className="w-full sm:w-auto">
        {busy && <Loader2 className="size-4 animate-spin" />} Send inquiry
      </Button>
    </form>
  );
}

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [service, setService] = useState(defaultService ?? "");
  const { data: services } = useQuery(
    publishedList("services", { orderBy: "sort_order", ascending: true }),
  );

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = bookingSchema.safeParse({ ...Object.fromEntries(form), service });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setBusy(true);
    const { error } = await cms.from("appointments").insert(parsed.data);
    setBusy(false);
    if (error) return toast.error("We couldn't book that slot. Please try WhatsApp instead.");
    toast.success("Consultation requested — we'll confirm your slot shortly.");
    setDone(true);
  };

  if (done)
    return (
      <Sent
        text="We'll confirm your consultation date and time by phone or email. Consultation fees, where applicable, are settled at our office."
        onReset={() => setDone(false)}
      />
    );

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="full_name" label="Full name" required maxLength={100} autoComplete="name" />
        <Field id="email" label="Email" type="email" required maxLength={255} autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone / WhatsApp" type="tel" required maxLength={30} autoComplete="tel" />
        <div className="space-y-2">
          <Label htmlFor="service-trigger">Service needed</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service-trigger">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {(services ?? []).map((s: any) => (
                <SelectItem key={s.id} value={s.title}>
                  {s.title}
                </SelectItem>
              ))}
              <SelectItem value="General consultation">General consultation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="preferred_date"
          label="Preferred date"
          type="date"
          required
          min={new Date().toISOString().slice(0, 10)}
        />
        <Field id="preferred_time" label="Preferred time" type="time" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Anything we should know? (optional)</Label>
        <Textarea id="message" name="message" rows={4} maxLength={2000} />
      </div>
      <Button type="submit" variant="gold" size="lg" disabled={busy} className="w-full sm:w-auto">
        {busy && <Loader2 className="size-4 animate-spin" />} Request consultation
      </Button>
    </form>
  );
}

const contactSchema = z.object({
  ...base,
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

export function ContactMessageForm() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await cms.from("contact_messages").insert(parsed.data);
    setBusy(false);
    if (error) return toast.error("We couldn't send your message. Please try WhatsApp instead.");
    toast.success("Message sent — thank you for reaching out.");
    setDone(true);
  };

  if (done)
    return <Sent text="Our team will get back to you shortly." onReset={() => setDone(false)} />;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="full_name" label="Full name" required maxLength={100} autoComplete="name" />
        <Field id="email" label="Email" type="email" required maxLength={255} autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone (optional)" type="tel" maxLength={30} autoComplete="tel" />
        <Field id="subject" label="Subject" maxLength={150} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required maxLength={2000} />
      </div>
      <Button type="submit" variant="gold" size="lg" disabled={busy} className="w-full sm:w-auto">
        {busy && <Loader2 className="size-4 animate-spin" />} Send message
      </Button>
    </form>
  );
}