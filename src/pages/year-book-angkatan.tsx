// Year book angkatan sebagai satu web buku tahunan layar penuh: tanpa menu situs,
// hanya tombol kembali. Semua isi diambil dari src/data/year-book.ts.
import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { YearbookPhotoUpload } from "@/components/yearbook-photo-upload";
import { YearbookMusicPlayer } from "@/components/yearbook-music-player";
import { YearbookSoundtrack, YearbookFarewellVideo, YearbookTimeCapsule } from "@/components/yearbook-memories";
import { YearbookVoting, YearbookDreamMap, YearbookMemoryCards, YearbookFriendQuiz } from "@/components/yearbook-personal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { filterGraduates } from "@/lib/yearbook-interactive";
import { Link } from "@/lib/wouter";
import { ArrowLeft, ArrowUp, Award, ChevronDown, GraduationCap, Instagram, Send, Shuffle } from "lucide-react";
import {
  chapters,
  graduates,
  graduateInstagramUrl,
  kelasList,
  kelasInfo,
  kepalaSekolah,
  moments,
  superlatives,
  teacherMessages,
  WALL_DEFAULT_NAME,
  WALL_NAME_MAX,
  WALL_TEXT_MAX,
  buatPesanDinding,
  pesanLucuIde,
  wallNotes,
  yearBookMeta,
  type Kelas,
  type WallNote,
} from "@/data/year-book";
import {
  GoldDust,
  Reveal,
  spotlightHandler,
  tiltHandlers,
  useActiveSection,
  useCountUp,
  useInView,
  useScrollFade,
  useScrollProgress,
  useStagger,
} from "@/lib/yearbook-motion";

const SERIF = '"Playfair Display", Georgia, serif';
const HAND = '"Caveat", "Segoe Script", cursive';
const PAPER = "#f4f6ff";
const CARD = "#ffffff";
const NAVY = "#141c3f";
const INK = "#141c3f";
const INK_SOFT = "#565f88";
const LINE = "#dbe1f6";
const ACCENT = "#2b3fd8";
const BRASS = "#f2a007";
const CREAM = "#fff6dc";

const serif: CSSProperties = { fontFamily: SERIF };
const hand: CSSProperties = { fontFamily: HAND };
const byId = (id: string) => graduates.find((g) => g.id === id);
const kelasCandid: Record<Kelas, number> = { "XII IPA 1": 2, "XII IPA 2": 4, "XII IPS 1": 7 };
const NOTE_COLORS = ["#fff1b8", "#ffd9e4", "#dce4ff", "#d8f5e3", "#ffe3c4", "#ece0ff"];
const INK_COLORS = ["#2b3fd8", "#c0265b", "#0d9488", "#7c4ddb"];
const NAV_BG = "radial-gradient(120% 90% at 30% 18%, #2a3878 0%, #141c3f 52%, #0a1030 100%)";

function Eyebrow({ children, color = ACCENT }: { children: ReactNode; color?: string }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.28em] sm:text-sm" style={{ color }}>
      {children}
    </p>
  );
}

function Heading({ children, className = "", color = INK, foil = false }: { children: ReactNode; className?: string; color?: string; foil?: boolean }) {
  const { ref, inView } = useInView<HTMLHeadingElement>();
  return (
    <h2 ref={ref} className={`yb-mask text-4xl font-black leading-[0.98] tracking-[-0.03em] sm:text-6xl${inView ? " on" : ""} ${className}`} style={{ ...serif, color }}>
      <span className={foil ? "yb-foil" : ""}>{children}</span>
    </h2>
  );
}

