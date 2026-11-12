// Draws the yearbook Story card straight onto a canvas so the preview and the
// downloaded PNG are the same pixels on every browser (incl. iOS Safari).
// Colors are literal because they are baked into the exported image.
import { coverCrop, STORY_HEIGHT as H, STORY_WIDTH as W, wrapLines, type StoryTone } from "./story-card";

export type StoryCardData = { nama: string; kelas: string; citaCita: string; julukan: string; quote: string; instagram: string; foto: string; sekolah: string; angkatan: string };

const SERIF = '"Playfair Display", Georgia, serif';
const SANS = '"DM Sans", Arial, sans-serif';
const HAND = '"Caveat", "Segoe Script", cursive';

const PALETTES = {
  dark: { bg: ["#0A1030", "#16235E", "#1E2F7A"], glow: "rgba(242,170,30,0.30)", glow2: "rgba(90,120,255,0.28)", ink: "#FFF6E0", muted: "#AEB9E6", accent: "#F2B53A", heading: ["#FFE29A", "#F2A007", "#C47E00"], frame: "rgba(242,181,58,0.75)", dust: "242,190,80", tape: "rgba(242,181,58,0.62)", pill: "rgba(255,255,255,0.06)" },
  light: { bg: ["#FFFDF6", "#F6F3FF", "#E6ECFF"], glow: "rgba(242,160,7,0.18)", glow2: "rgba(43,63,216,0.16)", ink: "#141C3F", muted: "#59628A", accent: "#2B3FD8", heading: ["#3B52F0", "#2B3FD8", "#1A2696"], frame: "rgba(43,63,216,0.55)", dust: "43,63,216", tape: "rgba(242,160,7,0.55)", pill: "rgba(43,63,216,0.06)" },
} as const;

function rng(seed: number) {
  return () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function diamond(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s, y); ctx.lineTo(x, y + s); ctx.lineTo(x - s, y); ctx.closePath(); ctx.fill();
}
function spaced(ctx: CanvasRenderingContext2D, px: number) {
  const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  if ("letterSpacing" in c) c.letterSpacing = `${px}px`;
}
function fit(ctx: CanvasRenderingContext2D, text: string, font: (size: number) => string, size: number, max: number) {
  let s = size; ctx.font = font(s);
  while (s > 20 && ctx.measureText(text).width > max) { s -= 4; ctx.font = font(s); }
  return s;
}
async function loadFonts() {
  if (!document.fonts) return;
  await Promise.allSettled([`700 120px ${SERIF}`, `italic 500 48px ${SERIF}`, `700 32px ${SANS}`, `500 32px ${SANS}`, `600 56px ${HAND}`].map((f) => document.fonts.load(f)));
}
async function loadImage(src: string) {
  const img = new Image(); img.decoding = "async"; img.src = src; await img.decode(); return img;
}

