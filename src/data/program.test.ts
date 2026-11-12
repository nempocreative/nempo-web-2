import { describe, expect, it } from "vitest";
import { cariProgram, geserSlideProgram, PROGRAM_NEMPO } from "./program";
import manifest from "@/program/pasar-seni-garut/manifest.json";

describe("program Nempo", () => {
  it("Pasar Seni Garut is listed as a locked proposal", () => {
    const p = cariProgram("pasar-seni-garut");
    expect(p?.terkunci).toBe(true);
    expect(PROGRAM_NEMPO.length).toBeGreaterThan(0);
  });

  it("the listed slide count matches the deck's 38 slides", () => {
    expect(manifest.length).toBe(38);
    expect(cariProgram("pasar-seni-garut")?.jumlahSlide).toBe(manifest.length);
  });

  it("slide navigation stops at the first and last slide", () => {
    expect(geserSlideProgram(0, -1, 38)).toBe(0);
    expect(geserSlideProgram(37, 1, 38)).toBe(37);
    expect(geserSlideProgram(5, 1, 38)).toBe(6);
  });
});
