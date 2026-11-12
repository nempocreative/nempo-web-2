import fotoNara from "@/assets/momen-grup-indonesia-nara.webp";
import fotoBima from "@/assets/momen-grup-indonesia-bima.webp";
import fotoRani from "@/assets/momen-grup-indonesia-rani.webp";
import fotoDito from "@/assets/momen-grup-indonesia-dito.webp";
import fotoSore from "@/assets/momen-grup-indonesia-bersama.jpg";
import fotoHunting from "@/assets/momen-grup-indonesia-jalan.jpg";
import fotoAkustik from "@/assets/momen-grup-indonesia-akustik.jpg";
import fotoMakan from "@/assets/momen-grup-indonesia-liwet.jpg";
import { buatPesanDinding, type WallNote } from "@/data/year-book";

// Fictional portfolio content; photographs are generated, not real client footage.
export const grupMeta = {
  nama: "Teman Sore",
  tempat: "Garut, Jawa Barat",
  sejak: "2023",
  halaman: "/year-book/geng-grup",
  foto: fotoSore,
  motto: "Beda jalan pulang, tetap satu meja.",
};

export const anggotaGrup = [
  { id: "nara", nama: "Nara", kesibukan: "Kuliah desain · Bandung", pesanan: "Es teh, gula sedikit", julukan: "Si penyimpan cerita", foto: fotoNara, kebiasaan: "Punya folder foto dengan nama “jangan dihapus”. Sering hilang dari foto bareng karena sibuk memotret; sekarang kami gantian supaya dia ikut masuk kenangan.", quote: "Foto boleh blur, momennya jangan sampai lupa." },
  { id: "bima", nama: "Bima", kesibukan: "Kerja kreatif · Garut", pesanan: "Kopi susu, es banyak", julukan: "Penggagas rencana dadakan", foto: fotoBima, kebiasaan: "Pengirim pesan “gas nggak?” paling rajin. Rutenya kadang salah, tapi selalu tahu cara bikin perjalanan yang biasa jadi bahan cerita berbulan-bulan.", quote: "Kalau semua nunggu luang, kapan kita ketemu?" },
  { id: "rani", nama: "Rani", kesibukan: "Kuliah komunikasi · Garut", pesanan: "Teh hangat, jangan pahit", julukan: "Tempat semua cerita pulang", foto: fotoRani, kebiasaan: "Ingat siapa yang belum makan dan siapa yang mendadak lebih diam. Nggak buru-buru memberi nasihat; biasanya cukup duduk dekat dan bilang, “cerita aja”.", quote: "Nggak harus punya kabar baik buat datang." },
  { id: "dito", nama: "Dito", kesibukan: "Kerja sambil bermusik · Bandung", pesanan: "Kopi hitam, tanpa gula", julukan: "Penjaga playlist", foto: fotoDito, kebiasaan: "Bisa mengubah perjalanan pulang jadi konser kecil. Hafal intro lagu, lupa lirik tengahnya. Selalu bilang “satu lagu lagi” sebelum gitar masuk tas.", quote: "Yang penting bareng, bukan ke mana." },
];

export const albumGrup = [
  { id: "meja", src: fotoSore, judul: "Meja yang selalu cukup", kategori: "Nongkrong", tanggal: "Oktober 2026", cerita: "Nara baru turun dari travel, Bima masih bawa tas kerja, Rani datang dengan cerita kampus, dan Dito terlambat sebelas menit. Kami cuma punya dua jam sebelum masing-masing pulang. Tapi setelah duduk, rasanya seperti nggak pernah berjauhan. Foto ini diambil sebelum obrolan pindah dari pekerjaan ke hal-hal receh yang hanya kami mengerti." },
  { id: "hunting", src: fotoHunting, judul: "Berangkat buat foto, pulang bawa cerita", kategori: "Jalan bareng", tanggal: "Juni 2025", cerita: "Bima bilang jalannya gampang. Dua belokan salah kemudian, kami malah menemukan kebun teh yang belum pernah didatangi. Dito jadi penunjuk arah, Rani bagi bekal, Nara akhirnya mau difoto. Destinasinya boleh meleset; hari itu tetap jadi salah satu yang paling ingin kami ulang." },
  { id: "akustik", src: fotoAkustik, judul: "Konser tanpa tiket", kategori: "Nongkrong", tanggal: "Agustus 2024", cerita: "Teras rumah Rani sore itu jadi panggung dadakan. Dito bawa gitar, Bima masuk terlalu cepat, Nara ketawa sampai lupa merekam. Tiga kali “lagu terakhir” dan belum juga selesai. Kami pulang ketika lampu teras menyala, dengan satu lagu yang terus terngiang sepanjang jalan." },
  { id: "makan", src: fotoMakan, judul: "Liwet dulu, urusan nanti", kategori: "Nongkrong", tanggal: "September 2026", cerita: "Janji awalnya cuma makan sebentar. Satu bakul nasi liwet, sambal yang terlalu pedas, dan cerita yang nggak habis-habis bikin kami lupa waktu. Rani mengingatkan semua makan dulu sebelum lanjut cerita. Ada foto makanan yang cantik; ada juga foto kami kepedasan yang sengaja nggak masuk album." },
];

