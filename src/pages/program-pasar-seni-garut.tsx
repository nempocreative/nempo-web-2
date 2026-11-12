import { Suspense, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { CalendarDays, ChevronLeft, KeyRound, Loader2, Lock, MapPin, Presentation, Users } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { cariProgram } from "@/data/program";
import { bukaProposalProgram } from "@/lib/program-access.functions";

const PasarSeniDeck = lazyWithRetry(() => import("@/program/pasar-seni-garut/deck"));
const SLUG = "pasar-seni-garut";
const KUNCI_SESI = "nempo-program-terbuka:" + SLUG;

export default function ProgramPasarSeniPage() {
  const program = cariProgram(SLUG)!;
  const [terbuka, setTerbuka] = useState(false);
  const [kode, setKode] = useState("");
  const [memeriksa, setMemeriksa] = useState(false);
  const [galat, setGalat] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KUNCI_SESI) === "1") setTerbuka(true);
    } catch {
      /* private mode: ask again */
    }
  }, []);

  const kirim = async (e: FormEvent) => {
    e.preventDefault();
    if (!kode.trim()) {
      setGalat("Masukkan kata sandinya dulu.");
      return;
    }
    setMemeriksa(true);
    setGalat("");
    try {
      const hasil = await bukaProposalProgram({ data: { program: SLUG, kode } });
      if (hasil.ok) {
        try {
          sessionStorage.setItem(KUNCI_SESI, "1");
        } catch {
          /* ignore */
        }
        setTerbuka(true);
        setKode("");
      } else {
        setGalat("Kata sandi salah. Coba lagi.");
      }
    } catch {
      setGalat("Tidak bisa memeriksa kata sandi. Periksa koneksi lalu coba lagi.");
    } finally {
      setMemeriksa(false);
    }
  };

  const kunci = () => {
    try {
      sessionStorage.removeItem(KUNCI_SESI);
    } catch {
      /* ignore */
    }
    if (document.fullscreenElement) void document.exitFullscreen();
    setTerbuka(false);
  };

  return (
    <Layout minimalChrome hideBottomNav>
      <SEO
        title={program.judul}
        description="Proposal kolaborasi Pasar Seni Garut 2027 — Nempo Garut × ESSE. Dibuka dengan kata sandi."
        path="/program/pasar-seni-garut"
        image={program.sampul}
        noIndex
      />
      {terbuka ? (
        <PasarSeniDeckLoader onKunci={kunci} />
      ) : (
        <div className="psg-deck relative -mb-20 min-h-[100dvh] overflow-hidden lg:mb-0">
          <img src={program.sampul} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-psg-bg/70 via-psg-bg/85 to-psg-bg" />
          <div className="relative mx-auto flex min-h-[100dvh] max-w-5xl flex-col px-5 py-6 sm:px-8">
            <Link href="/program" className="inline-flex w-fit items-center gap-1 rounded-full border border-psg-accent/30 px-3 py-2 text-xs font-semibold text-psg-text/80">
              <ChevronLeft className="h-4 w-4" /> Program
            </Link>
            <div className="grid flex-1 items-center gap-10 py-10 md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-psg-accent">{program.mitra}</p>
                <h1 className="mt-3 font-psg-display text-4xl font-black leading-tight text-psg-text sm:text-5xl">{program.judul}</h1>
                <p className="mt-2 font-psg-display text-lg italic text-psg-accent/90">{program.tagline}</p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-psg-text/75 sm:text-base">{program.ringkas}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-psg-text/65">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-psg-accent" /> {program.tahun}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-psg-accent" /> {program.lokasi}</span>
                  <span className="inline-flex items-center gap-1.5"><Presentation className="h-4 w-4 text-psg-accent" /> {program.jumlahSlide} slide</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-psg-accent" /> Proposal kolaborasi</span>
                </div>
              </div>
              <form onSubmit={kirim} className="rounded-2xl border border-psg-accent/25 bg-psg-bg/80 p-6 shadow-2xl backdrop-blur">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-psg-accent/15 text-psg-accent">
                  <Lock className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-psg-display text-2xl font-bold text-psg-text">Proposal terkunci</h2>
                <p className="mt-1 text-sm leading-6 text-psg-text/65">Masukkan kata sandi dari tim Nempo untuk membuka presentasinya.</p>
                <label htmlFor="psg-kode" className="mt-5 block text-xs font-semibold uppercase tracking-[0.18em] text-psg-text/60">Kata sandi</label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-psg-accent/30 bg-psg-bg px-3 focus-within:border-psg-accent">
                  <KeyRound className="h-4 w-4 text-psg-accent/70" />
                  <input
                    id="psg-kode"
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={40}
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    className="h-12 w-full bg-transparent text-lg tracking-[0.3em] text-psg-text outline-none placeholder:tracking-normal placeholder:text-psg-text/30"
                    placeholder="••••••"
                    aria-invalid={!!galat}
                    aria-describedby={galat ? "psg-galat" : undefined}
                  />
                </div>
                {galat && <p id="psg-galat" role="alert" className="mt-2 text-sm text-psg-accent">{galat}</p>}
                <button type="submit" disabled={memeriksa} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-psg-accent font-bold text-psg-bg transition hover:brightness-110 disabled:opacity-60">
                  {memeriksa ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                  {memeriksa ? "Memeriksa…" : "Buka proposal"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function PasarSeniDeckLoader({ onKunci }: { onKunci: () => void }) {
  return (
    <SuspenseDeck>
      <PasarSeniDeck onKunci={onKunci} />
    </SuspenseDeck>
  );
}

function SuspenseDeck({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="psg-deck grid min-h-[100dvh] place-items-center text-sm text-psg-text/60">Membuka proposal…</div>}>
      {children}
    </Suspense>
  );
}
