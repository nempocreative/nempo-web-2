import { useEffect, useState } from 'react';
import { Sofa, Zap, Camera, MessageCircle } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const facilities = [
  {
    no: '01', Icon: Sofa,          name: 'Tempat Duduk',
    desc: 'Ruang duduk nyaman berkonsep vintage heritage',
  },
  {
    no: '02', Icon: Zap,           name: 'Charging Station',
    desc: 'Fasilitas pengisian daya untuk pengunjung',
  },
  {
    no: '03', Icon: Camera,        name: 'Spot Foto Eksklusif',
    desc: 'Instalasi foto berbranding Juara',
  },
  {
    no: '04', Icon: MessageCircle, name: 'Area Interaksi',
    desc: 'Ruang interaksi komunitas pengunjung',
  },
];

/* ambient orbs */
const orbs = [
  { left:'38%', top:'10%', r:'18cqw', dur:'14s', delay:'0s'   },
  { left:'80%', top:'65%', r:'11cqw', dur:'11s', delay:'2s'   },
  { left:'55%', top:'80%', r:'7cqw',  dur:'9s',  delay:'1s'   },
];

/* sparks */
const sparks = [
  { left:'45%', top:'18%', dur:'3.5s', delay:'0.5s' },
  { left:'70%', top:'35%', dur:'4.2s', delay:'1.3s' },
  { left:'88%', top:'20%', dur:'3.0s', delay:'0.8s' },
  { left:'62%', top:'72%', dur:'3.8s', delay:'2.0s' },
  { left:'93%', top:'55%', dur:'4.5s', delay:'1.6s' },
];

/* left-panel floating dots */
const dots = [
  { left:'15%', top:'28%', dur:'5s',  delay:'0s'   },
  { left:'70%', top:'50%', dur:'7s',  delay:'1.2s' },
  { left:'35%', top:'72%', dur:'6s',  delay:'2.4s' },
  { left:'80%', top:'20%', dur:'4.5s',delay:'0.8s' },
];

