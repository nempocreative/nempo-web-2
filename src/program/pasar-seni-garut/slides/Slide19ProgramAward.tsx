import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const awards = [
  { no: '01', title: 'UMKM Champion'             },
  { no: '02', title: 'Culinary Champion'          },
  { no: '03', title: 'Heritage Booth Champion'    },
  { no: '04', title: 'Creative Market Champion'   },
  { no: '05', title: "People's Choice Champion"   },
  { no: '06', title: 'Community Champion'         },
  { no: '07', title: 'Pasar Seni Champion 2026'   },
];

/* ambient orbs */
const orbs = [
  { left:'8%',  top:'15%', r:'15cqw', dur:'13s', delay:'0s'   },
  { left:'45%', top:'72%', r:'9cqw',  dur:'10s', delay:'1.5s' },
  { left:'60%', top:'20%', r:'6cqw',  dur:'12s', delay:'3s'   },
];

/* sparks (left zone) */
const sparks = [
  { left:'15%', top:'60%', dur:'3.5s', delay:'0.5s' },
  { left:'38%', top:'18%', dur:'4.2s', delay:'1.2s' },
  { left:'52%', top:'80%', dur:'3.0s', delay:'0.8s' },
  { left:'28%', top:'42%', dur:'3.8s', delay:'2.1s' },
];

