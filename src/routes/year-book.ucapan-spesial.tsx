import { createFileRoute } from '@tanstack/react-router';
import { NempoShell } from '@/components/nempo-shell';

export const Route = createFileRoute('/year-book/ucapan-spesial')({
  head: () => ({ meta: [
    { title: 'Ucapan Spesial — Momen Digital Nempo' },
    { name: 'description', content: 'Contoh halaman ucapan untuk satu orang: ulang tahun pacar, ulang tahun sahabat, dan wisuda — dengan surat, kenangan, lilin untuk ditiup, dan ucapan dari teman.' },
    { property: 'og:title', content: 'Ucapan Spesial — Satu Halaman untuk Orang Tersayang' },
    { property: 'og:description', content: 'Amplop yang bisa dibuka, surat panjang, kenangan bersama, dan ucapan dari semua orang yang sayang dia.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: NempoShell,
});
