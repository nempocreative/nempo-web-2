# Pindah database untuk Vercel

Status: konfigurasi yang diperlukan telah didata. Database tujuan belum diisi atau diverifikasi. Preview Lovable tetap memakai Lovable Cloud selama proses ini.

## 1. Amankan kunci

Rotasi secret key yang pernah dikirim di chat pada proyek Supabase tujuan. Jangan masukkan secret key ke kode, GitHub, atau variabel berawalan `VITE_`.

Situs dan CMS saat ini memakai publishable key dengan pengaman akses tabel. Secret key dan JWKS URL tidak diperlukan untuk alur ini.

## 2. Pindahkan data dan akun

Jika tombol ekspor bermasalah atau tidak tersedia, gunakan file salinan `nempo-database-salinan.sql` (di Files): jalankan sekali di SQL Editor Supabase tujuan. File itu membawa struktur tabel, kebijakan keamanan, dan data yang ada.

Ekspor membawa struktur tabel, data, serta akun pengguna beserta hash password. Ekspor tidak membawa file storage, secrets, atau pengaturan penyedia login. Impor ekspor itu ke proyek Supabase tujuan milik Anda, bukan ke database Cloud yang masih dipakai preview. File salinan SQL tidak membawa akun pengguna: buat ulang akun admin di Supabase tujuan (Authentication → Add user), lalu tambahkan baris perannya di tabel `user_roles`.

Pastikan tabel `events`, `event_tickets`, `user_roles` dan fungsi `has_role` ikut pindah. MusiComedy Night harus ada dengan slug `musicomedy-night` dan aktif. Jangan isi ulang kumpulan wisata, kuliner, penginapan, perlombaan dan Kamus Sunda lama yang sudah dihapus.

Foto lokal di `public/` dan `src/assets/` ikut repository; pertahankan path lokalnya. Periksa tautan storage lainnya secara terpisah karena ekspor database tidak membawa file storage.

## 3. Isi Vercel Environment Variables

Gunakan `.env.example` sebagai daftar, bukan sebagai tempat menyimpan secrets.

| Nama | Isi |
| --- | --- |
| `VITE_SUPABASE_URL` | URL proyek Supabase tujuan |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable key tujuan |
| `VITE_SUPABASE_PROJECT_ID` | Project reference tujuan |
| `SUPABASE_URL` | URL tujuan yang sama, untuk API situs |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable key tujuan yang sama, untuk API situs |
| `NITRO_PRESET` | `vercel` |

Gunakan perintah build `bun run build`. Jangan paksa output menjadi `dist` situs statis. Deploy ulang setelah mengisi variabel: nilai `VITE_` ditanam saat build.

## 4. Periksa sebelum mengakhiri pemindahan

- Klik Event Mendatang dan buka detail MusiComedy Night.
- Pastikan `/api/events` dan `/api/events/musicomedy-night` menampilkan data yang sama.
- Masuk ke `/cms` dengan akun admin yang sudah dipindahkan, lalu baca data event.
- Pastikan akun tanpa peran admin tidak boleh mengubah data.
- Periksa poster, peta, dan QRIS asli tetap terbuka.
- Sesuaikan URL situs/redirect login di proyek tujuan jika menggunakan alur pemulihan password atau OAuth.

Jangan hapus Cloud selama langkah di atas belum berhasil. Mengubah environment variables tidak memindahkan data atau akun dengan sendirinya.