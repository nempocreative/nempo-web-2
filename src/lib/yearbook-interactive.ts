import type { Graduate } from "@/data/year-book";

export const CAPSULE_STORAGE_KEY = "nempo-yearbook-time-capsule-v1";
export const CAPSULE_MESSAGE_MAX = 2000;
export type TimeCapsule = { name: string; message: string; createdAt: string; opensAt: string };

export function filterGraduates(students: Graduate[], query: string, kelas: string) {
  const term = query.trim().toLocaleLowerCase("id-ID");
  return students.filter((student) =>
    (kelas === "semua" || student.kelas === kelas) &&
    `${student.nama} ${student.julukan} ${student.instagram}`.toLocaleLowerCase("id-ID").includes(term),
  );
}

export function createTimeCapsule(name: string, message: string, now: Date): TimeCapsule | null {
  const text = message.trim();
  if (!name.trim() || !text || text.length > CAPSULE_MESSAGE_MAX) return null;
  const year = now.getUTCFullYear() + 5;
  const month = now.getUTCMonth();
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const opens = new Date(now);
  opens.setUTCDate(1);
  opens.setUTCFullYear(year);
  opens.setUTCMonth(month);
  opens.setUTCDate(Math.min(now.getUTCDate(), lastDay));
  return { name: name.trim().slice(0, 50), message: text, createdAt: now.toISOString(), opensAt: opens.toISOString() };
}

export function parseTimeCapsule(value: string | null): TimeCapsule | null {
  try {
    const item: unknown = JSON.parse(value || "null");
    if (!item || typeof item !== "object") return null;
    const data = item as Record<string, unknown>;
    if (typeof data.name !== "string" || typeof data.message !== "string" || typeof data.createdAt !== "string" || typeof data.opensAt !== "string") return null;
    if (!data.name.trim() || !data.message.trim() || data.message.length > CAPSULE_MESSAGE_MAX || !Number.isFinite(Date.parse(data.createdAt)) || !Number.isFinite(Date.parse(data.opensAt))) return null;
    return { name: data.name, message: data.message, createdAt: data.createdAt, opensAt: data.opensAt };
  } catch { return null; }
}

export const yearbookPlaylist = [
  { title: "Sampai Jumpa", artist: "Endank Soekamti", moment: "Untuk perpisahan" },
  { title: "Sebuah Kisah Klasik", artist: "Sheila On 7", moment: "Untuk teman selamanya" },
  { title: "Monokrom", artist: "Tulus", moment: "Untuk yang selalu ada" },
  { title: "Ingatlah Hari Ini", artist: "Project Pop", moment: "Untuk ketawa bareng" },
  { title: "Kita", artist: "Sheila On 7", moment: "Untuk perjalanan kita" },
];

export function spotifySearchUrl(title: string, artist: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(`${title} ${artist}`)}`;
}
/** Lagu tema angkatan yang diputar langsung di halaman (pemutar musik melayang). */
export const yearbookThemeSong = {
  title: "Kita",
  artist: "Sheila On 7",
  src: "/yearbook/kita-sheila-on-7.mp3",
} as const;

/** Event browser untuk meminta pemutar musik yearbook memutar lagu tema. */
export const YEARBOOK_PLAY_EVENT = "yb-music-play";

/** Ubah detik menjadi "m:ss" untuk pemutar musik; nilai tidak valid menjadi "0:00". */
export function formatTrackTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
