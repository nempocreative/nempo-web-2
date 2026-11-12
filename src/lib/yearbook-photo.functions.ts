import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  YEARBOOK_PHOTO_CAPTION_MAX,
  YEARBOOK_PHOTO_NAME_MAX,
  validateYearbookPhotoSubmission,
} from "./yearbook-photo";

const submissionFields = z.object({
  name: z.string().max(YEARBOOK_PHOTO_NAME_MAX),
  caption: z.string().max(YEARBOOK_PHOTO_CAPTION_MAX),
  photo: z.unknown(),
});

export const submitYearbookPhoto = createServerFn({ method: "POST" })
  .inputValidator((input: FormData) => {
    if (!(input instanceof FormData)) throw new Error("Data kiriman foto tidak valid.");
    return submissionFields.parse({
      name: input.get("name") ?? "",
      caption: input.get("caption") ?? "",
      photo: input.get("photo"),
    });
  })
  .handler(async ({ data }) => {
    const photo = data.photo;
    if (typeof File === "undefined" || !(photo instanceof File)) {
      return { ok: false as const, error: "Pilih satu foto momen sekolah dulu, ya." };
    }

    const validated = validateYearbookPhotoSubmission(data.name, data.caption, photo);
    if (!validated.ok) return validated;

    // Public senders may submit, but only the server can write to this private bucket.
    // No submitted photo or metadata is publicly readable.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const storagePath = `submissions/${crypto.randomUUID()}.${validated.data.extension}`;
    const uploaded = await supabaseAdmin.storage.from("yearbook-moments").upload(storagePath, photo, {
      contentType: validated.data.mimeType,
      upsert: false,
    });

    if (uploaded.error) {
      console.error("Yearbook photo upload failed:", uploaded.error.message);
      return { ok: false as const, error: "Foto belum berhasil dikirim. Coba lagi sebentar lagi." };
    }

    const inserted = await supabaseAdmin
      .from("yearbook_photo_submissions")
      .insert({
        sender_name: validated.data.name,
        caption: validated.data.caption,
        storage_path: storagePath,
        mime_type: validated.data.mimeType,
      })
      .select("id")
      .single();

    if (inserted.error) {
      console.error("Yearbook photo metadata save failed:", inserted.error.message);
      const cleanup = await supabaseAdmin.storage.from("yearbook-moments").remove([storagePath]);
      if (cleanup.error) console.error("Yearbook photo cleanup failed:", cleanup.error.message);
      return { ok: false as const, error: "Foto belum berhasil dicatat. Coba kirim lagi." };
    }

    return { ok: true as const, id: inserted.data.id };
  });
