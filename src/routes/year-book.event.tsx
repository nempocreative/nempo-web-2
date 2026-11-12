import { createFileRoute } from '@tanstack/react-router';
import { NempoShell } from '@/components/nempo-shell';

export const Route = createFileRoute('/year-book/event')({
  head: () => ({ meta: [
    { title: 'Festival Lembah Senja 2026 — Momen Digital Event Nempo' },
    { name: 'description', content: 'Contoh after-movie digital satu festival di Garut: cuplikan foto, susunan acara, cerita persiapan, panitia, galeri, dan pesan pengunjung.' },
    { property: 'og:title', content: 'Festival Lembah Senja — Satu Sore, Seribu Suara' },
    { property: 'og:description', content: 'Kenangan satu acara dalam satu halaman: dari gerbang dibuka sampai lampu ponsel menyala, lengkap dengan cerita panitia.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: NempoShell,
});
