import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

/* floating ambient orbs */
const orbs = [
  { left:'12%', top:'15%', r:'18cqw', dur:'12s', delay:'0s',   op:0.07 },
  { left:'72%', top:'10%', r:'14cqw', dur:'15s', delay:'2s',   op:0.06 },
  { left:'85%', top:'60%', r:'10cqw', dur:'10s', delay:'1s',   op:0.08 },
  { left:'5%',  top:'55%', r:'8cqw',  dur:'13s', delay:'3s',   op:0.05 },
  { left:'50%', top:'5%',  r:'6cqw',  dur:'9s',  delay:'0.5s', op:0.06 },
];

/* sparkling gold particles */
const sparks = [
  { left:'22%', top:'32%', dur:'3.2s', delay:'0.4s'  },
  { left:'45%', top:'18%', dur:'4.0s', delay:'1.1s'  },
  { left:'68%', top:'42%', dur:'3.6s', delay:'0.7s'  },
  { left:'80%', top:'22%', dur:'2.8s', delay:'1.8s'  },
  { left:'15%', top:'70%', dur:'3.9s', delay:'0.2s'  },
  { left:'60%', top:'72%', dur:'3.3s', delay:'2.3s'  },
  { left:'38%', top:'55%', dur:'4.2s', delay:'0.9s'  },
  { left:'90%', top:'50%', dur:'3.0s', delay:'1.5s'  },
];

