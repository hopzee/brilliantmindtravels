import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";
import { SiteLayout } from "@/components/public/SiteLayout";
import {
  CardSkeletons,
  EmptyState,
  PageHero,
  Reveal,
  SectionHeading,
} from "@/components/public/ui";
import { SmartImage } from "@/components/public/media";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { downloadsQuery, formatBytes } from "@/lib/cms";
import { cms } from "@/lib/db";

const title =
  "Travel & Visa Resources | Brilliant Mind Travels & Tours in Ede, Osun";

const description =
  "Download free visa checklists, study abroad guides, travel checklists and useful travel preparation resources from Brilliant Mind Travels & Tours in Ede, Osun.";

const canonicalUrl = "https://www.brilliantmindtravels.com/downloads";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Brilliant Mind Travels & Tours" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      {
        property: "og:site_name",
        content: "Brilliant Mind Travels & Tours",
      },
      { property: "og:locale", content: "en_NG" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
  }),
  component: DownloadsPage,
});

function formatDate(value?: string | null) {
  if (!value) return null;

  return new Date(value).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function DownloadCard({ item }: { item: any }) {
  const size = formatBytes(item.file_size);
  const uploaded = formatDate(item.created_at);

  const record = () => {
    void cms.rpc("increment_download", { _id: item.id });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      {item.cover_image ? (
        <SmartImage
          src={item.cover_image}
          alt={item.title}
          ratio="aspect-16/10"
          fit="contain"
        />
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex size-10 items-center justify-center rounded-md bg-navy/5 text-navy">
          <FileText className="size-4.5" />
        </span>

        <h3 className="mt-4 text-lg leading-snug text-navy">
          {item.title}
        </h3>

        {item.description ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        ) : null}

        <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {[item.file_type?.toUpperCase(), size, uploaded]
            .filter(Boolean)
            .join(" · ")}
        </p>

        <Button asChild variant="gold" size="lg" className="mt-5 w-full">
          <a
            href={item.file_url}
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={record}
          >
            <Download className="size-4" /> Download
          </a>
        </Button>
      </div>
    </article>
  );
}

function DownloadsPage() {
  const { data, isLoading } = useQuery(downloadsQuery);
  const items = data ?? [];
  const categories = Array.from(
    new Set(items.map((d: any) => d.category || "General")),
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Brilliant Mind Travels & Tours"
        title="Travel, Visa & Study Abroad Resources"
        intro="Download free checklists, guides and travel preparation resources from Brilliant Mind Travels & Tours in Ede, Osun."
      />

      <section className="bg-background py-20">
        <div className="container-page space-y-16">
          {isLoading ? (
            <CardSkeletons count={3} />
          ) : !items.length ? (
            <EmptyState
              title="Travel resources coming soon"
              text="Our consultants are preparing useful visa checklists, study abroad guides and travel resources for download."
            />
          ) : (
            categories.map((category, index) => (
              <div key={category}>
                <SectionHeading eyebrow="Resource category" title={category} />

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items
                    .filter(
                      (d: any) =>
                        (d.category || "General") === category,
                    )
                    .map((d: any, i: number) => (
                      <Reveal
                        key={d.id}
                        delay={(index + i) * 50}
                      >
                        <DownloadCard item={d} />
                      </Reveal>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <WhatsAppCta />
    </SiteLayout>
  );
}
