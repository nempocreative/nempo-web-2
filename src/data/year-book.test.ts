import { describe, expect, it } from "vitest";
import { mainNavItems } from "./main-nav-items";
import {
  chapters,
  graduates,
  graduateInstagramUrl,
  kelasInfo,
  kelasList,
  superlatives,
  moments,
  teacherMessages,
  wallNotes,
  yearBookBentuk,
  yearBookIsi,
  yearBookLangkah,
  yearBookMeta,
} from "./year-book";

describe("menu Year Book", () => {
  it("muncul di menu utama dan menunjuk ke /year-book", () => {
    const item = mainNavItems.find((n) => n.id === "year-book");
    expect(item?.label).toBe("Year Book");
    expect(item?.href).toBe("/year-book");
  });
});

describe("isi year book", () => {
  it("semua 12 siswa punya akun IG unik yang menuju profil Instagram", () => {
    expect(graduates).toHaveLength(12);
    expect(new Set(graduates.map((g) => g.instagram)).size).toBe(12);
    for (const g of graduates) {
      expect(g.instagram).toMatch(/^[a-zA-Z0-9._]{1,30}$/);
      const url = new URL(graduateInstagramUrl(g.instagram));
      expect(url.origin).toBe("https://www.instagram.com");
      expect(url.pathname).toBe(`/${g.instagram}/`);
    }
    expect(graduateInstagramUrl("nadia.putri")).toBe("https://www.instagram.com/nadia.putri/");
  });

  it("setiap lulusan punya kelas yang terdaftar", () => {
    expect(graduates.length).toBe(12);
    for (const g of graduates) {
      expect(kelasList).toContain(g.kelas);
      expect(g.nama.trim().length).toBeGreaterThan(0);
      expect(g.quote.trim().length).toBeGreaterThan(0);
    }
  });

  it("galeri punya tepat satu foto utama dan 8 foto isi yang mengisi grid penuh", () => {
    const featured = moments.filter((m) => m.featured);
    const rest = moments.filter((m) => !m.featured);
    expect(featured.length).toBe(1);
    expect(rest.length).toBe(8);
    expect(rest.length % 4).toBe(0);
    expect(rest.length % 2).toBe(0);
  });

  it("linimasa, pesan guru, dan dinding pesan terisi penuh", () => {
    expect(chapters.length).toBe(4);
    expect(teacherMessages.length).toBe(3);
    expect(wallNotes.length).toBe(6);
    expect(wallNotes.length % 3).toBe(0);
  });

  it("meta angkatan memakai tahun 2026 dan menyebut sekolahnya", () => {
    expect(yearBookMeta.angkatan).toBe("2026");
    expect(yearBookMeta.sekolah).toBe("SMA Nempo Garut");
    expect(yearBookMeta.tahunLulus).toBe(2026);
  });

  it("isi halaman tidak lagi ditandai sebagai contoh atau foto AI", () => {
    expect(yearBookMeta).not.toHaveProperty("catatanContoh");
    expect(JSON.stringify(yearBookMeta)).not.toMatch(/contoh/i);
    for (const g of graduates) expect(g.instagram).not.toMatch(/contoh/i);
  });

  it("halaman yearbook angkatan menunjuk ke /year-book/2026", () => {
    expect(yearBookMeta.halamanBuku).toBe("/year-book/2026");
  });

  it("penjelasan punya isi, langkah, dan bentuk yang terisi penuh", () => {
    expect(yearBookIsi.length).toBe(6);
    for (const item of yearBookIsi) {
      expect(item.judul.trim().length).toBeGreaterThan(0);
      expect(item.teks.trim().length).toBeGreaterThan(0);
    }
    expect(yearBookLangkah.length).toBe(4);
    expect(yearBookLangkah.map((s) => s.nomor)).toEqual(["01", "02", "03", "04"]);
    expect(yearBookBentuk.length).toBe(2);
    for (const b of yearBookBentuk) {
      expect(b.poin.length).toBeGreaterThan(0);
    }
  });

  it("setiap kelas punya tepat 4 lulusan supaya halaman lulusan terisi penuh", () => {
    for (const k of kelasList) {
      expect(graduates.filter((g) => g.kelas === k).length).toBe(4);
    }
  });

  it("setiap kelas punya wali kelas dan info kelas", () => {
    for (const k of kelasList) {
      expect(teacherMessages.filter((t) => t.kelas === k).length).toBe(1);
      expect(kelasInfo.filter((i) => i.kelas === k).length).toBe(1);
    }
  });

  it("setiap lulusan punya foto dan cita-cita", () => {
    for (const g of graduates) {
      expect(g.foto.length).toBeGreaterThan(0);
      expect(g.citaCita.trim().length).toBeGreaterThan(0);
    }
  });

  it("6 gelar paling-paling, masing-masing untuk lulusan yang ada", () => {
    expect(superlatives.length).toBe(6);
    const ids = new Set(graduates.map((g) => g.id));
    for (const s of superlatives) expect(ids.has(s.graduateId)).toBe(true);
  });
});
