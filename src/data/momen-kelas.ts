// Momen Digital — kategori Kelas: isi contoh halaman kenangan satu kelas.
// Memakai kembali data yearbook (siswa XII IPA 1, wali kelas, foto momen)
// supaya contoh konsisten dengan halaman yearbook angkatan.
import {
  graduates,
  kelasInfo,
  moments,
  teacherMessages,
  yearBookMeta,
  type Graduate,
  type Kelas,
  type Moment,
  type WallNote,
} from "@/data/year-book";

export const kelasDemo: Kelas = "XII IPA 1";

export const kelasMeta = {
  nama: kelasDemo,
  sekolah: yearBookMeta.sekolah,
  tahunAjaran: "2025/2026",
  julukan: kelasInfo.find((k) => k.kelas === kelasDemo)?.julukan ?? "",
  motto: kelasInfo.find((k) => k.kelas === kelasDemo)?.motto ?? "",
  tagline: "Satu kelas, satu tahun penuh cerita — dari bangku paling depan sampai jendela belakang.",
  halaman: "/year-book/kelas",
};

export const waliKelas = teacherMessages.find((t) => t.kelas === kelasDemo);

export const siswaKelas: Graduate[] = graduates.filter((g) => g.kelas === kelasDemo);

export type StrukturKelas = {
  jabatan: string;
  graduateId: string;
};

export const strukturKelas: StrukturKelas[] = [
  { jabatan: "Ketua kelas", graduateId: "nadia" },
  { jabatan: "Wakil ketua", graduateId: "fajar" },
  { jabatan: "Sekretaris", graduateId: "kirana" },
  { jabatan: "Bendahara", graduateId: "rayhan" },
];

export const momenKelas: Moment[] = moments.filter((m) =>
  ["Kelas", "Tugas", "Masak", "Perut"].includes(m.tag),
);

export type KegiatanKelas = {
  nomor: string;
  judul: string;
  waktu: string;
  teks: string;
};

export const kegiatanKelas: KegiatanKelas[] = [
  { nomor: "01", judul: "Hari pertama naik kelas", waktu: "Juli 2025", teks: "Pindah ruangan, bagi bangku, dan langsung ribut soal siapa yang duduk dekat jendela." },
  { nomor: "02", judul: "Pentas seni sekolah", waktu: "Oktober 2025", teks: "Latihan tiap sore selama sebulan. Hasilnya: juara dua dan foto grup yang jadi wallpaper semua orang." },
  { nomor: "03", judul: "Kelas meeting dadakan", waktu: "Januari 2026", teks: "Rapat kelas soal dana kas yang ternyata cuma cukup buat gorengan. Tetap jadi rapat paling ramai tahun ini." },
  { nomor: "04", judul: "Perpisahan dengan wali kelas", waktu: "April 2026", teks: "Surat kecil dari tiap siswa dibacakan satu per satu. Tidak ada yang mengaku menangis." },
];

export const pesanKelas: WallNote[] = [
  { dari: "Nadia", teks: "Makasih sudah mau dipimpin ketua kelas yang galaknya cuma di depan." },
  { dari: "Rayhan", teks: "Catur kita belum selesai. Lanjut pas reuni, ya." },
  { dari: "Kirana", teks: "Semua momen kelas sudah kucatat. Tinggal dicetak nanti." },
  { dari: "Fajar", teks: "Kelas ini tim terbaik yang pernah kukapteni." },
];
