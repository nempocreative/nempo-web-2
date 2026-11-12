import { useEffect, useRef, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const segments = [
  'Usia 18–45 Tahun',
  'Mahasiswa',
  'Komunitas',
  'Pelaku UMKM',
  'Keluarga Muda',
  'Wisatawan Lokal',
];

const regions = ['Garut', 'Bandung', 'Tasikmalaya', 'Sumedang', 'Priangan Timur'];

/* rings around the big stat number */
const rings = [
  { r:'13cqw', dur:'18s', delay:'0s',   op:0.10, dash:'4 6' },
  { r:'17cqw', dur:'24s', delay:'3s',   op:0.07, dash:'2 8' },
  { r:'21cqw', dur:'30s', delay:'6s',   op:0.05, dash:'6 12' },
];

/* floating orbs – right panel */
const orbs = [
  { left:'60%', top:'8%',  r:'16cqw', dur:'13s', delay:'0s'   },
  { left:'82%', top:'60%', r:'10cqw', dur:'10s', delay:'2s'   },
  { left:'52%', top:'70%', r:'7cqw',  dur:'15s', delay:'1s'   },
];

/* count-up hook */
function useCountUp(target: number, duration = 1400, start = false) {
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

export default function Slide13TargetPengunjung() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);
  const [hovR, setHovR] = useState<number | null>(null);
  const count = useCountUp(15, 1600, go);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        /* ── entrance ── */
        @keyframes fadeU13 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeL13 {
          from { opacity:0; transform:translateX(-2.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeR13 {
          from { opacity:0; transform:translateX(2.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes growX13 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes chipPop13 {
          from { opacity:0; transform:scale(0.82) translateY(1cqh); }
          to   { opacity:1; transform:scale(1)    translateY(0); }
        }
        @keyframes regionPop13 {
          from { opacity:0; transform:translateX(-1cqw); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── stat panel ── */
        @keyframes statGlow13 {
          0%,100% { text-shadow: 0 0 0   rgba(212,160,23,0);   }
          50%     { text-shadow: 0 0 4cqw rgba(212,160,23,0.35); }
        }
        @keyframes ringRotate13CW  { from { transform:rotate(0deg); }   to { transform:rotate(360deg); } }
        @keyframes ringRotate13CCW { from { transform:rotate(0deg); }   to { transform:rotate(-360deg); } }
        @keyframes panelShimmer13 {
          0%,100% { opacity:0; transform:translateX(-100%); }
          15%,85% { opacity:0; }
          50%     { opacity:1; transform:translateX(100%); }
        }
        @keyframes divLine13 {
          0%,100% { opacity:0.5; transform:scaleX(1); }
          50%     { opacity:1;   transform:scaleX(1.08); }
        }

        /* ── ambient ── */
        @keyframes orbGlow13 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.2);  opacity:0.13; }
        }
        @keyframes spark13 {
          0%   { transform:scale(0) rotate(0deg);   opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.4) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg); opacity:0; }
        }
        @keyframes scan13 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── title shimmer ── */
        @keyframes shimmer13 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .q-text13 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 20%, #f5c842 38%,
            #fff8dc 54%, #D4A017 70%, #fffbe8 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer13 4s ease infinite;
        }
      `}</style>

      {/* ── Batik texture ── */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity:0.06 }} alt="" aria-hidden="true" />

      {/* ── Ambient orbs right panel ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.r, height:o.r, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          animation:`orbGlow13 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan13 11s linear infinite',
        }} />
      </div>

      {/* ════════════════════════════════════
          LEFT — STAT HERO PANEL
      ════════════════════════════════════ */}
      <div style={{
        position:'relative', width:'40%',
        background:'linear-gradient(135deg, #2E1208 0%, #1A0D06 100%)',
        display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
        padding:'7.5cqh 4cqw',
        overflow:'hidden',
      }}>
        {/* shimmer sweep across panel */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(110deg, transparent 40%, rgba(212,160,23,0.06) 50%, transparent 60%)',
          animation:'panelShimmer13 5s ease-in-out 1s infinite',
        }} />

        {/* Rotating rings */}
        {rings.map((ring, i) => (
          <div key={i} style={{
            position:'absolute',
            width:ring.r, height:ring.r,
            borderRadius:'50%',
            border:`0.07cqw dashed rgba(212,160,23,${ring.op})`,
            animation:`${i % 2 === 0 ? 'ringRotate13CW' : 'ringRotate13CCW'} ${ring.dur} linear ${ring.delay} infinite`,
            pointerEvents:'none',
          }} />
        ))}

        {/* Top divider */}
        <div style={{
          width:'3cqw', height:'0.3cqh', background:'#D4A017', marginBottom:'3cqh',
          animation:'divLine13 3s ease-in-out 1.2s infinite',
          opacity: go ? 1 : 0,
          ...(go ? { animation:`fadeU13 0.5s ease 0.2s both, divLine13 3s ease-in-out 1.2s infinite` } : {}),
        }} />

        {/* Big number */}
        <div style={{ position:'relative', textAlign:'center',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeU13 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
        }}>
          {/* glow behind number */}
          <div style={{
            position:'absolute', inset:'-2cqh -2cqw',
            background:'radial-gradient(ellipse at center, rgba(212,160,23,0.18) 0%, transparent 70%)',
            pointerEvents:'none',
          }} />
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'10cqw', lineHeight:1,
            color:'#D4A017', position:'relative',
            animation: go ? 'statGlow13 3s ease-in-out 1.4s infinite' : 'none',
          }}>
            {count}<span style={{ fontSize:'5cqw' }}>K</span>
          </p>
        </div>

        {/* Label */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)', fontWeight:600,
          color:'rgba(245,230,200,0.72)', fontSize:'1.6cqw',
          textAlign:'center', marginTop:'1cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeU13 0.6s ease 0.5s both' : 'none',
        }}>
          Target Pengunjung
        </p>
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(154,122,90,0.75)', fontSize:'1.25cqw',
          textAlign:'center',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeU13 0.6s ease 0.6s both' : 'none',
        }}>
          10.000 – 15.000 orang
        </p>

        {/* Bottom divider */}
        <div style={{
          width:'3cqw', height:'0.3cqh', background:'#D4A017', marginTop:'3cqh',
          animation:'divLine13 3s ease-in-out 1.5s infinite',
          opacity: go ? 1 : 0,
          ...(go ? { animation:`fadeU13 0.5s ease 0.7s both, divLine13 3s ease-in-out 1.5s infinite` } : {}),
        }} />

        {/* Right-edge border glow */}
        <div style={{
          position:'absolute', top:0, bottom:0, right:0, width:'0.12cqw',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.4) 40%, rgba(212,160,23,0.4) 60%, transparent)',
        }} />
      </div>

      {/* ════════════════════════════════════
          RIGHT — CONTENT PANEL
      ════════════════════════════════════ */}
      <div className="relative flex flex-col justify-center px-[5cqw] pt-[10cqh] pb-[8cqh] flex-1 z-10">

        {/* Section label + line */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'3.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeR13 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.75)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'1.1cqw', fontWeight:600, flexShrink:0,
          }}>Target Pengunjung</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.3)',
            transformOrigin:'left',
            animation: go ? 'growX13 0.9s cubic-bezier(0.22,1,0.36,1) 0.32s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'3.8cqw', lineHeight:1.05, marginBottom:'3.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeR13 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s both' : 'none',
        }}>
          <span style={{ color:'rgba(245,230,200,0.97)' }}>Siapa<br /></span>
          <span className="q-text13">Pengunjung Kita?</span>
        </h2>

        {/* Segmentasi label */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw', marginBottom:'1.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeU13 0.5s ease 0.4s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
            letterSpacing:'0.22em', fontSize:'1cqw', fontWeight:600,
          }}>Segmentasi</span>
          <div style={{
            flex:1, height:'0.07cqh',
            background:'linear-gradient(to right, rgba(212,160,23,0.3), transparent)',
          }} />
        </div>

        {/* Segment chips */}
        <div style={{
          display:'flex', flexWrap:'wrap', gap:'0.9cqw', marginBottom:'3.5cqh',
        }}>
          {segments.map((seg, i) => {
            const isH = hov === i;
            return (
              <div
                key={seg}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  padding:'0.65cqh 1.3cqw',
                  background: isH
                    ? 'linear-gradient(135deg, rgba(139,58,31,0.85), rgba(90,32,10,0.85))'
                    : 'rgba(139,58,31,0.28)',
                  border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.70)' : 'rgba(139,58,31,0.55)'}`,
                  borderRadius:'0.2cqw',
                  transform: isH ? 'translateY(-0.4cqh) scale(1.04)' : 'translateY(0) scale(1)',
                  transition:'all 0.30s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  boxShadow: isH ? '0 0.5cqh 1.5cqh rgba(212,160,23,0.22)' : 'none',
                  opacity: hov !== null && !isH ? 0.45 : 1,
                  animation: go ? `chipPop13 0.45s cubic-bezier(0.22,1,0.36,1) ${0.48 + i * 0.07}s both` : 'none',
                }}
              >
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.10) 50%, transparent 70%)',
                    animation:'shimmer13 1.8s ease-in-out infinite',
                  }} />
                )}
                <span style={{
                  position:'relative',
                  fontFamily:'var(--font-body,sans-serif)',
                  color: isH ? 'rgba(245,230,200,0.95)' : 'rgba(245,230,200,0.80)',
                  fontSize:'1.4cqw', transition:'color 0.3s ease',
                }}>{seg}</span>
              </div>
            );
          })}
        </div>

        {/* Wilayah label */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw', marginBottom:'1.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeU13 0.5s ease 0.9s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
            letterSpacing:'0.22em', fontSize:'1cqw', fontWeight:600,
          }}>Wilayah Jangkauan</span>
          <div style={{
            flex:1, height:'0.07cqh',
            background:'linear-gradient(to right, rgba(212,160,23,0.3), transparent)',
          }} />
        </div>

        {/* Region pills */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5cqh 0' }}>
          {regions.map((r, i) => {
            const isH = hovR === i;
            return (
              <span key={r}
                onMouseEnter={() => setHovR(i)}
                onMouseLeave={() => setHovR(null)}
                style={{
                  fontFamily:'var(--font-body,sans-serif)',
                  fontSize:'1.7cqw', lineHeight:1.6,
                  color: isH ? '#D4A017' : 'rgba(245,230,200,0.78)',
                  transition:'color 0.28s ease',
                  cursor:'default',
                  opacity: go ? 1 : 0,
                  animation: go ? `regionPop13 0.5s ease ${1.0 + i * 0.08}s both` : 'none',
                }}>
                {r}{i < regions.length - 1 && (
                  <span style={{ color:'rgba(212,160,23,0.35)', margin:'0 0.6cqw' }}>·</span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={13} />
    </div>
  );
}
