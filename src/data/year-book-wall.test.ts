import { describe, expect, it } from "vitest";
import { WALL_DEFAULT_NAME, WALL_NAME_MAX, WALL_TEXT_MAX, buatPesanDinding, pesanLucuIde } from "./year-book";

describe("kolom kirim pesan di dinding yearbook", () => {
  it("pesan kosong ditolak", () => {
    expect(buatPesanDinding("Dimas", "   ").ok).toBe(false);
  });

  it("pesan lebih dari 140 huruf ditolak", () => {
    expect(WALL_TEXT_MAX).toBe(140);
    expect(buatPesanDinding("Dimas", "a".repeat(141)).ok).toBe(false);
    expect(buatPesanDinding("Dimas", "a".repeat(140)).ok).toBe(true);
  });

  it("nama kosong jadi 'Teman sekelas'", () => {
    const res = buatPesanDinding("  ", "Traktir seblak ya!");
    expect(res.ok && res.note.dari).toBe(WALL_DEFAULT_NAME);
    expect(WALL_DEFAULT_NAME).toBe("Teman sekelas");
  });

  it("nama dipotong maksimal 24 huruf dan spasi dirapikan", () => {
    const res = buatPesanDinding("x".repeat(30), "  halo   semua  ");
    expect(res.ok && res.note.dari.length).toBe(WALL_NAME_MAX);
    expect(res.ok && res.note.teks).toBe("halo semua");
  });

  it("semua ide pesan lucu muat di kolom pesan", () => {
    for (const ide of pesanLucuIde) expect(buatPesanDinding("", ide).ok).toBe(true);
  });
});
