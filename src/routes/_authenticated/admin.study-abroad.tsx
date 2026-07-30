import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, StatusBadge, statusField } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/study-abroad")({ component: Page });

function Page() {
  return (
    <ResourceManager
      table="study_abroad_countries"
      title="Study Abroad Countries"
      description="Destination countries and their study information."
      slugFrom="title"
      columns={[
        { key: "title", label: "Country" },
        { key: "slug", label: "Slug" },
        { key: "is_featured", label: "Featured", render: (r) => (r.is_featured ? "Yes" : "No") },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: "title", label: "Country name", required: true },
        { name: "slug", label: "Slug" },
        { name: "flag_emoji", label: "Flag emoji" },
        { name: "short_description", label: "Short description", type: "textarea" },
        { name: "description", label: "Country overview", type: "richtext" },
        { name: "why_study_there", label: "Why study there", type: "richtext" },
        { name: "admission_requirements", label: "Admission requirements", type: "richtext" },
        { name: "visa_requirements", label: "Visa requirements", type: "richtext" },
        { name: "tuition_info", label: "Tuition information", type: "textarea" },
        { name: "scholarships", label: "Scholarships", type: "textarea" },
        { name: "featured_image", label: "Hero image", type: "image" },
        { name: "gallery_images", label: "Gallery", type: "gallery" },
        { name: "is_featured", label: "Feature on homepage", type: "switch" },
        { name: "sort_order", label: "Sort order", type: "number" },
        statusField,
      ]}
    />
  );
}