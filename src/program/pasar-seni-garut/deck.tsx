import { Suspense, useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { ChevronLeft, ChevronRight, Lock, Maximize2, Minimize2 } from "lucide-react";
import { Link } from "@/lib/wouter";
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { geserSlideProgram } from "@/data/program";
import manifest from "./manifest.json";

const modul = import.meta.glob<{ default: ComponentType }>("./slides/*.tsx");

const SLIDES = manifest.map((m) => {
  const muat = modul[`./slides/${m.file}.tsx`];
  if (!muat) throw new Error(`Slide ${m.file} tidak ditemukan`);
  return { ...m, muat, Component: lazyWithRetry(muat) };
});

const TOTAL = SLIDES.length;

export default function PasarSeniDeck({ onKunci }: { onKunci: () => void }) {
  const [index, setIndex] = useState(0);
  const [layarPenuh, setLayarPenuh] = useState(false);
  const [bisaLayarPenuh, setBisaLayarPenuh] = useState(false);
  const wadah = useRef<HTMLDivElement>(null);
  const sentuh = useRef<{ x: number; y: number } | null>(null);

  const geser = useCallback((arah: number) => setIndex((i) => geserSlideProgram(i, arah, TOTAL)), []);

  useEffect(() => {
    setBisaLayarPenuh(typeof document !== "undefined" && !!document.documentElement.requestFullscreen);
    const ubah = () => setLayarPenuh(document.fullscreenElement === wadah.current);
    document.addEventListener("fullscreenchange", ubah);
    return () => document.removeEventListener("fullscreenchange", ubah);
  }, []);

  useEffect(() => {
    const tekan = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("input,select,textarea")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        geser(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        geser(-1);
      } else if (e.key === "Home") setIndex(0);
      else if (e.key === "End") setIndex(TOTAL - 1);
    };
    window.addEventListener("keydown", tekan);
    return () => window.removeEventListener("keydown", tekan);
  }, [geser]);

  // Load the neighbouring slides in the background so the next tap is instant.
  useEffect(() => {
    SLIDES[index + 1]?.muat();
    SLIDES[index - 1]?.muat();
  }, [index]);

  const toggleLayarPenuh = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void wadah.current?.requestFullscreen?.();
  };

  const slide = SLIDES[index]!;
  const Slide = slide.Component;

  return (
    <div ref={wadah} className="psg-deck -mb-20 min-h-[100dvh] px-3 pb-4 pt-3 sm:px-6 lg:mb-0">
      <div className="psg-chrome mx-auto mb-3 flex max-w-[1600px] items-center gap-2 sm:gap-3">
        <Link href="/program" className="inline-flex items-center gap-1 rounded-full border border-psg-accent/30 px-3 py-2 text-xs font-semibold text-psg-text/80 hover:bg-psg-accent/10">
          <ChevronLeft className="h-4 w-4" /> Program
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate font-psg-display text-sm font-bold text-psg-accent sm:text-base">Pasar Seni Garut 2027</p>
          <p className="truncate text-[11px] text-psg-text/55">Nempo Garut × ESSE · Proposal kolaborasi</p>
        </div>
        {bisaLayarPenuh && (
          <button type="button" onClick={toggleLayarPenuh} className="inline-flex items-center gap-1.5 rounded-full border border-psg-accent/30 px-3 py-2 text-xs font-semibold text-psg-text/80 hover:bg-psg-accent/10">
            {layarPenuh ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="hidden sm:inline">Layar penuh</span>
          </button>
        )}
        <button type="button" onClick={onKunci} className="inline-flex items-center gap-1.5 rounded-full border border-psg-accent/30 px-3 py-2 text-xs font-semibold text-psg-text/80 hover:bg-psg-accent/10">
          <Lock className="h-4 w-4" /> <span className="hidden sm:inline">Kunci</span>
        </button>
      </div>

      <div
        className="psg-stage"
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) sentuh.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(e) => {
          const awal = sentuh.current;
          const t = e.changedTouches[0];
          sentuh.current = null;
          if (!awal || !t) return;
          const dx = t.clientX - awal.x;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(t.clientY - awal.y)) geser(dx < 0 ? 1 : -1);
        }}
        onDoubleClick={() => bisaLayarPenuh && toggleLayarPenuh()}
        role="region"
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1} dari ${TOTAL}: ${slide.judul}`}
      >
        <Suspense fallback={<div className="absolute inset-0 grid place-items-center bg-psg-bg text-sm text-psg-text/50">Memuat slide…</div>}>
          <div key={slide.file} className="absolute inset-0">
            <Slide />
          </div>
        </Suspense>
        {layarPenuh && (
          <>
            <button type="button" aria-label="Slide sebelumnya" onClick={() => geser(-1)} className="absolute inset-y-0 left-0 z-[60] w-[18%] cursor-w-resize" />
            <button type="button" aria-label="Slide berikutnya" onClick={() => geser(1)} className="absolute inset-y-0 right-0 z-[60] w-[18%] cursor-e-resize" />
          </>
        )}
      </div>

      <div className="psg-chrome mx-auto mt-3 flex max-w-[1600px] items-center gap-2 sm:gap-3">
        <button type="button" onClick={() => geser(-1)} disabled={index === 0} aria-label="Slide sebelumnya" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-psg-accent text-psg-bg transition disabled:opacity-30">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <label className="sr-only" htmlFor="psg-pilih-slide">Pilih slide</label>
        <select
          id="psg-pilih-slide"
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="h-11 min-w-0 flex-1 truncate rounded-full border border-psg-accent/30 bg-psg-bg px-4 text-sm text-psg-text"
        >
          {SLIDES.map((s, i) => (
            <option key={s.file} value={i}>
              {String(i + 1).padStart(2, "0")} · {s.judul}
            </option>
          ))}
        </select>
        <span className="hidden shrink-0 text-xs tabular-nums text-psg-text/55 sm:inline">
          {index + 1} / {TOTAL}
        </span>
        <button type="button" onClick={() => geser(1)} disabled={index === TOTAL - 1} aria-label="Slide berikutnya" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-psg-accent text-psg-bg transition disabled:opacity-30">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className="psg-chrome mt-2 text-center text-[11px] text-psg-text/40">Geser, ketuk panah, atau pakai tombol ← → di keyboard.</p>
    </div>
  );
}
