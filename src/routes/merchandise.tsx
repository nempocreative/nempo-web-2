import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/merchandise")({
  head: () => ({
    meta: [
      { title: "Merchandise Nempo × Kala Muda — Kaos, PDH & Aksesori" },
      { name: "description", content: "Koleksi konsep kaos, PDH lengan pendek dan panjang, rompi, gelang, lanyard, buku notes dan tumbler Nempo × Kala Muda dari berbagai sudut." },
      { property: "og:title", content: "Merchandise Nempo × Kala Muda — Kaos, PDH & Aksesori" },
      { property: "og:description", content: "Lihat desain kaos, PDH lengan pendek dan panjang, rompi, gelang, lanyard, buku notes dan tumbler komunitas Nempo × Kala Muda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NempoShell,
});
