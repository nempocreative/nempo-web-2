// Draws one Instagram feed slide (1080 × 1350) for a greeting straight onto a canvas, so the
// preview and the downloaded PNG are the same pixels. Colors are literal because they are baked into the image.
import { FEED_HEIGHT as H, FEED_WIDTH as W, slideFeed } from '@/data/ucapan-feed';
import type { JenisUcapan, Ucapan } from '@/data/ucapan-spesial';
import { coverCrop, wrapLines } from './story-card';

const SANS = '"DM Sans", Arial, sans-serif';
const HAND = '"Caveat", "Segoe Script", cursive';

type Palet = { bg: [string, string]; glow: string; ink: string; muted: string; accent: string; accent2: string; paper: string; paperInk: string; line: string; display: string; displayWeight: string };
const PALET: Record<JenisUcapan, Palet> = {
  pacar: { bg: ['#FCF1F4', '#F6DCE4'], glow: 'rgba(214,52,94,0.18)', ink: '#3D1F2A', muted: '#7A5A66', accent: '#D6345E', accent2: '#F6C9B8', paper: '#FFFCF7', paperInk: '#3D1F2A', line: '#F3DDE3', display: '"Yellowtail", cursive', displayWeight: '400' },
  sahabat: { bg: ['#FFF7DA', '#FFE7A0'], glow: 'rgba(36,83,196,0.16)', ink: '#1A2547', muted: '#4D5876', accent: '#2453C4', accent2: '#F2694A', paper: '#FFFDF4', paperInk: '#1A2547', line: '#F5E7B8', display: '"Shrikhand", serif', displayWeight: '400' },
  wisuda: { bg: ['#121B33', '#1D2849'], glow: 'rgba(225,181,74,0.22)', ink: '#F5EEDC', muted: '#B5BCD3', accent: '#E1B54A', accent2: '#2B3963', paper: '#FAF6EC', paperInk: '#1A2340', line: '#EDE5D0', display: '"Playfair Display", Georgia, serif', displayWeight: '600' },
};

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function heart(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath(); ctx.moveTo(x, y + s * 0.35);
  ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.35);
  ctx.bezierCurveTo(x - s * 0.5, y + s * 0.65, x, y + s * 0.85, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.85, x + s * 0.5, y + s * 0.65, x + s * 0.5, y + s * 0.35);
  ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.35); ctx.fill();
}
function fit(ctx: CanvasRenderingContext2D, text: string, font: (s: number) => string, size: number, max: number) {
  let s = size; ctx.font = font(s);
  while (s > 24 && ctx.measureText(text).width > max) { s -= 4; ctx.font = font(s); }
  return s;
}
function label(ctx: CanvasRenderingContext2D, text: string, y: number, color: string) {
  ctx.fillStyle = color; ctx.font = `700 26px ${SANS}`; ctx.textAlign = 'center';
  const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  if ('letterSpacing' in c) c.letterSpacing = '5px';
  ctx.fillText(text.toUpperCase(), W / 2, y);
  if ('letterSpacing' in c) c.letterSpacing = '0px';
}
async function loadFonts(p: Palet) {
  if (!document.fonts) return;
  await Promise.allSettled([`${p.displayWeight} 96px ${p.display}`, `700 30px ${SANS}`, `500 30px ${SANS}`, `600 56px ${HAND}`].map(f => document.fonts.load(f)));
}
async function loadImage(src: string) {
  const img = new Image(); img.decoding = 'async'; img.src = src; await img.decode(); return img;
}