export async function renderStoryCard(data: StoryCardData, tone: StoryTone): Promise<Blob> {
  const [img] = await Promise.all([loadImage(data.foto), loadFonts()]);
  const p = PALETTES[tone];
  const canvas = document.createElement("canvas"); canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Canvas unavailable");
  ctx.textBaseline = "alphabetic";

  // Background, glows and gold dust
  const bg = ctx.createLinearGradient(0, 0, W * 0.4, H); bg.addColorStop(0, p.bg[0]); bg.addColorStop(0.55, p.bg[1]); bg.addColorStop(1, p.bg[2]);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  for (const [x, y, r, c] of [[930, 300, 720, p.glow], [80, 1720, 760, p.glow2]] as const) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, c); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  const rand = rng(2026);
  for (let i = 0; i < 90; i++) { ctx.fillStyle = `rgba(${p.dust},${(0.15 + rand() * 0.55).toFixed(2)})`; ctx.beginPath(); ctx.arc(rand() * W, rand() * H, 1 + rand() * 3.2, 0, Math.PI * 2); ctx.fill(); }

  // Double frame with diamond corners
  ctx.strokeStyle = p.frame; ctx.lineWidth = 3; ctx.strokeRect(36, 36, W - 72, H - 72); ctx.lineWidth = 1; ctx.strokeRect(50, 50, W - 100, H - 100);
  ctx.fillStyle = p.accent; for (const [x, y] of [[36, 36], [W - 36, 36], [36, H - 36], [W - 36, H - 36]]) diamond(ctx, x!, y!, 12);

  // Header
  ctx.fillStyle = p.ink; ctx.font = `700 28px ${SANS}`; spaced(ctx, 6); ctx.textAlign = "left"; ctx.fillText(data.sekolah.toUpperCase(), 96, 140);
  const pillText = `CLASS OF ${data.angkatan}`; ctx.font = `700 24px ${SANS}`; spaced(ctx, 5);
  const pw = ctx.measureText(pillText).width + 48; rr(ctx, W - 96 - pw, 104, pw, 52, 26); ctx.strokeStyle = p.accent; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = p.accent; ctx.textAlign = "center"; ctx.fillText(pillText, W - 96 - pw / 2 + 2, 139); spaced(ctx, 0);

  // Heading
  ctx.textAlign = "left";
  const hs = fit(ctx, "Sejuta Cerita", (s) => `700 ${s}px ${SERIF}`, 136, W - 192);
  const hg = ctx.createLinearGradient(0, 330 - hs, 0, 340); hg.addColorStop(0, p.heading[0]); hg.addColorStop(0.55, p.heading[1]); hg.addColorStop(1, p.heading[2]);
  ctx.fillStyle = hg; ctx.fillText("Sejuta Cerita", 92, 330);
  ctx.fillStyle = p.ink; ctx.font = `italic 500 50px ${SERIF}`; ctx.fillText("dan kamu di dalamnya.", 96, 404);

  // Polaroid
  const cx = 540, cy = 864, pwid = 760, phei = 830;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate((-3 * Math.PI) / 180);
  ctx.shadowColor = "rgba(5,10,40,0.45)"; ctx.shadowBlur = 50; ctx.shadowOffsetY = 24;
  ctx.fillStyle = "#FFFEF9"; ctx.fillRect(-pwid / 2, -phei / 2, pwid, phei);
  ctx.shadowColor = "transparent";
  const ph = { x: -pwid / 2 + 30, y: -phei / 2 + 30, w: pwid - 60, h: 650 };
  const c = coverCrop(img.naturalWidth, img.naturalHeight, ph.w, ph.h, 0.2);
  ctx.drawImage(img, c.sx, c.sy, c.sw, c.sh, ph.x, ph.y, ph.w, ph.h);
  const shade = ctx.createLinearGradient(0, ph.y, 0, ph.y + ph.h); shade.addColorStop(0.7, "rgba(0,0,0,0)"); shade.addColorStop(1, "rgba(0,0,0,0.12)"); ctx.fillStyle = shade; ctx.fillRect(ph.x, ph.y, ph.w, ph.h);
  ctx.fillStyle = "#141C3F"; ctx.textAlign = "center"; fit(ctx, data.julukan, (s) => `600 ${s}px ${HAND}`, 64, pwid - 80); ctx.fillText(data.julukan, 0, phei / 2 - 50);
  ctx.restore();
  // Tape across the top edge
  ctx.save(); ctx.translate(cx - 30, cy - phei / 2 - 4); ctx.rotate((-7 * Math.PI) / 180); ctx.fillStyle = p.tape; ctx.fillRect(-120, -28, 240, 56);
  ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 2; for (let x = -110; x < 120; x += 22) { ctx.beginPath(); ctx.moveTo(x, -28); ctx.lineTo(x + 8, 28); ctx.stroke(); }
  ctx.restore();

  // Gold seal
  ctx.save(); ctx.translate(890, 472); ctx.rotate((12 * Math.PI) / 180);
  ctx.shadowColor = "rgba(5,10,40,0.35)"; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10;
  const sg = ctx.createRadialGradient(-30, -30, 10, 0, 0, 108); sg.addColorStop(0, "#FFE08A"); sg.addColorStop(0.6, "#F2A007"); sg.addColorStop(1, "#B87400");
  ctx.fillStyle = sg; ctx.beginPath();
  for (let i = 0; i < 48; i++) { const a = (i / 48) * Math.PI * 2, r = i % 2 ? 100 : 110; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  ctx.closePath(); ctx.fill(); ctx.shadowColor = "transparent";
  ctx.strokeStyle = "#141C3F"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 86, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1.5; ctx.setLineDash([5, 6]); ctx.beginPath(); ctx.arc(0, 0, 76, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#141C3F"; ctx.textAlign = "center"; ctx.font = `700 17px ${SANS}`; spaced(ctx, 4); ctx.fillText("CLASS OF", 2, -30);
  ctx.font = `700 60px ${SERIF}`; spaced(ctx, 0); ctx.fillText(data.angkatan, 0, 22);
  ctx.font = `700 15px ${SANS}`; spaced(ctx, 3); ctx.fillText("MEMORIES", 2, 50); spaced(ctx, 0);
  ctx.restore();

  // Name, divider, class
  ctx.textAlign = "left"; ctx.fillStyle = p.ink; fit(ctx, data.nama, (s) => `700 ${s}px ${SERIF}`, 96, W - 192); ctx.fillText(data.nama, 94, 1406);
  ctx.strokeStyle = p.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(96, 1442); ctx.lineTo(230, 1442); ctx.moveTo(262, 1442); ctx.lineTo(396, 1442); ctx.stroke();
  ctx.fillStyle = p.accent; diamond(ctx, 246, 1442, 9);
  ctx.fillStyle = p.muted; ctx.font = `500 32px ${SANS}`; spaced(ctx, 1); ctx.fillText(`${data.kelas}  ·  Cita-cita: ${data.citaCita}`, 96, 1500); spaced(ctx, 0);

  // Quote
  ctx.font = `italic 500 42px ${SERIF}`;
  const lines = wrapLines(`“${data.quote}”`, W - 240, (s) => ctx.measureText(s).width, 3);
  ctx.fillStyle = p.accent; ctx.fillRect(96, 1540, 6, lines.length * 58 + 6);
  ctx.fillStyle = p.ink; lines.forEach((l, i) => ctx.fillText(l, 130, 1580 + i * 58));

  // Instagram pill
  const ig = `@${data.instagram}`; ctx.font = `700 32px ${SANS}`;
  const iw = ctx.measureText(ig).width + 140, iy = 1722;
  rr(ctx, 96, iy, iw, 76, 38); ctx.fillStyle = p.pill; ctx.fill();
  const igg = ctx.createLinearGradient(96, 0, 96 + iw, 0); igg.addColorStop(0, "#F58529"); igg.addColorStop(0.5, "#DD2A7B"); igg.addColorStop(1, "#8134AF");
  ctx.strokeStyle = igg; ctx.lineWidth = 3; ctx.stroke();
  rr(ctx, 124, iy + 20, 36, 36, 10); ctx.lineWidth = 3.5; ctx.stroke(); ctx.beginPath(); ctx.arc(142, iy + 38, 8, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#DD2A7B"; ctx.beginPath(); ctx.arc(152, iy + 28, 2.6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = p.ink; ctx.fillText(ig, 180, iy + 50);

  // Footer
  ctx.strokeStyle = p.frame; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(96, 1820); ctx.lineTo(W - 96, 1820); ctx.stroke();
  ctx.font = `700 20px ${SANS}`; spaced(ctx, 5); ctx.fillStyle = p.accent; ctx.fillText("NEMPO YEAR BOOK", 96, 1852);
  ctx.textAlign = "right"; ctx.fillStyle = p.muted; ctx.font = `500 18px ${SANS}`; spaced(ctx, 3); ctx.fillText("SEJUTA CERITA", W - 96, 1852); spaced(ctx, 0);

  return new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Empty image"))), "image/png"));
}
