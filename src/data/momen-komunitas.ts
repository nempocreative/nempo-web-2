import fotoHero from '@/assets/momen-komunitas-hero.jpg';
import fotoGowes from '@/assets/momen-komunitas-gowes.jpg';
import fotoWarung from '@/assets/momen-komunitas-warung.jpg';
import fotoBengkel from '@/assets/momen-komunitas-bengkel.jpg';
import fotoJalur from '@/assets/momen-komunitas-jalur.jpg';
import fotoUlangTahun from '@/assets/momen-komunitas-ulangtahun.jpg';
import asep from '@/assets/momen-komunitas-asep.webp';
import rina from '@/assets/momen-komunitas-rina.webp';
import bagas from '@/assets/momen-komunitas-bagas.webp';
import mira from '@/assets/momen-komunitas-mira.webp';
import yoga from '@/assets/momen-komunitas-yoga.webp';
import laras from '@/assets/momen-komunitas-laras.webp';
import { buatPesanDinding, type WallNote } from './year-book';

// Fictional community, people, and stories; all photographs are AI-generated.
// Route names use real Garut places only as scenery.
export const komunitasMeta = {
  nama: 'Kayuh Garut', usia: 5, berdiri: '12 Juni 2021', perayaan: '12 Juni 2026',
  tempat: 'Komunitas Sepeda · Garut', semboyan: 'Pelan asal bareng.',
  halaman: '/year-book/komunitas', foto: fotoHero,
};

export const prinsipKomunitas = [
  { judul: 'Tidak ada yang ditinggal', isi: 'Kecepatan rombongan mengikuti anggota paling pelan. Yang kuat menunggu di puncak tanjakan, bukan di garis akhir.' },
  { judul: 'Selalu ada penyapu', isi: 'Satu orang bergiliran jadi “sweeper” di paling belakang: membawa pompa, ban dalam, dan kesabaran ekstra.' },
  { judul: 'Pulang bareng, cerita bareng', isi: 'Gowes belum selesai sebelum teh manis di warung terakhir. Di situ rencana, curhat, dan ide baru biasanya lahir.' },
];

/** Members at the end of each year; the last entry is the current count. */
export const perjalananKomunitas = [
  { tahun: '2021', anggota: 8, judul: 'Delapan orang, Rabu malam', foto: fotoWarung, cerita: 'Pak Asep mengajak tujuh teman kantornya gowes keliling kota sepulang kerja. Rutenya cuma 15 kilometer, tapi obrolan di warung setelahnya berlangsung dua jam.', capaian: 'Gowes Rabu malam pertama · 15 km' },
  { tahun: '2022', anggota: 46, judul: 'Jersey hijau & Minggu pagi', foto: fotoGowes, cerita: 'Grup obrolan mulai ramai oleh teman dari teman. Jersey hijau pertama dicetak 40 potong — habis dalam seminggu — dan rute Minggu pagi ke pesawahan jadi agenda tetap.', capaian: 'Rute Minggu pagi · Jersey pertama' },
  { tahun: '2023', anggota: 118, judul: 'Kelas pemula pertama', foto: fotoHero, cerita: 'Banyak yang ingin ikut tapi ragu karena belum pernah gowes jauh. Lahirlah Sabtu Belajar: latihan mengatur gigi, menanjak, dan bersepeda aman di jalan raya.', capaian: '64 lulusan kelas pemula' },
  { tahun: '2024', anggota: 187, judul: 'Bengkel gratis keliling desa', foto: fotoBengkel, cerita: 'Kang Yoga membawa kotak perkakasnya ke balai desa. Setiap bulan, sepeda anak-anak yang rantainya putus atau bannya kempis diperbaiki gratis — sambil diajari cara merawatnya.', capaian: '420 sepeda anak diperbaiki' },
  { tahun: '2025', anggota: 254, judul: 'Merawat jalur yang kami lewati', foto: fotoJalur, cerita: 'Setelah melihat sampah di tepi tanjakan favorit, komunitas mulai bersih jalur tiga bulan sekali dan menanam bibit pohon di lereng yang gundul.', capaian: '1.300 bibit ditanam' },
  { tahun: '2026', anggota: 312, judul: 'Lima tahun dan satu tumpeng', foto: fotoUlangTahun, cerita: 'Perayaan sederhana di halaman balai warga: tumpeng, foto lama yang diputar ulang, dan Pak Asep yang tidak sanggup menyelesaikan sambutannya karena terharu.', capaian: 'Malam syukuran lima tahun' },
];

export const anggotaSekarang = perjalananKomunitas[perjalananKomunitas.length - 1].anggota;

/** New members gained in a year compared with the year before (the first year counts everyone). */
export function selisihAnggota(indeks: number) {
  const tahun = perjalananKomunitas[indeks];
  if (!tahun) return 0;
  const sebelumnya = perjalananKomunitas[indeks - 1];
  return tahun.anggota - (sebelumnya ? sebelumnya.anggota : 0);
}

