import fotoPanggung from '@/assets/momen-event-panggung.jpg';
import fotoPenonton from '@/assets/momen-event-penonton.jpg';
import fotoAngklung from '@/assets/momen-event-angklung.jpg';
import fotoPersiapan from '@/assets/momen-event-persiapan.jpg';
import fotoBazar from '@/assets/momen-event-bazar.jpg';
import fotoPenutupan from '@/assets/momen-event-penutupan.jpg';
import raka from '@/assets/momen-event-raka.webp';
import intan from '@/assets/momen-event-intan.webp';
import gilang from '@/assets/momen-event-gilang.webp';
import ayu from '@/assets/momen-event-ayu.webp';
import dimas from '@/assets/momen-event-dimas.webp';
import nisa from '@/assets/momen-event-nisa.webp';
import { buatPesanDinding, type WallNote } from './year-book';

// Fictional festival, people, and stories; all photographs are AI-generated.
export const eventMeta = {
  nama: 'Festival Lembah Senja', edisi: 'Edisi Pertama', tahun: '2026',
  tanggal: 'Sabtu, 15 Agustus 2026', jam: '14.00 — 22.30 WIB', tempat: 'Lapang Bukit Senja, Garut',
  tagline: 'Satu sore, seribu suara.', halaman: '/year-book/event', foto: fotoPanggung,
};

export const angkaEvent = [
  { angka: '1 hari', ket: 'Delapan setengah jam bersama' },
  { angka: '6 penampil', ket: 'Dari angklung sampai indie' },
  { angka: '1.200+', ket: 'Pengunjung datang' },
  { angka: '24 UMKM', ket: 'Jajanan & karya lokal' },
];

export type KategoriFoto = 'Panggung' | 'Penonton' | 'Di Balik Layar';
export const fotoEvent: { id: string; judul: string; kategori: KategoriFoto; waktu: string; foto: string; lebar: number; tinggi: number; cerita: string }[] = [
  { id: 'persiapan', judul: 'Panggung yang dibangun dari nol', kategori: 'Di Balik Layar', waktu: 'H-1 · 10.15', foto: fotoPersiapan, lebar: 1600, tinggi: 1008, cerita: 'Lantai panggung dipasang panel demi panel sejak pagi. Gerimis sempat datang dua kali; tim produksi menutup kabel dengan terpal sambil tetap bercanda soal siapa yang lupa bawa jas hujan.' },
  { id: 'angklung', judul: 'Bambu yang membuka sore', kategori: 'Panggung', waktu: '15.30', foto: fotoAngklung, lebar: 1600, tinggi: 1008, cerita: 'Sanggar Angklung Wangi membuka festival. Banyak pengunjung belum masuk area panggung, tapi suara bambunya terdengar sampai gerbang dan pelan-pelan menarik orang mendekat.' },
  { id: 'panggung', judul: 'Lagu pertama saat langit berubah jingga', kategori: 'Panggung', waktu: '18.32', foto: fotoPanggung, lebar: 1600, tinggi: 1008, cerita: 'Lintas Senja naik panggung tepat ketika matahari turun di balik gunung. Tim produksi menunda pembukaan dua menit supaya cahayanya pas — dua menit paling mahal sepanjang hari.' },
  { id: 'bazar', judul: 'Antrean serabi yang tidak pernah habis', kategori: 'Penonton', waktu: '19.10', foto: fotoBazar, lebar: 1264, tinggi: 848, cerita: 'Dua puluh empat lapak UMKM mengisi jalur bazar. Ibu penjual serabi sampai dua kali menambah adonan, dan panitia konsumsi akhirnya ikut antre sebagai pembeli.' },
  { id: 'penonton', judul: 'Satu lagu, semua ikut bernyanyi', kategori: 'Penonton', waktu: '20.41', foto: fotoPenonton, lebar: 1600, tinggi: 1008, cerita: 'Saat Rengganis membawakan lagu paling dikenal, mikrofon sengaja diarahkan ke penonton. Separuh lirik dinyanyikan oleh lapangan — momen yang paling sering dikirim ulang keesokan harinya.' },
  { id: 'penutupan', judul: 'Lampu ponsel untuk yang bekerja di belakang', kategori: 'Di Balik Layar', waktu: '22.24', foto: fotoPenutupan, lebar: 1600, tinggi: 1008, cerita: 'Di akhir acara, panitia dipanggil ke panggung. Penonton menyalakan lampu ponsel — pertama kalinya banyak dari kami melihat lapangan dari sisi panggung, dan tidak ada yang sanggup bicara.' },
];

