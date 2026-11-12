import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const cara = [
  { metode: 'Tukar Uang Tunai',        nilai: 'Sesuai nominal',     note: false },
  { metode: 'Aktivasi Booth Juara',     nilai: 'Sesuai program',     note: false },
  { metode: 'Tukar Kemasan Juara',      nilai: 'Rp3.000 / Kemasan*', note: true  },
  { metode: 'Challenge Event',          nilai: 'Bonus Koin Juara',   note: false },
  { metode: 'Games & Aktivasi Sponsor', nilai: 'Bonus Koin Juara',   note: false },
];

const fungsi = [
  'Belanja Kuliner',
  'Belanja Produk UMKM',
  'Mengikuti Aktivasi Festival',
  "Mengikuti Voting People's Champion",
  'Redeem Merchandise',
];

const coinSparks = [
  { angle: 15,  r: '12.5cqw', dur: '4.2s', delay: '0s'   },
  { angle: 72,  r: '11.8cqw', dur: '3.6s', delay: '0.7s' },
  { angle: 135, r: '12.8cqw', dur: '5.0s', delay: '1.3s' },
  { angle: 200, r: '12.2cqw', dur: '3.9s', delay: '0.4s' },
  { angle: 270, r: '11.5cqw', dur: '4.5s', delay: '1.8s' },
  { angle: 330, r: '12.6cqw', dur: '3.4s', delay: '2.2s' },
];

const bgSparks = [
  { left: '58%', top: '12%', dur: '3.7s', delay: '0.5s' },
  { left: '92%', top: '30%', dur: '4.2s', delay: '1.2s' },
  { left: '75%', top: '80%', dur: '3.4s', delay: '0.8s' },
  { left: '42%', top: '88%', dur: '4.6s', delay: '2.0s' },
];