export const ceritaGrup = [
  { tahun: "2023", judul: "Awalnya cuma satu meja.", teks: "Nara dan Rani kenal dari kegiatan sekolah. Bima datang karena ikut teman, Dito karena ada yang bawa gitar. Awalnya cuma duduk satu meja setelah acara. Besoknya, ada satu kursi yang sengaja disisakan. Dari situ, pulang nggak pernah benar-benar sendirian lagi." },
  { tahun: "2024", judul: "Grup chat mulai punya nama.", teks: "Nama grup berubah berkali-kali, sampai Rani mengetik “Teman Sore” karena hampir selalu ketemu menjelang magrib. Isinya bukan lagi cuma jadwal, tapi foto jelek, pesan panjang tengah malam, dan kabar kecil yang tetap ingin dibagikan." },
  { tahun: "2025", judul: "Jalan kecil, cerita panjang.", teks: "Kami mulai punya kota tujuan masing-masing. Sebelum jadwal makin penuh, Bima mengajak jalan ke kebun teh. Nggak ada itinerary rapi; cuma bekal, kamera, dan kesepakatan buat berhenti kalau ada pemandangan bagus. Ternyata yang paling berharga bukan tempatnya." },
  { tahun: "2026", judul: "Sekarang harus janjian dulu.", teks: "Sekarang ada kuliah, kerja, dan perjalanan antar kota. Ketemu memang nggak sesering dulu. Tapi pesan “aku di Garut akhir pekan ini” masih dibalas dengan mencari tanggal, bukan alasan. Dekat ternyata bukan soal tiap hari bersama, tapi tetap memilih hadir." },
];

export const playlistGrup = [
  { judul: "Sebuah Kisah Klasik", artis: "Sheila On 7", dari: "Dito", cerita: "Dito memutarnya setiap akhir kumpul. Bagian reff selalu paling keras, seolah semua sepakat: hari ini harus diingat." },
  { judul: "Monokrom", artis: "Tulus", dari: "Nara", cerita: "Nara bilang lagu ini seperti membuka folder foto lama. Sekali terdengar, wajah-wajah di dalamnya langsung terasa dekat." },
  { judul: "Ingatlah Hari Ini", artis: "Project Pop", dari: "Bima", cerita: "Bima selalu mulai duluan, lalu salah lirik. Justru itu yang bikin semua ikut nyanyi dan ketawa." },
  { judul: "Sampai Jadi Debu", artis: "Banda Neira", dari: "Rani", cerita: "Pilihan Rani ketika obrolan mulai pelan. Nggak semua sore perlu ramai; kadang cukup ada orang yang menemani." },
];

export function cariLaguUrl(judul: string, artis: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(`${judul} ${artis}`)}`;
}

export const pesanGrup: WallNote[] = [
  { dari: "Nara", teks: "Kalau nanti lupa wajah kita waktu muda, aku masih punya semua fotonya." },
  { dari: "Bima", teks: "Rencana yang batal boleh banyak. Yang penting jangan batal jadi teman." },
  { dari: "Rani", teks: "Mejanya selalu ada. Datang saja, bahkan kalau cuma mau diam." },
  { dari: "Dito", teks: "Playlist ini belum selesai. Sama seperti cerita kita." },
];

export function buatPesanGrup(nama: string, teks: string) {
  return buatPesanDinding(nama.trim() || "Teman satu meja", teks);
}

export const kebiasaanGrup = [
  { nomor: "01", judul: "Satu kursi jangan diambil.", teks: "Yang datang duluan pesankan minum dan sisakan tempat. Telat boleh, nggak dianggap hilang." },
  { nomor: "02", judul: "Foto dulu, baru bubar.", teks: "Minimal satu foto yang semua orang masuk. Bukan harus bagus; yang penting nanti ada yang bisa dilihat lagi." },
  { nomor: "03", judul: "Kabar biasa juga berarti.", teks: "Nggak harus lulus, dapat kerja, atau punya kabar besar. Foto langit dan cerita makan siang pun kami tunggu." },
];
