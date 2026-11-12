import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const tahapan = [
  {
    no: '01',
    judul: 'Pendaftaran Online',
    sub: 'Mengirim:',
    items: ['Biodata', 'Foto', 'Video perkenalan'],
    isFinal: false,
  },
  {
    no: '02',
    judul: 'Top 20 Finalis',
    sub: 'Karantina singkat · Materi:',
    items: ['Public speaking', 'Branding diri', 'Pengetahuan Garut', 'UMKM dan budaya'],
    isFinal: false,
  },
  {
    no: '03',
    judul: 'Top 10 Finalis',
    sub: 'Presentasi:',
    items: ['"Bagaimana saya mempromosikan Garut melalui Pasar Seni Garut"'],
    isFinal: false,
  },
  {
    no: '04',
    judul: 'Grand Final',
    sub: 'Dilaksanakan pada malam puncak.',
    items: [],
    isFinal: true,
  },
];

const sparks = [
  { left: '6%',  top: '22%', dur: '3.6s', delay: '0.4s' },
  { left: '94%', top: '18%', dur: '4.2s', delay: '1.1s' },
  { left: '48%', top: '80%', dur: '3.2s', delay: '0.7s' },
  { left: '78%', top: '65%', dur: '4.5s', delay: '2.0s' },
  { left: '22%', top: '75%', dur: '3.9s', delay: '1.5s' },
  { left: '62%', top: '15%', dur: '3.4s', delay: '0.9s' },
];

