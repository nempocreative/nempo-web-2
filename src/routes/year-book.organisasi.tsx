import { createFileRoute } from '@tanstack/react-router';
import { NempoShell } from '@/components/nempo-shell';

export const Route = createFileRoute('/year-book/organisasi')({
  head: () => ({ meta: [
    { title: 'Ruang Tumbuh — Momen Digital Organisasi Nempo' },
    { name: 'description', content: 'Arsip Kabinet Akar Asa 2025–2026: pengurus Ruang Tumbuh, program kerja, perjalanan, galeri kegiatan, dan pesan bersama.' },
    { property: 'og:title', content: 'Ruang Tumbuh — Satu Periode, Banyak Arti' },
    { property: 'og:description', content: 'Kenangan satu kepengurusan: orang-orang, aksi, dan pelajaran untuk generasi berikutnya dalam Momen Digital Nempo.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: NempoShell,
});