function background(ctx: CanvasRenderingContext2D, p: Palet) {
  const bg = ctx.createLinearGradient(0, 0, W * 0.3, H); bg.addColorStop(0, p.bg[0]); bg.addColorStop(1, p.bg[1]);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 760); g.addColorStop(0, p.glow); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = p.accent; ctx.globalAlpha = 0.35; ctx.lineWidth = 2; rr(ctx, 40, 40, W - 80, H - 80, 28); ctx.stroke(); ctx.globalAlpha = 1;
}
export async function renderFeedSlide(ucapan: Ucapan, index: number): Promise<Blob> {
  const p = PALET[ucapan.id];
  const slide = slideFeed(ucapan)[index];
  if (!slide) throw new Error('Slide tidak ada');
  const [img] = await Promise.all([slide.jenis === 'sampul' ? loadImage(ucapan.foto) : Promise.resolve(null), loadFonts(p)]);
  const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Canvas unavailable');
  background(ctx, p);
  const displayFont = (s: number) => `${p.displayWeight} ${s}px ${p.display}`;

  if (slide.jenis === 'sampul' && img) {
    label(ctx, slide.label, 132, p.accent);
    // Polaroid with tape
    const pw = 560, ph = 700, cx = W / 2, cy = 560;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate((-3 * Math.PI) / 180);
    ctx.shadowColor = 'rgba(20,10,20,0.35)'; ctx.shadowBlur = 44; ctx.shadowOffsetY = 22;
    ctx.fillStyle = '#FFFEFA'; ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
    ctx.shadowColor = 'transparent';
    const iw = pw - 48, ih = ph - 140; const c = coverCrop(img.naturalWidth, img.naturalHeight, iw, ih, 0.3);
    ctx.drawImage(img, c.sx, c.sy, c.sw, c.sh, -iw / 2, -ph / 2 + 24, iw, ih);
    ctx.fillStyle = p.paperInk; ctx.font = `600 46px ${HAND}`; ctx.textAlign = 'center';
    ctx.fillText(slide.foto, 0, ph / 2 - 40);
    ctx.fillStyle = p.accent2; ctx.globalAlpha = 0.85; ctx.rotate((6 * Math.PI) / 180); ctx.fillRect(-80, -ph / 2 - 26, 160, 50); ctx.globalAlpha = 1;
    ctx.restore();
    // Title
    ctx.fillStyle = p.accent; ctx.textAlign = 'center';
    const s = fit(ctx, slide.judul, displayFont, 104, W - 160);
    const lines = wrapLines(slide.judul, W - 160, t => ctx.measureText(t).width, 2);
    const top = lines.length > 1 ? 1030 : 1080;
    lines.forEach((l, i) => ctx.fillText(l, W / 2, top + i * s * 1.08));
    ctx.fillStyle = p.ink; ctx.font = `600 50px ${HAND}`; ctx.fillText(slide.keterangan, W / 2, lines.length > 1 ? 1210 : 1170);
  }

  if (slide.jenis === 'surat') {
    const x = 100, w = W - 200, pad = 64, lh = 72;
    ctx.font = `500 46px ${SANS}`;
    const lines = wrapLines(`“${slide.isi}”`, w - pad * 2, t => ctx.measureText(t).width, 9);
    ctx.font = `500 36px ${SANS}`;
    const tutup = wrapLines(slide.penutup, w - pad * 2, t => ctx.measureText(t).width, 2);
    const h = 150 + lines.length * lh + 30 + tutup.length * 48 + 120 + 40;
    const y = Math.max(210, (H - 120 - h) / 2 + 40);
    label(ctx, slide.label, y - 50, p.accent);
    ctx.save(); ctx.shadowColor = 'rgba(20,10,20,0.25)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
    ctx.fillStyle = p.paper; rr(ctx, x, y, w, h, 18); ctx.fill(); ctx.restore();
    ctx.strokeStyle = p.line; ctx.lineWidth = 2;
    for (let ly = y + 150 + 18; ly < y + h - 30; ly += lh) { ctx.beginPath(); ctx.moveTo(x + 48, ly); ctx.lineTo(x + w - 48, ly); ctx.stroke(); }
    ctx.fillStyle = p.accent; heart(ctx, W / 2, y + 52, 50);
    ctx.fillStyle = p.paperInk; ctx.textAlign = 'left'; ctx.font = `500 46px ${SANS}`;
    lines.forEach((l, i) => ctx.fillText(l, x + pad, y + 150 + i * lh));
    let cy = y + 150 + lines.length * lh + 30;
    ctx.fillStyle = ucapan.id === 'wisuda' ? '#5A6385' : p.muted; ctx.font = `500 36px ${SANS}`;
    tutup.forEach((l, i) => ctx.fillText(l, x + pad, cy + i * 48)); cy += tutup.length * 48 + 70;
    ctx.fillStyle = ucapan.id === 'wisuda' ? '#A9801F' : p.accent;
    fit(ctx, slide.tandaTangan, s => `600 ${s}px ${HAND}`, 92, w - pad * 2); ctx.fillText(slide.tandaTangan, x + pad, cy);
    ctx.fillStyle = p.ink; ctx.font = `600 50px ${HAND}`; ctx.textAlign = 'center'; ctx.fillText(`untuk ${ucapan.penerima}`, W / 2, Math.min(H - 90, y + h + 90));
  }

  if (slide.jenis === 'alasan') {
    label(ctx, ucapan.acara, 150, p.accent);
    ctx.fillStyle = p.ink; ctx.textAlign = 'center';
    const s = fit(ctx, slide.judul, displayFont, 72, W - 180);
    const tl = wrapLines(slide.judul, W - 180, t => ctx.measureText(t).width, 2);
    tl.forEach((l, i) => ctx.fillText(l, W / 2, 250 + i * s * 1.12));
    const gx = 100, gy = 250 + tl.length * s * 1.12 + 20, gap = 28, cw = (W - 200 - gap) / 2, ch = 380;
    slide.poin.forEach((pt, i) => {
      const cx = gx + (i % 2) * (cw + gap), cy = gy + Math.floor(i / 2) * (ch + gap);
      ctx.fillStyle = i === 0 || i === 3 ? p.accent : p.paper; rr(ctx, cx, cy, cw, ch, 22); ctx.fill();
      const on = i === 0 || i === 3; const fg = on ? (ucapan.id === 'wisuda' ? '#1A2340' : '#FFFFFF') : p.paperInk;
      ctx.textAlign = 'left'; ctx.fillStyle = fg; ctx.font = `600 56px ${HAND}`; ctx.fillText(`0${i + 1}`, cx + 34, cy + 72);
      ctx.font = `700 40px ${SANS}`; const head = wrapLines(pt.depan, cw - 68, t => ctx.measureText(t).width, 2);
      head.forEach((l, j) => ctx.fillText(l, cx + 34, cy + 134 + j * 48));
      ctx.font = `500 30px ${SANS}`; ctx.globalAlpha = 0.88;
      const body = wrapLines(pt.isi, cw - 68, t => ctx.measureText(t).width, head.length > 1 ? 4 : 5);
      body.forEach((l, j) => ctx.fillText(l, cx + 34, cy + 150 + head.length * 48 + j * 40)); ctx.globalAlpha = 1;
    });
    ctx.fillStyle = p.accent; ctx.textAlign = 'center';
    fit(ctx, slide.penutup, displayFont, 64, W - 200); ctx.fillText(slide.penutup, W / 2, Math.min(H - 80, gy + 2 * ch + gap + 110));
  }

  return new Promise((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Gagal membuat gambar'))), 'image/png'));
}
