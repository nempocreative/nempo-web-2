// Year Book — isi buku tahunan angkatan.
// Semua nama, julukan, kutipan, foto, dan pesan di bawah ini masih isian sementara,
// ditulis di kode supaya mudah diganti satu per satu.
import momentAngkatan from "@/assets/yearbook/momen-angkatan.webp";
import momentKumpul from "@/assets/yearbook/momen-kumpul-kelas.webp";
import momentHunting from "@/assets/yearbook/momen-hunting-foto.webp";
import momentAkustik from "@/assets/yearbook/momen-akustik.webp";
import momentMasak from "@/assets/yearbook/momen-masak.webp";
import momentRapat from "@/assets/yearbook/momen-rapat-panitia.webp";
import momentMakan from "@/assets/yearbook/momen-makan-kantin.webp";
import momentPodcast from "@/assets/yearbook/momen-podcast.webp";
import momentTari from "@/assets/yearbook/momen-latihan-tari.webp";
import fotoNadia from "@/assets/yearbook/siswa-nadia.webp";
import fotoRayhan from "@/assets/yearbook/siswa-rayhan.webp";
import fotoSalsa from "@/assets/yearbook/siswa-salsa.webp";
import fotoDimas from "@/assets/yearbook/siswa-dimas.webp";
import fotoAulia from "@/assets/yearbook/siswa-aulia.webp";
import fotoMaya from "@/assets/yearbook/siswa-maya.webp";
import fotoFajar from "@/assets/yearbook/siswa-fajar.webp";
import fotoSalma from "@/assets/yearbook/siswa-salma.webp";
import fotoGilang from "@/assets/yearbook/siswa-gilang.webp";
import fotoKirana from "@/assets/yearbook/siswa-kirana.webp";
import fotoRizky from "@/assets/yearbook/siswa-rizky.webp";
import fotoNayla from "@/assets/yearbook/siswa-nayla.webp";
import fotoHendra from "@/assets/yearbook/guru-hendra.webp";
import fotoRatna from "@/assets/yearbook/guru-ratna.webp";
import fotoYusuf from "@/assets/yearbook/guru-yusuf.webp";
import fotoKepsek from "@/assets/yearbook/kepala-sekolah.webp";

export const yearBookMeta = {
  angkatan: "2026",
  sekolah: "SMA Nempo Garut",
  julukanAngkatan: "Sejuta Cerita",
  tahunMasuk: 2023,
  tahunLulus: 2026,
  tagline: "Tiga tahun, satu angkatan, sejuta cerita yang kita simpan di sini.",
  halamanBuku: "/year-book/2026",
};

export const kelasList = ["XII IPA 1", "XII IPA 2", "XII IPS 1"] as const;
export type Kelas = (typeof kelasList)[number];

export type Graduate = {
  id: string;
  nama: string;
  julukan: string;
  instagram: string;
  kelas: Kelas;
  hobi: string;
  quote: string;
  citaCita: string;
  foto: string;
  warna: string;
};

