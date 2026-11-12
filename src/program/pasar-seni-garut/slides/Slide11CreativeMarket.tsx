import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const items = [
  { no: '01', name: 'Thrift Market',           sub: 'Fashion preloved pilihan kurasi'       },
  { no: '02', name: 'Handmade Craft',           sub: 'Karya tangan seniman lokal'            },
  { no: '03', name: 'Ilustrasi & Artwork',      sub: 'Seni visual & cetakan orisinal'        },
  { no: '04', name: 'Merchandise Lokal',        sub: 'Brand-brand independen Garut'          },
  { no: '05', name: 'Produk Kreatif Komunitas', sub: 'Kolaborasi lintas komunitas kreatif'   },
];

/* ambient orbs for the left panel */
const orbs = [
  { left:'-6%',  top:'20%', r:'14cqw', dur:'11s', delay:'0s'   },
  { left:'40%',  top:'72%', r:'8cqw',  dur:'14s', delay:'1.5s' },
  { left:'10%',  top:'55%', r:'6cqw',  dur:'9s',  delay:'3s'   },
];

/* sparks scattered across full slide */
const sparks = [
  { left:'62%', top:'15%', dur:'3.5s', delay:'0.3s' },
  { left:'75%', top:'40%', dur:'4.2s', delay:'1.1s' },
  { left:'88%', top:'68%', dur:'3.0s', delay:'1.8s' },
  { left:'52%', top:'78%', dur:'3.8s', delay:'0.7s' },
  { left:'93%', top:'28%', dur:'4.5s', delay:'2.0s' },
];

