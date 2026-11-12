import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const venues = [
  {
    key:   'panggung',
    label: 'Panggung Utama',
    sub:   'Main Stage berstruktur truss, backdrop LED, dan ornamen batik emas',
    img:   'venue-panggung.png',
    delay: '0.18s',
  },
  {
    key:   'gapura',
    label: 'Gapura Masuk',
    sub:   'Gerbang bambu anyam berukir dengan pencahayaan dramatis malam hari',
    img:   'venue-gapura.png',
    delay: '0.30s',
  },
  {
    key:   'booth',
    label: 'Booth UMKM',
    sub:   'Tenda tenant rotan & bambu natural dengan lampu gantung hangat',
    img:   'venue-booth.png',
    delay: '0.42s',
  },
];

const orbs = [
  { left: '8%',  top: '15%', r: '18cqw', dur: '14s', delay: '0s'   },
  { left: '55%', top: '65%', r: '12cqw', dur: '11s', delay: '2.2s' },
  { left: '85%', top: '10%', r: '8cqw',  dur: '9s',  delay: '1.5s' },
];

export default function Slide37VenueDesign() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">
      <style>{`
        @keyframes slideU37 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX37 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardIn37 {
          from { opacity:0; transform:translateY(3cqh) scale(0.96); }
          to   { opacity:1; transform:translateY(0)  scale(1); }
        }
        @keyframes orbGlow37 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.2);  opacity:0.13; }
        }
        @keyframes scan37 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
        @keyframes topBar37 {
          0%,100% { opacity:1; }
          50%     { opacity:0.45; }
        }
        @keyframes shimmer37 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .venue-title37 {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 42%,
            #D4A017 62%, #f0b429 82%, #c8860a 100%
          );
          background-size: 260% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer37 4s ease infinite;
        }
        @keyframes kBurns37 {
          0%,100% { transform:scale(1.04) translate(0, 0); }
          50%     { transform:scale(1.08) translate(-1%, -0.5%); }
        }
        @keyframes cardGlow37 {
          0%,100% { box-shadow: 0 0 0 0.05cqw rgba(212,160,23,0.25), 0 0.8cqh 3cqh rgba(0,0,0,0.55); }
          50%     { box-shadow: 0 0 0 0.08cqw rgba(212,160,23,0.55), 0 0.8cqh 3cqh rgba(0,0,0,0.55); }
        }
        @keyframes labelSlide37 {
          from { opacity:0; transform:translateY(0.8cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* ── Batik texture ── */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.06 }} alt="" aria-hidden="true" />

      {/* ── Ambient orbs ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: 'absolute', left: o.left, top: o.top,
          width: o.r, height: o.r, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          animation: `orbGlow37 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents: 'none', zIndex: 1,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan37 11s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh',
        background: 'linear-gradient(to right, #D4A017, rgba(212,160,23,0.35) 70%, transparent)',
        animation: 'topBar37 4s ease-in-out infinite', zIndex: 10,
      }} />

      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col px-[5.5cqw] pt-[7cqh]">
        {/* Section label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '1.4cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU37 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)',
            color: 'rgba(212,160,23,0.72)', textTransform: 'uppercase',
            letterSpacing: '0.3em', fontSize: '1cqw', fontWeight: 600, flexShrink: 0,
          }}>Desain Venue</span>
          <div style={{
            flex: 1, height: '0.08cqh', background: 'rgba(212,160,23,0.25)',
            transformOrigin: 'left',
            animation: go ? 'growX37 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 700,
          fontSize: '3.4cqw', lineHeight: 1.1, marginBottom: '0.4cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU37 0.65s cubic-bezier(0.22,1,0.36,1) 0.16s both' : 'none',
        }}>
          <span style={{ color: 'rgba(245,230,200,0.97)' }}>Konsep Visual </span>
          <span className="venue-title37">Pasar Seni Garut</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.1cqw',
          color: 'rgba(245,230,195,0.45)', marginBottom: '2.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideU37 0.6s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
        }}>
          Tiga elemen visual utama yang membentuk identitas festival
        </p>
      </div>

      {/* ════════════════════════════════════
          THREE CARDS
      ════════════════════════════════════ */}
      <div className="relative z-10 flex flex-1 gap-[2cqw] px-[5.5cqw] pb-[6cqh] overflow-hidden">
        {venues.map((v, i) => {
          const isH = hov === i;
          return (
            <div
              key={v.key}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                flex: 1,
                borderRadius: '0.8cqw',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'default',
                opacity: go ? 1 : 0,
                animation: go ? `cardIn37 0.7s cubic-bezier(0.22,1,0.36,1) ${v.delay} both${!isH ? `, cardGlow37 4s ease-in-out ${i * 0.8}s infinite` : ''}` : 'none',
                transform: isH ? 'translateY(-0.6cqh) scale(1.012)' : 'translateY(0) scale(1)',
                transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: isH
                  ? '0 0 0 0.12cqw #D4A017, 0 1.5cqh 5cqh rgba(0,0,0,0.7)'
                  : '0 0 0 0.05cqw rgba(212,160,23,0.30), 0 0.8cqh 3cqh rgba(0,0,0,0.55)',
              }}
            >
              {/* Photo */}
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'rgba(10,5,2,0.85)' }}>
                <img
                  src={`${base}${v.img}`}
                  crossOrigin="anonymous"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'contain',
                    objectPosition: 'center center',
                    animation: 'kBurns37 22s ease-in-out infinite',
                    animationDelay: `${i * 4}s`,
                    transformOrigin: 'center',
                    transition: 'transform 0.4s ease',
                    transform: isH ? 'scale(1.03)' : 'scale(1.01)',
                  }}
                  alt={v.label}
                />
              </div>

              {/* Dark gradient overlay — bottom caption zone */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,5,2,0.95) 0%, rgba(10,5,2,0.5) 28%, transparent 55%)',
                transition: 'background 0.35s ease',
              }} />

              {/* Hover top shimmer */}
              {isH && (
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(135deg, rgba(212,160,23,0.07) 0%, transparent 60%)',
                }} />
              )}

              {/* Gold top-left badge number */}
              <div style={{
                position: 'absolute', top: '1.8cqh', left: '1.4cqw',
                width: '2.2cqw', height: '2.2cqw', borderRadius: '50%',
                border: '0.08cqw solid rgba(212,160,23,0.70)',
                background: 'rgba(10,5,2,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                  fontSize: '0.9cqw', color: '#D4A017',
                }}>0{i + 1}</span>
              </div>

              {/* Caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '2.5cqh 1.8cqw 2.2cqh',
              }}>
                {/* Gold rule */}
                <div style={{
                  width: isH ? '3.5cqw' : '2.2cqw', height: '0.18cqh',
                  background: '#D4A017', marginBottom: '1.2cqh',
                  transition: 'width 0.35s ease',
                }} />

                <h3 style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                  fontSize: '1.55cqw', lineHeight: 1.15, marginBottom: '0.8cqh',
                  color: isH ? '#f5c842' : 'rgba(245,230,195,0.97)',
                  transition: 'color 0.3s ease',
                }}>{v.label}</h3>

                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)',
                  fontSize: '1.0cqw', lineHeight: 1.5,
                  color: isH ? 'rgba(245,230,195,0.80)' : 'rgba(245,230,195,0.52)',
                  transition: 'color 0.3s ease',
                }}>{v.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <SlideHeader />
      <SlideFooter slide={37} total={38} />
    </div>
  );
}