/** Bar height for the member-growth chart, as a whole percentage with a visible minimum. */
export function tinggiBatang(jumlah: number, maks: number, minimum = 8) {
  if (maks <= 0) return minimum;
  return Math.max(minimum, Math.min(100, Math.round((jumlah / maks) * 100)));
}

export const angkaKomunitas = [
  { angka: '5 tahun', ket: 'Sejak Rabu malam pertama' },
  { angka: `${anggotaSekarang} anggota`, ket: 'Dari pelajar sampai pensiunan' },
  { angka: '260+', ket: 'Kali gowes bareng' },
  { angka: '18.400 km', ket: 'Ditempuh bersama' },
];

export const rutinitasKomunitas = [
  { kapan: 'Setiap Rabu · 19.30', nama: 'Rabu Malam Kota', jarak: '20 km', isi: 'Putaran santai keliling kota sepulang kerja, ditutup bandrek di alun-alun.' },
  { kapan: 'Setiap Minggu · 05.30', nama: 'Minggu Pagi Lembah', jarak: '45–70 km', isi: 'Rute utama menembus pesawahan dan kebun teh. Dibagi tiga kelompok kecepatan.' },
  { kapan: 'Sabtu pertama · 07.00', nama: 'Sabtu Belajar', jarak: '10 km', isi: 'Kelas pemula: mengatur gigi, posisi tubuh, menanjak, dan etika bersepeda di jalan.' },
  { kapan: 'Minggu ketiga · 09.00', nama: 'Bengkel Gratis', jarak: 'Keliling desa', isi: 'Perbaikan sepeda anak dan warga secara gratis, sekalian belajar merawat sendiri.' },
  { kapan: 'Tiga bulan sekali', nama: 'Bersih Jalur', jarak: 'Jalur favorit', isi: 'Memungut sampah di tepi tanjakan dan menanam bibit pohon bersama warga.' },
];

export const penggerakKomunitas = [
  { id: 'asep', nama: 'Asep Sopandi', peran: 'Pendiri', sejak: '2021', foto: asep, tugas: 'Mengajak delapan orang pertama dan sampai sekarang masih memimpin doa sebelum setiap gowes Minggu pagi.', cerita: 'Mulai bersepeda karena saran dokter. Lima tahun kemudian, ia punya tiga ratus teman baru dan kolesterol yang jauh lebih baik.', kesan: 'Saya cuma ingin sehat. Ternyata yang saya dapat keluarga.' },
  { id: 'rina', nama: 'Rina Marlina', peran: 'Ketua 2024–2026', sejak: '2022', foto: rina, tugas: 'Mengatur agenda, menjaga grup obrolan tetap hangat, dan memastikan komunitas tetap ramah untuk anggota perempuan.', cerita: 'Pertama ikut dengan sepeda pinjaman dan tertinggal di tanjakan pertama. Penyapu hari itu menemaninya sampai puncak — sejak itu ia tidak pernah absen.', kesan: 'Komunitas yang baik terasa dari cara ia menunggu yang paling belakang.' },
  { id: 'bagas', nama: 'Bagas Wicaksana', peran: 'Kapten Rute', sejak: '2022', foto: bagas, tugas: 'Mencoba setiap rute baru lebih dulu, menandai titik istirahat, dan membagi kelompok kecepatan.', cerita: 'Hafal hampir setiap warung teh di jalur selatan Garut, lengkap dengan gorengan andalannya.', kesan: 'Rute terbaik bukan yang paling jauh, tapi yang membuat semua orang ingin ikut lagi.' },
  { id: 'mira', nama: 'Mira Andriani', peran: 'Bendahara & Kas Sosial', sejak: '2023', foto: mira, tugas: 'Mengelola iuran sukarela, dana jersey, dan kas sosial untuk anggota yang sakit atau tertimpa musibah.', cerita: 'Catatan kasnya rapi sampai ke harga satu ban dalam. Laporan bulanan selalu ditutup dengan kalimat penyemangat.', kesan: 'Uang komunitas kecil, tapi kepercayaannya besar. Itu yang harus dijaga.' },
  { id: 'yoga', nama: 'Yoga Firmansyah', peran: 'Mekanik Komunitas', sejak: '2021', foto: yoga, tugas: 'Memimpin Bengkel Gratis, memeriksa sepeda sebelum rute panjang, dan mengajar perawatan dasar.', cerita: 'Tangannya hampir selalu bernoda oli. Anak-anak desa memanggilnya “Om Rantai”.', kesan: 'Sepeda yang dirawat akan membawa kita lebih jauh. Pertemanan juga begitu.' },
  { id: 'laras', nama: 'Laras Ayuningtyas', peran: 'Dokumentasi', sejak: '2024', foto: laras, tugas: 'Memotret setiap gowes, merangkum album bulanan, dan menulis cerita kecil tentang anggota.', cerita: 'Sering mengayuh di depan rombongan supaya bisa memotret semua orang saat lewat. Jarang ada di fotonya sendiri.', kesan: 'Lima tahun ini terlalu berharga untuk hanya tersimpan di galeri ponsel.' },
];