export default function Slide01Cover() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg">
      <style>{`
        /* ── title shimmer ── */
        @keyframes gradShift01 {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .title-gradient01 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 18%, #f5c842 33%,
            #fff8dc 50%, #c8860a 65%, #f0b429 80%, #fffbe8 100%
          );
          background-size: 260% 260%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift01 4.5s ease infinite;
        }

        /* ── ambient orbs ── */
        @keyframes orbPulse01 {
          0%,100% { transform:scale(1);    opacity:var(--op); }
          50%     { transform:scale(1.18); opacity:calc(var(--op)*1.6); }
        }

        /* ── sparkling dots ── */
        @keyframes spark01 {
          0%   { transform:scale(0) rotate(0deg);   opacity:0; }
          20%  { opacity:0.55; }
          60%  { transform:scale(1.4) rotate(180deg); opacity:0.35; }
          100% { transform:scale(0) rotate(360deg); opacity:0; }
        }

        /* ── entrance ── */
        @keyframes fadeUp01 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeDown01 {
          from { opacity:0; transform:translateY(-2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scaleIn01 {
          from { opacity:0; transform:scaleX(0); }
          to   { opacity:1; transform:scaleX(1); }
        }
        @keyframes popIn01 {
          from { opacity:0; transform:scale(0.85); }
          to   { opacity:1; transform:scale(1); }
        }

        /* ── floating wayang silhouette ── */
        @keyframes wayangSway01 {
          0%,100% { transform:translateY(0) rotate(-0.5deg); }
          50%     { transform:translateY(-8px) rotate(0.5deg); }
        }

        /* ── background slow drift ── */
        @keyframes bgDrift01 {
          0%,100% { transform:scale(1.06) translateY(0); }
          50%     { transform:scale(1.08) translateY(-10px); }
        }

        /* ── divider line pulse ── */
        @keyframes linePulse01 {
          0%,100% { opacity:1; }
          50%     { opacity:0.45; }
        }

        /* ── badge shimmer ── */
        @keyframes badgeShimmer01 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }

        /* ── scan line ── */
        @keyframes scan01 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── dancer figures ── */
        @keyframes dancerIn01L {
          from { opacity:0; transform:translateX(-3cqw) translateY(4cqh); }
          to   { opacity:1; transform:translateX(0) translateY(0); }
        }
        @keyframes dancerIn01R {
          from { opacity:0; transform:translateX(3cqw) translateY(4cqh); }
          to   { opacity:1; transform:translateX(0) translateY(0); }
        }
        @keyframes dancerFloat01 {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-8px); }
        }
      `}</style>

      {/* ── Background photo with gentle drift ── */}
      <img
        src={`${base}cover-hero.webp`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation:'bgDrift01 18s ease-in-out infinite', transformOrigin:'center' }}
        alt="Pasar Seni Garut"
      />

      {/* ── Wayang texture overlay with subtle sway ── */}
      <img
        src={`${base}wayang-deco.webp`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 0.18,
          mixBlendMode:'luminosity',
          animation:'wayangSway01 10s ease-in-out infinite',
          transformOrigin:'bottom center',
        }}
        alt="" aria-hidden="true"
      />

      {/* ── Main gradient veil ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(26,13,6,0.98) 0%, rgba(26,13,6,0.80) 40%, rgba(26,13,6,0.45) 70%, rgba(26,13,6,0.20) 100%)',
        }}
      />
      {/* side vignette */}
      <div className="absolute inset-0" style={{
        background:'radial-gradient(ellipse at center, transparent 55%, rgba(26,13,6,0.55) 100%)',
      }} />

      {/* ── Ambient gold orbs ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.r, height:o.r, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          ['--op' as string]: o.op,
          animation:`orbPulse01 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Gold spark particles ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.45cqw', height:'0.45cqw', borderRadius:'50%',
          background:'#D4A017',
          boxShadow:'0 0 0.5cqw rgba(212,160,23,0.6)',
          animation:`spark01 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Slow scan line ── */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.4cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, rgba(212,160,23,0.04) 60%, transparent)',
          animation:'scan01 12s linear infinite',
        }} />
      </div>

      {/* ── Dancer Putri — LEFT ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '38cqw', height: '100cqh',
        pointerEvents: 'none', zIndex: 4,
        display: 'flex', alignItems: 'flex-end',
        overflow: 'hidden',
        animation: 'dancerIn01L 1.0s cubic-bezier(0.22,1,0.36,1) 0.3s both',
      }}>
        <img
          src={`${base}dancer-putri.webp`}
          style={{
            height: '76cqh', width: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 0 2.5cqw rgba(212,160,23,0.35))',
            animation: 'dancerFloat01 7s ease-in-out 1.6s infinite',
          }}
          alt="Penari Putri"
        />
        {/* fade bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
          background: 'linear-gradient(to top, rgba(26,13,6,0.98) 0%, transparent 100%)',
        }} />
        {/* fade right edge */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '25%',
          background: 'linear-gradient(to left, rgba(26,13,6,0.65) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── Dancer Putra — RIGHT ── */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '48cqw', height: '100cqh',
        pointerEvents: 'none', zIndex: 4,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        overflow: 'hidden',
        animation: 'dancerIn01R 1.0s cubic-bezier(0.22,1,0.36,1) 0.45s both',
      }}>
        <img
          src={`${base}dancer-putra.webp`}
          style={{
            height: '76cqh', width: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 0 2.5cqw rgba(212,160,23,0.35))',
            animation: 'dancerFloat01 8s ease-in-out 2s infinite',
          }}
          alt="Penari Putra"
        />
        {/* fade bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
          background: 'linear-gradient(to top, rgba(26,13,6,0.98) 0%, transparent 100%)',
        }} />
        {/* fade left edge */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '25%',
          background: 'linear-gradient(to right, rgba(26,13,6,0.65) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── Horizontal gold lines — top & bottom accent ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.4cqh',
        background:'linear-gradient(to right, transparent, rgba(212,160,23,0.5) 30%, rgba(212,160,23,0.5) 70%, transparent)',
        zIndex:10,
        opacity: go ? 1 : 0,
        animation: go ? 'fadeDown01 0.8s ease 0.2s both' : 'none',
      }} />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-[8cqh] text-center px-[8cqw]">

        {/* Badge */}
        <div style={{
          marginBottom:'2.2cqh',
          padding:'0.8cqh 2cqw',
          border:'0.07cqw solid rgba(212,160,23,0.6)',
          borderRadius:'0.2cqw',
          position:'relative', overflow:'hidden',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp01 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s both' : 'none',
        }}>
          {/* shimmer inside badge */}
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none',
            background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.12) 50%, transparent 70%)',
            backgroundSize:'200% auto',
            animation:'badgeShimmer01 2.5s ease-in-out infinite',
          }} />
          <span style={{
            position:'relative',
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.9)', letterSpacing:'0.4em',
            textTransform:'uppercase', fontSize:'1.1cqw', fontWeight:600,
          }}>
            Proposal Kolaborasi
          </span>
        </div>

        {/* Hashtag */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(245,230,200,0.45)', letterSpacing:'0.08em',
          fontSize:'1.2cqw', marginBottom:'1.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp01 0.6s ease 0.25s both' : 'none',
        }}>
          #PasarParaJuara
        </p>

        {/* Main title */}
        <h1 className="title-gradient01" style={{
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          fontSize:'7.2cqw', lineHeight:0.92,
          letterSpacing:'-0.02em', marginBottom:'2.2cqh',
          textWrap:'balance' as React.CSSProperties['textWrap'],
          opacity: go ? 1 : 0,
          animation: go ? 'popIn01 0.85s cubic-bezier(0.22,1,0.36,1) 0.32s both' : 'none',
        }}>
          Pasar Seni<br />Garut 2026
        </h1>

        {/* Divider + subtitle */}
        <div style={{
          display:'flex', alignItems:'center', gap:'2cqw', marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp01 0.7s ease 0.5s both' : 'none',
        }}>
          <div style={{
            width:'6cqw', height:'0.18cqh', background:'#D4A017',
            transformOrigin:'right',
            animation:'linePulse01 3s ease-in-out 1s infinite',
          }} />
          <p style={{
            fontFamily:'var(--font-display,serif)', fontStyle:'italic',
            color:'#D4A017', fontSize:'2.2cqw',
          }}>
            Juara × Nempo Garut
          </p>
          <div style={{
            width:'6cqw', height:'0.18cqh', background:'#D4A017',
            transformOrigin:'left',
            animation:'linePulse01 3s ease-in-out 1s infinite',
          }} />
        </div>

        {/* Description */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(245,230,200,0.72)', fontSize:'1.6cqw', maxWidth:'48cqw',
          textWrap:'balance' as React.CSSProperties['textWrap'],
          marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp01 0.6s ease 0.62s both' : 'none',
        }}>
          Kolaborasi Festival Budaya, UMKM &amp; Komunitas Kreatif
        </p>

        {/* Date + Location */}
        <div style={{
          display:'flex', alignItems:'center', gap:'3cqw',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp01 0.6s ease 0.75s both' : 'none',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.8cqw' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ width:'1.4cqw', height:'1.4cqw', color:'#D4A017', flexShrink:0 }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(245,230,200,0.6)', fontSize:'1.3cqw', letterSpacing:'0.05em',
            }}>
              25–27 September 2026
            </span>
          </div>
          <div style={{ width:'0.12cqw', height:'2cqh', background:'rgba(212,160,23,0.4)' }} />
          <div style={{ display:'flex', alignItems:'center', gap:'0.8cqw' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ width:'1.4cqw', height:'1.4cqw', color:'#D4A017', flexShrink:0 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(245,230,200,0.6)', fontSize:'1.3cqw', letterSpacing:'0.05em',
            }}>
              Ciplaz Garut <span style={{ color:'rgba(245,230,200,0.32)' }}>(Opsional)</span>
            </span>
          </div>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={1} />
    </div>
  );
}
