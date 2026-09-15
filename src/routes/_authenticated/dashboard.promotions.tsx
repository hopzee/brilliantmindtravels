import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, StatusBadge, statusField } from "@/components/admin/ResourceManager";

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
        { key: "country", label: "Country" },
        { key: "start_date", label: "Start date" },
        { key: "end_date", label: "End date" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: "title", label: "Campaign title", required: true },
        { name: "country", label: "Country / destination" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Campaign image", type: "image" },
        { name: "start_date", label: "Start date", type: "date" },
        { name: "end_date", label: "End date", type: "date" },
        statusField,
      ]}
    />
  );
}
