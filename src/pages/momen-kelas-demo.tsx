// Momen Digital — contoh kategori Kelas: satu halaman kenangan untuk satu kelas,
// layar penuh tanpa menu situs, hanya tombol kembali. Isi dari src/data/momen-kelas.ts.
import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/lib/wouter";
import { ArrowLeft, ArrowUp, Instagram, Send } from "lucide-react";
import {
  kegiatanKelas,
  kelasMeta,
  momenKelas,
  pesanKelas,
  siswaKelas,
  strukturKelas,
  waliKelas,
} from "@/data/momen-kelas";
import {
  WALL_DEFAULT_NAME,
  WALL_NAME_MAX,
  WALL_TEXT_MAX,
  buatPesanDinding,
  graduateInstagramUrl,
  pesanLucuIde,
  type WallNote,
} from "@/data/year-book";
import { Reveal, useStagger } from "@/lib/yearbook-motion";

const SERIF = '"Playfair Display", Georgia, serif';
const HAND = '"Caveat", "Segoe Script", cursive';
const PAPER = "#f4f6ff";
const CARD = "#ffffff";
const INK = "#141c3f";
const INK_SOFT = "#565f88";
const LINE = "#dbe1f6";
const ACCENT = "#2b3fd8";
const BRASS = "#f2a007";
const NOTE_COLORS = ["#fff1b8", "#ffd9e4", "#dce4ff", "#d8f5e3", "#ffe3c4", "#ece0ff"];

const serif: CSSProperties = { fontFamily: SERIF };
const hand: CSSProperties = { fontFamily: HAND };

function Eyebrow({ children, color = ACCENT }: { children: ReactNode; color?: string }) {
  return (
    <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color }}>
      {children}
    </p>
  );
}