export const graduates: Graduate[] = [
  { id: "nadia", instagram: "nadia.putri", nama: "Nadia Putri", julukan: "Ketua Angkatan", kelas: "XII IPA 1", hobi: "Paduan suara", quote: "Kita mungkin ambil arah berbeda, tapi pernah tumbuh di halaman yang sama.", citaCita: "Diplomat", foto: fotoNadia, warna: "#e0447c" },
  { id: "rayhan", instagram: "rayhan.aditya", nama: "Rayhan Aditya", julukan: "Si Paling Strategis", kelas: "XII IPA 1", hobi: "Catur & futsal", quote: "Seru-serunya sekolah: nggak pernah tahu cerita apa yang nunggu besok.", citaCita: "Insinyur sipil", foto: fotoRayhan, warna: "#2b6fd8" },
  { id: "fajar", instagram: "fajar.nugraha", nama: "Fajar Nugraha", julukan: "Kapten Lapangan", kelas: "XII IPA 1", hobi: "Basket & lari pagi", quote: "Habis lapangan ini, masih banyak lapangan lain yang menunggu.", citaCita: "Pelatih timnas", foto: fotoFajar, warna: "#2b3fd8" },
  { id: "kirana", instagram: "kirana.ayudia", nama: "Kirana Ayudia", julukan: "Pencatat Sejarah", kelas: "XII IPA 1", hobi: "Menulis & jurnalistik", quote: "Aku catat semuanya, biar nanti kita bisa baca lagi sambil ketawa.", citaCita: "Jurnalis", foto: fotoKirana, warna: "#d97706" },
  { id: "salsa", instagram: "salsa.nuraini", nama: "Salsa Nuraini", julukan: "Creative Soul", kelas: "XII IPA 2", hobi: "Menggambar & film analog", quote: "Makasih untuk semua tawa yang bikin hari biasa jadi istimewa.", citaCita: "Ilustrator", foto: fotoSalsa, warna: "#7c4ddb" },
  { id: "aulia", instagram: "aulia.rahma", nama: "Aulia Rahma", julukan: "Quiet Achiever", kelas: "XII IPA 2", hobi: "Olimpiade fisika", quote: "Kita selesai di sini, tapi cerita kita belum benar-benar selesai.", citaCita: "Peneliti antariksa", foto: fotoAulia, warna: "#e07b00" },
  { id: "salma", instagram: "salma.azzahra", nama: "Salma Azzahra", julukan: "Ibu Kandung Kelas", kelas: "XII IPA 2", hobi: "Memasak & baca novel", quote: "Menu terenak di sekolah: makan bareng pas jam istirahat.", citaCita: "Dokter anak", foto: fotoSalma, warna: "#c026d3" },
  { id: "nayla", instagram: "nayla.zahira", nama: "Nayla Zahira", julukan: "Gudang Cerita", kelas: "XII IPA 2", hobi: "Teater & nulis lirik", quote: "Kalau nanti kita ketemu lagi, ceritanya kita lanjutin, ya.", citaCita: "Penulis skenario", foto: fotoNayla, warna: "#db2777" },
  { id: "dimas", instagram: "dimas.pratama", nama: "Dimas Pratama", julukan: "Si Penghubung", kelas: "XII IPS 1", hobi: "Podcast & nongkrong", quote: "Teman baik selalu punya cara untuk tetap dekat.", citaCita: "Penyiar radio", foto: fotoDimas, warna: "#0d9488" },
  { id: "maya", instagram: "maya.kirana", nama: "Maya Kirana", julukan: "Si Paling Optimis", kelas: "XII IPS 1", hobi: "Menari & fotografi", quote: "Simpan yang baik-baik. Nanti kita akan rindu semuanya.", citaCita: "Fotografer", foto: fotoMaya, warna: "#e05244" },
  { id: "gilang", instagram: "gilang.saputra", nama: "Gilang Saputra", julukan: "DJ Kelas", kelas: "XII IPS 1", hobi: "Musik & editing video", quote: "Acara apa pun jadi hidup kalau lagunya pas.", citaCita: "Produser musik", foto: fotoGilang, warna: "#16a34a" },
  { id: "rizky", instagram: "rizky.ramadhan", nama: "Rizky Ramadhan", julukan: "Si Rajin Telat", kelas: "XII IPS 1", hobi: "Skateboard & gaming", quote: "Maaf untuk semua telatku. Makasih udah nyimpenin tempat duduk.", citaCita: "Pengusaha", foto: fotoRizky, warna: "#4f46e5" },
];

export function graduateInstagramUrl(username: string): string {
  return `https://www.instagram.com/${encodeURIComponent(username)}/`;
}

export type Moment = {
  src: string;
  caption: string;
  tag: string;
  featured?: boolean;
};

export const moments: Moment[] = [
  { src: momentAngkatan, caption: "Foto bareng satu angkatan", tag: "Angkatan", featured: true },
  { src: momentKumpul, caption: "Ngobrol habis bel pulang", tag: "Kelas" },
  { src: momentHunting, caption: "Hunting foto tugas sekolah", tag: "Tugas" },
  { src: momentAkustik, caption: "Akustikan di tangga sekolah", tag: "Sore" },
  { src: momentMasak, caption: "Praktik masak masakan Sunda", tag: "Masak" },
  { src: momentRapat, caption: "Rapat panitia perpisahan", tag: "Panitia" },
  { src: momentMakan, caption: "Makan bareng di kantin", tag: "Perut" },
  { src: momentPodcast, caption: "Rekam podcast angkatan", tag: "Suara" },
  { src: momentTari, caption: "Latihan jaipong buat pentas", tag: "Pentas" },
];

