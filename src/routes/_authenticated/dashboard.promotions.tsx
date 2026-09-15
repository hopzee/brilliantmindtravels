import { createFileRoute } from "@tanstack/react-router";
import {
  ResourceManager,
  StatusBadge,
  statusField,
} from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/dashboard/promotions")({
  component: Page,
});

function Page() {
  return (
    <ResourceManager
      table="promotions"
      title="Campaigns & Promotions"
      description="Manage campaign flyers, offers and promotional content."
      columns={[
        { key: "title", label: "Campaign" },
        { key: "subtitle", label: "Subtitle" },
        { key: "placement", label: "Placement" },
        {
          key: "status",
          label: "Status",
          render: (r) => <StatusBadge status={r.status} />,
        },
      ]}
      fields={[
        { name: "title", label: "Campaign title", required: true },
        { name: "subtitle", label: "Subtitle" },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
        {
          name: "feature_image",
          label: "Featured image",
          type: "image",
        },
        {
          name: "gallery_images",
          label: "Gallery images",
          type: "image",
        },
        {
          name: "link_url",
          label: "Campaign link",
        },
        {
          name: "placement",
          label: "Placement",
        },
        {
          name: "sort_order",
          label: "Sort order",
          type: "number",
        },
        statusField,
      ]}
    />
  );
}
