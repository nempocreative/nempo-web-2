import { describe, expect, it } from "vitest";
import { graduates, kelasList, moments, teacherMessages } from "@/data/year-book";
import {
  kegiatanKelas,
  kelasDemo,
  kelasMeta,
  momenKelas,
  pesanKelas,
  siswaKelas,
  strukturKelas,
  waliKelas,
} from "@/data/momen-kelas";

describe("Momen Digital — contoh Kelas", () => {
  it("kelas contoh terdaftar di daftar kelas yearbook", () => {
    expect(kelasList).toContain(kelasDemo);
    expect(kelasMeta.nama).toBe(kelasDemo);
    expect(kelasMeta.halaman).toBe("/year-book/kelas");
  });

  it("semua siswa contoh memang berasal dari kelas itu dan punya foto", () => {
    expect(siswaKelas.length).toBeGreaterThanOrEqual(4);
    for (const s of siswaKelas) {
      expect(s.kelas).toBe(kelasDemo);
      expect(s.foto).toBeTruthy();
    }
  });

  it("wali kelas contoh benar-benar wali kelas tersebut", () => {
    expect(waliKelas).toBeDefined();
    expect(waliKelas?.kelas).toBe(kelasDemo);
    expect(waliKelas?.foto).toBeTruthy();
    expect(teacherMessages).toContainEqual(waliKelas);
  });

  it("struktur kelas menunjuk siswa yang ada di kelas itu", () => {
    const ids = new Set(siswaKelas.map((s) => s.id));
    expect(strukturKelas.length).toBe(4);
    for (const s of strukturKelas) {
      expect(ids.has(s.graduateId)).toBe(true);
      expect(graduates.find((g) => g.id === s.graduateId)?.kelas).toBe(kelasDemo);
    }
  });

  it("momen, kegiatan, dan pesan kelas terisi penuh", () => {
    expect(momenKelas.length).toBeGreaterThanOrEqual(4);
    for (const m of momenKelas) expect(moments).toContainEqual(m);
    expect(kegiatanKelas.length).toBe(4);
    for (const k of kegiatanKelas) {
      expect(k.judul.length).toBeGreaterThan(3);
      expect(k.teks.length).toBeGreaterThan(10);
    }
    expect(pesanKelas.length).toBeGreaterThanOrEqual(4);
    for (const p of pesanKelas) {
      expect(p.dari.length).toBeGreaterThan(1);
      expect(p.teks.length).toBeGreaterThan(5);
    }
  });
});
