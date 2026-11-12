import { describe, expect, it } from 'vitest';
import { captionFeed, geserSlide, namaFileFeed, slideFeed } from './ucapan-feed';
import { ucapanSpesial } from './ucapan-spesial';

const pacar = ucapanSpesial.find(u => u.id === 'pacar')!;
const wisuda = ucapanSpesial.find(u => u.id === 'wisuda')!;

describe('desain feed ucapan', () => {
  it('setiap ucapan punya tiga slide: sampul, surat, alasan', () => {
    for (const u of ucapanSpesial) expect(slideFeed(u).map(s => s.jenis)).toEqual(['sampul', 'surat', 'alasan']);
  });
  it('slide surat dan caption menyebut usia Alya 24 tahun', () => {
    const surat = slideFeed(pacar)[1]!;
    expect(surat.jenis === 'surat' && surat.isi).toContain('24 tahun');
    expect(captionFeed(pacar)).toContain('24 tahun');
    expect(captionFeed(pacar)).not.toContain('{usia}');
  });
  it('caption wisuda memakai tagar wisuda', () => {
    expect(captionFeed(wisuda)).toContain('#wisuda');
  });
  it('slide alasan memuat empat hal kecil', () => {
    const s = slideFeed(pacar)[2]!;
    expect(s.jenis === 'alasan' && s.poin.length).toBe(4);
  });
  it('tanggal hanya muncul sekali di sampul', () => {
    for (const u of ucapanSpesial) {
      const s = slideFeed(u)[0]!;
      const teks = s.jenis === 'sampul' ? [s.label, s.judul, s.keterangan, s.foto].join(' ') : '';
      expect(teks.split(u.tanggal).length - 1).toBe(1);
    }
  });
  it('geser slide berputar di kedua ujung', () => {
    expect(geserSlide(2, 1)).toBe(0);
    expect(geserSlide(0, -1)).toBe(2);
  });
  it('nama file unduhan berurutan per slide', () => {
    expect(namaFileFeed(pacar, 0)).toBe('ucapan-pacar-alya-slide-1.png');
  });
});