export const ruteFavorit = [
  { nama: 'Lingkar Situ Bagendit', jarak: 26, tanjakan: 120, tingkat: 'Pemula', cerita: 'Rute datar pertama untuk lulusan Sabtu Belajar. Selesai di tepi danau dengan pisang goreng.' },
  { nama: 'Kebun Teh Dayeuhmanggung', jarak: 48, tanjakan: 640, tingkat: 'Sedang', cerita: 'Tanjakan panjang yang dibayar lunas oleh hamparan kebun teh dan kabut pagi.' },
  { nama: 'Cipanas – Kamojang', jarak: 54, tanjakan: 1120, tingkat: 'Sulit', cerita: 'Rute ujian. Setiap anggota yang berhasil sampai atas mendapat tepuk tangan satu rombongan.' },
  { nama: 'Lembah Cisurupan', jarak: 70, tanjakan: 860, tingkat: 'Sulit', cerita: 'Rute anniversary tahunan, melewati kebun sayur dan desa-desa di kaki gunung.' },
];

export type KategoriAlbum = 'Gowes' | 'Sosial' | 'Kebersamaan';
export const albumKomunitas: { id: string; judul: string; kategori: KategoriAlbum; tanggal: string; foto: string; cerita: string }[] = [
  { id: 'hero', judul: 'Foto bersama di tanjakan kebun teh', kategori: 'Gowes', tanggal: 'Juni 2026', foto: fotoHero, cerita: 'Gowes anniversary kelima. Butuh empat kali hitungan sampai semua orang siap, dan dua kali lagi karena ada yang menutup mata.' },
  { id: 'gowes', judul: 'Matahari terbit di pesawahan', kategori: 'Gowes', tanggal: 'Mei 2026', foto: fotoGowes, cerita: 'Berangkat pukul 05.30 demi cahaya ini. Rombongan berhenti tiga kali hanya untuk memotret kabut.' },
  { id: 'warung', judul: 'Teh manis di warung Ceu Iyah', kategori: 'Kebersamaan', tanggal: 'Setiap Minggu', foto: fotoWarung, cerita: 'Warung langganan sejak tahun pertama. Ceu Iyah sudah hafal siapa yang minta teh tanpa gula.' },
  { id: 'bengkel', judul: 'Om Rantai dan murid-muridnya', kategori: 'Sosial', tanggal: 'Maret 2026', foto: fotoBengkel, cerita: 'Bengkel Gratis ke-24. Hari itu 31 sepeda anak diperbaiki, dan tiga anak berhasil memasang rantainya sendiri.' },
  { id: 'jalur', judul: 'Bibit untuk tanjakan favorit', kategori: 'Sosial', tanggal: 'Februari 2026', foto: fotoJalur, cerita: 'Dua karung sampah terkumpul dan 120 bibit ditanam. Kami berjanji kembali setahun lagi untuk melihat pertumbuhannya.' },
  { id: 'ulangtahun', judul: 'Tumpeng lima tahun', kategori: 'Kebersamaan', tanggal: '12 Juni 2026', foto: fotoUlangTahun, cerita: 'Potongan pertama untuk Pak Asep, potongan kedua untuk anggota tertua, dan sisanya habis dalam sepuluh menit.' },
];

export const kataAnggota = [
  { dari: 'Dede, anggota sejak 2023', teks: 'Dulu naik sepeda ke warung saja ngos-ngosan. Sekarang Kamojang sudah tiga kali.' },
  { dari: 'Ibu Euis, anggota tertua', teks: 'Umur 61, tetap ikut Minggu pagi. Anak-anak muda ini selalu menunggu saya di tanjakan.' },
  { dari: 'Fikri, 14 tahun', teks: 'Sepedaku diperbaiki di Bengkel Gratis. Sekarang aku yang membantu temanku pasang ban.' },
];

export const pesanKomunitas: WallNote[] = [
  { dari: 'Pak Asep', teks: 'Terima kasih sudah membuat ajakan gowes Rabu malam itu jadi sebesar ini. Pelan asal bareng, selamanya.' },
  { dari: 'Rina', teks: 'Untuk penyapu yang menunggu aku di tanjakan pertama: kamu alasan aku bertahan sampai sekarang.' },
  { dari: 'Yoga', teks: 'Lima tahun lagi, semoga anak-anak Bengkel Gratis yang memimpin rombongan.' },
  { dari: 'Laras', teks: 'Semua foto lima tahun ini sudah aku kumpulkan. Siap-siap terharu waktu kita buka bareng.' },
];

export function buatPesanKomunitas(nama: string, teks: string) {
  return buatPesanDinding(nama.trim() || 'Sahabat Kayuh Garut', teks);
}
