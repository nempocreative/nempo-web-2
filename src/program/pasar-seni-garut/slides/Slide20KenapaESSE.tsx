import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const points = [
  {
    n: '1',
    title: 'Juara Menjadi Bagian dari Kisah Para Juara Lokal',
    sub: 'Bukan sekadar sponsor — brand yang mendukung:',
    chips: ['UMKM yang terus berkembang', 'Seniman yang terus berkarya', 'Komunitas yang terus bergerak', 'Kreator lokal yang terus berinovasi'],
  },
  {
    n: '2',
    title: 'Juara Tidak Selalu Tentang Kompetisi',
    chips: ['UMKM terbaik adalah juara.', 'Booth terbaik adalah juara.', 'Produk favorit pengunjung adalah juara.', 'Komunitas paling aktif adalah juara.'],
  },
  {
    n: '3',
    title: 'Membangun Emotional Connection',
    body: 'Masyarakat lebih mudah mengingat brand yang hadir mendukung mimpi mereka. Melalui konsep "Juara", Juara tidak hanya mendapat branding — tetapi membangun hubungan emosional nyata.',
  },
  {
    n: '4',
    title: 'Sejalan Dengan Semangat Generasi Kreatif',
    chips: ['Kreativitas', 'Konsistensi', 'Keberanian berkarya', 'Semangat berkembang'],
  },
];

const bigLines = [
  'Setiap UMKM memiliki cerita.',
  'Setiap karya memiliki perjuangan.',
  'Setiap komunitas memiliki mimpi.',
];

/* ambient orbs – left zone */
const orbs = [
  { left:'5%',  top:'20%', r:'14cqw', dur:'13s', delay:'0s'   },
  { left:'40%', top:'70%', r:'8cqw',  dur:'10s', delay:'1.5s' },
  { left:'72%', top:'18%', r:'10cqw', dur:'12s', delay:'2.5s' },
];

/* sparks */
const sparks = [
  { left:'12%', top:'55%', dur:'3.5s', delay:'0.4s' },
  { left:'35%', top:'15%', dur:'4.2s', delay:'1.1s' },
  { left:'55%', top:'78%', dur:'3.0s', delay:'0.8s' },
  { left:'82%', top:'42%', dur:'3.8s', delay:'2.0s' },
];

