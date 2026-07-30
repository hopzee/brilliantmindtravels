import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, StatusBadge, statusField } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/blog")({ component: Page });

function Page() {
  return (
    <ResourceManager
      table="blog_posts"
      title="Blog Posts"
      description="Articles, guides and travel news."
      slugFrom="title"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "author_name", label: "Author" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug" },
        { name: "category", label: "Category" },
        { name: "author_name", label: "Author" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Content", type: "richtext" },
        { name: "tags", label: "Tags", type: "tags" },
        { name: "featured_image", label: "Featured image", type: "image" },
        { name: "published_at", label: "Publish date", type: "date" },
        statusField,
      ]}
    />
  );
}