function Tape({ className = "", rotate = -4 }: { className?: string; rotate?: number }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-5 w-20 sm:h-6 sm:w-24 ${className}`}
      style={{ background: "rgba(242,160,7,.34)", border: "1px solid rgba(242,160,7,.4)", transform: `rotate(${rotate}deg)` }}
    />
  );
}

function Polaroid({ src, caption, rotate, imgClass = "aspect-[4/3]", className = "" }: { src: string; caption: string; rotate: number; imgClass?: string; className?: string }) {
  return (
    <figure
      className={`yb-lift relative bg-white p-2.5 pb-2 sm:p-3.5 sm:pb-3 ${className}`}
      style={{ "--r": `${rotate}deg`, boxShadow: "0 18px 40px -22px rgba(20,28,63,.55)" } as CSSProperties}
    >
      <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={rotate * -1.5} />
      <div className={`overflow-hidden ${imgClass}`}>
        <img src={src} alt={caption} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-2 break-words px-1 pb-1 text-center text-xl leading-[1.15] sm:text-2xl" style={{ ...hand, color: INK }}>
        {caption}
      </figcaption>
    </figure>
  );
}

/* ───────────── Pembuka (gerbang emas) ───────────── */

const DOOR_BG = "linear-gradient(160deg, #22306e 0%, #141c3f 55%, #0a1030 100%)";

function Intro() {
  return (
    <div aria-hidden className="yb-intro pointer-events-none fixed inset-0 z-[70]">
      <div className="yb-door yb-door-l absolute inset-y-0 left-0 w-1/2" style={{ background: DOOR_BG, boxShadow: "inset -1px 0 0 rgba(242,190,80,.7)" }}>
        <span className="absolute inset-y-5 left-5 right-0 border-y-2 border-l-2 sm:inset-y-8 sm:left-8" style={{ borderColor: "rgba(242,190,80,.55)" }} />
        <span className="absolute inset-y-8 left-8 right-0 border-y border-l sm:inset-y-12 sm:left-12" style={{ borderColor: "rgba(242,190,80,.25)" }} />
      </div>
      <div className="yb-door yb-door-r absolute inset-y-0 right-0 w-1/2" style={{ background: DOOR_BG, boxShadow: "inset 1px 0 0 rgba(242,190,80,.7)" }}>
        <span className="absolute inset-y-5 left-0 right-5 border-y-2 border-r-2 sm:inset-y-8 sm:right-8" style={{ borderColor: "rgba(242,190,80,.55)" }} />
        <span className="absolute inset-y-8 left-0 right-8 border-y border-r sm:inset-y-12 sm:right-12" style={{ borderColor: "rgba(242,190,80,.25)" }} />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="yb-seal grid h-40 w-40 place-items-center rounded-full text-center sm:h-48 sm:w-48" style={{ background: "radial-gradient(circle at 35% 30%, #2a3878, #0f1638)", boxShadow: "0 0 0 2px #f2be50, 0 0 0 8px rgba(20,28,63,.9), 0 0 0 9px rgba(242,190,80,.45), 0 30px 80px -20px rgba(0,0,0,.8)" }}>
          <div className="flex flex-col items-center">
            <GraduationCap className="h-9 w-9 sm:h-11 sm:w-11" style={{ color: "#f5c55a" }} strokeWidth={1.5} />
            <span className="yb-foil mt-1 text-3xl font-black sm:text-4xl" style={serif}>
              {yearBookMeta.angkatan}
            </span>
            <span className="mt-1 text-[9px] font-black uppercase tracking-[0.3em] sm:text-[10px]" style={{ color: "rgba(245,197,90,.85)" }}>
              Year Book
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Sampul ───────────── */

function Cover() {
  const fadeRef = useScrollFade<HTMLDivElement>();
  const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
  return (
    <section
      id="sampul"
      onPointerMove={spotlightHandler}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      style={{ background: NAV_BG, color: CREAM }}
    >
      <div aria-hidden className="yb-aurora pointer-events-none absolute -left-[30%] -top-[25%] h-[75vmax] w-[75vmax] rounded-full" style={{ background: "radial-gradient(circle, rgba(43,63,216,.55), rgba(43,63,216,0) 62%)" }} />
      <div aria-hidden className="yb-aurora b pointer-events-none absolute -bottom-[30%] -right-[25%] h-[70vmax] w-[70vmax] rounded-full" style={{ background: "radial-gradient(circle, rgba(242,160,7,.22), rgba(242,160,7,0) 60%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(520px circle at var(--sx,50%) var(--sy,42%), rgba(245,197,90,.16), rgba(245,197,90,0) 62%)" }} />
      <GoldDust count={30} seed={11} />

      <div aria-hidden className="yb-frame pointer-events-none absolute inset-4 sm:inset-8">
        <i />
        <i />
        <i />
        <i />
        <b className="-left-[4px] -top-[4px]" />
        <b className="-right-[4px] -top-[4px]" />
        <b className="-bottom-[4px] -right-[4px]" />
        <b className="-bottom-[4px] -left-[4px]" />
      </div>
      <div aria-hidden className="yb-enter pointer-events-none absolute inset-6 rounded-xl border sm:inset-11" style={{ ...d(2.2), borderColor: "rgba(242,190,80,.24)" }} />

      <div ref={fadeRef} className="relative z-10 flex flex-col items-center will-change-transform">
        <span className="yb-enter grid h-20 w-20 place-items-center rounded-full border-2 sm:h-24 sm:w-24 [@media(max-height:720px)]:hidden" style={{ ...d(1.35), borderColor: "rgba(242,190,80,.85)", boxShadow: "0 0 40px -6px rgba(242,160,7,.55)" }}>
          <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12" style={{ color: "#f5c55a" }} strokeWidth={1.6} />
        </span>
        <p className="yb-enter mt-6 text-xs font-black uppercase tracking-[0.42em] sm:text-sm" style={{ ...d(1.5), color: "rgba(245,197,90,.9)" }}>
          {yearBookMeta.sekolah}
        </p>
        <h1 className="yb-foil yb-track-in mt-4 whitespace-nowrap text-[clamp(4.2rem,min(15vw,21svh),12rem)] font-black leading-[0.84] tracking-[-0.045em]" style={{ ...serif, ...d(1.55) }}>
          Year Book
        </h1>
        <div className="yb-enter mt-5 flex items-center gap-4" style={d(1.95)}>
          <span className="h-px w-12 sm:w-20" style={{ background: "linear-gradient(90deg, rgba(245,197,90,0), rgba(245,197,90,.8))" }} />
          <span className="yb-foil text-4xl font-black sm:text-5xl" style={serif}>
            {yearBookMeta.angkatan}
          </span>
          <span className="h-px w-12 sm:w-20" style={{ background: "linear-gradient(90deg, rgba(245,197,90,.8), rgba(245,197,90,0))" }} />
        </div>
        <p className="yb-enter mt-4 text-4xl leading-none sm:text-5xl" style={{ ...hand, ...d(2.1) }}>
          “{yearBookMeta.julukanAngkatan}”
        </p>
        <p className="yb-enter mx-auto mt-6 max-w-md text-sm leading-relaxed sm:text-base [@media(max-height:720px)]:hidden" style={{ ...d(2.25), color: "rgba(255,246,220,.72)" }}>
          {yearBookMeta.tagline}
        </p>
        <p className="yb-enter mt-3 text-[11px] font-bold uppercase tracking-[0.3em] sm:text-xs" style={{ ...d(2.35), color: "rgba(255,246,220,.5)" }}>
          Angkatan {yearBookMeta.tahunMasuk} — {yearBookMeta.tahunLulus}
        </p>
      </div>

      <div className="yb-enter absolute bottom-10 z-10 sm:bottom-14 [@media(max-height:720px)]:bottom-7" style={d(2.7)}>
        <a href="#sambutan" className="yb-bob flex flex-col items-center gap-1 text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: "rgba(245,197,90,.9)" }}>
          Buka buku
          <ChevronDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

/* ───────────── Sambutan ───────────── */

function Sambutan() {
  const { ref: photoRef, inView: photoOn } = useInView<HTMLDivElement>(0.1);
  const { ref: signRef, inView: signOn } = useInView<HTMLParagraphElement>(0.3);
  const { ref: textRef, className: textClass } = useStagger<HTMLDivElement>(0.05);
  return (
    <section id="sambutan" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: PAPER }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <Reveal className="relative mx-auto w-full max-w-sm" x={-30} y={20}>
          <div aria-hidden className="absolute -inset-4 hidden rounded-sm border sm:block" style={{ borderColor: "rgba(242,160,7,.45)", transform: "rotate(2deg)" }} />
          <div className="relative bg-white p-3 pb-4 sm:p-4" style={{ transform: "rotate(-2.5deg)", boxShadow: "0 30px 60px -30px rgba(20,28,63,.55)" }}>
            <Tape className="-top-3 left-10" rotate={-6} />
            <div ref={photoRef} className="overflow-hidden">
              <div className={`yb-wipe${photoOn ? " on" : ""}`}>
                <img src={kepalaSekolah.foto} alt={kepalaSekolah.nama} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </div>
            </div>
            <p className="mt-3 text-center text-2xl leading-none" style={{ ...hand, color: INK }}>
              {kepalaSekolah.nama}
            </p>
          </div>
        </Reveal>
        <div>
          <Reveal y={16}>
            <Eyebrow>Sambutan kepala sekolah</Eyebrow>
          </Reveal>
          <Heading className="mt-3">Untuk angkatan {yearBookMeta.angkatan}</Heading>
          <div ref={textRef} className={`relative mt-8 space-y-5 text-base leading-[1.8] sm:text-lg ${textClass}`} style={{ color: INK }}>
            {kepalaSekolah.sambutan.map((p, i) => (
              <p key={p.slice(0, 24)} style={{ animationDelay: `${150 + i * 140}ms` }}>
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <p ref={signRef} className={`yb-write-once inline-block text-5xl leading-none${signOn ? " on" : ""}`} style={{ ...hand, color: ACCENT }}>
              Siti Marlina
            </p>
            <span className="mt-2 block h-px w-48" style={{ background: `linear-gradient(90deg, ${BRASS}, ${LINE})` }} />
            <p className="mt-2 text-xs font-black uppercase tracking-[0.18em]" style={{ color: INK_SOFT }}>
              {kepalaSekolah.jabatan} · {yearBookMeta.sekolah}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Foto angkatan ───────────── */

function Stat({ n, l, delay }: { n: number; l: string; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const shown = useCountUp(n, inView, 1100);
  return (
    <div
      ref={ref}
      data-reveal
      className="rounded-2xl border px-5 py-5 text-center"
      style={{
        background: "rgba(255,255,255,.06)",
        borderColor: "rgba(255,246,220,.16)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : "translate3d(0,22px,0)",
        transition: `opacity .7s ease ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <p className="text-4xl font-black leading-none sm:text-5xl" style={{ ...serif, color: "#ffd166" }}>
        {shown}
      </p>
      <p className="mt-2 text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: "rgba(255,246,220,.75)" }}>
        {l}
      </p>
    </div>
  );
}

