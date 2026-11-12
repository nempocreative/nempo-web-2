/**
 * Isi lonceng notifikasi (header) dan halaman /notifikasi.
 *
 * Satu sumber browser-safe: semua teks diambil dari halaman yang benar-benar
 * ada di situs ini — harga dari modul data layanan, judul acara dari
 * portofolio event, dan kanal kontak dari src/lib/contact.ts.
 * Nada penulisannya ajakan santai ("ayo join", "buat acara bareng kita"),
 * bukan daftar resmi.
 * Tidak ada tabel notifikasi di basis data, jadi isinya diambil dari konten
 * situs ini sendiri.
 */

export type NotificationType = "info" | "update" | "promo" | "event" | "warning";

export type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  /** Halaman tujuan. Harus rute yang terdaftar di src/nempo-app.tsx. */
  href: string;
  /** Berapa jam lalu notifikasi ini muncul, dihitung dari sekarang. */
  hoursAgo: number;
};

export const notificationItems: NotificationItem[] = [
  {
    id: 1,
    type: "update",
    title: "Ayo join Nempo Community!",
    message:
      "Open recruitment dibuka buat pelajar, mahasiswa, dan umum — tanpa biaya pendaftaran. Isi formulirnya sebentar, nanti tim Nempo nyapa kamu lewat WhatsApp.",
    href: "/recruitment",
    hoursAgo: 1,
  },
  {
    id: 2,
    type: "event",
    title: "Ada ide acara? Buat bareng kita!",
    message:
      "Mau bikin event, konser kecil, atau acara komunitas? Ceritain idenya ke tim Nempo — konsultasinya gratis.",
    href: "/contact",
    hoursAgo: 3,
  },
  {
    id: 3,
    type: "info",
    title: "Cek medsos kita, yuk!",
    message:
      "Follow Instagram @nempo.id dan TikTok @nempo.id biar nggak ketinggalan kabar event dan kegiatan terbaru.",
    href: "/contact",
    hoursAgo: 6,
  },
];

export type Notification = NotificationItem & { created_at: string };

/** Urut dari yang terbaru, dengan created_at dihitung dari hari ini. */
export function buildNotifications(now: Date = new Date()): Notification[] {
  return notificationItems
    .map((item) => ({
      ...item,
      created_at: new Date(now.getTime() - item.hoursAgo * 3_600_000).toISOString(),
    }))
    .sort((a, b) => a.hoursAgo - b.hoursAgo);
}
