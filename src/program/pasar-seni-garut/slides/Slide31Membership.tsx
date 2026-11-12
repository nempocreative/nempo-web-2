import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const sparks = [
  { left: '6%',  top: '18%', dur: '3.7s', delay: '0.3s' },
  { left: '94%', top: '24%', dur: '4.2s', delay: '1.1s' },
  { left: '50%', top: '88%', dur: '3.4s', delay: '0.8s' },
  { left: '82%', top: '62%', dur: '4.5s', delay: '2.0s' },
  { left: '26%', top: '80%', dur: '3.9s', delay: '1.5s' },
  { left: '70%', top: '10%', dur: '3.3s', delay: '0.6s' },
];

const IconReceipt = () => (
  <svg width="2.6cqw" height="2.6cqw" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '3.2cqw', height: '3.2cqw' }}>
    <rect x="7" y="4" width="34" height="40" rx="3" stroke="#D4A017" strokeWidth="2.4" fill="none"/>
    <path d="M7 44 l4.5-4 4.5 4 4.5-4 4.5 4 4.5-4 4.5 4 4.5-4" stroke="#D4A017" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="14" y1="15" x2="34" y2="15" stroke="#D4A017" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
    <line x1="14" y1="22" x2="34" y2="22" stroke="#D4A017" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
    <line x1="14" y1="29" x2="26" y2="29" stroke="#D4A017" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
    <circle cx="36" cy="10" r="6" fill="#0c0804" stroke="#D4A017" strokeWidth="2"/>
    <path d="M36 7.5v5M33.5 10h5" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IconSharing = () => (
  <svg width="3.2cqw" height="3.2cqw" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '3.2cqw', height: '3.2cqw' }}>
    <circle cx="9"  cy="24" r="5.5" stroke="#D4A017" strokeWidth="2.4" fill="none"/>
    <circle cx="39" cy="10" r="5.5" stroke="#D4A017" strokeWidth="2.4" fill="none"/>
    <circle cx="39" cy="38" r="5.5" stroke="#D4A017" strokeWidth="2.4" fill="none"/>
    <line x1="14.2" y1="21.2" x2="33.8" y2="12.8" stroke="#D4A017" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="14.2" y1="26.8" x2="33.8" y2="35.2" stroke="#D4A017" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="9"  cy="24" r="2.5" fill="#D4A017"/>
    <circle cx="39" cy="10" r="2.5" fill="#D4A017"/>
    <circle cx="39" cy="38" r="2.5" fill="#D4A017"/>
  </svg>
);

const items = [
  {
    Icon: IconReceipt,
    label: 'Biaya Pendaftaran',
    value: 'Rp300.000',
    note: 'sudah termasuk biaya pengelolaan sampah',
    accent: true,
  },
  {
    Icon: IconSharing,
    label: 'Revenue Sharing',
    value: '10 – 20%',
    note: 'dari total penjualan selama event berlangsung',
    accent: false,
  },
];

