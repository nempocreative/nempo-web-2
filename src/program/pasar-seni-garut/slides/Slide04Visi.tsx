import { useEffect, useState } from 'react';
import { Palette, Store, Handshake } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

/* split vision sentence into word spans for staggered entrance */
const visionWords = [
  'Menjadikan', 'Pasar', 'Seni', 'Garut', 'sebagai',
  'festival', 'budaya', 'dan', 'UMKM', 'tahunan',
];
const highlight = ['terbesar'];
const visionEnd = ['di', 'Kabupaten', 'Garut.'];

export default function Slide04Visi() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col items-center justify-center">

      <style>{`
        /* ── background ── */
        @keyframes orb {
          0%, 100% { transform: scale(1);   opacity: 0.18; }
          50%       { transform: scale(1.15); opacity: 0.28; }
        }
        @keyframes ring {
          0%   { transform: scale(0.6); opacity: 0.55; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes ghostRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── text entrance ── */
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(1.8cqh) skewY(2deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        @keyframes lineIn {
          from { opacity: 0; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
        }
        @keyframes tagIn {
          from { opacity: 0; transform: translateY(2cqh); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes labelIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── shimmer on "terbesar" ── */
        @keyframes goldShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 20%, #fffbe8 40%, #D4A017 60%, #f0b429 80%, #c8860a 100%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmer 3s ease infinite;
        }

        /* ── tag pulse ── */
        @keyframes tagPulse {
          0%, 100% { box-shadow: 0 0 0px 0px rgba(212,160,23,0); }
          50%       { box-shadow: 0 0 14px 3px rgba(212,160,23,0.25); }
        }
        .tag-pulse { animation: tagPulse 2.8s ease-in-out infinite; }
      `}</style>

      {/* Batik texture */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.06 }} alt="" aria-hidden="true" />

      {/* Central orb glow */}
      <div style={{
        position: 'absolute', width: '55cqw', height: '55cqw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.05) 45%, transparent 70%)',
        animation: 'orb 5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Ripple rings */}
      {[0, 1.8, 3.6].map((delay, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${28 + i * 4}cqw`, height: `${28 + i * 4}cqw`,
          borderRadius: '50%',
          border: '0.1cqw solid rgba(212,160,23,0.35)',
          animation: `ring 5s ease-out ${delay}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Ghost "VISI" rotating slowly */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display, serif)',
          fontWeight: 900,
          fontSize: '30cqw',
          lineHeight: 1,
          color: 'rgba(212,160,23,0.04)',
          animation: 'ghostRotate 60s linear infinite',
          letterSpacing: '-0.05em',
        }}>
          VISI
        </span>
      </div>

      {/* Top + bottom accent bars */}
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent" />
      <div className="absolute bottom-0 left-0 right-0 h-[0.5cqh] bg-psg-accent" />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-[8cqw]" style={{ maxWidth: '80cqw' }}>

        {/* Section label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.8cqw',
          marginBottom: '3.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'labelIn 0.8s ease 0.1s both' : 'none',
        }}>
          <div style={{
            width: '5cqw', height: '0.15cqh', background: '#D4A017',
            transformOrigin: 'right',
            animation: go ? 'lineIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
          }} />
          <span style={{
            fontFamily: 'var(--font-body, sans-serif)',
            color: '#D4A017', letterSpacing: '0.45em', textTransform: 'uppercase', fontSize: '0.9cqw',
          }}>
            Visi Kami
          </span>
          <div style={{
            width: '5cqw', height: '0.15cqh', background: '#D4A017',
            transformOrigin: 'left',
            animation: go ? 'lineIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
          }} />
        </div>

        {/* Vision sentence — word by word */}
        <p style={{
          fontFamily: 'var(--font-display, serif)', fontWeight: 800,
          fontSize: '3.7cqw', lineHeight: 1.25, color: 'rgba(255,245,220,0.95)',
          textWrap: 'balance',
        }}>
          {visionWords.map((word, i) => (
            <span key={word + i} style={{
              display: 'inline-block', marginRight: '0.3em',
              opacity: go ? 1 : 0,
              animation: go ? `wordIn 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.07}s both` : 'none',
            }}>
              {word}
            </span>
          ))}
          {/* "terbesar" gold shimmer */}
          <span className="gold-shimmer" style={{
            display: 'inline-block', fontStyle: 'italic',
            marginRight: '0.3em',
            opacity: go ? 1 : 0,
            animation: go ? `wordIn 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + visionWords.length * 0.07}s both, goldShimmer 3s ease infinite` : 'none',
          }}>
            terbesar
          </span>
          {visionEnd.map((word, i) => (
            <span key={word + i} style={{
              display: 'inline-block', marginRight: '0.3em',
              opacity: go ? 1 : 0,
              animation: go ? `wordIn 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + (visionWords.length + 1 + i) * 0.07}s both` : 'none',
            }}>
              {word}
            </span>
          ))}
        </p>

        {/* Divider line */}
        <div style={{
          width: '8cqw', height: '0.35cqh',
          background: 'linear-gradient(90deg, transparent, #D4A017, transparent)',
          margin: '3.5cqh auto 2.5cqh',
          transformOrigin: 'center',
          animation: go ? 'lineIn 0.8s cubic-bezier(0.22,1,0.36,1) 1.4s both' : 'none',
        }} />

        {/* Byline */}
        <p style={{
          fontFamily: 'var(--font-body, sans-serif)',
          color: 'rgba(212,160,23,0.55)', letterSpacing: '0.18em',
          fontSize: '1.1cqw', textTransform: 'uppercase',
          opacity: go ? 1 : 0,
          animation: go ? 'labelIn 0.7s ease 1.6s both' : 'none',
        }}>
          Juara × Nempo Garut
        </p>

        {/* Three mission tags */}
        <div style={{
          display: 'flex', gap: '1.5cqw', marginTop: '4cqh',
        }}>
          {[
            { label: 'Budaya',    LucideIcon: Palette },
            { label: 'UMKM',      LucideIcon: Store },
            { label: 'Komunitas', LucideIcon: Handshake },
          ].map((tag, i) => (
            <div key={tag.label} className="tag-pulse" style={{
              padding: '0.8cqh 1.6cqw',
              border: '0.07cqw solid rgba(212,160,23,0.35)',
              borderRadius: '99cqw',
              background: 'rgba(212,160,23,0.07)',
              display: 'flex', alignItems: 'center', gap: '0.6cqw',
              opacity: go ? 1 : 0,
              animation: go ? `tagIn 0.6s cubic-bezier(0.22,1,0.36,1) ${1.8 + i * 0.12}s both, tagPulse 2.8s ease-in-out ${i * 0.9}s infinite` : 'none',
            }}>
              <tag.LucideIcon size="1cqw" color="rgba(212,160,23,0.85)" strokeWidth={1.5} />
              <span style={{
                fontFamily: 'var(--font-body, sans-serif)',
                color: 'rgba(212,160,23,0.8)', fontSize: '0.85cqw',
                letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>
                {tag.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={4} />
    </div>
  );
}
