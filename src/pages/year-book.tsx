import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Camera,
  Flag,
  GraduationCap,
  Heart,
  MessageCircle,
  School,
  Users,
} from "lucide-react";
import {
  graduates,
  kelasList,
  moments,
  teacherMessages,
  wallNotes,
  yearBookBentuk,
  yearBookIsi,
  yearBookLangkah,
  yearBookMeta,
} from "@/data/year-book";
import { Reveal, useInView, useStagger } from "@/lib/yearbook-motion";

const SERIF = '"Playfair Display", Georgia, serif';
const HAND = '"Caveat", "Segoe Script", cursive';

const PAPER = "#f4f6ff";
const CARD = "#ffffff";
const INK = "#141c3f";
const INK_SOFT = "#565f88";
const LINE = "#dbe1f6";
const ACCENT = "#2b3fd8";
const BRASS = "#f2a007";

const stats = [
  { n: graduates.length, l: "Lulusan" },
  { n: kelasList.length, l: "Kelas" },
  { n: moments.length, l: "Momen" },
  { n: teacherMessages.length + wallNotes.length, l: "Pesan" },
];

const momenKategori = [
  {
    icon: GraduationCap,
    nama: "Year Book",
    ringkas: "Buku tahunan satu angkatan: profil lulusan, galeri momen, pesan guru, dan dinding pesan.",
    status: "Sudah bisa dilihat",
    href: yearBookMeta.halamanBuku,
  },
  {
    icon: School,
    nama: "Kelas",
    ringkas: "Versi kecil untuk satu kelas: wali kelas, daftar siswa, momen sehari-hari, dan pesan antarteman.",
    status: "Segera hadir",
  },
  {
    icon: Heart,
    nama: "Geng & Grup",
    ringkas: "Halaman kenangan satu circle: foto hangout, playlist bareng, dan pesan satu sama lain.",
    status: "Segera hadir",
  },
  {
    icon: Flag,
    nama: "Organisasi",
    ringkas: "Dokumentasi satu periode kepengurusan: pengurus, program kerja, dan pesan penutup pembina.",
    status: "Segera hadir",
  },
  {
    icon: CalendarDays,
    nama: "Event",
    ringkas: "After-movie digital satu acara: galeri foto terbaik, video dokumentasi, dan daftar panitia.",
    status: "Segera hadir",
  },
  {
    icon: Users,
    nama: "Komunitas",
    ringkas: "Rayakan anniversary atau momen besar komunitas: sejarah, anggota, dan capaian setahun.",
    status: "Segera hadir",
  },
];

