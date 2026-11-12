import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { BraceletSpinner } from "@/components/bracelet-spinner";
import { LanyardSpinner } from "@/components/lanyard-spinner";
import { NotebookSpinner } from "@/components/notebook-spinner";
import { TumblerSpinner } from "@/components/tumbler-spinner";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

import { spinState } from "@/lib/spin-frames";

// Foto putaran 360° rompi di manekin (tinggi & poros manekin sudah disejajarkan).
// Sudut foto aslinya tidak rata, jadi tiap foto yang dipakai dicatat sudut sebenarnya
// (urutan diperbaiki, foto kembar / bertepi putih / beda ukuran tidak dipakai).
const byName = (g: Record<string, string>) =>
  Object.keys(g)
    .sort()
    .map((k) => g[k] as string);
const lapanganFrames = byName(
  import.meta.glob<string>("/src/assets/rompi-spin-lapangan-*.webp", { eager: true, import: "default" }),
);
const nempoFrames = byName(
  import.meta.glob<string>("/src/assets/rompi-spin-nempo-*.webp", { eager: true, import: "default" }),
);
const pdhFrames = byName(
  import.meta.glob<string>("/src/assets/pdh-spin-*.webp", { eager: true, import: "default" }),
);
const kaosFrames = byName(
  import.meta.glob<string>("/src/assets/kaos-spin-*.webp", { eager: true, import: "default" }),
);
const pdhLongFrames = byName(
  import.meta.glob<string>("/src/assets/pdh-long-spin-*.webp", { eager: true, import: "default" }),
);

type Spin = { src: string; angle: number }[];
const pick = (all: string[], list: [number, number][]): Spin =>
  list.map(([i, angle]) => ({ src: all[i] as string, angle })).filter((f) => !!f.src);
const lapanganSpin = pick(lapanganFrames, [
  [0, 0], [2, 22], [3, 33], [4, 48], [5, 62], [6, 90], [8, 118], [7, 138], [9, 155], [11, 170], [12, 180],
  [13, 190], [15, 198], [14, 208], [16, 228], [17, 238], [18, 262], [19, 292], [21, 316], [22, 332], [23, 347],
]);
const nempoSpin = pick(nempoFrames, [
  [0, 0], [1, 18], [2, 30], [4, 48], [5, 62], [6, 90], [7, 115], [8, 130], [9, 148], [11, 165],
  [13, 195], [15, 207], [14, 218], [16, 236], [17, 248], [18, 270], [19, 298], [21, 322], [22, 338], [23, 350],
]);

