import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const installs = [
  { no: '01', name: 'Warung Jadul',        sub: 'Sudut toko kuno penuh kenangan'   },
  { no: '02', name: 'Telepon Umum',         sub: 'Ikonik merah — foto favorit'      },
  { no: '03', name: 'Becak',               sub: 'Kendaraan rakyat yang legendaris'  },
  { no: '04', name: 'Sepeda Ontel',         sub: 'Gowes nostalgia ala tempo dulu'   },
  { no: '05', name: 'Radio Klasik',         sub: 'Dendang lagu lawas mengalun'      },
  { no: '06', name: 'Gerobak Tradisional',  sub: 'Pasar rakyat dalam satu frame'    },
];

/* floating dust motes — sepia toned */
const motes = [
  { left:'8%',  top:'25%', dur:'7s',  delay:'0s'   },
  { left:'18%', top:'55%', dur:'9s',  delay:'1.3s' },
  { left:'30%', top:'15%', dur:'6s',  delay:'2.1s' },
  { left:'25%', top:'70%', dur:'8s',  delay:'0.5s' },
  { left:'12%', top:'40%', dur:'10s', delay:'1.8s' },
  { left:'38%', top:'80%', dur:'7.5s',delay:'3.0s' },
];

/* sepia orbs for right panel */
const orbs = [
  { left:'60%', top:'10%', r:'20cqw', dur:'14s', delay:'0s'   },
  { left:'85%', top:'55%', r:'12cqw', dur:'11s', delay:'2s'   },
  { left:'52%', top:'75%', r:'8cqw',  dur:'9s',  delay:'1.2s' },
];

