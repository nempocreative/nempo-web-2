import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const categories = [
  { no: '01', kategori: 'UMKM Champion',           penilaian: 'Produk, pelayanan, inovasi'    },
  { no: '02', kategori: 'Culinary Champion',        penilaian: 'Rasa, penyajian, penjualan'    },
  { no: '03', kategori: 'Heritage Booth Champion',  penilaian: 'Dekorasi dan konsep jadul'     },
  { no: '04', kategori: 'Creative Market Champion', penilaian: 'Kreativitas produk'            },
  { no: '05', kategori: 'Community Champion',       penilaian: 'Aktivitas dan partisipasi'     },
  { no: '06', kategori: "People's Choice Champion", penilaian: 'Voting pengunjung'             },
];

const grand = { kategori: 'Grand Champion Pasar Seni Garut 2026', penilaian: 'Juara Umum Festival' };

/* ambient orbs */
const orbs = [
  { left:'8%',  top:'18%', r:'16cqw', dur:'14s', delay:'0s'   },
  { left:'75%', top:'60%', r:'11cqw', dur:'11s', delay:'2s'   },
  { left:'88%', top:'10%', r:'7cqw',  dur:'9s',  delay:'1.2s' },
  { left:'45%', top:'82%', r:'6cqw',  dur:'13s', delay:'3s'   },
];

/* sparks */
const sparks = [
  { left:'22%', top:'72%', dur:'3.5s', delay:'0.4s' },
  { left:'55%', top:'14%', dur:'4.2s', delay:'1.1s' },
  { left:'78%', top:'38%', dur:'3.0s', delay:'0.8s' },
  { left:'90%', top:'78%', dur:'3.8s', delay:'2.0s' },
];

