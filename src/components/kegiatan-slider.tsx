import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type KegiatanPhoto = { src: string; caption: string; tag: string };

const INTERVAL = 3800;

/** Coverflow-style auto slider of crew-card styled activity photos. */
export function KegiatanSlider({ photos }: { photos: KegiatanPhoto[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = photos.length;

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % n), INTERVAL);
    return () => window.clearTimeout(id);
  }, [active, paused, n]);

  const go = (d: number) => setActive((a) => (a + d + n) % n);

  return (
    <div
      className="kg-slider relative mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        setPaused(false);
        if (start == null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="relative mx-auto h-[420px] w-full overflow-hidden sm:h-[500px]" style={{ perspective: "1400px" }}>
        {photos.map((p, i) => {
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const abs = Math.abs(off);
          const isActive = off === 0;
          return (
            <button
              key={p.caption}
              type="button"
              aria-label={p.caption}
              onClick={() => setActive(i)}
              className="absolute left-1/2 top-1/2 w-[230px] sm:w-[280px]"
              style={{
                transform: `translate(-50%, -50%) translateX(${off * 62}%) translateZ(${-abs * 160}px) rotateY(${off * -28}deg) scale(${isActive ? 1 : 0.86})`,
                zIndex: 10 - abs,
                opacity: abs > 2 ? 0 : 1 - abs * 0.22,
                filter: isActive ? "none" : "saturate(.7) brightness(.85)",
                transition: "transform .9s cubic-bezier(.22,1,.36,1), opacity .9s, filter .9s",
                pointerEvents: abs > 2 ? "none" : "auto",
              }}
            >
              <article
                className={`relative overflow-hidden rounded-[28px] bg-[#1d1236] p-2 text-left shadow-[0_24px_60px_rgba(55,33,91,.35)] ${isActive ? "kg-card-active" : ""}`}
              >
                {/* lanyard slot */}
                <div className="absolute left-1/2 top-3 z-20 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/70" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-[22px]">
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading={abs <= 1 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className={`h-full w-full object-cover transition-transform duration-[4000ms] ease-out ${isActive ? "scale-110" : "scale-100"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1236] via-[#1d1236]/20 to-transparent" />
                  <span className="absolute left-3 top-6 rounded-full bg-[#a62f78]/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {p.tag}
                  </span>
                  <span className="absolute right-3 top-6 text-[11px] font-black text-white/70">
                    {String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#f4b6d8]">Kala Muda · Kegiatan</p>
                    <h3 className="mt-1 text-lg font-black leading-tight text-white">{p.caption}</h3>
                  </div>
                </div>
                {/* card footer like a crew pass */}
                <div className="flex items-center justify-between px-2 pb-1 pt-2.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white">Kala Muda</span>
                  <span className="flex gap-[2px]" aria-hidden>
                    {[3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2].map((w, k) => (
                      <span key={k} className="h-3.5 bg-white/60" style={{ width: w }} />
                    ))}
                  </span>
                </div>
                {isActive && <span aria-hidden className="kg-shine pointer-events-none absolute inset-0" />}
              </article>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" aria-label="Sebelumnya" onClick={() => go(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#37215b] shadow transition hover:bg-[#a62f78] hover:text-white">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {photos.map((p, i) => (
            <button
              key={p.caption}
              type="button"
              aria-label={`Foto ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${i === active ? "w-8 bg-[#a62f78]/25" : "w-1.5 bg-[#37215b]/20"}`}
            >
              {i === active && (
                <span
                  key={`${active}-${paused}`}
                  className="kg-progress absolute inset-y-0 left-0 rounded-full bg-[#a62f78]"
                  style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? "paused" : "running" }}
                />
              )}
            </button>
          ))}
        </div>
        <button type="button" aria-label="Berikutnya" onClick={() => go(1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#37215b] shadow transition hover:bg-[#a62f78] hover:text-white">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
