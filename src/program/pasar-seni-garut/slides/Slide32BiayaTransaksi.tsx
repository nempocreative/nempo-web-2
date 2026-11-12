import { useEffect, useRef, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const sistemKoin = [
  { ket: 'Biaya Pengelolaan Transaksi', val: '10%',                 highlight: true  },
  { ket: 'Sistem Pembayaran',           val: 'Koin Pasar',          highlight: false },
  { ket: 'Rekap Penjualan',             val: 'Harian',              highlight: false },
  { ket: 'Pencairan Dana UMKM',         val: 'H+1 Setelah Event',   highlight: false },
  { ket: 'Laporan Transaksi',           val: 'Disediakan',          highlight: false },
];

const alokasi = [
  { ket: 'Sistem Koin & Kasir Festival',  pct: 20 },
  { ket: 'Kebersihan Area Festival',      pct: 15 },
  { ket: 'Keamanan & Petugas Lapangan',   pct: 15 },
  { ket: 'Dokumentasi & Publikasi',       pct: 10 },
  { ket: 'Operasional Event',             pct: 20 },
  { ket: 'Aktivasi Pengunjung',           pct: 10 },
  { ket: 'Cadangan & Pengembangan Event', pct: 10 },
];

const sparks = [
  { left: '5%',  top: '18%', dur: '3.7s', delay: '0.3s' },
  { left: '95%', top: '24%', dur: '4.2s', delay: '1.1s' },
  { left: '50%', top: '86%', dur: '3.4s', delay: '0.7s' },
  { left: '78%', top: '62%', dur: '4.5s', delay: '2.0s' },
  { left: '28%', top: '80%', dur: '3.9s', delay: '1.5s' },
  { left: '68%', top: '10%', dur: '3.3s', delay: '0.6s' },
];

export default function Slide32BiayaTransaksi() {
  const [go,     setGo]     = useState(false);
  const [filled, setFilled] = useState(false);
  const [hovL,   setHovL]   = useState<number | null>(null);
  const [hovR,   setHovR]   = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setGo(true),    80);
    const t2 = setTimeout(() => setFilled(true), 700);
    timers.current = [t1, t2];
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        @keyframes bgDrift32 {
          0%   { transform:scale(1.06) translate(0px,0px); }
          40%  { transform:scale(1.10) translate(-9px,-6px); }
          100% { transform:scale(1.06) translate(0px,0px); }
        }
        @keyframes spark32 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.55; }
          68%  { transform:scale(1.8) rotate(215deg); opacity:0.22; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }
        @keyframes scan32 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
        @keyframes barPulse32 {
          0%,100% { opacity:1; }
          50%     { opacity:0.40; }
        }
        @keyframes barGrowY32 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }
        @keyframes fadeUp32 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn32 {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes growX32 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes rowInL32 {
          from { opacity:0; transform:translateX(-1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes rowInR32 {
          from { opacity:0; transform:translateX(1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        /* 10% highlight row */
        @keyframes highlightPulse32 {
          0%,100% {
            background: linear-gradient(90deg,rgba(212,160,23,0.15) 0%,rgba(212,160,23,0.05) 100%);
            box-shadow: none;
          }
          50% {
            background: linear-gradient(90deg,rgba(212,160,23,0.26) 0%,rgba(212,160,23,0.09) 100%);
            box-shadow: inset 0 0 2cqw rgba(212,160,23,0.10);
          }
        }
        /* 10% value shimmer */
        @keyframes valShimmer32 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .val-shimmer32 {
          background: linear-gradient(90deg,
            #D4A017 0%, #fffbe8 25%, #f5c842 50%, #D4A017 75%, #fffbe8 100%
          );
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: valShimmer32 3.2s ease infinite;
        }
        /* big value pop */
        @keyframes bigPop32 {
          0%   { opacity:0; transform:scale(0.55) translateY(0.6cqh); }
          60%  { transform:scale(1.14); }
          100% { opacity:1; transform:scale(1); }
        }
        /* bar shimmer */
        @keyframes barShimmer32 {
          0%   { background-position:-200% 0; }
          100% { background-position:200%  0; }
        }
        /* pct pop */
        @keyframes pctPop32 {
          0%   { opacity:0; transform:scale(0.6) translateY(0.4cqh); }
          60%  { transform:scale(1.12); }
          100% { opacity:1; transform:scale(1); }
        }
        /* total row glow */
        @keyframes totalGlow32 {
          0%,100% { border-color:rgba(212,160,23,0.30); box-shadow:none; }
          50%     { border-color:rgba(212,160,23,0.70); box-shadow:0 0 2cqw rgba(212,160,23,0.15); }
        }
        /* divider pulse */
        @keyframes divPulse32 {
          0%,100% { opacity:0.15; }
          50%     { opacity:0.42; }
        }
        /* label breath */
        @keyframes labelBreath32 {
          0%,100% { opacity:0.62; letter-spacing:0.28em; }
          50%     { opacity:0.96; letter-spacing:0.34em; }
        }
        /* subtitle drift */
        @keyframes subDrift32 {
          0%,100% { opacity:0.50; }
          50%     { opacity:0.75; }
        }
        /* coin tag pulse */
        @keyframes coinTag32 {
          0%,100% { opacity:0.80; text-shadow:none; }
          50%     { opacity:1.00; text-shadow:0 0 1.5cqw rgba(212,160,23,0.50); }
        }
      `}</style>

      {/* ── Background ── */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.08, animation: 'bgDrift32 26s ease-in-out infinite' }}
        alt="" aria-hidden="true" />

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.44cqw', height: '0.44cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark32 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan32 14s linear infinite',
        }} />
      </div>

      {/* ── Top bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh',
        background: 'linear-gradient(to right, transparent 0%, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent 100%)',
        animation: 'barPulse32 4.5s ease-in-out infinite', zIndex: 10,
      }} />

      {/* ── Left accent bar ── */}
      <div style={{
        width: '0.6cqw', flexShrink: 0, zIndex: 5,
        background: 'linear-gradient(to bottom, transparent 0%, #D4A017 15%, #D4A017 85%, transparent 100%)',
        transformOrigin: 'top',
        animation: go ? 'barGrowY32 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }} />

      {/* ══════════════════════════════════════
          LEFT — Sistem Koin
      ══════════════════════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        padding: '7.5cqh 4cqw 6.5cqh', width: '44%',
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp32 0.65s cubic-bezier(0.22,1,0.36,1) 0.12s both' : 'none',
      }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '1.5cqh' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.96cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            letterSpacing: '0.28em',
            animation: 'labelBreath32 4s ease-in-out 1s infinite',
          }}>Sistem Transaksi</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX32 0.8s cubic-bezier(0.22,1,0.36,1) 0.28s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 700,
          fontSize: '3.5cqw', lineHeight: 1.1, marginBottom: '3cqh',
          color: 'rgba(245,230,195,0.97)',
        }}>
          Biaya <span style={{ color: '#D4A017' }}>Transaksi</span><br />Pasar Seni Garut
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.20cqw',
          color: 'rgba(245,230,195,0.50)', marginBottom: '1.5cqh',
          animation: 'subDrift32 5s ease-in-out 2s infinite',
        }}>
          Seluruh transaksi menggunakan{' '}
          <span style={{
            color: 'rgba(212,160,23,0.85)', fontWeight: 600,
            animation: 'coinTag32 3s ease-in-out 1.5s infinite',
          }}>Koin Pasar Seni Garut</span>
        </p>

        {/* Sistem Koin rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cqh' }}>
          {sistemKoin.map((r, i) => {
            const isH = hovL === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovL(i)}
                onMouseLeave={() => setHovL(null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.9cqh 1.2cqw',
                  background: isH
                    ? 'rgba(212,160,23,0.12)'
                    : r.highlight
                      ? undefined
                      : i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent',
                  borderLeft: r.highlight
                    ? `0.22cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.70)'}`
                    : isH ? '0.22cqw solid rgba(212,160,23,0.35)' : '0.22cqw solid transparent',
                  transform: isH ? 'translateX(0.3cqw)' : 'translateX(0)',
                  transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), background 0.22s ease, border-color 0.22s ease',
                  cursor: 'default',
                  opacity: go ? 1 : 0,
                  animation: go
                    ? r.highlight && !isH
                      ? `rowInL32 0.42s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.07}s both, highlightPulse32 4s ease-in-out 1.5s infinite`
                      : `rowInL32 0.42s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.07}s both`
                    : 'none',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.22cqw',
                  color: isH ? 'rgba(245,230,195,0.95)' : 'rgba(245,230,195,0.65)',
                  transition: 'color 0.22s ease',
                }}>{r.ket}</p>

                {r.highlight ? (
                  <p className="val-shimmer32" style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 800,
                    fontSize: '1.95cqw',
                    opacity: go ? 1 : 0,
                    animation: go ? `bigPop32 0.5s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.07}s both` : 'none',
                  }}>{r.val}</p>
                ) : (
                  <p style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 600,
                    fontSize: '1.28cqw',
                    color: isH ? '#f5c842' : 'rgba(255,235,180,0.78)',
                    transition: 'color 0.22s ease',
                    textShadow: isH ? '0 0 1.2cqw rgba(212,160,23,0.40)' : 'none',
                  }}>{r.val}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Bottom callout — Manfaat Sistem Koin ── */}
        <div style={{
          marginTop: 'auto',
          padding: '2cqh 1.4cqw',
          border: '0.08cqw solid rgba(212,160,23,0.30)',
          borderLeft: '0.28cqw solid rgba(212,160,23,0.75)',
          background: 'linear-gradient(135deg, rgba(212,160,23,0.09) 0%, rgba(212,160,23,0.02) 100%)',
          backdropFilter: 'blur(4px)',
          opacity: go ? 1 : 0,
          animation: go
            ? `fadeUp32 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + sistemKoin.length * 0.07 + 0.18}s both`
            : 'none',
        }}>
          <p style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.82cqw',
            color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase',
            letterSpacing: '0.22em', marginBottom: '1.2cqh',
          }}>Manfaat Sistem Koin</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7cqh' }}>
            {[
              { icon: '◆', text: 'Transaksi cashless — aman & efisien' },
              { icon: '◆', text: 'Rekap penjualan real-time per tenant' },
              { icon: '◆', text: 'Pencairan dana H+1 pasca event' },
              { icon: '◆', text: 'Laporan lengkap disediakan panitia' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8cqw' }}>
                <span style={{
                  fontFamily: 'var(--font-display,serif)', fontSize: '0.60cqw',
                  color: 'rgba(212,160,23,0.60)', marginTop: '0.15cqh', flexShrink: 0,
                }}>{item.icon}</span>
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.08cqw',
                  color: 'rgba(245,230,195,0.62)', lineHeight: 1.4,
                }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{
        width: '0.05cqw', margin: '7.5cqh 0',
        background: 'linear-gradient(to bottom, transparent, rgba(212,160,23,0.32) 30%, rgba(212,160,23,0.32) 70%, transparent)',
        animation: 'divPulse32 4s ease-in-out infinite',
      }} />

      {/* ══════════════════════════════════════
          RIGHT — Alokasi 10%
      ══════════════════════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        padding: '7.5cqh 3.5cqw 6.5cqh',
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp32 0.65s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
      }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '1.5cqh' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.96cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            letterSpacing: '0.28em',
            animation: 'labelBreath32 4s ease-in-out 1.8s infinite',
          }}>Penggunaan</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX32 0.8s cubic-bezier(0.22,1,0.36,1) 0.38s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 700,
          fontSize: '3.0cqw', lineHeight: 1.1, marginBottom: '3cqh',
          color: 'rgba(245,230,195,0.97)',
        }}>
          Alokasi Biaya<br /><span style={{ color: '#D4A017' }}>Pengelolaan 10%</span>
        </h2>

        {/* Alokasi bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1cqh' }}>
          {alokasi.map((a, i) => {
            const isH = hovR === i;
            const barW = `${a.pct * 5}%`;
            const opacity = 0.60 + i * 0.05;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovR(i)}
                onMouseLeave={() => setHovR(null)}
                style={{
                  cursor: 'default',
                  transform: isH ? 'translateX(0.3cqw)' : 'translateX(0)',
                  transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1)',
                  opacity: go ? 1 : 0,
                  animation: go ? `rowInR32 0.42s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.07}s both` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3cqh', alignItems: 'baseline' }}>
                  <p style={{
                    fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.22cqw',
                    color: isH ? 'rgba(245,230,195,0.96)' : 'rgba(245,230,195,0.70)',
                    transition: 'color 0.22s ease',
                  }}>{a.ket}</p>
                  <p style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                    fontSize: '1.22cqw',
                    color: isH ? '#f5c842' : '#D4A017',
                    textShadow: isH ? '0 0 1.2cqw rgba(212,160,23,0.45)' : 'none',
                    transition: 'color 0.22s ease, text-shadow 0.22s ease',
                    opacity: filled ? 1 : 0,
                    animation: filled ? `pctPop32 0.38s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both` : 'none',
                  }}>{a.pct}%</p>
                </div>
                {/* Track */}
                <div style={{
                  width: '100%', height: '0.4cqh', borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '9999px',
                    background: `linear-gradient(to right, rgba(212,160,23,${opacity - 0.2}), rgba(212,160,23,${opacity}))`,
                    backgroundSize: '200% 100%',
                    width: filled ? barW : '0%',
                    transition: filled ? `width 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s` : 'none',
                    animation: filled ? `barShimmer32 2.8s linear ${0.9 + i * 0.1}s infinite` : 'none',
                    boxShadow: isH ? '0 0 0.8cqw rgba(212,160,23,0.55)' : 'none',
                    transition2: 'box-shadow 0.22s ease',
                  } as React.CSSProperties} />
                </div>
              </div>
            );
          })}

          {/* Total row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1cqh 0', marginTop: '0.5cqh',
            borderTop: '0.05cqw solid rgba(212,160,23,0.30)',
            opacity: go ? 1 : 0,
            animation: go
              ? `rowInR32 0.42s cubic-bezier(0.22,1,0.36,1) ${0.38 + alokasi.length * 0.07}s both, totalGlow32 4s ease-in-out 1.8s infinite`
              : 'none',
          }}>
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 700,
              fontSize: '1.32cqw', color: 'rgba(245,230,195,0.88)',
            }}>Total</p>
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 700,
              fontSize: '1.32cqw', color: '#D4A017',
              textShadow: '0 0 1.5cqw rgba(212,160,23,0.35)',
            }}>100%</p>
          </div>
        </div>

        {/* ── Bottom callout — Estimasi Biaya Pengelolaan ── */}
        <div style={{
          marginTop: 'auto',
          padding: '2cqh 1.4cqw',
          border: '0.08cqw solid rgba(212,160,23,0.30)',
          borderLeft: '0.28cqw solid rgba(212,160,23,0.75)',
          background: 'linear-gradient(135deg, rgba(212,160,23,0.09) 0%, rgba(212,160,23,0.02) 100%)',
          backdropFilter: 'blur(4px)',
          opacity: go ? 1 : 0,
          animation: go
            ? `fadeUp32 0.55s cubic-bezier(0.22,1,0.36,1) ${0.38 + alokasi.length * 0.07 + 0.20}s both`
            : 'none',
        }}>
          <p style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.82cqw',
            color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase',
            letterSpacing: '0.22em', marginBottom: '1cqh',
          }}>Estimasi Biaya Pengelolaan</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5cqw', flexWrap: 'wrap' }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                color: 'rgba(245,230,195,0.40)', marginBottom: '0.3cqh',
              }}>Target Transaksi</p>
              <p style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                fontSize: '1.28cqw', color: 'rgba(212,160,23,0.80)',
              }}>Rp500.000.000</p>
            </div>
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 300,
              fontSize: '1.8cqw', color: 'rgba(212,160,23,0.35)',
            }}>×</p>
            <div>
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                color: 'rgba(245,230,195,0.40)', marginBottom: '0.3cqh',
              }}>Biaya Pengelolaan</p>
              <p style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                fontSize: '1.28cqw', color: 'rgba(212,160,23,0.80)',
              }}>10%</p>
            </div>
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 300,
              fontSize: '1.8cqw', color: 'rgba(212,160,23,0.35)',
            }}>=</p>
            <div>
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                color: 'rgba(245,230,195,0.40)', marginBottom: '0.3cqh',
              }}>Pendapatan Pengelola</p>
              <p className="val-shimmer32" style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 800,
                fontSize: '1.45cqw',
              }}>Rp50.000.000</p>
            </div>
          </div>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={32} total={38} />
    </div>
  );
}
