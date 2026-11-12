import { useEffect, useRef, useState } from 'react';
import { Megaphone, Play, Film } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const phases = [
  {
    key: 'pra',
    Icon: Megaphone,
    label: 'Pra Event',
    color: '#D4A017',
    colorBg: 'rgba(212,160,23,0.10)',
    colorDim: 'rgba(212,160,23,0.28)',
    items: ['Teaser campaign', 'Video promosi', 'Media partner', 'Aktivasi komunitas'],
  },
  {
    key: 'saat',
    Icon: Play,
    label: 'Saat Event',
    color: '#8B3A1F',
    colorBg: 'rgba(139,58,31,0.15)',
    colorDim: 'rgba(139,58,31,0.35)',
    items: ['Live coverage', 'Konten media sosial', 'Dokumentasi profesional'],
  },
  {
    key: 'pasca',
    Icon: Film,
    label: 'Pasca Event',
    color: '#9A7A5A',
    colorBg: 'rgba(154,122,90,0.12)',
    colorDim: 'rgba(154,122,90,0.28)',
    items: ['Aftermovie', 'Highlight video', 'Dokumentasi publikasi'],
  },
];

/* ambient orbs */
const orbs = [
  { left:'8%',  top:'20%', r:'16cqw', dur:'14s', delay:'0s'   },
  { left:'80%', top:'55%', r:'12cqw', dur:'11s', delay:'2s'   },
  { left:'50%', top:'82%', r:'7cqw',  dur:'9s',  delay:'1.2s' },
  { left:'92%', top:'8%',  r:'6cqw',  dur:'13s', delay:'3s'   },
];

/* sparks */
const sparks = [
  { left:'25%', top:'70%', dur:'3.5s', delay:'0.5s' },
  { left:'60%', top:'14%', dur:'4.2s', delay:'1.2s' },
  { left:'82%', top:'40%', dur:'3.0s', delay:'0.8s' },
  { left:'42%', top:'88%', dur:'3.8s', delay:'2.0s' },
];

