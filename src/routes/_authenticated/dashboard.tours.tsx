import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, StatusBadge, statusField } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/tours")({ component: Page });

function Page() {
  return (
    <ResourceManager
      table="tour_packages"
      title="Tour Packages"
      description="Holiday and group travel packages."
      slugFrom="title"
      columns={[
        { key: "title", label: "Package" },
        { key: "destination", label: "Destination" },
        { key: "duration", label: "Duration" },
        { key: "price", label: "Price", render: (r) => (r.price ? `${r.currency} ${Number(r.price).toLocaleString()}` : "—") },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: "title", label: "Package title", required: true },
        { name: "slug", label: "Slug" },
        { name: "destination", label: "Destination" },
        { name: "duration", label: "Duration", placeholder: "e.g. 7 days / 6 nights" },
        { name: "price", label: "Price", type: "number" },
        { name: "currency", label: "Currency", placeholder: "NGN" },
        { name: "short_description", label: "Short description", type: "textarea" },
        { name: "description", label: "Full description", type: "richtext" },
        {
          name: "included_services",
          label: "Included services",
          type: "tags",
          help: "Separate each item with a comma.",
        },
        { name: "excluded_services", label: "Excluded services", type: "tags" },
        { name: "featured_image", label: "Hero image", type: "image" },
        { name: "gallery_images", label: "Destination gallery", type: "gallery" },
        { name: "is_featured", label: "Feature on homepage", type: "switch" },
        statusField,
      ]}
      defaults={{ currency: "NGN" }}
    />
  );
}