import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const shows = [
  { no: '01', name: 'Jaipongan',       sub: 'Tari tradisional Sunda penuh energi' },
  { no: '02', name: 'Calung',           sub: 'Musik bambu yang ritmis & mengalun' },
  { no: '03', name: 'Angklung',         sub: 'Harmoni bunyi bambu warisan dunia' },
  { no: '04', name: 'Karinding',        sub: 'Alat musik mulut paling purba Sunda' },
  { no: '05', name: 'Musik Akustik',    sub: 'Perpaduan modern dan tradisional' },
  { no: '06', name: 'Seni Pertunjukan', sub: 'Teater & pameran seni panggung' },
];

/* floating light-spot particles */
const particles = [
  { left:'62%', top:'18%', r:'8cqw',  dur:'7s',  delay:'0s',   op:0.08 },
  { left:'80%', top:'55%', r:'5cqw',  dur:'9s',  delay:'1.2s', op:0.06 },
  { left:'55%', top:'70%', r:'3cqw',  dur:'6s',  delay:'0.5s', op:0.10 },
  { left:'90%', top:'25%', r:'4cqw',  dur:'8s',  delay:'2s',   op:0.05 },
  { left:'70%', top:'40%', r:'6cqw',  dur:'11s', delay:'0.8s', op:0.04 },
];

/* musical note chars */
const notes = [
  { ch:'♪', left:'65%', top:'12%', dur:'4.5s', delay:'0.3s'  },
  { ch:'♫', left:'78%', top:'28%', dur:'5.2s', delay:'1.0s'  },
  { ch:'♩', left:'60%', top:'58%', dur:'4.0s', delay:'1.8s'  },
  { ch:'♬', left:'88%', top:'64%', dur:'6.0s', delay:'0.6s'  },
  { ch:'♪', left:'73%', top:'80%', dur:'4.8s', delay:'2.2s'  },
];

