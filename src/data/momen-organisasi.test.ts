import { describe, it, expect } from 'vitest';
import { buatPesanOrganisasi } from './momen-organisasi';

describe('pesan organisasi menggunakan aturan dinding bersama', () => {
  it('menolak pesan kosong', () => {
    expect(buatPesanOrganisasi('Arka', '   ').ok).toBe(false);
  });
  it('menerima 140 karakter dan menolak 141 karakter', () => {
    expect(buatPesanOrganisasi('Arka', 'a'.repeat(140)).ok).toBe(true);
    expect(buatPesanOrganisasi('Arka', 'a'.repeat(141)).ok).toBe(false);
  });
  it('memakai identitas organisasi ketika nama kosong', () => {
    expect(buatPesanOrganisasi(' ', 'Terima kasih!')).toEqual({ ok: true, note: { dari: 'Sahabat Ruang Tumbuh', teks: 'Terima kasih!' } });
  });
});