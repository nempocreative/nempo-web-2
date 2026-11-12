import { NEMPO_WA_URL } from "@/lib/contact";

/**
 * Pilihan minat open recruitment Nempo Community — satu sumber untuk halaman
 * Recruitment dan halaman Komunitas.
 */
export const interestOptions = [
  "Designer",
  "Web Developer",
  "Content Creator",
  "Videografer dan Fotographer",
  "Marketing",
  "Event Management",
] as const;

/** Pilihan kategori asal pendaftar — satu sumber untuk formulir. */
export const originOptions = ["Sekolah", "Kuliah", "Umum"] as const;

/** Pilihan hobi; "Lainnya" diisi manual. */
export const hobbyOptions = ["Tari", "Bernyanyi", "Musik", "Lainnya"] as const;

export type CommunityApplication = {
  full_name: string;
  email: string;
  whatsapp: string;
  interest: string;
  origin_type: string;
  origin_name?: string;
  hobby?: string;
  reason?: string;
};

/** Isi pesan WhatsApp yang disiapkan setelah formulir diisi. */
export function buildApplicationMessage(app: CommunityApplication) {
  const lines = [
    "Halo Nempo! Saya mau daftar Kala Muda Community.",
    "",
    `Nama: ${app.full_name}`,
    `WhatsApp: ${app.whatsapp}`,
    `Email: ${app.email}`,
    `Asal: ${app.origin_type}${app.origin_name ? ` — ${app.origin_name}` : ""}`,
    `Minat: ${app.interest}`,
  ];
  if (app.hobby) lines.push(`Hobi: ${app.hobby}`);
  if (app.reason) lines.push(`Cerita: ${app.reason}`);
  return lines.join("\n");
}

/** Tautan WhatsApp resmi Nempo dengan isian formulir sudah terisi. */
export function applicationWaUrl(app: CommunityApplication) {
  return `${NEMPO_WA_URL}?text=${encodeURIComponent(buildApplicationMessage(app))}`;
}
