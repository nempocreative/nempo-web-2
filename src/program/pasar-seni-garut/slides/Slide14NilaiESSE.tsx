import { useEffect, useState } from 'react';
import { TrendingUp, Sparkles, Users, Landmark, Star } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const pillars = [
  { no: '01', Icon: TrendingUp, name: 'Pengembangan\nUMKM',           accent: 'Ekosistem bisnis lokal yang tumbuh' },
  { no: '02', Icon: Sparkles,   name: 'Ekonomi Kreatif\nLokal',        accent: 'Inovasi & nilai tambah produk daerah' },
  { no: '03', Icon: Users,      name: 'Aktivitas\nKomunitas',           accent: 'Keterlibatan langsung masyarakat' },
  { no: '04', Icon: Landmark,   name: 'Pelestarian\nBudaya Daerah',    accent: 'Warisan hidup yang terus bernapas' },
  { no: '05', Icon: Star,       name: 'Festival\nMasyarakat',           accent: 'Perayaan bersama yang dikenang' },
];

/* floating orbs */
const orbs = [
  { left:'10%', top:'20%', r:'16cqw', dur:'14s', delay:'0s'   },
  { left:'80%', top:'60%', r:'12cqw', dur:'11s', delay:'2s'   },
  { left:'50%', top:'80%', r:'8cqw',  dur:'9s',  delay:'1s'   },
  { left:'90%', top:'10%', r:'6cqw',  dur:'13s', delay:'3s'   },
];

/* spark particles */
const sparks = [
  { left:'18%', top:'65%', dur:'3.5s', delay:'0.4s' },
  { left:'42%', top:'15%', dur:'4.2s', delay:'1.2s' },
  { left:'67%', top:'30%', dur:'3.0s', delay:'0.7s' },
  { left:'85%', top:'75%', dur:'3.8s', delay:'1.9s' },
  { left:'30%', top:'85%', dur:'4.5s', delay:'2.4s' },
];

