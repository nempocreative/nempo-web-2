import alya from '@/assets/ucapan-pacar-alya.webp';
import pacarKue from '@/assets/ucapan-pacar-kue.jpg';
import pacarSenja from '@/assets/ucapan-pacar-senja.jpg';
import rendi from '@/assets/ucapan-sahabat-rendi.webp';
import sahabatKemah from '@/assets/ucapan-sahabat-kemah.jpg';
import sahabatMotor from '@/assets/ucapan-sahabat-motor.jpg';
import salsa from '@/assets/ucapan-wisuda-salsa.webp';
import wisudaSkripsi from '@/assets/ucapan-wisuda-skripsi.jpg';
import wisudaKeluarga from '@/assets/ucapan-wisuda-keluarga.jpg';
import { buatPesanDinding, type WallNote } from './year-book';

// Fictional people and stories; all photographs are AI-generated.
export type JenisUcapan = 'pacar' | 'sahabat' | 'wisuda';
export type AksiUcapan = 'lilin' | 'toga';

export type Kenangan = { judul: string; waktu: string; cerita: string; foto?: string; lebar?: number; tinggi?: number };

export type Ucapan = {
  id: JenisUcapan; label: string; acara: string;
  penerima: string; dari: string; tanggal: string;
  /** ISO dates; only birthdays carry a birth date. */
  lahir?: string; tanggalIso: string;
  sapaan: string; judul: string; keterangan: string;
  foto: string; fotoAlt: string;
  surat: string[]; penutup: string; tandaTangan: string;
  alasanJudul: string; alasan: { depan: string; isi: string }[];
  kenangan: Kenangan[];
  aksi: AksiUcapan; aksiJudul: string; aksiSelesai: string;
  pesanAwal: WallNote[]; namaKosong: string;
};

