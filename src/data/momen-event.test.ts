import { describe, expect, it } from 'vitest';
import { buatPesanEvent, divisiEvent, langkahSlide, totalPanitia } from './momen-event';

describe('pesan event memakai aturan dinding bersama', () => {
  it('menolak pesan kosong', () => {
    expect(buatPesanEvent('Raka', '   ').ok).toBe(false);
  });
  it('menerima 140 karakter dan menolak 141 karakter', () => {
    expect(buatPesanEvent('Raka', 'a'.repeat(140)).ok).toBe(true);
    expect(buatPesanEvent('Raka', 'a'.repeat(141)).ok).toBe(false);
  });
  it('memakai identitas festival ketika nama kosong', () => {
    expect(buatPesanEvent(' ', 'Seru banget!')).toEqual({ ok: true, note: { dari: 'Teman Lembah Senja', teks: 'Seru banget!' } });
  });
});

describe('cuplikan foto berputar', () => {
  it('kembali ke foto pertama setelah foto terakhir', () => {
    expect(langkahSlide(5, 1, 6)).toBe(0);
  });
  it('mundur dari foto pertama ke foto terakhir', () => {
    expect(langkahSlide(0, -1, 6)).toBe(5);
  });
});

describe('jumlah panitia', () => {
  it('dihitung dari seluruh divisi', () => {
    expect(divisiEvent).toHaveLength(6);
    expect(totalPanitia).toBe(48);
  });
});
