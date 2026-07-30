import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";

const title = "Administrator Login | Brilliant Mind Travels & Tours";
const description = "Secure sign-in for Brilliant Mind Travels & Tours website administrators.";

export const Route = createFileRoute("/rbac")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const validate = () => {
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return null;
    }
    return parsed.data;
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = validate();
    if (!values) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(values);
    setBusy(false);
    if (error) return toast.error(error.message);
    await supabase.rpc("claim_first_admin");
    toast.success("Welcome back");
    navigate({ to: "/dashboard" });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = validate();
    if (!values) return;
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      ...values,
      options: {
        emailRedirectTo: `${window.location.origin}/rbac`,
        data: { full_name: fullName.trim().slice(0, 100) },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (!data.session) {
      toast.success("Account created — check your email to confirm it, then sign in.");
      return;
    }
    await supabase.rpc("claim_first_admin");
    navigate({ to: "/dashboard" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-navy-foreground/15 bg-background p-8 shadow-[var(--shadow-elegant)]">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Lock className="size-3.5 text-gold" /> Administrator area
          </span>
          <h1 className="mt-3 text-2xl text-navy">Content management login</h1>
        </div>

        <Tabs defaultValue="signin" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Create account</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={signIn} className="mt-6 space-y-4">
              <Field id="email" label="Email" type="email" value={email} onChange={setEmail} />
              <Field id="password" label="Password" type="password" value={password} onChange={setPassword} />
              <Button type="submit" variant="gold" className="w-full" disabled={busy}>
                {busy && <Loader2 className="size-4 animate-spin" />} Sign in
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={signUp} className="mt-6 space-y-4">
              <Field id="fullName" label="Full name" value={fullName} onChange={setFullName} />
              <Field id="email2" label="Email" type="email" value={email} onChange={setEmail} />
              <Field id="password2" label="Password" type="password" value={password} onChange={setPassword} />
              <Button type="submit" variant="gold" className="w-full" disabled={busy}>
                {busy && <Loader2 className="size-4 animate-spin" />} Create account
              </Button>
              <p className="text-xs text-muted-foreground">
                The first account created becomes the site administrator.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2 text-left">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} required />
    </div>
  );
}