const products: { name: string; frames?: Spin; bracelet?: boolean; lanyard?: boolean; notebook?: boolean; tumbler?: boolean; desc: string; features: string[] }[] = [
  {
    name: "Kaos Nempo × Kala Muda",
    frames: pick(kaosFrames, [[0, 0], [1, 25], [2, 50], [3, 90], [4, 135], [5, 155], [6, 180], [7, 225], [9, 270], [10, 315], [11, 340]]),
    desc: "Konsep kaos navy lengan pendek dengan identitas Nempo × Kala Muda dan aksen biru-ungu yang senada dengan koleksi komunitas.",
    features: ["Kerah bulat dengan potongan regular fit", "Logo Nempo dan Kala Muda di dada", "Wordmark Nempo besar dan Kala Muda di punggung", "Aksen biru-ungu di bahu dan ujung lengan"],
  },
  {
    name: "Kemeja PDH Nempo × Kala Muda",
    frames: pick(pdhFrames, [[0, 0], [1, 20], [2, 60], [3, 90], [4, 145], [5, 160], [6, 180], [7, 205], [8, 235], [9, 270], [10, 310], [11, 335]]),
    desc: "Konsep kemeja PDH navy lengan pendek untuk tim Nempo × Kala Muda, dengan aksen biru-ungu di bahu dan ujung lengan. Rapi untuk kegiatan komunitas maupun acara resmi.",
    features: ["Kerah runcing dan epolet bahu", "Dua saku dada dengan penutup", "Bordir Nempo dan Kala Muda di dada", "Identitas Nempo × Kala Muda di punggung"],
  },
  {
    name: "Kemeja PDH Lengan Panjang Nempo × Kala Muda",
    frames: pick(pdhLongFrames, [[0, 0], [1, 20], [2, 60], [3, 90], [4, 145], [5, 160], [6, 180], [7, 205], [8, 235], [9, 270], [10, 310], [11, 335]]),
    desc: "Konsep kemeja PDH navy lengan panjang dengan manset berkancing, senada dengan versi lengan pendek untuk tim Nempo × Kala Muda.",
    features: ["Lengan panjang dengan manset berkancing", "Kerah runcing, epolet dan dua saku dada", "Aksen biru-ungu di bahu dan manset", "Logo Nempo dan Kala Muda di dada serta punggung"],
  },
  {
    name: "Rompi Lapangan Nempo",
    frames: lapanganSpin,
    desc: "Rompi crew lapangan dengan webbing modular di depan, aksen gradasi biru-ungu Kala Muda dan strip reflektif. Semua alat penting di lapangan punya tempatnya sendiri.",
    features: [
      "Holster HT di dada + kantong HP",
      "Slot pulpen/spidol, gantungan lakban dan D-ring karabiner",
      "Kantong kargo besar + kantong botol jaring di samping",
      "Webbing modular di depan, punggung polos dengan logo besar",
      "Strip reflektif buat kerja malam",
    ],
  },
  {
    name: "Rompi Nempo",
    frames: nempoSpin,
    desc: "Rompi utility warna navy dengan aksen gradasi biru-ungu khas Kala Muda, logo nempo di dada dan lambang \"n\" besar di punggung, ditemani logo kecil KALA MUDA.",
    features: ["Kantong depan + saku ritsleting", "Strap samping bisa disesuaikan", "Lapisan dalam jaring, adem dipakai"],
  },
  {
    name: "Gelang Nempo × Kala Muda",
    bracelet: true,
    desc: "Konsep gelang silikon sporty navy, dengan band ramping dan dua garis biru-ungu yang senada dengan kemeja dan rompi komunitas.",
    features: ["Band ramping dengan tepi membulat", "Tulisan timbul Nempo dan Kala Muda di sisi luar", "Sisi dalam polos navy", "Dua garis biru-ungu di tepi gelang"],
  },
  {
    name: "Lanyard Nempo × Kala Muda",
    lanyard: true,
    desc: "Konsep lanyard navy dengan tulisan Nempo dan Kala Muda berulang di sepanjang tali, garis tepi biru-ungu, dan ID card crew di dalam holder bening.",
    features: ["Tali navy dengan tulisan di kedua sisi", "Garis tepi gradasi biru-ungu", "Kait besi putar dan ring untuk ID card", "ID card Crew Nempo × Kala Muda dengan lambang \"n\" di belakang"],
  },
  {
    name: "Buku Notes Nempo × Kala Muda",
    notebook: true,
    desc: "Konsep buku notes hardcover ukuran A5 bersampul navy bertekstur kain, dengan pita gradasi biru-ungu di sisi punggung buku yang senada dengan merchandise lainnya.",
    features: ["Hardcover A5 dengan sudut membulat", "Logo Nempo besar dan tulisan NOTES di sampul depan", "Karet penutup dan pita pembatas biru-ungu", "Lambang \"n\" dan akun @nempo.id · @kalamudacom di sampul belakang"],
  },
  {
    name: "Tumbler Nempo × Kala Muda",
    tumbler: true,
    desc: "Konsep tumbler stainless 600 ml berlapis navy doff, dengan gelombang gradasi biru-ungu melingkar di bagian bawah dan bibir gelas stainless mengilap.",
    features: ["Logo Nempo di depan, logo Kala Muda di belakang", "Gelombang gradasi biru-ungu melingkar", "Tutup dengan lubang minum dan pegangan besi lipat", "Lingkar tutup bergaris biru-ungu"],
  },
];

// Kecepatan tetap: satu putaran penuh dalam 4,5 detik.
const DEG_PER_SECOND = 80;
// Tanpa kemiringan: foto dimiringkan lalu kembali tiap pergantian sudut terlihat berdenyut.
const SWING = 0;
// Geser 1 px = 0,8° (±450 px untuk satu putaran penuh).
const DRAG_DEG_PER_PX = 0.8;
const angleLabel = (a: number) =>
  a < 10 || a > 350 ? "depan" : a > 170 && a < 190 ? "belakang" : a > 80 && a < 100 ? "samping" : `sudut ${a}°`;

