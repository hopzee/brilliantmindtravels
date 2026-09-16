import { createFileRoute } from "@tanstack/react-router";
import {
  ResourceManager,
  StatusBadge,
  statusField,
} from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/rbac/admin/blog")({
  component: Page,
});

const blogCategories = [
  { value: "visa-travel", label: "Visa & Travel" },
  { value: "study-abroad", label: "Study Abroad" },
  { value: "work-opportunities", label: "Work Opportunities" },
  { value: "scholarships", label: "Scholarships" },
  { value: "offers-promotions", label: "Offers & Promotions" },
  { value: "events-activities", label: "Events & Activities" },
  { value: "travel-tips", label: "Travel Tips" },
  { value: "company-news", label: "Company News" },
];

function Page() {
  return (
    <ResourceManager
      table="blog_posts"
      title="Blog Posts"
      description="Publish travel updates, opportunities, offers, events and useful information."
      slugFrom="title"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "author_name", label: "Author" },
        {
          key: "status",
          label: "Status",
          render: (r) => <StatusBadge status={r.status} />,
        },
      ]}
      fields={[
        {
          name: "title",
          label: "Title",
          required: true,
          placeholder: "Enter the article or update title",
        },
        {
          name: "slug",
          label: "Slug",
          help: "Leave empty to generate automatically from the title.",
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: blogCategories,
          required: true,
        },
        {
          name: "author_name",
          label: "Author",
          placeholder: "Brilliant Mind Travel & Tours",
        },
        {
          name: "excerpt",
          label: "Short description",
          type: "textarea",
          placeholder:
            "A short introduction that will appear on the Blog listing.",
          required: true,
        },
        {
          name: "content",
          label: "Content",
          type: "richtext",
          placeholder:
            "Write the full article, update, opportunity or event report here.",
          required: true,
        },
        {
          name: "tags",
          label: "Tags",
          type: "tags",
          placeholder: "Germany, visa, travel",
          help: "Separate each tag with a comma.",
        },
        {
          name: "featured_image",
          label: "Featured image",
          type: "image",
          help: "This is the main image shown on the Blog card.",
        },
        {
          name: "gallery-images",
          label: "Gallery images",
          type: "gallery",
          help: "Add additional photos for events, activities, tours or other blog posts.",
        },

        {
          name: "tiktok_url",
          label: "TikTok Link",
          placeholder: "https://www.tiktok.com/@username/video/...",
          help: "Add a TikTok video or profile link.",
        },
        {
          name: "facebook_url",
          label: "Facebook Link",
          placeholder: "https://www.facebook.com/...",
          help: "Add a Facebook post, page or video link.",
        },
        {
          name: "youtube_url",
          label: "YouTube Link",
          placeholder: "https://www.youtube.com/watch?v=...",
          help: "Add a YouTube video or channel link.",
        },
        {
          name: "whatsapp_url",
          label: "WhatsApp Link",
          placeholder: "https://wa.me/234...",
          help: "Add a WhatsApp chat or WhatsApp channel link.",
        },
        {
          name: "instagram_url",
          label: "Instagram Link",
          placeholder: "https://www.instagram.com/...",
          help: "Add an Instagram post, reel or profile link.",
        },
        {
          name: "twitter_url",
          label: "X / Twitter Link",
          placeholder: "https://x.com/...",
          help: "Add an X (formerly Twitter) post or profile link.",
        },
        {
          name: "threads_url",
          label: "Threads Link",
          placeholder: "https://www.threads.net/...",
          help: "Add a Threads post or profile link.",
        },
        {
          name: "image_url",
          label: "Image Link",
          placeholder: "https://example.com/image.jpg",
          help: "Add an external image URL if the image is hosted elsewhere.",
        },

        {
          name: "published_at",
          label: "Publish date",
          type: "date",
          help: "Choose the date the post should appear as published.",
        },
        statusField,
      ]}
    />
  );
}
