import { useEffect, useState } from 'react';
import { TrendingUp, Users, Landmark } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const pillars = [
  {
    key: 'ekonomi',
    Icon: TrendingUp,
    label: 'Ekonomi',
    color: '#D4A017',
    colorDim: 'rgba(212,160,23,0.22)',
    items: [
      'Peningkatan transaksi UMKM',
      'Promosi produk lokal',
      'Perputaran ekonomi selama acara',
    ],
  },
  {
    key: 'sosial',
    Icon: Users,
    label: 'Sosial',
    color: '#8B3A1F',
    colorDim: 'rgba(139,58,31,0.30)',
    items: [
      'Aktivasi komunitas',
      'Interaksi masyarakat',
      'Ruang kolaborasi kreatif',
    ],
  },
  {
    key: 'budaya',
    Icon: Landmark,
    label: 'Budaya',
    color: '#9A7A5A',
    colorDim: 'rgba(154,122,90,0.28)',
    items: [
      'Pelestarian permainan tradisional',
      'Pelestarian seni pertunjukan',
      'Penguatan identitas budaya Garut',
    ],
  },
];

/* ambient orbs */
const orbs = [
  { left:'5%',  top:'18%', r:'18cqw', dur:'14s', delay:'0s'   },
  { left:'78%', top:'58%', r:'13cqw', dur:'11s', delay:'2s'   },
  { left:'88%', top:'8%',  r:'8cqw',  dur:'9s',  delay:'1.2s' },
  { left:'42%', top:'80%', r:'6cqw',  dur:'13s', delay:'3s'   },
];

/* sparks */
const sparks = [
  { left:'18%', top:'68%', dur:'3.5s', delay:'0.4s' },
  { left:'52%', top:'12%', dur:'4.2s', delay:'1.1s' },
  { left:'80%', top:'35%', dur:'3.0s', delay:'0.8s' },
  { left:'65%', top:'82%', dur:'3.8s', delay:'2.1s' },
  { left:'93%', top:'52%', dur:'4.5s', delay:'1.6s' },
];

