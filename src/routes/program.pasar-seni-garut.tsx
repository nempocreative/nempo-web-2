import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/program/pasar-seni-garut")({
  head: () => ({
    meta: [
      { title: "Pasar Seni Garut 2027 — Proposal Program Nempo Garut × ESSE" },
      { name: "description", content: "Proposal kolaborasi Pasar Seni Garut 2027: festival UMKM, budaya, dan komunitas bernuansa pasar rakyat tempo dulu. Dibuka dengan kata sandi." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Pasar Seni Garut 2027 — Juara dari Pasar Rakyat" },
      { property: "og:description", content: "Proposal program Nempo Garut × ESSE untuk festival budaya, UMKM, dan komunitas kreatif di Garut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600;700&display=swap",
      },
    ],
  }),
  component: NempoShell,
});
