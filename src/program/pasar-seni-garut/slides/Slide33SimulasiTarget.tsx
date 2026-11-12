import { useEffect, useRef, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const simulasi = [
  { ket: 'Biaya Pendaftaran',     calc: '50 × Rp300.000',   total: 'Rp15.000.000'  },
  { ket: 'Total Transaksi UMKM',  calc: 'Target',            total: 'Rp500.000.000' },
  { ket: 'Biaya Pengelolaan 10%', calc: 'Rp500 Juta × 10%', total: 'Rp50.000.000'  },
];

const proyeksi = [
  { umkm: '50 UMKM',  omzet: 'Rp7.000.000', total: 'Rp350.000.000', highlight: true  },
  { umkm: '70 UMKM',  omzet: 'Rp7.000.000', total: 'Rp490.000.000', highlight: false },
  { umkm: '80 UMKM',  omzet: 'Rp7.000.000', total: 'Rp560.000.000', highlight: false },
  { umkm: '100 UMKM', omzet: 'Rp7.000.000', total: 'Rp700.000.000', highlight: false },
];

const target = [
  { item: 'Durasi Event',              val: '3 Hari',        highlight: false },
  { item: 'Pengunjung',                val: '10.000 Orang',  highlight: false },
  { item: 'UMKM Terpilih',             val: '50 Tenant',     highlight: false },
  { item: 'Komunitas',                 val: '30 Komunitas',  highlight: false },
  { item: 'Sponsor Utama',             val: 'Juara',          highlight: false },
  { item: 'Sponsor Pendukung',         val: '10 Brand',      highlight: false },
  { item: 'Transaksi UMKM',            val: 'Rp500 Juta+',   highlight: true  },
  { item: 'Member UMKM Tahun Pertama', val: '100 UMKM',      highlight: false },
  { item: 'Program Tahunan',           val: 'Ya',            highlight: false },
];

const sparks = [
  { left: '4%',  top: '20%', dur: '3.7s', delay: '0.3s' },
  { left: '96%', top: '25%', dur: '4.2s', delay: '1.1s' },
  { left: '52%', top: '87%', dur: '3.4s', delay: '0.7s' },
  { left: '80%', top: '60%', dur: '4.5s', delay: '2.0s' },
  { left: '28%', top: '78%', dur: '3.9s', delay: '1.5s' },
  { left: '68%', top: '10%', dur: '3.3s', delay: '0.6s' },
];

export default function Slide33SimulasiTarget() {
  const [go,     setGo]     = useState(false);
  const [hovSim, setHovSim] = useState<number | null>(null);
  const [hovPro, setHovPro] = useState<number | null>(null);
  const [hovTgt, setHovTgt] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    timers.current = [t];
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        @keyframes bgDrift33 {
          0%   { transform:scale(1.06) translate(0px,0px); }
          40%  { transform:scale(1.10) translate(-9px,-6px); }
          100% { transform:scale(1.06) translate(0px,0px); }
        }
        @keyframes spark33 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.55; }
          68%  { transform:scale(1.8) rotate(215deg); opacity:0.22; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }
        @keyframes scan33 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
        @keyframes barPulse33 {
          0%,100% { opacity:1; }
          50%     { opacity:0.40; }
        }
        @keyframes barGrowY33 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }
        @keyframes fadeUp33 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn33 {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes growX33 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes rowInL33 {
          from { opacity:0; transform:translateX(-1.4cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes rowInR33 {
          from { opacity:0; transform:translateX(1.4cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        /* total pendapatan row */
        @keyframes totalRowGlow33 {
          0%,100% {
            background:linear-gradient(90deg,rgba(212,160,23,0.15) 0%,rgba(212,160,23,0.05) 100%);
            box-shadow:none;
          }
          50% {
            background:linear-gradient(90deg,rgba(212,160,23,0.26) 0%,rgba(212,160,23,0.09) 100%);
            box-shadow:inset 0 0 2.5cqw rgba(212,160,23,0.10);
          }
        }
        /* big money shimmer */
        @keyframes moneyShimmer33 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .money-shimmer33 {
          background: linear-gradient(90deg,
            #D4A017 0%, #fffbe8 22%, #f5c842 44%, #D4A017 66%, #fffbe8 88%, #D4A017 100%
          );
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: moneyShimmer33 3s ease infinite;
        }
        /* number pop */
        @keyframes numPop33 {
          0%   { opacity:0; transform:scale(0.55) translateY(0.5cqh); }
          60%  { transform:scale(1.12); }
          100% { opacity:1; transform:scale(1); }
        }
        /* proyeksi highlight pulse */
        @keyframes proHlPulse33 {
          0%,100% {
            background:linear-gradient(90deg,rgba(212,160,23,0.12) 0%,rgba(212,160,23,0.04) 100%);
            box-shadow:none;
          }
          50% {
            background:linear-gradient(90deg,rgba(212,160,23,0.22) 0%,rgba(212,160,23,0.08) 100%);
            box-shadow:inset 0 0 2cqw rgba(212,160,23,0.08);
          }
        }
        /* target highlight pulse */
        @keyframes tgtHlPulse33 {
          0%,100% {
            background:linear-gradient(90deg,rgba(212,160,23,0.14) 0%,rgba(212,160,23,0.04) 100%);
          }
          50% {
            background:linear-gradient(90deg,rgba(212,160,23,0.24) 0%,rgba(212,160,23,0.08) 100%);
          }
        }
        /* Rp500+ shimmer */
        .rp500-shimmer33 {
          background: linear-gradient(90deg,
            #D4A017 0%, #fffbe8 30%, #f5c842 50%, #D4A017 70%, #fffbe8 100%
          );
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: moneyShimmer33 2.8s ease infinite;
        }
        /* divider pulse */
        @keyframes divPulse33 {
          0%,100% { opacity:0.15; }
          50%     { opacity:0.42; }
        }
        /* label breath */
        @keyframes labelBreath33 {
          0%,100% { opacity:0.62; letter-spacing:0.28em; }
          50%     { opacity:0.96; letter-spacing:0.34em; }
        }
        /* section divider grow */
        @keyframes secDivPulse33 {
          0%,100% { opacity:0.25; transform:scaleX(1); }
          50%     { opacity:0.55; transform:scaleX(1.1); }
        }
      `}</style>

      {/* ── Background ── */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.08, animation: 'bgDrift33 26s ease-in-out infinite' }}
        alt="" aria-hidden="true" />

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.44cqw', height: '0.44cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark33 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan33 14s linear infinite',
        }} />
      </div>

      {/* ── Top bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh',
        background: 'linear-gradient(to right, transparent 0%, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent 100%)',
        animation: 'barPulse33 4.5s ease-in-out infinite', zIndex: 10,
      }} />

      {/* ── Left accent bar ── */}
      <div style={{
        width: '0.6cqw', flexShrink: 0, zIndex: 5,
        background: 'linear-gradient(to bottom, transparent 0%, #D4A017 15%, #D4A017 85%, transparent 100%)',
        transformOrigin: 'top',
        animation: go ? 'barGrowY33 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }} />

      {/* ══════════════════════════════════════════
          LEFT — Simulasi + Proyeksi
      ══════════════════════════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        padding: '7.5cqh 3.5cqw 6.5cqh', width: '52%',
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp33 0.65s cubic-bezier(0.22,1,0.36,1) 0.12s both' : 'none',
      }}>

        {/* ─ Simulasi section ─ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '1.2cqh' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.96cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            letterSpacing: '0.28em', animation: 'labelBreath33 4s ease-in-out 1s infinite',
          }}>Skenario 50 UMKM</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX33 0.8s cubic-bezier(0.22,1,0.36,1) 0.28s both' : 'none',
          }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 700,
          fontSize: '3.2cqw', lineHeight: 1.1, marginBottom: '2cqh',
          color: 'rgba(245,230,195,0.97)',
        }}>
          Simulasi <span style={{ color: '#D4A017' }}>Pendapatan</span>
        </h2>

        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '42% 30% 28%',
          padding: '0.7cqh 1cqw', marginBottom: '0.6cqh',
          background: 'rgba(212,160,23,0.10)',
          borderBottom: '0.05cqw solid rgba(212,160,23,0.30)',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn33 0.4s ease 0.30s both' : 'none',
        }}>
          {['Keterangan', 'Perhitungan', 'Total'].map(h => (
            <p key={h} style={{
              fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.90cqw',
              color: 'rgba(212,160,23,0.50)', textTransform: 'uppercase', letterSpacing: '0.15em',
            }}>{h}</p>
          ))}
        </div>

        {/* Simulasi rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4cqh', marginBottom: '0.8cqh' }}>
          {simulasi.map((r, i) => {
            const isH = hovSim === i;
            return (
              <div key={i}
                onMouseEnter={() => setHovSim(i)}
                onMouseLeave={() => setHovSim(null)}
                style={{
                  display: 'grid', gridTemplateColumns: '42% 30% 28%',
                  padding: '0.75cqh 1cqw',
                  background: isH ? 'rgba(212,160,23,0.09)' : i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  transform: isH ? 'translateX(0.3cqw)' : 'translateX(0)',
                  transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                  opacity: go ? 1 : 0,
                  animation: go ? `rowInL33 0.4s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.07}s both` : 'none',
                }}>
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.20cqw',
                  color: isH ? 'rgba(245,230,195,0.95)' : 'rgba(245,230,195,0.68)',
                  transition: 'color 0.22s ease',
                }}>{r.ket}</p>
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.12cqw',
                  color: isH ? 'rgba(245,230,195,0.60)' : 'rgba(245,230,195,0.42)',
                  transition: 'color 0.22s ease',
                }}>{r.calc}</p>
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 600,
                  fontSize: '1.20cqw',
                  color: isH ? '#f5c842' : 'rgba(212,160,23,0.82)',
                  textShadow: isH ? '0 0 1.2cqw rgba(212,160,23,0.40)' : 'none',
                  transition: 'color 0.22s ease, text-shadow 0.22s ease',
                }}>{r.total}</p>
              </div>
            );
          })}

          {/* Total row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '42% 30% 28%',
            padding: '1cqh 1cqw',
            borderLeft: '0.22cqw solid rgba(212,160,23,0.70)',
            opacity: go ? 1 : 0,
            animation: go
              ? `rowInL33 0.4s cubic-bezier(0.22,1,0.36,1) ${0.35 + simulasi.length * 0.07}s both, totalRowGlow33 3.5s ease-in-out 1.8s infinite`
              : 'none',
          }}>
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 700,
              fontSize: '1.22cqw', color: '#D4A017',
            }}>Total Pendapatan Ekosistem</p>
            <p />
            <p className="money-shimmer33" style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 700,
              fontSize: '1.32cqw',
              opacity: go ? 1 : 0,
              animation: go ? `numPop33 0.5s cubic-bezier(0.22,1,0.36,1) ${0.35 + (simulasi.length + 1) * 0.07}s both` : 'none',
            }}>Rp65.000.000</p>
          </div>
        </div>

        {/* ─ Proyeksi section ─ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', margin: '1.5cqh 0 1cqh' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.96cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            letterSpacing: '0.28em', animation: 'labelBreath33 4s ease-in-out 2s infinite',
          }}>Proyeksi Transaksi</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX33 0.8s cubic-bezier(0.22,1,0.36,1) 0.55s both' : 'none',
          }} />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '28% 36% 36%',
          padding: '0.6cqh 1cqw', marginBottom: '0.5cqh',
          background: 'rgba(212,160,23,0.08)',
          borderBottom: '0.05cqw solid rgba(212,160,23,0.25)',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn33 0.4s ease 0.58s both' : 'none',
        }}>
          {['Jumlah UMKM', 'Rata-rata Omzet', 'Total Transaksi'].map(h => (
            <p key={h} style={{
              fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.88cqw',
              color: 'rgba(212,160,23,0.50)', textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>{h}</p>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35cqh' }}>
          {proyeksi.map((r, i) => {
            const isH = hovPro === i;
            return (
              <div key={i}
                onMouseEnter={() => setHovPro(i)}
                onMouseLeave={() => setHovPro(null)}
                style={{
                  display: 'grid', gridTemplateColumns: '28% 36% 36%',
                  padding: '0.6cqh 1cqw',
                  borderLeft: r.highlight
                    ? `0.22cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.65)'}`
                    : isH ? '0.22cqw solid rgba(212,160,23,0.30)' : '0.22cqw solid transparent',
                  transform: isH ? 'translateX(0.3cqw)' : 'translateX(0)',
                  transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), background 0.22s ease',
                  background: isH
                    ? 'rgba(212,160,23,0.10)'
                    : undefined,
                  cursor: 'default',
                  opacity: go ? 1 : 0,
                  animation: go
                    ? r.highlight && !isH
                      ? `rowInL33 0.4s cubic-bezier(0.22,1,0.36,1) ${0.62 + i * 0.07}s both, proHlPulse33 4s ease-in-out 2s infinite`
                      : `rowInL33 0.4s cubic-bezier(0.22,1,0.36,1) ${0.62 + i * 0.07}s both`
                    : 'none',
                }}>
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.20cqw',
                  fontWeight: r.highlight ? 600 : 400,
                  color: isH
                    ? 'rgba(245,230,195,0.98)'
                    : r.highlight ? 'rgba(255,235,180,0.90)' : 'rgba(255,235,180,0.62)',
                  transition: 'color 0.22s ease',
                }}>{r.umkm}</p>
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.12cqw',
                  color: isH ? 'rgba(245,230,195,0.58)' : 'rgba(245,230,195,0.45)',
                  transition: 'color 0.22s ease',
                }}>{r.omzet}</p>
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 600,
                  fontSize: '1.20cqw',
                  color: isH ? '#f5c842' : r.highlight ? '#D4A017' : 'rgba(212,160,23,0.62)',
                  textShadow: (isH || r.highlight) ? '0 0 1.2cqw rgba(212,160,23,0.35)' : 'none',
                  transition: 'color 0.22s ease, text-shadow 0.22s ease',
                }}>{r.total}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{
        width: '0.05cqw', margin: '7.5cqh 0',
        background: 'linear-gradient(to bottom, transparent, rgba(212,160,23,0.32) 30%, rgba(212,160,23,0.32) 70%, transparent)',
        animation: 'divPulse33 4s ease-in-out infinite',
      }} />

      {/* ══════════════════════════════════════════
          RIGHT — Target 2026
      ══════════════════════════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        padding: '7.5cqh 3cqw 6.5cqh',
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp33 0.65s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '1.2cqh' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.96cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            letterSpacing: '0.28em', animation: 'labelBreath33 4s ease-in-out 1.5s infinite',
          }}>Target 2026</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX33 0.8s cubic-bezier(0.22,1,0.36,1) 0.38s both' : 'none',
          }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 700,
          fontSize: '3.2cqw', lineHeight: 1.1, marginBottom: '2cqh',
          color: 'rgba(245,230,195,0.97)',
        }}>
          Target<br /><span style={{ color: '#D4A017' }}>Pasar Seni Garut</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cqh' }}>
          {target.map((r, i) => {
            const isH = hovTgt === i;
            return (
              <div key={i}
                onMouseEnter={() => setHovTgt(i)}
                onMouseLeave={() => setHovTgt(null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.7cqh 1.2cqw',
                  borderLeft: r.highlight
                    ? `0.22cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.70)'}`
                    : isH ? '0.22cqw solid rgba(212,160,23,0.30)' : '0.22cqw solid transparent',
                  transform: isH ? 'translateX(0.3cqw)' : 'translateX(0)',
                  transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), background 0.22s ease',
                  background: isH
                    ? 'rgba(212,160,23,0.10)'
                    : undefined,
                  cursor: 'default',
                  opacity: go ? 1 : 0,
                  animation: go
                    ? r.highlight && !isH
                      ? `rowInR33 0.4s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.06}s both, tgtHlPulse33 4s ease-in-out 2s infinite`
                      : `rowInR33 0.4s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.06}s both`
                    : 'none',
                }}>
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.20cqw',
                  color: isH ? 'rgba(245,230,195,0.95)' : 'rgba(245,230,195,0.65)',
                  transition: 'color 0.22s ease',
                }}>{r.item}</p>

                {r.highlight ? (
                  <p className="rp500-shimmer33" style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                    fontSize: '1.22cqw',
                    opacity: go ? 1 : 0,
                    animation: go ? `numPop33 0.5s cubic-bezier(0.22,1,0.36,1) ${0.55 + i * 0.06}s both` : 'none',
                  }}>{r.val}</p>
                ) : (
                  <p style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 600,
                    fontSize: '1.20cqw',
                    color: isH ? '#f5c842' : 'rgba(255,235,180,0.78)',
                    textShadow: isH ? '0 0 1.2cqw rgba(212,160,23,0.40)' : 'none',
                    transition: 'color 0.22s ease, text-shadow 0.22s ease',
                  }}>{r.val}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Bottom summary box ── */}
        <div style={{
          marginTop: 'auto',
          padding: '2cqh 1.4cqw',
          border: '0.08cqw solid rgba(212,160,23,0.35)',
          borderLeft: '0.28cqw solid rgba(212,160,23,0.80)',
          background: 'linear-gradient(135deg, rgba(212,160,23,0.10) 0%, rgba(212,160,23,0.03) 100%)',
          backdropFilter: 'blur(4px)',
          opacity: go ? 1 : 0,
          animation: go
            ? `fadeUp33 0.55s cubic-bezier(0.22,1,0.36,1) ${0.38 + target.length * 0.06 + 0.15}s both, totalRowGlow33 4s ease-in-out 2.5s infinite`
            : 'none',
        }}>
          <p style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.84cqw',
            color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase',
            letterSpacing: '0.22em', marginBottom: '0.8cqh',
          }}>Estimasi Total Pendapatan Ekosistem</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2cqw', flexWrap: 'wrap' }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                color: 'rgba(245,230,195,0.45)', marginBottom: '0.3cqh',
              }}>Pendaftaran + Biaya Pengelolaan</p>
              <p style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                fontSize: '1.30cqw', color: '#D4A017',
              }}>Rp65.000.000</p>
            </div>
            <div style={{
              width: '0.06cqw', height: '3.5cqh',
              background: 'rgba(212,160,23,0.30)',
              flexShrink: 0,
            }} />
            <div>
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                color: 'rgba(245,230,195,0.45)', marginBottom: '0.3cqh',
              }}>Total Transaksi UMKM (Target)</p>
              <p className="rp500-shimmer33" style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                fontSize: '1.30cqw',
              }}>Rp500.000.000+</p>
            </div>
            <div style={{
              width: '0.06cqw', height: '3.5cqh',
              background: 'rgba(212,160,23,0.30)',
              flexShrink: 0,
            }} />
            <div>
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                color: 'rgba(245,230,195,0.45)', marginBottom: '0.3cqh',
              }}>Sponsor &amp; Partnership</p>
              <p style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                fontSize: '1.30cqw', color: 'rgba(212,160,23,0.80)',
              }}>Negosiasi</p>
            </div>
          </div>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={33} total={38} />
    </div>
  );
}
