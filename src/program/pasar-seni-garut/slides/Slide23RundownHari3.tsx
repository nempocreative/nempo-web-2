import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const schedule = [
  { time: '09.00',          activity: 'Open Gate',                                            location: 'Main Gate'    },
  { time: '09.00 – 22.00', activity: 'Operasional UMKM & Pasar Seni',                       location: 'Seluruh Area' },
  { time: '10.00 – 11.00', activity: 'Festival Kuliner Tradisional',                          location: 'Kuliner Area' },
  { time: '11.00 – 12.00', activity: 'Demo Memasak Kuliner Khas Garut',                      location: 'Kuliner Area' },
  { time: '12.00 – 13.00', activity: 'ISHOMA',                                                location: 'Area Festival'},
  { time: '13.00 – 14.00', activity: "Final Voting People's Choice Champion",                 location: 'Seluruh Area' },
  { time: '14.00 – 15.00', activity: 'Parade UMKM & Komunitas',                              location: 'Area Festival'},
  { time: '15.00 – 16.00', activity: 'Penghitungan Voting & Persiapan Awarding',             location: 'Main Stage'   },
  { time: '16.00 – 17.00', activity: 'Pertunjukan Seni Budaya',                              location: 'Main Stage'   },
  { time: '17.00 – 18.30', activity: 'Juara Local Champion Awards 2026',                      location: 'Main Stage'   },
  { time: '18.30 – 19.00', activity: 'Penyerahan Trophy Bergilir Pasar Seni Garut',         location: 'Main Stage'   },
  { time: '19.00 – 20.00', activity: 'Penampilan Guest Star',                                location: 'Main Stage'   },
  { time: '20.00 – 20.30', activity: 'Pengumuman Pasar Seni Garut 2027',                     location: 'Main Stage'   },
  { time: '20.30 – 21.30', activity: 'Grand Closing Celebration',                            location: 'Main Stage'   },
  { time: '21.30 – 22.00', activity: 'Foto Bersama Sponsor, Tenant & Komunitas',            location: 'Main Stage'   },
  { time: '22.00',         activity: 'Acara Selesai',                                         location: '—'            },
];

const highlights  = [5, 9, 10, 12, 13];
/* extra-gold rows — the very climactic moments */
const superHL     = [9, 13];

/* ambient orbs */
const orbs = [
  { left:'20%', top:'12%', r:'15cqw', dur:'13s', delay:'0s'   },
  { left:'70%', top:'62%', r:'11cqw', dur:'10s', delay:'1.8s' },
  { left:'50%', top:'80%', r:'7cqw',  dur:'12s', delay:'2.5s' },
  { left:'88%', top:'18%', r:'6cqw',  dur:'15s', delay:'3.2s' },
];

/* sparks */
const sparks = [
  { left:'28%', top:'22%', dur:'3.5s', delay:'0.5s' },
  { left:'62%', top:'10%', dur:'4.2s', delay:'1.1s' },
  { left:'82%', top:'45%', dur:'3.0s', delay:'0.8s' },
  { left:'42%', top:'88%', dur:'3.8s', delay:'2.0s' },
  { left:'92%', top:'70%', dur:'4.5s', delay:'1.6s' },
];

