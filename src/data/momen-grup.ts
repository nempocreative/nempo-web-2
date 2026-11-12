import fotoNara from "@/assets/momen-grup-nara.webp";
import fotoBima from "@/assets/momen-grup-bima.webp";
import fotoRani from "@/assets/momen-grup-rani.webp";
import fotoDito from "@/assets/momen-grup-dito.webp";
import fotoSore from "@/assets/momen-grup-sore.jpg";
import fotoHunting from "@/assets/yearbook/momen-hunting-foto.webp";
import fotoAkustik from "@/assets/yearbook/momen-akustik.webp";
import fotoMakan from "@/assets/yearbook/momen-makan-kantin.webp";
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
  { id: "nara", nama: "Nara", julukan: "Si penyimpan cerita", foto: fotoNara, kebiasaan: "Kamera selalu ikut. Pulang paling akhir karena masih pilih foto.", quote: "Foto boleh blur, momennya jangan sampai lupa." },
  { id: "bima", nama: "Bima", julukan: "Penggagas rencana dadakan", foto: fotoBima, kebiasaan: "Kalimat andalan: ‘dekat kok’. Ternyata masih satu jam lagi.", quote: "Kalau semua nunggu luang, kapan kita ketemu?" },
  { id: "rani", nama: "Rani", julukan: "Tempat semua cerita pulang", foto: fotoRani, kebiasaan: "Hafal pesanan semua orang. Selalu bawa cerita dan tisu cadangan.", quote: "Nggak harus punya kabar baik buat datang." },
  { id: "dito", nama: "Dito", julukan: "Penjaga playlist", foto: fotoDito, kebiasaan: "Satu lagu untuk setiap perjalanan. Sering nyanyi, jarang tepat nada.", quote: "Yang penting bareng, bukan ke mana." },
];

export const albumGrup = [
  { id: "meja", src: fotoSore, judul: "Meja yang selalu cukup", kategori: "Nongkrong", tanggal: "Oktober 2026", cerita: "Empat gelas, obrolan yang pindah-pindah topik, dan sore yang rasanya terlalu cepat selesai. Tempatnya bisa berubah. Orang-orangnya jangan." },
  { id: "hunting", src: fotoHunting, judul: "Berangkat buat foto, pulang bawa cerita", kategori: "Jalan bareng", tanggal: "Juni 2025", cerita: "Awalnya tugas sekolah. Lalu jadi alasan untuk jalan lebih jauh, saling pinjam kamera, dan menertawakan hasil foto yang miring semua." },
  { id: "akustik", src: fotoAkustik, judul: "Konser tanpa tiket", kategori: "Nongkrong", tanggal: "Agustus 2024", cerita: "Tangga sekolah, satu gitar, dan suara yang nggak pernah kompak. Lagu terakhir selalu diulang karena belum ada yang mau pulang." },
  { id: "makan", src: fotoMakan, judul: "Satu meja sejak dulu", kategori: "Nongkrong", tanggal: "November 2023", cerita: "Dari kursi kantin yang disimpan buat teman sampai meja kafe di akhir pekan. Ternyata kebiasaan kecil bisa jadi awal pertemanan panjang." },
];

export const ceritaGrup = [
  { tahun: "2023", judul: "Awalnya cuma satu meja.", teks: "Bukan satu kelas, bukan satu geng sejak awal. Cuma kebetulan duduk di meja kantin yang sama. Besoknya, kursi itu disisakan lagi." },
  { tahun: "2024", judul: "Grup chat mulai punya nama.", teks: "Dari kirim tugas jadi kirim meme. Dari ‘besok bawa apa?’ jadi ‘sore ini ketemu, yuk’. Nama Teman Sore akhirnya nempel begitu saja." },
  { tahun: "2025", judul: "Jalan kecil, cerita panjang.", teks: "Hunting foto, nyasar sedikit, kehujanan banyak. Perjalanan paling diingat justru yang nggak pernah direncanakan dengan rapi." },
  { tahun: "2026", judul: "Sekarang harus janjian dulu.", teks: "Jadwal mulai beda. Ada yang kuliah, ada yang kerja. Tapi satu pesan ‘aku di Garut’ masih cukup untuk mengumpulkan kami lagi." },
];

export const playlistGrup = [
  { judul: "Sebuah Kisah Klasik", artis: "Sheila On 7", dari: "Dito", cerita: "Lagu wajib sebelum semua pulang." },
  { judul: "Monokrom", artis: "Tulus", dari: "Nara", cerita: "Untuk foto-foto yang disimpan baik-baik." },
  { judul: "Ingatlah Hari Ini", artis: "Project Pop", dari: "Bima", cerita: "Selalu jadi karaoke paling berantakan." },
  { judul: "Sampai Jadi Debu", artis: "Banda Neira", dari: "Rani", cerita: "Untuk sore yang lebih tenang dari biasanya." },
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