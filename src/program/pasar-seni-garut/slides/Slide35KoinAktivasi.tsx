import { useEffect, useState } from 'react';
import { Target, Search, Trophy } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const flow = [
  { no: '01', label: 'Datang ke Pasar Seni' },
  { no: '02', label: 'Menukar uang menjadi Koin Juara' },
  { no: '03', label: 'Berbelanja di tenant UMKM' },
  { no: '04', label: 'Mengumpulkan stempel transaksi' },
  { no: '05', label: 'Ikut memilih UMKM Champion' },
  { no: '06', label: 'Menjadi bagian dari Festival Para Juara' },
];

const aktivasi = [
  {
    nama: 'KOIN JUARA CHALLENGE',
    Icon: Target,
    highlight: false,
    steps: ['Belanja di 5 tenant berbeda', 'Kumpulkan stempel', 'Tukar hadiah eksklusif'],
  },
  {
    nama: 'KOIN JUARA HUNT',
    Icon: Search,
    highlight: false,
    steps: ['Kumpulkan Koin Juara terbanyak dari aktivitas sponsor', 'Menangkan undian hadiah utama'],
  },
  {
    nama: "PEOPLE'S CHAMPION VOTE",
    Icon: Trophy,
    highlight: true,
    steps: [
      'Setiap pengunjung mendapat 1 Koin Juara Voting',
      'Koin dimasukkan ke kotak UMKM favorit',
      "Pemenang raih People's Champion Award",
    ],
  },
];

const sparks = [
  { left: '42%', top: '10%', dur: '3.7s', delay: '0.4s' },
  { left: '95%', top: '22%', dur: '4.2s', delay: '1.1s' },
  { left: '70%', top: '85%', dur: '3.4s', delay: '0.8s' },
  { left: '88%', top: '58%', dur: '4.5s', delay: '2.0s' },
];

