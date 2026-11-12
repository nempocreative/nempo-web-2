import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const games = [
  {
    img: 'kaulinan-1.jpg',
    name: 'Ketapel',
    sub: 'Ketepatan & fokus',
    pos: 'center 30%',
  },
  {
    img: 'kaulinan-2.jpg',
    name: 'Lompat Tali',
    sub: 'Keceriaan bersama',
    pos: 'center 40%',
  },
  {
    img: 'kaulinan-3.jpg',
    name: 'Gatrik',
    sub: 'Ketangkasan tradisional',
    pos: 'center 35%',
  },
  {
    img: 'kaulinan-4.jpg',
    name: 'Bakiak',
    sub: 'Kerja sama tim',
    pos: 'center 40%',
  },
  {
    img: 'kaulinan-5.jpg',
    name: 'Congklak',
    sub: 'Strategi & kecerdasan',
    pos: 'center 30%',
  },
  {
    img: 'kaulinan-6.jpg',
    name: 'Egrang',
    sub: 'Keseimbangan & keberanian',
    pos: 'center 30%',
  },
];

export default function Slide09KampungKaaulinan() {
  const [go, setGo]   = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        @keyframes fadeUp9 {
          from { opacity:0; transform:translateY(2.2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideL9 {
          from { opacity:0; transform:translateX(-2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes growX9 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardIn9 {
          from { opacity:0; transform:scale(0.93) translateY(2cqh); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes orbGlow9 {
          0%,100% { opacity:0.10; }
          50%     { opacity:0.18; }
        }
        @keyframes shimmerK9 {
          0%   { background-position:0% 50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }
        @keyframes countBounce9 {
          0%   { opacity:0; transform:scale(0.72); }
          65%  { transform:scale(1.06); }
          100% { opacity:1; transform:scale(1); }
        }
        .kaulinan-shimmer {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 22%, #fffbe8 40%, #D4A017 60%, #f0b429 78%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          font-style:italic;
          animation: shimmerK9 3.5s ease infinite;
        }
      `}</style>

      {/* Texture overlay */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.06 }} alt="" aria-hidden="true" />

      {/* Top + left accent bars */}
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-[0.45cqw] bg-psg-accent z-10" />

      {/* Orb glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse at 68% 50%, rgba(212,160,23,0.12) 0%, transparent 60%)',
        animation: 'orbGlow9 5s ease-in-out infinite',
      }} />

      {/* ══ LEFT PANEL ══ */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{ width: '28%', flexShrink: 0, paddingLeft: '5cqw', paddingRight: '2.5cqw', paddingTop: '8cqh', paddingBottom: '7cqh' }}
      >
        {/* Area badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1cqw', marginBottom: '2.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL9 0.55s cubic-bezier(0.22,1,0.36,1) 0.08s both' : 'none',
        }}>
          <div style={{ padding: '0.45cqh 1.1cqw', background: '#8B4513' }}>
            <span style={{
              fontFamily: 'var(--font-body,sans-serif)', fontWeight: 700,
              color: 'rgba(255,245,220,0.95)', textTransform: 'uppercase',
              letterSpacing: '0.3em', fontSize: '0.8cqw',
            }}>Area 03</span>
          </div>
          <div style={{
            height: '0.08cqh', width: '3.5cqw', background: 'rgba(212,160,23,0.4)',
            transformOrigin: 'left',
            animation: go ? 'growX9 0.55s ease 0.22s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 900,
          fontSize: '4.0cqw', lineHeight: 0.95, letterSpacing: '-0.025em',
          color: 'rgba(255,245,220,0.97)', marginBottom: '1.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideL9 0.6s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
        }}>
          Kampung<br /><span className="kaulinan-shimmer">Kaaulinan</span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)',
          color: 'rgba(212,160,23,0.50)', fontSize: '1.0cqw', lineHeight: 1.65,
          marginBottom: '2.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp9 0.55s ease 0.32s both' : 'none',
        }}>
          Zona permainan tradisional Sunda untuk keluarga dan anak muda — nostalgia dan interaksi langsung.
        </p>

        {/* Rule */}
        <div style={{
          width: '3.5cqw', height: '0.25cqh',
          background: 'linear-gradient(90deg,#D4A017,transparent)',
          transformOrigin: 'left', marginBottom: '3.2cqh',
          animation: go ? 'growX9 0.5s cubic-bezier(0.22,1,0.36,1) 0.48s both' : 'none',
        }} />

        {/* Stat */}
        <div style={{
          opacity: go ? 1 : 0,
          animation: go ? 'countBounce9 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both' : 'none',
        }}>
          <p style={{
            fontFamily: 'var(--font-display,serif)', fontWeight: 900,
            fontSize: '5cqw', lineHeight: 1, color: '#D4A017',
            textShadow: '0 0 2.5cqw rgba(212,160,23,0.28)',
          }}>6</p>
          <p style={{
            fontFamily: 'var(--font-body,sans-serif)',
            fontSize: '0.8cqw', color: 'rgba(255,245,220,0.35)',
            textTransform: 'uppercase', letterSpacing: '0.22em', marginTop: '0.4cqh',
          }}>Jenis Permainan</p>
        </div>
      </div>

      {/* ══ RIGHT: 3×2 Photo Cards ══ */}
      <div
        className="relative z-10 flex-1"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '0.7cqw', padding: '8.5cqh 3cqw 9cqh 1cqw' }}
      >
        {games.map((g, i) => {
          const isH   = hov === i;
          const isD   = hov !== null && !isH;
          const delay = 0.22 + i * 0.08;

          return (
            <div
              key={g.name}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: '0.55cqw',
                cursor: 'default',
                opacity: isD ? 0.55 : 1,
                transform: isH ? 'scale(1.03)' : 'scale(1)',
                transition: 'opacity 0.3s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s ease',
                boxShadow: isH
                  ? '0 1.5cqh 3cqw rgba(0,0,0,0.65), 0 0 1.5cqw rgba(212,160,23,0.18)'
                  : '0 0.5cqh 1.5cqw rgba(0,0,0,0.45)',
                animation: go ? `cardIn9 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : 'none',
              }}
            >
              {/* Photo */}
              <img
                src={`${base}${g.img}`}
                alt={g.name}
                crossOrigin="anonymous"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: g.pos,
                  transform: isH ? 'scale(1.07)' : 'scale(1)',
                  transition: 'transform 0.65s cubic-bezier(0.22,1,0.36,1)',
                  filter: isH ? 'brightness(0.75)' : 'brightness(0.55)',
                }}
              />

              {/* Base gradient overlay — always on */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(10,5,2,0.78) 100%)',
                pointerEvents: 'none',
              }} />

              {/* Hover accent top bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '0.35cqh',
                background: `linear-gradient(90deg, transparent, #D4A017, transparent)`,
                opacity: isH ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }} />

              {/* Number badge */}
              <div style={{
                position: 'absolute', top: '1.2cqh', left: '1cqw',
                fontFamily: 'var(--font-display,serif)', fontWeight: 900,
                fontSize: '1.5cqw', color: isH ? '#D4A017' : 'rgba(212,160,23,0.40)',
                transition: 'color 0.35s ease',
                textShadow: '0 0.2cqh 0.8cqh rgba(0,0,0,0.7)',
                lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Bottom text */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '0 1cqw 1.4cqh',
                transform: isH ? 'translateY(0)' : 'translateY(0.4cqh)',
                transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 800,
                  fontSize: '1.55cqw', lineHeight: 1.1,
                  color: isH ? '#fffbe8' : 'rgba(255,245,220,0.88)',
                  marginBottom: '0.35cqh',
                  textShadow: '0 0.2cqh 0.8cqh rgba(0,0,0,0.8)',
                  transition: 'color 0.28s ease',
                }}>
                  {g.name}
                </p>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.4cqw',
                  opacity: isH ? 1 : 0.55,
                  transition: 'opacity 0.35s ease',
                }}>
                  <div style={{
                    width: '0.35cqw', height: '0.35cqw', borderRadius: '50%',
                    background: '#D4A017', flexShrink: 0,
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-body,sans-serif)',
                    fontSize: '0.85cqw', lineHeight: 1.3,
                    color: isH ? 'rgba(212,160,23,0.90)' : 'rgba(255,245,220,0.65)',
                    textShadow: '0 0.1cqh 0.5cqh rgba(0,0,0,0.8)',
                    transition: 'color 0.28s ease',
                  }}>
                    {g.sub}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <SlideHeader />
      <SlideFooter slide={9} />
    </div>
  );
}
