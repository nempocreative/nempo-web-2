import { describe, expect, it } from "vitest";
import {
  YEARBOOK_PHOTO_CAPTION_MAX,
  YEARBOOK_PHOTO_DEFAULT_NAME,
  YEARBOOK_PHOTO_MAX_BYTES,
  validateYearbookPhotoSubmission,
} from "./yearbook-photo";

const jpeg = { size: 1024, type: "image/jpeg" };

describe("kiriman foto momen yearbook", () => {
  it("foto JPG sampai 8 MB diterima dan nama kosong menjadi Teman sekelas", () => {
    const result = validateYearbookPhotoSubmission("  ", "  ", { ...jpeg, size: YEARBOOK_PHOTO_MAX_BYTES });
    expect(YEARBOOK_PHOTO_MAX_BYTES).toBe(8 * 1024 * 1024);
    expect(result.ok && result.data.name).toBe(YEARBOOK_PHOTO_DEFAULT_NAME);
    expect(result.ok && result.data.caption).toBeNull();
    expect(result.ok && result.data.extension).toBe("jpg");
  });

  it("foto lebih dari 8 MB ditolak", () => {
    const result = validateYearbookPhotoSubmission("Dimas", "", { ...jpeg, size: YEARBOOK_PHOTO_MAX_BYTES + 1 });
    expect(result.ok).toBe(false);
  });

  it("GIF ditolak; hanya JPG, PNG, dan WebP yang diterima", () => {
    expect(validateYearbookPhotoSubmission("", "", { size: 100, type: "image/gif" }).ok).toBe(false);
    expect(validateYearbookPhotoSubmission("", "", { size: 100, type: "image/png" }).ok).toBe(true);
    expect(validateYearbookPhotoSubmission("", "", { size: 100, type: "image/webp" }).ok).toBe(true);
  });

  it("cerita lebih dari 140 huruf ditolak", () => {
    expect(YEARBOOK_PHOTO_CAPTION_MAX).toBe(140);
    expect(validateYearbookPhotoSubmission("", "a".repeat(141), jpeg).ok).toBe(false);
    expect(validateYearbookPhotoSubmission("", "a".repeat(140), jpeg).ok).toBe(true);
  });

  it("pengiriman tanpa foto ditolak", () => {
    expect(validateYearbookPhotoSubmission("", "", null).ok).toBe(false);
  });
});