export default function Slide35KoinAktivasi() {
  const [go,     setGo]     = useState(false);
  const [hovCard, setHovCard] = useState<number | null>(null);
  const [hovStep, setHovStep] = useState<number | null>(null);
  const [hovFlow, setHovFlow] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">
      <style>{`
        /* ── background ── */
        @keyframes bgDrift35 {
          0%   { transform:scale(1.06) translate(0,0); }
          40%  { transform:scale(1.09) translate(-7px,-5px); }
          100% { transform:scale(1.06) translate(0,0); }
        }
        /* ── sparks ── */
        @keyframes spark35 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.55; }
          68%  { transform:scale(1.8) rotate(215deg); opacity:0.22; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }
        /* ── scan ── */
        @keyframes scan35 { from { transform:translateY(-100%); } to { transform:translateY(100cqh); } }
        /* ── bars ── */
        @keyframes barPulse35 { 0%,100% { opacity:1; } 50% { opacity:0.38; } }
        @keyframes barGrowY35 { from { transform:scaleY(0); } to { transform:scaleY(1); } }
        /* ── entrance ── */
        @keyframes fadeUp35 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn35 { from { opacity:0; } to { opacity:1; } }
        @keyframes growX35  { from { transform:scaleX(0); } to { transform:scaleX(1); } }
        @keyframes slideL35 {
          from { opacity:0; transform:translateX(-1.8cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes cardRise35 {
          from { opacity:0; transform:translateY(2cqh) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        /* ── connector line draw ── */
        @keyframes lineGrow35 { from { transform:scaleY(0); } to { transform:scaleY(1); } }
        /* ── node dot pulse ── */
        @keyframes nodePulse35 {
          0%,100% { box-shadow:0 0 0 0 rgba(212,160,23,0.55); }
          50%     { box-shadow:0 0 0 0.5cqw rgba(212,160,23,0); }
        }
        /* ── coin ── */
        @keyframes coinBob35 {
          0%,100% { transform:translateY(0); filter:drop-shadow(0 0 1.8cqw rgba(212,160,23,0.52)) drop-shadow(0 0.5cqw 1cqw rgba(0,0,0,0.6)); }
          50%     { transform:translateY(-6px); filter:drop-shadow(0 0 2.6cqw rgba(212,160,23,0.72)) drop-shadow(0 0.8cqw 1.4cqw rgba(0,0,0,0.6)); }
        }
        @keyframes coinReveal35 {
          from { opacity:0; transform:scale(0.75) rotate(-8deg); }
          to   { opacity:1; transform:scale(1)    rotate(0deg); }
        }
        @keyframes coinGlow35 {
          0%,100% { opacity:0.75; transform:scale(1.4); }
          50%     { opacity:1;    transform:scale(1.6); }
        }
        /* ── pill ── */
        @keyframes pillGlow35 {
          0%,100% { box-shadow:none; border-color:rgba(212,160,23,0.35); }
          50%     { box-shadow:0 0 1.5cqw rgba(212,160,23,0.22); border-color:rgba(212,160,23,0.70); }
        }
        @keyframes pillDot35 {
          0%,100% { transform:scale(1); }
          50%     { transform:scale(1.55); box-shadow:0 0 0.5cqw rgba(212,160,23,0.60); }
        }
        /* ── section bar pulse ── */
        @keyframes sBarPulse35 {
          0%,100% { height:2.5cqh; opacity:1; }
          50%     { height:2.0cqh; opacity:0.55; }
        }
        /* ── label breath ── */
        @keyframes lblBreath35 {
          0%,100% { opacity:0.62; letter-spacing:0.28em; }
          50%     { opacity:0.96; letter-spacing:0.34em; }
        }
        /* ── card top border grow ── */
        @keyframes topBorderGrow35 { from { width:0; } to { width:100%; } }
        /* ── highlight card glow ── */
        @keyframes hlCardGlow35 {
          0%,100% {
            background:linear-gradient(135deg,rgba(212,160,23,0.13) 0%,rgba(212,160,23,0.04) 100%);
            box-shadow:none;
          }
          50% {
            background:linear-gradient(135deg,rgba(212,160,23,0.22) 0%,rgba(212,160,23,0.08) 100%);
            box-shadow:0 0 2.5cqw rgba(212,160,23,0.15);
          }
        }
        /* ── trophy wobble ── */
        @keyframes trophyWobble35 {
          0%,100% { transform:rotate(0deg) scale(1); }
          20%     { transform:rotate(-12deg) scale(1.15); }
          40%     { transform:rotate(10deg) scale(1.1); }
          60%     { transform:rotate(-7deg) scale(1.08); }
          80%     { transform:rotate(5deg) scale(1.04); }
        }
        /* ── arrow flow ── */
        @keyframes arrowFlow35 {
          0%,100% { opacity:0.35; transform:translateX(0); }
          50%     { opacity:0.80; transform:translateX(0.3cqw); }
        }
        /* ── step chip hover ── */
        /* handled inline */
        /* ── card title shimmer ── */
        @keyframes hlTitleShimmer35 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .hl-title35 {
          background:linear-gradient(90deg,#D4A017 0%,#fffbe8 22%,#f5c842 44%,#D4A017 66%,#fffbe8 88%,#D4A017 100%);
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:hlTitleShimmer35 3s ease infinite;
        }
        /* ── panel shimmer ── */
        @keyframes panelShimmer35 {
          0%   { background-position:0% 50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }
        /* ── flow label drift ── */
        @keyframes flowLblDrift35 {
          0%,100% { opacity:0.50; letter-spacing:0.22em; }
          50%     { opacity:0.80; letter-spacing:0.28em; }
        }
        /* ── title accent shimmer ── */
        .prog-accent35 {
          background:linear-gradient(90deg,#D4A017 0%,#fffbe8 30%,#f5c842 50%,#D4A017 70%,#fffbe8 100%);
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:hlTitleShimmer35 3.5s ease infinite;
        }
      `}</style>

      {/* ── Background ── */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.07, animation: 'bgDrift35 28s ease-in-out infinite' }}
        alt="" aria-hidden="true" />

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.44cqw', height: '0.44cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark35 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan35 15s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh', zIndex: 10,
        background: 'linear-gradient(to right, transparent 0%, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent 100%)',
        animation: 'barPulse35 4.5s ease-in-out infinite',
      }} />

      {/* ── Left accent bar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '0.5cqw', zIndex: 5,
        background: 'linear-gradient(to bottom, transparent 0%, #D4A017 15%, #D4A017 85%, transparent 100%)',
        transformOrigin: 'top',
        animation: go ? 'barGrowY35 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }} />

      {/* ── Main layout ── */}
      <div className="relative flex w-full h-full" style={{ paddingLeft: '0.5cqw' }}>

        {/* ════════════════════════════════
            LEFT — Coin Hero + Flow
        ════════════════════════════════ */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          width: '40%', padding: '7.5cqh 3cqw 6.5cqh',
          background: 'linear-gradient(150deg, #221505 0%, #130B03 60%, #0C0701 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Panel shimmer */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(212,160,23,0.04) 0%, transparent 60%, rgba(212,160,23,0.03) 100%)',
            backgroundSize: '300% 300%',
            animation: 'panelShimmer35 14s ease-in-out infinite',
          }} />

          {/* Coin + Title row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '2cqw', marginBottom: '3.5cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'slideL35 0.65s cubic-bezier(0.22,1,0.36,1) 0.12s both' : 'none',
          }}>
            {/* Coin */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,160,23,0.28) 0%, transparent 75%)',
                animation: 'coinGlow35 4s ease-in-out infinite',
              }} />
              <img src={`${base}koin-juara2.webp?v=2`} alt="Koin Juara"
                style={{
                  width: '10cqw', height: '10cqw', objectFit: 'contain',
                  position: 'relative', zIndex: 1,
                  animation: go
                    ? 'coinReveal35 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both, coinBob35 5s ease-in-out 1s infinite'
                    : 'none',
                }}
              />
            </div>

            {/* Title block */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5cqw',
                padding: '0.35cqh 0.9cqw', marginBottom: '0.8cqh',
                background: 'rgba(212,160,23,0.12)',
                border: '0.07cqw solid rgba(212,160,23,0.35)',
                borderRadius: '999px',
                animation: 'pillGlow35 3.5s ease-in-out 1.5s infinite',
              }}>
                <div style={{
                  width: '0.35cqw', height: '0.35cqw', borderRadius: '50%', background: '#D4A017',
                  animation: 'pillDot35 2.8s ease-in-out 2s infinite',
                }} />
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.7cqw',
                  color: '#D4A017', textTransform: 'uppercase', letterSpacing: '0.28em',
                }}>Program Aktivasi</p>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 900,
                fontSize: '3.2cqw', lineHeight: 0.95, letterSpacing: '-0.02em',
                color: 'rgba(245,230,195,0.97)',
              }}>
                KOIN<br /><span style={{ color: '#D4A017' }}>JUARA</span>
              </h2>
            </div>
          </div>

          {/* Flow label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1.2cqw', marginBottom: '2.5cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'fadeIn35 0.5s ease 0.3s both' : 'none',
          }}>
            <p style={{
              fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.72cqw',
              color: 'rgba(212,160,23,0.50)', textTransform: 'uppercase',
              flexShrink: 0,
              animation: 'flowLblDrift35 4s ease-in-out 1.5s infinite',
              letterSpacing: '0.22em',
            }}>Perjalanan Pengunjung</p>
            <div style={{
              flex: 1, height: '0.08cqh',
              background: 'linear-gradient(to right, rgba(212,160,23,0.25), transparent)',
              transformOrigin: 'left',
              animation: go ? 'growX35 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both' : 'none',
            }} />
          </div>

          {/* Flow steps */}
          <div style={{
            display: 'flex', flexDirection: 'column', position: 'relative',
            flex: 1, justifyContent: 'space-between',
          }}>
            {/* Connector line — draws top-to-bottom */}
            <div style={{
              position: 'absolute', left: '1.05cqw', top: '1.4cqh', bottom: '1.4cqh',
              width: '0.07cqw',
              background: 'linear-gradient(to bottom, rgba(212,160,23,0.65), rgba(212,160,23,0.15))',
              transformOrigin: 'top',
              animation: go ? 'lineGrow35 1.2s cubic-bezier(0.22,1,0.36,1) 0.4s both' : 'none',
            }} />

            {flow.map((step, i) => {
              const isFirst   = i === 0;
              const isLast    = i === flow.length - 1;
              const isSpecial = isFirst || isLast;
              const isH       = hovFlow === i;
              return (
                <div key={i}
                  onMouseEnter={() => setHovFlow(i)}
                  onMouseLeave={() => setHovFlow(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1.2cqw',
                    position: 'relative', cursor: 'default',
                    transform: isH ? 'translateX(0.4cqw)' : 'translateX(0)',
                    transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1)',
                    opacity: go ? 1 : 0,
                    animation: go ? `slideL35 0.42s cubic-bezier(0.22,1,0.36,1) ${0.42 + i * 0.08}s both` : 'none',
                  }}>
                  {/* Node */}
                  <div style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10, width: '2.2cqw', height: '2.2cqw', borderRadius: '50%',
                    background: isH
                      ? '#D4A017'
                      : isSpecial ? 'rgba(212,160,23,0.85)' : 'rgba(212,160,23,0.10)',
                    border: `0.08cqw solid ${isH ? '#f5c842' : isSpecial ? 'rgba(212,160,23,0.90)' : 'rgba(212,160,23,0.40)'}`,
                    transition: 'all 0.22s ease',
                    boxShadow: isH
                      ? '0 0 1.2cqw rgba(212,160,23,0.55)'
                      : isSpecial ? undefined : 'none',
                    animation: isSpecial && !isH ? 'nodePulse35 3s ease-in-out infinite' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                      fontSize: '0.65cqw', letterSpacing: '0.05em',
                      color: isH ? '#1A0D06' : isSpecial ? '#1A0D06' : 'rgba(212,160,23,0.80)',
                    }}>{step.no}</span>
                  </div>
                  {/* Label */}
                  <p style={{
                    fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.05cqw', lineHeight: 1.4,
                    fontWeight: isSpecial || isH ? 600 : 400,
                    color: isH
                      ? 'rgba(255,235,180,0.98)'
                      : isSpecial ? 'rgba(255,235,180,0.95)' : 'rgba(255,235,180,0.60)',
                    transition: 'color 0.22s ease',
                    textShadow: isH ? '0 0 1.5cqw rgba(212,160,23,0.30)' : 'none',
                  }}>{step.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT — Aktivasi cards
        ════════════════════════════════ */}
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1,
          padding: '8cqh 3cqw 6.5cqh', gap: '2.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp35 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2cqw', marginBottom: '0.5cqh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5cqw' }}>
              <div style={{
                width: '0.3cqw', borderRadius: '999px', background: '#D4A017',
                animation: 'sBarPulse35 3s ease-in-out 1.2s infinite',
                height: '2.5cqh',
              }} />
              <span style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.78cqw',
                color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
                letterSpacing: '0.28em',
                animation: 'lblBreath35 4s ease-in-out 1s infinite',
              }}>Aktivasi Unggulan</span>
            </div>
            <div style={{
              flex: 1, height: '0.08cqh',
              background: 'linear-gradient(to right, rgba(212,160,23,0.30), transparent)',
              transformOrigin: 'left',
              animation: go ? 'growX35 0.8s cubic-bezier(0.22,1,0.36,1) 0.38s both' : 'none',
            }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display,serif)', fontWeight: 700,
            fontSize: '2.8cqw', lineHeight: 1.05, marginBottom: '1cqh',
            color: 'rgba(245,230,195,0.97)',
          }}>
            Program <span className="prog-accent35">Koin Juara</span>
          </h2>

          {/* Aktivasi cards */}
          {aktivasi.map((a, i) => {
            const isH  = hovCard === i;
            const isHL = a.highlight;
            return (
              <div key={i}
                onMouseEnter={() => setHovCard(i)}
                onMouseLeave={() => setHovCard(null)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  padding: '1.8cqh 1.8cqw',
                  background: isH
                    ? isHL ? 'linear-gradient(135deg,rgba(212,160,23,0.26) 0%,rgba(212,160,23,0.10) 100%)' : 'rgba(212,160,23,0.08)'
                    : undefined,
                  border: `0.07cqw solid ${isH ? (isHL ? 'rgba(212,160,23,0.65)' : 'rgba(212,160,23,0.30)') : isHL ? 'rgba(212,160,23,0.40)' : 'rgba(255,255,255,0.08)'}`,
                  borderTop: 'none',
                  borderRadius: '0 0 0.4cqw 0.4cqw',
                  position: 'relative', overflow: 'hidden',
                  transform: isH ? 'translateY(-0.4cqh) scale(1.008)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                  boxShadow: isH ? `0 0.8cqh 2cqw rgba(212,160,23,${isHL ? 0.22 : 0.10})` : 'none',
                  opacity: go ? 1 : 0,
                  animation: go
                    ? isHL && !isH
                      ? `cardRise35 0.5s cubic-bezier(0.22,1,0.36,1) ${0.42 + i * 0.12}s both, hlCardGlow35 4s ease-in-out ${1.5 + i * 0.3}s infinite`
                      : `cardRise35 0.5s cubic-bezier(0.22,1,0.36,1) ${0.42 + i * 0.12}s both`
                    : 'none',
                }}>

                {/* Top border — grows on entrance */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '0.3cqw',
                  background: isH
                    ? (isHL ? '#f5c842' : 'rgba(212,160,23,0.75)')
                    : (isHL ? 'rgba(212,160,23,0.85)' : 'rgba(212,160,23,0.30)'),
                  transformOrigin: 'left',
                  transition: 'background 0.25s ease',
                  animation: go ? `topBorderGrow35 0.6s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.12}s both` : 'none',
                }} />

                {/* Corner glow for highlight */}
                {isHL && (
                  <div style={{
                    position: 'absolute', top: 0, right: 0, width: '8cqw', height: '8cqw',
                    background: 'radial-gradient(circle at top right, rgba(212,160,23,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9cqw', marginBottom: '1.2cqh' }}>
                  <div style={{
                    width: '2.4cqw', height: '2.4cqw', borderRadius: '50%', flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: isH
                      ? (isHL ? 'rgba(212,160,23,0.22)' : 'rgba(212,160,23,0.14)')
                      : (isHL ? 'rgba(212,160,23,0.14)' : 'rgba(212,160,23,0.08)'),
                    border: `0.07cqw solid ${isH ? (isHL ? '#D4A017' : 'rgba(212,160,23,0.50)') : (isHL ? 'rgba(212,160,23,0.50)' : 'rgba(212,160,23,0.22)')}`,
                    boxShadow: isH ? `0 0 1cqw rgba(212,160,23,${isHL ? 0.35 : 0.18})` : 'none',
                    transition: 'all 0.25s ease',
                    animation: isHL ? 'trophyWobble35 4s ease-in-out 2s infinite' : 'none',
                    transformOrigin: 'center',
                  }}>
                    <a.Icon
                      size="1.15cqw"
                      color={isH ? (isHL ? '#f5c842' : '#D4A017') : (isHL ? '#D4A017' : 'rgba(212,160,23,0.60)')}
                      strokeWidth={1.8}
                      style={{ transition: 'color 0.25s ease' }}
                    />
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                    fontSize: '1.15cqw', letterSpacing: '0.04em',
                    transition: 'color 0.22s ease',
                  }} className={isHL ? 'hl-title35' : ''}>
                    {!isHL ? (
                      <span style={{ color: isH ? 'rgba(212,160,23,0.95)' : 'rgba(212,160,23,0.75)' }}>{a.nama}</span>
                    ) : a.nama}
                  </p>
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7cqw', flexWrap: 'wrap' }}>
                  {a.steps.map((s, j) => {
                    const isLast = j === a.steps.length - 1;
                    const isHov  = hovStep === i * 10 + j;
                    return (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.7cqw' }}>
                        <div
                          onMouseEnter={() => setHovStep(i * 10 + j)}
                          onMouseLeave={() => setHovStep(null)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.6cqw',
                            padding: '0.55cqh 1cqw',
                            background: isHov ? 'rgba(212,160,23,0.12)' : 'rgba(255,255,255,0.04)',
                            border: `0.05cqw solid ${isHov ? 'rgba(212,160,23,0.45)' : 'rgba(255,255,255,0.10)'}`,
                            borderRadius: '0.3cqw', flexShrink: 0,
                            transform: isHov ? 'translateY(-0.2cqh)' : 'translateY(0)',
                            transition: 'all 0.20s cubic-bezier(0.22,1,0.36,1)',
                            cursor: 'default',
                            boxShadow: isHov ? '0 0.4cqh 1cqw rgba(212,160,23,0.18)' : 'none',
                            opacity: go ? 1 : 0,
                            animation: go ? `fadeIn35 0.35s ease ${0.65 + i * 0.12 + j * 0.07}s both` : 'none',
                          }}>
                          <div style={{
                            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '50%', width: '1.1cqw', height: '1.1cqw',
                            background: isHov ? 'rgba(212,160,23,0.28)' : 'rgba(212,160,23,0.15)',
                            border: `0.05cqw solid ${isHov ? 'rgba(212,160,23,0.65)' : 'rgba(212,160,23,0.30)'}`,
                            fontSize: '0.65cqw', fontWeight: 700,
                            color: isHov ? '#f5c842' : 'rgba(212,160,23,0.80)',
                            transition: 'all 0.20s ease',
                          }}>{j + 1}</div>
                          <p style={{
                            fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.0cqw',
                            color: isHov
                              ? 'rgba(255,235,180,0.98)'
                              : isLast && isHL
                                ? 'rgba(212,160,23,0.95)'
                                : 'rgba(255,235,180,0.70)',
                            fontWeight: (isLast && isHL) || isHov ? 600 : 400,
                            transition: 'color 0.20s ease',
                          }}>{s}</p>
                        </div>
                        {j < a.steps.length - 1 && (
                          <span style={{
                            color: 'rgba(212,160,23,0.38)', fontSize: '1cqw',
                            animation: 'arrowFlow35 2.5s ease-in-out infinite',
                            animationDelay: `${j * 0.4}s`,
                          }}>→</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={35} total={38} />
    </div>
  );
}
