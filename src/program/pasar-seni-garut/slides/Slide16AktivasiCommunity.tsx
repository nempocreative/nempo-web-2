import { useEffect, useState } from 'react';
import { Mic2, Hammer, MessageSquare, Sparkles, Camera, Share2, Heart } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const communityItems = [
  { Icon: Mic2,          label: 'Talkshow'           },
  { Icon: Hammer,        label: 'Workshop'            },
  { Icon: MessageSquare, label: 'Diskusi Kreatif'     },
  { Icon: Sparkles,      label: 'Aktivasi Komunitas'  },
];

const photoItems = [
  { Icon: Camera, label: 'Pusat dokumentasi pengunjung'       },
  { Icon: Heart,  label: 'Spot foto ikonik berbranding Juara'  },
  { Icon: Share2, label: 'Pusat viral content selama acara'   },
];

/* ambient orbs */
const orbs = [
  { left:'5%',  top:'15%', r:'18cqw', dur:'14s', delay:'0s'   },
  { left:'75%', top:'65%', r:'14cqw', dur:'11s', delay:'2s'   },
  { left:'88%', top:'10%', r:'8cqw',  dur:'9s',  delay:'1.2s' },
  { left:'40%', top:'85%', r:'6cqw',  dur:'13s', delay:'3s'   },
];

/* sparks */
const sparks = [
  { left:'22%', top:'72%', dur:'3.5s', delay:'0.4s' },
  { left:'55%', top:'12%', dur:'4.2s', delay:'1.1s' },
  { left:'78%', top:'38%', dur:'3.0s', delay:'0.7s' },
  { left:'90%', top:'80%', dur:'3.8s', delay:'1.9s' },
  { left:'68%', top:'55%', dur:'4.5s', delay:'2.3s' },
];

