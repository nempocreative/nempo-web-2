import { useEffect, useRef, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const penilaian = [
  { kriteria: 'Public Speaking', bobot: '30%', bar: 30 },
  { kriteria: 'Wawasan Budaya',  bobot: '20%', bar: 20 },
  { kriteria: 'Wawasan UMKM',   bobot: '20%', bar: 20 },
  { kriteria: 'Kreativitas',     bobot: '15%', bar: 15 },
  { kriteria: 'Kepribadian',     bobot: '15%', bar: 15 },
];

const gelar = [
  { title: 'Duta Pasar Seni Garut Putra 2026', main: true },
  { title: 'Duta Pasar Seni Garut Putri 2026', main: true },
  { title: 'Duta Favorit',         main: false },
  { title: 'Duta Media Sosial',    main: false },
  { title: 'Duta Inspiratif',      main: false },
];

const tugas = [
  'Menjadi wajah Pasar Seni Garut',
  'Membantu promosi event',
  'Mengunjungi UMKM binaan',
  'Menjadi host pada kegiatan Nempo',
  'Membantu kampanye budaya dan ekonomi kreatif',
];

const benefit = [
  { label: 'Trophy',                    star: true  },
  { label: 'Selempang resmi',           star: false },
  { label: 'Sertifikat',                star: false },
  { label: 'Uang pembinaan',            star: true  },
  { label: 'Kontrak ambassador 1 tahun', star: true  },
  { label: 'Kesempatan menjadi talent promosi', star: false },
];

const sparks = [
  { left: '4%',  top: '25%', dur: '3.8s', delay: '0.3s' },
  { left: '97%', top: '20%', dur: '4.2s', delay: '1.2s' },
  { left: '50%', top: '85%', dur: '3.3s', delay: '0.8s' },
  { left: '75%', top: '12%', dur: '4.6s', delay: '2.1s' },
  { left: '25%', top: '78%', dur: '3.6s', delay: '1.6s' },
  { left: '88%', top: '65%', dur: '4.0s', delay: '0.5s' },
];

export default function Slide29DutaPenilaian() {
  const [go,       setGo]       = useState(false);
  const [barsFill, setBarsFill] = useState(false);
  const [hovBen,   setHovBen]   = useState<number | null>(null);
  const [hovGelar, setHovGelar] = useState<number | null>(null);
  const [hovTugas, setHovTugas] = useState<number | null>(null);
  const barTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setGo(true), 80);
    barTimer.current = setTimeout(() => setBarsFill(true), 750);
    return () => { clearTimeout(t1); if (barTimer.current) clearTimeout(barTimer.current); };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        /* ── background ── */
        @keyframes bgDrift29 {
          0%   { transform:scale(1.06) translate(0px,0px); }
          40%  { transform:scale(1.10) translate(-9px,-6px); }
          100% { transform:scale(1.06) translate(0px,0px); }
        }

        /* ── sparks ── */
        @keyframes spark29 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.55; }
          68%  { transform:scale(1.8) rotate(215deg); opacity:0.22; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }

        /* ── scan line ── */
        @keyframes scan29 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── top bar ── */
        @keyframes barPulse29 {
          0%,100% { opacity:1; }
          50%     { opacity:0.40; }
        }

        /* ── entrance ── */
        @keyframes fadeUp29 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn29 {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes growX29 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes slideLeft29 {
          from { opacity:0; transform:translateX(2.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── progress bar fill ── */
        @keyframes barFill29 {
          from { width:0%; }
          to   { width:var(--bar-w); }
        }

        /* ── bar shimmer ── */
        @keyframes barShimmer29 {
          0%   { background-position:-200% 0; }
          100% { background-position:200%  0; }
        }

        /* ── bobot number count-up feel ── */
        @keyframes bobotPop29 {
          0%   { opacity:0; transform:scale(0.7) translateY(0.5cqh); }
          60%  { transform:scale(1.12) translateY(-0.1cqh); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }

        /* ── dot pulse ── */
        @keyframes dotPulse29 {
          0%,100% { transform:scale(1);   opacity:0.65; }
          50%     { transform:scale(1.7); opacity:1; box-shadow:0 0 0.6cqw rgba(212,160,23,0.55); }
        }

        /* ── gelar trophy wobble ── */
        @keyframes trophyWobble29 {
          0%,85%,100% { transform:rotate(0deg) scale(1); }
          88%          { transform:rotate(-14deg) scale(1.18); }
          93%          { transform:rotate(10deg)  scale(1.12); }
        }

        /* ── divider pulse ── */
        @keyframes divPulse29 {
          0%,100% { opacity:0.15; }
          50%     { opacity:0.40; }
        }

        /* ── benefit card glow ── */
        @keyframes benefitIdle29 {
          0%,100% { border-color:rgba(212,160,23,0.20); box-shadow:none; }
          50%     { border-color:rgba(212,160,23,0.38); box-shadow:0 0 1.2cqw rgba(212,160,23,0.08); }
        }

        /* ── star benefit pulse ── */
        @keyframes starGlow29 {
          0%,100% { box-shadow:none; }
          50%     { box-shadow:0 0 1.8cqw rgba(212,160,23,0.20); }
        }

        /* ── right panel shimmer ── */
        @keyframes panelShimmer29 {
          0%   { background-position:0% 50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }

        /* ── label breathing ── */
        @keyframes labelBreath29 {
          0%,100% { opacity:0.65; letter-spacing:0.32em; }
          50%     { opacity:0.95; letter-spacing:0.38em; }
        }

        /* ── row in from left ── */
        @keyframes rowL29 {
          from { opacity:0; transform:translateX(-1.2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes rowR29 {
          from { opacity:0; transform:translateX(1.2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
      `}</style>

      {/* ── Background texture ── */}
      <img
        src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.08, animation: 'bgDrift29 26s ease-in-out infinite' }}
        alt="" aria-hidden="true"
      />

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.44cqw', height: '0.44cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark29 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan29 14s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh',
        background: 'linear-gradient(to right, transparent 0%, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent 100%)',
        animation: 'barPulse29 4.5s ease-in-out infinite', zIndex: 10,
      }} />

      {/* ══════════════════════════════════════════
          COLUMN 1 — Penilaian + Gelar
      ══════════════════════════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '7.5cqh 4cqw 6.5cqh', width: '38%',
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp29 0.65s cubic-bezier(0.22,1,0.36,1) 0.12s both' : 'none',
      }}>

        {/* Label: Penilaian */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '2cqh' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.95cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            animation: 'labelBreath29 4s ease-in-out 1s infinite',
            letterSpacing: '0.32em',
          }}>Penilaian</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX29 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }} />
        </div>

        {/* Criteria bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2cqh', marginBottom: '3cqh' }}>
          {penilaian.map((p, i) => (
            <div key={i} style={{
              opacity: go ? 1 : 0,
              animation: go ? `rowL29 0.4s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.07}s both` : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3cqh', alignItems: 'baseline' }}>
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.28cqw',
                  color: 'rgba(245,230,195,0.76)',
                }}>{p.kriteria}</p>
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                  fontSize: '1.28cqw', color: '#D4A017',
                  animation: barsFill ? `bobotPop29 0.45s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.08}s both` : 'none',
                  opacity: barsFill ? 1 : 0,
                }}>{p.bobot}</p>
              </div>
              {/* Track */}
              <div style={{
                width: '100%', height: '0.4cqh', borderRadius: '9999px',
                background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
              }}>
                {/* Fill */}
                <div style={{
                  height: '100%', borderRadius: '9999px',
                  background: 'linear-gradient(to right, rgba(212,160,23,0.55) 0%, #D4A017 60%, #f5c842 100%)',
                  backgroundSize: '200% 100%',
                  width: barsFill ? `${p.bar * 3}%` : '0%',
                  transition: barsFill ? `width 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s` : 'none',
                  animation: barsFill ? `barShimmer29 2.5s linear ${0.9 + i * 0.1}s infinite` : 'none',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Label: Gelar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '1.5cqh' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.95cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            animation: 'labelBreath29 4s ease-in-out 2s infinite',
            letterSpacing: '0.32em',
          }}>Gelar</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX29 0.8s cubic-bezier(0.22,1,0.36,1) 0.65s both' : 'none',
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55cqh' }}>
          {gelar.map((g, i) => {
            const isH = hovGelar === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovGelar(i)}
                onMouseLeave={() => setHovGelar(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.8cqw',
                  padding: '0.3cqh 0.5cqw',
                  borderRadius: '0.3cqw',
                  background: isH ? 'rgba(212,160,23,0.08)' : 'transparent',
                  transform: isH ? 'translateX(0.5cqw)' : 'translateX(0)',
                  transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                  opacity: go ? 1 : 0,
                  animation: go ? `rowL29 0.4s cubic-bezier(0.22,1,0.36,1) ${0.7 + i * 0.07}s both` : 'none',
                }}
              >
                <span style={{
                  fontSize: '1.2cqw',
                  display: 'inline-block',
                  animation: 'trophyWobble29 6s ease-in-out infinite',
                  animationDelay: `${i * 0.8}s`,
                }}>🏆</span>
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)',
                  fontSize: '1.22cqw', lineHeight: 1.3,
                  fontWeight: g.main ? 600 : 400,
                  color: isH
                    ? '#f5c842'
                    : g.main ? 'rgba(212,160,23,0.90)' : 'rgba(255,235,180,0.58)',
                  textShadow: isH ? '0 0 1.5cqw rgba(212,160,23,0.40)' : 'none',
                  transition: 'color 0.25s ease, text-shadow 0.25s ease',
                }}>{g.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Divider 1 ── */}
      <div style={{
        width: '0.05cqw', margin: '6cqh 0',
        background: 'linear-gradient(to bottom, transparent, rgba(212,160,23,0.30) 30%, rgba(212,160,23,0.30) 70%, transparent)',
        animation: 'divPulse29 4s ease-in-out infinite',
      }} />

      {/* ══════════════════════════════════════════
          COLUMN 2 — Tugas
      ══════════════════════════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '7.5cqh 3.5cqw 6.5cqh', width: '30%',
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp29 0.65s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '2cqh' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.95cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            animation: 'labelBreath29 4s ease-in-out 1.5s infinite',
            letterSpacing: '0.32em',
          }}>Tugas Duta</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX29 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both' : 'none',
          }} />
        </div>

        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.05cqw',
          color: 'rgba(245,230,195,0.35)', marginBottom: '1.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn29 0.4s ease 0.45s both' : 'none',
        }}>Selama 1 Tahun</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2cqh' }}>
          {tugas.map((t, i) => {
            const isH = hovTugas === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovTugas(i)}
                onMouseLeave={() => setHovTugas(null)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.8cqw',
                  transform: isH ? 'translateX(0.4cqw)' : 'translateX(0)',
                  transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                  opacity: go ? 1 : 0,
                  animation: go ? `rowL29 0.4s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.08}s both` : 'none',
                }}
              >
                <div style={{
                  width: '0.36cqw', height: '0.36cqw', borderRadius: '50%',
                  background: '#D4A017', flexShrink: 0, marginTop: '0.6cqh',
                  animation: `dotPulse29 3s ease-in-out ${1.2 + i * 0.35}s infinite`,
                }} />
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.28cqw', lineHeight: 1.4,
                  color: isH ? 'rgba(245,230,195,0.95)' : 'rgba(245,230,195,0.70)',
                  transition: 'color 0.25s ease',
                }}>{t}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Divider 2 ── */}
      <div style={{
        width: '0.05cqw', margin: '6cqh 0',
        background: 'linear-gradient(to bottom, transparent, rgba(212,160,23,0.30) 30%, rgba(212,160,23,0.30) 70%, transparent)',
        animation: 'divPulse29 4s ease-in-out 2s infinite',
      }} />

      {/* ══════════════════════════════════════════
          COLUMN 3 — Benefit
      ══════════════════════════════════════════ */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '7.5cqh 3.5cqw 6.5cqh',
        background: 'linear-gradient(135deg, #221208 0%, #1A0D06 100%)',
        position: 'relative', overflow: 'hidden',
        opacity: go ? 1 : 0,
        animation: go ? 'slideLeft29 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s both' : 'none',
      }}>

        {/* Panel ambient shimmer */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(212,160,23,0.04) 0%, transparent 60%, rgba(212,160,23,0.03) 100%)',
          backgroundSize: '300% 300%',
          animation: 'panelShimmer29 12s ease-in-out infinite',
        }} />
        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '10cqw', height: '10cqw',
          background: 'radial-gradient(circle at top right, rgba(212,160,23,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '2cqh', position: 'relative' }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.95cqw',
            color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
            animation: 'labelBreath29 4s ease-in-out 2.5s infinite',
            letterSpacing: '0.32em',
          }}>Benefit</span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX29 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both' : 'none',
          }} />
        </div>

        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.05cqw',
          color: 'rgba(245,230,195,0.32)', marginBottom: '1.5cqh', position: 'relative',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn29 0.4s ease 0.55s both' : 'none',
        }}>Pemenang</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2cqh', position: 'relative' }}>
          {benefit.map((b, i) => {
            const isH = hovBen === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovBen(i)}
                onMouseLeave={() => setHovBen(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1cqw',
                  padding: '0.8cqh 1.2cqw',
                  background: isH
                    ? 'rgba(212,160,23,0.16)'
                    : b.star ? 'rgba(212,160,23,0.09)' : 'rgba(212,160,23,0.05)',
                  border: `0.05cqw solid ${isH ? 'rgba(212,160,23,0.75)' : 'rgba(212,160,23,0.22)'}`,
                  transform: isH ? 'translateX(-0.4cqw) scale(1.02)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                  boxShadow: isH ? '0 0 1.8cqw rgba(212,160,23,0.22)' : 'none',
                  opacity: go ? 1 : 0,
                  animation: go
                    ? `rowR29 0.4s cubic-bezier(0.22,1,0.36,1) ${0.55 + i * 0.08}s both${b.star && !isH ? ', starGlow29 4s ease-in-out ' + (1.5 + i * 0.5) + 's infinite' : ''}`
                    : 'none',
                }}
              >
                <div style={{
                  width: '0.32cqw', height: '0.32cqw', borderRadius: '50%',
                  background: isH ? '#f5c842' : '#D4A017',
                  flexShrink: 0,
                  transition: 'background 0.25s ease',
                  boxShadow: isH ? '0 0 0.8cqw rgba(212,160,23,0.60)' : 'none',
                  animation: !isH ? `dotPulse29 3.5s ease-in-out ${1.8 + i * 0.4}s infinite` : 'none',
                }} />
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.28cqw', lineHeight: 1.3,
                  fontWeight: b.star ? 500 : 400,
                  color: isH
                    ? '#f5c842'
                    : b.star ? 'rgba(245,230,195,0.88)' : 'rgba(245,230,195,0.70)',
                  textShadow: isH ? '0 0 1.2cqw rgba(212,160,23,0.40)' : 'none',
                  transition: 'color 0.25s ease, text-shadow 0.25s ease',
                }}>{b.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={29} total={38} />
    </div>
  );
}