function BackButton() {
  return (
    <Link
      href="/year-book"
      className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black shadow-lg transition-transform hover:-translate-y-0.5"
      style={{ background: INK, color: PAPER }}
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Momen Digital
    </Link>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-10 sm:pt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, #f2a007 0%, transparent 44%), radial-gradient(circle at 88% 64%, #2b3fd8 0%, transparent 46%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal y={18}>
          <Eyebrow>Momen Digital · Kelas</Eyebrow>
          <h1 className="mt-4 text-[64px] font-black leading-[0.86] tracking-[-0.045em] sm:text-[110px]" style={serif}>
            {kelasMeta.nama}
          </h1>
          <p className="mt-3 text-2xl font-semibold italic sm:text-3xl" style={{ ...serif, color: INK_SOFT }}>
            {kelasMeta.julukan} · {kelasMeta.sekolah}
          </p>
        </Reveal>
        <Reveal delay={160} y={22}>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 sm:text-base" style={{ color: INK_SOFT }}>
            {kelasMeta.tagline}
          </p>
          <p className="mt-5 text-3xl sm:text-4xl" style={{ ...hand, color: ACCENT }}>
            “{kelasMeta.motto}”
          </p>
          <p className="mt-4 text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: INK_SOFT }}>
            Tahun ajaran {kelasMeta.tahunAjaran} · {siswaKelas.length} siswa
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WaliKelasSection() {
  if (!waliKelas) return null;
  return (
    <section className="border-y px-5 py-16 sm:px-10" style={{ borderColor: LINE, background: CARD }}>
      <div className="mx-auto grid max-w-5xl items-center gap-8 sm:grid-cols-[220px_1fr]">
        <Reveal y={24}>
          <img
            src={waliKelas.foto}
            alt={`Foto ${waliKelas.nama}`}
            className="mx-auto aspect-square w-44 rounded-3xl object-cover sm:w-full"
            style={{ border: `3px solid ${LINE}` }}
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120} y={24}>
          <Eyebrow>Wali kelas</Eyebrow>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl" style={serif}>
            {waliKelas.nama}
          </h2>
          <p className="mt-1 text-sm font-bold" style={{ color: ACCENT }}>{waliKelas.mapel}</p>
          <p className="mt-5 max-w-xl text-base leading-8" style={{ color: INK }}>
            “{waliKelas.pesan}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function StrukturSection() {
  const { ref, className } = useStagger<HTMLDivElement>(0.08);
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-10">
      <Reveal className="max-w-xl" y={20}>
        <Eyebrow>Pengurus kelas</Eyebrow>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl" style={serif}>
          Yang paling sering kena tugas.
        </h2>
      </Reveal>
      <div ref={ref} className={`mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
        {strukturKelas.map((s, i) => {
          const siswa = siswaKelas.find((g) => g.id === s.graduateId);
          if (!siswa) return null;
          return (
            <article
              key={s.jabatan}
              className="rounded-2xl p-5 text-center"
              style={{ background: CARD, border: `1px solid ${LINE}`, animationDelay: `${i * 80}ms` }}
            >
              <img
                src={siswa.foto}
                alt={`Foto ${siswa.nama}`}
                className="mx-auto h-20 w-20 rounded-full object-cover"
                style={{ border: `3px solid ${siswa.warna}` }}
                loading="lazy"
              />
              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: BRASS }}>
                {s.jabatan}
              </p>
              <h3 className="mt-1 text-lg font-bold" style={serif}>{siswa.nama}</h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SiswaSection() {
  const { ref, className } = useStagger<HTMLDivElement>(0.06);
  return (
    <section className="border-y px-5 py-16 sm:px-10" style={{ borderColor: LINE, background: CARD }}>
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-xl" y={20}>
          <Eyebrow>Penghuni kelas</Eyebrow>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl" style={serif}>
            Kami yang duduk di sini setiap hari.
          </h2>
        </Reveal>
        <div ref={ref} className={`mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
          {siswaKelas.map((s, i) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-2xl"
              style={{ background: PAPER, border: `1px solid ${LINE}`, animationDelay: `${i * 70}ms` }}
            >
              <img src={s.foto} alt={`Foto ${s.nama}`} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="text-lg font-bold" style={serif}>{s.nama}</h3>
                <p className="text-xs font-bold" style={{ color: s.warna }}>{s.julukan}</p>
                <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>“{s.quote}”</p>
                <a
                  href={graduateInstagramUrl(s.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-black"
                  style={{ color: ACCENT }}
                >
                  <Instagram className="h-3.5 w-3.5" />
                  @{s.instagram}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MomenSection() {
  const { ref, className } = useStagger<HTMLDivElement>(0.07);
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-10">
      <Reveal className="max-w-xl" y={20}>
        <Eyebrow>Galeri kelas</Eyebrow>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl" style={serif}>
          Momen yang tidak sempat difoto pun masih kami ingat.
        </h2>
      </Reveal>
      <div ref={ref} className={`mt-9 grid gap-4 sm:grid-cols-2 ${className}`}>
        {momenKelas.map((m, i) => (
          <figure
            key={m.caption}
            className="overflow-hidden rounded-2xl"
            style={{ background: CARD, border: `1px solid ${LINE}`, animationDelay: `${i * 80}ms` }}
          >
            <img src={m.src} alt={m.caption} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-sm font-bold" style={{ color: INK }}>{m.caption}</span>
              <span
                className="shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em]"
                style={{ background: "rgba(43,63,216,.1)", color: ACCENT }}
              >
                {m.tag}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function KegiatanSection() {
  return (
    <section className="border-y px-5 py-16 sm:px-10" style={{ borderColor: LINE, background: INK, color: PAPER }}>
      <div className="mx-auto max-w-3xl">
        <Reveal className="max-w-xl" y={20}>
          <Eyebrow color={BRASS}>Satu tahun bersama</Eyebrow>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl" style={serif}>
            Cerita kelas dari awal sampai akhir.
          </h2>
        </Reveal>
        <ol className="mt-10 space-y-8">
          {kegiatanKelas.map((k) => (
            <Reveal key={k.nomor} y={20}>
              <li className="grid gap-2 sm:grid-cols-[64px_1fr]">
                <p className="text-3xl font-black" style={{ ...serif, color: "rgba(242,160,7,.55)" }}>{k.nomor}</p>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: BRASS }}>{k.waktu}</p>
                  <h3 className="mt-1 text-xl font-bold" style={serif}>{k.judul}</h3>
                  <p className="mt-2 text-sm leading-7" style={{ color: "rgba(244,246,255,.72)" }}>{k.teks}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DindingPesanSection() {
  const [notes, setNotes] = useState<WallNote[]>(pesanKelas);
  const [nama, setNama] = useState("");
  const [teks, setTeks] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const hasil = buatPesanDinding(nama, teks);
    if (!hasil.ok) { setError(hasil.error); return; }
    setNotes((prev) => [hasil.note, ...prev]);
    setNama("");
    setTeks("");
    setError("");
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-10">
      <Reveal className="max-w-xl" y={20}>
        <Eyebrow>Dinding pesan</Eyebrow>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl" style={serif}>
          Tempel pesanmu di mading kelas.
        </h2>
      </Reveal>

      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal y={24}>
          <form onSubmit={submit} className="space-y-4 rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${LINE}` }}>
            <div>
              <label htmlFor="kelas-wall-nama" className="mb-2 block text-sm font-bold">Namamu</label>
              <Input
                id="kelas-wall-nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                maxLength={WALL_NAME_MAX}
                placeholder={WALL_DEFAULT_NAME}
              />
            </div>
            <div>
              <label htmlFor="kelas-wall-teks" className="mb-2 block text-sm font-bold">Pesan untuk kelas</label>
              <textarea
                id="kelas-wall-teks"
                value={teks}
                onChange={(e) => setTeks(e.target.value)}
                maxLength={WALL_TEXT_MAX}
                rows={4}
                placeholder={pesanLucuIde[0]}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              />
              <p className="mt-1 text-right text-xs" style={{ color: INK_SOFT }}>{teks.length}/{WALL_TEXT_MAX}</p>
            </div>
            {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}
            <Button type="submit" className="w-full">
              <Send className="h-4 w-4" /> Tempel pesan
            </Button>
            <p className="text-xs leading-5" style={{ color: INK_SOFT }}>
              Pesanmu hanya tampil di layar ini dan belum tersimpan — di halaman kelas aslinya, pesan bisa dibaca seluruh kelas.
            </p>
          </form>
        </Reveal>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          {notes.map((n, i) => (
            <Reveal key={`${n.dari}-${i}`} y={16}>
              <blockquote
                className="rounded-xl p-4 shadow-sm"
                style={{ background: NOTE_COLORS[i % NOTE_COLORS.length], transform: `rotate(${i % 2 === 0 ? -1.2 : 1.1}deg)` }}
              >
                <p className="text-lg leading-snug" style={{ ...hand, color: INK }}>{n.teks}</p>
                <footer className="mt-2 text-xs font-black uppercase tracking-[0.14em]" style={{ color: INK_SOFT }}>
                  — {n.dari}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Penutup() {
  return (
    <section className="px-5 pb-20 pt-4 text-center sm:px-10">
      <Reveal y={20}>
        <p className="text-3xl sm:text-4xl" style={{ ...hand, color: ACCENT }}>
          sampai jumpa di reuni pertama, {kelasMeta.nama}!
        </p>
        <Link
          href="/year-book"
          className="mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
          style={{ background: INK, color: PAPER }}
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Momen Digital
        </Link>
      </Reveal>
    </section>
  );
}

export default function MomenKelasDemoPage() {
  return (
    <Layout minimalChrome hideBottomNav>
      <SEO
        title={`Momen Digital Kelas ${kelasMeta.nama} — Contoh`}
        description={`Contoh halaman momen digital untuk satu kelas: ${kelasMeta.nama} ${kelasMeta.sekolah} — wali kelas, pengurus, galeri momen, dan dinding pesan.`}
        path={kelasMeta.halaman}
      />
      <BackButton />
      <main className="min-h-screen overflow-x-clip" style={{ background: PAPER, color: INK }}>
        <Hero />
        <WaliKelasSection />
        <StrukturSection />
        <SiswaSection />
        <MomenSection />
        <KegiatanSection />
        <DindingPesanSection />
        <Penutup />
      </main>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="fixed bottom-4 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
        style={{ background: ACCENT, color: PAPER }}
        aria-label="Kembali ke atas"
      >
        <ArrowUp className="h-4 w-4" />
      </a>
    </Layout>
  );
}