export default function YearBookPage() {
  const { ref: kategoriRef, className: kategoriClass } = useStagger<HTMLDivElement>(0.06);
  const { ref: isiRef, className: isiClass } = useStagger<HTMLDivElement>(0.06);
  const { ref: langkahRef, className: langkahClass } = useStagger<HTMLOListElement>(0.12);
  const { ref: bentukRef, className: bentukClass } = useStagger<HTMLDivElement>(0.1);
  const { ref: ctaRef, inView: ctaOn } = useInView<HTMLDivElement>(0.08);
  return (
    <Layout>
      <SEO
        title="Momen Digital — Year Book, Kelas, Organisasi, Event"
        description="Momen digital dari Nempo: kenangan kelompok dan acara dalam satu halaman — year book angkatan, kelas, geng, organisasi, event, dan komunitas."
        keywords="momen digital, year book sekolah, buku tahunan sekolah, jasa yearbook, buku tahunan angkatan, yearbook digital, kenangan kelas, dokumentasi organisasi, after movie event"
        path="/year-book"
      />

      <style>{`
        .yb-serif { font-family: ${SERIF}; }
        .yb-hand { font-family: ${HAND}; }
        .yb-card { transition: transform 220ms ease, box-shadow 220ms ease; }
        .yb-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px -18px rgba(20,28,63,.45); }
      `}</style>

      <main className="min-h-screen overflow-x-clip" style={{ background: PAPER, color: INK }}>
        {/* ── HERO: PENJELASAN ── */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 14% 18%, #f2a007 0%, transparent 44%), radial-gradient(circle at 86% 62%, #2b3fd8 0%, transparent 46%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
            <Reveal y={18}>
              <p className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
                Layanan Nempo
              </p>
              <h1 className="yb-serif mt-3 text-[52px] font-black leading-[0.86] tracking-[-0.045em] sm:text-[84px] lg:text-[104px]">
                Momen Digital
              </h1>
              <p className="yb-serif mt-2 text-2xl font-semibold italic sm:text-3xl" style={{ color: INK_SOFT }}>
                kenangan kelompok dan acara dalam satu halaman
              </p>
            </Reveal>

            <Reveal delay={160} y={22}>
              <p className="mt-6 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: INK_SOFT }}>
                Momen digital adalah halaman khusus yang merangkum kenangan sebuah
                kelompok atau acara: foto, cerita, pesan, dan musik — dibagikan
                lewat satu tautan yang bisa dibuka siapa saja. Bentuknya bermacam-macam:
                year book angkatan, kelas, geng, organisasi, event, sampai komunitas.
                Nempo yang kumpulkan isinya, desain, lalu bagikan sebagai halaman digital.
              </p>
              <p className="yb-hand mt-4 text-2xl sm:text-3xl" style={{ color: ACCENT }}>
                pilih kategorinya, mulai dari year book
              </p>
            </Reveal>

            <Reveal delay={300} y={20}>
              <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={yearBookMeta.halamanBuku}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                style={{ background: ACCENT, color: PAPER }}
              >
                <BookOpen className="h-4 w-4" />
                Lihat yearbook angkatan
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={NEMPO_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                style={{ border: `1px solid ${LINE}`, background: CARD, color: INK }}
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi bareng Nempo
              </a>
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── KATEGORI MOMEN DIGITAL ── */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <Reveal className="max-w-xl" y={20}>
            <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
              Kategorinya
            </p>
            <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
              Satu konsep, banyak bentuk.
            </h2>
            <p className="mt-3 text-sm leading-6" style={{ color: INK_SOFT }}>
              Year book sudah bisa dilihat contohnya. Kategori lain menyusul —
              kalau kelompokmu butuh duluan, ceritakan saja ke Nempo.
            </p>
          </Reveal>

          <div ref={kategoriRef} className={`mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${kategoriClass}`}>
            {momenKategori.map((k, i) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <k.icon className="h-6 w-6" style={{ color: ACCENT }} />
                    <span
                      className="rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em]"
                      style={
                        k.href
                          ? { background: "rgba(43,63,216,.1)", color: ACCENT }
                          : { background: "rgba(242,160,7,.14)", color: "#a86e00" }
                      }
                    >
                      {k.status}
                    </span>
                  </div>
                  <h3 className="yb-serif mt-3 text-xl font-bold">{k.nama}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>
                    {k.ringkas}
                  </p>
                  {k.href && (
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-black" style={{ color: ACCENT }}>
                      Lihat contohnya
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </p>
                  )}
                </>
              );
              const style = { background: CARD, border: `1px solid ${LINE}`, animationDelay: `${i * 70}ms` };
              return k.href ? (
                <Link key={k.nama} href={k.href} className="yb-card group block rounded-2xl p-5" style={style}>
                  {inner}
                </Link>
              ) : (
                <article key={k.nama} className="yb-card rounded-2xl p-5" style={style}>
                  {inner}
                </article>
              );
            })}
          </div>
        </section>

        {/* ── KARTU BUKU (klik → halaman yearbook) ── */}
        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <Reveal y={34} className="mx-auto max-w-7xl">
          <Link
            href={yearBookMeta.halamanBuku}
            className="yb-card group mx-auto block max-w-7xl overflow-hidden rounded-3xl"
            style={{ background: INK, color: PAPER }}
          >
            <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"
                  style={{ background: "rgba(242,160,7,.22)", color: "#ffd166", border: "1px solid rgba(242,160,7,.45)" }}
                >
                  Isi buku
                </span>
                <p className="mt-5 text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: BRASS }}>
                  Buku Tahunan
                </p>
                <h2 className="yb-serif mt-2 text-4xl font-black leading-[0.9] tracking-[-0.03em] sm:text-6xl">
                  Year Book
                </h2>
                <p className="yb-serif mt-1 text-xl font-semibold italic sm:text-2xl" style={{ color: "rgba(244,246,255,.75)" }}>
                  Angkatan {yearBookMeta.angkatan} · {yearBookMeta.sekolah}
                </p>
                <p className="mt-4 max-w-md text-sm leading-7" style={{ color: "rgba(244,246,255,.68)" }}>
                  Profil lulusan, galeri momen, linimasa, pesan guru, dan dinding
                  pesan — satu angkatan, satu halaman yang bisa dibaca siapa saja.
                </p>
                <p
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black"
                  style={{ color: "#ffd166" }}
                >
                  Buka yearbook angkatan
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl px-4 py-5"
                    style={{ background: "rgba(244,246,255,.08)", border: "1px solid rgba(244,246,255,.18)" }}
                  >
                    <p className="yb-serif text-3xl font-black sm:text-4xl">{s.n}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "rgba(244,246,255,.58)" }}>
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
          </Reveal>
        </section>

        {/* ── ISI YEAR BOOK ── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Reveal className="max-w-xl" y={20}>
            <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
              Isinya
            </p>
            <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
              Apa saja yang masuk buku?
            </h2>
            <p className="mt-3 text-sm leading-6" style={{ color: INK_SOFT }}>
              Bagian-bagian di bawah ini bisa dikurangi atau ditambah sesuai
              kebutuhan angkatan.
            </p>
          </Reveal>

          <div ref={isiRef} className={`mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${isiClass}`}>
            {yearBookIsi.map((item, i) => (
              <article
                key={item.judul}
                className="yb-card rounded-2xl p-5"
                style={{ background: CARD, border: `1px solid ${LINE}`, animationDelay: `${i * 70}ms` }}
              >
                <p className="yb-serif text-2xl font-black" style={{ color: "rgba(43,63,216,.2)" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="yb-serif mt-1 text-xl font-bold">{item.judul}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>
                  {item.teks}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CARA PESAN ── */}
        <section className="border-y" style={{ borderColor: LINE, background: CARD }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Reveal className="max-w-xl" y={20}>
              <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
                Alurnya
              </p>
              <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                Empat langkah sampai buku sampai.
              </h2>
            </Reveal>

            <ol ref={langkahRef} className={`mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${langkahClass}`}>
              {yearBookLangkah.map((s, i) => (
                <li key={s.nomor} className="yb-card rounded-2xl p-5" style={{ background: PAPER, border: `1px solid ${LINE}`, animationDelay: `${i * 110}ms` }}>
                  <p className="yb-serif text-4xl font-black" style={{ color: "rgba(242,160,7,.32)" }}>
                    {s.nomor}
                  </p>
                  <h3 className="yb-serif mt-2 text-xl font-bold">{s.judul}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>
                    {s.teks}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CETAK ATAU DIGITAL ── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Reveal className="max-w-xl" y={20}>
            <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
              Bentuknya
            </p>
            <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
              Cetak, digital, atau dua-duanya.
            </h2>
          </Reveal>

          <div ref={bentukRef} className={`mt-9 grid gap-4 sm:grid-cols-2 ${bentukClass}`}>
            {yearBookBentuk.map((b, i) => (
              <article key={b.nama} className="yb-card rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${LINE}`, animationDelay: `${i * 120}ms` }}>
                <h3 className="yb-serif text-2xl font-black" style={{ color: ACCENT }}>
                  {b.nama}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>
                  {b.ringkas}
                </p>
                <ul className="mt-4 space-y-2">
                  {b.poin.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BRASS }} />
                      <span style={{ color: INK }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t" style={{ borderColor: LINE, background: INK, color: PAPER }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div
              ref={ctaRef}
              data-reveal
              className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
              style={{
                opacity: ctaOn ? 1 : 0,
                transform: ctaOn ? "translate3d(0,0,0)" : "translate3d(0,26px,0)",
                transition: "opacity .7s ease, transform .8s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <div className="max-w-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: BRASS }}>
                  Buat Year Book Sekolahmu
                </p>
                <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                  Punya angkatan yang mau dibukukan?
                </h2>
                <p className="mt-3 text-sm leading-7" style={{ color: "rgba(244,246,255,.68)" }}>
                  Ceritakan jumlah siswa dan kelasnya, sisanya Nempo yang urus —
                  dari kumpul data sampai buku siap dibagikan.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={NEMPO_CONSULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                    style={{ background: BRASS, color: INK }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Konsultasi bareng Nempo
                  </a>
                  <Link
                    href={yearBookMeta.halamanBuku}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                    style={{ border: "1px solid rgba(244,246,255,.32)", color: PAPER }}
                  >
                    <BookOpen className="h-4 w-4" />
                    Lihat yearbook angkatan
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid shrink-0 grid-cols-3 gap-3 lg:grid-cols-1">
                {[
                  { icon: GraduationCap, l: `${graduates.length} lulusan` },
                  { icon: Users, l: `${kelasList.length} kelas` },
                  { icon: Camera, l: `${moments.length} momen` },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: "rgba(244,246,255,.08)", border: "1px solid rgba(244,246,255,.18)" }}
                  >
                    <s.icon className="h-4 w-4" style={{ color: BRASS }} />
                    <span className="text-sm font-bold">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
