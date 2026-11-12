import { useState, useEffect } from 'react';
import { Store, TrendingUp, Users, Sparkles } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

/* ── Lucide icon inside animated decorative ring ── */
type IconBoxProps = {
  icon: React.ReactNode;
  animClass: string;
  glowDelay?: string;
};
const IconBox = ({ icon, animClass, glowDelay = '0s' }: IconBoxProps) => (
  <div className={animClass} style={{ position: 'relative', width: '3.8cqw', height: '3.8cqw' }}>
    {/* outer dashed ring */}
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '50%',
      border: '0.07cqw dashed rgba(212,160,23,0.35)',
    }} />
    {/* inner filled circle */}
    <div style={{
      position: 'absolute', inset: '0.4cqw', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.05) 100%)',
      border: '0.06cqw solid rgba(212,160,23,0.4)',
    }} />
    {/* pulsing glow ring */}
    <div style={{
      position: 'absolute', inset: '-0.2cqw', borderRadius: '50%',
      border: '0.1cqw solid rgba(212,160,23,0.2)',
      animation: `iconGlow 2.5s ease-in-out ${glowDelay} infinite`,
    }} />
    {/* lucide icon centered */}
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {icon}
    </div>
  </div>
);

const reasons = [
  {
    no: '01',
    Icon: () => (
      <IconBox animClass="icon-bob" glowDelay="0s" icon={
        <Store size="1.5cqw" color="#D4A017" strokeWidth={1.5} />
      } />
    ),
    headline: 'Kekuatan UMKM|Lokal',
    body: 'Garut memiliki kekuatan besar di sektor UMKM, kuliner, seni budaya & ekonomi kreatif yang terus berkembang pesat.',
    stat: '2.000+',
    statLabel: 'pelaku UMKM',
    delay: 0,
  },
  {
    no: '02',
    Icon: () => (
      <IconBox animClass="icon-ping" glowDelay="0.6s" icon={
        <TrendingUp size="1.5cqw" color="#D4A017" strokeWidth={1.5} />
      } />
    ),
    headline: 'Pertumbuhan Pelaku|Usaha',
    body: 'Ribuan pelaku usaha lokal terus tumbuh dan menggerakkan roda ekonomi daerah setiap tahunnya.',
    stat: '12%',
    statLabel: 'pertumbuhan/tahun',
    delay: 0.12,
  },
  {
    no: '03',
    Icon: () => (
      <IconBox animClass="icon-bounce" glowDelay="1.2s" icon={
        <Users size="1.5cqw" color="#D4A017" strokeWidth={1.5} />
      } />
    ),
    headline: 'Ruang Publik|Terpadu',
    body: 'Masyarakat membutuhkan ruang yang menyatukan belanja, hiburan, dan interaksi sosial dalam satu wadah.',
    stat: '50rb+',
    statLabel: 'target pengunjung',
    delay: 0.24,
  },
  {
    no: '04',
    Icon: () => (
      <IconBox animClass="icon-spin" glowDelay="1.8s" icon={
        <Sparkles size="1.5cqw" color="#D4A017" strokeWidth={1.5} />
      } />
    ),
    headline: 'Peluang Festival|Autentik',
    body: 'Peluang besar untuk festival yang menggabungkan budaya asli, nostalgia tempo dulu & komunitas kreatif.',
    stat: '3 Hari',
    statLabel: 'festival penuh',
    delay: 0.36,
  },
];

/* floating particle */
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="particle" style={{ position: 'absolute', width: '0.3cqw', height: '0.3cqw', borderRadius: '50%', background: '#D4A017', pointerEvents: 'none', ...style }} />
);

