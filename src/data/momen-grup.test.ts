import { describe, expect, it } from "vitest";
import { buatPesanGrup, cariLaguUrl } from "./momen-grup";

describe("pesan pertemanan", () => {
  it("memakai identitas teman grup ketika nama kosong", () => {
    expect(buatPesanGrup("  ", "Sampai ketemu lagi!")).toEqual({ ok: true, note: { dari: "Teman satu meja", teks: "Sampai ketemu lagi!" } });
  });
  it("menolak pesan kosong tanpa membuat pesan", () => {
    expect(buatPesanGrup("Nara", "   ").ok).toBe(false);
  });
  it("memakai batas pesan bersama 140 karakter", () => {
    expect(buatPesanGrup("Nara", "a".repeat(140)).ok).toBe(true);
    expect(buatPesanGrup("Nara", "a".repeat(141)).ok).toBe(false);
  });
});

it("mencari judul dan artis pilihan tanpa mengganti lagu", () => {
  expect(cariLaguUrl("Monokrom", "Tulus")).toBe("https://open.spotify.com/search/Monokrom%20Tulus");
});