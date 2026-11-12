/** Browser-safe list of Nempo programs shown on /program. No access codes live here. */
export type ProgramNempo = {
  slug: string;
  judul: string;
  tagline: string;
  ringkas: string;
  mitra: string;
  tahun: string;
  lokasi: string;
  sampul: string;
  jumlahSlide: number;
  terkunci: boolean;
  sorotan: string[];
};

export const PROGRAM_NEMPO: ProgramNempo[] = [
  {
    slug: "pasar-seni-garut",
    judul: "Pasar Seni Garut 2027",
    tagline: "Juara dari Pasar Rakyat — Dari Tradisi Lahir Juara",
    ringkas:
      "Festival UMKM, budaya, dan komunitas yang menghidupkan lagi suasana pasar rakyat tempo dulu: kuliner tradisional, kaulinan barudak, panggung seni, dan produk kreatif lokal Garut.",
    mitra: "Nempo Garut × ESSE",
    tahun: "2027",
    lokasi: "Garut, Jawa Barat",
    sampul: "/media/pasar-seni-garut/cover-hero.webp",
    jumlahSlide: 38,
    terkunci: true,
    sorotan: ["Pasar UMKM & Kampung Kuliner", "Heritage Stage & Kaulinan", "Duta Pasar Seni & Koin Juara", "Rundown 3 hari"],
  },
];

export function cariProgram(slug: string): ProgramNempo | undefined {
  return PROGRAM_NEMPO.find((p) => p.slug === slug);
}

/** Moves between slides without wrapping: the deck stops at the cover and the closing slide. */
export function geserSlideProgram(sekarang: number, arah: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(total - 1, Math.max(0, sekarang + arah));
}