export default function Slide12NostalgiaPhoto() {
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
        @keyframes slideR12 {
          from { opacity:0; transform:translateX(3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideL12 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU12 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX12 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardPop12 {
          from { opacity:0; transform:translateY(2cqh) scale(0.94); }
          to   { opacity:1; transform:translateY(0)  scale(1); }
        }
        @keyframes quoteIn12 {
          from { opacity:0; transform:translateX(2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── photo panel ── */
        @keyframes kBurns12 {
          0%,100% { transform:scale(1.05) translate(0, 0); }
          33%     { transform:scale(1.09) translate(-1%, -1%); }
          66%     { transform:scale(1.07) translate(1%, 0.5%); }
        }
        /* film-grain flicker */
        @keyframes grain12 {
          0%,100% { opacity:0.045; }
          25%     { opacity:0.065; }
          50%     { opacity:0.038; }
          75%     { opacity:0.058; }
        }
        /* vignette pulse */
        @keyframes vigPulse12 {
          0%,100% { opacity:0.75; }
          50%     { opacity:0.62; }
        }

        /* ── ambient ── */
        @keyframes mote12 {
          0%   { transform:translate(0, 0)        scale(1);   opacity:0; }
          15%  { opacity:0.45; }
          80%  { opacity:0.25; }
          100% { transform:translate(4px, -14cqh)  scale(0.5); opacity:0; }
        }
        @keyframes orbGlow12 {
          0%,100% { transform:scale(1);    opacity:0.06; }
          50%     { transform:scale(1.2);  opacity:0.12; }
        }
        @keyframes numSway12 {
          0%,100% { opacity:0.13; transform:translateY(0); }
          50%     { opacity:0.28; transform:translateY(-4px); }
        }

        /* ── title shimmer ── */
        @keyframes shimmer12 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .exp-text12 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 40%, #D4A017 58%, #f0b429 80%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          font-style:italic;
          animation: shimmer12 4.5s ease infinite;
        }

        /* ── quote box pulse ── */
        @keyframes quotePulse12 {
          0%,100% { border-left-color:rgba(212,160,23,0.9); background:rgba(212,160,23,0.10); }
          50%     { border-left-color:#D4A017;              background:rgba(212,160,23,0.16); }
        }

        /* ── badge shimmer ── */
        @keyframes badgeSweep12 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }

        /* ── scan line ── */
        @keyframes scan12 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
      `}</style>

      {/* ── Wayang texture bg ── */}
      <img src={`${base}wayang-deco.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity:0.06 }} alt="" aria-hidden="true" />

      {/* ── Ambient orbs (right half) ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.r, height:o.r, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          animation:`orbGlow12 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Dust motes (left photo zone) ── */}
      {motes.map((m, i) => (
        <div key={i} style={{
          position:'absolute', left:m.left, top:m.top,
          width:'0.35cqw', height:'0.35cqw', borderRadius:'50%',
          background:'rgba(212,160,23,0.55)',
          animation:`mote12 ${m.dur} ease-in-out ${m.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, rgba(212,160,23,0.03) 60%, transparent)',
          animation:'scan12 11s linear infinite',
        }} />
      </div>

      {/* ════════════════════════════════════
          LEFT IMAGE PANEL
      ════════════════════════════════════ */}
      <div style={{
        position:'relative', width:'45%',
        opacity: go ? 1 : 0,
        animation: go ? 'slideL12 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }}>
        {/* Ken Burns photo */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
          <img
            src={`${base}vintage-photo.webp`}
            crossOrigin="anonymous"
            style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover',
              animation:'kBurns12 20s ease-in-out infinite',
              transformOrigin:'center',
            }}
            alt="Nostalgia Photo Experience"
          />
        </div>

        {/* Film-grain overlay (noise via CSS gradient pattern) */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize:'180px 180px',
          mixBlendMode:'overlay',
          animation:'grain12 0.12s steps(1) infinite',
          zIndex:2,
        }} />

        {/* Sepia colour wash */}
        <div style={{
          position:'absolute', inset:0,
          background:'rgba(101,67,33,0.18)',
          mixBlendMode:'multiply', zIndex:3, pointerEvents:'none',
        }} />

        {/* Right-edge gradient bleed */}
        <div style={{
          position:'absolute', inset:0, zIndex:4,
          background:'linear-gradient(to left, rgba(26,13,6,0.82) 0%, rgba(26,13,6,0.30) 40%, rgba(26,13,6,0.05) 70%, transparent 100%)',
        }} />

        {/* Vignette */}
        <div style={{
          position:'absolute', inset:0, zIndex:5, pointerEvents:'none',
          background:'radial-gradient(ellipse at center, transparent 48%, rgba(26,13,6,0.60) 100%)',
          animation:'vigPulse12 6s ease-in-out infinite',
        }} />

        {/* "Tempo Dulu" corner label */}
        <div style={{
          position:'absolute', top:'3.5cqh', left:'2.5cqw', zIndex:8,
          padding:'0.5cqh 1.1cqw',
          border:'0.07cqw solid rgba(212,160,23,0.35)',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU12 0.6s ease 0.55s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.7)', textTransform:'uppercase',
            letterSpacing:'0.28em', fontSize:'0.85cqw',
          }}>Tempo Dulu</span>
        </div>

        {/* Bottom photo caption */}
        <div style={{
          position:'absolute', bottom:'4cqh', left:'2.5cqw', right:'2.5cqw', zIndex:8,
          opacity: go ? 1 : 0,
          animation: go ? 'slideU12 0.6s ease 0.65s both' : 'none',
        }}>
          <p style={{
            fontFamily:'var(--font-display,serif)', fontStyle:'italic',
            color:'rgba(212,160,23,0.55)', fontSize:'1.05cqw', lineHeight:1.5,
          }}>
            "Setiap sudut adalah frame cerita"
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════
          RIGHT CONTENT PANEL
      ════════════════════════════════════ */}
      <div className="relative flex flex-col justify-center px-[5cqw] pt-[10cqh] pb-[8cqh] flex-1 z-10">

        {/* Area badge + line */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw', marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideR12 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          <div style={{
            padding:'0.5cqh 1.2cqw', background:'#8B3A1F',
            flexShrink:0, position:'relative', overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', inset:0, pointerEvents:'none',
              background:'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              animation:'badgeSweep12 2.8s ease-in-out infinite',
            }} />
            <span style={{
              position:'relative',
              fontFamily:'var(--font-body,sans-serif)', fontWeight:700,
              color:'rgba(255,245,220,0.95)', textTransform:'uppercase',
              letterSpacing:'0.3em', fontSize:'0.85cqw',
            }}>Area 06</span>
          </div>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.3)',
            transformOrigin:'left',
            animation: go ? 'growX12 0.9s cubic-bezier(0.22,1,0.36,1) 0.32s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'3.8cqw', lineHeight:1.05, marginBottom:'1.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideR12 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s both' : 'none',
        }}>
          <span style={{ color:'rgba(245,230,200,0.97)' }}>Nostalgia Photo<br /></span>
          <span className="exp-text12">Experience</span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(154,122,90,0.85)', fontSize:'1.35cqw', marginBottom:'3cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU12 0.6s ease 0.38s both' : 'none',
        }}>
          Instalasi ikonik — pusat dokumentasi &amp; viral content pengunjung
        </p>

        {/* Section label */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw', marginBottom:'1.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU12 0.5s ease 0.46s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
            letterSpacing:'0.22em', fontSize:'1cqw', fontWeight:600,
          }}>Instalasi</span>
          <div style={{
            flex:1, height:'0.07cqh',
            background:'linear-gradient(to right, rgba(212,160,23,0.35), transparent)',
          }} />
        </div>

        {/* 2-column instalasi grid */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'0.8cqh 2cqw', marginBottom:'3cqh',
        }}>
          {installs.map((item, i) => {
            const isH  = hov === i;
            const isDim = hov !== null && !isH;
            return (
              <div
                key={item.no}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'flex', alignItems:'center', gap:'1cqw',
                  padding:'0.9cqh 1.2cqw',
                  background: isH
                    ? 'linear-gradient(135deg, rgba(58,28,12,0.92) 0%, rgba(37,18,8,0.92) 100%)'
                    : 'rgba(255,245,220,0.03)',
                  border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.55)' : 'rgba(212,160,23,0.12)'}`,
                  borderLeft:`0.3cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.22)'}`,
                  borderRadius:'0 0.4cqw 0.4cqw 0',
                  opacity: isDim ? 0.28 : 1,
                  transform: isH ? 'translateX(0.5cqw) scale(1.02)' : 'translateX(0) scale(1)',
                  transition:'all 0.32s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  animation: go ? `cardPop12 0.5s cubic-bezier(0.22,1,0.36,1) ${0.52 + i * 0.07}s both` : 'none',
                }}
              >
                {/* shimmer sweep on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.07) 50%, transparent 70%)',
                    animation:'shimmer12 1.8s ease-in-out infinite',
                  }} />
                )}

                {/* Number */}
                <span style={{
                  fontFamily:'var(--font-display,serif)', fontWeight:900,
                  fontSize:'2.0cqw', lineHeight:1, flexShrink:0,
                  color: isH ? 'rgba(212,160,23,0.40)' : 'rgba(212,160,23,0.13)',
                  transition:'color 0.32s ease',
                  animation:'numSway12 3s ease-in-out infinite',
                  userSelect:'none',
                }}>{item.no}</span>

                {/* Name + sub */}
                <div>
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:700,
                    fontSize:'1.45cqw', lineHeight:1.1,
                    color: isH ? '#D4A017' : 'rgba(245,230,200,0.88)',
                    transition:'color 0.32s ease', marginBottom:'0.12cqh',
                  }}>{item.name}</p>
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)',
                    fontSize:'0.88cqw', lineHeight:1.4,
                    color: isH ? 'rgba(245,230,200,0.55)' : 'rgba(212,160,23,0.30)',
                    transition:'color 0.32s ease',
                  }}>{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote box */}
        <div style={{
          padding:'1.5cqh 2cqw',
          borderLeft:'0.32cqw solid rgba(212,160,23,0.9)',
          background:'rgba(212,160,23,0.10)',
          animation:'quotePulse12 4s ease-in-out 1s infinite',
          opacity: go ? 1 : 0,
          ...(go ? { animation:`quoteIn12 0.65s ease 1.0s both, quotePulse12 4s ease-in-out 1.65s infinite` } : {}),
        }}>
          <p style={{
            fontFamily:'var(--font-body,sans-serif)', fontWeight:600,
            color:'rgba(212,160,23,0.95)', fontSize:'1.35cqw', lineHeight:1.5,
          }}>
            Titik dokumentasi utama &amp; pusat viral content pengunjung
          </p>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={12} />
    </div>
  );
}
