import { useEffect, useState, useRef } from 'react';
import { UtensilsCrossed, Shirt, Scissors, Palette, Gift } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const categories = [
  { Icon: UtensilsCrossed, label: 'Makanan dan Minuman' },
  { Icon: Shirt,           label: 'Fashion Lokal' },
  { Icon: Scissors,        label: 'Produk Kerajinan' },
  { Icon: Palette,         label: 'Produk Kreatif' },
  { Icon: Gift,            label: 'Oleh-oleh Khas Garut' },
];

/* count-up hook */
function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, duration]);
  return count;
}

export default function Slide07PasarUMKM() {
  const [go, setGo]           = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const count                 = useCountUp(50, 1800, go);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">

      <style>{`
        @keyframes slideL7 {
          from { opacity:0; transform:translateX(-2.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU7 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX7 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes growY7 {
          from { transform:scaleY(0); opacity:0; }
          to   { transform:scaleY(1); opacity:1; }
        }
        @keyframes rowIn7 {
          from { opacity:0; transform:translateX(2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes numPop7 {
          0%   { opacity:0; transform:scale(0.7); }
          70%  { transform:scale(1.06); }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes ringPulse7 {
          0%,100% { transform:scale(1);   opacity:0.25; }
          50%     { transform:scale(1.08); opacity:0.55; }
        }
        @keyframes orbGlow7 {
          0%,100% { opacity:0.15; }
          50%     { opacity:0.28; }
        }
        @keyframes iconBob7 {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-4px); }
        }
        @keyframes barGrow7 {
          from { height:0; opacity:0; }
          to   { height:8cqh; opacity:1; }
        }
      `}</style>

      {/* Batik texture */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.07 }} alt="" aria-hidden="true" />

      {/* accent bars */}
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-[0.45cqw] bg-psg-accent z-10" />

      {/* ══ LEFT ══ */}
      <div className="relative flex flex-col justify-center pl-[5.5cqw] pr-[4cqw] pt-[8cqh] pb-[7cqh] w-[57%] z-10">

        {/* Area 01 badge + line */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw', marginBottom:'2.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL7 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <div style={{
            padding:'0.5cqh 1.2cqw',
            background:'#8B4513',
          }}>
            <span style={{
              fontFamily:'var(--font-body,sans-serif)', fontWeight:700,
              color:'rgba(255,245,220,0.95)', textTransform:'uppercase',
              letterSpacing:'0.3em', fontSize:'0.85cqw',
            }}>Area 01</span>
          </div>
          <div style={{
            height:'0.08cqh', width:'4cqw', background:'rgba(212,160,23,0.4)',
            transformOrigin:'left',
            animation: go ? 'growX7 0.6s ease 0.25s both' : 'none',
          }} />
        </div>

        {/* title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          fontSize:'5cqw', lineHeight:0.95, letterSpacing:'-0.025em',
          color:'rgba(255,245,220,0.97)', marginBottom:'1.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL7 0.7s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
        }}>
          Pasar <span style={{ color:'#D4A017' }}>UMKM</span>
        </h2>

        {/* subtitle */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.5)', fontSize:'1.3cqw', marginBottom:'3.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU7 0.6s ease 0.35s both' : 'none',
        }}>
          Area utama yang menampilkan produk lokal Garut
        </p>

        {/* divider */}
        <div style={{
          height:'0.08cqh', background:'rgba(212,160,23,0.18)',
          marginBottom:'2.5cqh', transformOrigin:'left',
          animation: go ? 'growX7 0.7s ease 0.4s both' : 'none',
        }} />

        {/* label */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'#D4A017', textTransform:'uppercase',
          letterSpacing:'0.25em', fontSize:'0.82cqw', marginBottom:'1.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU7 0.5s ease 0.45s both' : 'none',
        }}>
          Kategori Tenant
        </p>

        {/* category rows */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.5cqh' }}>
          {categories.map((cat, i) => {
            const isH = hovered === i;
            const isD = hovered !== null && !isH;
            return (
              <div
                key={cat.label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display:'flex', alignItems:'center', gap:'1.2cqw',
                  padding:'1cqh 1cqw',
                  borderRadius:'0.35cqw',
                  background: isH ? 'rgba(212,160,23,0.1)' : 'transparent',
                  borderLeft: `0.25cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.15)'}`,
                  opacity: isD ? 0.35 : 1,
                  transform: isH ? 'translateX(0.5cqw)' : 'translateX(0)',
                  transition:'all 0.32s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default',
                  animation: go ? `rowIn7 0.55s cubic-bezier(0.22,1,0.36,1) ${0.55 + i * 0.09}s both` : 'none',
                }}
              >
                {/* icon bubble */}
                <div style={{
                  width:'2.2cqw', height:'2.2cqw', borderRadius:'50%', flexShrink:0,
                  border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.6)' : 'rgba(212,160,23,0.2)'}`,
                  background: isH ? 'rgba(212,160,23,0.18)' : 'rgba(212,160,23,0.06)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all 0.32s ease',
                  animation: isH ? 'iconBob7 1.8s ease-in-out infinite' : 'none',
                }}>
                  <cat.Icon
                    size="1cqw"
                    color={isH ? '#D4A017' : 'rgba(212,160,23,0.45)'}
                    strokeWidth={1.5}
                    style={{ transition:'color 0.32s ease' }}
                  />
                </div>

                <p style={{
                  fontFamily:'var(--font-body,sans-serif)', fontWeight:600,
                  fontSize:'1.55cqw',
                  color: isH ? 'rgba(255,245,220,0.97)' : 'rgba(255,245,220,0.78)',
                  transition:'color 0.32s ease',
                }}>
                  {cat.label}
                </p>

                {/* arrow */}
                <div style={{
                  marginLeft:'auto', opacity: isH ? 1 : 0,
                  transform: isH ? 'translateX(0)' : 'translateX(-0.5cqw)',
                  transition:'all 0.32s ease',
                }}>
                  <svg viewBox="0 0 16 16" fill="none" style={{ width:'0.9cqw', height:'0.9cqw' }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ RIGHT: stat panel ══ */}
      <div className="relative flex-1 flex flex-col items-center justify-center"
        style={{ background:'linear-gradient(135deg, #2a1508 0%, #160a04 100%)' }}>

        {/* orb glow */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse at 50% 40%, rgba(212,160,23,0.18) 0%, transparent 65%)',
          animation:'orbGlow7 4s ease-in-out infinite',
          pointerEvents:'none',
        }} />

        {/* pulsing rings */}
        {[0, 1].map(i => (
          <div key={i} style={{
            position:'absolute',
            width:`${22 + i * 8}cqw`, height:`${22 + i * 8}cqw`,
            borderRadius:'50%',
            border:'0.07cqw solid rgba(212,160,23,0.15)',
            animation:`ringPulse7 ${3 + i * 0.8}s ease-in-out ${i * 1.2}s infinite`,
            pointerEvents:'none',
          }} />
        ))}

        {/* top bar */}
        <div style={{
          width:'0.3cqw', background:'rgba(212,160,23,0.35)',
          marginBottom:'2.8cqh', borderRadius:'99cqw',
          animation: go ? 'barGrow7 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both' : 'none',
        }} />

        {/* count-up number */}
        <div style={{
          opacity: go ? 1 : 0,
          animation: go ? 'numPop7 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s both' : 'none',
          textAlign:'center',
        }}>
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'10cqw', lineHeight:0.9, letterSpacing:'-0.04em',
            color:'#D4A017',
          }}>
            {count}
          </p>
        </div>

        {/* label */}
        <p style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'2cqw', color:'rgba(255,245,220,0.9)',
          letterSpacing:'0.15em', marginTop:'0.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU7 0.6s ease 0.85s both' : 'none',
        }}>
          UMKM
        </p>

        {/* bottom bar */}
        <div style={{
          width:'0.3cqw', background:'rgba(212,160,23,0.35)',
          margin:'2.8cqh 0 3.5cqh', borderRadius:'99cqw',
          animation: go ? 'barGrow7 0.7s cubic-bezier(0.22,1,0.36,1) 0.7s both' : 'none',
        }} />

        {/* sub-label */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.5)', textAlign:'center',
          fontSize:'1.3cqw', lineHeight:1.55,
          opacity: go ? 1 : 0,
          animation: go ? 'slideU7 0.6s ease 1s both' : 'none',
        }}>
          Target peserta<br />pelaku usaha lokal
        </p>
      </div>

      <SlideHeader />
      <SlideFooter slide={7} />
    </div>
  );
}
