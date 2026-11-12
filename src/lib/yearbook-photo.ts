export const YEARBOOK_PHOTO_MAX_BYTES = 8 * 1024 * 1024;
export const YEARBOOK_PHOTO_NAME_MAX = 50;
export const YEARBOOK_PHOTO_CAPTION_MAX = 140;
export const YEARBOOK_PHOTO_DEFAULT_NAME = "Teman sekelas";

export const YEARBOOK_PHOTO_MIME_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export type YearbookPhotoMime = keyof typeof YEARBOOK_PHOTO_MIME_EXTENSIONS;

type PhotoMetadata = { size: number; type: string };

export type YearbookPhotoValidation =
  | {
      ok: true;
      data: {
        name: string;
        caption: string | null;
        mimeType: YearbookPhotoMime;
        extension: string;
      };
    }
  | { ok: false; error: string };

export function validateYearbookPhotoSubmission(
  name: unknown,
  caption: unknown,
  photo: PhotoMetadata | null,
): YearbookPhotoValidation {
  const cleanName = typeof name === "string" ? name.trim().replace(/\s+/g, " ") : "";
  const cleanCaption = typeof caption === "string" ? caption.trim().replace(/\r\n/g, "\n") : "";

  if (cleanName.length > YEARBOOK_PHOTO_NAME_MAX) {
    return { ok: false, error: `Nama maksimal ${YEARBOOK_PHOTO_NAME_MAX} huruf.` };
  }
  if (cleanCaption.length > YEARBOOK_PHOTO_CAPTION_MAX) {
    return { ok: false, error: `Cerita singkat maksimal ${YEARBOOK_PHOTO_CAPTION_MAX} huruf.` };
  }
  if (!photo) return { ok: false, error: "Pilih satu foto momen sekolah dulu, ya." };
  if (!Number.isFinite(photo.size) || photo.size <= 0) {
    return { ok: false, error: "Fotonya kosong atau tidak bisa dibaca. Coba pilih foto lain." };
  }
  if (!(photo.type in YEARBOOK_PHOTO_MIME_EXTENSIONS)) {
    return { ok: false, error: "Format foto harus JPG, PNG, atau WebP." };
  }
  if (photo.size > YEARBOOK_PHOTO_MAX_BYTES) {
    return { ok: false, error: "Ukuran foto maksimal 8 MB. Kecilkan dulu, lalu coba lagi." };
  }

  const mimeType = photo.type as YearbookPhotoMime;
  return {
    ok: true,
    data: {
      name: cleanName || YEARBOOK_PHOTO_DEFAULT_NAME,
      caption: cleanCaption || null,
      mimeType,
      extension: YEARBOOK_PHOTO_MIME_EXTENSIONS[mimeType],
    },
  };
}
