import fotoPengurus from '@/assets/momen-organisasi-pengurus.jpg';
import fotoLiterasi from '@/assets/momen-organisasi-literasi.jpg';
import fotoKarya from '@/assets/momen-organisasi-karya.jpg';
import fotoHijau from '@/assets/momen-organisasi-hijau.jpg';
import arka from '@/assets/momen-organisasi-arka.webp';
import salma from '@/assets/momen-organisasi-salma.webp';
import nadine from '@/assets/momen-organisasi-nadine.webp';
import farhan from '@/assets/momen-organisasi-farhan.webp';
import zahra from '@/assets/momen-organisasi-zahra.webp';
import rizky from '@/assets/momen-organisasi-rizky.webp';
import { buatPesanDinding, type WallNote } from './year-book';

// Fictional organization and portfolio stories; all photographs are AI-generated.
export const organisasiMeta = {
  nama: 'Ruang Tumbuh', kabinet: 'Kabinet Akar Asa', periode: '2025 — 2026',
  tempat: 'Organisasi Mahasiswa · Garut', halaman: '/year-book/organisasi', foto: fotoPengurus,
  motto: 'Satu periode. Banyak arti.',
};
export const pengurusOrganisasi = [
  { id: 'arka', nama: 'Arka Pratama', jabatan: 'Ketua Umum', foto: arka, tugas: 'Menjaga arah organisasi, mempertemukan ide antardivisi, dan memastikan setiap suara punya ruang.', cerita: 'Dulu takut memimpin rapat. Sekarang paling terakhir meninggalkan sekretariat, memastikan semua sudah punya teman pulang.', quote: 'Memimpin bukan paling depan, tapi memastikan tidak ada yang tertinggal.' },
  { id: 'salma', nama: 'Salma Azzahra', jabatan: 'Wakil Ketua', foto: salma, tugas: 'Mendampingi koordinator program, merawat komunikasi tim, dan menindaklanjuti hasil evaluasi.', cerita: 'Hafal siapa yang sedang ujian, siapa yang butuh bantuan, dan kapan rapat harus berhenti untuk makan.', quote: 'Tim yang kuat juga perlu waktu untuk saling mendengar.' },
  { id: 'nadine', nama: 'Nadine Putri', jabatan: 'Sekretaris', foto: nadine, tugas: 'Mengelola surat, notulensi, kalender bersama, serta arsip satu periode kepengurusan.', cerita: 'Foldernya paling rapi. Di antara proposal dan laporan, ia menyimpan foto-foto kecil yang hampir semua orang lupa.', quote: 'Yang kita catat hari ini akan jadi cerita untuk pengurus berikutnya.' },
  { id: 'farhan', nama: 'Farhan Nugraha', jabatan: 'Bendahara', foto: farhan, tugas: 'Menyusun anggaran kegiatan, mencatat pengeluaran, dan menyiapkan laporan keuangan bersama tim.', cerita: 'Kalimat favoritnya “struknya jangan hilang”. Tetap jadi orang pertama yang mencari solusi saat kebutuhan berubah.', quote: 'Kepercayaan dijaga lewat hal-hal kecil yang dikerjakan dengan jujur.' },
  { id: 'zahra', nama: 'Zahra Nuraini', jabatan: 'Koordinator Pengabdian', foto: zahra, tugas: 'Menghubungkan relawan dengan warga, merancang kegiatan literasi, dan merawat keberlanjutan program.', cerita: 'Selalu mengingatkan bahwa datang sekali tidak cukup. Ia ingin setiap kegiatan meninggalkan hubungan, bukan hanya foto.', quote: 'Bermanfaat dimulai dari mau hadir dan mau belajar.' },
  { id: 'rizky', nama: 'Rizky Ramadhan', jabatan: 'Koordinator Kreatif', foto: rizky, tugas: 'Menggarap publikasi, dokumentasi, dan ruang ekspresi untuk karya anggota.', cerita: 'Membawa kamera ke mana-mana. Setelah acara selesai, masih sibuk memilih foto agar semua panitia ikut dikenang.', quote: 'Di balik acara yang ramai, ada banyak tangan yang layak terlihat.' },
];
export const programOrganisasi = [
  { id: 'literasi', nomor: '01', kategori: 'Pengabdian', nama: 'Sabtu Berbagi Cerita', waktu: 'Februari — Agustus 2026', foto: fotoLiterasi, ringkas: 'Membuka ruang baca yang hangat, satu Sabtu setiap bulan.', cerita: 'Kami mengumpulkan buku layak baca, menyusun sudut literasi bersama warga, lalu bergantian mendampingi anak-anak membaca dan bercerita. Bukan kelas dengan nilai; tempat mereka berani bertanya dan membayangkan hal baru.', hasil: '7 pertemuan membaca bersama', pelajaran: 'Kegiatan paling berarti bukan yang paling ramai, melainkan yang terus kembali.', kenangan: 'Seorang anak menanyakan kapan kami datang lagi. Di situ kami tahu: jadwal berikutnya bukan sekadar agenda.' },
  { id: 'karya', nomor: '02', kategori: 'Kreatif', nama: 'Ruang Karya', waktu: 'Mei 2026', foto: fotoKarya, ringkas: 'Panggung pertama untuk karya yang selama ini hanya ada di folder.', cerita: 'Pameran kecil di halaman kampus mempertemukan ilustrasi, fotografi, keramik, dan cerita para pembuatnya. Tim publikasi, perlengkapan, dan acara belajar menyusun ruang dari nol; anggota belajar memperkenalkan karya tanpa harus merasa sempurna.', hasil: '24 karya anggota dipamerkan', pelajaran: 'Memberi ruang kadang lebih penting daripada menentukan siapa yang paling bagus.', kenangan: 'Satu meja sempat goyah sebelum pembukaan. Semua ikut memegang, lalu tertawa setelah karya akhirnya berdiri rapi.' },
  { id: 'hijau', nomor: '03', kategori: 'Lingkungan', nama: 'Akar untuk Esok', waktu: 'Juli 2026', foto: fotoHijau, ringkas: 'Menanam harapan, lalu belajar bertanggung jawab merawatnya.', cerita: 'Bersama warga, relawan menanam bibit di lahan yang telah disepakati dan membagi jadwal pemantauan. Kami belajar memilih bibit, menyiapkan lubang tanam, dan memahami bahwa menanam baru langkah pertama.', hasil: '60 bibit ditanam bersama', pelajaran: 'Sebuah program belum selesai saat foto bersama diambil.', kenangan: 'Sepatu penuh tanah, tangan pegal, tetapi perjalanan pulang dipenuhi rencana untuk datang menyiram lagi.' },
];
export const nilaiOrganisasi = [
  { nama: 'Berani mulai', teks: 'Ide tidak harus sempurna untuk dibicarakan. Kami belajar mencoba, menerima masukan, lalu memperbaiki bersama.' },
  { nama: 'Saling merawat', teks: 'Di balik setiap tugas ada orang dengan kesibukan dan ceritanya sendiri. Bertanya kabar juga bagian dari kerja tim.' },
  { nama: 'Tuntas & terbuka', teks: 'Rencana, pembagian tugas, dan evaluasi dibicarakan dengan jelas. Yang belum selesai tidak disembunyikan.' },
];
export const linimasaOrganisasi = [
  { waktu: 'September 2025', judul: 'Nama-nama di satu meja', cerita: 'Pelantikan mempertemukan enam pengurus dengan cara kerja berbeda. Kami menyepakati satu hal: sekretariat harus jadi tempat yang aman untuk membawa ide.' },
  { waktu: 'Oktober 2025', judul: 'Arah mulai ditemukan', cerita: 'Rapat kerja mengubah banyak gagasan menjadi tiga program utama. Proposal pertama penuh coretan; justru di situ kami belajar saling melengkapi.' },
  { waktu: 'Februari 2026', judul: 'Keluar dari ruang rapat', cerita: 'Sabtu Berbagi Cerita dimulai. Bertemu warga mengingatkan kami bahwa kebutuhan di lapangan tidak selalu sama dengan perkiraan di proposal.' },
  { waktu: 'Mei — Juli 2026', judul: 'Ide menjadi pertemuan', cerita: 'Ruang Karya dan Akar untuk Esok terlaksana. Jadwal padat, perubahan mendadak, dan kerja lintas divisi membuat kami semakin percaya satu sama lain.' },
  { waktu: 'Agustus 2026', judul: 'Belajar dari yang belum rapi', cerita: 'Evaluasi akhir mencatat komunikasi yang terlambat, pembagian tugas yang perlu diperbaiki, dan pentingnya menyiapkan pengganti saat anggota berhalangan.' },
  { waktu: 'September 2026', judul: 'Estafet, bukan titik akhir', cerita: 'Arsip, catatan evaluasi, dan hubungan dengan warga diserahkan kepada pengurus berikutnya. Jabatan selesai; rasa memiliki tidak ikut berakhir.' },
];
export const pesanOrganisasi: WallNote[] = [
  { dari: 'Arka', teks: 'Terima kasih sudah tetap hadir, bahkan di minggu-minggu ketika jadwal kita paling berantakan.' },
  { dari: 'Salma', teks: 'Yang akan aku rindukan bukan rapatnya, tapi orang-orang yang tetap tertawa setelahnya.' },
  { dari: 'Nadine', teks: 'Arsipnya sudah rapi. Semoga cerita kita tetap hidup di tangan pengurus berikutnya.' },
  { dari: 'Zahra', teks: 'Kalau nanti kembali ke ruang baca, semoga kita datang bukan sebagai panitia, tapi sebagai teman.' },
];
export function buatPesanOrganisasi(nama: string, teks: string) {
  return buatPesanDinding(nama.trim() || 'Sahabat Ruang Tumbuh', teks);
}