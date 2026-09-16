import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, StatusBadge, statusField } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/dashboard/country-services")({
  component: Page,
});

function Page() {
  return (
    <ResourceManager
      table="country_services"
      title="Country Services"
      description="Manage the countries you support and the available study, work and visit services."
      slugFrom="country_name"
      columns={[
        { key: "country_name", label: "Country" },
        {
          key: "study",
          label: "Study",
          render: (row) => (row.study ? "✓" : "—"),
        },
        {
          key: "visit",
          label: "Visit",
          render: (row) => (row.visit ? "✓" : "—"),
        },
        {
          key: "work",
          label: "Work",
          render: (row) => (row.work ? "✓" : "—"),
        },
        {
          key: "status",
          label: "Status",
          render: (row) => <StatusBadge status={row.status} />,
        },
      ]}
      fields={[
        {
          name: "country_name",
          label: "Country name",
          required: true,
          help: "Example: United Kingdom",
        },
        {
          name: "slug",
          label: "Slug",
          help: "Leave blank to generate automatically from the country name.",
        },
        {
          name: "study",
          label: "Study",
          type: "switch",
        },
        {
          name: "work",
          label: "Work",
          type: "switch",
        },
        {
          name: "visit",
          label: "Visit",
          type: "switch",
        },
        {
          name: "sort_order",
          label: "Sort order",
          type: "number",
          help: "Lower numbers appear first.",
        },
        statusField,
      ]}
    />
  );
}