export default function Slide28DutaSeleksi() {
  const [go,  setGo]  = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col px-[5.5cqw] pt-[7.5cqh] pb-[6cqh]">
      <style>{`
        /* ── background drift ── */
        @keyframes bgDrift28 {
          0%   { transform:scale(1.06) translate(0px,0px); }
          40%  { transform:scale(1.10) translate(-9px,-7px); }
          100% { transform:scale(1.06) translate(0px,0px); }
        }

        /* ── sparks ── */
        @keyframes spark28 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.55; }
          68%  { transform:scale(1.8) rotate(210deg); opacity:0.22; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }

        /* ── scan line ── */
        @keyframes scan28 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── top bar pulse ── */
        @keyframes barPulse28 {
          0%,100% { opacity:1; }
          50%     { opacity:0.40; }
        }

        /* ── entrance ── */
        @keyframes fadeUp28 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn28 {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes growX28 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardRise28 {
          from { opacity:0; transform:translateY(4cqh) scale(0.96); }
          to   { opacity:1; transform:translateY(0)  scale(1); }
        }

        /* ── card top border grow ── */
        @keyframes borderGrow28 {
          from { width:0%; }
          to   { width:100%; }
        }

        /* ── number box glow ── */
        @keyframes numGlow28 {
          0%,100% { box-shadow:none; border-color:rgba(212,160,23,0.50); }
          50%     { box-shadow:0 0 1.2cqw rgba(212,160,23,0.30); border-color:rgba(212,160,23,0.90); }
        }

        /* ── ghost number drift ── */
        @keyframes ghostNum28 {
          0%,100% { opacity:0.08; transform:scale(1)   translateY(0px); }
          50%     { opacity:0.14; transform:scale(1.06) translateY(-6px); }
        }

        /* ── dot pulse ── */
        @keyframes dotPulse28 {
          0%,100% { transform:scale(1);   opacity:0.60; }
          50%     { transform:scale(1.6); opacity:1.00; box-shadow:0 0 0.6cqw rgba(212,160,23,0.50); }
        }

        /* ── connector arrow flow ── */
        @keyframes arrowFlow28 {
          0%   { opacity:0.15; transform:translateX(-0.4cqw); }
          50%  { opacity:0.55; transform:translateX(0); }
          100% { opacity:0.15; transform:translateX(0.4cqw); }
        }

        /* ── grand final glow pulse ── */
        @keyframes finalGlow28 {
          0%,100% {
            box-shadow: inset 0 0 2cqw rgba(212,160,23,0.06), 0 0 0 rgba(212,160,23,0);
            border-color: rgba(212,160,23,0.50);
          }
          50% {
            box-shadow: inset 0 0 3.5cqw rgba(212,160,23,0.14), 0 0 2.5cqw rgba(212,160,23,0.20);
            border-color: rgba(212,160,23,0.85);
          }
        }

        /* ── grand final trophy spin ── */
        @keyframes trophySpin28 {
          0%,85%,100% { transform:rotate(0deg) scale(1); }
          90%          { transform:rotate(-12deg) scale(1.15); }
          95%          { transform:rotate(10deg)  scale(1.1); }
        }

        /* ── grand final shimmer ── */
        @keyframes finalShimmer28 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }

        /* ── card hover lift transition (CSS only) ── */
        .card28 {
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        .card28:hover {
          transform: translateY(-0.6cqh) scale(1.02) !important;
          box-shadow: 0 1.5cqh 3cqw rgba(0,0,0,0.45), 0 0 2cqw rgba(212,160,23,0.18) !important;
        }
      `}</style>

      {/* ── Background texture ── */}
      <img
        src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.09, animation: 'bgDrift28 24s ease-in-out infinite' }}
        alt="" aria-hidden="true"
      />

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.45cqw', height: '0.45cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark28 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan28 14s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh',
        background: 'linear-gradient(to right, transparent 0%, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent 100%)',
        animation: 'barPulse28 4.5s ease-in-out infinite', zIndex: 10,
      }} />

      {/* ════════ HEADER ════════ */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '1.5cqh',
        opacity: go ? 1 : 0,
        animation: go ? 'fadeIn28 0.5s ease 0.1s both' : 'none',
      }}>
        <span className="font-psg-body text-psg-accent uppercase" style={{ fontSize: '0.9cqw', letterSpacing: '0.32em' }}>
          Program Duta
        </span>
        <div style={{
          flex: 1, height: '0.1cqh',
          background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
          transformOrigin: 'left',
          animation: go ? 'growX28 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both' : 'none',
        }} />
      </div>

      <h2 style={{
        fontFamily: 'var(--font-display,serif)', fontWeight: 700,
        fontSize: '3.8cqw', lineHeight: 1.1, marginBottom: '3.5cqh',
        color: 'rgba(245,230,195,0.97)',
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp28 0.65s cubic-bezier(0.22,1,0.36,1) 0.18s both' : 'none',
      }}>
        Tahapan <span style={{ color: '#D4A017' }}>Seleksi</span>
      </h2>

      {/* ════════ STAGE CARDS ════════ */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: '2cqw', flex: 1, maxHeight: '55cqh', position: 'relative',
      }}>

        {/* Connector arrows between cards */}
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            left: `calc(${(i + 1) * 25}% - 1.2cqw)`,
            top: '50%', transform: 'translateY(-50%)',
            zIndex: 20, pointerEvents: 'none',
            opacity: go ? 1 : 0,
            animation: go ? `arrowFlow28 2.5s ease-in-out ${1.0 + i * 0.15}s infinite` : 'none',
          }}>
            <svg width="1.6cqw" height="1.6cqw" viewBox="0 0 24 24" style={{ width: '1.4cqw', height: '1.4cqw' }} fill="none">
              <path d="M9 6l6 6-6 6" stroke="rgba(212,160,23,0.55)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}

        {tahapan.map((t, i) => {
          const isHov   = hov === i;
          const isFinal = t.isFinal;

          return (
            <div
              key={i}
              className="card28"
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                display: 'flex', flexDirection: 'column',
                padding: '2cqw', position: 'relative', overflow: 'hidden',
                background: isFinal
                  ? 'linear-gradient(135deg, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.06) 100%)'
                  : isHov
                    ? 'linear-gradient(135deg, #321808 0%, #1E0F07 100%)'
                    : 'linear-gradient(135deg, #2A1408 0%, #1A0D06 100%)',
                border: isFinal
                  ? '0.05cqw solid rgba(212,160,23,0.50)'
                  : `0.05cqw solid ${isHov ? 'rgba(212,160,23,0.35)' : 'rgba(212,160,23,0.15)'}`,
                borderTop: 'none',
                opacity: go ? 1 : 0,
                animation: go
                  ? isFinal
                    ? `cardRise28 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.1}s both, finalGlow28 3.5s ease-in-out 1.5s infinite`
                    : `cardRise28 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.1}s both`
                  : 'none',
              }}
            >
              {/* Animated top border */}
              <div style={{
                position: 'absolute', top: 0, left: 0, height: '0.35cqw',
                background: isFinal
                  ? 'linear-gradient(to right, #D4A017, #fffbe8, #D4A017)'
                  : 'rgba(212,160,23,0.70)',
                animation: go
                  ? `borderGrow28 0.7s cubic-bezier(0.22,1,0.36,1) ${0.4 + i * 0.1}s both`
                  : 'none',
              }} />

              {/* Inner shimmer overlay for Grand Final */}
              {isFinal && (
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(135deg, transparent 30%, rgba(212,160,23,0.06) 50%, transparent 70%)',
                  backgroundSize: '300% 300%',
                  animation: 'finalShimmer28 8s ease-in-out infinite',
                }} />
              )}

              {/* Ghost number */}
              <p style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 900,
                fontSize: '5cqw', lineHeight: 1,
                color: isFinal ? 'rgba(212,160,23,0.15)' : 'rgba(212,160,23,0.10)',
                position: 'absolute', top: '0.5cqh', right: '1cqw',
                userSelect: 'none', pointerEvents: 'none',
                animation: `ghostNum28 ${4 + i * 0.8}s ease-in-out ${i * 0.5}s infinite`,
              }}>{t.no}</p>

              <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Number badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5cqh',
                  width: '2.2cqw', height: '2.2cqw',
                  background: isFinal ? 'rgba(212,160,23,0.25)' : 'rgba(212,160,23,0.15)',
                  border: `0.06cqw solid rgba(212,160,23,${isFinal ? '0.70' : '0.50'})`,
                  animation: go
                    ? `numGlow28 ${3 + i * 0.6}s ease-in-out ${1.2 + i * 0.3}s infinite`
                    : 'none',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                    fontSize: '0.9cqw', color: '#D4A017',
                  }}>{t.no}</p>
                </div>

                {/* Stage label */}
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.75cqw',
                  color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase',
                  letterSpacing: '0.16em', marginBottom: '0.8cqh',
                }}>Tahap {t.no}</p>

                {/* Title */}
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                  fontSize: '1.5cqw', lineHeight: 1.2, marginBottom: '1.2cqh',
                  color: isFinal ? '#f5c842' : 'rgba(245,230,195,0.95)',
                  textShadow: isFinal ? '0 0 2cqw rgba(212,160,23,0.35)' : 'none',
                  transition: 'text-shadow 0.3s ease',
                }}>
                  {isFinal && (
                    <span style={{
                      display: 'inline-block', marginRight: '0.4cqw',
                      animation: 'trophySpin28 5s ease-in-out infinite',
                    }}>🏆</span>
                  )}
                  {t.judul}
                </p>

                {/* Sub-label */}
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1cqw',
                  color: 'rgba(245,230,195,0.48)', marginBottom: '1cqh',
                  lineHeight: 1.4,
                }}>{t.sub}</p>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cqh' }}>
                  {t.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6cqw' }}>
                      <div style={{
                        width: '0.32cqw', height: '0.32cqw', borderRadius: '50%',
                        background: '#D4A017', flexShrink: 0, marginTop: '0.5cqh',
                        animation: go
                          ? `dotPulse28 3s ease-in-out ${1.5 + i * 0.4 + j * 0.2}s infinite`
                          : 'none',
                      }} />
                      <p style={{
                        fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.05cqw',
                        lineHeight: 1.4, color: 'rgba(245,230,195,0.72)',
                      }}>{item}</p>
                    </div>
                  ))}
                </div>

                {/* Grand Final extra decoration */}
                {isFinal && (
                  <div style={{ marginTop: '2cqh' }}>
                    <div style={{
                      height: '0.1cqh',
                      background: 'linear-gradient(to right, rgba(212,160,23,0.60), transparent)',
                      marginBottom: '1cqh',
                      animation: go ? 'growX28 0.7s cubic-bezier(0.22,1,0.36,1) 0.9s both' : 'none',
                    }} />
                    <p style={{
                      fontFamily: 'var(--font-display,serif)', fontStyle: 'italic',
                      fontSize: '0.95cqw', color: 'rgba(212,160,23,0.55)',
                      letterSpacing: '0.04em',
                      opacity: go ? 1 : 0,
                      animation: go ? 'fadeIn28 0.5s ease 1.0s both' : 'none',
                    }}>Malam Puncak Pasar Seni Garut</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <SlideHeader />
      <SlideFooter slide={28} total={38} />
    </div>
  );
}
