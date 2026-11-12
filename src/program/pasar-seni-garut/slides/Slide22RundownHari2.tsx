import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const schedule = [
  { time: '09.00',           activity: 'Open Gate',                                  location: 'Main Gate'      },
  { time: '09.00 – 22.00',  activity: 'Operasional UMKM & Pasar Seni',              location: 'Seluruh Area'   },
  { time: '10.00 – 11.00',  activity: 'Senam & Aktivasi Komunitas',                  location: 'Area Tengah'    },
  { time: '11.00 – 12.00',  activity: 'Workshop Kerajinan Lokal',                    location: 'Workshop Area'  },
  { time: '12.00 – 13.00',  activity: 'ISHOMA',                                       location: 'Area Festival'  },
  { time: '13.00 – 14.00',  activity: 'Workshop Branding UMKM',                      location: 'Community Stage'},
  { time: '14.00 – 15.00',  activity: 'Talkshow "Dari Garut Menjadi Juara"',         location: 'Main Stage'     },
  { time: '15.00 – 16.00',  activity: 'Showcase Komunitas Kreatif',                  location: 'Main Stage'     },
  { time: '16.00 – 17.00',  activity: 'Lomba Konten Creator Pasar Seni',             location: 'Area Festival'  },
  { time: '17.00 – 18.00',  activity: 'Penilaian Tenant Champion',                   location: 'Seluruh Area'   },
  { time: '18.00 – 19.00',  activity: 'ISHOMA',                                       location: 'Area Festival'  },
  { time: '19.00 – 20.00',  activity: 'Musik Akustik & Indie Local',                 location: 'Main Stage'     },
  { time: '20.00 – 21.00',  activity: 'Panggung Komunitas',                           location: 'Main Stage'     },
  { time: '21.00 – 22.00',  activity: 'Malam Para Juara',                             location: 'Main Stage'     },
  { time: '22.00',          activity: 'Penutupan Hari Kedua',                         location: '—'              },
];

const highlights = [6, 7, 9, 13];

/* ambient orbs */
const orbs = [
  { left:'24%', top:'18%', r:'13cqw', dur:'13s', delay:'0s'   },
  { left:'72%', top:'60%', r:'10cqw', dur:'10s', delay:'1.8s' },
  { left:'48%', top:'82%', r:'6cqw',  dur:'12s', delay:'2.5s' },
];

/* sparks */
const sparks = [
  { left:'32%', top:'22%', dur:'3.5s', delay:'0.5s' },
  { left:'68%', top:'10%', dur:'4.2s', delay:'1.2s' },
  { left:'84%', top:'48%', dur:'3.0s', delay:'0.9s' },
  { left:'43%', top:'86%', dur:'3.8s', delay:'2.1s' },
];