export const rundownEvent = [
  { jam: '14.00', judul: 'Gerbang dibuka', ket: 'Penukaran gelang, bazar UMKM mulai buka, musik latar dari DJ lokal.' },
  { jam: '15.30', judul: 'Sanggar Angklung Wangi', ket: 'Pembuka bernuansa Sunda: angklung, kendang, dan lagu daerah yang diaransemen ulang.' },
  { jam: '16.30', judul: 'Kopi Hujan', ket: 'Duo akustik folk yang membuat penonton duduk santai di rumput.' },
  { jam: '17.30', judul: 'Jeda magrib & lapak karya', ket: 'Panggung istirahat; pengunjung berkeliling bazar dan pameran foto Garut.' },
  { jam: '18.30', judul: 'Lintas Senja', ket: 'Band pop yang tampil tepat saat matahari terbenam.' },
  { jam: '19.30', judul: 'Teater Rumput & Puisi Lembah', ket: 'Kolaborasi pertunjukan pendek dan pembacaan puisi dari komunitas lokal.' },
  { jam: '20.30', judul: 'Rengganis', ket: 'Penampil utama. Sing-along terpanjang malam itu.' },
  { jam: '22.10', judul: 'Panitia naik panggung', ket: 'Ucapan terima kasih, lampu ponsel, dan foto bersama.' },
];

export const lineupEvent = [
  { nama: 'Sanggar Angklung Wangi', genre: 'Tradisi Sunda' },
  { nama: 'Kopi Hujan', genre: 'Akustik folk' },
  { nama: 'Lintas Senja', genre: 'Pop band' },
  { nama: 'Teater Rumput', genre: 'Pertunjukan' },
  { nama: 'Puisi Lembah', genre: 'Spoken word' },
  { nama: 'Rengganis', genre: 'Indie · Penampil utama' },
];

export const persiapanEvent = [
  { waktu: 'H-90', judul: 'Satu ide di grup obrolan', cerita: 'Seseorang mengirim foto lapang di bukit dengan pesan, “Kalau bikin acara di sini kayaknya bagus.” Tiga minggu kemudian, proposal pertama sudah jadi.' },
  { waktu: 'H-45', judul: 'Izin, sponsor, dan penolakan pertama', cerita: 'Lima pintu sponsor tertutup. Kami mengecilkan skala, menggandeng UMKM sekitar, dan belajar bahwa acara yang jujur pada kemampuan lebih mudah dipercaya.' },
  { waktu: 'H-14', judul: 'Gladi di atas kertas', cerita: 'Rundown direvisi tujuh kali. Setiap divisi menghafal rencana cadangan: kalau hujan, kalau listrik padam, kalau penampil terlambat.' },
  { waktu: 'H-1', judul: 'Lapang berubah jadi festival', cerita: 'Dari pagi sampai tengah malam: memasang panggung, tenda, lampu gantung, dan jalur pengunjung. Makan malam nasi bungkus di atas peti alat.' },
  { waktu: 'Hari H', judul: 'Delapan setengah jam yang terasa sebentar', cerita: 'Handy talky tidak berhenti berbunyi. Ada kabel yang tertukar dan antrean gelang yang memanjang, tapi semua tertangani tanpa penonton sadar.' },
  { waktu: 'H+7', judul: 'Bongkar, evaluasi, lalu rindu', cerita: 'Lapang kembali bersih. Di rapat evaluasi, daftar perbaikan sama panjangnya dengan daftar hal yang ingin diulang tahun depan.' },
];