function Angkatan() {
  const group = moments.find((m) => m.featured) ?? moments[0];
  const stats = [
    { n: graduates.length, l: "Lulusan" },
    { n: kelasInfo.length, l: "Kelas" },
    { n: yearBookMeta.tahunLulus - yearBookMeta.tahunMasuk, l: "Tahun bareng" },
    { n: moments.length, l: "Momen" },
  ];
  const { ref: photoRef, inView: photoOn } = useInView<HTMLDivElement>(0.1);
  return (
    <section id="angkatan" className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-24" style={{ background: NAV_BG }}>
      <GoldDust count={18} seed={3} />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center" y={24}>
          <p className="text-3xl leading-none sm:text-4xl" style={{ ...hand, color: "#ffd166" }}>
            foto bareng satu angkatan ♡
          </p>
          <h2 className="mt-3 text-[clamp(2.6rem,8vw,5.5rem)] font-black leading-[0.95] tracking-[-0.03em]" style={{ ...serif, color: CREAM }}>
            Angkatan {yearBookMeta.angkatan}
          </h2>
          <p className="mt-2 text-xl italic sm:text-2xl" style={{ ...serif, color: "rgba(255,246,220,.8)" }}>
            “{yearBookMeta.julukanAngkatan}” · {yearBookMeta.sekolah}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-5xl sm:mt-14" y={44} delay={120}>
          <figure className="relative">
          <div className="rounded-[6px] p-2 sm:p-3.5" style={{ background: CARD, boxShadow: "0 40px 80px -30px rgba(0,0,0,.65)" }}>
            <div ref={photoRef} className="overflow-hidden rounded-[3px]">
              <div className={`yb-wipe overflow-hidden${photoOn ? " on" : ""}`}>
                <img src={group.src} alt={group.caption} loading="lazy" width={1600} height={907} className="yb-kb block h-auto w-full" />
              </div>
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-1 pb-0.5 pt-2.5 sm:px-2 sm:pt-3.5">
              <span className="text-xl leading-none sm:text-3xl" style={{ ...hand, color: INK }}>
                {yearBookMeta.sekolah}, {yearBookMeta.tahunLulus}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] sm:text-xs" style={{ color: INK_SOFT }}>
                {yearBookMeta.tahunMasuk}–{yearBookMeta.tahunLulus}
              </span>
            </figcaption>
          </div>
          </figure>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
          {stats.map((s, i) => (
            <Stat key={s.l} n={s.n} l={s.l} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Perjalanan ───────────── */

function Perjalanan() {
  const { ref, inView } = useInView<HTMLOListElement>(0.08);
  return (
    <section id="perjalanan" className="px-5 pb-20 pt-20 sm:px-10 sm:pb-28 sm:pt-28" style={{ background: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center" y={22}>
          <Eyebrow>Linimasa</Eyebrow>
          <Heading className="mt-3">Perjalanan kita</Heading>
        </Reveal>
        <ol ref={ref} className={`relative mt-14 grid gap-10 pl-12 lg:grid-cols-4 lg:gap-6 lg:pl-0 lg:pt-14 yb-stagger${inView ? " on" : ""}`}>
          <span aria-hidden className={`yb-line yb-keep absolute bottom-2 left-[18px] top-2 w-1 rounded-full lg:bottom-auto lg:left-0 lg:right-0 lg:top-[22px] lg:h-1 lg:w-auto${inView ? " on" : ""}`} style={{ background: "linear-gradient(90deg, #2b3fd8, #f2a007)" }} />
          {chapters.map((c, i) => (
            <li key={c.number} className="relative" style={{ animationDelay: `${i * 150}ms` }}>
              <span
                aria-hidden
                className={`absolute -left-12 top-0 grid h-10 w-10 place-items-center rounded-full text-sm font-black lg:-top-14 lg:left-0${inView ? " yb-pulse" : ""}`}
                style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 0 6px ${PAPER}` }}
              >
                {c.number}
              </span>
              <div className="rounded-2xl border p-6" style={{ background: CARD, borderColor: LINE }}>
                <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: BRASS }}>
                  {c.date}
                </p>
                <h3 className="mt-2 text-2xl font-bold leading-tight" style={{ ...serif, color: INK }}>
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: INK_SOFT }}>
                  {c.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────── Per kelas ───────────── */

function KelasSection({ kelas, index, query = "" }: { kelas: Kelas; index: number; query?: string }) {
  const info = kelasInfo.find((k) => k.kelas === kelas)!;
  const wali = teacherMessages.find((t) => t.kelas === kelas)!;
  const members = filterGraduates(graduates, query, kelas);
  const candid = moments[kelasCandid[kelas]];
  const { ref: headRef, inView: headOn } = useInView<HTMLDivElement>(0.08);
  const { ref: gridRef, className: gridClass } = useStagger<HTMLDivElement>(0.06);
  const { ref: candidRef, inView: candidOn } = useInView<HTMLDivElement>(0.1);
  if (members.length === 0) return null;
  return (
    <section id={`kelas-${index + 1}`} className="relative overflow-hidden px-5 py-20 sm:px-10 sm:py-28" style={{ background: index % 2 === 0 ? CARD : PAPER }}>
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.08]" style={{ background: info.warna }} />
      <div className="relative mx-auto max-w-6xl">
        <div
          ref={headRef}
          data-reveal
          className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          style={{
            opacity: headOn ? 1 : 0,
            transform: headOn ? "translate3d(0,0,0)" : "translate3d(0,30px,0)",
            transition: "opacity .7s ease, transform .8s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full text-base font-black" style={{ ...serif, background: info.warna, color: "#fff", boxShadow: `0 0 0 2px #fff, 0 0 0 3.5px ${BRASS}` }}>
                {["I", "II", "III", "IV", "V"][index] ?? index + 1}
              </span>
              <Eyebrow color={info.warna}>{info.julukan}</Eyebrow>
            </div>
            <p className={`yb-mask mt-4 text-[clamp(3.6rem,10vw,7rem)] font-black leading-[0.86] tracking-[-0.045em]${headOn ? " on" : ""}`} style={{ ...serif, color: info.warna }}>
              <span>{kelas}</span>
            </p>
            <p className="mt-4 text-3xl leading-tight sm:text-4xl" style={{ ...hand, color: INK }}>
              “{info.motto}”
            </p>
          </div>
          <div ref={candidRef} className="relative overflow-hidden rounded-3xl" style={{ boxShadow: "0 30px 60px -36px rgba(20,28,63,.6)" }}>
            <div className={`yb-wipe relative${candidOn ? " on" : ""}`}>
            <img src={candid.src} alt={candid.caption} loading="lazy" className="aspect-[16/9] w-full object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-black" style={{ background: "rgba(255,255,255,.92)", color: INK }}>
              {candid.caption}
            </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-3xl border p-5 sm:flex-row sm:items-center sm:gap-7 sm:p-7" style={{ borderColor: LINE, background: index % 2 === 0 ? PAPER : CARD }}>
          <img src={wali.foto} alt={wali.nama} loading="lazy" className="h-24 w-24 shrink-0 rounded-2xl object-cover object-top sm:h-28 sm:w-28" style={{ boxShadow: `0 0 0 4px #fff, 0 0 0 6px ${info.warna}` }} />
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: INK_SOFT }}>
              Pesan wali kelas · {wali.nama}
            </p>
            <p className="mt-2 text-2xl leading-snug sm:text-3xl" style={{ ...hand, color: INK }}>
              “{wali.pesan}”
            </p>
          </div>
        </div>

        <div ref={gridRef} className={`mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 ${gridClass}`}>
          {members.map((g, i) => (
            <article key={g.id} className="yb-card yb-rise flex flex-col" style={{ animationDelay: `${i * 70}ms`, "--i": i } as CSSProperties}>
              <div
                {...tiltHandlers(9)}
                className="yb-tilt yb-sheen relative overflow-hidden rounded-2xl"
                style={{ boxShadow: `0 0 0 5px #fff, 0 0 0 7px ${LINE}, 0 24px 40px -28px rgba(20,28,63,.6)`, "--r": `${i % 2 === 0 ? -1.2 : 1.2}deg` } as CSSProperties}
              >
                <span aria-hidden className="yb-glare z-10" />
                <img src={g.foto} alt={g.nama} loading="lazy" className="aspect-[4/5] w-full object-cover object-[50%_22%]" />
                <span className="absolute left-2.5 top-2.5 max-w-[calc(100%-20px)] truncate rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] sm:text-[11px]" style={{ background: g.warna, color: "#fff" }}>
                  {g.julukan}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-black leading-tight sm:text-2xl" style={{ ...serif, color: INK }}>
                {g.nama}
              </h3>
              <a
                href={graduateInstagramUrl(g.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${g.nama}`}
                className="mt-1 inline-flex min-h-11 items-center gap-1.5 self-start text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-sm"
              >
                <Instagram aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                <span className="min-w-0 break-all">@{g.instagram}</span>
              </a>
              <p className="mt-1.5 text-xl leading-[1.12] sm:text-2xl" style={{ ...hand, color: INK_SOFT }}>
                “{g.quote}”
              </p>
              <div className="mt-auto space-y-0.5 pt-3 text-xs font-bold sm:text-sm" style={{ color: INK_SOFT }}>
                <p>
                  <span style={{ color: g.warna }}>Cita-cita:</span> {g.citaCita}
                </p>
                <p>
                  <span style={{ color: g.warna }}>Hobi:</span> {g.hobi}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Paling-paling ───────────── */

function Penghargaan() {
  const { ref, className } = useStagger<HTMLDivElement>(0.08);
  return (
    <section id="paling-paling" className="relative overflow-hidden px-5 py-20 sm:px-10 sm:py-28" style={{ background: NAV_BG, color: CREAM }}>
      <GoldDust count={22} seed={5} />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center" y={24}>
          <Eyebrow color={BRASS}>Hasil voting angkatan</Eyebrow>
          <Heading className="mt-3" color="inherit" foil>
            Paling-paling
          </Heading>
          <p className="mx-auto mt-4 max-w-md text-sm sm:text-base" style={{ color: "rgba(255,246,220,.7)" }}>
            Gelar yang dipilih sendiri oleh teman satu angkatan.
          </p>
        </Reveal>
        <div className={`mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 ${className}`} ref={ref}>
          {superlatives.map((s, i) => {
            const g = byId(s.graduateId)!;
            return (
              <div key={s.gelar} className="yb-card yb-rise yb-glow flex flex-col items-center rounded-3xl border px-4 py-7 text-center sm:px-6 sm:py-9" style={{ borderColor: "rgba(242,190,80,.3)", background: "rgba(255,255,255,.05)", animationDelay: `${i * 90}ms` }}>
                <div className="relative">
                  <div className="yb-ring-gold" style={{ boxShadow: "0 0 34px -6px rgba(242,160,7,.6)" }}>
                    <img src={g.foto} alt={g.nama} loading="lazy" className="h-24 w-24 rounded-full object-cover object-top sm:h-32 sm:w-32" style={{ boxShadow: `0 0 0 3px ${NAVY}` }} />
                  </div>
                  <span className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full sm:h-10 sm:w-10" style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 0 3px ${NAVY}` }}>
                    <Award className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-5 text-lg font-bold italic leading-tight sm:text-2xl" style={serif}>
                  {s.gelar}
                </p>
                <p className="mt-2 text-[11px] font-black uppercase tracking-[0.16em] sm:text-xs" style={{ color: BRASS }}>
                  {g.nama}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Galeri ───────────── */

function Galeri() {
  const picks = moments.filter((m) => !m.featured);
  const rot = [-2.5, 2, 1.4, -1.8, -2.2, 2.6, -1.2, 1.8];
  const shape = ["aspect-[4/3]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[4/3]", "aspect-[4/5]", "aspect-square"];
  const { ref, className } = useStagger<HTMLDivElement>(0.05);
  return (
    <section id="galeri" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4" y={22}>
          <div>
            <Eyebrow>Galeri</Eyebrow>
            <p className="mt-2 text-6xl leading-none sm:text-7xl" style={{ ...hand, color: ACCENT }}>
              momen-momen kita
            </p>
          </div>
          <p className="text-3xl leading-none" style={{ ...hand, color: BRASS }}>
            kangen nggak?
          </p>
        </Reveal>
        <YearbookPhotoUpload />
        <div ref={ref} className={`mt-14 columns-2 gap-5 sm:gap-8 lg:columns-4 ${className}`}>
          {picks.map((m, i) => (
            <div key={m.caption} className="yb-drop mb-8 break-inside-avoid sm:mb-10" style={{ animationDelay: `${i * 80}ms` }}>
              <Polaroid src={m.src} caption={m.caption} rotate={rot[i % rot.length]} imgClass={shape[i % shape.length]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Dinding pesan ───────────── */

type PostedNote = WallNote & { id: number; color: number };

function KirimPesan({ onKirim }: { onKirim: (note: WallNote, color: number) => void }) {
  const [nama, setNama] = useState("");
  const [teks, setTeks] = useState("");
  const [color, setColor] = useState(0);
  const [error, setError] = useState("");
  const [ide, setIde] = useState(0);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = buatPesanDinding(nama, teks);
    if (!res.ok) return setError(res.error);
    onKirim(res.note, color);
    setTeks("");
    setError("");
  };

  const kasihIde = () => {
    setTeks(pesanLucuIde[ide % pesanLucuIde.length]);
    setIde((i) => i + 1);
    setError("");
  };

  return (
    <Reveal className="mx-auto mt-12 max-w-2xl" y={24}>
      <form
        onSubmit={submit}
        className="relative rounded-[28px] border-2 p-5 sm:p-7"
        style={{ borderColor: "rgba(242,160,7,.45)", background: `linear-gradient(160deg, ${CREAM} 0%, #ffffff 70%)`, boxShadow: "0 30px 60px -36px rgba(20,28,63,.55)" }}
      >
        <p className="text-center text-3xl leading-none sm:text-4xl" style={{ ...hand, color: ACCENT }}>
          Tinggalkan pesan lucu buat angkatan!
        </p>
        <div className="mt-5 grid gap-3">
          <label className="grid gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: INK_SOFT }}>Nama kamu</span>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              maxLength={WALL_NAME_MAX}
              placeholder={`Kosongkan jadi "${WALL_DEFAULT_NAME}"`}
              className="h-11 rounded-xl border bg-white px-4 text-base outline-none transition-shadow focus:ring-2"
              style={{ borderColor: LINE, color: INK, "--tw-ring-color": "rgba(43,63,216,.35)" } as CSSProperties}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: INK_SOFT }}>
              Pesan
              <span style={{ color: teks.length > WALL_TEXT_MAX - 20 ? "#c0265b" : INK_SOFT }}>{teks.length}/{WALL_TEXT_MAX}</span>
            </span>
            <textarea
              value={teks}
              onChange={(e) => { setTeks(e.target.value); if (error) setError(""); }}
              maxLength={WALL_TEXT_MAX}
              rows={3}
              aria-label="Pesan"
              placeholder="Utang gorengan belum lunas, kutagih pas reuni!"
              className="resize-none rounded-xl border bg-white px-4 py-3 text-2xl leading-tight outline-none transition-shadow focus:ring-2"
              style={{ ...hand, borderColor: LINE, color: INK, "--tw-ring-color": "rgba(43,63,216,.35)" } as CSSProperties}
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Warna kertas">
          <span className="mr-1 text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: INK_SOFT }}>Warna kertas</span>
          {NOTE_COLORS.map((c, i) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={color === i}
              aria-label={`Warna kertas ${i + 1}`}
              onClick={() => setColor(i)}
              className="h-7 w-7 rounded-full border-2 transition-transform hover:scale-110"
              style={{ background: c, borderColor: color === i ? ACCENT : "rgba(20,28,63,.12)", transform: color === i ? "scale(1.15)" : undefined }}
            />
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm font-bold" style={{ color: "#c0265b" }}>{error}</p>
        )}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={kasihIde}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 px-5 text-sm font-black transition-colors hover:bg-white"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            <Shuffle className="h-4 w-4" />
            Kasih ide lucu
          </button>
          <button
            type="submit"
            className="yb-sheen relative inline-flex h-12 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-black transition-transform hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, #1d2a9e)`, color: "#ffffff", boxShadow: "0 16px 30px -16px rgba(43,63,216,.8)" }}
          >
            <Send className="h-4 w-4" />
            Tempel di dinding
          </button>
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed" style={{ color: INK_SOFT }}>
          Ini pratinjau: pesanmu hanya tampil di layar ini dan hilang saat halaman dimuat ulang.
        </p>
      </form>
    </Reveal>
  );
}

function Dinding() {
  const { ref: notesRef, className: notesClass } = useStagger<HTMLDivElement>(0.06);
  const { ref: signRef, className: signClass } = useStagger<HTMLDivElement>(0.15);
  const [posted, setPosted] = useState<PostedNote[]>([]);
  const notes = [
    ...posted.map((n) => ({ ...n, key: `m-${n.id}`, mine: true })),
    ...wallNotes.map((n, i) => ({ ...n, key: n.dari, color: i % NOTE_COLORS.length, mine: false })),
  ];
  const kirim = (note: WallNote, color: number) => {
    setPosted((p) => [{ ...note, color, id: Date.now() }, ...p]);
    requestAnimationFrame(() => notesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <section id="dinding" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: CARD }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center" y={22}>
          <Eyebrow>Dinding pesan</Eyebrow>
          <Heading className="mt-3">Tanda tangan & pesan</Heading>
        </Reveal>
        <KirimPesan onKirim={kirim} />
        <div ref={notesRef} className={`mt-14 grid scroll-mt-24 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 ${notesClass}`}>
          {notes.map((n, i) => (
            <div
              key={n.key}
              className="yb-lift yb-swing relative px-6 pb-5 pt-7"
              style={{ "--r": `${i % 2 === 0 ? -2 : 1.8}deg`, background: NOTE_COLORS[n.color], boxShadow: "0 18px 34px -22px rgba(20,28,63,.5)", animationDelay: n.mine ? "0ms" : `${i * 80}ms` } as CSSProperties}
            >
              <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full" style={{ background: INK_COLORS[i % INK_COLORS.length] }} />
              {n.mine && (
                <span className="absolute right-3 top-2 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em]" style={{ background: "rgba(255,255,255,.7)", color: ACCENT }}>
                  Baru
                </span>
              )}
              <p className="break-words text-3xl leading-[1.08]" style={{ ...hand, color: INK }}>
                {n.teks}
              </p>
              <p className="mt-3 text-right text-xs font-black uppercase tracking-[0.14em]" style={{ color: INK_COLORS[i % INK_COLORS.length] }}>
                — {n.dari}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-3xl border border-dashed px-6 py-10 text-center" style={{ borderColor: LINE }}>
          <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: INK_SOFT }}>
            Tanda tangan teman-teman
          </p>
          <div ref={signRef} className={`mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 ${signClass}`}>
            {graduates.map((g, i) => (
              <span key={g.id} className="yb-write text-4xl leading-none sm:text-5xl" style={{ ...hand, color: INK_COLORS[i % INK_COLORS.length], transform: `rotate(${(i % 3) * 3 - 3}deg)`, animationDelay: `${i * 45}ms` }}>
                {g.nama.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Penutup ───────────── */

const CAPS = [
  { l: "6%", t: "12%", s: 34, rot: -18, d: 0, o: 0.6 },
  { l: "17%", t: "32%", s: 22, rot: 14, d: 0.12, o: 0.45 },
  { l: "82%", t: "10%", s: 40, rot: 16, d: 0.06, o: 0.65 },
  { l: "89%", t: "36%", s: 24, rot: -12, d: 0.2, o: 0.45 },
  { l: "30%", t: "7%", s: 26, rot: 8, d: 0.28, o: 0.5 },
  { l: "64%", t: "18%", s: 28, rot: -8, d: 0.16, o: 0.5 },
  { l: "10%", t: "76%", s: 26, rot: 10, d: 0.34, o: 0.45 },
  { l: "84%", t: "78%", s: 32, rot: -16, d: 0.24, o: 0.55 },
];

function Penutup() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <section id="penutup" className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center" style={{ background: "radial-gradient(120% 90% at 70% 82%, #2a3878 0%, #141c3f 52%, #0a1030 100%)", color: CREAM }}>
      <div aria-hidden className="pointer-events-none absolute inset-4 rounded-2xl border-2 sm:inset-8" style={{ borderColor: "rgba(242,190,80,.5)" }} />
      <GoldDust count={28} seed={19} />
      <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0${inView ? " on" : ""}`}>
        {CAPS.map((c) => (
          <GraduationCap
            key={c.l + c.t}
            className="yb-cap"
            strokeWidth={1.5}
            style={{ left: c.l, top: c.t, width: c.s, height: c.s, color: "#f5c55a", "--rot": `${c.rot}deg`, "--d": `${c.d}s`, "--o": c.o } as CSSProperties}
          />
        ))}
      </div>
      <Reveal className="relative z-10 flex flex-col items-center" y={28}>
        <span aria-hidden className="flex items-center gap-3">
          <span className="h-px w-16 sm:w-24" style={{ background: "rgba(242,190,80,.55)" }} />
          <span className="h-2.5 w-2.5 rotate-45" style={{ background: "#f5c55a" }} />
          <span className="h-px w-16 sm:w-24" style={{ background: "rgba(242,190,80,.55)" }} />
        </span>
        <p className="yb-foil mt-6 max-w-3xl text-[clamp(2.6rem,7vw,5.5rem)] font-black leading-[1.02] tracking-[-0.03em]" style={serif}>
          Sampai jumpa di cerita berikutnya.
        </p>
        <p className="mt-6 text-3xl leading-tight sm:text-4xl" style={hand}>
          Jangan lupa pulang, ya — sekolah ini selalu rumah.
        </p>
        <a href="#sampul" className="mt-10 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-black transition-colors hover:bg-white/10" style={{ borderColor: "rgba(242,190,80,.6)", color: "#f5c55a" }}>
          <ArrowUp className="h-4 w-4" />
          Baca dari awal
        </a>
        <p className="mt-12 max-w-md text-xs leading-relaxed" style={{ color: "rgba(255,246,220,.5)" }}>
          Year book Angkatan {yearBookMeta.angkatan} · {yearBookMeta.sekolah} · Garut.
        </p>
      </Reveal>
    </section>
  );
}

const CHAPTERS = [
  { id: "sampul", label: "Sampul" },
  { id: "sambutan", label: "Sambutan" },
  { id: "angkatan", label: "Angkatan" },
  { id: "perjalanan", label: "Perjalanan" },
  { id: "cari-teman", label: "Cari teman" },
  ...kelasInfo.map((k, i) => ({ id: `kelas-${i + 1}`, label: k.kelas })),
  { id: "paling-paling", label: "Paling-paling" },
  { id: "galeri", label: "Galeri" },
  { id: "dinding", label: "Pesan" },
  { id: "playlist", label: "Playlist" },
  { id: "video-perpisahan", label: "Video" },
  { id: "kapsul-waktu", label: "Kapsul waktu" },
  { id: "voting", label: "Voting" },
  { id: "peta-mimpi", label: "Peta mimpi" },
  { id: "kartu-kenangan", label: "Kartu kenangan" },
  { id: "tebak-teman", label: "Tebak teman" },
  { id: "penutup", label: "Penutup" },
];
const CHAPTER_IDS = CHAPTERS.map((c) => c.id);

function ChapterNav() {
  const active = useActiveSection(CHAPTER_IDS);
  return (
    <nav aria-label="Bab year book" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col items-center gap-3 rounded-full px-2.5 py-4" style={{ background: "rgba(20,28,63,.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(242,190,80,.28)" }}>
        {CHAPTERS.map((c) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <a href={`#${c.id}`} className="group relative flex items-center justify-center" aria-label={c.label} aria-current={on ? "true" : undefined}>
                <span className="pointer-events-none absolute right-full top-1/2 mr-4 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" style={{ background: NAVY, color: "#f5c55a", border: "1px solid rgba(242,190,80,.35)" }}>
                  {c.label}
                </span>
                <span
                  className="block w-2 rounded-full transition-all duration-500"
                  style={{ height: on ? 26 : 8, background: on ? "linear-gradient(180deg,#ffe08a,#f2a007)" : "rgba(255,246,220,.45)", boxShadow: on ? "0 0 12px rgba(242,160,7,.75)" : "none" }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function YearBookAngkatanPage() {
  const progress = useScrollProgress();
  const [studentQuery, setStudentQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("semua");
  const matchingStudents = filterGraduates(graduates, studentQuery, selectedClass);
  return (
    <Layout minimalChrome hideBottomNav>
      <SEO
        title={`Year Book Angkatan ${yearBookMeta.angkatan} — ${yearBookMeta.sekolah}`}
        description="Web buku tahunan sekolah dari Nempo: sambutan kepala sekolah, profil tiap lulusan, halaman per kelas, paling-paling, galeri momen, dan dinding pesan."
        path={yearBookMeta.halamanBuku}
      />
      <style>{`
        html { scroll-behavior: smooth; }
        .yb-foil { background: linear-gradient(100deg, #f7d27a 0%, #fff3c8 28%, #e2a93b 52%, #fbe3a0 74%, #d4952c 100%); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: yb-shine 7s ease-in-out infinite; }
        @keyframes yb-shine { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .yb-lift { transform: rotate(var(--r, 0deg)); transition: transform .35s ease; }
        .yb-lift:hover { transform: rotate(0deg) translateY(-6px) scale(1.02); }
        .yb-card { transition: transform .35s ease; }
        .yb-card:hover { transform: translateY(-6px); }
        @keyframes yb-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .yb-bob { animation: yb-bob 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .yb-bob { animation: none; } .yb-lift, .yb-card { transition: none; } .yb-foil { animation: none; } }
      `}</style>

      <div className="-mb-20 lg:mb-0" style={{ background: PAPER, color: INK }}>
        <div
          aria-hidden
          className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left"
          style={{ transform: `scaleX(${progress})`, background: "linear-gradient(90deg, #2b3fd8, #f2a007, #ffe08a)", boxShadow: "0 0 10px rgba(242,160,7,.6)" }}
        />
        <Link
          href="/year-book"
          className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black backdrop-blur-md transition-transform hover:-translate-x-0.5 sm:left-6 sm:top-6"
          style={{ background: "rgba(20,28,63,.72)", borderColor: "rgba(242,190,80,.5)", color: CREAM }}
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        <Intro />
        <ChapterNav />
        <YearbookMusicPlayer />
        <Cover />
        <Sambutan />
        <Angkatan />
        <Perjalanan />
        <section id="cari-teman" className="yb-memories px-5 pb-10 pt-16 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-4xl font-bold">Temukan teman ceritamu</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="student-search" className="mb-2 block text-sm font-bold">Cari nama atau IG</label><Input id="student-search" type="search" placeholder="Nama, julukan, atau Instagram" value={studentQuery} onChange={(event) => setStudentQuery(event.target.value)} /></div>
              <div><label htmlFor="student-class" className="mb-2 block text-sm font-bold">Kelas</label><select id="student-class" className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground" value={selectedClass} onChange={(event) => setSelectedClass(event.target.value)}><option value="semua">Semua kelas</option>{kelasList.map((kelas) => <option key={kelas} value={kelas}>{kelas}</option>)}</select></div>
            </div>
            <p role="status" className="mt-4 text-sm text-muted-foreground">{matchingStudents.length} teman ditemukan</p>
            {matchingStudents.length === 0 && <div className="mt-5"><p>Belum ada teman yang cocok.</p><Button variant="outline" className="mt-3" onClick={() => { setStudentQuery(""); setSelectedClass("semua"); }}>Tampilkan semua teman</Button></div>}
          </div>
        </section>
        {kelasInfo.map((k, i) => selectedClass === "semua" || selectedClass === k.kelas ? (
          <KelasSection key={k.kelas} kelas={k.kelas} index={i} query={studentQuery} />
        ) : null)}
        <Penghargaan />
        <Galeri />
        <Dinding />
        <YearbookSoundtrack />
        <YearbookFarewellVideo />
        <YearbookTimeCapsule />
        <YearbookVoting />
        <YearbookDreamMap />
        <YearbookMemoryCards />
        <YearbookFriendQuiz />
        <Penutup />
      </div>
    </Layout>
  );
}