export const ucapanSpesial: Ucapan[] = [
  {
    id: 'pacar', label: 'Ulang tahun pacar', acara: 'Ulang Tahun',
    penerima: 'Alya', dari: 'Bayu', tanggal: '18 Maret 2026', lahir: '2002-03-18', tanggalIso: '2026-03-18',
    sapaan: 'Untuk Alya, yang paling aku tunggu senyumnya', judul: 'Selamat ulang tahun, Alya', keterangan: 'Dari Bayu, dengan seluruh hati',
    foto: alya, fotoAlt: 'Alya tersenyum memegang buket mawar merah muda di sebuah kafe',
    surat: [
      'Hari ini kamu genap {usia} tahun, dan aku masih belum menemukan cara yang cukup untuk bilang betapa beruntungnya aku kenal kamu.',
      'Terima kasih sudah sabar waktu aku telat jemput, sudah tertawa pada lelucon yang sebenarnya tidak lucu, dan sudah memilih tetap tinggal di hari-hari yang berat.',
      'Semoga umur baru ini membawamu lebih dekat pada mimpi-mimpi yang sering kamu ceritakan pelan-pelan sebelum tidur. Aku mau ada di setiap langkahnya.',
    ],
    penutup: 'Selamanya penggemar nomor satumu,', tandaTangan: 'Bayu',
    alasanJudul: 'Hal kecil yang aku sayang darimu', alasan: [
      { depan: 'Caramu tertawa', isi: 'Selalu menutup mulut, tapi matamu tidak bisa bohong.' },
      { depan: 'Pesan “sudah makan?”', isi: 'Datang tepat jam satu siang, bahkan saat kamu sendiri sibuk.' },
      { depan: 'Playlist perjalanan', isi: 'Lagu-lagu pilihanmu membuat macet di Nagreg terasa singkat.' },
      { depan: 'Kamu yang jujur', isi: 'Bilang apa adanya, meski kadang bikin aku cemberut dulu.' },
    ],
    kenangan: [
      { judul: 'Pertama kali ketemu', waktu: 'Agustus 2023', cerita: 'Antre fotokopi di depan kampus. Kamu meminjam pulpen dan tidak pernah mengembalikannya — sekarang pulpen itu jadi alasan untuk terus ketemu.' },
      { judul: 'Ulang tahun pertama bersama', waktu: 'Maret 2025', foto: pacarKue, lebar: 1600, tinggi: 940, cerita: 'Kue kecil, empat lilin, dan kamu yang berpura-pura kaget padahal sudah menebak sejak sore.' },
      { judul: 'Senja di bukit', waktu: 'Agustus 2025', foto: pacarSenja, lebar: 1600, tinggi: 1008, cerita: 'Kita naik motor dua jam hanya untuk lima belas menit matahari terbenam. Kamu bilang itu senja terbaik. Aku setuju, tapi bukan karena langitnya.' },
    ],
    aksi: 'lilin', aksiJudul: 'Tiup lilinnya, lalu ucapkan doamu', aksiSelesai: 'Semoga semua doa yang kamu ucapkan dalam hati tadi terkabul, satu per satu.',
    pesanAwal: [
      { dari: 'Nadya', teks: 'Selamat ulang tahun, sahabatku sejak SMA! Tetap jadi Alya yang paling heboh di grup.' },
      { dari: 'Mama', teks: 'Selamat ulang tahun, Nak. Sehat selalu dan jangan lupa pulang ke rumah.' },
    ],
    namaKosong: 'Teman Alya',
  },
  {
    id: 'sahabat', label: 'Ulang tahun sahabat', acara: 'Ulang Tahun',
    penerima: 'Rendi', dari: 'Geng Kosan Gang Mawar', tanggal: '9 Juli 2026', lahir: '2003-07-09', tanggalIso: '2026-07-09',
    sapaan: 'Untuk Rendi, ketua tidak resmi Gang Mawar', judul: 'Selamat ulang tahun, Ren!', keterangan: 'Dari Fajar, Tasya, Wulan & seisi kosan',
    foto: rendi, fotoAlt: 'Rendi tertawa lebar mengangkat kaleng minuman di atap rumah',
    surat: [
      'Ren, {usia} tahun dan kamu masih orang yang paling berisik di grup — dan kami tidak mau itu berubah.',
      'Terima kasih sudah jadi orang pertama yang datang bawa martabak tiap kali ada yang patah hati, sudah meminjamkan motor tanpa banyak tanya, dan sudah membuat kosan sempit ini terasa seperti rumah.',
      'Semoga skripsimu cepat di-ACC, rezekimu lancar, dan kamu tetap ingat jalan pulang ke Gang Mawar walau nanti sudah jadi orang sibuk.',
    ],
    penutup: 'Dari kami yang selalu menunggumu bawa gorengan,', tandaTangan: 'Geng Gang Mawar',
    alasanJudul: 'Bukti kamu sahabat terbaik', alasan: [
      { depan: 'Martabak darurat', isi: 'Tiga kali patah hati anggota geng, tiga kali kamu datang jam sebelas malam.' },
      { depan: 'Motor pinjaman', isi: 'Bensinnya selalu kamu isi penuh dulu sebelum dipinjam.' },
      { depan: 'Gitar & suara fals', isi: 'Fals, tapi selalu bikin api unggun jadi lebih hangat.' },
      { depan: 'Pengingat ujian', isi: 'Membangunkan semua orang tiap pagi ujian, padahal kamu sendiri belum belajar.' },
    ],
    kenangan: [
      { judul: 'Kemah dadakan', waktu: 'Desember 2024', foto: sahabatKemah, lebar: 1600, tinggi: 1008, cerita: 'Rencananya cuma makan malam. Dua jam kemudian kita sudah mendirikan tenda di bukit dan kamu memainkan lagu yang sama sebelas kali.' },
      { judul: 'Tersesat paling bahagia', waktu: 'April 2025', foto: sahabatMotor, lebar: 1600, tinggi: 1008, cerita: 'Kamu bilang tahu jalan pintas. Kita tersesat satu jam di tengah sawah, dan itu jadi perjalanan paling sering diceritakan ulang.' },
      { judul: 'Kosan tanpa listrik', waktu: 'Februari 2026', cerita: 'Mati lampu semalaman, dan kita malah main tebak lagu pakai senter ponsel sampai subuh.' },
    ],
    aksi: 'lilin', aksiJudul: 'Tiup lilinnya, Ren — jangan sampai ludahnya kena kue', aksiSelesai: 'Doanya sudah kami catat. Kalau terkabul, traktirannya jangan lupa.',
    pesanAwal: [
      { dari: 'Tasya', teks: 'HBD Ren! Utang gorengan kemarin anggap lunas sebagai kado ya.' },
      { dari: 'Pak Kos', teks: 'Selamat ulang tahun. Tolong motornya jangan parkir di depan pagar lagi.' },
    ],
    namaKosong: 'Teman Rendi',
  },
  {
    id: 'wisuda', label: 'Wisuda', acara: 'Wisuda',
    penerima: 'Salsa', dari: 'Mama, Papa & Raffi', tanggal: '24 Oktober 2026', tanggalIso: '2026-10-24',
    sapaan: 'Untuk Salsa Nabila, S.I.Kom.', judul: 'Selamat wisuda, Salsa', keterangan: 'Sarjana Ilmu Komunikasi · 24 Oktober 2026',
    foto: salsa, fotoAlt: 'Salsa mengenakan toga dan selempang biru emas sambil memegang ijazah di halaman kampus',
    surat: [
      'Empat tahun lalu kami mengantarmu ke kos dengan satu koper dan banyak kekhawatiran. Hari ini kamu kembali dengan toga dan gelar yang kamu perjuangkan sendiri.',
      'Kami tahu ada malam-malam ketika revisi terasa tidak ada habisnya dan kamu menelepon hanya untuk menangis sebentar. Terima kasih sudah tidak menyerah.',
      'Ke mana pun langkahmu setelah ini, rumah tetap terbuka. Kami bangga — bukan hanya karena gelarnya, tapi karena orang yang kamu jadi selama perjalanannya.',
    ],
    penutup: 'Dengan doa yang tidak pernah putus,', tandaTangan: 'Mama, Papa & Raffi',
    alasanJudul: 'Yang membuat kami bangga', alasan: [
      { depan: '127 halaman skripsi', isi: 'Ditulis di sela kerja paruh waktu di perpustakaan kampus.' },
      { depan: 'Tujuh kali revisi', isi: 'Dan kamu tetap mengirim stiker lucu ke grup keluarga setiap selesai bimbingan.' },
      { depan: 'Kakak teladan', isi: 'Masih sempat mengajari Raffi matematika lewat panggilan video.' },
      { depan: 'Tidak lupa pulang', isi: 'Setiap libur, oleh-olehnya selalu ada, walau uang saku pas-pasan.' },
    ],
    kenangan: [
      { judul: 'Malam-malam skripsi', waktu: 'Mei 2026', foto: wisudaSkripsi, lebar: 1600, tinggi: 1008, cerita: 'Foto yang kamu kirim jam dua pagi dengan pesan “Ma, bab empat selesai.” Mama menyimpannya sampai sekarang.' },
      { judul: 'Pelukan setelah prosesi', waktu: '24 Oktober 2026', foto: wisudaKeluarga, lebar: 1600, tinggi: 1008, cerita: 'Mama sudah berjanji tidak akan menangis. Janji itu bertahan sekitar tiga detik.' },
    ],
    aksi: 'toga', aksiJudul: 'Pindahkan tali togamu dari kiri ke kanan', aksiSelesai: 'Resmi! Selamat datang di babak baru, Salsa.',
    pesanAwal: [
      { dari: 'Bu Dosen Pembimbing', teks: 'Selamat, Salsa. Revisi terakhirmu yang paling rapi. Semoga sukses di langkah berikutnya.' },
      { dari: 'Dinda', teks: 'Teman seperjuangan bimbingan! Akhirnya kita foto pakai toga juga.' },
    ],
    namaKosong: 'Teman Salsa',
  },
];

export const JUMLAH_LILIN = 5;

/** Whole years between a birth date and the celebration date (both YYYY-MM-DD). */
export function hitungUsia(lahir: string, pada: string) {
  const [ly, lm, ld] = lahir.split('-').map(Number);
  const [py, pm, pd] = pada.split('-').map(Number);
  let usia = py - ly;
  if (pm < lm || (pm === lm && pd < ld)) usia -= 1;
  return usia;
}

/** The wish appears only once every candle is out. */
export function semuaLilinPadam(menyala: boolean[]) {
  return menyala.length > 0 && menyala.every(nyala => !nyala);
}

/** Replaces {usia} in a letter paragraph; graduations have no age. */
export function isiSurat(ucapan: Ucapan, paragraf: string) {
  if (!ucapan.lahir) return paragraf;
  return paragraf.replace('{usia}', String(hitungUsia(ucapan.lahir, ucapan.tanggalIso)));
}

export function buatPesanUcapan(ucapan: Ucapan, nama: string, teks: string) {
  return buatPesanDinding(nama.trim() || ucapan.namaKosong, teks);
}