export default function Slide31Membership() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">
      <style>{`
        @keyframes bgDrift31 {
          0%,100% { transform:scale(1.06) translate(0px,0px); }
          50%      { transform:scale(1.10) translate(-9px,-5px); }
        }
        @keyframes spark31 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.55; }
          68%  { transform:scale(1.8) rotate(215deg); opacity:0.22; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }
        @keyframes scan31 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
        @keyframes barPulse31 {
          0%,100% { opacity:1; }
          50%     { opacity:0.40; }
        }
        @keyframes barGrowY31 {
          from { transform:scaleY(0); }
          to   { transform:scaleY(1); }
        }
        @keyframes fadeUp31 {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growX31 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cardIn31 {
          from { opacity:0; transform:translateY(3cqh) scale(0.96); }
          to   { opacity:1; transform:translateY(0)  scale(1); }
        }
        @keyframes pricePulse31 {
          0%,100% { text-shadow: 0 0 2cqw rgba(212,160,23,0.30); }
          50%     { text-shadow: 0 0 3.5cqw rgba(212,160,23,0.55); }
        }
        @keyframes cardGlow31 {
          0%,100% { box-shadow: 0 0.4cqh 3cqw rgba(212,160,23,0.10), inset 0 0 0 0.07cqw rgba(212,160,23,0.38); }
          50%     { box-shadow: 0 0.4cqh 4cqw rgba(212,160,23,0.22), inset 0 0 0 0.07cqw rgba(212,160,23,0.60); }
        }
        @keyframes labelBreath31 {
          0%,100% { opacity:0.62; letter-spacing:0.28em; }
          50%     { opacity:0.95; letter-spacing:0.34em; }
        }
        @keyframes shimmer31 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .price-grad31 {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 20%, #f5c842 40%,
            #fff8dc 55%, #c8860a 70%, #f0b429 85%, #fffbe8 100%
          );
          background-size: 260% 260%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer31 4s ease infinite, pricePulse31 4s ease-in-out infinite;
        }
      `}</style>

      {/* BG texture */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.08, animation: 'bgDrift31 26s ease-in-out infinite' }}
        alt="" aria-hidden="true" />

      {/* Sparks */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: '0.44cqw', height: '0.44cqw', borderRadius: '50%',
          background: '#D4A017', boxShadow: '0 0 0.9cqw rgba(212,160,23,0.60)',
          animation: `spark31 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* Scan line */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '0.35cqh',
          background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.07) 40%, transparent)',
          animation: 'scan31 14s linear infinite',
        }} />
      </div>

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '0.5cqh',
        background: 'linear-gradient(to right, transparent, #D4A017 20%, #fffbe8 50%, #D4A017 80%, transparent)',
        animation: 'barPulse31 4.5s ease-in-out infinite', zIndex: 10,
      }} />

      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '0.6cqw', zIndex: 5,
        background: 'linear-gradient(to bottom, transparent, #D4A017 15%, #D4A017 85%, transparent)',
        transformOrigin: 'top',
        animation: go ? 'barGrowY31 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '8cqh 8cqw',
        gap: '3.5cqh',
      }}>

        {/* Section label */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '0.88cqw',
          color: 'rgba(212,160,23,0.70)', textTransform: 'uppercase',
          letterSpacing: '0.32em',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp31 0.5s ease 0.15s both, labelBreath31 4s ease-in-out 1.5s infinite' : 'none',
        }}>
          Model Biaya Partisipasi
        </p>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 800,
          fontSize: '3.6cqw', lineHeight: 1.1, textAlign: 'center',
          color: 'rgba(245,230,195,0.97)',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp31 0.6s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
        }}>
          Biaya <span style={{ color: '#D4A017' }}>Peserta</span>
        </h2>

        {/* Divider */}
        <div style={{
          width: '4cqw', height: '0.22cqh',
          background: 'linear-gradient(to right, transparent, #D4A017, transparent)',
          transformOrigin: 'center',
          opacity: go ? 1 : 0,
          animation: go ? 'growX31 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
        }} />

        {/* Cards */}
        <div style={{
          display: 'flex', gap: '4cqw',
          alignItems: 'stretch',
          width: '100%', maxWidth: '72cqw',
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              flex: 1,
              background: item.accent
                ? 'linear-gradient(135deg, rgba(212,160,23,0.14) 0%, rgba(212,160,23,0.06) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              border: `0.07cqw solid ${item.accent ? 'rgba(212,160,23,0.55)' : 'rgba(212,160,23,0.22)'}`,
              borderRadius: '0.5cqw',
              padding: '4cqh 3.5cqw',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', gap: '1.5cqh',
              animation: go
                ? `cardIn31 0.65s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.14}s both${item.accent ? ', cardGlow31 4s ease-in-out 2s infinite' : ''}`
                : 'none',
              opacity: go ? 1 : 0,
            }}>

              {/* Icon */}
              <div style={{ lineHeight: 1 }}><item.Icon /></div>

              {/* Label */}
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.0cqw',
                color: 'rgba(212,160,23,0.72)', textTransform: 'uppercase',
                letterSpacing: '0.22em', fontWeight: 600,
              }}>
                {item.label}
              </p>

              {/* Price */}
              <p className="price-grad31" style={{
                fontFamily: 'var(--font-display,serif)', fontWeight: 900,
                fontSize: item.accent ? '4.4cqw' : '4.0cqw',
                lineHeight: 1,
              }}>
                {item.value}
              </p>

              {/* Note */}
              <p style={{
                fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.05cqw',
                color: 'rgba(245,230,195,0.50)', lineHeight: 1.55,
                maxWidth: '22cqw',
              }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{
          fontFamily: 'var(--font-body,sans-serif)', fontSize: '1.0cqw',
          color: 'rgba(245,230,195,0.32)', textAlign: 'center',
          letterSpacing: '0.04em',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp31 0.5s ease 0.70s both' : 'none',
        }}>
          Besaran sharing ditentukan berdasarkan kategori produk dan lokasi booth
        </p>
      </div>

      <SlideHeader />
      <SlideFooter slide={31} total={38} />
    </div>
  );
}
