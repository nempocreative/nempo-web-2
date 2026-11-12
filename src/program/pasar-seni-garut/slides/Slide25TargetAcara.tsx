import { useEffect, useRef, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

/* ── Professional SVG icons ── */
const IconPengunjung = ({ color }: { color: string }) => (
  <svg width="1.4cqw" height="1.4cqw" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle' }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconUMKM = ({ color }: { color: string }) => (
  <svg width="1.4cqw" height="1.4cqw" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle' }}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconKomunitas = ({ color }: { color: string }) => (
  <svg width="1.4cqw" height="1.4cqw" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle' }}>
    <circle cx="12" cy="8" r="4"/>
    <path d="M6 20v-1a6 6 0 0 1 12 0v1"/>
    <path d="M2 20v-1a4 4 0 0 1 4-4"/>
    <path d="M22 20v-1a4 4 0 0 0-4-4"/>
  </svg>
);
const IconSponsor = ({ color }: { color: string }) => (
  <svg width="1.4cqw" height="1.4cqw" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle' }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconMedia = ({ color }: { color: string }) => (
  <svg width="1.4cqw" height="1.4cqw" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle' }}>
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
  </svg>
);
const IconTransaksi = ({ color }: { color: string }) => (
  <svg width="1.4cqw" height="1.4cqw" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle' }}>
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconDurasi = ({ color }: { color: string }) => (
  <svg width="1.4cqw" height="1.4cqw" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle' }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconArea = ({ color }: { color: string }) => (
  <svg width="1.4cqw" height="1.4cqw" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle' }}>
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>
  </svg>
);

type IconComponent = React.ComponentType<{ color: string }>;

const targets: { Icon: IconComponent; item: string; target: string; highlight: boolean }[] = [
  { Icon: IconPengunjung, item: 'Pengunjung',        target: '15.000 Orang',             highlight: true  },
  { Icon: IconUMKM,       item: 'UMKM',              target: '50 Tenant',                highlight: false },
  { Icon: IconKomunitas,  item: 'Komunitas',          target: '50 Komunitas',             highlight: false },
  { Icon: IconSponsor,    item: 'Sponsor Pendukung',  target: '20 Brand',                 highlight: false },
  { Icon: IconMedia,      item: 'Media Partner',      target: '30 Media',                 highlight: false },
  { Icon: IconTransaksi,  item: 'Transaksi UMKM',     target: 'Rp500 Juta – Rp1 Miliar', highlight: true  },
  { Icon: IconDurasi,     item: 'Durasi',             target: '3 Hari',                   highlight: false },
  { Icon: IconArea,       item: 'Area Festival',      target: '5.000 – 10.000 m²',        highlight: false },
];

/* ambient orbs */
const orbs = [
  { left:'10%', top:'20%', r:'15cqw', dur:'14s', delay:'0s'   },
  { left:'70%', top:'55%', r:'12cqw', dur:'11s', delay:'2s'   },
  { left:'50%', top:'82%', r:'6cqw',  dur:'9s',  delay:'1.5s' },
];

/* sparks */
const sparks = [
  { left:'20%', top:'65%', dur:'3.5s', delay:'0.4s' },
  { left:'48%', top:'14%', dur:'4.2s', delay:'1.1s' },
  { left:'65%', top:'80%', dur:'3.0s', delay:'0.8s' },
  { left:'88%', top:'30%', dur:'3.8s', delay:'2.0s' },
];

/* count-up hook */
function useCountUp(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, duration]);
  return val;
}

