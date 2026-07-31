import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  kind: z.enum(["booking", "inquiry", "contact"]),
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().nullable(),
  subject: z.string().trim().max(200).optional().nullable(),
  service: z.string().trim().max(150).optional().nullable(),
  preferred_date: z.string().trim().max(40).optional().nullable(),
  preferred_time: z.string().trim().max(40).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
});

export type LeadNotification = z.infer<typeof leadSchema>;

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Emails a new lead to the office inbox and sends the visitor a confirmation.
 * Delivery is best effort: the lead is already saved in the database before
 * this runs, so an email failure never loses a customer.
 */
export const notifyLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return { sent: false, reason: "email-not-configured" };

    const { createClient } = await import("@supabase/supabase-js");
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const supabasePublic = createClient(process.env.SUPABASE_URL!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data: settings } = await supabasePublic
      .from("website_settings")
      .select("company_name, email, phone, whatsapp")
      .limit(1)
      .maybeSingle();

    const company = settings?.company_name ?? "Brilliant Mind Travels & Tours";
    const officeEmail = settings?.email;
    if (!officeEmail) return { sent: false, reason: "no-office-email" };

    const label =
      data.kind === "booking" ? "Consultation booking" : data.kind === "inquiry" ? "Service inquiry" : "Contact message";

    const rows = [
      ["Name", data.full_name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Service", data.service],
      ["Preferred date", data.preferred_date],
      ["Preferred time", data.preferred_time],
      ["Subject", data.subject],
      ["Message", data.message],
    ].filter(([, value]) => Boolean(value)) as [string, string][];

    const table = rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px 6px 0;color:#64748b">${escape(k)}</td><td style="padding:6px 0"><strong>${escape(v)}</strong></td></tr>`,
      )
      .join("");

    const { sendLovableEmail } = await import("@lovable.dev/email-js");
    const stamp = Date.now();

    try {
      await sendLovableEmail(
        {
          to: officeEmail,
          from: `${company} <noreply@brilliantmindtravels.lovable.app>`,
          subject: `${label}: ${data.full_name}`,
          html: `<h2 style="font-family:sans-serif;color:#0B1F3A">New ${escape(label.toLowerCase())}</h2><table style="font-family:sans-serif;font-size:14px">${table}</table>`,
          text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
          purpose: "transactional",
          idempotency_key: `lead-admin-${data.kind}-${data.email}-${stamp}`,
        },
        { apiKey },
      );

      await sendLovableEmail(
        {
          to: data.email,
          from: `${company} <noreply@brilliantmindtravels.lovable.app>`,
          subject: `We received your ${data.kind === "booking" ? "consultation request" : "message"}`,
          html: `<div style="font-family:sans-serif;color:#0B1F3A;font-size:15px;line-height:1.6"><p>Hello ${escape(data.full_name)},</p><p>Thank you for contacting ${escape(company)}. Your ${escape(data.kind === "booking" ? "consultation request" : "message")} has reached our team and a consultant will respond shortly.</p>${settings?.phone ? `<p>If it is urgent, call us on ${escape(settings.phone)}.</p>` : ""}<p style="color:#64748b;font-size:13px">This is an automated confirmation. Please do not reply to this address.</p></div>`,
          text: `Hello ${data.full_name}, thank you for contacting ${company}. A consultant will respond shortly.`,
          purpose: "transactional",
          idempotency_key: `lead-visitor-${data.kind}-${data.email}-${stamp}`,
        },
        { apiKey },
      );

      return { sent: true };
    } catch (error) {
      console.error("Lead email delivery failed", error);
      return { sent: false, reason: "delivery-failed" };
    }
  });
