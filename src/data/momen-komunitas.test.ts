import { describe, expect, it } from 'vitest';
import { anggotaSekarang, buatPesanKomunitas, perjalananKomunitas, selisihAnggota, tinggiBatang } from './momen-komunitas';

describe('pesan komunitas memakai aturan dinding bersama', () => {
  it('menolak pesan kosong', () => {
    expect(buatPesanKomunitas('Rina', '   ').ok).toBe(false);
  });
  it('menerima 140 karakter dan menolak 141 karakter', () => {
    expect(buatPesanKomunitas('Rina', 'a'.repeat(140)).ok).toBe(true);
    expect(buatPesanKomunitas('Rina', 'a'.repeat(141)).ok).toBe(false);
  });
  it('memakai identitas komunitas ketika nama kosong', () => {
    expect(buatPesanKomunitas(' ', 'Selamat lima tahun!')).toEqual({ ok: true, note: { dari: 'Sahabat Kayuh Garut', teks: 'Selamat lima tahun!' } });
  });
});

describe('perjalanan anggota', () => {
  it('jumlah anggota sekarang diambil dari tahun terakhir', () => {
    expect(perjalananKomunitas).toHaveLength(6);
    expect(anggotaSekarang).toBe(312);
  });
  it('tahun pertama menghitung semua pendiri, tahun berikutnya hanya anggota baru', () => {
    expect(selisihAnggota(0)).toBe(8);
    expect(selisihAnggota(1)).toBe(38);
    expect(selisihAnggota(5)).toBe(58);
  });
  it('batang grafik penuh untuk angka tertinggi dan tetap terlihat untuk angka kecil', () => {
    expect(tinggiBatang(312, 312)).toBe(100);
    expect(tinggiBatang(8, 312)).toBe(8);
    expect(tinggiBatang(156, 312)).toBe(50);
  });
});
