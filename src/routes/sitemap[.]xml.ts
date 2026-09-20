import { createFileRoute } from "@tanstack/react-router";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.brilliantmindtravels.com/</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/about</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/services</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/tours</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/blog</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/testimonials</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/reviews</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/faq</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/downloads</loc>
  </url>
  <url>
    <loc>https://www.brilliantmindtravels.com/contact</loc>
  </url>
</urlset>`;
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
          },
        }),
    },
  },
});
