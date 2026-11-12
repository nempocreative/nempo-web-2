import { useEffect, useState } from 'react';
import { ShoppingBag, RefreshCw, Handshake, BarChart3 } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const points = [
  {
    no: '01',
    Icon: ShoppingBag,
    text: 'Festival UMKM, budaya, dan komunitas bertema nostalgia pasar rakyat tempo dulu',
  },
  {
    no: '02',
    Icon: RefreshCw,
    text: 'Menghidupkan kembali kehangatan pasar tradisional Indonesia dalam kemasan modern',
  },
  {
    no: '03',
    Icon: Handshake,
    text: 'Nempo Garut mengundang Juara sebagai mitra utama festival',
  },
  {
    no: '04',
    Icon: BarChart3,
    text: 'Berdampak langsung pada pengembangan UMKM dan ekonomi kreatif Kabupaten Garut',
  },
];

export default function Slide02ExecutiveSummary() {
  const [go, setGo]           = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex">

      <style>{`
        @keyframes slideInLeft {
          from { opacity:0; transform: translateX(-3cqw); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes cardUp {
          from { opacity:0; transform: translateY(2.5cqh) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes growX {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes kenBurns2 {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }
        @keyframes quoteUp {
          from { opacity:0; transform: translateY(2cqh); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes iconFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-3px); }
        }
        @keyframes numGlow {
          0%,100% { opacity:0.25; }
          50%     { opacity:0.55; }
        }
      `}</style>

      {/* Batik texture */}
      <img src={`${base}batik-texture.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.06 }} alt="" aria-hidden="true" />

      {/* Accent bars */}
      <div className="absolute left-0 top-0 bottom-0 w-[0.45cqw] bg-psg-accent z-10" />
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent z-10" />

      {/* ══ LEFT ══ */}
      <div className="relative flex flex-col justify-center pl-[5.5cqw] pr-[4cqw] pt-[8cqh] pb-[6cqh] w-[58%] z-10">

        {/* label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.2cqw', marginBottom: '2.2cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideInLeft 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <div style={{
            width: '0.3cqw', height: '2.2cqh', background: '#D4A017', borderRadius: '99cqw',
            animation: go ? 'growX 0.5s ease 0.15s both' : 'none',
          }} />
          <span style={{
            fontFamily: 'var(--font-body,sans-serif)',
            color: '#D4A017', letterSpacing: '0.32em', textTransform: 'uppercase', fontSize: '0.78cqw',
          }}>
            Ringkasan Eksekutif
          </span>
          <div style={{
            flex: 1, height: '0.08cqh', background: 'rgba(212,160,23,0.25)',
            transformOrigin: 'left',
            animation: go ? 'growX 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }} />
        </div>

        {/* title */}
        <h2 style={{
          fontFamily: 'var(--font-display,serif)', fontWeight: 900,
          fontSize: '5.2cqw', lineHeight: 0.92, letterSpacing: '-0.025em',
          color: 'rgba(255,245,220,0.97)', marginBottom: '3.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideInLeft 0.7s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
        }}>
          Executive<br />
          <span style={{ color: '#D4A017' }}>Summary</span>
        </h2>

        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2cqw' }}>
          {points.map((p, i) => {
            const isH = hovered === i;
            const isD = hovered !== null && !isH;
            return (
              <div
                key={p.no}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', flexDirection: 'column',
                  padding: '1.4cqh 1.4cqw 1.6cqh',
                  background: isH
                    ? 'linear-gradient(160deg, rgba(212,160,23,0.16) 0%, rgba(212,160,23,0.04) 100%)'
                    : 'rgba(212,160,23,0.05)',
                  border: `0.07cqw solid ${isH ? 'rgba(212,160,23,0.5)' : 'rgba(212,160,23,0.15)'}`,
                  borderTop: `0.28cqw solid ${isH ? '#D4A017' : 'rgba(212,160,23,0.45)'}`,
                  borderRadius: '0 0 0.4cqw 0.4cqw',
                  opacity: isD ? 0.38 : 1,
                  transform: isH ? 'translateY(-0.5cqh)' : 'translateY(0)',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default', position: 'relative', overflow: 'hidden',
                  animation: go ? `cardUp 0.6s cubic-bezier(0.22,1,0.36,1) ${0.45 + i * 0.1}s both` : 'none',
                }}
              >
                {/* shimmer sweep on hover */}
                {isH && (
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'linear-gradient(105deg, transparent 40%, rgba(212,160,23,0.08) 50%, transparent 60%)',
                    animation: 'shimmerSweep2 1.8s ease-in-out infinite',
                  }} />
                )}

                {/* header row: icon + number */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1cqh' }}>
                  <div style={{
                    width: '2cqw', height: '2cqw', borderRadius: '50%',
                    border: `0.07cqw solid ${isH ? 'rgba(212,160,23,0.55)' : 'rgba(212,160,23,0.2)'}`,
                    background: isH ? 'rgba(212,160,23,0.15)' : 'rgba(212,160,23,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.35s ease',
                    animation: isH ? 'iconFloat 1.8s ease-in-out infinite' : 'none',
                    flexShrink: 0,
                  }}>
                    <p.Icon
                      size="0.9cqw"
                      color={isH ? '#D4A017' : 'rgba(212,160,23,0.45)'}
                      strokeWidth={1.5}
                      style={{ transition: 'color 0.35s ease' }}
                    />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-display,serif)', fontWeight: 900,
                    fontSize: '1.6cqw', lineHeight: 1, letterSpacing: '0.05em',
                    color: isH ? 'rgba(212,160,23,0.55)' : 'rgba(212,160,23,0.22)',
                    transition: 'color 0.35s ease',
                    animation: 'numGlow 3s ease-in-out infinite',
                  }}>
                    {p.no}
                  </span>
                </div>

                {/* divider */}
                <div style={{
                  height: '0.06cqh',
                  background: isH ? 'rgba(212,160,23,0.3)' : 'rgba(212,160,23,0.1)',
                  marginBottom: '1cqh',
                  transition: 'background 0.35s ease',
                }} />

                {/* text */}
                <p style={{
                  fontFamily: 'var(--font-body,sans-serif)',
                  fontSize: '1.1cqw', lineHeight: 1.6,
                  color: isH ? 'rgba(255,245,220,0.9)' : 'rgba(255,245,220,0.72)',
                  transition: 'color 0.35s ease',
                }}>
                  {p.text}
                </p>

                {/* bottom bar sweep */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.22cqh',
                  background: 'linear-gradient(90deg, transparent, #D4A017, transparent)',
                  transform: isH ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'center',
                  transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ RIGHT: emblem panel ══ */}
      <div className="relative flex-1 overflow-hidden" style={{
        background: 'linear-gradient(150deg, #1e1005 0%, #130B03 55%, #0C0701 100%)',
      }}>
        {/* radial glow behind emblem */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', height: '80%',
          background: 'radial-gradient(circle, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.06) 50%, transparent 75%)',
          pointerEvents: 'none',
          animation: 'numGlow 4s ease-in-out infinite',
        }} />

        {/* Emblem — flexbox centering, no transform conflict */}
        <div style={{
          position: 'absolute',
          top: '6cqh', bottom: '10cqh',
          left: '8%', right: '4%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
          opacity: go ? 1 : 0,
          animation: go ? 'quoteUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both' : 'none',
        }}>
          <img
            src={`${base}pasar-seni-emblem.webp`}
            crossOrigin="anonymous"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 0 2.5cqw rgba(212,160,23,0.55)) drop-shadow(0 0.8cqw 1.8cqw rgba(0,0,0,0.65))',
              animation: 'iconFloat 6s ease-in-out 1.2s infinite',
            }}
            alt="Pasar Seni Garut Emblem"
          />
        </div>

        {/* left seam */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '10cqw',
          background: 'linear-gradient(to right, #120800 0%, transparent 100%)',
          zIndex: 2,
        }} />

        {/* Quote */}
        <div style={{
          position: 'absolute', bottom: '8cqh', left: '3cqw', right: '3cqw',
          opacity: go ? 1 : 0,
          animation: go ? 'quoteUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.9s both' : 'none',
        }}>
          <div style={{
            width: '3cqw', height: '0.1cqh', background: 'rgba(212,160,23,0.5)',
            marginBottom: '1.4cqh',
            transformOrigin: 'left',
            animation: go ? 'growX 0.6s ease 1s both' : 'none',
          }} />
          <p style={{
            fontFamily: 'var(--font-display,serif)', fontStyle: 'italic',
            color: 'rgba(255,245,220,0.9)', fontSize: '1.3cqw', lineHeight: 1.55,
          }}>
            "Pasar bukan sekadar tempat jual beli — ia adalah ruang budaya, identitas, dan kebanggaan komunitas lokal."
          </p>
          <p style={{
            fontFamily: 'var(--font-body,sans-serif)',
            color: 'rgba(212,160,23,0.6)', fontSize: '0.78cqw',
            letterSpacing: '0.15em', marginTop: '1cqh',
          }}>
            — NEMPO GARUT
          </p>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={2} total={38} />
    </div>
  );
}