export default function Slide11CreativeMarket() {
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
        @keyframes slideL11 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU11 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX11 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardPop11 {
          from { opacity:0; transform:translateX(-2cqw) scale(0.96); }
          to   { opacity:1; transform:translateX(0)   scale(1); }
        }
        @keyframes slideR11 {
          from { opacity:0; transform:translateX(3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── ambient ── */
        @keyframes orbGlow11 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.2);  opacity:0.13; }
        }
        @keyframes spark11 {
          0%   { transform:scale(0) rotate(0deg);   opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg); opacity:0; }
        }
        @keyframes bgZoom11 {
          0%,100% { transform:scale(1.04) translateY(0); }
          50%     { transform:scale(1.07) translateY(-8px); }
        }
        @keyframes numSway11 {
          0%,100% { opacity:0.13; transform:translateY(0); }
          50%     { opacity:0.28; transform:translateY(-4px); }
        }

        /* ── title shimmer ── */
        @keyframes shimmer11 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .market-text11 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 40%, #D4A017 58%, #f0b429 78%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          font-style:italic;
          animation: shimmer11 4s ease infinite;
        }

        /* ── badge bottom-right label ── */
        @keyframes badgeShimmer11 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }

        /* ── left-panel scan line ── */
        @keyframes scan11 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
      `}</style>

      {/* ── Batik texture ── */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity:0.06 }} alt="" aria-hidden="true" />

      {/* ── Ambient orbs (left panel) ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.r, height:o.r, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          animation:`orbGlow11 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Spark particles (right zone) ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017',
          boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark11 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── subtle scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, rgba(212,160,23,0.03) 60%, transparent)',
          animation:'scan11 10s linear infinite',
        }} />
      </div>

      {/* ── Left vertical accent bar ── */}
      <div style={{
        position:'absolute', left:0, top:0, bottom:0, width:'0.45cqw',
        background:'linear-gradient(to bottom, transparent, #D4A017 20%, #D4A017 80%, transparent)',
        zIndex:10,
        opacity: go ? 1 : 0,
        animation: go ? 'slideL11 0.5s ease 0.05s both' : 'none',
      }} />

      {/* ════════════════════════════════════
          LEFT CONTENT PANEL
      ════════════════════════════════════ */}
      <div className="relative flex flex-col justify-center px-[5.5cqw] pt-[10cqh] pb-[8cqh] z-10"
        style={{ width:'55%' }}>

        {/* Area badge + line */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1cqw', marginBottom:'2.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL11 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <div style={{
            padding:'0.5cqh 1.2cqw', background:'#8B3A1F', flexShrink:0, position:'relative', overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', inset:0, pointerEvents:'none',
              background:'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              animation:'badgeShimmer11 2.8s ease-in-out infinite',
            }} />
            <span style={{
              position:'relative',
              fontFamily:'var(--font-body,sans-serif)', fontWeight:700,
              color:'rgba(255,245,220,0.95)', textTransform:'uppercase',
              letterSpacing:'0.3em', fontSize:'0.85cqw',
            }}>Area 05</span>
          </div>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.3)',
            transformOrigin:'left',
            animation: go ? 'growX11 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'4.8cqw', lineHeight:0.95, marginBottom:'1.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL11 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
        }}>
          <span style={{ color:'rgba(245,230,200,0.97)' }}>Creative<br /></span>
          <span className="market-text11">Market</span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(154,122,90,0.85)', fontSize:'1.45cqw', marginBottom:'4cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU11 0.6s ease 0.3s both' : 'none',
        }}>
          Area khusus pelaku ekonomi kreatif dan anak muda
        </p>

        {/* Item list */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.0cqh' }}>
          {items.map((item, i) => {
            const isH  = hov === i;
            const isDim = hov !== null && !isH;
            return (
              <div
                key={item.no}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'flex', alignItems:'center', gap:'1.4cqw',
                  padding:'1.0cqh 1.4cqw',
                  background: isH
                    ? 'linear-gradient(135deg, rgba(58,28,12,0.9) 0%, rgba(37,18,8,0.9) 100%)'
                    : 'rgba(255,245,220,0.03)',
                  border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.55)' : 'rgba(212,160,23,0.12)'}`,
                  borderLeft:`0.32cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.25)'}`,
                  borderRadius:'0 0.4cqw 0.4cqw 0',
                  opacity: isDim ? 0.28 : 1,
                  transform: isH ? 'translateX(0.6cqw) scale(1.015)' : 'translateX(0) scale(1)',
                  transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  animation: go ? `cardPop11 0.55s cubic-bezier(0.22,1,0.36,1) ${0.4 + i * 0.07}s both` : 'none',
                }}
              >
                {/* shimmer sweep */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.07) 50%, transparent 70%)',
                    animation:'shimmer11 1.8s ease-in-out infinite',
                  }} />
                )}

                {/* Number */}
                <span style={{
                  fontFamily:'var(--font-display,serif)', fontWeight:900,
                  fontSize:'2.4cqw', lineHeight:1, flexShrink:0,
                  color: isH ? 'rgba(212,160,23,0.40)' : 'rgba(212,160,23,0.13)',
                  transition:'color 0.35s ease',
                  animation:'numSway11 3s ease-in-out infinite',
                  userSelect:'none',
                }}>
                  {item.no}
                </span>

                {/* Text */}
                <div>
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:700,
                    fontSize:'1.7cqw', lineHeight:1.1,
                    color: isH ? '#D4A017' : 'rgba(245,230,200,0.88)',
                    transition:'color 0.35s ease', marginBottom:'0.15cqh',
                  }}>
                    {item.name}
                  </p>
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)',
                    fontSize:'1.0cqw', lineHeight:1.4,
                    color: isH ? 'rgba(245,230,200,0.58)' : 'rgba(212,160,23,0.32)',
                    transition:'color 0.35s ease',
                  }}>
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════
          RIGHT IMAGE PANEL
      ════════════════════════════════════ */}
      <div style={{
        position:'relative', flex:1,
        opacity: go ? 1 : 0,
        animation: go ? 'slideR11 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s both' : 'none',
      }}>
        {/* Photo with slow zoom */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
          <img
            src={`${base}creative-market.webp`}
            crossOrigin="anonymous"
            style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover',
              animation:'bgZoom11 16s ease-in-out infinite',
              transformOrigin:'center',
            }}
            alt="Creative Market"
          />
        </div>

        {/* Left gradient bleed */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to right, rgba(26,13,6,0.85) 0%, rgba(26,13,6,0.35) 35%, rgba(26,13,6,0.05) 65%, transparent 100%)',
        }} />
        {/* Bottom fade */}
        <div style={{
          position:'absolute', inset:'auto 0 0 0', height:'35%',
          background:'linear-gradient(to top, rgba(26,13,6,0.80) 0%, transparent 100%)',
        }} />

        {/* "Ekonomi Kreatif" badge — bottom left with shimmer */}
        <div style={{
          position:'absolute', bottom:'4cqh', left:'2.5cqw', overflow:'hidden',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU11 0.6s ease 0.7s both' : 'none',
        }}>
          <div style={{ display:'inline-block', padding:'0.8cqh 1.5cqw', background:'#D4A017', position:'relative', overflow:'hidden' }}>
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.22) 50%, transparent 75%)',
              animation:'badgeShimmer11 2.2s ease-in-out infinite',
            }} />
            <span style={{
              position:'relative',
              fontFamily:'var(--font-body,sans-serif)', fontWeight:700,
              color:'rgba(26,13,6,0.92)', textTransform:'uppercase',
              letterSpacing:'0.22em', fontSize:'1.1cqw',
            }}>
              Ekonomi Kreatif
            </span>
          </div>
        </div>

        {/* Thin right-edge glow line */}
        <div style={{
          position:'absolute', top:0, bottom:0, right:0, width:'0.15cqw',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.22) 40%, rgba(212,160,23,0.22) 60%, transparent)',
        }} />
      </div>

      <SlideHeader />
      <SlideFooter slide={11} />
    </div>
  );
}