export default function Slide16AktivasiCommunity() {
  const [go,   setGo]   = useState(false);
  const [hovL, setHovL] = useState(false);
  const [hovR, setHovR] = useState(false);
  const [hovLI, setHovLI] = useState<number | null>(null);
  const [hovRI, setHovRI] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col px-[5.5cqw] pt-[9cqh] pb-[7cqh]">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL16 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU16 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX16 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardSlide16L {
          from { opacity:0; transform:translateX(-4cqw) scale(0.95); }
          to   { opacity:1; transform:translateX(0)   scale(1); }
        }
        @keyframes cardSlide16R {
          from { opacity:0; transform:translateX(4cqw)  scale(0.95); }
          to   { opacity:1; transform:translateX(0)    scale(1); }
        }
        @keyframes itemPop16 {
          from { opacity:0; transform:translateX(-1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── ambient ── */
        @keyframes orbGlow16 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.13; }
        }
        @keyframes spark16 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan16 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── card shimmer ── */
        @keyframes shimmer16 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }

        /* ── title shimmer ── */
        .cs-text16 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 20%, #f5c842 38%,
            #fff8dc 54%, #D4A017 72%, #fffbe8 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer16 4s ease infinite;
        }

        /* ── accent line pulse ── */
        @keyframes linePulse16 {
          0%,100% { opacity:1; transform:scaleX(1); }
          50%     { opacity:0.5; transform:scaleX(0.8); }
        }

        /* ── icon bounce ── */
        @keyframes iconBounce16 {
          0%,100% { transform:translateY(0) scale(1); }
          45%     { transform:translateY(-5px) scale(1.1); }
          65%     { transform:translateY(-3px) scale(1.05); }
        }

        /* ── card glow pulse ── */
        @keyframes cardGlow16 {
          0%,100% { box-shadow: 0 0 0   rgba(212,160,23,0); }
          50%     { box-shadow: 0 1cqh 3cqh rgba(212,160,23,0.22); }
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
          animation:`orbGlow16 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark16 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan16 11s linear infinite',
        }} />
      </div>

      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <div className="relative z-10">
        {/* Section label */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL16 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.75)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'1.1cqw', fontWeight:600, flexShrink:0,
          }}>Aktivasi Juara</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.28)',
            transformOrigin:'left',
            animation: go ? 'growX16 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'4cqw', lineHeight:1.05, marginBottom:'3cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL16 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
        }}>
          <span className="cs-text16">Community Space</span>
          <span style={{ color:'rgba(245,230,200,0.97)' }}> &amp; Photo Experience</span>
        </h2>
      </div>

      {/* ════════════════════════════════════
          2-COLUMN CARDS
      ════════════════════════════════════ */}
      <div className="relative z-10 grid grid-cols-2 flex-1 min-h-0" style={{ gap:'2.5cqw' }}>

        {/* ── LEFT: Community Space ── */}
        <div
          onMouseEnter={() => setHovL(true)}
          onMouseLeave={() => { setHovL(false); setHovLI(null); }}
          style={{
            display:'flex', flexDirection:'column',
            padding:'3cqh 3cqw',
            background: hovL
              ? 'linear-gradient(145deg, #3a1c0c 0%, #251208 100%)'
              : 'linear-gradient(135deg, #2E1208 0%, #1A0D06 100%)',
            border:`0.08cqw solid ${hovL ? 'rgba(212,160,23,0.60)' : 'rgba(212,160,23,0.28)'}`,
            borderTop:`0.28cqw solid ${hovL ? '#D4A017' : 'rgba(212,160,23,0.35)'}`,
            borderRadius:'0 0 0.5cqw 0.5cqw',
            transform: hovL ? 'translateY(-0.6cqh)' : 'translateY(0)',
            transition:'all 0.38s cubic-bezier(0.22,1,0.36,1)',
            cursor:'default', position:'relative', overflow:'hidden',
            animation: go
              ? `cardSlide16L 0.65s cubic-bezier(0.22,1,0.36,1) 0.3s both${hovL ? ', cardGlow16 2.5s ease-in-out infinite' : ''}`
              : 'none',
          }}
        >
          {/* shimmer on hover */}
          {hovL && (
            <div style={{
              position:'absolute', inset:0, pointerEvents:'none',
              background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.06) 50%, transparent 70%)',
              animation:'shimmer16 2s ease-in-out infinite',
            }} />
          )}

          {/* Card header */}
          <div style={{ display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'2.2cqh' }}>
            <div style={{
              width:'2.5cqw', height:'0.4cqh', background:'#D4A017',
              transformOrigin:'left',
              animation:'linePulse16 3s ease-in-out infinite',
            }} />
            <p style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(212,160,23,0.75)', textTransform:'uppercase',
              letterSpacing:'0.2em', fontSize:'1.1cqw', fontWeight:600,
            }}>Community Space</p>
          </div>

          {/* Card title */}
          <h3 style={{
            fontFamily:'var(--font-display,serif)', fontWeight:700,
            fontSize:'2.6cqw', lineHeight:1.15,
            color: hovL ? '#D4A017' : 'rgba(245,230,200,0.95)',
            transition:'color 0.38s ease',
            marginBottom:'2.5cqh',
          }}>
            Ruang Aktivitas<br />Komunitas
          </h3>

          {/* Items */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.4cqh', flex:1 }}>
            {communityItems.map((item, i) => {
              const isH = hovLI === i;
              const isDim = hovLI !== null && !isH;
              return (
                <div
                  key={item.label}
                  onMouseEnter={(e) => { e.stopPropagation(); setHovLI(i); }}
                  onMouseLeave={() => setHovLI(null)}
                  style={{
                    display:'flex', alignItems:'center', gap:'1.2cqw',
                    padding:'0.9cqh 1.2cqw',
                    background: isH ? 'rgba(212,160,23,0.10)' : 'transparent',
                    borderLeft:`0.28cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.20)'}`,
                    borderRadius:'0 0.3cqw 0.3cqw 0',
                    opacity: isDim ? 0.35 : 1,
                    transform: isH ? 'translateX(0.5cqw)' : 'translateX(0)',
                    transition:'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                    animation: go ? `itemPop16 0.45s ease ${0.55 + i * 0.08}s both` : 'none',
                  }}
                >
                  <div style={{
                    width:'1.8cqw', height:'1.8cqw', borderRadius:'50%',
                    border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.6)' : 'rgba(212,160,23,0.18)'}`,
                    background: isH ? 'rgba(212,160,23,0.16)' : 'rgba(212,160,23,0.06)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0, transition:'all 0.28s ease',
                    animation: isH ? 'iconBounce16 1.4s ease-in-out infinite' : 'none',
                  }}>
                    <item.Icon
                      size="0.9cqw"
                      color={isH ? '#D4A017' : 'rgba(212,160,23,0.38)'}
                      strokeWidth={1.5}
                      style={{ transition:'color 0.28s ease' }}
                    />
                  </div>
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)',
                    fontSize:'1.5cqw',
                    color: isH ? 'rgba(245,230,200,0.95)' : 'rgba(245,230,200,0.78)',
                    transition:'color 0.28s ease',
                  }}>{item.label}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom bar */}
          <div style={{
            position:'absolute', bottom:0, left:0, right:0, height:'0.22cqh',
            background:'linear-gradient(90deg, transparent, #D4A017, transparent)',
            transform: hovL ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin:'center',
            transition:'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
          }} />
        </div>

        {/* ── RIGHT: Photo Experience ── */}
        <div
          onMouseEnter={() => setHovR(true)}
          onMouseLeave={() => { setHovR(false); setHovRI(null); }}
          style={{
            display:'flex', flexDirection:'column',
            padding:'3cqh 3cqw',
            background: hovR
              ? 'linear-gradient(145deg, #3a1c0c 0%, #251208 100%)'
              : 'linear-gradient(135deg, #2E1208 0%, #1A0D06 100%)',
            border:`0.08cqw solid ${hovR ? 'rgba(212,160,23,0.60)' : 'rgba(212,160,23,0.28)'}`,
            borderTop:`0.28cqw solid ${hovR ? '#D4A017' : 'rgba(139,58,31,0.55)'}`,
            borderRadius:'0 0 0.5cqw 0.5cqw',
            transform: hovR ? 'translateY(-0.6cqh)' : 'translateY(0)',
            transition:'all 0.38s cubic-bezier(0.22,1,0.36,1)',
            cursor:'default', position:'relative', overflow:'hidden',
            animation: go
              ? `cardSlide16R 0.65s cubic-bezier(0.22,1,0.36,1) 0.42s both`
              : 'none',
          }}
        >
          {hovR && (
            <div style={{
              position:'absolute', inset:0, pointerEvents:'none',
              background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.06) 50%, transparent 70%)',
              animation:'shimmer16 2s ease-in-out infinite',
            }} />
          )}

          {/* Card header */}
          <div style={{ display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'2.2cqh' }}>
            <div style={{
              width:'2.5cqw', height:'0.4cqh', background:'#8B3A1F',
              transformOrigin:'left',
              animation:'linePulse16 3.5s ease-in-out 0.5s infinite',
            }} />
            <p style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(212,160,23,0.75)', textTransform:'uppercase',
              letterSpacing:'0.2em', fontSize:'1.1cqw', fontWeight:600,
            }}>Photo Experience</p>
          </div>

          {/* Card title */}
          <h3 style={{
            fontFamily:'var(--font-display,serif)', fontWeight:700,
            fontSize:'2.6cqw', lineHeight:1.15,
            color: hovR ? '#D4A017' : 'rgba(245,230,200,0.95)',
            transition:'color 0.38s ease',
            marginBottom:'2.5cqh',
          }}>
            Landmark Utama<br />Festival
          </h3>

          {/* Items */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.4cqh', flex:1 }}>
            {photoItems.map((item, i) => {
              const isH = hovRI === i;
              const isDim = hovRI !== null && !isH;
              return (
                <div
                  key={item.label}
                  onMouseEnter={(e) => { e.stopPropagation(); setHovRI(i); }}
                  onMouseLeave={() => setHovRI(null)}
                  style={{
                    display:'flex', alignItems:'center', gap:'1.2cqw',
                    padding:'0.9cqh 1.2cqw',
                    background: isH ? 'rgba(212,160,23,0.10)' : 'transparent',
                    borderLeft:`0.28cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.20)'}`,
                    borderRadius:'0 0.3cqw 0.3cqw 0',
                    opacity: isDim ? 0.35 : 1,
                    transform: isH ? 'translateX(0.5cqw)' : 'translateX(0)',
                    transition:'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                    animation: go ? `itemPop16 0.45s ease ${0.68 + i * 0.09}s both` : 'none',
                  }}
                >
                  <div style={{
                    width:'1.8cqw', height:'1.8cqw', borderRadius:'50%',
                    border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.6)' : 'rgba(212,160,23,0.18)'}`,
                    background: isH ? 'rgba(212,160,23,0.16)' : 'rgba(212,160,23,0.06)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0, transition:'all 0.28s ease',
                    animation: isH ? 'iconBounce16 1.4s ease-in-out infinite' : 'none',
                  }}>
                    <item.Icon
                      size="0.9cqw"
                      color={isH ? '#D4A017' : 'rgba(212,160,23,0.38)'}
                      strokeWidth={1.5}
                      style={{ transition:'color 0.28s ease' }}
                    />
                  </div>
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)',
                    fontSize:'1.5cqw',
                    color: isH ? 'rgba(245,230,200,0.95)' : 'rgba(245,230,200,0.78)',
                    transition:'color 0.28s ease',
                  }}>{item.label}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom bar */}
          <div style={{
            position:'absolute', bottom:0, left:0, right:0, height:'0.22cqh',
            background:'linear-gradient(90deg, transparent, #D4A017, transparent)',
            transform: hovR ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin:'center',
            transition:'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
          }} />
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={16} />
    </div>
  );
}