export default function Slide18TargetDampak() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);
  const [hovItem, setHovItem] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL18 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideR18 {
          from { opacity:0; transform:translateX(3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU18 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX18 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes colPop18 {
          from { opacity:0; transform:translateY(4cqh) scale(0.93); }
          to   { opacity:1; transform:translateY(0)  scale(1); }
        }
        @keyframes itemSlide18 {
          from { opacity:0; transform:translateX(-1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes closingIn18 {
          from { opacity:0; transform:scale(0.96) translateY(2cqh); }
          to   { opacity:1; transform:scale(1)    translateY(0); }
        }

        /* ── ambient ── */
        @keyframes orbGlow18 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.13; }
        }
        @keyframes spark18 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan18 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── top bar pulse ── */
        @keyframes barPulse18 {
          0%,100% { opacity:1; }
          50%     { opacity:0.55; }
        }

        /* ── shimmer ── */
        @keyframes shimmer18 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .wujudkan-text18 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 20%, #f5c842 38%,
            #fff8dc 54%, #D4A017 72%, #fffbe8 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer18 4s ease infinite;
        }
        .nempo-text18 {
          background: linear-gradient(90deg,
            #D4A017 0%, #f5c842 40%, #D4A017 80%
          );
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer18 3s ease infinite;
        }

        /* ── border grow ── */
        @keyframes borderGrow18 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }

        /* ── icon float ── */
        @keyframes iconFloat18 {
          0%,100% { transform:translateY(0) scale(1); }
          50%     { transform:translateY(-5px) scale(1.1); }
        }

        /* ── closing bar ── */
        @keyframes closingPulse18 {
          0%,100% {
            box-shadow: 0 0 0 rgba(212,160,23,0);
            background: linear-gradient(90deg, rgba(212,160,23,0.12) 0%, rgba(212,160,23,0.04) 100%);
          }
          50% {
            box-shadow: 0 0 2.5cqh rgba(212,160,23,0.20);
            background: linear-gradient(90deg, rgba(212,160,23,0.20) 0%, rgba(212,160,23,0.08) 100%);
          }
        }

        /* ── "Pasar Seni" text glow ── */
        @keyframes pasarGlow18 {
          0%,100% { text-shadow: 0 0 0   rgba(212,160,23,0); }
          50%     { text-shadow: 0 0 3cqw rgba(212,160,23,0.40); }
        }
      `}</style>

      {/* ── Wayang texture ── */}
      <img src={`${base}wayang-deco.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity:0.06 }} alt="" aria-hidden="true" />

      {/* ── Ambient orbs ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.r, height:o.r, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          animation:`orbGlow18 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark18 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan18 11s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.5cqh',
        background:'linear-gradient(to right, #D4A017, rgba(212,160,23,0.35) 70%, transparent)',
        animation:'barPulse18 4s ease-in-out infinite', zIndex:10,
      }} />

      {/* ════════════════════════════════════
          HEADER ROW
      ════════════════════════════════════ */}
      <div className="relative z-10" style={{
        display:'flex', alignItems:'flex-end', justifyContent:'space-between',
        padding:'7.5cqh 5.5cqw 3cqh',
      }}>
        {/* Left: label + title */}
        <div>
          <div style={{
            display:'flex', alignItems:'center', gap:'1.2cqw', marginBottom:'0.8cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'slideL18 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
          }}>
            <span style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(212,160,23,0.72)', textTransform:'uppercase',
              letterSpacing:'0.3em', fontSize:'1.1cqw', fontWeight:600,
            }}>Target Dampak &amp; Penutup</span>
            <div style={{
              width:'4cqw', height:'0.08cqh', background:'rgba(212,160,23,0.28)',
              transformOrigin:'left',
              animation: go ? 'growX18 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
            }} />
          </div>
          <h2 style={{
            fontFamily:'var(--font-display,serif)', fontWeight:700,
            fontSize:'4cqw', lineHeight:1.05,
            opacity: go ? 1 : 0,
            animation: go ? 'slideL18 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
          }}>
            <span style={{ color:'rgba(245,230,200,0.95)' }}>Bersama Kita </span>
            <span className="wujudkan-text18">Wujudkan</span>
          </h2>
        </div>

        {/* Right: Nempo Garut */}
        <div style={{
          textAlign:'right',
          opacity: go ? 1 : 0,
          animation: go ? 'slideR18 0.65s cubic-bezier(0.22,1,0.36,1) 0.25s both' : 'none',
        }}>
          <p className="nempo-text18" style={{
            fontFamily:'var(--font-display,serif)', fontWeight:700, fontSize:'2cqw',
          }}>Nempo Garut</p>
          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(154,122,90,0.75)', fontSize:'1.2cqw',
          }}>Creative Community &amp; Event Organizer</p>
        </div>
      </div>

      {/* ════════════════════════════════════
          THREE IMPACT COLUMNS
      ════════════════════════════════════ */}
      <div className="relative z-10" style={{
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
        gap:'2cqw', padding:'0 5.5cqw', flex:1, maxHeight:'40cqh',
      }}>
        {pillars.map((p, pi) => {
          const isH  = hov === pi;
          const isDim = hov !== null && !isH;
          return (
            <div
              key={p.key}
              onMouseEnter={() => setHov(pi)}
              onMouseLeave={() => { setHov(null); setHovItem(null); }}
              style={{
                display:'flex', flexDirection:'column',
                padding:'2.2cqh 2.5cqw',
                background: isH
                  ? 'linear-gradient(145deg, #3a1c0c 0%, #251208 100%)'
                  : 'linear-gradient(135deg, #2E1208 0%, #1A0D06 100%)',
                borderTop:`0.4cqw solid ${p.color}`,
                opacity: isDim ? 0.32 : 1,
                transform: isH ? 'translateY(-0.7cqh) scale(1.02)' : 'translateY(0) scale(1)',
                transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                cursor:'default', position:'relative', overflow:'hidden',
                boxShadow: isH ? `0 1cqh 3cqh ${p.color}28` : 'none',
                animation: go ? `colPop18 0.6s cubic-bezier(0.22,1,0.36,1) ${0.32 + pi * 0.12}s both` : 'none',
              }}
            >
              {/* shimmer on hover */}
              {isH && (
                <div style={{
                  position:'absolute', inset:0, pointerEvents:'none',
                  background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.06) 50%, transparent 70%)',
                  animation:'shimmer18 1.8s ease-in-out infinite',
                }} />
              )}

              {/* Category header */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.8cqw', marginBottom:'2cqh' }}>
                <div style={{
                  width:'1.8cqw', height:'1.8cqw', borderRadius:'50%',
                  border:`0.07cqw solid ${isH ? p.color + 'aa' : p.color + '40'}`,
                  background: isH ? p.color + '22' : p.color + '0a',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all 0.35s ease', flexShrink:0,
                  animation: isH ? 'iconFloat18 1.4s ease-in-out infinite' : 'none',
                }}>
                  <p.Icon size="0.9cqw" color={isH ? p.color : p.color + '99'} strokeWidth={1.5} />
                </div>
                <p style={{
                  fontFamily:'var(--font-display,serif)', fontWeight:700,
                  fontSize:'2cqw',
                  color: isH ? p.color : p.color + 'cc',
                  transition:'color 0.35s ease',
                }}>{p.label}</p>
              </div>

              {/* Items */}
              <div style={{ display:'flex', flexDirection:'column', gap:'1.2cqh' }}>
                {p.items.map((item, ii) => {
                  const itemKey = `${pi}-${ii}`;
                  const isIH  = hovItem === itemKey;
                  const isIDim = hovItem !== null && hovItem.startsWith(`${pi}-`) && !isIH;
                  return (
                    <div
                      key={item}
                      onMouseEnter={(e) => { e.stopPropagation(); setHovItem(itemKey); }}
                      onMouseLeave={() => setHovItem(null)}
                      style={{
                        display:'flex', alignItems:'flex-start', gap:'1cqw',
                        padding:'0.5cqh 0.8cqw',
                        background: isIH ? p.color + '14' : 'transparent',
                        borderLeft:`0.25cqw solid ${isIH ? p.color : p.color + '35'}`,
                        borderRadius:'0 0.3cqw 0.3cqw 0',
                        opacity: isIDim ? 0.32 : 1,
                        transform: isIH ? 'translateX(0.4cqw)' : 'translateX(0)',
                        transition:'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                        animation: go ? `itemSlide18 0.45s ease ${0.52 + pi * 0.12 + ii * 0.07}s both` : 'none',
                      }}
                    >
                      <div style={{
                        width:'0.38cqw', height:'0.38cqw', borderRadius:'50%',
                        background: isIH ? p.color : p.color + '70',
                        marginTop:'0.7cqh', flexShrink:0,
                        transition:'all 0.28s ease',
                        boxShadow: isIH ? `0 0 0.5cqw ${p.color}88` : 'none',
                      }} />
                      <p style={{
                        fontFamily:'var(--font-body,sans-serif)',
                        fontSize:'1.45cqw', lineHeight:1.4,
                        color: isIH ? 'rgba(245,230,200,0.95)' : 'rgba(245,230,200,0.75)',
                        transition:'color 0.28s ease',
                      }}>{item}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom bar */}
              <div style={{
                position:'absolute', bottom:0, left:0, right:0, height:'0.2cqh',
                background:`linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                transform: isH ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin:'center',
                transition:'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
              }} />
            </div>
          );
        })}
      </div>

      {/* ════════════════════════════════════
          CLOSING STATEMENT
      ════════════════════════════════════ */}
      <div className="relative z-10" style={{
        margin:'2.5cqh 5.5cqw 4cqh',
        padding:'2.5cqh 3.5cqw',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        background:'linear-gradient(90deg, rgba(212,160,23,0.12) 0%, rgba(212,160,23,0.04) 100%)',
        border:'0.06cqw solid rgba(212,160,23,0.35)',
        borderRadius:'0.3cqw',
        position:'relative', overflow:'hidden',
        opacity: go ? 1 : 0,
        animation: go
          ? 'closingIn18 0.7s cubic-bezier(0.22,1,0.36,1) 0.88s both, closingPulse18 4.5s ease-in-out 1.6s infinite'
          : 'none',
      }}>
        {/* shimmer sweep */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.07) 50%, transparent 70%)',
          animation:'shimmer18 4s ease-in-out infinite',
        }} />

        <p style={{
          position:'relative',
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          color:'rgba(245,230,200,0.95)', fontSize:'2cqw',
          maxWidth:'56cqw', lineHeight:1.4,
        }}>
          Mari bersama-sama hadirkan festival yang menjadi ikon tahunan Garut!
        </p>

        <div style={{ position:'relative', textAlign:'right', flexShrink:0 }}>
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            color:'#D4A017', fontSize:'2.5cqw', lineHeight:1,
            animation:'pasarGlow18 3s ease-in-out 2s infinite',
          }}>Pasar Seni</p>
          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(154,122,90,0.75)', fontSize:'1.2cqw',
            letterSpacing:'0.1em', marginTop:'0.4cqh',
          }}>GARUT 2026</p>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={18} />
    </div>
  );
}