export default function Slide19ProgramAward() {
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
        @keyframes slideL19 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU19 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideR19 {
          from { opacity:0; transform:translateX(3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes growX19 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes growY19 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }
        @keyframes rowPop19 {
          from { opacity:0; transform:translateX(-2cqw) scale(0.96); }
          to   { opacity:1; transform:translateX(0)   scale(1); }
        }

        /* ── ambient ── */
        @keyframes orbGlow19 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.13; }
        }
        @keyframes spark19 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan19 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── trophy icon spin on hover ── */
        @keyframes trophySpin19 {
          0%   { transform:rotate(0deg)   scale(1); }
          25%  { transform:rotate(-15deg) scale(1.2); }
          50%  { transform:rotate(0deg)   scale(1.15); }
          75%  { transform:rotate(15deg)  scale(1.2); }
          100% { transform:rotate(0deg)   scale(1); }
        }
        @keyframes trophyFloat19 {
          0%,100% { transform:translateY(0) scale(1); }
          50%     { transform:translateY(-3px) scale(1.05); }
        }

        /* ── shimmer ── */
        @keyframes shimmer19 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .champ-text19 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 40%, #D4A017 58%, #f0b429 80%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer19 3.5s ease infinite;
        }

        /* ── right panel vertical text ── */
        @keyframes juaraPulse19 {
          0%,100% { opacity:0.12; }
          50%     { opacity:0.22; }
        }
        @keyframes dividerPulse19 {
          0%,100% { opacity:0.35; transform:scaleY(1); }
          50%     { opacity:0.65; transform:scaleY(1.06); }
        }

        /* ── left vertical bar ── */
        @keyframes barGlow19 {
          0%,100% { box-shadow:inset 0 0 0   rgba(212,160,23,0); }
          50%     { box-shadow:inset 0 0 1cqw rgba(212,160,23,0.35); }
        }

        /* ── trailing line anim ── */
        @keyframes lineGrow19 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }

        /* ── right panel shimmer sweep ── */
        @keyframes panelSweep19 {
          0%,100% { opacity:0; transform:translateY(-100%); }
          40%     { opacity:0; }
          50%     { opacity:1; }
          60%     { opacity:0; }
          100%    { transform:translateY(100%); opacity:0; }
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
          animation:`orbGlow19 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark19 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan19 11s linear infinite',
        }} />
      </div>

      {/* ════════════════════════════════════
          LEFT GOLD ACCENT BAR
      ════════════════════════════════════ */}
      <div style={{
        width:'0.6cqw', flexShrink:0,
        background:'linear-gradient(to bottom, transparent, #D4A017 15%, #D4A017 85%, transparent)',
        animation:'barGlow19 3.5s ease-in-out infinite',
        transformOrigin:'top',
        opacity: go ? 1 : 0,
        ...(go ? { animation:'growY19 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s both, barGlow19 3.5s ease-in-out 0.65s infinite' } : {}),
        zIndex:10,
      }} />

      {/* ════════════════════════════════════
          LEFT CONTENT
      ════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-center px-[5.5cqw] py-[7cqh] flex-1">

        {/* Section label + line */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'2.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL19 0.55s cubic-bezier(0.22,1,0.36,1) 0.12s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.75)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'1.1cqw', fontWeight:600, flexShrink:0,
          }}>Program Award</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.28)',
            transformOrigin:'left',
            animation: go ? 'growX19 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'4.2cqw', lineHeight:1.05, marginBottom:'1.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL19 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          <span style={{ color:'rgba(245,230,200,0.97)' }}>JUARA LOCAL<br /></span>
          <span className="champ-text19">CHAMPION AWARDS</span>
        </h2>

        {/* "Kategori:" sub-label */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(154,122,90,0.75)', fontSize:'1.35cqw', marginBottom:'3.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU19 0.5s ease 0.3s both' : 'none',
        }}>Kategori:</p>

        {/* Award rows */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.1cqh' }}>
          {awards.map((award, i) => {
            const isH  = hov === i;
            const isDim = hov !== null && !isH;
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'flex', alignItems:'center', gap:'1.5cqw',
                  padding:'0.8cqh 1.2cqw',
                  background: isH
                    ? 'linear-gradient(90deg, rgba(212,160,23,0.12) 0%, rgba(212,160,23,0.04) 100%)'
                    : 'transparent',
                  borderLeft:`0.28cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.20)'}`,
                  borderRadius:'0 0.4cqw 0.4cqw 0',
                  opacity: isDim ? 0.28 : 1,
                  transform: isH ? 'translateX(0.5cqw)' : 'translateX(0)',
                  transition:'all 0.32s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  animation: go ? `rowPop19 0.5s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.07}s both` : 'none',
                }}
              >
                {/* shimmer on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(90deg, transparent 30%, rgba(212,160,23,0.08) 50%, transparent 70%)',
                    animation:'shimmer19 1.8s ease-in-out infinite',
                  }} />
                )}

                {/* Trophy box */}
                <div style={{
                  width:'2.8cqw', height:'2.8cqw', flexShrink:0,
                  background: isH
                    ? 'linear-gradient(135deg, rgba(212,160,23,0.22) 0%, rgba(212,160,23,0.10) 100%)'
                    : 'linear-gradient(135deg, #2E1208 0%, #1A0D06 100%)',
                  border:`0.05cqw solid ${isH ? 'rgba(212,160,23,0.70)' : 'rgba(212,160,23,0.35)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all 0.32s ease',
                  boxShadow: isH ? '0 0 1cqw rgba(212,160,23,0.28)' : 'none',
                  position:'relative',
                }}>
                  <span style={{
                    fontSize:'1.4cqw', display:'block',
                    animation: isH
                      ? 'trophySpin19 0.6s ease-out, trophyFloat19 2s ease-in-out 0.6s infinite'
                      : 'trophyFloat19 4s ease-in-out infinite',
                  }}>🏆</span>
                </div>

                {/* Number + title */}
                <div style={{ display:'flex', alignItems:'baseline', gap:'0.8cqw', flex:1, minWidth:0 }}>
                  <span style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:900,
                    fontSize:'1.2cqw', lineHeight:1, flexShrink:0,
                    color: isH ? 'rgba(212,160,23,0.60)' : 'rgba(212,160,23,0.22)',
                    transition:'color 0.32s ease',
                  }}>{award.no}</span>
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:600,
                    fontSize:'1.7cqw', lineHeight:1.2,
                    color: isH ? 'rgba(245,230,200,0.98)' : 'rgba(245,230,200,0.82)',
                    transition:'color 0.32s ease',
                  }}>{award.title}</p>
                </div>

                {/* Trailing line */}
                <div style={{
                  flex:1, height:'0.05cqw',
                  background: isH
                    ? 'linear-gradient(to right, rgba(212,160,23,0.45), transparent)'
                    : 'rgba(212,160,23,0.12)',
                  transformOrigin:'left',
                  animation: go ? `lineGrow19 0.6s ease ${0.52 + i * 0.07}s both` : 'none',
                  transition:'background 0.32s ease',
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════
          RIGHT DECORATIVE PANEL
      ════════════════════════════════════ */}
      <div style={{
        width:'20cqw', flexShrink:0,
        background:'linear-gradient(135deg, #2A1A0A 0%, #1A0D06 100%)',
        display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', gap:'2cqh',
        position:'relative', overflow:'hidden',
        opacity: go ? 1 : 0,
        animation: go ? 'slideR19 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
      }}>
        {/* shimmer sweep */}
        <div style={{
          position:'absolute', left:'-30%', right:'-30%', height:'30%',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.06) 50%, transparent)',
          animation:'panelSweep19 7s ease-in-out 1s infinite',
          pointerEvents:'none',
        }} />

        {/* Left border glow */}
        <div style={{
          position:'absolute', top:0, bottom:0, left:0, width:'0.12cqw',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.35) 30%, rgba(212,160,23,0.35) 70%, transparent)',
        }} />

        {/* Vertical "JUARA" text */}
        <p style={{
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          color:'rgba(212,160,23,0.15)', lineHeight:0.9,
          userSelect:'none', writingMode:'vertical-rl',
          transform:'rotate(180deg)', fontSize:'9cqw',
          animation:'juaraPulse19 4s ease-in-out infinite',
          letterSpacing:'-0.02em',
        }}>JUARA</p>

        {/* Center divider */}
        <div style={{
          width:'0.3cqw', height:'6cqh',
          background:'rgba(212,160,23,0.40)',
          animation:'dividerPulse19 3s ease-in-out 1s infinite',
        }} />

        {/* Vertical sub-label */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.50)', letterSpacing:'0.3em',
          textTransform:'uppercase', fontSize:'0.85cqw',
          writingMode:'vertical-rl', transform:'rotate(180deg)',
        }}>Local Champion Awards</p>
      </div>

      <SlideHeader />
      <SlideFooter slide={19} />
    </div>
  );
}