export default function Slide25TargetAcara() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  const visitors = useCountUp(15, 1400, go);
  const days     = useCountUp(3,  1000, go);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL25 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideR25 {
          from { opacity:0; transform:translateX(3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU25 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX25 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes growY25 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }
        @keyframes rowIn25 {
          from { opacity:0; transform:translateX(-2cqw) scale(0.97); }
          to   { opacity:1; transform:translateX(0)   scale(1); }
        }

        /* ── ambient ── */
        @keyframes orbGlow25 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.13; }
        }
        @keyframes spark25 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan25 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── shimmer ── */
        @keyframes shimmer25 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .garut-text25 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 42%,
            #D4A017 62%, #f0b429 82%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer25 3.5s ease infinite;
        }

        /* ── top bar + left bar ── */
        @keyframes topBarPulse25 {
          0%,100% { opacity:1; }
          50%     { opacity:0.5; }
        }
        @keyframes barGlow25 {
          0%,100% { box-shadow:none; }
          50%     { box-shadow:2px 0 1.5cqw rgba(212,160,23,0.35); }
        }

        /* ── table header pulse ── */
        @keyframes headerPulse25 {
          0%,100% { background:rgba(212,160,23,0.09); }
          50%     { background:rgba(212,160,23,0.15); }
        }

        /* ── highlight row idle glow ── */
        @keyframes hlGlow25 {
          0%,100% { box-shadow:none; }
          50%     { box-shadow:inset 0 0 2cqw rgba(212,160,23,0.08); }
        }

        /* ── right panel big numbers ── */
        @keyframes numDrift25 {
          0%,100% { opacity:0.14; transform:translateY(0); }
          50%     { opacity:0.22; transform:translateY(-6px); }
        }
        @keyframes dividerPulse25 {
          0%,100% { opacity:0.28; transform:scaleX(1); }
          50%     { opacity:0.55; transform:scaleX(1.15); }
        }
        @keyframes subLabelPulse25 {
          0%,100% { opacity:0.45; }
          50%     { opacity:0.75; }
        }
        @keyframes panelSweep25 {
          0%   { transform:translateY(-100%); opacity:0; }
          30%  { opacity:0.5; }
          70%  { opacity:0.5; }
          100% { transform:translateY(100%);  opacity:0; }
        }
        @keyframes borderGlow25 {
          0%,100% { opacity:0.18; }
          50%     { opacity:0.42; }
        }

        /* ── icon bounce on hover ── */
        @keyframes iconBounce25 {
          0%,100% { transform:translateY(0) scale(1); }
          40%     { transform:translateY(-5px) scale(1.15); }
          65%     { transform:translateY(-3px) scale(1.08); }
        }
      `}</style>

      {/* ── Batik texture ── */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity:0.06 }} alt="" aria-hidden="true" />

      {/* ── Ambient orbs ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.r, height:o.r, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          animation:`orbGlow25 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark25 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan25 11s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.5cqh',
        background:'linear-gradient(to right, #D4A017, rgba(212,160,23,0.35) 70%, transparent)',
        animation:'topBarPulse25 4s ease-in-out infinite', zIndex:10,
      }} />

      {/* ── Left gold bar ── */}
      <div style={{
        width:'0.6cqw', flexShrink:0,
        background:'linear-gradient(to bottom, transparent, #D4A017 15%, #D4A017 85%, transparent)',
        animation:'barGlow25 3.5s ease-in-out infinite',
        opacity: go ? 1 : 0,
        ...(go ? { animation:'growY25 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s both, barGlow25 3.5s ease-in-out 0.65s infinite' } : {}),
        zIndex:10,
      }} />

      {/* ════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col flex-1 px-[5.5cqw] pt-[7.5cqh] pb-[6cqh]">

        {/* Section label */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL25 0.55s cubic-bezier(0.22,1,0.36,1) 0.12s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.72)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'1cqw', fontWeight:600, flexShrink:0,
          }}>Target Acara</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.25)',
            transformOrigin:'left',
            animation: go ? 'growX25 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'4cqw', lineHeight:1.05, marginBottom:'3.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL25 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          <span style={{ color:'rgba(245,230,200,0.97)' }}>Pasar Seni Garut </span>
          <span className="garut-text25">2026</span>
        </h2>

        {/* Table header */}
        <div style={{
          display:'grid', gridTemplateColumns:'5% 45% 50%',
          padding:'1cqh 1.5cqw', marginBottom:'1cqh',
          borderBottom:'0.05cqw solid rgba(212,160,23,0.35)',
          opacity: go ? 1 : 0,
          animation: go
            ? 'slideU25 0.45s ease 0.3s both, headerPulse25 4s ease-in-out 1s infinite'
            : 'none',
        }}>
          {['', 'Item', 'Target'].map((h, i) => (
            <p key={i} style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(212,160,23,0.50)', textTransform:'uppercase',
              letterSpacing:'0.2em', fontSize:'0.78cqw',
            }}>{h}</p>
          ))}
        </div>

        {/* Rows */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.45cqh' }}>
          {targets.map((row, i) => {
            const isH  = hov === i;
            const isDim = hov !== null && !isH;
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'grid', gridTemplateColumns:'5% 45% 50%',
                  padding:'1.15cqh 1.5cqw',
                  background: isH
                    ? 'linear-gradient(90deg, rgba(212,160,23,0.20) 0%, rgba(212,160,23,0.07) 100%)'
                    : row.highlight
                      ? 'linear-gradient(90deg, rgba(212,160,23,0.13) 0%, rgba(212,160,23,0.04) 100%)'
                      : i % 2 === 0 ? 'rgba(255,255,255,0.022)' : 'transparent',
                  borderLeft: isH
                    ? '0.25cqw solid #D4A017'
                    : row.highlight
                      ? '0.25cqw solid rgba(212,160,23,0.65)'
                      : '0.25cqw solid transparent',
                  borderRadius:'0 0.25cqw 0.25cqw 0',
                  opacity: isDim ? 0.25 : 1,
                  transform: isH ? 'translateX(0.35cqw)' : 'translateX(0)',
                  transition:'all 0.27s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  boxShadow: isH ? 'inset 0 0 2cqw rgba(212,160,23,0.10)' : 'none',
                  animation: go
                    ? row.highlight && !isH
                      ? `rowIn25 0.45s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.07}s both, hlGlow25 3.5s ease-in-out ${i * 0.2}s infinite`
                      : `rowIn25 0.45s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.07}s both`
                    : 'none',
                }}
              >
                {/* shimmer on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(90deg, transparent 20%, rgba(212,160,23,0.08) 50%, transparent 80%)',
                    animation:'shimmer25 1.8s ease-in-out infinite',
                  }} />
                )}

                {/* Icon */}
                <div style={{
                  display:'flex', alignItems:'center',
                  animation: isH ? 'iconBounce25 1.2s ease-in-out infinite' : 'none',
                  transition:'transform 0.27s ease',
                }}>
                  <row.Icon color={
                    isH ? '#f5c842'
                      : row.highlight ? 'rgba(212,160,23,0.90)'
                      : 'rgba(255,235,180,0.55)'
                  } />
                </div>

                {/* Item */}
                <p style={{
                  fontFamily:'var(--font-body,sans-serif)',
                  fontSize:'1.45cqw', lineHeight:1.3,
                  color: isH
                    ? 'rgba(255,235,180,0.98)'
                    : row.highlight ? 'rgba(255,235,180,0.92)' : 'rgba(255,235,180,0.68)',
                  fontWeight: (row.highlight || isH) ? 600 : 400,
                  transition:'color 0.27s ease',
                }}>{row.item}</p>

                {/* Target value */}
                <p style={{
                  fontFamily:'var(--font-display,serif)', fontWeight:600,
                  fontSize:'1.5cqw', lineHeight:1.3,
                  color: isH
                    ? '#D4A017'
                    : row.highlight ? 'rgba(212,160,23,0.90)' : 'rgba(255,235,180,0.80)',
                  transition:'color 0.27s ease',
                }}>{row.target}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════
          RIGHT PANEL — Big Numbers
      ════════════════════════════════════ */}
      <div style={{
        width:'18cqw', flexShrink:0,
        background:'linear-gradient(135deg, #2A1A0A 0%, #1A0D06 100%)',
        display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', gap:'2.8cqh', padding:'0 2cqw',
        position:'relative', overflow:'hidden', zIndex:10,
        opacity: go ? 1 : 0,
        animation: go ? 'slideR25 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both' : 'none',
      }}>
        {/* shimmer sweep */}
        <div style={{
          position:'absolute', left:'-30%', right:'-30%', height:'35%',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.055) 50%, transparent)',
          animation:'panelSweep25 7s ease-in-out 1s infinite',
          pointerEvents:'none',
        }} />

        {/* Left border glow */}
        <div style={{
          position:'absolute', top:0, bottom:0, left:0, width:'0.1cqw',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.38) 30%, rgba(212,160,23,0.38) 70%, transparent)',
          animation:'borderGlow25 3.5s ease-in-out infinite',
        }} />

        {/* 15K */}
        <div style={{ textAlign:'center', position:'relative' }}>
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'9cqw', lineHeight:0.85,
            color:'rgba(212,160,23,0.16)',
            animation:'numDrift25 5s ease-in-out infinite',
            userSelect:'none',
          }}>{visitors}K</p>
          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.50)', letterSpacing:'0.15em',
            textTransform:'uppercase', fontSize:'0.8cqw', marginTop:'1cqh',
            animation:'subLabelPulse25 3s ease-in-out 0.5s infinite',
          }}>Pengunjung</p>
        </div>

        {/* Divider */}
        <div style={{
          width:'3cqw', height:'0.15cqh', background:'rgba(212,160,23,0.30)',
          animation:'dividerPulse25 3s ease-in-out infinite',
        }} />

        {/* 1M */}
        <div style={{ textAlign:'center', position:'relative' }}>
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'6cqw', lineHeight:0.85,
            color:'rgba(212,160,23,0.16)',
            animation:'numDrift25 5s ease-in-out 1s infinite',
            userSelect:'none',
          }}>1M</p>
          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.50)', letterSpacing:'0.15em',
            textTransform:'uppercase', fontSize:'0.8cqw', marginTop:'1cqh',
            animation:'subLabelPulse25 3s ease-in-out 1s infinite',
          }}>Target Transaksi</p>
        </div>

        {/* Divider */}
        <div style={{
          width:'3cqw', height:'0.15cqh', background:'rgba(212,160,23,0.30)',
          animation:'dividerPulse25 3s ease-in-out 0.5s infinite',
        }} />

        {/* 3 Hari */}
        <div style={{ textAlign:'center', position:'relative' }}>
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'6cqw', lineHeight:0.85,
            color:'rgba(212,160,23,0.16)',
            animation:'numDrift25 5s ease-in-out 2s infinite',
            userSelect:'none',
          }}>{days}</p>
          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.50)', letterSpacing:'0.15em',
            textTransform:'uppercase', fontSize:'0.8cqw', marginTop:'1cqh',
            animation:'subLabelPulse25 3s ease-in-out 1.5s infinite',
          }}>Hari Festival</p>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={25} total={38} />
    </div>
  );
}
