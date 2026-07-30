import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ResourceManager, StatusBadge, statusField } from "@/components/admin/ResourceManager";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/universities")({ component: Page });

function Page() {
  const { data: countries } = useQuery({
    queryKey: ["country-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_abroad_countries")
        .select("id, title")
        .order("title");
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <ResourceManager
      table="universities"
      title="Universities"
      description="Partner institutions listed under each study destination."
      slugFrom="title"
      columns={[
        { key: "title", label: "University" },
        { key: "city", label: "City" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: "title", label: "University name", required: true },
        { name: "slug", label: "Slug" },
        {
          name: "country_id",
          label: "Country",
          type: "select",
          options: (countries ?? []).map((c) => ({ value: c.id, label: c.title })),
        },
        { name: "city", label: "City" },
        { name: "website_url", label: "Website URL" },
        { name: "description", label: "Description", type: "richtext" },
        { name: "featured_image", label: "Image", type: "image" },
        statusField,
      ]}
    />
  );
}