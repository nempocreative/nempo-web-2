import { useEffect, useId, useState, type ChangeEvent, type CSSProperties, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Camera, CheckCircle2, ImagePlus, LoaderCircle, Send } from "lucide-react";
import { submitYearbookPhoto } from "@/lib/yearbook-photo.functions";
import {
  YEARBOOK_PHOTO_CAPTION_MAX,
  YEARBOOK_PHOTO_NAME_MAX,
  validateYearbookPhotoSubmission,
} from "@/lib/yearbook-photo";

const INK = "#141c3f";
const INK_SOFT = "#565f88";
const LINE = "#dbe1f6";
const ACCENT = "#2b3fd8";
const BRASS = "#f2a007";
const CREAM = "#fff6dc";
const hand: CSSProperties = { fontFamily: '"Caveat", "Segoe Script", cursive' };

export function YearbookPhotoUpload() {
  const inputId = useId();
  const submitPhoto = useServerFn(submitYearbookPhoto);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const choosePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    const checked = validateYearbookPhotoSubmission("", "", next);
    if (!checked.ok) {
      setPhoto(null);
      setPreview(null);
      setError(checked.error);
      event.target.value = "";
      return;
    }
    setPhoto(next);
    setPreview(next ? URL.createObjectURL(next) : null);
    setStatus("idle");
    setError("");
  };

  const send = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "submitting" || status === "sent") return;
    const checked = validateYearbookPhotoSubmission(name, caption, photo);
    if (!checked.ok || !photo) {
      setError(checked.ok ? "Pilih satu foto dulu, ya." : checked.error);
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const form = new FormData();
      form.set("name", name);
      form.set("caption", caption);
      form.set("photo", photo);
      const result = await submitPhoto({ data: form });
      if (!result.ok) {
        setStatus("idle");
        setError(result.error);
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("Foto belum berhasil dikirim. Periksa koneksi, lalu coba lagi.");
    }
  };

  const reset = () => {
    setPhoto(null);
    setPreview(null);
    setCaption("");
    setError("");
    setStatus("idle");
    setInputKey((key) => key + 1);
  };

  const busy = status === "submitting";
  const sent = status === "sent";

  return (
    <form
      onSubmit={send}
      className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-[28px] border-2 p-5 text-left sm:p-7"
      style={{ borderColor: "rgba(242,160,7,.45)", background: `linear-gradient(155deg, ${CREAM}, #ffffff 68%)`, boxShadow: "0 30px 60px -36px rgba(20,28,63,.55)" }}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: ACCENT, color: "#fff" }}>
          <Camera className="h-5 w-5" />
        </span>
        <div>
          <p className="text-3xl leading-none sm:text-4xl" style={{ ...hand, color: ACCENT }}>
            Punya foto spesial di sekolah?
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: INK_SOFT }}>
            Kirim momen terbaikmu untuk dipilih ke yearbook. Foto tidak langsung tampil di galeri.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <input
            key={inputKey}
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={choosePhoto}
            disabled={busy || sent}
            className="sr-only"
            aria-label="Pilih foto momen sekolah"
          />
          <label
            htmlFor={inputId}
            className={`relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed text-center transition-transform hover:-translate-y-0.5 ${busy || sent ? "pointer-events-none" : ""}`}
            style={{ borderColor: preview ? BRASS : LINE, background: preview ? INK : "rgba(244,246,255,.8)" }}
          >
            {preview ? (
              <img src={preview} alt="Pratinjau foto yang akan dikirim" className="h-full w-full object-cover" />
            ) : (
              <span className="flex flex-col items-center px-4">
                <ImagePlus className="h-8 w-8" style={{ color: ACCENT }} />
                <span className="mt-3 text-sm font-black" style={{ color: INK }}>Pilih foto</span>
                <span className="mt-1 text-xs leading-relaxed" style={{ color: INK_SOFT }}>JPG, PNG, WebP · maks. 8 MB</span>
              </span>
            )}
          </label>
          {photo && <p className="mt-2 break-words text-xs" style={{ color: INK_SOFT }}>{photo.name}</p>}
        </div>

        <div className="grid content-start gap-3">
          <label className="grid gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>Nama kamu · boleh kosong</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={YEARBOOK_PHOTO_NAME_MAX}
              disabled={busy || sent}
              placeholder="Teman sekelas"
              className="h-11 rounded-xl border bg-white px-4 text-base outline-none transition-shadow focus:ring-2 disabled:opacity-70"
              style={{ borderColor: LINE, color: INK, "--tw-ring-color": "rgba(43,63,216,.35)" } as CSSProperties}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="flex items-center justify-between gap-2 text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>
              Cerita singkat · boleh kosong
              <span>{caption.length}/{YEARBOOK_PHOTO_CAPTION_MAX}</span>
            </span>
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              maxLength={YEARBOOK_PHOTO_CAPTION_MAX}
              disabled={busy || sent}
              rows={3}
              placeholder="Juara lomba antarkelas!"
              className="resize-none rounded-xl border bg-white px-4 py-3 text-base leading-relaxed outline-none transition-shadow focus:ring-2 disabled:opacity-70"
              style={{ borderColor: LINE, color: INK, "--tw-ring-color": "rgba(43,63,216,.35)" } as CSSProperties}
            />
          </label>
        </div>
      </div>

      {error && <p role="alert" className="mt-4 text-sm font-bold" style={{ color: "#c0265b" }}>{error}</p>}
      {sent && (
        <div role="status" className="mt-4 flex items-start gap-2 rounded-2xl border p-4" style={{ borderColor: "#9ed8ba", background: "#edf9f1", color: "#166b43" }}>
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-black">Foto sudah masuk antrean. Terima kasih!</p>
            <p className="mt-1 text-xs leading-relaxed">Nanti dipilih dulu sebelum dimasukkan ke yearbook.</p>
          </div>
        </div>
      )}

      <button
        type={sent ? "button" : "submit"}
        onClick={sent ? reset : undefined}
        disabled={busy}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-black transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-75"
        style={{ background: `linear-gradient(135deg, ${ACCENT}, #1d2a9e)`, color: "#ffffff", boxShadow: "0 16px 30px -16px rgba(43,63,216,.8)" }}
      >
        {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : sent ? <ImagePlus className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        {busy ? "Mengirim foto…" : sent ? "Kirim foto lain" : "Kirim foto momen"}
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed" style={{ color: INK_SOFT }}>
        Kirim foto milik sendiri dan minta izin teman yang ada di dalamnya.
      </p>
    </form>
  );
}