export default function Slide24KategoriAwards() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL24 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideR24 {
          from { opacity:0; transform:translateX(3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU24 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX24 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes growY24 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }
        @keyframes rowIn24 {
          from { opacity:0; transform:translateX(-2cqw) scale(0.97); }
          to   { opacity:1; transform:translateX(0)   scale(1); }
        }
        @keyframes grandIn24 {
          from { opacity:0; transform:scale(0.94) translateY(2cqh); }
          to   { opacity:1; transform:scale(1)    translateY(0); }
        }

        /* ── ambient ── */
        @keyframes orbGlow24 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.13; }
        }
        @keyframes spark24 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan24 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── shimmer ── */
        @keyframes shimmer24 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .awards-text24 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 42%,
            #D4A017 62%, #f0b429 82%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer24 3.5s ease infinite;
        }

        /* ── top bar + left bar ── */
        @keyframes topBarPulse24 {
          0%,100% { opacity:1; }
          50%     { opacity:0.5; }
        }
        @keyframes barGlow24 {
          0%,100% { box-shadow:none; }
          50%     { box-shadow:2px 0 1.5cqw rgba(212,160,23,0.35); }
        }

        /* ── table header ── */
        @keyframes headerPulse24 {
          0%,100% { background:rgba(212,160,23,0.10); }
          50%     { background:rgba(212,160,23,0.16); }
        }

        /* ── grand champion ── */
        @keyframes grandPulse24 {
          0%,100% {
            box-shadow: 0 0 0   rgba(212,160,23,0);
            background: linear-gradient(90deg, rgba(212,160,23,0.16) 0%, rgba(212,160,23,0.05) 100%);
          }
          50% {
            box-shadow: 0 0 2.5cqh rgba(212,160,23,0.25);
            background: linear-gradient(90deg, rgba(212,160,23,0.24) 0%, rgba(212,160,23,0.09) 100%);
          }
        }
        @keyframes starSpin24 {
          0%   { transform:rotate(0deg)   scale(1); }
          50%  { transform:rotate(180deg) scale(1.3); }
          100% { transform:rotate(360deg) scale(1); }
        }
        @keyframes starFloat24 {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-4px); }
        }

        /* ── right panel ── */
        @keyframes champPulse24 {
          0%,100% { opacity:0.09; }
          50%     { opacity:0.18; }
        }
        @keyframes divPulse24 {
          0%,100% { opacity:0.28; transform:scaleY(1); }
          50%     { opacity:0.55; transform:scaleY(1.08); }
        }
        @keyframes panelSweep24 {
          0%   { transform:translateY(-100%); opacity:0; }
          30%  { opacity:0.5; }
          70%  { opacity:0.5; }
          100% { transform:translateY(100%);  opacity:0; }
        }
        @keyframes rightBorderGlow24 {
          0%,100% { opacity:0.20; }
          50%     { opacity:0.45; }
        }

        /* ── no hover ── */
        @keyframes numFloat24 {
          0%,100% { opacity:0.28; transform:translateY(0); }
          50%     { opacity:0.45; transform:translateY(-3px); }
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
          animation:`orbGlow24 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark24 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan24 11s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.5cqh',
        background:'linear-gradient(to right, #D4A017, rgba(212,160,23,0.35) 70%, transparent)',
        animation:'topBarPulse24 4s ease-in-out infinite', zIndex:10,
      }} />

      {/* ════════════════════════════════════
          MAIN ROW
      ════════════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left gold accent bar */}
        <div style={{
          width:'0.6cqw', flexShrink:0,
          background:'linear-gradient(to bottom, transparent, #D4A017 15%, #D4A017 85%, transparent)',
          animation:'barGlow24 3.5s ease-in-out infinite',
          opacity: go ? 1 : 0,
          ...(go ? { animation:'growY24 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s both, barGlow24 3.5s ease-in-out 0.65s infinite' } : {}),
          zIndex:10,
        }} />

        {/* ── CONTENT ── */}
        <div className="relative z-10 flex flex-col flex-1 px-[5.5cqw] pt-[7.5cqh] pb-[6cqh]">

          {/* Section label + line */}
          <div style={{
            display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'1.5cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'slideL24 0.55s cubic-bezier(0.22,1,0.36,1) 0.12s both' : 'none',
          }}>
            <span style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(212,160,23,0.72)', textTransform:'uppercase',
              letterSpacing:'0.3em', fontSize:'1cqw', fontWeight:600, flexShrink:0,
            }}>Program Award</span>
            <div style={{
              flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.25)',
              transformOrigin:'left',
              animation: go ? 'growX24 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
            }} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily:'var(--font-display,serif)', fontWeight:700,
            fontSize:'3.5cqw', lineHeight:1.05, marginBottom:'3.5cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'slideL24 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
          }}>
            <span style={{ color:'rgba(245,230,200,0.97)' }}>Juara Local Champion<br /></span>
            <span className="awards-text24">Awards 2026</span>
          </h2>

          {/* Table header */}
          <div style={{
            display:'grid', gridTemplateColumns:'6% 52% 42%',
            padding:'1cqh 1.5cqw', marginBottom:'0.8cqh',
            borderBottom:'0.05cqw solid rgba(212,160,23,0.38)',
            animation: go
              ? 'slideU24 0.45s ease 0.3s both, headerPulse24 4s ease-in-out 1s infinite'
              : 'none',
            opacity: go ? 1 : 0,
          }}>
            {['#', 'Kategori', 'Penilaian'].map(h => (
              <p key={h} style={{
                fontFamily:'var(--font-body,sans-serif)',
                color:'rgba(212,160,23,0.55)', textTransform:'uppercase',
                letterSpacing:'0.2em', fontSize:'0.8cqw',
              }}>{h}</p>
            ))}
          </div>

          {/* Category rows */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.45cqh' }}>
            {categories.map((row, i) => {
              const isH  = hov === i;
              const isDim = hov !== null && hov < 6 && !isH;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    display:'grid', gridTemplateColumns:'6% 52% 42%',
                    padding:'1.2cqh 1.5cqw',
                    background: isH
                      ? 'linear-gradient(90deg, rgba(212,160,23,0.16) 0%, rgba(212,160,23,0.05) 100%)'
                      : i % 2 === 0 ? 'rgba(255,255,255,0.022)' : 'transparent',
                    borderLeft:`0.25cqw solid ${isH ? '#D4A017' : 'transparent'}`,
                    borderRadius:'0 0.25cqw 0.25cqw 0',
                    opacity: isDim ? 0.26 : 1,
                    transform: isH ? 'translateX(0.35cqw)' : 'translateX(0)',
                    transition:'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                    cursor:'default', position:'relative', overflow:'hidden',
                    boxShadow: isH ? 'inset 0 0 2cqw rgba(212,160,23,0.08)' : 'none',
                    animation: go ? `rowIn24 0.45s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.07}s both` : 'none',
                  }}
                >
                  {/* shimmer on hover */}
                  {isH && (
                    <div style={{
                      position:'absolute', inset:0, pointerEvents:'none',
                      background:'linear-gradient(90deg, transparent 20%, rgba(212,160,23,0.07) 50%, transparent 80%)',
                      animation:'shimmer24 1.8s ease-in-out infinite',
                    }} />
                  )}

                  {/* No. */}
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:900,
                    fontSize:'1.1cqw', lineHeight:1.2,
                    color: isH ? 'rgba(212,160,23,0.70)' : 'rgba(212,160,23,0.28)',
                    transition:'color 0.28s ease',
                    animation:'numFloat24 3.5s ease-in-out infinite',
                  }}>{row.no}</p>

                  {/* Kategori */}
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:600,
                    fontSize:'1.5cqw', lineHeight:1.2,
                    color: isH ? 'rgba(245,230,200,0.98)' : 'rgba(245,230,200,0.82)',
                    transition:'color 0.28s ease',
                  }}>{row.kategori}</p>

                  {/* Penilaian */}
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)',
                    fontSize:'1.3cqw', lineHeight:1.2,
                    color: isH ? 'rgba(245,230,200,0.72)' : 'rgba(245,230,200,0.50)',
                    transition:'color 0.28s ease',
                  }}>{row.penilaian}</p>
                </div>
              );
            })}

            {/* ── Grand Champion row ── */}
            <div
              onMouseEnter={() => setHov(99)}
              onMouseLeave={() => setHov(null)}
              style={{
                display:'grid', gridTemplateColumns:'6% 52% 42%',
                padding:'1.8cqh 1.5cqw', marginTop:'0.8cqh',
                border:`0.06cqw solid ${hov === 99 ? 'rgba(212,160,23,0.75)' : 'rgba(212,160,23,0.42)'}`,
                borderLeft:`0.32cqw solid ${hov === 99 ? '#D4A017' : 'rgba(212,160,23,0.75)'}`,
                borderRadius:'0 0.35cqw 0.35cqw 0',
                cursor:'default', position:'relative', overflow:'hidden',
                transform: hov === 99 ? 'translateX(0.35cqw) scale(1.01)' : 'translateX(0) scale(1)',
                transition:'all 0.32s cubic-bezier(0.22,1,0.36,1)',
                opacity: (hov !== null && hov < 6) ? 0.26 : 1,
                animation: go
                  ? `grandIn24 0.6s cubic-bezier(0.22,1,0.36,1) 0.88s both, grandPulse24 3.5s ease-in-out 1.5s infinite`
                  : 'none',
              }}
            >
              {/* shimmer sweep */}
              <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                background:'linear-gradient(110deg, transparent 25%, rgba(212,160,23,0.07) 50%, transparent 75%)',
                animation:'shimmer24 3s ease-in-out infinite',
              }} />

              {/* ★ star */}
              <p style={{
                fontFamily:'var(--font-display,serif)', fontWeight:900,
                fontSize:'1.4cqw', lineHeight:1,
                color:'#D4A017',
                animation: hov === 99
                  ? 'starSpin24 1.2s ease-in-out infinite'
                  : 'starFloat24 2.5s ease-in-out infinite',
                position:'relative',
              }}>★</p>

              {/* Grand Champion title */}
              <p style={{
                fontFamily:'var(--font-display,serif)', fontWeight:700,
                fontSize:'1.65cqw', lineHeight:1.2,
                color: hov === 99 ? '#D4A017' : 'rgba(212,160,23,0.92)',
                transition:'color 0.32s ease', position:'relative',
              }}>{grand.kategori}</p>

              {/* Penilaian */}
              <p style={{
                fontFamily:'var(--font-body,sans-serif)',
                fontSize:'1.3cqw', lineHeight:1.2,
                color: hov === 99 ? 'rgba(212,160,23,0.90)' : 'rgba(212,160,23,0.68)',
                transition:'color 0.32s ease', position:'relative',
              }}>{grand.penilaian}</p>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            RIGHT DECORATIVE PANEL
        ════════════════════════════════════ */}
        <div style={{
          width:'16cqw', flexShrink:0,
          background:'linear-gradient(135deg, #2A1A0A 0%, #1A0D06 100%)',
          display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'center', gap:'2cqh',
          position:'relative', overflow:'hidden',
          opacity: go ? 1 : 0,
          animation: go ? 'slideR24 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both' : 'none',
          zIndex:10,
        }}>
          {/* shimmer sweep */}
          <div style={{
            position:'absolute', left:'-30%', right:'-30%', height:'30%',
            background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.055) 50%, transparent)',
            animation:'panelSweep24 7s ease-in-out 1s infinite',
            pointerEvents:'none',
          }} />

          {/* Left border glow */}
          <div style={{
            position:'absolute', top:0, bottom:0, left:0, width:'0.1cqw',
            background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.38) 30%, rgba(212,160,23,0.38) 70%, transparent)',
            animation:'rightBorderGlow24 3.5s ease-in-out infinite',
          }} />

          {/* Vertical "CHAMPION" text */}
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'4.5cqw', lineHeight:0.9,
            color:'rgba(212,160,23,0.12)', textAlign:'center',
            userSelect:'none', writingMode:'vertical-rl',
            transform:'rotate(180deg)', letterSpacing:'0.1em',
            animation:'champPulse24 4s ease-in-out infinite',
          }}>CHAMPION</p>

          {/* Divider */}
          <div style={{
            width:'0.3cqw', height:'5cqh',
            background:'rgba(212,160,23,0.30)',
            animation:'divPulse24 3s ease-in-out 1s infinite',
          }} />

          {/* Sub-label */}
          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.42)', letterSpacing:'0.3em',
            textTransform:'uppercase', fontSize:'0.75cqw',
            writingMode:'vertical-rl', transform:'rotate(180deg)',
          }}>Juara Awards 2026</p>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={24} total={38} />
    </div>
  );
}