export const chapters = [
  { number: "01", title: "Hari pertama", date: "Juli 2023", text: "Seragam masih kaku, nama teman belum hafal, dan bangku yang akhirnya jadi tempat pulang." },
  { number: "02", title: "Tumbuh bareng", date: "2024 — 2025", text: "Dari tugas kelompok sampai obrolan setelah bel pulang, pelan-pelan kita jadi satu angkatan." },
  { number: "03", title: "Tahun terakhir", date: "2026", text: "Ujian, pentas, dan panitia perpisahan — semua kita kerjakan sambil pura-pura tidak sedih." },
  { number: "04", title: "Sampai jumpa", date: "April 2026", text: "Kita tutup satu bab dengan bangga, bawa cerita lebih banyak dari yang muat ditulis di sini." },
];

export type TeacherMessage = {
  nama: string;
  mapel: string;
  kelas: Kelas;
  foto: string;
  pesan: string;
};

export const teacherMessages: TeacherMessage[] = [
  { nama: "Bapak Hendra", mapel: "Wali Kelas XII IPA 1", kelas: "XII IPA 1", foto: fotoHendra, pesan: "Kalian bukan kelas paling tenang, tapi kalian kelas paling hidup. Itu yang bikin saya ingat terus." },
  { nama: "Ibu Ratna", mapel: "Wali Kelas XII IPA 2", kelas: "XII IPA 2", foto: fotoRatna, pesan: "Nilai bisa lupa, tapi cara kalian saling jaga waktu acara sekolah tidak akan saya lupa." },
  { nama: "Bapak Yusuf", mapel: "Wali Kelas XII IPS 1", kelas: "XII IPS 1", foto: fotoYusuf, pesan: "Pergi jauh, pulang kalau sempat. Kelas ini selalu punya tempat buat kalian." },
];

export type KelasInfo = {
  kelas: Kelas;
  julukan: string;
  motto: string;
  warna: string;
};

export const kelasInfo: KelasInfo[] = [
  { kelas: "XII IPA 1", julukan: "Kelas Paling Hidup", motto: "Ribut boleh, kompak wajib.", warna: "#2b3fd8" },
  { kelas: "XII IPA 2", julukan: "Keluarga Lab Kimia", motto: "Kalau gagal, ulang lagi bareng-bareng.", warna: "#c026d3" },
  { kelas: "XII IPS 1", julukan: "Pasukan Bel Pulang", motto: "Belajar serius, pulangnya lebih serius.", warna: "#0d9488" },
];

export const kepalaSekolah = {
  nama: "Ibu Dra. Siti Marlina",
  jabatan: "Kepala Sekolah",
  foto: fotoKepsek,
  sambutan: [
    "Anak-anakku angkatan 2026, tiga tahun terasa singkat, tapi kalian mengisinya dengan sangat penuh: prestasi, pentas, kepanitiaan, dan tentu saja tawa di setiap sudut sekolah.",
    "Bawalah kejujuran, rasa ingin tahu, dan semangat saling menjaga yang kalian pelajari di sini. Ke mana pun langkah kalian, sekolah ini selalu menjadi rumah untuk pulang.",
  ],
};

export type Superlative = {
  gelar: string;
  graduateId: string;
};

export const superlatives: Superlative[] = [
  { gelar: "Paling mungkin jadi menteri", graduateId: "nadia" },
  { gelar: "Paling sering telat", graduateId: "rizky" },
  { gelar: "Senyum termanis", graduateId: "maya" },
  { gelar: "Paling mungkin terkenal", graduateId: "gilang" },
  { gelar: "Otak paling encer", graduateId: "aulia" },
  { gelar: "Teman curhat terbaik", graduateId: "salma" },
];

export const wallNotes: WallNote[] = [
  { dari: "Dimas", teks: "Nanti kalau udah kerja, jangan cuma muncul di grup ya." },
  { dari: "Maya", teks: "Sisa foto hunting masih di flashdiskku. Ambil sebelum kehapus!" },
  { dari: "Kirana", teks: "Aku simpan semua koran dinding kalian. Suatu hari jadi buku." },
  { dari: "Fajar", teks: "Lapangan nanti kita main lagi, ya. Janji." },
  { dari: "Salma", teks: "Kalau rindu, mampir. Aku masak." },
  { dari: "Nayla", teks: "Naskah drama kita belum kelar. Lanjut lain waktu!" },
];

