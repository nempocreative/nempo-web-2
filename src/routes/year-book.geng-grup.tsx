import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/year-book/geng-grup")({
  head: () => ({ meta: [
    { title: "Teman Sore — Momen Digital Geng & Grup Nempo" },
    { name: "description", content: "Album pertemanan Teman Sore: profil empat teman, cerita sejak 2023, galeri momen, playlist kenangan, dan pesan bersama." },
    { property: "og:title", content: "Teman Sore — Album Pertemanan Nempo" },
    { property: "og:description", content: "Beda jalan pulang, tetap satu meja. Kenangan Geng & Grup dalam satu album digital." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: NempoShell,
});