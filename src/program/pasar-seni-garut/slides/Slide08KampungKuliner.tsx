import { useEffect, useState } from 'react';
import { Utensils, ShoppingBag, ChefHat, Coffee } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const categories = [
  {
    Icon: Utensils,
    label: 'Makanan Berat',
    accent: '#D4A017',
    items: [
      'Nasi Liwet Sunda','Nasi Tutug Oncom','Nasi Timbel','Nasi Jambal','Nasi Lengko',
      'Lotek','Karedok','Gado-Gado Sunda','Sayur Asem','Pepes Ikan',
      'Pepes Jamur','Pepes Tahu','Gepuk','Empal','Sate Maranggi',
    ],
  },
  {
    Icon: ShoppingBag,
    label: 'Jajanan Pasar',
    accent: '#E07820',
    items: [
      'Comro','Misro','Colenak','Surabi','Awug',
      'Ranginang','Opak','Wajit','Ali Agrem','Cucur',
      'Gemblong','Jalabria','Ulen Bakar','Bugis','Klepon',
    ],
  },
  {
    Icon: ChefHat,
    label: 'Khas Garut',
    accent: '#FFB347',
    items: [
      'Soto Garut','Burayot','Dodol Garut','Chocodot','Baso Aci',
      'Ceplis','Dorokdok','Ladu','Angleng','Endog Lewo','Opak Garut',
    ],
  },
  {
    Icon: Coffee,
    label: 'Minuman Tradisional',
    accent: '#C8782A',
    items: [
      'Bandrek','Bajigur','Es Goyobod','Es Cendol','Es Oyen',
      'Teh Tarik Sunda','Kopi Garut','Wedang Jahe','Sekoteng',
    ],
  },
];