export default function Slide23RundownHari3() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        @keyframes slideL23 {
          from { opacity:0; transform:translateX(-3cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideR23 {
          from { opacity:0; transform:translateX(2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideU23 {
          from { opacity:0; transform:translateY(1.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX23 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes rowIn23 {
          from { opacity:0; transform:translateX(1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ambient */
        @keyframes orbGlow23 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.22); opacity:0.14; }
        }
        @keyframes spark23 {
          0%   { transform:scale(0) rotate(0deg);     opacity:0; }
          20%  { opacity:0.55; }
          70%  { transform:scale(1.5) rotate(200deg); opacity:0.3; }
          100% { transform:scale(0) rotate(360deg);   opacity:0; }
        }
        @keyframes scan23 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* sidebar */
        @keyframes numDrift23 {
          0%,100% { transform:translateY(0);   opacity:0.18; }
          50%     { transform:translateY(-6px); opacity:0.30; }
        }
        @keyframes accentBar23 {
          0%,100% { opacity:1; transform:scaleX(1); }
          50%     { opacity:0.5; transform:scaleX(0.8); }
        }
        @keyframes quotePulse23 {
          0%,100% { opacity:0.65; }
          50%     { opacity:0.95; }
        }
        @keyframes panelSweep23 {
          0%   { transform:translateY(-100%); opacity:0; }
          30%  { opacity:0.5; }
          70%  { opacity:0.5; }
          100% { transform:translateY(100%);  opacity:0; }
        }
        @keyframes topBarPulse23 {
          0%,100% { opacity:1; }
          50%     { opacity:0.45; }
        }
        @keyframes borderGlow23 {
          0%,100% { opacity:0.18; }
          50%     { opacity:0.45; }
        }
        @keyframes dotPulse23 {
          0%,100% { transform:scale(1);   opacity:1; }
          50%     { transform:scale(1.5); opacity:0.7; }
        }

        /* shimmer */
        @keyframes shimmer23 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .day-text23 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 20%, #f5c842 38%,
            #fff8dc 54%, #D4A017 72%, #fffbe8 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer23 3.5s ease infinite;
        }

        /* highlight rows */
        @keyframes hlGlow23 {
          0%,100% { box-shadow:none; }
          50%     { box-shadow:inset 0 0 2cqw rgba(212,160,23,0.08); }
        }
        /* super-highlight — Juara awards & Grand Closing */
        @keyframes superGlow23 {
          0%,100% {
            box-shadow:none;
            border-left-color: rgba(212,160,23,0.70);
          }
          50% {
            box-shadow:inset 0 0 3cqw rgba(212,160,23,0.14);
            border-left-color: #D4A017;
          }
        }
        /* sparkle dots floating on super-HL rows */
        @keyframes starFloat23 {
          0%   { transform:translateY(0)  scale(0); opacity:0; }
          30%  { transform:translateY(-4px) scale(1); opacity:0.7; }
          100% { transform:translateY(-10px) scale(0); opacity:0; }
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
          animation:`orbGlow23 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.4cqw', height:'0.4cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 0.7cqw rgba(212,160,23,0.60)',
          animation:`spark23 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation:'scan23 10s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.5cqh',
        background:'linear-gradient(to right, #D4A017, rgba(212,160,23,0.35) 70%, transparent)',
        animation:'topBarPulse23 3.5s ease-in-out infinite', zIndex:10,
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
        animation: go ? 'slideL23 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }}>
        {/* shimmer sweep */}
        <div style={{
          position:'absolute', left:'-20%', right:'-20%', height:'35%',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.055) 50%, transparent)',
          animation:'panelSweep23 6.5s ease-in-out 1s infinite',
          pointerEvents:'none',
        }} />

        {/* Right border glow */}
        <div style={{
          position:'absolute', top:0, bottom:0, right:0, width:'0.1cqw',
          background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.38) 30%, rgba(212,160,23,0.38) 70%, transparent)',
          animation:'borderGlow23 3.5s ease-in-out infinite',
        }} />

        {/* Date */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
          letterSpacing:'0.25em', fontSize:'0.85cqw', marginBottom:'1.5cqh',
          position:'relative',
        }}>27 September 2026</p>

        {/* Accent line */}
        <div style={{
          width:'3cqw', height:'0.3cqh', background:'#D4A017', marginBottom:'2cqh',
          animation:'accentBar23 3.5s ease-in-out infinite', position:'relative',
        }} />

        {/* Big "03" */}
        <p style={{
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          fontSize:'5.5cqw', lineHeight:0.9, marginBottom:'1cqh',
          color:'rgba(212,160,23,0.22)', userSelect:'none',
          animation:'numDrift23 4.5s ease-in-out 0.3s infinite',
          position:'relative',
        }}>03</p>

        {/* CHAMPION DAY */}
        <h2 style={{
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:'2.2cqw', lineHeight:1.15, marginBottom:'1cqh',
          position:'relative',
        }}>
          <span className="day-text23">CHAMPION</span>
          <br />
          <span style={{ color:'rgba(245,230,200,0.90)' }}>DAY</span>
        </h2>

        {/* Italic quote */}
        <p style={{
          fontFamily:'var(--font-display,serif)', fontStyle:'italic',
          color:'rgba(212,160,23,0.65)', fontSize:'1.15cqw', lineHeight:1.4,
          animation:'quotePulse23 3.5s ease-in-out 1s infinite',
          position:'relative', marginBottom:'auto',
        }}>"Puncak Festival<br />Para Juara"</p>

        {/* Legend */}
        <div style={{ position:'relative', marginTop:'auto', display:'flex', flexDirection:'column', gap:'0.5cqh' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5cqw' }}>
            <div style={{
              width:'0.5cqw', height:'0.5cqw', borderRadius:'50%', background:'#D4A017',
              animation:'dotPulse23 2.2s ease-in-out infinite', flexShrink:0,
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
          animation: go ? 'slideR23 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
            letterSpacing:'0.3em', fontSize:'0.9cqw', fontWeight:600, flexShrink:0,
          }}>Rundown</span>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.22)',
            transformOrigin:'left',
            animation: go ? 'growX23 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }} />
        </div>

        {/* Column headers */}
        <div style={{
          display:'grid', gridTemplateColumns:'22% 52% 26%',
          marginBottom:'0.8cqh', padding:'0 0.8cqw',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU23 0.45s ease 0.3s both' : 'none',
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
            const isHL    = highlights.includes(i);
            const isSHL   = superHL.includes(i);
            const isH     = hov === i;
            const isDim   = hov !== null && !isH;

            const borderCol = isH
              ? '#D4A017'
              : isSHL
                ? 'rgba(212,160,23,0.85)'
                : isHL
                  ? 'rgba(212,160,23,0.60)'
                  : 'transparent';

            const bg = isH
              ? 'linear-gradient(90deg, rgba(212,160,23,0.20) 0%, rgba(212,160,23,0.07) 100%)'
              : isSHL
                ? 'linear-gradient(90deg, rgba(212,160,23,0.16) 0%, rgba(212,160,23,0.05) 100%)'
                : isHL
                  ? 'linear-gradient(90deg, rgba(212,160,23,0.10) 0%, rgba(212,160,23,0.03) 100%)'
                  : i % 2 === 0 ? 'rgba(255,255,255,0.018)' : 'transparent';

            let anim = go ? `rowIn23 0.4s ease ${0.35 + i * 0.028}s both` : 'none';
            if (go && isSHL && !isH) anim += `, superGlow23 2.8s ease-in-out ${i * 0.15}s infinite`;
            else if (go && isHL && !isH) anim += `, hlGlow23 3.5s ease-in-out ${i * 0.18}s infinite`;

            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display:'grid', gridTemplateColumns:'22% 52% 26%',
                  padding:'1.0cqh 0.8cqw',
                  background: bg,
                  borderLeft:`0.25cqw solid ${borderCol}`,
                  opacity: isDim ? 0.24 : 1,
                  transform: isH ? 'translateX(0.35cqw)' : 'translateX(0)',
                  transition:'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'hidden',
                  borderRadius:'0 0.2cqw 0.2cqw 0',
                  animation: anim,
                  boxShadow: isH ? 'inset 0 0 2.5cqw rgba(212,160,23,0.12)' : 'none',
                }}
              >
                {/* shimmer sweep on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:'linear-gradient(90deg, transparent 20%, rgba(212,160,23,0.08) 50%, transparent 80%)',
                    animation:'shimmer23 1.6s ease-in-out infinite',
                  }} />
                )}

                {/* floating star dots on super-HL rows */}
                {isSHL && !isH && (
                  <>
                    <div style={{
                      position:'absolute', right:'2cqw', top:'50%', marginTop:'-0.2cqh',
                      width:'0.3cqw', height:'0.3cqw', borderRadius:'50%', background:'#D4A017',
                      animation:'starFloat23 3s ease-in-out 0s infinite',
                      pointerEvents:'none',
                    }} />
                    <div style={{
                      position:'absolute', right:'4cqw', top:'50%', marginTop:'-0.2cqh',
                      width:'0.25cqw', height:'0.25cqw', borderRadius:'50%', background:'#D4A017',
                      animation:'starFloat23 3s ease-in-out 1s infinite',
                      pointerEvents:'none',
                    }} />
                  </>
                )}

                <p style={{
                  fontFamily:'var(--font-body,sans-serif)', fontSize:'1.10cqw', lineHeight:1.35,
                  color: isH ? '#D4A017' : 'rgba(212,160,23,0.72)',
                  transition:'color 0.25s ease', position:'relative',
                }}>{row.time}</p>

                <p style={{
                  fontFamily:'var(--font-body,sans-serif)', fontSize:'1.10cqw', lineHeight:1.35,
                  color: isH
                    ? 'rgba(255,235,180,1)'
                    : isSHL ? 'rgba(255,235,180,0.96)'
                    : isHL  ? 'rgba(255,235,180,0.88)'
                    :         'rgba(255,235,180,0.62)',
                  fontWeight: (isSHL || isH) ? 700 : isHL ? 600 : 400,
                  transition:'all 0.25s ease', position:'relative',
                }}>{row.activity}</p>

                <p style={{
                  fontFamily:'var(--font-body,sans-serif)', fontSize:'1.02cqw', lineHeight:1.35,
                  color: isH ? 'rgba(245,230,200,0.65)' : 'rgba(245,230,200,0.36)',
                  transition:'color 0.25s ease', position:'relative',
                }}>{row.location}</p>
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={23} total={38} />
    </div>
  );
}