// ── Kolom kirim pesan di dinding (hanya tersimpan di layar pengunjung) ──

export const WALL_TEXT_MAX = 140;
export const WALL_NAME_MAX = 24;
export const WALL_DEFAULT_NAME = "Teman sekelas";

export const pesanLucuIde = [
  "Utang gorengan di kantin belum lunas. Kutagih pas reuni!",
  "Makasih udah jadi alarm hidupku tiap jam pertama.",
  "Jangan lupa, kamu pernah tidur pas upacara. Ada fotonya.",
  "Semoga sukses! Kalau kaya, traktir seblak satu angkatan.",
  "PR fisika kita akhirnya selesai juga… tiga tahun kemudian.",
  "Kangen dimarahin bareng gara-gara ribut di kelas.",
  "Nanti kalau ketemu di jalan, pura-pura kenal ya.",
  "Tetap jadi orang paling heboh di grup kelas!",
];

export type WallNote = { dari: string; teks: string };

const rapikan = (s: string) => s.replace(/\s+/g, " ").trim();

export function buatPesanDinding(nama: string, teks: string): { ok: true; note: WallNote } | { ok: false; error: string } {
  const isi = rapikan(teks);
  if (isi.length < 2) return { ok: false, error: "Tulis pesannya dulu, ya." };
  if (isi.length > WALL_TEXT_MAX) return { ok: false, error: `Pesan maksimal ${WALL_TEXT_MAX} huruf.` };
  const dari = rapikan(nama).slice(0, WALL_NAME_MAX) || WALL_DEFAULT_NAME;
  return { ok: true, note: { dari, teks: isi } };
}

// ── Penjelasan layanan Year Book (dipakai halaman /year-book) ──

export type YearBookIsi = {
  judul: string;
  teks: string;
};

export const yearBookIsi: YearBookIsi[] = [
  { judul: "Profil lulusan", teks: "Satu halaman per siswa: nama, kelas, hobi, dan kutipan pilihan sendiri." },
  { judul: "Galeri momen", teks: "Foto satu tahun penuh — kumpul angkatan, tugas, pentas, sampai makan bareng." },
  { judul: "Linimasa angkatan", teks: "Cerita berurutan dari hari pertama masuk sampai hari perpisahan." },
  { judul: "Pesan guru", teks: "Kata wali kelas dan guru untuk angkatan, dicetak persis seperti ditulis." },
  { judul: "Dinding pesan", teks: "Catatan singkat antarteman, ditempel seperti di mading sekolah." },
  { judul: "Sampul & identitas", teks: "Nama sekolah, angkatan, dan julukan angkatan di sampul depan." },
];

export type YearBookLangkah = {
  nomor: string;
  judul: string;
  teks: string;
};

export const yearBookLangkah: YearBookLangkah[] = [
  { nomor: "01", judul: "Konsultasi", teks: "Ceritakan angkatanmu: jumlah siswa, jumlah kelas, dan buku yang diinginkan." },
  { nomor: "02", judul: "Kumpulkan isi", teks: "Kami kirim formulir isian untuk siswa, guru, dan panitia biar datanya rapi." },
  { nomor: "03", judul: "Desain & tinjau", teks: "Tata letak dan foto disusun, lalu kamu tinjau sampai benar-benar pas." },
  { nomor: "04", judul: "Cetak & bagikan", teks: "Buku dicetak atau dibagikan sebagai tautan digital ke seluruh angkatan." },
];

export type YearBookBentuk = {
  nama: string;
  ringkas: string;
  poin: string[];
};

export const yearBookBentuk: YearBookBentuk[] = [
  {
    nama: "Cetak",
    ringkas: "Buku fisik untuk dipegang, disimpan, dan dibagikan ke angkatan.",
    poin: ["Pilihan ukuran dan jenis kertas", "Sampul tebal dengan nama angkatan", "Dibagikan pas hari perpisahan"],
  },
  {
    nama: "Digital",
    ringkas: "Buku tahunan yang dibuka lewat tautan, bisa dibagikan ke mana saja.",
    poin: ["Tautan khusus untuk angkatan", "Foto bisa dibuka ukuran penuh", "Isinya bisa ditambah setelah cetak"],
  },
];
