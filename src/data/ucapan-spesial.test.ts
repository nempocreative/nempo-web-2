import { describe, expect, it } from 'vitest';
import { buatPesanUcapan, hitungUsia, isiSurat, semuaLilinPadam, ucapanSpesial } from './ucapan-spesial';

const pacar = ucapanSpesial.find(u => u.id === 'pacar')!;
const sahabat = ucapanSpesial.find(u => u.id === 'sahabat')!;
const wisuda = ucapanSpesial.find(u => u.id === 'wisuda')!;

describe('usia di hari ulang tahun', () => {
  it('Alya genap 24 tahun pada 18 Maret 2026', () => {
    expect(hitungUsia(pacar.lahir!, pacar.tanggalIso)).toBe(24);
  });
  it('sehari sebelum ulang tahun usianya belum bertambah', () => {
    expect(hitungUsia('2002-03-18', '2026-03-17')).toBe(23);
  });
  it('Rendi genap 23 tahun dan usianya tertulis di surat', () => {
    expect(isiSurat(sahabat, sahabat.surat[0])).toContain('23 tahun');
  });
  it('surat wisuda tidak menyebut usia', () => {
    expect(isiSurat(wisuda, wisuda.surat[0])).toBe(wisuda.surat[0]);
  });
});

describe('lilin ulang tahun', () => {
  it('doa baru muncul setelah semua lilin padam', () => {
    expect(semuaLilinPadam([false, false, true, false, false])).toBe(false);
    expect(semuaLilinPadam([false, false, false, false, false])).toBe(true);
  });
});

describe('ucapan dari teman lain', () => {
  it('memakai nama penerima ketika nama pengirim kosong', () => {
    expect(buatPesanUcapan(wisuda, ' ', 'Selamat!')).toEqual({ ok: true, note: { dari: 'Teman Salsa', teks: 'Selamat!' } });
  });
  it('menolak pesan lebih dari 140 karakter', () => {
    expect(buatPesanUcapan(pacar, 'Nadya', 'a'.repeat(140)).ok).toBe(true);
    expect(buatPesanUcapan(pacar, 'Nadya', 'a'.repeat(141)).ok).toBe(false);
  });
});
