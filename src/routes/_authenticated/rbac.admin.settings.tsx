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
import { cms } from "@/lib/db";

export const Route = createFileRoute("/_authenticated/rbac/admin/settings")({
  component: Page,
});

type Group = {
  title: string;
  fields: {
    name: string;
    label: string;
    type?: "text" | "textarea" | "image";
  }[];
};

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
      {
        name: "whatsapp",
        label: "WhatsApp number (digits only, with country code)",
      },
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
      {
        name: "hero_subheadline",
        label: "Supporting text",
        type: "textarea",
      },
      {
        name: "hero_image_url",
        label: "Background image",
        type: "image",
      },
      { name: "hero_video_url", label: "Background video URL" },
    ],
  },
  {
    title: "Statistics",
    fields: [
      {
        name: "stat_successful_applications",
        label: "Successful applications",
      },
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

  const [adminEmail, setAdminEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data } = useQuery({
    queryKey: ["website_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("website_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data: userData }) => {
      setAdminEmail(userData.user?.email ?? "");
    });
  }, []);

  const save = useMutation({
    mutationFn: async () => {
      if (!data?.id) throw new Error("Settings record not found");

      const { id, created_at, updated_at, ...rest } = form;

      void id;
      void created_at;
      void updated_at;

      const { error } = await cms
        .from("website_settings")
        .update(rest)
        .eq("id", data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Website settings saved");
      void qc.invalidateQueries({ queryKey: ["website_settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const changeEmail = useMutation({
    mutationFn: async () => {
      const email = adminEmail.trim();

      if (!email) {
        throw new Error("Enter an email address");
      }

      const { data: userData } = await supabase.auth.getUser();

      if (email === userData.user?.email) {
        throw new Error("This is already your current admin email");
      }

      const { error } = await supabase.auth.updateUser({
        email,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(
        "Email change requested. Check your email for the confirmation link.",
      );
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const changePassword = useMutation({
    mutationFn: async () => {
      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Admin password changed successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = (name: string, value: unknown) =>
    setForm((f) => ({ ...f, [name]: value }));

  return (
    <div className="space-y-8 pb-16">
      <form
        className="space-y-8"
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
            {save.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Save changes
          </Button>
        </div>

        {groups.map((g) => (
          <section
            key={g.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-lg text-navy">{g.title}</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {g.fields.map((f) => (
                <div
                  key={f.name}
                  className={
                    f.type === "textarea" || f.type === "image"
                      ? "sm:col-span-2"
                      : ""
                  }
                >
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
                      <MediaField
                        value={form[f.name] ?? null}
                        onChange={(v) => set(f.name, v)}
                        folder="branding"
                      />
                    ) : (
                      <Input
                        id={f.name}
                        value={form[f.name] ?? ""}
                        onChange={(e) => set(f.name, e.target.value)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </form>

      <section className="rounded-xl border border-border bg-card p-6">
        <div>
          <h2 className="text-lg text-navy">Admin Account Security</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Change the email address and password used to access the admin
            dashboard.
          </p>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-navy">Admin email</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                A confirmation email may be sent when you change this address.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin email address</Label>
              <Input
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>

            <Button
              type="button"
              variant="gold"
              onClick={() => changeEmail.mutate()}
              disabled={changeEmail.isPending}
            >
              {changeEmail.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Change admin email
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-navy">Admin password</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Use at least 8 characters. Both password fields must match.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                Confirm new password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                minLength={8}
              />
            </div>

            <Button
              type="button"
              variant="gold"
              onClick={() => changePassword.mutate()}
              disabled={changePassword.isPending}
            >
              {changePassword.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Change admin password
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
