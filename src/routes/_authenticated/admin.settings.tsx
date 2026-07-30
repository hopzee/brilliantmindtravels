import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaField } from "@/components/admin/MediaField";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/settings")({ component: Page });

type Group = { title: string; fields: { name: string; label: string; type?: "text" | "textarea" | "image" }[] };

const groups: Group[] = [
  {
    title: "Company",
    fields: [
      { name: "company_name", label: "Company name" },
      { name: "tagline", label: "Tagline" },
      { name: "promise", label: "Brand promise", type: "textarea" },
      { name: "logo_url", label: "Logo", type: "image" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { name: "phone", label: "Phone number" },
      { name: "whatsapp", label: "WhatsApp number (digits only, with country code)" },
      { name: "email", label: "Email address" },
      { name: "address", label: "Office address" },
      { name: "google_maps_link", label: "Google Maps link" },
      { name: "business_hours", label: "Business hours", type: "textarea" },
    ],
  },
  {
    title: "Social media",
    fields: [
      { name: "facebook_url", label: "Facebook" },
      { name: "instagram_url", label: "Instagram" },
      { name: "twitter_url", label: "X / Twitter" },
      { name: "linkedin_url", label: "LinkedIn" },
      { name: "tiktok_url", label: "TikTok" },
      { name: "youtube_url", label: "YouTube" },
    ],
  },
  {
    title: "Homepage hero",
    fields: [
      { name: "hero_headline", label: "Headline" },
      { name: "hero_subheadline", label: "Supporting text", type: "textarea" },
      { name: "hero_image_url", label: "Background image", type: "image" },
      { name: "hero_video_url", label: "Background video URL" },
    ],
  },
  {
    title: "Statistics",
    fields: [
      { name: "stat_successful_applications", label: "Successful applications" },
      { name: "stat_countries_covered", label: "Countries covered" },
      { name: "stat_happy_clients", label: "Happy clients" },
      { name: "stat_years_experience", label: "Years of experience" },
    ],
  },
  {
    title: "About",
    fields: [
      { name: "vision", label: "Vision", type: "textarea" },
      { name: "mission", label: "Mission", type: "textarea" },
      { name: "about_story", label: "Company story", type: "textarea" },
    ],
  },
];

function Page() {
  const qc = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<Record<string, any>>({});

  const { data } = useQuery({
    queryKey: ["website_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("website_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      if (!data?.id) throw new Error("Settings record not found");
      const { id, created_at, updated_at, ...rest } = form;
      void id;
      void created_at;
      void updated_at;
      const { error } = await supabase.from("website_settings").update(rest).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Website settings saved");
      void qc.invalidateQueries({ queryKey: ["website_settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = (name: string, value: unknown) => setForm((f) => ({ ...f, [name]: value }));

  return (
    <form
      className="space-y-8 pb-16"
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate();
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl text-navy">Website Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            These details are used everywhere on the public website.
          </p>
        </div>
        <Button variant="gold" type="submit" disabled={save.isPending}>
          {save.isPending && <Loader2 className="size-4 animate-spin" />} Save changes
        </Button>
      </div>

      {groups.map((g) => (
        <section key={g.title} className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg text-navy">{g.title}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {g.fields.map((f) => (
              <div key={f.name} className={f.type === "textarea" || f.type === "image" ? "sm:col-span-2" : ""}>
                <Label htmlFor={f.name}>{f.label}</Label>
                <div className="mt-2">
                  {f.type === "textarea" ? (
                    <Textarea
                      id={f.name}
                      rows={3}
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  ) : f.type === "image" ? (
                    <MediaField value={form[f.name] ?? null} onChange={(v) => set(f.name, v)} folder="branding" />
                  ) : (
                    <Input id={f.name} value={form[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </form>
  );
}