export default function Slide10HeritageStage() {
  const [go, setGo]   = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL10 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU10 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX10 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardPop10 {
          from { opacity:0; transform:translateY(3cqh) scale(0.94); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        /* ── ambient ── */
        @keyframes pulse10 {
          0%,100% { transform:scale(1);   opacity:var(--op); }
          50%     { transform:scale(1.15); opacity:calc(var(--op)*1.5); }
        }
        @keyframes noteFloat10 {
          0%   { transform:translateY(0)    rotate(0deg);   opacity:0; }
          10%  { opacity:0.35; }
          80%  { opacity:0.25; }
          100% { transform:translateY(-12cqh) rotate(15deg); opacity:0; }
        }
        @keyframes shimmerTitle10 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        @keyframes scanLine10 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
        @keyframes borderPulse10 {
          0%,100% { box-shadow: 0 0 0   rgba(212,160,23,0); }
          50%     { box-shadow: 0 0 2cqh rgba(212,160,23,0.3); }
        }
        @keyframes numSway10 {
          0%,100% { opacity:0.12; transform:translateY(0); }
          50%     { opacity:0.28; transform:translateY(-4px); }
        }
        /* ── spotlight sweep on bg ── */
        @keyframes spotMove10 {
          0%,100% { transform:translate(0,0)   scale(1);    opacity:0.18; }
          33%     { transform:translate(3cqw,-2cqh) scale(1.1); opacity:0.26; }
          66%     { transform:translate(-2cqw,3cqh) scale(0.95); opacity:0.14; }
        }

        .stage-title10 {
          background: linear-gradient(90deg,
            #e8c060 0%, #fff5cc 28%, #D4A017 50%, #f0b830 72%, #e8c060 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmerTitle10 4s ease infinite;
        }
      `}</style>

      {/* ── Background photo ── */}
      <img
        src={`${base}heritage-stage.webp`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Heritage Stage"
      />
      {/* Batik texture overlay */}
      <img
        src={`${base}batik-texture.webp`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.10, mixBlendMode:'overlay' }}
        alt="" aria-hidden="true"
      />
      {/* Gradient veil — heavier on left, lighter on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(26,13,6,0.97) 0%, rgba(26,13,6,0.88) 42%, rgba(26,13,6,0.45) 72%, rgba(26,13,6,0.20) 100%)',
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ height:'30cqh', background:'linear-gradient(to top, rgba(26,13,6,0.85) 0%, transparent 100%)' }}
      />

      {/* ── Spotlight blobs ── */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position:'absolute', left:p.left, top:p.top,
          width:p.r, height:p.r,
          borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          ['--op' as string]: p.op,
          animation:`pulse10 ${p.dur} ease-in-out ${p.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Floating musical notes (right half) ── */}
      {notes.map((n, i) => (
        <span key={i} style={{
          position:'absolute', left:n.left, top:n.top,
          fontSize:'2.2cqw',
          color:'rgba(212,160,23,0.22)',
          animation:`noteFloat10 ${n.dur} ease-in-out ${n.delay} infinite`,
          pointerEvents:'none', zIndex:2, userSelect:'none',
        }}>
          {n.ch}
        </span>
      ))}

      {/* ── Vertical accent bar ── */}
      <div style={{
        position:'absolute', left:0, top:0, bottom:0, width:'0.45cqw',
        background:'#D4A017', zIndex:10,
      }} />
      {/* ── Horizontal accent top ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.5cqh',
        background:'linear-gradient(to right, #D4A017 0%, rgba(212,160,23,0.2) 60%, transparent 100%)',
        zIndex:10,
      }} />

      {/* ── Thin scan-line sweep (subtle) ── */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:3,
        overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.3cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.08) 40%, rgba(212,160,23,0.04) 60%, transparent)',
          animation:'scanLine10 8s linear infinite',
        }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col justify-center h-full px-[5.5cqw] pt-[10cqh] pb-[9cqh] max-w-[54cqw]">

        {/* Area badge + line */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw',
          marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL10 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <div style={{ padding:'0.5cqh 1.2cqw', background:'#8B3A1F', flexShrink:0, position:'relative', overflow:'hidden' }}>
            {/* shimmer inside badge */}
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
              animation:'shimmerTitle10 2.5s ease infinite',
            }} />
            <span style={{
              position:'relative',
              fontFamily:'var(--font-body,sans-serif)', fontWeight:700,
              color:'rgba(255,245,220,0.95)', textTransform:'uppercase',
              letterSpacing:'0.3em', fontSize:'0.85cqw',
            }}>Area 04</span>
          </div>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.3)',
            transformOrigin:'left',
            animation: go ? 'growX10 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          fontSize:'5.8cqw', lineHeight:0.92, letterSpacing:'-0.02em',
          marginBottom:'0.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL10 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
        }}>
          <span style={{ color:'rgba(245,230,200,0.97)' }}>Heritage<br /></span>
          <span className="stage-title10">Stage</span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.55)', fontSize:'1.4cqw', lineHeight:1.5,
          marginBottom:'4cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU10 0.6s ease 0.32s both' : 'none',
        }}>
          Panggung utama yang menjadi ikon visual festival
        </p>

        {/* Section label */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw',
          marginBottom:'2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU10 0.5s ease 0.4s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
            letterSpacing:'0.22em', fontSize:'1cqw', fontWeight:600,
          }}>Pertunjukan</span>
          <div style={{
            flex:1, height:'0.07cqh', background:'linear-gradient(to right, rgba(212,160,23,0.35), transparent)',
          }} />
        </div>

        {/* Performance cards grid */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'0.9cqh 2.5cqw',
        }}>
          {shows.map((s, i) => {
            const isH = hov === i;
            const isDim = hov !== null && !isH;
            return (
              <div
                key={s.no}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'flex', alignItems:'center', gap:'1.2cqw',
                  padding:'1.1cqh 1.4cqw',
                  background: isH
                    ? 'linear-gradient(135deg, rgba(58,28,12,0.9) 0%, rgba(37,18,8,0.9) 100%)'
                    : 'rgba(26,13,6,0.45)',
                  border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.55)' : 'rgba(212,160,23,0.15)'}`,
                  borderLeft:`0.3cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.28)'}`,
                  borderRadius:'0 0.4cqw 0.4cqw 0',
                  opacity: isDim ? 0.3 : 1,
                  transform: isH ? 'translateX(0.5cqw) scale(1.015)' : 'translateX(0) scale(1)',
                  transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  animation: go ? `cardPop10 0.55s cubic-bezier(0.22,1,0.36,1) ${0.45 + i * 0.07}s both` : 'none',
                }}
              >
                {/* shimmer sweep on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.06) 50%, transparent 70%)',
                    animation:'shimmerTitle10 1.8s ease-in-out infinite',
                  }} />
                )}

                {/* Number */}
                <span style={{
                  fontFamily:'var(--font-display,serif)', fontWeight:900,
                  fontSize:'2.6cqw', lineHeight:1, flexShrink:0,
                  color: isH ? 'rgba(212,160,23,0.38)' : 'rgba(212,160,23,0.13)',
                  transition:'color 0.35s ease',
                  animation:'numSway10 3s ease-in-out infinite',
                  userSelect:'none',
                }}>
                  {s.no}
                </span>

                {/* Text */}
                <div>
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:700,
                    fontSize:'1.65cqw', lineHeight:1.1,
                    color: isH ? '#D4A017' : 'rgba(245,230,200,0.88)',
                    transition:'color 0.35s ease',
                    marginBottom:'0.2cqh',
                  }}>
                    {s.name}
                  </p>
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)',
                    fontSize:'1.0cqw', lineHeight:1.4,
                    color: isH ? 'rgba(245,230,200,0.6)' : 'rgba(212,160,23,0.35)',
                    transition:'color 0.35s ease',
                  }}>
                    {s.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={10} />
    </div>
  );
}