export default function Slide14NilaiJuara() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col px-[5.5cqw] pt-[9cqh] pb-[7.5cqh]">
      <style>{`
        /* ── entrance ── */
        @keyframes slideL14 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU14 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX14 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardPop14 {
          from { opacity:0; transform:translateY(4cqh) scale(0.93); }
          to   { opacity:1; transform:translateY(0)  scale(1); }
        }

        /* ── ambient ── */
        @keyframes orbGlow14 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.13; }
        }
        @keyframes spark14 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan14 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── top bar pulse ── */
        @keyframes barPulse14 {
          0%,100% { opacity:1;   transform:scaleX(1); }
          50%     { opacity:0.6; transform:scaleX(0.97); }
        }

        /* ── pillar icon bounce ── */
        @keyframes iconFloat14 {
          0%,100% { transform:translateY(0) scale(1); }
          50%     { transform:translateY(-5px) scale(1.08); }
        }
        @keyframes numSway14 {
          0%,100% { opacity:0.12; transform:translateY(0); }
          50%     { opacity:0.26; transform:translateY(-4px); }
        }

        /* ── title shimmer ── */
        @keyframes shimmer14 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .esse-text14 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 40%, #D4A017 58%, #f0b429 80%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer14 3.5s ease infinite;
        }

        /* ── card hover bottom bar ── */
        @keyframes growFromCenter14 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
      `}</style>

      {/* ── Wayang texture bg ── */}
      <img src={`${base}wayang-deco.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity:0.06 }} alt="" aria-hidden="true" />

      {/* ── Ambient orbs ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.r, height:o.r, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          animation:`orbGlow14 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Spark particles ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017',
          boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark14 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan14 10s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.5cqh',
        background:'linear-gradient(to right, #D4A017, rgba(212,160,23,0.4) 70%, transparent)',
        animation:'barPulse14 4s ease-in-out infinite',
        zIndex:10,
      }} />

      {/* ════════════ CONTENT ════════════ */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Section label + line */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL14 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.75)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'1.1cqw', fontWeight:600, flexShrink:0,
          }}>Kemitraan</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.28)',
            transformOrigin:'left',
            animation: go ? 'growX14 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'4cqw', lineHeight:1.05, marginBottom:'1.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL14 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
        }}>
          <span style={{ color:'rgba(245,230,200,0.97)' }}>Nilai yang Diberikan untuk </span>
          <span className="esse-text14">Juara</span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(154,122,90,0.82)', fontSize:'1.45cqw', lineHeight:1.55,
          maxWidth:'68cqw', marginBottom:'3.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU14 0.6s ease 0.28s both' : 'none',
        }}>
          Bukan sekadar ruang branding — Juara hadir dalam aktivitas masyarakat melalui pendekatan budaya dan komunitas. Kehadiran brand menjadi bagian dari pengalaman langsung pengunjung.
        </p>

        {/* ── 5-pillar cards ── */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(5, 1fr)',
          gap:'1.4cqw', flex:1, minHeight:0,
        }}>
          {pillars.map((p, i) => {
            const isH  = hov === i;
            const isDim = hov !== null && !isH;
            return (
              <div
                key={p.no}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'flex', flexDirection:'column',
                  justifyContent:'space-between',
                  padding:'1.8cqh 1.6cqw',
                  background: isH
                    ? 'linear-gradient(145deg, #3a1c0c 0%, #251208 100%)'
                    : 'linear-gradient(135deg, #2A1408 0%, #1F0F06 100%)',
                  border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.60)' : 'rgba(212,160,23,0.22)'}`,
                  borderTop:`0.28cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.28)'}`,
                  borderRadius:'0 0 0.5cqw 0.5cqw',
                  opacity: isDim ? 0.28 : 1,
                  transform: isH ? 'translateY(-0.8cqh) scale(1.025)' : 'translateY(0) scale(1)',
                  transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  boxShadow: isH ? '0 1cqh 2.5cqh rgba(212,160,23,0.22)' : 'none',
                  animation: go ? `cardPop14 0.55s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.09}s both` : 'none',
                }}
              >
                {/* shimmer sweep on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(110deg, transparent 30%, rgba(212,160,23,0.07) 50%, transparent 70%)',
                    animation:'shimmer14 1.8s ease-in-out infinite',
                  }} />
                )}

                {/* Top: number + icon */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                  <span style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:900,
                    fontSize:'3.2cqw', lineHeight:1,
                    color: isH ? 'rgba(212,160,23,0.38)' : 'rgba(212,160,23,0.13)',
                    transition:'color 0.35s ease',
                    animation:'numSway14 3s ease-in-out infinite',
                    userSelect:'none',
                  }}>{p.no}</span>

                  <div style={{
                    width:'2.1cqw', height:'2.1cqw', borderRadius:'50%',
                    border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.6)' : 'rgba(212,160,23,0.18)'}`,
                    background: isH ? 'rgba(212,160,23,0.16)' : 'rgba(212,160,23,0.06)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'all 0.35s ease',
                    animation: isH ? 'iconFloat14 1.4s ease-in-out infinite' : 'none',
                    flexShrink:0,
                  }}>
                    <p.Icon
                      size="1cqw"
                      color={isH ? '#D4A017' : 'rgba(212,160,23,0.38)'}
                      strokeWidth={1.5}
                      style={{ transition:'color 0.35s ease' }}
                    />
                  </div>
                </div>

                {/* Bottom: name + accent desc */}
                <div>
                  <p style={{
                    fontFamily:'var(--font-display,serif)', fontWeight:700,
                    fontSize:'1.5cqw', lineHeight:1.2,
                    color: isH ? '#D4A017' : 'rgba(245,230,200,0.90)',
                    transition:'color 0.35s ease',
                    marginBottom:'0.6cqh',
                    whiteSpace:'pre-line',
                  }}>{p.name}</p>
                  <p style={{
                    fontFamily:'var(--font-body,sans-serif)',
                    fontSize:'0.95cqw', lineHeight:1.45,
                    color: isH ? 'rgba(245,230,200,0.58)' : 'rgba(212,160,23,0.30)',
                    transition:'color 0.35s ease',
                  }}>{p.accent}</p>
                </div>

                {/* Bottom glide bar on hover */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0, height:'0.22cqh',
                  background:'linear-gradient(90deg, transparent, #D4A017, transparent)',
                  transform: isH ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin:'center',
                  transition:'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                }} />
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={14} />
    </div>
  );
}