export default function Slide34KoinJuara() {
  const [go,     setGo]     = useState(false);
  const [hovRow, setHovRow] = useState<number | null>(null);
  const [hovFun, setHovFun] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">
      <style>{`
        /* ── spin ── */
        @keyframes spin34 { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes spinR34 { from { transform:rotate(0deg); } to { transform:rotate(-360deg); } }

        /* ── background ── */
        @keyframes bgDrift34 {
          0%   { transform:scale(1.06) translate(0px,0px); }
          40%  { transform:scale(1.09) translate(-7px,-5px); }
          100% { transform:scale(1.06) translate(0px,0px); }
        }

        /* ── ambient sparks ── */
        @keyframes spark34 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.55; }
          68%  { transform:scale(1.8) rotate(215deg); opacity:0.22; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }

        /* ── coin spark orbit ── */
        @keyframes coinSpark34 {
          0%   { opacity:0; transform:scale(0); }
          20%  { opacity:0.7; transform:scale(1); }
          80%  { opacity:0.4; }
          100% { opacity:0; transform:scale(0); }
        }

        /* ── scan line ── */
        @keyframes scan34 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── top/left bars ── */
        @keyframes barPulse34 {
          0%,100% { opacity:1; }
          50%     { opacity:0.38; }
        }
        @keyframes barGrowY34 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }

        /* ── coin bob ── */
        @keyframes coinBob34 {
          0%,100% { transform:translateY(0px) rotate(0deg); filter:drop-shadow(0 0 2.5cqw rgba(212,160,23,0.55)) drop-shadow(0 0.8cqw 1.5cqw rgba(0,0,0,0.7)); }
          50%     { transform:translateY(-10px) rotate(1.5deg); filter:drop-shadow(0 0 3.5cqw rgba(212,160,23,0.75)) drop-shadow(0 1.2cqw 2cqw rgba(0,0,0,0.7)); }
        }

        /* ── radial glow pulse ── */
        @keyframes radialPulse34 {
          0%,100% { opacity:0.85; transform:translate(-50%,-50%) scale(1); }
          50%     { opacity:1;    transform:translate(-50%,-50%) scale(1.15); }
        }

        /* ── label pill glow ── */
        @keyframes pillGlow34 {
          0%,100% { box-shadow:none; border-color:rgba(212,160,23,0.40); }
          50%     { box-shadow:0 0 1.5cqw rgba(212,160,23,0.25); border-color:rgba(212,160,23,0.75); }
        }
        @keyframes pillDot34 {
          0%,100% { transform:scale(1); box-shadow:none; }
          50%     { transform:scale(1.5); box-shadow:0 0 0.5cqw rgba(212,160,23,0.60); }
        }

        /* ── title shimmer ── */
        @keyframes titleShimmer34 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .koin-accent34 {
          background: linear-gradient(90deg,
            #D4A017 0%, #fffbe8 22%, #f5c842 44%, #D4A017 66%, #fffbe8 88%, #D4A017 100%
          );
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: titleShimmer34 3s ease infinite;
        }

        /* ── tagline drift ── */
        @keyframes taglineDrift34 {
          0%,100% { opacity:0.50; letter-spacing:0.01em; }
          50%     { opacity:0.75; letter-spacing:0.04em; }
        }

        /* ── description drift ── */
        @keyframes descDrift34 {
          0%,100% { opacity:0.48; }
          50%     { opacity:0.68; }
        }

        /* ── entrance ── */
        @keyframes fadeUp34 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn34 {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes growX34 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes coinReveal34 {
          from { opacity:0; transform:scale(0.82) translateY(3cqh); filter:brightness(0.3); }
          to   { opacity:1; transform:scale(1)    translateY(0);   filter:brightness(1); }
        }
        @keyframes rowIn34 {
          from { opacity:0; transform:translateX(1.4cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes cardPop34 {
          0%   { opacity:0; transform:translateY(1.5cqh) scale(0.92); }
          60%  { transform:translateY(-0.3cqh) scale(1.02); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── accent bar ── */
        @keyframes sectionBarPulse34 {
          0%,100% { opacity:1;   height:2.5cqh; }
          50%     { opacity:0.6; height:2.0cqh; }
        }

        /* ── label breath ── */
        @keyframes labelBreath34 {
          0%,100% { opacity:0.62; letter-spacing:0.28em; }
          50%     { opacity:0.96; letter-spacing:0.34em; }
        }

        /* ── table row highlight ── */
        @keyframes tableRowGlow34 {
          0%,100% { box-shadow:none; }
          50%     { box-shadow:inset 0 0 2cqw rgba(212,160,23,0.07); }
        }

        /* ── fungsi card idle glow ── */
        @keyframes cardIdle34 {
          0%,100% { border-color:rgba(212,160,23,0.18); box-shadow:none; }
          50%     { border-color:rgba(212,160,23,0.38); box-shadow:0 0 1.2cqw rgba(212,160,23,0.10); }
        }

        /* ── check icon pop ── */
        @keyframes checkPop34 {
          0%   { opacity:0; transform:scale(0.4) rotate(-20deg); }
          60%  { transform:scale(1.15) rotate(5deg); }
          100% { opacity:1; transform:scale(1) rotate(0deg); }
        }

        /* ── horizontal divider pulse ── */
        @keyframes hDivPulse34 {
          0%,100% { opacity:0.15; }
          50%     { opacity:0.42; }
        }
      `}</style>

      {/* ── Background texture ── */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.07, animation: 'bgDrift34 28s ease-in-out infinite' }}
        alt="" aria-hidden="true" />

      {/* ── BG ambient sparks ── */}
      {bgSparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.44cqw', height: '0.44cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark34 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan34 15s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh', zIndex: 10,
        background: 'linear-gradient(to right, transparent 0%, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent 100%)',
        animation: 'barPulse34 4.5s ease-in-out infinite',
      }} />

      {/* ── Left gold sidebar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '0.5cqw', zIndex: 5,
        background: 'linear-gradient(to bottom, transparent 0%, #D4A017 15%, #D4A017 85%, transparent 100%)',
        transformOrigin: 'top',
        animation: go ? 'barGrowY34 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }} />

      {/* ── Radial glow behind coin ── */}
      <div style={{
        position: 'absolute', left: '13%', top: '50%',
        width: '44cqw', height: '44cqw',
        background: 'radial-gradient(circle, rgba(212,160,23,0.20) 0%, rgba(212,160,23,0.06) 50%, transparent 72%)',
        pointerEvents: 'none', zIndex: 1,
        animation: 'radialPulse34 5s ease-in-out infinite',
      }} />

      {/* ── Main layout ── */}
      <div className="relative flex w-full h-full" style={{ paddingLeft: '0.5cqw' }}>

        {/* ════════════════════════════════
            LEFT — Coin Hero
        ════════════════════════════════ */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          width: '36%', padding: '0 2.5cqw',
          background: 'linear-gradient(150deg, #221505 0%, #130B03 60%, #0C0701 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Panel shimmer */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(212,160,23,0.04) 0%, transparent 60%, rgba(212,160,23,0.03) 100%)',
            backgroundSize: '300% 300%',
            animation: 'titleShimmer34 14s ease-in-out infinite',
          }} />

          {/* Label pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.6cqw',
            padding: '0.5cqh 1.2cqw', marginBottom: '2.5cqh',
            background: 'rgba(212,160,23,0.12)',
            border: '0.07cqw solid rgba(212,160,23,0.40)',
            borderRadius: '999px', position: 'relative',
            opacity: go ? 1 : 0,
            animation: go ? 'fadeIn34 0.5s ease 0.15s both, pillGlow34 3.5s ease-in-out 1.5s infinite' : 'none',
          }}>
            <div style={{
              width: '0.45cqw', height: '0.45cqw', borderRadius: '50%', background: '#D4A017',
              animation: 'pillDot34 2.8s ease-in-out 1.8s infinite',
            }} />
            <p style={{
              fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.75cqw',
              color: '#D4A017', textTransform: 'uppercase', letterSpacing: '0.30em',
            }}>Alat Transaksi Resmi</p>
          </div>

          {/* Coin */}
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '2.5cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'coinReveal34 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
          }}>
            {/* Outer slow spin ring */}
            <div style={{
              position: 'absolute', borderRadius: '50%',
              width: '22cqw', height: '22cqw',
              background: 'conic-gradient(from 0deg, rgba(212,160,23,0.28), transparent 38%, rgba(212,160,23,0.18), transparent 68%, rgba(212,160,23,0.28))',
              animation: 'spin34 14s linear infinite',
            }} />
            {/* Inner counter-spin ring */}
            <div style={{
              position: 'absolute', borderRadius: '50%',
              width: '19.5cqw', height: '19.5cqw',
              background: 'conic-gradient(from 90deg, transparent, rgba(212,160,23,0.10) 25%, transparent 50%, rgba(212,160,23,0.08) 75%, transparent)',
              animation: 'spinR34 20s linear infinite',
            }} />
            {/* Pulsing glow ring */}
            <div style={{
              position: 'absolute', borderRadius: '50%',
              width: '20cqw', height: '20cqw',
              border: '0.08cqw solid rgba(212,160,23,0.20)',
              animation: 'radialPulse34 3.5s ease-in-out infinite',
            }} />

            {/* Coin sparks orbiting */}
            {coinSparks.map((s, i) => {
              const rad = (s.angle * Math.PI) / 180;
              const x = `calc(50% + ${Math.cos(rad) * 10.5}cqw - 0.22cqw)`;
              const y = `calc(50% + ${Math.sin(rad) * 10.5}cqw - 0.22cqw)`;
              return (
                <div key={i} style={{
                  position: 'absolute', left: x, top: y,
                  width: '0.44cqw', height: '0.44cqw', borderRadius: '50%',
                  background: '#D4A017', boxShadow: '0 0 0.7cqw rgba(212,160,23,0.70)',
                  animation: `coinSpark34 ${s.dur} ease-in-out ${s.delay} infinite`,
                  pointerEvents: 'none',
                }} />
              );
            })}

            {/* Coin image */}
            <img
              src={`${base}koin-juara2.webp?v=2`}
              alt="Koin Juara"
              style={{
                width: '19cqw', height: '19cqw', objectFit: 'contain',
                position: 'relative', zIndex: 1,
                animation: 'coinBob34 5s ease-in-out infinite',
              }}
            />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-display,serif)', fontWeight: 900,
            fontSize: '4.5cqw', lineHeight: 0.9, letterSpacing: '-0.02em',
            textAlign: 'center', marginBottom: '0.8cqh', color: 'rgba(245,230,195,0.97)',
            opacity: go ? 1 : 0,
            animation: go ? 'fadeUp34 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both' : 'none',
          }}>
            KOIN<br /><span className="koin-accent34">JUARA</span>
          </h2>

          {/* Tagline */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.8cqw', marginTop: '1.2cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'fadeIn34 0.5s ease 0.65s both' : 'none',
          }}>
            <div style={{
              height: '0.1cqh', width: '2cqw',
              background: 'linear-gradient(to left, rgba(212,160,23,0.45), transparent)',
              transformOrigin: 'right',
              animation: go ? 'growX34 0.6s cubic-bezier(0.22,1,0.36,1) 0.7s both' : 'none',
            }} />
            <p style={{
              fontFamily: 'var(--font-display,serif)', fontStyle: 'italic',
              fontSize: '1.05cqw', color: 'rgba(245,230,195,0.52)', textAlign: 'center',
              animation: 'taglineDrift34 4.5s ease-in-out 2s infinite',
            }}>"Dari Juara Untuk Para Juara"</p>
            <div style={{
              height: '0.1cqh', width: '2cqw',
              background: 'linear-gradient(to right, rgba(212,160,23,0.45), transparent)',
              transformOrigin: 'left',
              animation: go ? 'growX34 0.6s cubic-bezier(0.22,1,0.36,1) 0.7s both' : 'none',
            }} />
          </div>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.95cqw', lineHeight: 1.7,
            maxWidth: '24cqw', textAlign: 'center', marginTop: '2.2cqh',
            color: 'rgba(245,230,195,0.50)',
            animation: 'descDrift34 6s ease-in-out 2.5s infinite',
            opacity: go ? 1 : 0,
            animationFillMode: 'both',
          } as React.CSSProperties}>
            Alat transaksi eksklusif Pasar Seni Garut — berlaku di seluruh tenant UMKM selama acara berlangsung.
          </p>
        </div>

        {/* ════════════════════════════════
            RIGHT — Info panels
        ════════════════════════════════ */}
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1,
          padding: '8cqh 3cqw 6.5cqh', gap: '3cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp34 0.65s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
        }}>

          {/* ── Cara Mendapatkan ── */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2cqw', marginBottom: '1.8cqh' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5cqw' }}>
                <div style={{
                  width: '0.3cqw', borderRadius: '999px', background: '#D4A017',
                  animation: 'sectionBarPulse34 3s ease-in-out 1.2s infinite',
                  height: '2.5cqh',
                }} />
                <span style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                  color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
                  letterSpacing: '0.28em',
                  animation: 'labelBreath34 4s ease-in-out 1s infinite',
                }}>Cara Mendapatkan</span>
              </div>
              <div style={{
                flex: 1, height: '0.08cqh',
                background: 'linear-gradient(to right, rgba(212,160,23,0.30), transparent)',
                transformOrigin: 'left',
                animation: go ? 'growX34 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both' : 'none',
              }} />
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display,serif)', fontWeight: 700,
              fontSize: '2.2cqw', lineHeight: 1.05, marginBottom: '2cqh',
              color: 'rgba(245,230,195,0.97)',
            }}>
              Koin <span style={{ color: '#D4A017' }}>Juara</span>
            </h3>

            {/* Table */}
            <div style={{
              border: '0.07cqw solid rgba(212,160,23,0.22)', borderRadius: '0.4cqw', overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '58% 42%',
                padding: '0.8cqh 1.2cqw',
                background: 'rgba(212,160,23,0.12)',
                borderBottom: '0.07cqw solid rgba(212,160,23,0.25)',
              }}>
                {['Metode', 'Nilai'].map(h => (
                  <p key={h} style={{
                    fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.72cqw',
                    color: 'rgba(212,160,23,0.60)', textTransform: 'uppercase', letterSpacing: '0.18em',
                  }}>{h}</p>
                ))}
              </div>
              {/* Rows */}
              {cara.map((r, i) => {
                const isH = hovRow === i;
                return (
                  <div key={i}
                    onMouseEnter={() => setHovRow(i)}
                    onMouseLeave={() => setHovRow(null)}
                    style={{
                      display: 'grid', gridTemplateColumns: '58% 42%',
                      alignItems: 'center', padding: '0.9cqh 1.2cqw',
                      background: isH
                        ? 'rgba(212,160,23,0.10)'
                        : i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                      borderBottom: i < cara.length - 1 ? '0.05cqw solid rgba(255,255,255,0.05)' : 'none',
                      borderLeft: isH ? '0.2cqw solid rgba(212,160,23,0.60)' : '0.2cqw solid transparent',
                      transform: isH ? 'translateX(0.25cqw)' : 'translateX(0)',
                      transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                      cursor: 'default',
                      opacity: go ? 1 : 0,
                      animation: go ? `rowIn34 0.4s cubic-bezier(0.22,1,0.36,1) ${0.45 + i * 0.07}s both` : 'none',
                    }}>
                    <p style={{
                      fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.05cqw',
                      color: isH ? 'rgba(245,230,195,0.95)' : 'rgba(245,230,195,0.74)',
                      transition: 'color 0.22s ease',
                    }}>{r.metode}</p>
                    <p style={{
                      fontFamily: 'var(--font-display,serif)', fontWeight: 600,
                      fontSize: '1.05cqw',
                      color: isH ? '#f5c842' : '#D4A017',
                      textShadow: isH ? '0 0 1.2cqw rgba(212,160,23,0.45)' : 'none',
                      transition: 'color 0.22s ease, text-shadow 0.22s ease',
                    }}>{r.nilai}</p>
                  </div>
                );
              })}
            </div>

            <p style={{
              fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
              fontStyle: 'italic', color: 'rgba(245,230,195,0.28)',
              marginTop: '0.8cqh', paddingLeft: '0.5cqw',
              opacity: go ? 1 : 0,
              animation: go ? 'fadeIn34 0.4s ease 0.9s both' : 'none',
            }}>* Mengikuti mekanisme yang disetujui sponsor.</p>
          </div>

          {/* Divider */}
          <div style={{
            height: '0.08cqh',
            background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.30) 20%, rgba(212,160,23,0.30) 80%, transparent)',
            animation: 'hDivPulse34 4s ease-in-out infinite',
          }} />

          {/* ── Fungsi Koin Juara ── */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2cqw', marginBottom: '1.8cqh' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5cqw' }}>
                <div style={{
                  width: '0.3cqw', borderRadius: '999px', background: '#D4A017',
                  animation: 'sectionBarPulse34 3s ease-in-out 2s infinite',
                  height: '2.5cqh',
                }} />
                <span style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                  color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
                  letterSpacing: '0.28em',
                  animation: 'labelBreath34 4s ease-in-out 2s infinite',
                }}>Fungsi Koin Juara</span>
              </div>
              <div style={{
                flex: 1, height: '0.08cqh',
                background: 'linear-gradient(to right, rgba(212,160,23,0.30), transparent)',
                transformOrigin: 'left',
                animation: go ? 'growX34 0.8s cubic-bezier(0.22,1,0.36,1) 0.7s both' : 'none',
              }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9cqh' }}>
              {fungsi.map((f, i) => {
                const isH = hovFun === i;
                const isLast = i === fungsi.length - 1;
                return (
                  <div key={i}
                    onMouseEnter={() => setHovFun(i)}
                    onMouseLeave={() => setHovFun(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.9cqw',
                      padding: '0.95cqh 1.1cqw',
                      background: isH ? 'rgba(212,160,23,0.12)' : 'rgba(212,160,23,0.05)',
                      border: `0.07cqw solid ${isH ? 'rgba(212,160,23,0.55)' : 'rgba(212,160,23,0.18)'}`,
                      borderRadius: '0.35cqw',
                      gridColumn: isLast ? '1 / -1' : 'auto',
                      transform: isH ? 'translateY(-0.3cqh) scale(1.015)' : 'scale(1)',
                      transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                      cursor: 'default',
                      boxShadow: isH ? '0 0.5cqh 1.5cqw rgba(212,160,23,0.18)' : 'none',
                      opacity: go ? 1 : 0,
                      animation: go
                        ? `cardPop34 0.45s cubic-bezier(0.22,1,0.36,1) ${0.75 + i * 0.08}s both${!isH ? ', cardIdle34 4s ease-in-out ' + (2 + i * 0.5) + 's infinite' : ''}`
                        : 'none',
                    }}>
                    <div style={{
                      flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%', width: '1.6cqw', height: '1.6cqw',
                      background: isH ? 'rgba(212,160,23,0.25)' : 'rgba(212,160,23,0.15)',
                      border: `0.07cqw solid ${isH ? 'rgba(212,160,23,0.70)' : 'rgba(212,160,23,0.35)'}`,
                      transition: 'all 0.22s ease',
                      boxShadow: isH ? '0 0 0.8cqw rgba(212,160,23,0.40)' : 'none',
                      animation: go ? `checkPop34 0.38s cubic-bezier(0.22,1,0.36,1) ${0.8 + i * 0.08}s both` : 'none',
                    }}>
                      <svg viewBox="0 0 16 16" style={{ width: '0.8cqw', height: '0.8cqw' }} fill="none">
                        <polyline points="3,8 6.5,11.5 13,4.5"
                          stroke={isH ? '#f5c842' : '#D4A017'}
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.05cqw',
                      color: isH ? 'rgba(245,230,195,0.96)' : 'rgba(245,230,195,0.78)',
                      transition: 'color 0.22s ease',
                    }}>{f}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={34} total={38} />
    </div>
  );
}