export default function Slide08KampungKuliner() {
  const [go, setGo]           = useState(false);
  const [hovCol, setHovCol]   = useState<number | null>(null);
  const [hovItem, setHovItem] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        @keyframes fadeUp8 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideL8 {
          from { opacity:0; transform:translateX(-2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes growX8 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes boardIn8 {
          from { opacity:0; transform:translateY(3cqh) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes steam8 {
          0%   { transform:translateY(0); opacity:0; }
          15%  { opacity:0.4; }
          85%  { opacity:0.08; }
          100% { transform:translateY(-30cqh); opacity:0; }
        }
        @keyframes orbGlow8 {
          0%,100% { opacity:0.10; }
          50%     { opacity:0.20; }
        }
        @keyframes jadulShimmer8 {
          0%   { background-position:0% 50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }
        @keyframes countBounce8 {
          0%   { opacity:0; transform:scale(0.72); }
          65%  { transform:scale(1.07); }
          100% { opacity:1; transform:scale(1); }
        }
        .jadul8 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 40%, #D4A017 60%, #f0b429 78%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: jadulShimmer8 3.5s ease infinite;
          font-style:italic;
        }
      `}</style>

      {/* Texture */}
      <img src={`${base}wayang-deco.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.07 }} alt="" aria-hidden="true" />

      {/* Accent bars */}
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-[0.45cqw] bg-psg-accent z-10" />

      {/* Orb */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
        background:'radial-gradient(ellipse at 70% 48%, rgba(212,160,23,0.13) 0%, transparent 60%)',
        animation:'orbGlow8 5s ease-in-out infinite',
      }} />

      {/* Steam */}
      {[22,38,54,68,82].map((pct,i) => (
        <div key={i} style={{
          position:'absolute', bottom:'3cqh', left:`${pct}%`,
          width:'0.2cqw', height:'0.2cqw', borderRadius:'50%',
          background:'rgba(212,160,23,0.35)',
          animation:`steam8 ${5.5+i*0.7}s ease-in-out ${i*1.1}s infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ══ LEFT PANEL ══ */}
      <div className="relative z-10 flex flex-col justify-center"
        style={{ width:'24%', flexShrink:0, paddingLeft:'4.5cqw', paddingRight:'2cqw', paddingTop:'8cqh', paddingBottom:'7cqh' }}>

        {/* Badge */}
        <div style={{
          display:'flex', alignItems:'center', gap:'0.8cqw', marginBottom:'2.5cqh',
          opacity: go?1:0, animation: go?'slideL8 0.55s cubic-bezier(0.22,1,0.36,1) 0.08s both':'none',
        }}>
          <div style={{ padding:'0.45cqh 1.0cqw', background:'#8B4513' }}>
            <span style={{ fontFamily:'var(--font-body,sans-serif)', fontWeight:700,
              color:'rgba(255,245,220,0.95)', textTransform:'uppercase',
              letterSpacing:'0.3em', fontSize:'0.78cqw' }}>Area 02</span>
          </div>
          <div style={{ height:'0.08cqh', width:'3cqw', background:'rgba(212,160,23,0.4)',
            transformOrigin:'left', animation: go?'growX8 0.55s ease 0.22s both':'none' }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          fontSize:'3.8cqw', lineHeight:0.95, letterSpacing:'-0.025em',
          color:'rgba(255,245,220,0.97)', marginBottom:'1.6cqh',
          opacity: go?1:0, animation: go?'slideL8 0.6s cubic-bezier(0.22,1,0.36,1) 0.18s both':'none',
        }}>
          Kampung<br />Kuliner<br /><span className="jadul8">Jadul</span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.50)', fontSize:'1.0cqw', lineHeight:1.6,
          marginBottom:'2.5cqh',
          opacity: go?1:0, animation: go?'fadeUp8 0.55s ease 0.32s both':'none',
        }}>
          Kuliner tradisional yang mulai jarang ditemukan.
        </p>

        {/* Rule */}
        <div style={{
          width:'3cqw', height:'0.25cqh',
          background:'linear-gradient(90deg,#D4A017,transparent)',
          transformOrigin:'left', marginBottom:'3cqh',
          animation: go?'growX8 0.5s cubic-bezier(0.22,1,0.36,1) 0.48s both':'none',
        }} />

        {/* Stat */}
        <div style={{ opacity:go?1:0, animation:go?'countBounce8 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both':'none' }}>
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'5.5cqw', lineHeight:1, color:'#D4A017',
            textShadow:'0 0 2.5cqw rgba(212,160,23,0.30)',
          }}>50</p>
          <p style={{
            fontFamily:'var(--font-body,sans-serif)', fontSize:'0.78cqw',
            color:'rgba(255,245,220,0.35)', textTransform:'uppercase',
            letterSpacing:'0.22em', marginTop:'0.4cqh',
          }}>Menu Unggulan</p>
        </div>
      </div>

      {/* ══ RIGHT: 4 boards, single-column items ══ */}
      <div className="relative z-10 flex flex-1"
        style={{ gap:'0.7cqw', padding:'4cqh 2.5cqw 6cqh 1cqw' }}>

        {categories.map((cat, ci) => {
          const isHC = hovCol === ci;
          return (
            <div key={cat.label}
              onMouseEnter={() => setHovCol(ci)}
              onMouseLeave={() => setHovCol(null)}
              style={{
                flex:1, display:'flex', flexDirection:'column',
                background: ci%2===0 ? 'rgba(38,16,6,0.72)' : 'rgba(44,19,7,0.68)',
                borderTop:`0.45cqh solid ${cat.accent}`,
                borderRadius:'0.45cqw',
                border:`0.07cqw solid ${isHC?'rgba(212,160,23,0.25)':'rgba(255,255,255,0.06)'}`,
                borderTopColor: cat.accent,
                boxShadow: isHC
                  ? `0 1.5cqh 3cqw rgba(0,0,0,0.55), 0 0 1.5cqw rgba(212,160,23,0.10)`
                  : '0 0.8cqh 1.5cqw rgba(0,0,0,0.40)',
                transform: isHC?'translateY(-0.4cqh) scale(1.008)':'translateY(0) scale(1)',
                transition:'all 0.32s cubic-bezier(0.22,1,0.36,1)',
                padding:'1.8cqh 1.0cqw 1.2cqh',
                position:'relative', overflow:'hidden',
                opacity:0,
                animation: go?`boardIn8 0.65s cubic-bezier(0.22,1,0.36,1) ${0.22+ci*0.10}s forwards`:'none',
              }}
            >
              {/* Nail */}
              <div style={{
                position:'absolute', top:'0.9cqh', left:'50%', transform:'translateX(-50%)',
                width:'0.35cqw', height:'0.35cqw', borderRadius:'50%',
                background:'rgba(0,0,0,0.55)',
                boxShadow:'inset 0 0.1cqh 0.25cqh rgba(0,0,0,0.8)',
              }} />

              {/* Hover glow */}
              <div style={{
                position:'absolute', inset:0, borderRadius:'inherit', pointerEvents:'none',
                background:'linear-gradient(180deg,rgba(255,255,255,0.03) 0%,transparent 60%)',
                opacity:isHC?1:0, transition:'opacity 0.32s ease',
              }} />

              {/* Header */}
              <div style={{ textAlign:'center', marginBottom:'1.4cqh', marginTop:'1.4cqh', position:'relative', zIndex:2 }}>
                <div style={{
                  width:'2.8cqw', height:'2.8cqw', borderRadius:'50%',
                  background: isHC ? 'rgba(212,160,23,0.18)' : 'rgba(212,160,23,0.08)',
                  border:`0.08cqw solid ${isHC ? cat.accent : 'rgba(212,160,23,0.22)'}`,
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  marginBottom:'0.9cqh',
                  transform:isHC?'scale(1.10)':'scale(1)',
                  transition:'all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
                  boxShadow: isHC ? `0 0 1.2cqw ${cat.accent}44` : 'none',
                }}>
                  <cat.Icon
                    size="1.3cqw"
                    color={isHC ? cat.accent : 'rgba(212,160,23,0.55)'}
                    strokeWidth={1.6}
                    style={{ transition:'color 0.28s ease' }}
                  />
                </div>
                <p style={{
                  fontFamily:'var(--font-display,serif)', fontWeight:700,
                  fontSize:'1.05cqw', fontStyle:'italic',
                  color:isHC?'#fffbe8':'rgba(255,245,220,0.88)',
                  letterSpacing:'0.02em', lineHeight:1.1,
                  transition:'color 0.28s ease',
                }}>{cat.label}</p>
                <div style={{
                  height:'0.12cqh', marginTop:'1.0cqh',
                  background:`linear-gradient(90deg,transparent,${cat.accent},transparent)`,
                  width:isHC?'85%':'55%', marginLeft:'auto', marginRight:'auto',
                  opacity:isHC?0.85:0.40,
                  transition:'all 0.38s cubic-bezier(0.22,1,0.36,1)',
                }} />
              </div>

              {/* Items — single column, large text */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.18cqh', flex:1, position:'relative', zIndex:2 }}>
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const isH = hovItem === key;
                  return (
                    <div key={item}
                      onMouseEnter={() => setHovItem(key)}
                      onMouseLeave={() => setHovItem(null)}
                      style={{
                        display:'flex', alignItems:'center', gap:'0.4cqw',
                        padding:'0.28cqh 0.5cqw',
                        borderRadius:'0.2cqw',
                        background:isH?'rgba(212,160,23,0.10)':'transparent',
                        borderLeft:`0.15cqw solid ${isH?cat.accent:'transparent'}`,
                        transform:isH?'translateX(0.25cqw)':'translateX(0)',
                        transition:'all 0.20s cubic-bezier(0.22,1,0.36,1)',
                        cursor:'default',
                      }}
                    >
                      <span style={{
                        color:isH?cat.accent:'rgba(212,160,23,0.42)',
                        fontSize:'0.38cqw', flexShrink:0,
                        transition:'color 0.20s ease', lineHeight:1,
                      }}>◆</span>
                      <span style={{
                        fontFamily:'var(--font-body,sans-serif)',
                        fontSize:'1.18cqw',
                        lineHeight:1.3,
                        color:isH?'#fffbe8':'rgba(255,245,220,0.82)',
                        fontWeight:isH?600:400,
                        transition:'color 0.20s ease',
                      }}>{item}</span>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <p style={{
                fontFamily:'var(--font-body,sans-serif)', fontSize:'0.62cqw',
                color:`${cat.accent}55`, textTransform:'uppercase',
                letterSpacing:'0.18em', textAlign:'right',
                marginTop:'1.0cqh', position:'relative', zIndex:2,
              }}>{cat.items.length} menu</p>
            </div>
          );
        })}
      </div>

      <SlideHeader />
      <SlideFooter slide={8} />
    </div>
  );
}
