import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const tujuan = [
  'Budaya Garut',
  'UMKM lokal',
  'Kreativitas anak muda',
  'Pariwisata Garut',
  'Semangat kewirausahaan',
];

const syarat = [
  'Usia 18–30 tahun',
  'Domisili Garut',
  'Aktif di komunitas, UMKM, seni, atau kreatif',
  'Memiliki kemampuan komunikasi yang baik',
  'Aktif di media sosial',
  'Memiliki kepedulian terhadap budaya dan ekonomi lokal',
];

const sparks = [
  { left: '10%', top: '20%', dur: '3.4s', delay: '0.2s' },
  { left: '88%', top: '15%', dur: '4.1s', delay: '1.3s' },
  { left: '55%', top: '75%', dur: '3.8s', delay: '0.8s' },
  { left: '30%', top: '85%', dur: '4.6s', delay: '2.1s' },
  { left: '92%', top: '60%', dur: '3.2s', delay: '0.5s' },
  { left: '70%', top: '40%', dur: '4.0s', delay: '1.7s' },
];

export default function Slide27DutaOverview() {
  const [go, setGo] = useState(false);
  const [hovKat, setHovKat] = useState<number | null>(null);
  const [hovSyarat, setHovSyarat] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">
      <style>{`
        /* ── background drift ── */
        @keyframes bgDrift27 {
          0%   { transform:scale(1.06) translate(0px,0px); }
          40%  { transform:scale(1.10) translate(-10px,-7px); }
          100% { transform:scale(1.06) translate(0px,0px); }
        }

        /* ── sparks ── */
        @keyframes spark27 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          20%  { opacity:0.55; }
          70%  { transform:scale(1.7) rotate(210deg); opacity:0.25; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }

        /* ── scan line ── */
        @keyframes scan27 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── accent bar top ── */
        @keyframes barPulse27 {
          0%,100% { opacity:1; }
          50%     { opacity:0.45; }
        }

        /* ── left bar grow ── */
        @keyframes barGrowY27 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }

        /* ── entrance ── */
        @keyframes fadeUp27 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn27 {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes growX27 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes slideRight27 {
          from { opacity:0; transform:translateX(-2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideLeft27 {
          from { opacity:0; transform:translateX(2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes rowIn27 {
          from { opacity:0; transform:translateX(-1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes rowInR27 {
          from { opacity:0; transform:translateX(1.5cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes numPop27 {
          0%   { opacity:0; transform:scale(0.6); }
          60%  { transform:scale(1.1); }
          100% { opacity:1; transform:scale(1); }
        }

        /* ── dot pulse ── */
        @keyframes dotPulse27 {
          0%,100% { transform:scale(1);   box-shadow:0 0 0 rgba(212,160,23,0); }
          50%     { transform:scale(1.5); box-shadow:0 0 0.5cqw rgba(212,160,23,0.45); }
        }

        /* ── number box glow ── */
        @keyframes numGlow27 {
          0%,100% { box-shadow:none; border-color:rgba(212,160,23,0.35); }
          50%     { box-shadow:0 0 1cqw rgba(212,160,23,0.25); border-color:rgba(212,160,23,0.70); }
        }

        /* ── category chip idle glow ── */
        @keyframes chipIdle27 {
          0%,100% { box-shadow:0 0 0 rgba(212,160,23,0); }
          50%     { box-shadow:0 0 2cqw rgba(212,160,23,0.18); }
        }

        /* ── divider bottom pulse ── */
        @keyframes divPulse27 {
          0%,100% { opacity:0.30; transform:scaleX(1); }
          50%     { opacity:0.70; transform:scaleX(1.15); }
        }

        /* ── subtitle drift ── */
        @keyframes subtitleDrift27 {
          0%,100% { opacity:0.50; letter-spacing:0.005em; }
          50%     { opacity:0.80; letter-spacing:0.02em; }
        }

        /* ── right panel shimmer overlay ── */
        @keyframes panelShimmer27 {
          0%   { background-position:0% 50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }
      `}</style>

      {/* ── Background texture ── */}
      <img
        src={`${base}batik-texture.webp`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.09, animation: 'bgDrift27 26s ease-in-out infinite' }}
        alt="" aria-hidden="true"
      />

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.45cqw', height: '0.45cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark27 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan27 15s linear infinite',
        }} />
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh',
        background: 'linear-gradient(to right, transparent 0%, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent 100%)',
        animation: 'barPulse27 4.5s ease-in-out infinite', zIndex: 10,
      }} />

      {/* ── Left accent bar ── */}
      <div style={{
        width: '0.6cqw', flexShrink: 0, zIndex: 5, position: 'relative',
        background: 'linear-gradient(to bottom, transparent 0%, #D4A017 20%, #D4A017 80%, transparent 100%)',
        transformOrigin: 'top',
        animation: go ? 'barGrowY27 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }} />

      {/* ════════════ LEFT COLUMN ════════════ */}
      <div className="flex flex-col justify-center px-[4cqw] pt-[7.5cqh] pb-[6.5cqh] w-[52%]">

        {/* Label + line */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.5cqw', marginBottom: '2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn27 0.5s ease 0.15s both' : 'none',
        }}>
          <span className="font-psg-body text-psg-accent uppercase" style={{ fontSize: '0.9cqw', letterSpacing: '0.32em' }}>
            Program Duta
          </span>
          <div style={{
            flex: 1, height: '0.1cqh',
            background: 'linear-gradient(to right, rgba(212,160,23,0.40), transparent)',
            transformOrigin: 'left',
            animation: go ? 'growX27 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 700,
          fontSize: '3.5cqw', lineHeight: 1.1, marginBottom: '0.5cqh',
          color: 'rgba(245,230,195,0.97)',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp27 0.65s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
        }}>
          Duta Pasar Seni<br />
          <span style={{ color: '#D4A017' }}>Garut 2026</span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-display,serif)', fontStyle: 'italic',
          fontSize: '1.35cqw', marginBottom: '3cqh',
          color: 'rgba(245,230,195,0.50)',
          opacity: go ? 1 : 0,
          animation: go
            ? 'fadeIn27 0.5s ease 0.38s both, subtitleDrift27 4s ease-in-out 1.5s infinite'
            : 'none',
        }}>
          "Wajah Para Juara Lokal"
        </p>

        {/* Tujuan label */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.85cqw',
          color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase', letterSpacing: '0.22em',
          marginBottom: '1.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn27 0.4s ease 0.45s both' : 'none',
        }}>Tujuan</p>

        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.1cqw',
          color: 'rgba(245,230,195,0.60)', marginBottom: '1.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn27 0.4s ease 0.5s both' : 'none',
        }}>
          Mencari figur muda yang mampu menjadi representasi:
        </p>

        {/* Tujuan list */}
        <div className="flex flex-col" style={{ gap: '0.55cqh', marginBottom: '3cqh' }}>
          {tujuan.map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '1cqw',
              opacity: go ? 1 : 0,
              animation: go ? `rowIn27 0.45s cubic-bezier(0.22,1,0.36,1) ${0.55 + i * 0.07}s both` : 'none',
            }}>
              <div style={{
                width: '0.38cqw', height: '0.38cqw', borderRadius: '50%',
                background: '#D4A017', flexShrink: 0,
                animation: go ? `dotPulse27 2.8s ease-in-out ${1.2 + i * 0.3}s infinite` : 'none',
              }} />
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.15cqw',
                color: 'rgba(245,230,195,0.78)',
              }}>{t}</p>
            </div>
          ))}
        </div>

        {/* Kategori label */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.85cqw',
          color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase', letterSpacing: '0.22em',
          marginBottom: '1.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn27 0.4s ease 0.9s both' : 'none',
        }}>Kategori</p>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: '1.5cqw' }}>
          {['Duta Putra', 'Duta Putri'].map((k, i) => {
            const isH = hovKat === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovKat(i)}
                onMouseLeave={() => setHovKat(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.8cqw',
                  padding: '0.8cqh 1.5cqw',
                  border: `0.06cqw solid ${isH ? 'rgba(212,160,23,0.85)' : 'rgba(212,160,23,0.45)'}`,
                  background: isH
                    ? 'rgba(212,160,23,0.16)'
                    : 'rgba(212,160,23,0.07)',
                  transform: isH ? 'translateY(-0.4cqh) scale(1.04)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                  boxShadow: isH ? '0 0.6cqh 2cqw rgba(212,160,23,0.25)' : 'none',
                  opacity: go ? 1 : 0,
                  animation: go
                    ? `rowIn27 0.45s cubic-bezier(0.22,1,0.36,1) ${1.0 + i * 0.1}s both${!isH ? ', chipIdle27 4s ease-in-out ' + (1.8 + i * 0.7) + 's infinite' : ''}`
                    : 'none',
                }}
              >
                <span style={{ fontSize: '1.2cqw' }}>🏆</span>
                <p style={{
                  fontFamily: 'var(--font-display,serif)', fontWeight: 600,
                  fontSize: '1.15cqw',
                  color: isH ? '#f5c842' : 'rgba(245,230,195,0.90)',
                  transition: 'color 0.25s ease',
                }}>{k}</p>
              </div>
            );
          })}
        </div>

        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '1cqw',
          color: 'rgba(245,230,195,0.35)', marginTop: '0.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn27 0.4s ease 1.2s both' : 'none',
        }}>1 pasang pemenang utama</p>
      </div>

      {/* ════════════ RIGHT COLUMN ════════════ */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        padding: '7.5cqh 3.5cqw 0',
        background: 'linear-gradient(135deg, #221208 0%, #1A0D06 100%)',
        borderLeft: '0.05cqw solid rgba(212,160,23,0.15)',
        position: 'relative', overflow: 'hidden',
        opacity: go ? 1 : 0,
        animation: go ? 'slideLeft27 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
      }}>
        {/* Subtle animated gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(45deg, rgba(212,160,23,0.04) 0%, transparent 60%, rgba(212,160,23,0.03) 100%)',
          backgroundSize: '300% 300%',
          animation: 'panelShimmer27 12s ease-in-out infinite',
        }} />

        {/* Corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '8cqw', height: '8cqw',
          background: 'radial-gradient(circle at top right, rgba(212,160,23,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Brand Ambassador — fixed container so image NEVER escapes panel */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '52%',
          pointerEvents: 'none',
          opacity: go ? 0.95 : 0,
          animation: go ? 'fadeUp27 1s cubic-bezier(0.22,1,0.36,1) 0.6s both' : 'none',
        }}>
          <img
            src={`${base}brand-ambassador.webp`}
            style={{
              display: 'block',
              width: '100%', height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 0 1.2cqw rgba(212,160,23,0.20))',
            }}
            alt="Brand Ambassador Pasar Seni Garut"
          />
        </div>

        {/* Gradient fade so feet blend naturally into panel */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '10%',
          background: 'linear-gradient(to top, #1A0D06 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 2,
        }} />

        {/* Persyaratan label */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.85cqw',
          color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase', letterSpacing: '0.22em',
          marginBottom: '2cqh', position: 'relative', zIndex: 3,
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn27 0.4s ease 0.4s both' : 'none',
        }}>Persyaratan</p>

        {/* Syarat list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3cqh', position: 'relative', zIndex: 3 }}>
          {syarat.map((s, i) => {
            const isH = hovSyarat === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovSyarat(i)}
                onMouseLeave={() => setHovSyarat(null)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1cqw',
                  opacity: go ? 1 : 0,
                  animation: go ? `rowInR27 0.45s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.08}s both` : 'none',
                  transform: isH ? 'translateX(0.4cqw)' : 'translateX(0)',
                  transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {/* Number box */}
                <div style={{
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '1.8cqw', height: '1.8cqw',
                  background: isH ? 'rgba(212,160,23,0.22)' : 'rgba(212,160,23,0.12)',
                  border: `0.06cqw solid ${isH ? 'rgba(212,160,23,0.80)' : 'rgba(212,160,23,0.35)'}`,
                  transition: 'all 0.25s ease',
                  animation: go ? `numPop27 0.4s cubic-bezier(0.22,1,0.36,1) ${0.55 + i * 0.08}s both${!isH ? ', numGlow27 3.5s ease-in-out ' + (1.5 + i * 0.4) + 's infinite' : ''}` : 'none',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 700,
                    fontSize: '0.8cqw',
                    color: isH ? '#f5c842' : 'rgba(212,160,23,0.70)',
                    transition: 'color 0.25s ease',
                  }}>{String(i + 1).padStart(2, '0')}</p>
                </div>

                {/* Text */}
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.2cqw', lineHeight: 1.4,
                  color: isH ? 'rgba(245,230,195,0.95)' : 'rgba(245,230,195,0.72)',
                  transition: 'color 0.25s ease',
                }}>{s}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom divider + watermark */}
        <div style={{
          marginTop: '2.5cqh', width: '4cqw', height: '0.2cqh',
          background: '#D4A017', transformOrigin: 'left',
          animation: go ? 'growX27 0.6s cubic-bezier(0.22,1,0.36,1) 1.1s both, divPulse27 4s ease-in-out 2s infinite' : 'none',
          position: 'relative', zIndex: 3,
        }} />
        <p style={{
          fontFamily: 'var(--font-display,serif)', fontStyle: 'italic',
          fontSize: '1.1cqw', marginTop: '1.2cqh',
          color: 'rgba(212,160,23,0.38)',
          position: 'relative', zIndex: 3,
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn27 0.4s ease 1.3s both' : 'none',
        }}>
          Pasar Seni Garut 2026
        </p>
      </div>

      <SlideHeader />
      <SlideFooter slide={27} total={38} />
    </div>
  );
}
