import { describe, expect, it } from "vitest";
import { coverCrop, storyFilename, wrapLines } from "./story-card";

const measure = (s: string) => s.length * 10;

describe("story card helpers", () => {
  it("names the file after the student and the chosen color", () => {
    expect(storyFilename("nadia", "dark")).toBe("kenangan-nadia-2026-biru-malam.png");
    expect(storyFilename("nadia", "light")).toBe("kenangan-nadia-2026-kertas-putih.png");
  });
  it("wraps text without exceeding the width", () => {
    expect(wrapLines("aku suka kantin sekolah", 100, measure, 3)).toEqual(["aku suka", "kantin", "sekolah"]);
  });
  it("cuts long text with an ellipsis on the last allowed line", () => {
    const lines = wrapLines("satu dua tiga empat lima enam tujuh", 100, measure, 2);
    expect(lines).toHaveLength(2);
    expect(lines[1]!.endsWith("…")).toBe(true);
    expect(lines.every((l) => measure(l) <= 100)).toBe(true);
  });
  it("crops a portrait photo to fill a wider box from the top", () => {
    expect(coverCrop(800, 1000, 800, 500, 0)).toEqual({ sx: 0, sy: 0, sw: 800, sh: 500 });
    expect(coverCrop(800, 1000, 800, 500, 1)).toEqual({ sx: 0, sy: 500, sw: 800, sh: 500 });
  });
});
