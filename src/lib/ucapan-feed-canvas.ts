// Draws one Instagram feed slide (1080 × 1350) for a greeting straight onto a canvas, so the
// preview and the downloaded PNG are the same pixels. Colors are literal because they are baked into the image.
import { AKUN_FEED, FEED_HEIGHT as H, FEED_WIDTH as W, slideFeed } from '@/data/ucapan-feed';
import type { JenisUcapan, Ucapan } from '@/data/ucapan-spesial';
import { coverCrop, wrapLines } from './story-card';

const SANS = '"DM Sans", Arial, sans-serif';
const HAND = '"Caveat", "Segoe Script", cursive';

type Palet = { bg: [string, string]; glow: string; glow2: string; ink: string; muted: string; accent: string; accent2: string; paper: string; paperInk: string; line: string; display: string; displayWeight: string };
const PALET: Record<JenisUcapan, Palet> = {
  pacar: { bg: ['#FCF1F4', '#F6DCE4'], glow: 'rgba(214,52,94,0.18)', glow2: 'rgba(246,201,184,0.55)', ink: '#3D1F2A', muted: '#7A5A66', accent: '#D6345E', accent2: '#F6C9B8', paper: '#FFFCF7', paperInk: '#3D1F2A', line: '#F3DDE3', display: '"Yellowtail", cursive', displayWeight: '400' },
  sahabat: { bg: ['#FFF7DA', '#FFE7A0'], glow: 'rgba(36,83,196,0.16)', glow2: 'rgba(242,105,74,0.28)', ink: '#1A2547', muted: '#4D5876', accent: '#2453C4', accent2: '#F2694A', paper: '#FFFDF4', paperInk: '#1A2547', line: '#F5E7B8', display: '"Shrikhand", serif', displayWeight: '400' },
  wisuda: { bg: ['#121B33', '#1D2849'], glow: 'rgba(225,181,74,0.22)', glow2: 'rgba(43,57,99,0.65)', ink: '#F5EEDC', muted: '#B5BCD3', accent: '#E1B54A', accent2: '#2B3963', paper: '#FAF6EC', paperInk: '#1A2340', line: '#EDE5D0', display: '"Playfair Display", Georgia, serif', displayWeight: '600' },
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
function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath(); ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}
function fit(ctx: CanvasRenderingContext2D, text: string, font: (s: number) => string, size: number, max: number) {
  let s = size; ctx.font = font(s);
  while (s > 24 && ctx.measureText(text).width > max) { s -= 4; ctx.font = font(s); }
  return s;
}
function spaced(ctx: CanvasRenderingContext2D, text: string, y: number, spacing: string) {
  const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  if ('letterSpacing' in c) c.letterSpacing = spacing;
  ctx.fillText(text, W / 2, y);
  if ('letterSpacing' in c) c.letterSpacing = '0px';
}
/** Small caps label inside a soft pill. */
function labelPill(ctx: CanvasRenderingContext2D, text: string, y: number, p: Palet) {
  ctx.font = `700 26px ${SANS}`; ctx.textAlign = 'center';
  const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  if ('letterSpacing' in c) c.letterSpacing = '5px';
  const w = ctx.measureText(text.toUpperCase()).width;
  if ('letterSpacing' in c) c.letterSpacing = '0px';
  ctx.save(); ctx.globalAlpha = 0.14; ctx.fillStyle = p.accent;
  rr(ctx, W / 2 - w / 2 - 40, y - 38, w + 80, 56, 28); ctx.fill(); ctx.restore();
  ctx.fillStyle = p.accent; spaced(ctx, text.toUpperCase(), y, '5px');
}
/** Thin lines with a tiny heart or star in the middle. */
function divider(ctx: CanvasRenderingContext2D, y: number, p: Palet, jenis: JenisUcapan) {
  ctx.save(); ctx.strokeStyle = p.accent; ctx.globalAlpha = 0.55; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W / 2 - 160, y); ctx.lineTo(W / 2 - 46, y);
  ctx.moveTo(W / 2 + 46, y); ctx.lineTo(W / 2 + 160, y); ctx.stroke(); ctx.restore();
  ctx.fillStyle = p.accent;
  if (jenis === 'pacar') heart(ctx, W / 2, y - 12, 24); else star(ctx, W / 2, y, 14);
}
/** Scattered theme doodles at fixed spots so every render looks the same. */
function doodles(ctx: CanvasRenderingContext2D, p: Palet, jenis: JenisUcapan) {
  const spots: [number, number, number, number][] = [
    [96, 250, 26, 0.16], [984, 190, 20, 0.14], [88, 1060, 22, 0.13],
    [992, 1120, 28, 0.15], [180, 720, 16, 0.1], [920, 640, 14, 0.1],
  ];
  for (const [x, y, s, a] of spots) {
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = p.accent;
    if (jenis === 'pacar') heart(ctx, x, y, s); else star(ctx, x, y, s);
    ctx.restore();
  }
  ctx.save(); ctx.fillStyle = p.accent2; ctx.globalAlpha = 0.4;
  for (const [x, y, r] of [[150, 420, 5], [950, 380, 4], [130, 900, 4], [960, 880, 5], [540, 1280, 4]] as const) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}