export default function Slide03MengapaPasarSeni() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(4cqh) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes iconSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes iconBob {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes iconPing {
          0%, 100% { transform: scale(1); }
          45%      { transform: scale(1.2); }
          55%      { transform: scale(0.9); }
        }
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30%      { transform: translateY(-6px) rotate(-8deg); }
          60%      { transform: translateY(-2px) rotate(5deg); }
        }
        @keyframes shimmerSweep {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }
        @keyframes numPulse {
          0%, 100% { opacity: 0.13; }
          50%      { opacity: 0.28; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0px); opacity: 0; }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.2; }
          100% { transform: translateY(-30cqh); opacity: 0; }
        }
        @keyframes statCount {
          from { opacity: 0; transform: translateY(1cqh); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 0px 0px rgba(212,160,23,0); }
          50%      { box-shadow: 0 0 18px 2px rgba(212,160,23,0.25); }
        }
        @keyframes iconGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%      { opacity: 0.7; transform: scale(1.12); }
        }

        .icon-spin  { animation: iconSpin   9s linear infinite; }
        .icon-bob   { animation: iconBob    2.4s ease-in-out infinite; }
        .icon-ping  { animation: iconPing   2s ease-in-out infinite; }
        .icon-bounce{ animation: iconBounce 2.8s ease-in-out infinite; }

        .particle   { animation: floatUp 6s ease-in-out infinite; }
        .num-pulse  { animation: numPulse 3s ease-in-out infinite; }
      `}</style>

      {/* Background */}
      <img src={`${base}nostalgia-moodboard.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 40%' }} alt="" aria-hidden="true" />
      <div className="absolute inset-0" style={{ background: 'rgba(10,5,2,0.84)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,5,2,0.98) 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,5,2,0.82) 0%, transparent 35%)' }} />

      {/* Floating particles */}
      {[
        { left: '12%', bottom: '18%', animationDelay: '0s',   animationDuration: '6s' },
        { left: '28%', bottom: '25%', animationDelay: '1.5s', animationDuration: '7s' },
        { left: '48%', bottom: '20%', animationDelay: '3s',   animationDuration: '5.5s' },
        { left: '67%', bottom: '22%', animationDelay: '0.8s', animationDuration: '6.5s' },
        { left: '83%', bottom: '18%', animationDelay: '2.2s', animationDuration: '7.5s' },
      ].map((p, i) => <Particle key={i} style={p} />)}

      {/* Accent bars */}
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-[0.45cqw] bg-psg-accent z-10" />

      {/* ── Header ── */}
      <div className="relative z-10 flex flex-col items-center pt-[9cqh] pb-[3cqh] px-[8cqw] text-center">
        <div className="flex items-center gap-[1.5cqw] mb-[1.8cqh] w-full max-w-[60cqw]">
          <div className="flex-1 h-[0.08cqh] bg-psg-accent/25" />
          <span className="font-psg-body text-psg-accent tracking-[0.32em] uppercase flex-shrink-0" style={{ fontSize: '0.78cqw' }}>
            Latar Belakang
          </span>
          <div className="flex-1 h-[0.08cqh] bg-psg-accent/25" />
        </div>
        <h2 className="font-psg-display font-black text-psg-text"
          style={{ fontSize: '4.6cqw', lineHeight: 0.92, letterSpacing: '-0.025em' }}>
          Mengapa <span className="text-psg-accent">Pasar Seni</span> Garut?
        </h2>
      </div>

      {/* ── Cards ── */}
      <div className="relative z-10 flex flex-1 gap-[1.2cqw] px-[4cqw] pb-[7.5cqh]">
        {reasons.map((r, i) => {
          const isHovered = hovered === i;
          const isDimmed  = hovered !== null && !isHovered;

          return (
            <div
              key={r.no}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex flex-col flex-1 px-[1.8cqw] pt-[2cqh] pb-[2.5cqh] cursor-default overflow-hidden"
              style={{
                background: isHovered
                  ? 'linear-gradient(160deg, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.04) 100%)'
                  : 'rgba(255,255,255,0.035)',
                border: `0.07cqw solid ${isHovered ? 'rgba(212,160,23,0.55)' : 'rgba(255,255,255,0.08)'}`,
                borderTop: `0.28cqw solid ${isHovered ? '#D4A017' : 'rgba(212,160,23,0.3)'}`,
                borderRadius: '0 0 0.5cqw 0.5cqw',
                opacity: isDimmed ? 0.38 : 1,
                transform: isHovered ? 'translateY(-1cqh) scale(1.02)' : 'translateY(0) scale(1)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                animation: mounted ? `cardIn 0.7s cubic-bezier(0.22,1,0.36,1) ${r.delay}s both, ${isHovered ? 'borderGlow 1.5s ease-in-out infinite' : 'none'}` : 'none',
              }}
            >
              {/* Shimmer sweep on hover */}
              {isHovered && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: 'inherit' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(212,160,23,0.12) 50%, transparent 100%)',
                    animation: 'shimmerSweep 1.6s ease-in-out infinite',
                  }} />
                </div>
              )}

              {/* Radial glow */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.14) 0%, transparent 65%)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }} />

              {/* Ghost number */}
              <span className="num-pulse font-psg-display font-black absolute top-[1cqh] right-[1cqw]"
                style={{
                  fontSize: '5cqw', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                  color: isHovered ? 'rgba(212,160,23,0.32)' : 'rgba(212,160,23,0.13)',
                  transition: 'color 0.4s ease', letterSpacing: '-0.03em',
                  animationDuration: `${2.5 + i * 0.4}s`,
                }}>
                {r.no}
              </span>

              {/* Icon */}
              <div style={{ marginBottom: '1.8cqh', opacity: isHovered ? 1 : 0.7, transition: 'opacity 0.4s ease' }}>
                <r.Icon />
              </div>

              {/* Headline */}
              <p className="font-psg-display font-bold" style={{
                fontSize: '1.55cqw', lineHeight: 1.2, marginBottom: '1.1cqh',
                color: isHovered ? '#D4A017' : 'rgba(255,235,180,0.88)',
                transition: 'color 0.4s ease',
              }}>
                {r.headline.split('|').map((part, i, arr) => (
                  <span key={i}>{part}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>

              {/* Body */}
              <p className="font-psg-body" style={{
                fontSize: '1.15cqw', lineHeight: 1.65, marginBottom: '2.2cqh',
                color: isHovered ? 'rgba(255,235,180,0.72)' : 'rgba(255,235,180,0.45)',
                transition: 'color 0.4s ease',
              }}>
                {r.body}
              </p>

              {/* Stat chip — pinned to bottom */}
              <div className="mt-auto flex items-end gap-[0.6cqw]">
                <span className="font-psg-display font-black" style={{
                  fontSize: '2.2cqw', lineHeight: 1,
                  color: isHovered ? '#D4A017' : 'rgba(212,160,23,0.55)',
                  transition: 'color 0.4s ease',
                  animation: mounted ? `statCount 0.6s cubic-bezier(0.22,1,0.36,1) ${r.delay + 0.35}s both` : 'none',
                }}>
                  {r.stat}
                </span>
                <span className="font-psg-body" style={{
                  fontSize: '0.78cqw', lineHeight: 1.4, paddingBottom: '0.4cqh',
                  color: isHovered ? 'rgba(212,160,23,0.7)' : 'rgba(212,160,23,0.35)',
                  transition: 'color 0.4s ease',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  {r.statLabel}
                </span>
              </div>

              {/* Bottom sweep bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.3cqh',
                background: 'linear-gradient(90deg, transparent, #D4A017, transparent)',
                transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'center',
                transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
              }} />
            </div>
          );
        })}
      </div>

      <SlideHeader />
      <SlideFooter slide={3} total={38} />
    </div>
  );
}