export default function Slide15AktivasiLounge() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL15 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideR15 {
          from { opacity:0; transform:translateX(3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU15 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX15 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardPop15 {
          from { opacity:0; transform:translateY(3.5cqh) scale(0.93); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }

        /* ── left panel ── */
        @keyframes panelShimmer15 {
          0%,100% { transform:translateX(-100%); opacity:0; }
          45%     { opacity:0; }
          50%     { opacity:1; transform:translateX(0); }
          55%     { opacity:0; }
          100%    { transform:translateX(100%); opacity:0; }
        }
        @keyframes titleGlow15 {
          0%,100% { text-shadow: 0 0 0   rgba(245,230,200,0);   }
          50%     { text-shadow: 0 0 3cqw rgba(245,230,200,0.12); }
        }
        @keyframes dotFloat15 {
          0%,100% { transform:translateY(0)    scale(1);   opacity:0.10; }
          50%     { transform:translateY(-8px) scale(1.2); opacity:0.22; }
        }
        @keyframes accentLine15 {
          0%,100% { opacity:1; transform:scaleX(1); }
          50%     { opacity:0.5; transform:scaleX(0.85); }
        }

        /* ── ambient ── */
        @keyframes orbGlow15 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.2);  opacity:0.13; }
        }
        @keyframes spark15 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan15 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── card hover ── */
        @keyframes shimmer15 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        @keyframes numSway15 {
          0%,100% { opacity:0.12; transform:translateY(0); }
          50%     { opacity:0.28; transform:translateY(-4px); }
        }
        @keyframes iconBounce15 {
          0%,100% { transform:translateY(0) scale(1); }
          45%     { transform:translateY(-5px) scale(1.1); }
          65%     { transform:translateY(-3px) scale(1.05); }
        }

        /* ── title shimmer ── */
        @keyframes shimmerTitle15 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .lounge-text15 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 20%, #f5c842 38%,
            #fff8dc 54%, #D4A017 70%, #fffbe8 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmerTitle15 4s ease infinite;
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
          animation:`orbGlow15 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark15 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan15 10s linear infinite',
        }} />
      </div>

      {/* ════════════════════════════════════
          LEFT PANEL
      ════════════════════════════════════ */}
      <div style={{
        position:'relative', width:'35%',
        background:'linear-gradient(135deg, #3A1A08 0%, #1A0D06 100%)',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        padding:'7.5cqh 4cqw 6.5cqh',
        overflow:'hidden',
      }}>
        {/* shimmer sweep */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(110deg, transparent 40%, rgba(212,160,23,0.055) 50%, transparent 60%)',
          animation:'panelShimmer15 6s ease-in-out 1s infinite',
        }} />

        {/* Floating dots */}
        {dots.map((d, i) => (
          <div key={i} style={{
            position:'absolute', left:d.left, top:d.top,
            width:'0.5cqw', height:'0.5cqw', borderRadius:'50%',
            background:'rgba(212,160,23,0.18)',
            border:'0.07cqw solid rgba(212,160,23,0.25)',
            animation:`dotFloat15 ${d.dur} ease-in-out ${d.delay} infinite`,
            pointerEvents:'none',
          }} />
        ))}

        {/* Top section */}
        <div style={{ position:'relative', zIndex:5 }}>
          <div style={{
            width:'4cqw', height:'0.4cqh', background:'#D4A017', marginBottom:'3cqh',
            animation:'accentLine15 3.5s ease-in-out 1s infinite',
            opacity: go ? 1 : 0,
            ...(go ? { animation:`slideL15 0.5s ease 0.1s both, accentLine15 3.5s ease-in-out 1.5s infinite` } : {}),
          }} />

          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.75)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'1.1cqw', fontWeight:600,
            marginBottom:'2cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'slideL15 0.55s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
          }}>Aktivasi Juara</p>

          <h2 style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'4.8cqw', lineHeight:0.95,
            animation:'titleGlow15 4s ease-in-out 1.5s infinite',
            opacity: go ? 1 : 0,
            ...(go ? { animation:`slideL15 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both, titleGlow15 4s ease-in-out 1.5s infinite` } : {}),
          }}>
            <span style={{ color:'rgba(245,230,200,0.97)' }}>Heritage<br /></span>
            <span className="lounge-text15">Lounge</span>
          </h2>
        </div>

        {/* Bottom section */}
        <div style={{ position:'relative', zIndex:5 }}>
          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(154,122,90,0.82)', fontSize:'1.4cqw', lineHeight:1.6,
            marginBottom:'1.8cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'slideU15 0.6s ease 0.38s both' : 'none',
          }}>
            Area eksklusif berkonsep vintage sebagai titik berkumpul pengunjung
          </p>
          <div style={{
            width:'3cqw', height:'0.3cqh', background:'#8B3A1F',
            opacity: go ? 1 : 0,
            animation: go ? 'slideU15 0.5s ease 0.48s both' : 'none',
          }} />
        </div>

        {/* Right-edge glow line */}
        <div style={{
          position:'absolute', top:0, bottom:0, right:0, width:'0.12cqw',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.35) 35%, rgba(212,160,23,0.35) 65%, transparent)',
        }} />
      </div>

      {/* ════════════════════════════════════
          RIGHT PANEL — FACILITIES GRID
      ════════════════════════════════════ */}
      <div className="relative flex flex-col justify-center px-[5cqw] pt-[10cqh] pb-[8cqh] flex-1 z-10">

        {/* Section label */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw', marginBottom:'2.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideR15 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.72)', textTransform:'uppercase',
            letterSpacing:'0.22em', fontSize:'1.1cqw', fontWeight:600, flexShrink:0,
          }}>Fasilitas</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.28)',
            transformOrigin:'left',
            animation: go ? 'growX15 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }} />
        </div>

        {/* 2×2 grid */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'1.5cqw', height:'58cqh',
        }}>
          {facilities.map((f, i) => {
            const isH  = hov === i;
            const isDim = hov !== null && !isH;
            return (
              <div
                key={f.no}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'flex', flexDirection:'column', justifyContent:'space-between',
                  padding:'2.2cqh 2cqw',
                  background: isH
                    ? 'linear-gradient(145deg, #3a1c0c 0%, #251208 100%)'
                    : 'linear-gradient(135deg, #231008 0%, #1F0F06 100%)',
                  border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.60)' : 'rgba(212,160,23,0.22)'}`,
                  borderTop:`0.28cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.28)'}`,
                  borderRadius:'0 0 0.5cqw 0.5cqw',
                  opacity: isDim ? 0.28 : 1,
                  transform: isH ? 'translateY(-0.7cqh) scale(1.02)' : 'translateY(0) scale(1)',
                  transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  boxShadow: isH ? '0 1cqh 2.5cqh rgba(212,160,23,0.20)' : 'none',
                  animation: go ? `cardPop15 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.1}s both` : 'none',
                }}
              >
                {/* shimmer on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.07) 50%, transparent 70%)',
                    animation:'shimmer15 1.8s ease-in-out infinite',
                  }} />
                )}

                {/* Top: number + icon */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                  <span style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:900,
                    fontSize:'3.5cqw', lineHeight:1,
                    color: isH ? 'rgba(212,160,23,0.38)' : 'rgba(212,160,23,0.13)',
                    transition:'color 0.35s ease',
                    animation:'numSway15 3s ease-in-out infinite',
                    userSelect:'none',
                  }}>{f.no}</span>

                  <div style={{
                    width:'2.4cqw', height:'2.4cqw', borderRadius:'50%',
                    border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.65)' : 'rgba(212,160,23,0.20)'}`,
                    background: isH ? 'rgba(212,160,23,0.18)' : 'rgba(212,160,23,0.07)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'all 0.35s ease',
                    animation: isH ? 'iconBounce15 1.4s ease-in-out infinite' : 'none',
                    flexShrink:0,
                  }}>
                    <f.Icon
                      size="1.1cqw"
                      color={isH ? '#D4A017' : 'rgba(212,160,23,0.40)'}
                      strokeWidth={1.5}
                      style={{ transition:'color 0.35s ease' }}
                    />
                  </div>
                </div>

                {/* Bottom: name + desc */}
                <div>
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:700,
                    fontSize:'2cqw', lineHeight:1.15,
                    color: isH ? '#D4A017' : 'rgba(212,160,23,0.85)',
                    transition:'color 0.35s ease', marginBottom:'0.6cqh',
                  }}>{f.name}</p>
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)',
                    fontSize:'1.2cqw', lineHeight:1.5,
                    color: isH ? 'rgba(245,230,200,0.60)' : 'rgba(154,122,90,0.75)',
                    transition:'color 0.35s ease',
                  }}>{f.desc}</p>
                </div>

                {/* Bottom bar slide */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0, height:'0.22cqh',
                  background:'linear-gradient(90deg, transparent, #D4A017, transparent)',
                  transform: isH ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin:'center',
                  transition:'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                }} />
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={15} />
    </div>
  );
}
