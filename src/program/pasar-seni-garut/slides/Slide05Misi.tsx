import { useState, useEffect } from 'react';
import { Megaphone, Landmark, TrendingUp, Handshake, Sparkles } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const missions = [
  { no: '01', Icon: Megaphone,  text: 'Memberikan ruang promosi bagi UMKM lokal' },
  { no: '02', Icon: Landmark,   text: 'Mengangkat budaya dan tradisi masyarakat Garut' },
  { no: '03', Icon: TrendingUp, text: 'Mendorong pertumbuhan ekonomi kreatif' },
  { no: '04', Icon: Handshake,  text: 'Menjadi wadah kolaborasi komunitas' },
  { no: '05', Icon: Sparkles,   text: 'Menciptakan pengalaman festival yang unik dan berkesan' },
];

export default function Slide05Misi() {
  const [go, setGo]         = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">

      <style>{`
        @keyframes slideLeft {
          from { opacity:0; transform: translateX(-3cqw); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity:0; transform: translateX(3cqw); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes growX {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes growY {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(1.5cqh); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes ghostPulse {
          0%,100% { opacity: 0.04; }
          50%     { opacity: 0.09; }
        }
        @keyframes iconFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-4px); }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Background texture */}
      <img src={`${base}wayang-deco.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.06 }} alt="" aria-hidden="true" />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent z-10" />

      {/* ══════ LEFT PANEL ══════ */}
      <div className="relative flex flex-col justify-center px-[5cqw] pt-[8cqh] pb-[7cqh] w-[36%] z-10 flex-shrink-0">

        {/* vertical gold bar */}
        <div style={{
          position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '0.45cqw',
          background: 'linear-gradient(to bottom, transparent, #D4A017 30%, #D4A017 70%, transparent)',
          transformOrigin: 'top',
          animation: go ? 'growY 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }} />

        {/* ghost big text */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'flex-start', paddingLeft: '4cqw',
          pointerEvents: 'none', userSelect: 'none',
          animation: 'ghostPulse 4s ease-in-out infinite',
        }}>
          <span style={{
            fontFamily: 'var(--font-display,serif)', fontWeight: 900,
            fontSize: '22cqw', lineHeight: 1, color: 'rgba(212,160,23,0.06)',
            letterSpacing: '-0.05em',
          }}>M</span>
        </div>

        {/* decorative rings */}
        <div style={{
          position: 'absolute', bottom: '8%', right: '-4cqw',
          width: '16cqw', height: '16cqw', borderRadius: '50%',
          border: '0.08cqw dashed rgba(212,160,23,0.2)',
          animation: 'orbitSpin 30s linear infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '8%', right: '-4cqw',
          width: '11cqw', height: '11cqw', borderRadius: '50%',
          border: '0.08cqw solid rgba(212,160,23,0.12)',
          pointerEvents: 'none',
        }} />

        {/* section label */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)',
          color: '#D4A017', letterSpacing: '0.35em', textTransform: 'uppercase',
          fontSize: '0.78cqw', marginBottom: '1.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideLeft 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          Misi Kami
        </p>

        {/* title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 900,
          fontSize: '7cqw', lineHeight: 0.9, letterSpacing: '-0.03em',
          color: 'rgba(255,245,220,0.95)', marginBottom: '2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideLeft 0.7s cubic-bezier(0.22,1,0.36,1) 0.32s both' : 'none',
        }}>
          Misi
        </h2>

        {/* gold rule */}
        <div style={{
          width: '4cqw', height: '0.3cqh',
          background: 'linear-gradient(90deg, #D4A017, transparent)',
          transformOrigin: 'left', marginBottom: '2.5cqh',
          animation: go ? 'growX 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both' : 'none',
        }} />

        {/* subtitle */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)',
          color: 'rgba(212,160,23,0.5)', fontSize: '1.1cqw', lineHeight: 1.65,
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp 0.7s ease 0.7s both' : 'none',
        }}>
          Lima pilar yang menjadi landasan Pasar Seni Garut sebagai festival budaya berkelanjutan.
        </p>

        {/* pilar count badge */}
        <div style={{
          marginTop: '3cqh', display: 'inline-flex', alignItems: 'center',
          gap: '0.8cqw', padding: '0.7cqh 1.4cqw',
          border: '0.07cqw solid rgba(212,160,23,0.3)',
          borderRadius: '99cqw', background: 'rgba(212,160,23,0.07)',
          width: 'fit-content',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp 0.6s ease 0.9s both' : 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-display,serif)', fontWeight: 900,
            color: '#D4A017', fontSize: '1.4cqw', lineHeight: 1,
          }}>5</span>
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)',
            color: 'rgba(212,160,23,0.6)', fontSize: '0.75cqw',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>Pilar Utama</span>
        </div>
      </div>

      {/* ══════ RIGHT PANEL ══════ */}
      <div
        className="relative flex flex-col justify-center flex-1 px-[4cqw] pt-[7cqh] pb-[7cqh] z-10"
        style={{ background: 'linear-gradient(135deg, #1e1008 0%, #160b04 100%)' }}
      >
        {/* right panel inner glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 80% 50%, rgba(212,160,23,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {missions.map((m, i) => {
            const isHovered = hovered === i;
            const isDimmed  = hovered !== null && !isHovered;

            return (
              <div key={m.no}>
                {/* mission row */}
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1.8cqw',
                    padding: '1.6cqh 1.2cqw',
                    borderRadius: '0.4cqw',
                    background: isHovered ? 'rgba(212,160,23,0.09)' : 'transparent',
                    opacity: isDimmed ? 0.35 : 1,
                    transform: isHovered ? 'translateX(0.5cqw)' : 'translateX(0)',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    cursor: 'default',
                    animation: go ? `slideRight 0.6s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.1}s both` : 'none',
                  }}
                >
                  {/* icon box */}
                  <div style={{
                    flexShrink: 0,
                    width: '2.8cqw', height: '2.8cqw',
                    borderRadius: '50%',
                    border: `0.07cqw solid ${isHovered ? 'rgba(212,160,23,0.6)' : 'rgba(212,160,23,0.2)'}`,
                    background: isHovered ? 'rgba(212,160,23,0.15)' : 'rgba(212,160,23,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.35s ease',
                    animation: isHovered ? 'iconFloat 1.8s ease-in-out infinite' : 'none',
                  }}>
                    <m.Icon
                      size="1.1cqw"
                      color={isHovered ? '#D4A017' : 'rgba(212,160,23,0.5)'}
                      strokeWidth={1.5}
                      style={{ transition: 'color 0.35s ease' }}
                    />
                  </div>

                  {/* number */}
                  <span style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 900,
                    fontSize: '1.5cqw', lineHeight: 1, flexShrink: 0,
                    color: isHovered ? 'rgba(212,160,23,0.8)' : 'rgba(212,160,23,0.25)',
                    transition: 'color 0.35s ease',
                    letterSpacing: '0.05em',
                  }}>
                    {m.no}
                  </span>

                  {/* text */}
                  <p style={{
                    fontFamily: 'var(--font-body,sans-serif)', fontWeight: 600,
                    fontSize: '1.75cqw', lineHeight: 1.35, flex: 1,
                    color: isHovered ? 'rgba(255,245,220,0.95)' : 'rgba(255,245,220,0.7)',
                    transition: 'color 0.35s ease',
                  }}>
                    {m.text}
                  </p>

                  {/* arrow indicator */}
                  <div style={{
                    flexShrink: 0, width: '1.5cqw', display: 'flex', justifyContent: 'flex-end',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(-0.5cqw)',
                    transition: 'all 0.35s ease',
                  }}>
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: '1cqw', height: '1cqw' }}>
                      <path d="M3 8 L13 8 M9 4 L13 8 L9 12" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* animated divider — not after last */}
                {i < missions.length - 1 && (
                  <div style={{
                    height: '0.05cqh',
                    background: isHovered || hovered === i + 1
                      ? 'rgba(212,160,23,0.3)'
                      : 'rgba(212,160,23,0.1)',
                    transformOrigin: 'left',
                    transition: 'background 0.35s ease',
                    animation: go ? `growX 0.5s ease ${0.35 + i * 0.1}s both` : 'none',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={5} />
    </div>
  );
}