/* count-up hook */
function useCountUp(target: number, duration = 1800, start = false) {
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

export default function Slide17StrategiPromosi() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);
  const [hovItem, setHovItem] = useState<string | null>(null);
  const impressions = useCountUp(500000, 1800, go);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fmt = (n: number) => n >= 1000 ? `${Math.floor(n / 1000).toLocaleString('id')}.${String(n % 1000).padStart(3,'0')}` : String(n);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col px-[5.5cqw] pt-[9cqh] pb-[6.5cqh]">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL17 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU17 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX17 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes colPop17 {
          from { opacity:0; transform:translateY(4cqh) scale(0.94); }
          to   { opacity:1; transform:translateY(0)  scale(1); }
        }
        @keyframes itemSlide17 {
          from { opacity:0; transform:translateX(-1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes barGrow17 {
          from { opacity:0; transform:scaleX(0) translateY(2cqh); }
          to   { opacity:1; transform:scaleX(1) translateY(0); }
        }

        /* ── ambient ── */
        @keyframes orbGlow17 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.2);  opacity:0.13; }
        }
        @keyframes spark17 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan17 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── top border grow ── */
        @keyframes borderGrow17 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }

        /* ── shimmer ── */
        @keyframes shimmer17 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .promo-text17 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 18%, #f5c842 35%,
            #fff8dc 52%, #D4A017 70%, #fffbe8 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer17 4s ease infinite;
        }

        /* ── impressions bar pulse ── */
        @keyframes barPulse17 {
          0%,100% { box-shadow:0 0 0   rgba(212,160,23,0);    background: linear-gradient(90deg, rgba(212,160,23,0.12) 0%, rgba(212,160,23,0.04) 100%); }
          50%     { box-shadow:0 0 2cqh rgba(212,160,23,0.18); background: linear-gradient(90deg, rgba(212,160,23,0.20) 0%, rgba(212,160,23,0.08) 100%); }
        }

        /* ── icon float ── */
        @keyframes iconFloat17 {
          0%,100% { transform:translateY(0) scale(1); }
          50%     { transform:translateY(-5px) scale(1.1); }
        }

        /* ── arrow connector ── */
        @keyframes arrowPulse17 {
          0%,100% { opacity:0.25; transform:translateX(0); }
          50%     { opacity:0.55; transform:translateX(3px); }
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
          animation:`orbGlow17 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark17 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan17 11s linear infinite',
        }} />
      </div>

      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <div className="relative z-10">
        <div style={{
          display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL17 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.75)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'1.1cqw', fontWeight:600, flexShrink:0,
          }}>Promosi</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.28)',
            transformOrigin:'left',
            animation: go ? 'growX17 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
          }} />
        </div>

        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'4cqw', lineHeight:1.05, marginBottom:'3cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL17 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
        }}>
          <span className="promo-text17">Strategi</span>
          <span style={{ color:'rgba(245,230,200,0.97)' }}> Promosi</span>
        </h2>
      </div>

      {/* ════════════════════════════════════
          THREE PHASE COLUMNS
      ════════════════════════════════════ */}
      <div className="relative z-10" style={{
        display:'grid', gridTemplateColumns:'1fr auto 1fr auto 1fr',
        gap:'0', marginBottom:'2.5cqh', height:'46cqh',
      }}>
        {phases.map((phase, pi) => {
          const isH   = hov === pi;
          const isDim = hov !== null && !isH;
          return (
            <>
              {/* ── Column ── */}
              <div
                key={phase.key}
                onMouseEnter={() => setHov(pi)}
                onMouseLeave={() => { setHov(null); setHovItem(null); }}
                style={{
                  display:'flex', flexDirection:'column',
                  background: isH
                    ? 'linear-gradient(160deg, rgba(42,20,8,0.85) 0%, rgba(26,13,6,0.85) 100%)'
                    : 'rgba(26,13,6,0)',
                  border: isH ? `0.07cqw solid ${phase.colorDim}` : '0.07cqw solid transparent',
                  borderRadius:'0 0 0.5cqw 0.5cqw',
                  transform: isH ? 'translateY(-0.5cqh)' : 'translateY(0)',
                  transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  opacity: isDim ? 0.38 : 1,
                  animation: go ? `colPop17 0.6s cubic-bezier(0.22,1,0.36,1) ${0.32 + pi * 0.12}s both` : 'none',
                }}
              >
                {/* shimmer on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.05) 50%, transparent 70%)',
                    animation:'shimmer17 2s ease-in-out infinite',
                  }} />
                )}

                {/* Animated top border */}
                <div style={{
                  height:'0.3cqw',
                  background: phase.color,
                  transformOrigin:'left',
                  animation: go ? `borderGrow17 0.7s cubic-bezier(0.22,1,0.36,1) ${0.28 + pi * 0.12}s both` : 'none',
                  boxShadow: isH ? `0 0 1.2cqh ${phase.color}55` : 'none',
                  transition:'box-shadow 0.35s ease',
                }} />

                {/* Phase header */}
                <div style={{
                  padding:'1.5cqh 2cqw',
                  background: phase.colorBg,
                  display:'flex', alignItems:'center', gap:'0.8cqw',
                  marginBottom:'1.8cqh',
                }}>
                  <div style={{
                    width:'1.6cqw', height:'1.6cqw', borderRadius:'50%',
                    border:`0.07cqw solid ${phase.color}55`,
                    background:`${phase.color}18`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    animation: isH ? 'iconFloat17 1.5s ease-in-out infinite' : 'none',
                    flexShrink:0, transition:'all 0.35s ease',
                  }}>
                    <phase.Icon size="0.8cqw" color={phase.color} strokeWidth={1.5} />
                  </div>
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)', fontWeight:700,
                    color: phase.color, textTransform:'uppercase',
                    letterSpacing:'0.2em', fontSize:'1.05cqw',
                  }}>{phase.label}</p>
                </div>

                {/* Items */}
                <div style={{ display:'flex', flexDirection:'column', gap:'1.4cqh', padding:'0 0.8cqw', flex:1 }}>
                  {phase.items.map((item, ii) => {
                    const itemKey = `${pi}-${ii}`;
                    const isIH  = hovItem === itemKey;
                    const isIDim = hovItem !== null && hovItem.startsWith(`${pi}-`) && !isIH;
                    return (
                      <div
                        key={item}
                        onMouseEnter={(e) => { e.stopPropagation(); setHovItem(itemKey); }}
                        onMouseLeave={() => setHovItem(null)}
                        style={{
                          display:'flex', alignItems:'center', gap:'1cqw',
                          padding:'0.7cqh 1cqw',
                          background: isIH ? `${phase.color}12` : 'transparent',
                          borderLeft:`0.25cqw solid ${isIH ? phase.color : `${phase.color}30`}`,
                          borderRadius:'0 0.3cqw 0.3cqw 0',
                          opacity: isIDim ? 0.32 : 1,
                          transform: isIH ? 'translateX(0.4cqw)' : 'translateX(0)',
                          transition:'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                          animation: go ? `itemSlide17 0.45s ease ${0.52 + pi * 0.12 + ii * 0.07}s both` : 'none',
                        }}
                      >
                        <div style={{
                          width:'0.38cqw', height:'0.38cqw', borderRadius:'50%',
                          background: isIH ? phase.color : `${phase.color}70`,
                          transition:'all 0.28s ease', flexShrink:0,
                          boxShadow: isIH ? `0 0 0.5cqw ${phase.color}88` : 'none',
                        }} />
                        <p style={{
                          fontFamily:'var(--font-body,sans-serif)',
                          fontSize:'1.5cqw', lineHeight:1.4,
                          color: isIH ? 'rgba(245,230,200,0.95)' : 'rgba(245,230,200,0.75)',
                          transition:'color 0.28s ease',
                        }}>{item}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom glow bar on column hover */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0, height:'0.2cqh',
                  background:`linear-gradient(90deg, transparent, ${phase.color}, transparent)`,
                  transform: isH ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin:'center',
                  transition:'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                }} />
              </div>

              {/* ── Arrow connector between columns ── */}
              {pi < phases.length - 1 && (
                <div key={`arrow-${pi}`} style={{
                  display:'flex', alignItems:'center', justifyContent:'center',
                  width:'2.5cqw', opacity: go ? 1 : 0,
                  animation: go ? `slideU17 0.5s ease ${0.6 + pi * 0.12}s both` : 'none',
                }}>
                  <div style={{ animation:'arrowPulse17 2s ease-in-out infinite', display:'flex', alignItems:'center' }}>
                    <svg width="1.8cqw" height="1.8cqw" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M14 6l6 6-6 6" stroke="rgba(212,160,23,0.40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

      {/* ════════════════════════════════════
          IMPRESSIONS BAR
      ════════════════════════════════════ */}
      <div className="relative z-10" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'2cqh 3cqw',
        background:'linear-gradient(90deg, rgba(212,160,23,0.13) 0%, rgba(212,160,23,0.04) 100%)',
        border:'0.06cqw solid rgba(212,160,23,0.30)',
        borderRadius:'0.3cqw',
        position:'relative', overflow:'hidden',
        animation: go ? 'barGrow17 0.65s cubic-bezier(0.22,1,0.36,1) 0.85s both, barPulse17 4s ease-in-out 1.5s infinite' : 'none',
      }}>
        {/* shimmer sweep */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.06) 50%, transparent 70%)',
          animation:'shimmer17 3.5s ease-in-out infinite',
        }} />
        <p style={{
          position:'relative',
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(154,122,90,0.80)', fontSize:'1.3cqw',
        }}>Target Digital Exposure</p>
        <p style={{
          position:'relative',
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          color:'#D4A017', fontSize:'3.5cqw', lineHeight:1,
        }}>
          {fmt(impressions)}+
          <span style={{ fontFamily:'var(--font-body,sans-serif)', fontWeight:400, fontSize:'1.6cqw', marginLeft:'0.5cqw', color:'rgba(212,160,23,0.70)' }}>
            Impressions
          </span>
        </p>
      </div>

      <SlideHeader />
      <SlideFooter slide={17} />
    </div>
  );
}