export default function Slide22RundownHari2() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        @keyframes slideL22 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideR22 {
          from { opacity:0; transform:translateX(2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU22 {
          from { opacity:0; transform:translateY(1.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX22 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes rowIn22 {
          from { opacity:0; transform:translateX(1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes orbGlow22 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.13; }
        }
        @keyframes spark22 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.5; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan22 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
        @keyframes numDrift22 {
          0%,100% { transform:translateY(0);   opacity:0.18; }
          50%     { transform:translateY(-6px); opacity:0.28; }
        }
        @keyframes accentBar22 {
          0%,100% { opacity:1; transform:scaleX(1); }
          50%     { opacity:0.5; transform:scaleX(0.8); }
        }
        @keyframes quotePulse22 {
          0%,100% { opacity:0.65; }
          50%     { opacity:0.90; }
        }
        @keyframes panelSweep22 {
          0%   { transform:translateY(-100%); opacity:0; }
          30%  { opacity:0.5; }
          70%  { opacity:0.5; }
          100% { transform:translateY(100%);  opacity:0; }
        }
        @keyframes topBarPulse22 {
          0%,100% { opacity:1; }
          50%     { opacity:0.5; }
        }
        @keyframes hlGlow22 {
          0%,100% { box-shadow:none; }
          50%     { box-shadow:inset 0 0 2cqw rgba(212,160,23,0.08); }
        }
        @keyframes shimmer22 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .day-text22 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 20%, #f5c842 38%,
            #fff8dc 54%, #D4A017 72%, #fffbe8 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer22 4s ease infinite;
        }
        @keyframes dotPulse22 {
          0%,100% { transform:scale(1);   opacity:1; }
          50%     { transform:scale(1.4); opacity:0.7; }
        }
        @keyframes borderGlow22 {
          0%,100% { opacity:0.18; }
          50%     { opacity:0.40; }
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
          animation:`orbGlow22 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.6cqw rgba(212,160,23,0.55)',
          animation:`spark22 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan22 11s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.5cqh',
        background:'linear-gradient(to right, #D4A017, rgba(212,160,23,0.35) 70%, transparent)',
        animation:'topBarPulse22 4s ease-in-out infinite', zIndex:10,
      }} />

      {/* ════════════════════════════════════
          LEFT SIDEBAR
      ════════════════════════════════════ */}
      <div style={{
        width:'18cqw', flexShrink:0,
        background:'linear-gradient(135deg, #2A1A0A 0%, #1A0D06 100%)',
        display:'flex', flexDirection:'column', justifyContent:'center',
        alignItems:'flex-start', padding:'7.5cqh 2.5cqw 6.5cqh',
        position:'relative', overflow:'hidden', zIndex:10,
        opacity: go ? 1 : 0,
        animation: go ? 'slideL22 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }}>
        {/* shimmer sweep */}
        <div style={{
          position:'absolute', left:'-20%', right:'-20%', height:'35%',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.05) 50%, transparent)',
          animation:'panelSweep22 7s ease-in-out 1.2s infinite',
          pointerEvents:'none',
        }} />

        {/* Right border glow */}
        <div style={{
          position:'absolute', top:0, bottom:0, right:0, width:'0.1cqw',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.35) 30%, rgba(212,160,23,0.35) 70%, transparent)',
          animation:'borderGlow22 3.5s ease-in-out infinite',
        }} />

        {/* Date */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
          letterSpacing:'0.25em', fontSize:'0.85cqw', marginBottom:'1.5cqh',
          position:'relative',
        }}>26 September 2026</p>

        {/* Accent line */}
        <div style={{
          width:'3cqw', height:'0.3cqh', background:'#D4A017', marginBottom:'2cqh',
          animation:'accentBar22 3.5s ease-in-out infinite', position:'relative',
        }} />

        {/* Big "02" */}
        <p style={{
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          fontSize:'5.5cqw', lineHeight:0.9, marginBottom:'1cqh',
          color:'rgba(212,160,23,0.20)', userSelect:'none',
          animation:'numDrift22 5s ease-in-out 0.5s infinite',
          position:'relative',
        }}>02</p>

        {/* COMMUNITY DAY */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'2.2cqw', lineHeight:1.15, marginBottom:'1cqh',
          position:'relative',
        }}>
          <span className="day-text22">COMMUNITY</span>
          <br />
          <span style={{ color:'rgba(245,230,200,0.90)' }}>DAY</span>
        </h2>

        {/* Italic quote */}
        <p style={{
          fontFamily:'var(--font-display,serif)', fontStyle:'italic',
          color:'rgba(212,160,23,0.65)', fontSize:'1.15cqw', lineHeight:1.4,
          animation:'quotePulse22 4s ease-in-out 1s infinite',
          position:'relative', marginBottom:'auto',
        }}>"Merayakan<br />Kreativitas"</p>

        {/* Legend */}
        <div style={{ position:'relative', marginTop:'auto', display:'flex', flexDirection:'column', gap:'0.5cqh' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5cqw' }}>
            <div style={{
              width:'0.5cqw', height:'0.5cqw', borderRadius:'50%', background:'#D4A017',
              animation:'dotPulse22 2.5s ease-in-out infinite', flexShrink:0,
            }} />
            <span style={{ fontFamily:'var(--font-body,sans-serif)', color:'rgba(245,230,200,0.40)', fontSize:'0.8cqw' }}>Highlight</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5cqw' }}>
            <div style={{ width:'0.5cqw', height:'0.5cqw', borderRadius:'50%', background:'rgba(245,230,200,0.18)', flexShrink:0 }} />
            <span style={{ fontFamily:'var(--font-body,sans-serif)', color:'rgba(245,230,200,0.40)', fontSize:'0.8cqw' }}>Reguler</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          SCHEDULE TABLE
      ════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col pt-[6.5cqh] pb-[5cqh] px-[2.5cqw] overflow-hidden">

        {/* Section label */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'1.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideR22 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'0.9cqw', fontWeight:600, flexShrink:0,
          }}>Rundown</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.22)',
            transformOrigin:'left',
            animation: go ? 'growX22 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }} />
        </div>

        {/* Column headers */}
        <div style={{
          display:'grid', gridTemplateColumns:'22% 52% 26%',
          marginBottom:'0.8cqh', padding:'0 0.8cqw',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU22 0.45s ease 0.3s both' : 'none',
        }}>
          {['Waktu', 'Kegiatan', 'Lokasi'].map(h => (
            <p key={h} style={{
              fontFamily:'var(--font-body,sans-serif)',
              color:'rgba(212,160,23,0.45)', textTransform:'uppercase',
              letterSpacing:'0.15em', fontSize:'0.88cqw',
            }}>{h}</p>
          ))}
        </div>

        {/* Rows */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.45cqh', overflow:'hidden' }}>
          {schedule.map((row, i) => {
            const isHL  = highlights.includes(i);
            const isH   = hov === i;
            const isDim = hov !== null && !isH;

            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'grid', gridTemplateColumns:'22% 52% 26%',
                  padding:'1.0cqh 0.8cqw',
                  background: isH
                    ? 'linear-gradient(90deg, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.06) 100%)'
                    : isHL
                      ? 'linear-gradient(90deg, rgba(212,160,23,0.11) 0%, rgba(212,160,23,0.03) 100%)'
                      : i % 2 === 0 ? 'rgba(255,255,255,0.018)' : 'transparent',
                  borderLeft: isH
                    ? '0.22cqw solid #D4A017'
                    : isHL
                      ? '0.22cqw solid rgba(212,160,23,0.65)'
                      : '0.22cqw solid transparent',
                  opacity: isDim ? 0.25 : 1,
                  transform: isH ? 'translateX(0.3cqw)' : 'translateX(0)',
                  transition:'all 0.26s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  borderRadius:'0 0.2cqw 0.2cqw 0',
                  animation: go
                    ? isHL
                      ? `rowIn22 0.4s ease ${0.35 + i * 0.03}s both, hlGlow22 3s ease-in-out ${i * 0.2}s infinite`
                      : `rowIn22 0.4s ease ${0.35 + i * 0.03}s both`
                    : 'none',
                  boxShadow: isH ? 'inset 0 0 2cqw rgba(212,160,23,0.10)' : 'none',
                }}
              >
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(90deg, transparent 20%, rgba(212,160,23,0.07) 50%, transparent 80%)',
                    animation:'shimmer22 1.8s ease-in-out infinite',
                  }} />
                )}

                <p style={{
                  fontFamily:'var(--font-body,sans-serif)', fontSize:'1.10cqw', lineHeight:1.35,
                  color: isH ? '#D4A017' : 'rgba(212,160,23,0.72)',
                  transition:'color 0.26s ease', position:'relative',
                }}>{row.time}</p>

                <p style={{
                  fontFamily:'var(--font-body,sans-serif)', fontSize:'1.10cqw', lineHeight:1.35,
                  color: isH
                    ? 'rgba(255,235,180,1)'
                    : isHL ? 'rgba(255,235,180,0.92)' : 'rgba(255,235,180,0.62)',
                  fontWeight: (isHL || isH) ? 600 : 400,
                  transition:'all 0.26s ease', position:'relative',
                }}>{row.activity}</p>

                <p style={{
                  fontFamily:'var(--font-body,sans-serif)', fontSize:'1.02cqw', lineHeight:1.35,
                  color: isH ? 'rgba(245,230,200,0.65)' : 'rgba(245,230,200,0.36)',
                  transition:'color 0.26s ease', position:'relative',
                }}>{row.location}</p>
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={22} total={38} />
    </div>
  );
}