/** Fictional account handle at the very bottom of every slide. */
function handle(ctx: CanvasRenderingContext2D, ucapan: Ucapan, p: Palet) {
  ctx.fillStyle = p.muted; ctx.font = `600 24px ${SANS}`; ctx.textAlign = 'center';
  spaced(ctx, `@${AKUN_FEED[ucapan.id]}`.toUpperCase(), H - 56, '3px');
}
async function loadFonts(p: Palet) {
  if (!document.fonts) return;
  await Promise.allSettled([`${p.displayWeight} 96px ${p.display}`, `700 30px ${SANS}`, `500 30px ${SANS}`, `600 56px ${HAND}`].map(f => document.fonts.load(f)));
}
async function loadImage(src: string) {
  const img = new Image(); img.decoding = 'async'; img.src = src; await img.decode(); return img;
}

function background(ctx: CanvasRenderingContext2D, p: Palet, jenis: JenisUcapan) {
  const bg = ctx.createLinearGradient(0, 0, W * 0.3, H); bg.addColorStop(0, p.bg[0]); bg.addColorStop(1, p.bg[1]);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 780); g.addColorStop(0, p.glow); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const g2 = ctx.createRadialGradient(W * 0.1, H, 0, W * 0.1, H, 700); g2.addColorStop(0, p.glow2); g2.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
  doodles(ctx, p, jenis);
  ctx.strokeStyle = p.accent; ctx.globalAlpha = 0.35; ctx.lineWidth = 2;
  rr(ctx, 40, 40, W - 80, H - 80, 28); ctx.stroke();
  ctx.globalAlpha = 0.7; ctx.lineWidth = 4; ctx.lineCap = 'round';
  const t = 34, o = 64;
  const corners: [number, number, number, number][] = [[o, o, 1, 1], [W - o, o, -1, 1], [o, H - o, 1, -1], [W - o, H - o, -1, -1]];
  for (const [x, y, dx, dy] of corners) {
    ctx.beginPath(); ctx.moveTo(x + dx * t, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy * t); ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export async function renderFeedSlide(ucapan: Ucapan, index: number): Promise<Blob> {
  const p = PALET[ucapan.id];
  const slide = slideFeed(ucapan)[index];
  if (!slide) throw new Error('Slide tidak ada');
  const [img] = await Promise.all([slide.jenis === 'sampul' ? loadImage(ucapan.foto) : Promise.resolve(null), loadFonts(p)]);
  const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Canvas unavailable');
  background(ctx, p, ucapan.id);
  const displayFont = (s: number) => `${p.displayWeight} ${s}px ${p.display}`;

  if (slide.jenis === 'sampul' && img) {
    labelPill(ctx, slide.label, 138, p);
    // Polaroid with two tapes and a small sticker
    const pw = 580, ph = 720, cx = W / 2, cy = 600;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate((-3 * Math.PI) / 180);
    ctx.shadowColor = 'rgba(20,10,20,0.35)'; ctx.shadowBlur = 48; ctx.shadowOffsetY = 24;
    ctx.fillStyle = '#FFFEFA'; ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
    ctx.shadowColor = 'transparent';
    const iw = pw - 48, ih = ph - 150; const c = coverCrop(img.naturalWidth, img.naturalHeight, iw, ih, 0.3);
    ctx.drawImage(img, c.sx, c.sy, c.sw, c.sh, -iw / 2, -ph / 2 + 24, iw, ih);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 2; ctx.strokeRect(-iw / 2, -ph / 2 + 24, iw, ih);
    ctx.fillStyle = p.paperInk; ctx.font = `600 46px ${HAND}`; ctx.textAlign = 'center';
    ctx.fillText(slide.foto, 0, ph / 2 - 44);
    ctx.fillStyle = p.accent2; ctx.globalAlpha = 0.85;
    ctx.save(); ctx.rotate((6 * Math.PI) / 180); ctx.fillRect(-pw / 2 - 30, -ph / 2 - 24, 150, 48); ctx.restore();
    ctx.save(); ctx.rotate((-8 * Math.PI) / 180); ctx.fillRect(pw / 2 - 120, -ph / 2 - 24, 150, 48); ctx.restore();
    ctx.globalAlpha = 1; ctx.fillStyle = p.accent;
    if (ucapan.id === 'pacar') heart(ctx, pw / 2 - 46, ph / 2 - 140, 34); else star(ctx, pw / 2 - 52, ph / 2 - 118, 22);
    ctx.restore();
    // Title, flourish, handwritten line
    ctx.fillStyle = p.accent; ctx.textAlign = 'center';
    const s = fit(ctx, slide.judul, displayFont, 108, W - 160);
    const lines = wrapLines(slide.judul, W - 160, t => ctx.measureText(t).width, 2);
    const top = lines.length > 1 ? 1050 : 1100;
    lines.forEach((l, i) => ctx.fillText(l, W / 2, top + i * s * 1.08));
    const afterTitle = top + (lines.length - 1) * s * 1.08;
    divider(ctx, afterTitle + 44, p, ucapan.id);
    ctx.fillStyle = p.ink; ctx.font = `600 52px ${HAND}`;
    ctx.fillText(slide.keterangan, W / 2, afterTitle + 116);
    handle(ctx, ucapan, p);
  }

  if (slide.jenis === 'surat') {
    const x = 100, w = W - 200, pad = 64, lh = 72;
    ctx.font = `500 46px ${SANS}`;
    const lines = wrapLines(`“${slide.isi}”`, w - pad * 2, t => ctx.measureText(t).width, 9);
    ctx.font = `500 36px ${SANS}`;
    const tutup = wrapLines(slide.penutup, w - pad * 2, t => ctx.measureText(t).width, 2);
    const h = 190 + lines.length * lh + 30 + tutup.length * 48 + 130 + 40;
    const y = Math.max(220, (H - 120 - h) / 2 + 40);
    labelPill(ctx, slide.label, y - 56, p);
    ctx.save(); ctx.shadowColor = 'rgba(20,10,20,0.28)'; ctx.shadowBlur = 44; ctx.shadowOffsetY = 20;
    ctx.fillStyle = p.paper; rr(ctx, x, y, w, h, 20); ctx.fill(); ctx.restore();
    // Washi tape on top of the paper
    ctx.save(); ctx.translate(W / 2, y); ctx.rotate((-4 * Math.PI) / 180);
    ctx.fillStyle = p.accent2; ctx.globalAlpha = 0.9; ctx.fillRect(-90, -22, 180, 44); ctx.restore();
    // Faint quote ornament
    ctx.fillStyle = p.accent; ctx.globalAlpha = 0.16; ctx.font = '700 150px Georgia, serif'; ctx.textAlign = 'left';
    ctx.fillText('“', x + 40, y + 160); ctx.globalAlpha = 1;
    ctx.strokeStyle = p.line; ctx.lineWidth = 2;
    for (let ly = y + 190 + 18; ly < y + h - 30; ly += lh) { ctx.beginPath(); ctx.moveTo(x + 48, ly); ctx.lineTo(x + w - 48, ly); ctx.stroke(); }
    ctx.fillStyle = p.accent; heart(ctx, W / 2, y + 62, 46);
    ctx.fillStyle = p.paperInk; ctx.textAlign = 'left'; ctx.font = `500 46px ${SANS}`;
    lines.forEach((l, i) => ctx.fillText(l, x + pad, y + 190 + i * lh));
    let cy = y + 190 + lines.length * lh + 30;
    ctx.fillStyle = ucapan.id === 'wisuda' ? '#5A6385' : p.muted; ctx.font = `500 36px ${SANS}`;
    tutup.forEach((l, i) => ctx.fillText(l, x + pad, cy + i * 48)); cy += tutup.length * 48 + 78;
    ctx.fillStyle = ucapan.id === 'wisuda' ? '#A9801F' : p.accent;
    fit(ctx, slide.tandaTangan, s2 => `600 ${s2}px ${HAND}`, 96, w - pad * 2 - 160);
    ctx.fillText(slide.tandaTangan, x + pad, cy);
    const sigW = ctx.measureText(slide.tandaTangan).width;
    ctx.save(); ctx.strokeStyle = ctx.fillStyle; ctx.globalAlpha = 0.5; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x + pad, cy + 18); ctx.quadraticCurveTo(x + pad + sigW / 2, cy + 36, x + pad + sigW + 24, cy + 10); ctx.stroke(); ctx.restore();
    // Seal at the bottom-right of the paper
    const sx = x + w - 92, sy = y + h - 92;
    ctx.fillStyle = p.accent; ctx.beginPath(); ctx.arc(sx, sy, 44, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = p.paper;
    if (ucapan.id === 'pacar') heart(ctx, sx, sy - 14, 30);
    else if (ucapan.id === 'wisuda') star(ctx, sx, sy, 20);
    else { ctx.font = `700 40px ${SANS}`; ctx.textAlign = 'center'; ctx.fillText(ucapan.penerima[0] ?? 'S', sx, sy + 14); }
    ctx.fillStyle = p.ink; ctx.font = `600 50px ${HAND}`; ctx.textAlign = 'center';
    ctx.fillText(`untuk ${ucapan.penerima}`, W / 2, Math.min(H - 112, y + h + 82));
    handle(ctx, ucapan, p);
  }

  if (slide.jenis === 'alasan') {
    labelPill(ctx, ucapan.acara, 150, p);
    ctx.fillStyle = p.ink; ctx.textAlign = 'center';
    const s = fit(ctx, slide.judul, displayFont, 76, W - 180);
    const tl = wrapLines(slide.judul, W - 180, t => ctx.measureText(t).width, 2);
    tl.forEach((l, i) => ctx.fillText(l, W / 2, 260 + i * s * 1.12));
    divider(ctx, 260 + (tl.length - 1) * s * 1.12 + 42, p, ucapan.id);
    const gx = 100, gy = 260 + tl.length * s * 1.12 + 44, gap = 28, cw = (W - 200 - gap) / 2, ch = 380;
    slide.poin.forEach((pt, i) => {
      const cx = gx + (i % 2) * (cw + gap), cy = gy + Math.floor(i / 2) * (ch + gap);
      const on = i === 0 || i === 3;
      ctx.save(); ctx.shadowColor = 'rgba(20,10,20,0.22)'; ctx.shadowBlur = 26; ctx.shadowOffsetY = 12;
      ctx.fillStyle = on ? p.accent : p.paper; rr(ctx, cx, cy, cw, ch, 24); ctx.fill(); ctx.restore();
      const fg = on ? (ucapan.id === 'wisuda' ? '#1A2340' : '#FFFFFF') : p.paperInk;
      // Number badge
      ctx.save(); ctx.globalAlpha = on ? 0.25 : 0.12;
      ctx.fillStyle = on ? (ucapan.id === 'wisuda' ? '#1A2340' : '#FFFFFF') : p.accent;
      ctx.beginPath(); ctx.arc(cx + 62, cy + 62, 34, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      ctx.fillStyle = fg; ctx.font = `700 34px ${SANS}`; ctx.textAlign = 'center';
      ctx.fillText(`0${i + 1}`, cx + 62, cy + 74);
      ctx.textAlign = 'left'; ctx.font = `700 40px ${SANS}`;
      const head = wrapLines(pt.depan, cw - 68, t => ctx.measureText(t).width, 2);
      head.forEach((l, j) => ctx.fillText(l, cx + 34, cy + 150 + j * 48));
      ctx.font = `500 30px ${SANS}`; ctx.globalAlpha = 0.88;
      const body = wrapLines(pt.isi, cw - 68, t => ctx.measureText(t).width, head.length > 1 ? 3 : 4);
      body.forEach((l, j) => ctx.fillText(l, cx + 34, cy + 166 + head.length * 48 + j * 40)); ctx.globalAlpha = 1;
    });
    ctx.fillStyle = p.accent; ctx.textAlign = 'center';
    fit(ctx, slide.penutup, displayFont, 66, W - 200);
    ctx.fillText(slide.penutup, W / 2, Math.min(H - 98, gy + 2 * ch + gap + 102));
    handle(ctx, ucapan, p);
  }

  return new Promise((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Gagal membuat gambar'))), 'image/png'));
}
