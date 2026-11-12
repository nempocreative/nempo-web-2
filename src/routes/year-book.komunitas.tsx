import { createFileRoute } from '@tanstack/react-router';
import { NempoShell } from '@/components/nempo-shell';

export const Route = createFileRoute('/year-book/komunitas')({
  head: () => ({ meta: [
    { title: '5 Tahun Kayuh Garut — Momen Digital Komunitas Nempo' },
    { name: 'description', content: 'Contoh halaman anniversary komunitas sepeda di Garut: cerita awal, pertumbuhan anggota tiap tahun, agenda rutin, penggerak, rute favorit, album, dan pesan.' },
    { property: 'og:title', content: 'Kayuh Garut — Lima Tahun, Pelan Asal Bareng' },
    { property: 'og:description', content: 'Dari delapan orang di Rabu malam sampai ratusan anggota: kenangan lima tahun satu komunitas dalam satu halaman.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: NempoShell,
});
