import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tiktok-embed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const tiktokUrl = url.searchParams.get("url");

        if (!tiktokUrl) {
          return new Response(
            JSON.stringify({ error: "TikTok URL is required." }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        try {
          const parsedUrl = new URL(tiktokUrl);

          const allowedHosts = [
            "vt.tiktok.com",
            "vm.tiktok.com",
            "www.tiktok.com",
            "tiktok.com",
          ];

          if (!allowedHosts.includes(parsedUrl.hostname)) {
            return new Response(
              JSON.stringify({ error: "Invalid TikTok URL." }),
              {
                status: 400,
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
          }

          const response = await fetch(tiktokUrl, {
            redirect: "follow",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36",
            },
          });

          const finalUrl = response.url;

          const videoMatch = finalUrl.match(/\/video\/(\d+)/);

          if (!videoMatch) {
            return new Response(
              JSON.stringify({
                error: "Could not find the TikTok video ID.",
                finalUrl,
              }),
              {
                status: 404,
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
          }

          const videoId = videoMatch[1];

          return new Response(
            JSON.stringify({
              videoId,
              embedUrl: `https://www.tiktok.com/player/v1/${videoId}?controls=1&description=1&music_info=1`,
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=3600",
              },
            },
          );
        } catch (error) {
          console.error("TikTok resolver error:", error);

          return new Response(
            JSON.stringify({
              error: "Unable to resolve the TikTok video link.",
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }
      },
    },
  },
});