export const panitiaInti = [
  { id: 'raka', nama: 'Raka Mahendra', peran: 'Ketua Pelaksana', foto: raka, tugas: 'Menyatukan semua divisi, mengambil keputusan saat rencana berubah, dan menjadi suara terakhir di handy talky.', cerita: 'Tidur tiga jam di malam H-1, tapi masih sempat berkeliling memastikan setiap panitia sudah makan.', kesan: 'Acara ini berdiri karena banyak orang memilih percaya sebelum semuanya terlihat mungkin.' },
  { id: 'intan', nama: 'Intan Permatasari', peran: 'Sekretaris', foto: intan, tugas: 'Mengurus surat izin, jadwal rapat, notulensi, dan daftar kontak seluruh penampil serta mitra.', cerita: 'Papan jepitnya berisi rundown, nomor darurat, dan daftar alergi makanan panitia. Semua orang mencarinya saat ada yang lupa.', kesan: 'Catatan kecil hari ini adalah petunjuk jalan untuk edisi berikutnya.' },
  { id: 'gilang', nama: 'Gilang Saputra', peran: 'Bendahara', foto: gilang, tugas: 'Menyusun anggaran, mengelola tiket dan dana sponsor, serta memastikan setiap pengeluaran tercatat.', cerita: 'Menghitung ulang kas tiga kali sebelum pulang. Diam-diam menyisihkan dana untuk makan bersama setelah bongkar.', kesan: 'Acara yang baik juga harus selesai dengan laporan yang bisa dipertanggungjawabkan.' },
  { id: 'ayu', nama: 'Ayu Lestari', peran: 'Koordinator Acara', foto: ayu, tugas: 'Menyusun rundown, mendampingi penampil, dan menjaga waktu panggung tetap sesuai rencana.', cerita: 'Headset tidak lepas dari leher seharian. Hafal urutan lagu setiap penampil lebih baik daripada penampilnya sendiri.', kesan: 'Yang penonton lihat cuma delapan jam; yang kami siapkan tiga bulan.' },
  { id: 'dimas', nama: 'Dimas Prasetyo', peran: 'Koordinator Produksi', foto: dimas, tugas: 'Memimpin pembangunan panggung, tata suara, tata cahaya, dan kelistrikan bersama vendor serta relawan.', cerita: 'Orang pertama datang dan terakhir pulang. Kabel yang ia gulung selama festival kalau disambung mungkin sampai ke alun-alun.', kesan: 'Panggung yang bagus adalah panggung yang tidak membuat siapa pun khawatir.' },
  { id: 'nisa', nama: 'Nisa Khairunnisa', peran: 'Koordinator Dokumentasi', foto: nisa, tugas: 'Mengatur tim foto dan video, membagi titik liputan, dan merangkai arsip setelah acara selesai.', cerita: 'Mengambil lebih dari dua ribu foto, tapi paling bangga pada satu foto panitia yang sedang tertawa di belakang panggung.', kesan: 'Tugas kami memastikan tidak ada orang baik yang terlewat dari ingatan.' },
];

export const divisiEvent = [
  { nama: 'Acara', jumlah: 9 },
  { nama: 'Produksi & Panggung', jumlah: 12 },
  { nama: 'Humas & Publikasi', jumlah: 7 },
  { nama: 'Dokumentasi', jumlah: 6 },
  { nama: 'Konsumsi & UMKM', jumlah: 5 },
  { nama: 'Keamanan & Lapangan', jumlah: 9 },
];

export const totalPanitia = divisiEvent.reduce((jumlah, d) => jumlah + d.jumlah, 0);

export const kesanPengunjung = [
  { dari: 'Sekar, pengunjung dari Tarogong', teks: 'Datang karena diajak teman, pulang dengan suara habis dan rencana balik tahun depan.' },
  { dari: 'Pak Ujang, pemilik lapak kopi', teks: 'Biasanya jualan di pinggir jalan. Malam itu kopi saya habis sebelum jam sembilan.' },
  { dari: 'Rengganis, penampil utama', teks: 'Jarang ada panggung yang terasa sehangat ini. Penontonnya bernyanyi seperti sedang pulang.' },
];

export const pesanEvent: WallNote[] = [
  { dari: 'Raka', teks: 'Terima kasih sudah bertahan sampai bongkar terakhir. Kalian tim paling keras kepala dalam arti terbaik.' },
  { dari: 'Ayu', teks: 'Rundown boleh berantakan, tapi kalian tidak pernah. Sampai ketemu di gladi tahun depan!' },
  { dari: 'Dimas', teks: 'Untuk tim produksi: tangan kita lecet, tapi panggungnya berdiri. Bangga sekali.' },
  { dari: 'Nisa', teks: 'Semua foto sudah aku simpan. Nanti kita lihat lagi saat kangen suara handy talky.' },
];

/** Moves the after-movie slideshow forward or back, wrapping at both ends. */
export function langkahSlide(sekarang: number, arah: number, total: number) {
  if (total <= 0) return 0;
  return (((sekarang + arah) % total) + total) % total;
}

export function buatPesanEvent(nama: string, teks: string) {
  return buatPesanDinding(nama.trim() || 'Teman Lembah Senja', teks);
}
