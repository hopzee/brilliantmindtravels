import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, StatusBadge, statusField } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/services")({ component: Page });

function Page() {
  return (
    <ResourceManager
      table="services"
      title="Services"
      description="Consultancy services shown on the website."
      slugFrom="title"
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", help: "Leave blank to generate from the title." },
        { name: "short_description", label: "Short description", type: "textarea" },
        { name: "description", label: "Full description", type: "richtext" },
        { name: "requirements", label: "Requirements", type: "richtext" },
        { name: "processing_info", label: "Processing information", type: "textarea" },
        { name: "featured_image", label: "Cover image", type: "image" },
        { name: "gallery_images", label: "Gallery", type: "gallery" },
        { name: "sort_order", label: "Sort order", type: "number" },
        statusField,
      ]}
    />
  );
}