function VestSpinner({ frames, name }: { frames: Spin; name: string }) {
  const [paused, setPaused] = useState(false);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const pos = useRef(0);
  const dragging = useRef<{ x: number; start: number; moved: boolean } | null>(null);

  useEffect(() => {
    const angles = frames.map((f) => f.angle);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let ready = false;
    let alive = true;
    const render = () => {
      // Hanya satu foto yang tampil, diam (tanpa miring), sampai sudut foto
      // berikutnya tercapai, lalu foto berikutnya menggantikan.
      const s = spinState(pos.current, angles, SWING);
      imgs.current.forEach((el, i) => {
        if (!el) return;
        const o = i === s.i ? "1" : "0";
        if (el.style.opacity !== o) el.style.opacity = o;
      });
    };
    const tick = (now: number) => {
      // Batasi lompatan waktu (mis. setelah pindah tab) supaya tidak meloncat.
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (ready && !paused && !reduce && !dragging.current) pos.current += dt * DEG_PER_SECOND;
      render();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    // Siapkan semua foto dulu supaya putaran pertama tidak tersendat.
    Promise.all(imgs.current.map((el) => el?.decode?.().catch(() => undefined))).then(() => {
      ready = true;
    });
    const scene = imgs.current[0]?.closest(".merch-scene");
    const io =
      scene && "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            visible = !!entry?.isIntersecting;
            if (visible) start();
          })
        : null;
    if (io && scene) io.observe(scene);
    start();
    return () => {
      alive = false;
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [frames, paused]);

  return (
    <div className="merch-scene relative flex flex-col items-center overflow-hidden px-6 pb-6 pt-10">
      <span aria-hidden className="merch-glow" />
      <Button
        variant="ghost"
        type="button"
        className="merch-stage"
        aria-label={paused ? `Putar lagi ${name}` : `Hentikan putaran ${name}`}
        onPointerDown={(e) => {
          dragging.current = { x: e.clientX, start: pos.current, moved: false };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const g = dragging.current;
          if (!g) return;
          const dx = e.clientX - g.x;
          if (Math.abs(dx) > 4) g.moved = true;
          pos.current = g.start - dx * DRAG_DEG_PER_PX;
        }}
        onPointerUp={() => {
          const g = dragging.current;
          dragging.current = null;
          if (g && !g.moved) setPaused((v) => !v);
        }}
        onPointerCancel={() => {
          dragging.current = null;
        }}
      >
        <div className={`merch-float ${paused ? "is-paused" : ""}`}>
          {frames.map(({ src, angle }, i) => (
            <img
              key={src}
              ref={(el) => {
                imgs.current[i] = el;
              }}
              src={src}
              alt={`${name} tampak ${angleLabel(angle)}`}
              decoding="async"
              draggable={false}
              className="merch-face"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>
        <span aria-hidden className="merch-shadow" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="merch-play bg-card text-foreground"
        aria-label={paused ? `Putar ${name}` : `Jeda putaran ${name}`}
        title={paused ? `Putar ${name}` : `Jeda putaran ${name}`}
        onClick={() => setPaused((v) => !v)}
      >
        {paused ? <Play /> : <Pause />}
      </Button>
    </div>
  );
}

export default function MerchandisePage() {
  return (
    <Layout>
      <SEO title="Merchandise Komunitas Kala Muda" noIndex />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <span className="inline-flex rounded-full border border-[#a62f78]/25 bg-[#fce7f3] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a62f78]">
          Merchandise Komunitas
        </span>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#182b39] sm:text-4xl">
          Merch resmi Kala Muda × Nempo
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#5f6b6f] sm:text-base">
          Pakai bareng anggota dan pendukung komunitas — di event, kegiatan, atau nongkrong sehari-hari.
        </p>

        {products.map((p) => (
        <article key={p.name} className="mt-8 overflow-hidden rounded-3xl border border-[#dce4fb] bg-white shadow-sm md:grid md:grid-cols-[1fr_1fr] md:items-stretch">
          {p.tumbler ? <TumblerSpinner /> : p.notebook ? <NotebookSpinner /> : p.lanyard ? <LanyardSpinner /> : p.bracelet ? <BraceletSpinner /> : p.frames ? <VestSpinner frames={p.frames} name={p.name} /> : null}
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <span className="w-fit rounded-full bg-[#182b39] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Tersedia</span>
            <h2 className="text-2xl font-black text-[#182b39]">{p.name}</h2>
            <p className="text-sm leading-6 text-[#5f6b6f]">{p.desc}</p>
            <ul className="space-y-1.5 text-sm text-[#182b39]">
              {p.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Link href="/komunitas" className="inline-flex justify-center rounded-full bg-[#a62f78] px-5 py-3 text-sm font-bold text-white hover:bg-[#862761]">
                Gabung Komunitas
              </Link>
            </div>
          </div>
        </article>
        ))}
      </section>
      <style>{`
        .merch-scene { position: relative; background: radial-gradient(120% 90% at 50% 20%, #2b2f8f 0%, #1a1c55 45%, #0f1030 100%); align-self: stretch; justify-content: center; }
        .merch-play { position: absolute; right: 20px; bottom: 20px; z-index: 2; }
        .merch-glow { position: absolute; top: 18%; left: 50%; width: 70%; aspect-ratio: 1; transform: translateX(-50%); border-radius: 50%; background: radial-gradient(circle, rgba(110,75,180,.55), rgba(37,99,235,.25) 45%, transparent 70%); filter: blur(10px); }
        .merch-stage { width: min(70vw, 300px); aspect-ratio: 3 / 4; position: relative; cursor: grab; background: none; border: 0; padding: 0; touch-action: pan-y; user-select: none; }
        .merch-stage:active { cursor: grabbing; }
        .merch-float { position: absolute; inset: 0; }
        .merch-face { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; pointer-events: none;  }
        .merch-shadow { position: absolute; left: 22%; right: 22%; bottom: 2%; height: 16px; border-radius: 50%; background: rgba(0,0,0,.55); filter: blur(8px); }
      `}</style>
    </Layout>
  );
}
