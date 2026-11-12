import { useEffect, useRef, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const rows = [
  { no: '01', kategori: 'Kuliner',             jumlah: 30, color: '#D4A017' },
  { no: '02', kategori: 'Fashion',              jumlah: 10, color: '#C49A6C' },
  { no: '03', kategori: 'Craft & Handmade',     jumlah: 10, color: '#B08050' },
  { no: '04', kategori: 'Produk Kreatif',       jumlah: 10, color: '#966040' },
  { no: '05', kategori: 'Komunitas & Showcase', jumlah: 10, color: '#7C4830' },
];

const CIRC = 238.76; // 2π × 38
const total = 70;

// cumulative offsets for donut slices
const slices = rows.map((r, i) => {
  const prev = rows.slice(0, i).reduce((s, x) => s + x.jumlah, 0);
  return { ...r, dash: (r.jumlah / total) * CIRC, offset: -(prev / total) * CIRC };
});

const sparks = [
  { left: '5%',  top: '22%', dur: '3.6s', delay: '0.3s' },
  { left: '96%', top: '18%', dur: '4.1s', delay: '1.2s' },
  { left: '50%', top: '88%', dur: '3.3s', delay: '0.7s' },
  { left: '78%', top: '65%', dur: '4.5s', delay: '2.0s' },
  { left: '30%', top: '80%', dur: '3.9s', delay: '1.5s' },
  { left: '65%', top: '12%', dur: '3.4s', delay: '0.9s' },
];

export default function Slide30KomposisiTenant() {
  const [go,      setGo]      = useState(false);
  const [filled,  setFilled]  = useState(false);
  const [donut,   setDonut]   = useState(false);
  const [hov,     setHov]     = useState<number | null>(null);
  const [hovLeg,  setHovLeg]  = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setGo(true), 80);
    const t2 = setTimeout(() => setFilled(true), 700);
    const t3 = setTimeout(() => setDonut(true), 500);
    timers.current = [t1, t2, t3];
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        /* ── background ── */
        @keyframes bgDrift30 {
          0%   { transform:scale(1.06) translate(0px,0px); }
          40%  { transform:scale(1.10) translate(-9px,-6px); }
          100% { transform:scale(1.06) translate(0px,0px); }
        }

        /* ── sparks ── */
        @keyframes spark30 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.55; }
          68%  { transform:scale(1.8) rotate(215deg); opacity:0.22; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }

        /* ── scan line ── */
        @keyframes scan30 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── top bar ── */
        @keyframes barPulse30 {
          0%,100% { opacity:1; }
          50%     { opacity:0.40; }
        }

        /* ── left accent bar grow ── */
        @keyframes barGrowY30 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }

        /* ── entrance ── */
        @keyframes fadeUp30 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn30 {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes growX30 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes rowIn30 {
          from { opacity:0; transform:translateX(-1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideLeft30 {
          from { opacity:0; transform:translateX(2.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── bar shimmer ── */
        @keyframes barShimmer30 {
          0%   { background-position:-200% 0; }
          100% { background-position:200%  0; }
        }

        /* ── number pop ── */
        @keyframes numPop30 {
          0%   { opacity:0; transform:scale(0.65) translateY(0.4cqh); }
          60%  { transform:scale(1.12); }
          100% { opacity:1; transform:scale(1); }
        }

        /* ── total row glow pulse ── */
        @keyframes totalGlow30 {
          0%,100% { box-shadow:none; border-color:rgba(212,160,23,0.40); }
          50%     { box-shadow:0 0 2cqw rgba(212,160,23,0.18); border-color:rgba(212,160,23,0.75); }
        }

        /* ── total number shimmer ── */
        @keyframes totalShimmer30 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .total-num30 {
          background: linear-gradient(90deg,
            #D4A017 0%, #fffbe8 30%, #f5c842 50%, #D4A017 70%, #fffbe8 100%
          );
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: totalShimmer30 3.5s ease infinite;
        }

        /* ── donut spin-in ── */
        @keyframes donutSpin30 {
          from { stroke-dashoffset:var(--circ); }
          to   { stroke-dashoffset:var(--offset); }
        }

        /* ── donut center pulse ── */
        @keyframes centerPulse30 {
          0%,100% { transform:scale(1);    opacity:0.90; }
          50%     { transform:scale(1.06); opacity:1.00; }
        }

        /* ── legend dot pulse ── */
        @keyframes legendDot30 {
          0%,100% { transform:scale(1);   box-shadow:none; }
          50%     { transform:scale(1.5); box-shadow:0 0 0.8cqw var(--dot-color); }
        }

        /* ── label breathing ── */
        @keyframes labelBreath30 {
          0%,100% { opacity:0.60; letter-spacing:0.30em; }
          50%     { opacity:0.95; letter-spacing:0.36em; }
        }

        /* ── panel shimmer ── */
        @keyframes panelShimmer30 {
          0%   { background-position:0% 50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }

        /* ── row hover (CSS fallback) ── */
        .row30 {
          transition: background 0.22s ease, box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1);
        }
      `}</style>

      {/* ── Background texture ── */}
      <img
        src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.08, animation: 'bgDrift30 26s ease-in-out infinite' }}
        alt="" aria-hidden="true"
      />

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.44cqw', height: '0.44cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark30 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan30 14s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh',
        background: 'linear-gradient(to right, transparent 0%, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent 100%)',
        animation: 'barPulse30 4.5s ease-in-out infinite', zIndex: 10,
      }} />

      {/* ── Left accent bar ── */}
      <div style={{
        width: '0.6cqw', flexShrink: 0, zIndex: 5,
        background: 'linear-gradient(to bottom, transparent 0%, #D4A017 15%, #D4A017 85%, transparent 100%)',
        transformOrigin: 'top',
        animation: go ? 'barGrowY30 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }} />

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '7.5cqh 5.5cqw 6cqh' }}>

        {/* Label row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '1.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn30 0.5s ease 0.15s both' : 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.9cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            animation: 'labelBreath30 4s ease-in-out 1s infinite',
            letterSpacing: '0.30em',
          }}>Komposisi Tenant</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX30 0.8s cubic-bezier(0.22,1,0.36,1) 0.28s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 700,
          fontSize: '4cqw', lineHeight: 1.1, marginBottom: '4cqh',
          color: 'rgba(245,230,195,0.97)',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp30 0.65s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
        }}>
          Tenant <span style={{ color: '#D4A017' }}>UMKM</span>
        </h2>

        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '5% 42% 15% 38%',
          padding: '1cqh 1.5cqw', marginBottom: '1.2cqh',
          background: 'rgba(212,160,23,0.10)',
          borderBottom: '0.05cqw solid rgba(212,160,23,0.35)',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn30 0.4s ease 0.32s both' : 'none',
        }}>
          {['#', 'Kategori', 'Jumlah', ''].map((h, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
              color: 'rgba(212,160,23,0.50)', textTransform: 'uppercase', letterSpacing: '0.18em',
            }}>{h}</p>
          ))}
        </div>

        {/* Data rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8cqh' }}>
          {rows.map((row, i) => {
            const isH = hov === i;
            return (
              <div
                key={i}
                className="row30"
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display: 'grid', gridTemplateColumns: '5% 42% 15% 38%',
                  alignItems: 'center', padding: '1.4cqh 1.5cqw',
                  background: isH
                    ? `rgba(${row.color === '#D4A017' ? '212,160,23' : '180,130,80'},0.12)`
                    : i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent',
                  borderLeft: `0.25cqw solid ${isH ? row.color : row.color + '55'}`,
                  boxShadow: isH ? `inset 0 0 3cqw ${row.color}10` : 'none',
                  transform: isH ? 'translateX(0.3cqw)' : 'translateX(0)',
                  cursor: 'default',
                  opacity: go ? 1 : 0,
                  animation: go ? `rowIn30 0.45s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.08}s both` : 'none',
                }}
              >
                {/* No */}
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 900,
                  fontSize: '1.1cqw', color: isH ? `${row.color}88` : 'rgba(212,160,23,0.25)',
                  transition: 'color 0.22s ease',
                }}>{row.no}</p>

                {/* Kategori */}
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 600,
                  fontSize: '1.6cqw', lineHeight: 1.2,
                  color: isH ? 'rgba(245,230,195,0.98)' : 'rgba(245,230,195,0.88)',
                  textShadow: isH ? `0 0 2cqw ${row.color}44` : 'none',
                  transition: 'color 0.22s ease, text-shadow 0.22s ease',
                }}>{row.kategori}</p>

                {/* Jumlah */}
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                  fontSize: '2cqw',
                  color: isH ? '#f5c842' : row.color,
                  textShadow: isH ? `0 0 1.5cqw ${row.color}88` : 'none',
                  transition: 'color 0.22s ease, text-shadow 0.22s ease',
                  opacity: filled ? 1 : 0,
                  animation: filled ? `numPop30 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s both` : 'none',
                }}>{row.jumlah}</p>

                {/* Bar */}
                <div style={{
                  width: '100%', height: '0.55cqh', borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '9999px',
                    background: `linear-gradient(to right, ${row.color}99, ${row.color})`,
                    backgroundSize: '200% 100%',
                    width: filled ? `${(row.jumlah / total) * 100}%` : '0%',
                    transition: filled ? `width 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s` : 'none',
                    animation: filled ? `barShimmer30 2.8s linear ${0.9 + i * 0.1}s infinite` : 'none',
                    boxShadow: isH ? `0 0 0.8cqw ${row.color}80` : 'none',
                  }} />
                </div>
              </div>
            );
          })}

          {/* Total row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '5% 42% 15% 38%',
            alignItems: 'center', padding: '1.8cqh 1.5cqw', marginTop: '0.8cqh',
            background: 'linear-gradient(90deg, rgba(212,160,23,0.15) 0%, rgba(212,160,23,0.05) 100%)',
            border: '0.05cqw solid rgba(212,160,23,0.40)',
            opacity: go ? 1 : 0,
            animation: go
              ? `rowIn30 0.5s cubic-bezier(0.22,1,0.36,1) ${0.38 + rows.length * 0.08}s both, totalGlow30 3.5s ease-in-out 1.5s infinite`
              : 'none',
          }}>
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 900,
              fontSize: '1.1cqw', color: 'rgba(212,160,23,0.35)',
            }}>∑</p>
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 700,
              fontSize: '1.6cqw', color: '#D4A017',
            }}>Total</p>
            <p className="total-num30" style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 900,
              fontSize: '2.2cqw',
            }}>60–70</p>
            <p style={{
              fontFamily: 'var(--font-body,sans-serif)', fontStyle: 'italic',
              fontSize: '1cqw', color: 'rgba(212,160,23,0.52)',
            }}>Tenant UMKM</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — Donut + Legend
      ══════════════════════════════════════════ */}
      <div style={{
        width: '20cqw', flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '3cqh', padding: '0 2.5cqw',
        background: 'linear-gradient(135deg, #2A1A0A 0%, #1A0D06 100%)',
        position: 'relative', overflow: 'hidden',
        opacity: go ? 1 : 0,
        animation: go ? 'slideLeft30 0.7s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
      }}>
        {/* Panel shimmer */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(212,160,23,0.05) 0%, transparent 60%, rgba(212,160,23,0.03) 100%)',
          backgroundSize: '300% 300%',
          animation: 'panelShimmer30 12s ease-in-out infinite',
        }} />
        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '10cqw', height: '10cqw',
          background: 'radial-gradient(circle at top right, rgba(212,160,23,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Donut chart */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10cqw', height: '10cqw' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            {/* Track */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(212,160,23,0.12)" strokeWidth="14" />
            {/* Slices — animate stroke-dashoffset from full circumference to actual offset */}
            {slices.map((s, i) => (
              <circle
                key={i}
                cx="50" cy="50" r="38" fill="none"
                stroke={s.color} strokeWidth="14"
                strokeDasharray={`${donut ? s.dash : 0} ${CIRC}`}
                strokeDashoffset={s.offset}
                opacity={0.85 - i * 0.08}
                style={{
                  transition: donut
                    ? `stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.12}s`
                    : 'none',
                  filter: hovLeg === i ? `drop-shadow(0 0 0.4cqw ${s.color})` : 'none',
                }}
              />
            ))}
          </svg>

          {/* Center label */}
          <div style={{
            position: 'absolute', textAlign: 'center',
            animation: 'centerPulse30 4s ease-in-out 1.5s infinite',
          }}>
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 900,
              fontSize: '2.2cqw', lineHeight: 1, color: '#D4A017',
              textShadow: '0 0 2cqw rgba(212,160,23,0.40)',
            }}>70</p>
            <p style={{
              fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.65cqw',
              color: 'rgba(245,230,195,0.38)', textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>Tenant</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: '3cqw', height: '0.15cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.40), transparent)',
          animation: go ? 'growX30 0.6s cubic-bezier(0.22,1,0.36,1) 0.7s both' : 'none',
        }} />

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8cqh', width: '100%', position: 'relative' }}>
          {rows.map((row, i) => {
            const isH = hovLeg === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovLeg(i)}
                onMouseLeave={() => setHovLeg(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6cqw',
                  padding: '0.2cqh 0.4cqw', borderRadius: '0.3cqw',
                  background: isH ? 'rgba(212,160,23,0.08)' : 'transparent',
                  transform: isH ? 'translateX(-0.3cqw)' : 'translateX(0)',
                  transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: '0.6cqw', height: '0.6cqw', borderRadius: '50%',
                  background: row.color, flexShrink: 0,
                  '--dot-color': row.color,
                  boxShadow: isH ? `0 0 0.8cqw ${row.color}` : 'none',
                  animation: !isH ? `legendDot30 ${3 + i * 0.6}s ease-in-out ${1.2 + i * 0.4}s infinite` : 'none',
                  transition: 'box-shadow 0.22s ease',
                } as React.CSSProperties} />
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.9cqw', lineHeight: 1.3,
                  flex: 1,
                  color: isH ? 'rgba(245,230,195,0.95)' : 'rgba(245,230,195,0.55)',
                  transition: 'color 0.22s ease',
                }}>{row.kategori}</p>
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                  fontSize: '0.95cqw',
                  color: isH ? row.color : 'rgba(245,230,195,0.68)',
                  textShadow: isH ? `0 0 1cqw ${row.color}88` : 'none',
                  transition: 'color 0.22s ease, text-shadow 0.22s ease',
                }}>{row.jumlah}</p>
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={30} total={38} />
    </div>
  );
}
