import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown, Pause, Play, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import { YEARBOOK_PLAY_EVENT, formatTrackTime, yearbookThemeSong } from "@/lib/yearbook-interactive";

const NAVY = "rgba(20,28,63,.9)";
const GOLD_LINE = "rgba(242,190,80,.45)";
const CREAM = "#fff6dc";

type View = "hidden" | "card" | "disc";

/** Meminta pemutar musik yearbook memutar lagu tema dan membuka kartunya. */
export function playYearbookSong() {
  window.dispatchEvent(new Event(YEARBOOK_PLAY_EVENT));
}

function Vinyl({ size, playing }: { size: number; playing: boolean }) {
  return (
    <span
      aria-hidden
      className={`yb-vinyl yb-vinyl-spin relative block shrink-0 rounded-full ${playing ? "" : "yb-vinyl-paused"}`}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-serif font-black"
        style={{ width: size * 0.38, height: size * 0.38, background: "radial-gradient(circle,#ffe08a,#f2a007 70%,#c98a1c)", color: "#141c3f", fontSize: Math.max(8, size * 0.1) }}
      >
        {size >= 80 ? "2026" : ""}
        <span className="absolute h-1.5 w-1.5 rounded-full" style={{ background: "#0b0f22" }} />
      </span>
    </span>
  );
}

function Equalizer({ on }: { on: boolean }) {
  return <span aria-hidden className={`yb-eq ${on ? "" : "off"}`}><i /><i /><i /><i /></span>;
}

export function YearbookMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [view, setView] = useState<View>("hidden");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  async function play() {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    try { await audio.play(); }
    catch { setError("Lagu belum bisa diputar. Coba ketuk tombol putar sekali lagi."); }
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void play(); else audio.pause();
  }

  // Muncul sebagai pop up setelah gerbang pembuka selesai.
  useEffect(() => {
    const timer = window.setTimeout(() => setView((v) => (v === "hidden" ? "card" : v)), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onRequest() { setView("card"); void play(); }
    window.addEventListener(YEARBOOK_PLAY_EVENT, onRequest);
    return () => window.removeEventListener(YEARBOOK_PLAY_EVENT, onRequest);
  }, []);

  const percent = duration ? `${(time / duration) * 100}%` : "0%";

  return (
    <>
      <audio
        ref={audioRef}
        src={yearbookThemeSong.src}
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setError("File lagu tidak bisa dimuat.")}
      />

      {view === "card" && (
        <div
          role="dialog"
          aria-label={`Pemutar lagu ${yearbookThemeSong.title}`}
          className="yb-player-in fixed inset-x-3 bottom-3 z-50 overflow-hidden rounded-3xl border p-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[360px]"
          style={{ background: NAVY, borderColor: GOLD_LINE, color: CREAM, boxShadow: "0 30px 70px -20px rgba(0,0,0,.6), 0 0 40px -10px rgba(242,160,7,.45)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-40 blur-3xl" style={{ background: "#2b3fd8" }} />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ background: "#f2a007" }} />

          <div className="relative flex items-start justify-between gap-2">
            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: "#f5c55a" }}>
              <Equalizer on={playing} /> Lagu angkatan 2026
            </p>
            <div className="-mr-1 -mt-1 flex">
              <button type="button" onClick={() => setView("disc")} className="rounded-full p-2 transition-colors hover:bg-white/10" aria-label="Kecilkan pemutar"><ChevronDown className="h-4 w-4" /></button>
              <button type="button" onClick={() => { audioRef.current?.pause(); setView("disc"); }} className="rounded-full p-2 transition-colors hover:bg-white/10" aria-label="Hentikan lagu dan tutup"><X className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="relative mt-3 flex items-center gap-4">
            <div className="relative">
              <Vinyl size={92} playing={playing} />
              <span aria-hidden className="absolute -right-2 -top-1 h-12 w-1 origin-top rounded-full transition-transform duration-700" style={{ background: "linear-gradient(#ffe08a,#c98a1c)", transform: `rotate(${playing ? 28 : 8}deg)` }} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-3xl font-black leading-none">{yearbookThemeSong.title}</h3>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,246,220,.7)" }}>{yearbookThemeSong.artist}</p>
              <p className="mt-2 text-xs italic" style={{ color: "#f5c55a", fontFamily: '"Caveat", cursive', fontSize: 17 }}>untuk perjalanan kita ♡</p>
            </div>
          </div>

          <div className="relative mt-4">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(e) => { const a = audioRef.current; if (a) a.currentTime = Number(e.target.value); }}
              className="yb-range w-full"
              style={{ "--p": percent } as CSSProperties}
              aria-label="Posisi lagu"
              disabled={!duration}
            />
            <div className="mt-1 flex justify-between text-[11px] tabular-nums" style={{ color: "rgba(255,246,220,.6)" }}>
              <span>{formatTrackTime(time)}</span><span>{formatTrackTime(duration)}</span>
            </div>
          </div>

          <div className="relative mt-2 flex items-center justify-center gap-5">
            <button type="button" onClick={() => { const a = audioRef.current; if (a) a.currentTime = 0; }} className="rounded-full p-2.5 transition-colors hover:bg-white/10" aria-label="Ulang dari awal"><RotateCcw className="h-5 w-5" /></button>
            <button
              type="button"
              onClick={toggle}
              className="relative flex h-16 w-16 items-center justify-center rounded-full transition-transform active:scale-95"
              style={{ background: "linear-gradient(135deg,#ffe08a,#f2a007 60%,#c98a1c)", color: "#141c3f", boxShadow: "0 10px 30px -6px rgba(242,160,7,.8)" }}
              aria-label={playing ? "Jeda lagu" : "Putar lagu"}
            >
              {!playing && <span aria-hidden className="yb-pulse absolute inset-0 rounded-full" />}
              {playing ? <Pause className="h-7 w-7 fill-current" /> : <Play className="ml-1 h-7 w-7 fill-current" />}
            </button>
            <button type="button" onClick={() => { const a = audioRef.current; if (a) { a.muted = !a.muted; setMuted(a.muted); } }} className="rounded-full p-2.5 transition-colors hover:bg-white/10" aria-label={muted ? "Nyalakan suara" : "Matikan suara"}>
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
          {error && <p role="alert" className="relative mt-2 text-center text-xs" style={{ color: "#ffb4a8" }}>{error}</p>}
        </div>
      )}

      {view === "disc" && (
        <button
          type="button"
          onClick={() => setView("card")}
          className="yb-player-in fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:right-6"
          style={{ background: NAVY, borderColor: GOLD_LINE, color: CREAM }}
          aria-label={`Buka pemutar lagu ${yearbookThemeSong.title}`}
        >
          <Vinyl size={44} playing={playing} />
          <span className="text-left leading-tight">
            <span className="block text-sm font-black">{yearbookThemeSong.title}</span>
            <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#f5c55a" }}><Equalizer on={playing} /> {playing ? "Sedang diputar" : "Putar lagu"}</span>
          </span>
        </button>
      )}
    </>
  );
}