export default function Slide20KenapaJuara() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);
  const [hovLine, setHovLine] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL20 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideR20 {
          from { opacity:0; transform:translateX(3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU20 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX20 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes pointPop20 {
          from { opacity:0; transform:translateX(-2cqw) scale(0.97); }
          to   { opacity:1; transform:translateX(0)   scale(1); }
        }
        @keyframes chipPop20 {
          from { opacity:0; transform:translateY(0.8cqh) scale(0.9); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }
        @keyframes lineFadeIn20 {
          from { opacity:0; transform:translateX(2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── ambient ── */
        @keyframes orbGlow20 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.13; }
        }
        @keyframes spark20 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan20 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── shimmer ── */
        @keyframes shimmer20 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .esse-title20 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 18%, #f5c842 35%,
            #fff8dc 52%, #D4A017 70%, #fffbe8 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer20 4s ease infinite;
        }
        .juara-text20 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 28%, #fffbe8 50%, #D4A017 72%, #c8860a 100%
          );
          background-size:240% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer20 3s ease infinite;
        }

        /* ── top bar ── */
        @keyframes topBarPulse20 {
          0%,100% { opacity:1; }
          50%     { opacity:0.5; }
        }

        /* ── right panel Juara watermark ── */
        @keyframes esseDrift20 {
          0%,100% { transform:translateY(0)   rotate(-2deg); opacity:0.09; }
          50%     { transform:translateY(-8px) rotate(-2deg); opacity:0.15; }
        }

        /* ── right panel shimmer sweep ── */
        @keyframes panelSweep20 {
          0%   { transform:translateX(-120%); opacity:0; }
          20%  { opacity:0.6; }
          80%  { opacity:0.6; }
          100% { transform:translateX(120%);  opacity:0; }
        }

        /* ── number float ── */
        @keyframes numFloat20 {
          0%,100% { transform:translateY(0); opacity:0.55; }
          50%     { transform:translateY(-4px); opacity:0.85; }
        }

        /* ── divider pulse ── */
        @keyframes divPulse20 {
          0%,100% { opacity:0.22; }
          50%     { opacity:0.45; }
        }

        /* ── big quote line hover glow ── */
        @keyframes lineGlow20 {
          0%,100% { text-shadow:none; }
          100%    { text-shadow:0 0 2cqw rgba(212,160,23,0.25); }
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
          animation:`orbGlow20 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark20 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan20 11s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.5cqh',
        background:'linear-gradient(to right, #D4A017, rgba(212,160,23,0.35) 70%, transparent)',
        animation:'topBarPulse20 4s ease-in-out infinite', zIndex:10,
      }} />

      {/* ════════════════════════════════════
          MAIN LAYOUT
      ════════════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden" style={{ marginTop:'4cqh' }}>

        {/* ── LEFT COLUMN ── */}
        <div className="relative z-10 flex flex-col justify-center px-[5cqw] pt-[1cqh] pb-[5cqh] gap-[1.8cqh]" style={{ width:'58%' }}>

          {/* Section label */}
          <div style={{
            display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'0.3cqh',
            opacity: go ? 1 : 0,
            animation: go ? 'slideL20 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
          }}>
            <span style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(212,160,23,0.72)', textTransform:'uppercase',
              letterSpacing:'0.3em', fontSize:'1cqw', fontWeight:600, flexShrink:0,
            }}>Kenapa Juara Harus Mengambil Event Ini?</span>
            <div style={{
              flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.25)',
              transformOrigin:'left',
              animation: go ? 'growX20 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
            }} />
          </div>

          {/* 4 numbered points */}
          {points.map((pt, pi) => {
            const isH  = hov === pi;
            const isDim = hov !== null && !isH;
            return (
              <div
                key={pt.n}
                onMouseEnter={() => setHov(pi)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'flex', gap:'1.2cqw',
                  padding:'1.2cqh 1.2cqw',
                  background: isH
                    ? 'linear-gradient(90deg, rgba(212,160,23,0.10) 0%, rgba(212,160,23,0.03) 100%)'
                    : 'transparent',
                  borderLeft:`0.28cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.18)'}`,
                  borderRadius:'0 0.4cqw 0.4cqw 0',
                  opacity: isDim ? 0.28 : 1,
                  transform: isH ? 'translateX(0.4cqw)' : 'translateX(0)',
                  transition:'all 0.32s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  animation: go ? `pointPop20 0.55s cubic-bezier(0.22,1,0.36,1) ${0.22 + pi * 0.1}s both` : 'none',
                }}
              >
                {/* shimmer on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(90deg, transparent 20%, rgba(212,160,23,0.06) 50%, transparent 80%)',
                    animation:'shimmer20 2s ease-in-out infinite',
                  }} />
                )}

                {/* Number */}
                <div style={{ flexShrink:0, paddingTop:'0.2cqh' }}>
                  <span style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:900,
                    fontSize:'1.6cqw', lineHeight:1,
                    color: isH ? 'rgba(212,160,23,0.80)' : 'rgba(212,160,23,0.45)',
                    transition:'color 0.32s ease',
                    display:'block',
                    animation:'numFloat20 3s ease-in-out infinite',
                  }}>{pt.n}</span>
                </div>

                {/* Content */}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:700,
                    fontSize:'1.4cqw', lineHeight:1.2, marginBottom:'0.4cqh',
                    color: isH ? 'rgba(245,230,200,0.98)' : 'rgba(245,230,200,0.88)',
                    transition:'color 0.32s ease',
                  }}>{pt.title}</p>

                  {pt.sub && (
                    <p style={{
                      fontFamily:'var(--font-body,sans-serif)',
                      color:'rgba(154,122,90,0.78)', fontSize:'1.05cqw',
                      marginBottom:'0.4cqh',
                    }}>{pt.sub}</p>
                  )}

                  {pt.body && (
                    <p style={{
                      fontFamily:'var(--font-body,sans-serif)',
                      color:'rgba(245,230,200,0.65)', fontSize:'1.05cqw', lineHeight:1.5,
                    }}>{pt.body}</p>
                  )}

                  {pt.chips && (
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4cqw 1.5cqw', marginTop:'0.2cqh' }}>
                      {pt.chips.map((chip, ci) => (
                        <div key={ci} style={{
                          display:'flex', alignItems:'center', gap:'0.5cqw',
                          animation: go ? `chipPop20 0.4s ease ${0.4 + pi * 0.1 + ci * 0.05}s both` : 'none',
                        }}>
                          <div style={{
                            width:'0.3cqw', height:'0.3cqw', borderRadius:'50%',
                            background: isH ? '#D4A017' : 'rgba(212,160,23,0.55)',
                            transition:'background 0.32s ease', flexShrink:0,
                          }} />
                          <span style={{
                            fontFamily:'var(--font-body,sans-serif)',
                            color: isH ? 'rgba(245,230,200,0.80)' : 'rgba(245,230,200,0.62)',
                            fontSize:'1.05cqw', transition:'color 0.32s ease',
                          }}>{chip}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── RIGHT PANEL — Big Message ── */}
        <div style={{
          flex:1, display:'flex', flexDirection:'column', justifyContent:'center',
          padding:'7.5cqh 3.5cqw 6cqh',
          background:'linear-gradient(135deg, #2A1A0A 0%, #1A0D06 100%)',
          borderLeft:'0.05cqw solid rgba(212,160,23,0.18)',
          position:'relative', overflow:'hidden',
          opacity: go ? 1 : 0,
          animation: go ? 'slideR20 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both' : 'none',
          zIndex:10,
        }}>
          {/* shimmer sweep */}
          <div style={{
            position:'absolute', top:0, bottom:0, width:'40%',
            background:'linear-gradient(to right, transparent, rgba(212,160,23,0.045) 50%, transparent)',
            animation:'panelSweep20 7s ease-in-out 1s infinite',
            pointerEvents:'none',
          }} />

          {/* Left border glow */}
          <div style={{
            position:'absolute', top:0, bottom:0, left:0, width:'0.1cqw',
            background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.35) 30%, rgba(212,160,23,0.35) 70%, transparent)',
          }} />

          {/* Accent bar + "Big Message" label */}
          <div style={{
            width:'3cqw', height:'0.3cqh', background:'#D4A017', marginBottom:'2.5cqh',
          }} />
          <p style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.55)', textTransform:'uppercase',
            letterSpacing:'0.25em', fontSize:'0.9cqw', marginBottom:'2cqh',
          }}>Big Message</p>

          {/* 3 quote lines */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.8cqh', marginBottom:'2.5cqh' }}>
            {bigLines.map((line, i) => {
              const isH = hovLine === i;
              const isDim = hovLine !== null && !isH;
              return (
                <p
                  key={i}
                  onMouseEnter={() => setHovLine(i)}
                  onMouseLeave={() => setHovLine(null)}
                  style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:600,
                    fontSize:'1.6cqw', lineHeight:1.3, cursor:'default',
                    color: isH ? 'rgba(245,230,200,0.95)' : 'rgba(245,230,200,0.72)',
                    transform: isH ? 'translateX(0.4cqw)' : 'translateX(0)',
                    opacity: isDim ? 0.32 : 1,
                    transition:'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                    animation: go ? `lineFadeIn20 0.55s ease ${0.45 + i * 0.12}s both` : 'none',
                    textShadow: isH ? '0 0 2cqw rgba(212,160,23,0.22)' : 'none',
                  }}
                >{line}</p>
              );
            })}
          </div>

          {/* Divider */}
          <div style={{
            width:'100%', height:'0.05cqw', background:'rgba(212,160,23,0.22)',
            marginBottom:'2.5cqh',
            animation:'divPulse20 4s ease-in-out infinite',
          }} />

          {/* Closing quote */}
          <p style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'2cqw', lineHeight:1.35,
            color:'rgba(245,230,200,0.92)',
            opacity: go ? 1 : 0,
            animation: go ? 'slideU20 0.6s ease 0.9s both' : 'none',
          }}>
            Dan setiap perjuangan<br />
            layak disebut{' '}
            <em className="juara-text20">Juara.</em>
          </p>

          {/* Juara watermark */}
          <p style={{
            position:'absolute', bottom:'5cqh', right:'2.5cqw',
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            color:'rgba(212,160,23,0.10)', fontSize:'8cqw',
            userSelect:'none', lineHeight:1,
            animation:'esseDrift20 5s ease-in-out 1s infinite',
          }}>Juara</p>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={20} />
    </div>
  );
}
