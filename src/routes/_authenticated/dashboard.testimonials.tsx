import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, StatusBadge, statusField } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/dashboard/testimonials")({ component: Page });

function Page() {
  return (
    <ResourceManager
      table="testimonials"
      title="Testimonials"
      description="Client success stories, photos and video testimonials."
      columns={[
        { key: "client_name", label: "Client" },
        { key: "service_used", label: "Service" },
        { key: "country", label: "Country" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: "client_name", label: "Client name", required: true },
        { name: "service_used", label: "Service used" },
        { name: "country", label: "Country / destination" },
        { name: "rating", label: "Rating (1-5)", type: "number" },
        { name: "content", label: "Testimonial", type: "textarea" },
        { name: "featured_image", label: "Client photo", type: "image" },
        {
          name: "video_url",
          label: "Video",
          type: "image",
          help: "Upload a video file or paste a YouTube link.",
        },
        statusField,
      ]}
    />
  );
}