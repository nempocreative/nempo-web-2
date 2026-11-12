// Pure helpers for the Instagram feed version of a greeting (1080 × 1350 slides drawn on a canvas).
// Browser-safe: no DOM access, so the page and the tests share the same content rules.
import { isiSurat, type JenisUcapan, type Ucapan } from './ucapan-spesial';

export const FEED_WIDTH = 1080;
export const FEED_HEIGHT = 1350;
export const JUMLAH_SLIDE = 3;

export type SlideFeed =
  | { jenis: 'sampul'; label: string; judul: string; keterangan: string }
  | { jenis: 'surat'; label: string; isi: string; penutup: string; tandaTangan: string }
  | { jenis: 'alasan'; label: string; judul: string; poin: { depan: string; isi: string }[]; penutup: string };

/** Fictional account names shown on the post mockup. */
export const AKUN_FEED: Record<JenisUcapan, string> = {
  pacar: 'bayu.untuk.alya',
  sahabat: 'gengkosan.mawar',
  wisuda: 'keluarga.salsa',
};

const TAGAR: Record<JenisUcapan, string> = {
  pacar: '#selamatulangtahun #ulangtahun #birthday',
  sahabat: '#selamatulangtahun #sahabat #gengkosan',
  wisuda: '#wisuda #graduation #sarjanabaru',
};

/** Three slides: cover with photo, the first letter paragraph, then the four little reasons. */
export function slideFeed(ucapan: Ucapan): SlideFeed[] {
  return [
    { jenis: 'sampul', label: `${ucapan.acara} · ${ucapan.tanggal}`, judul: ucapan.judul, keterangan: ucapan.keterangan },
    { jenis: 'surat', label: 'Sepucuk surat', isi: isiSurat(ucapan, ucapan.surat[0] ?? ''), penutup: ucapan.penutup, tandaTangan: ucapan.tandaTangan },
    { jenis: 'alasan', label: 'Geser terus', judul: ucapan.alasanJudul, poin: ucapan.alasan.slice(0, 4), penutup: `Dengan sayang, ${ucapan.dari}` },
  ];
}

/** Ready-to-paste caption; the age comes from the same letter text, so it never disagrees with the slide. */
export function captionFeed(ucapan: Ucapan) {
  return `${ucapan.judul}.\n\n${isiSurat(ucapan, ucapan.surat[0] ?? '')}\n\n— ${ucapan.dari}\n\n${TAGAR[ucapan.id]}`;
}

export function namaFileFeed(ucapan: Ucapan, index: number) {
  return `ucapan-${ucapan.id}-${ucapan.penerima.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-slide-${index + 1}.png`;
}

/** Moves between slides and wraps around at both ends. */
export function geserSlide(index: number, arah: number, total = JUMLAH_SLIDE) {
  return ((index + arah) % total + total) % total;
}
