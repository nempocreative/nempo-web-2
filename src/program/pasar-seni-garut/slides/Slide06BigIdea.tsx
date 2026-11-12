import { useEffect, useState } from 'react';
import { Fence, Lamp, Trees, PenTool, Crown } from 'lucide-react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const tags = [
  { label: 'Gerbang Bambu',    Icon: Fence },
  { label: 'Lampu Gantung',    Icon: Lamp },
  { label: 'Lapak Bambu',      Icon: Trees },
  { label: 'Signage Lukisan',  Icon: PenTool },
  { label: 'Dekorasi Heritage',Icon: Crown },
];

const descWords = [
  'Mengajak','masyarakat','kembali','merasakan','suasana','pasar',
  'rakyat','tempo','dulu','—','penuh','kehangatan,','kebersamaan,',
  'dan','interaksi','sosial','—','dikemas','modern','untuk','generasi','masa','kini.',
];

export default function Slide06BigIdea() {
  const [go, setGo]           = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg">

      <style>{`
        @keyframes kenBurns6 {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
        @keyframes fadeIn6   { from{opacity:0}  to{opacity:1} }
        @keyframes slideUp6  {
          from { opacity:0; transform:translateY(2.5cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideLeft6 {
          from { opacity:0; transform:translateX(-2cqw); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes growX6 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes wordDrop {
          from { opacity:0; transform:translateY(1.2cqh) skewY(1.5deg); }
          to   { opacity:1; transform:translateY(0) skewY(0deg); }
        }
        @keyframes tagPop {
          from { opacity:0; transform:scale(0.88) translateY(1.5cqh); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes goldShimmer6 {
          0%   { background-position:0% 50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }
        @keyframes floatPart {
          0%   { transform:translateY(0); opacity:0; }
          15%  { opacity:0.5; }
          85%  { opacity:0.15; }
          100% { transform:translateY(-28cqh); opacity:0; }
        }
        @keyframes orbPulse {
          0%,100% { opacity:0.18; transform:scale(1); }
          50%     { opacity:0.32; transform:scale(1.12); }
        }
        @keyframes tagIconSpin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }

        .shimmer-title {
          background: linear-gradient(90deg,
            #c8860a 0%, #f5c842 18%, #fffbe8 36%, #D4A017 55%, #f0b429 72%, #c8860a 100%
          );
          background-size:260% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: goldShimmer6 3.5s ease infinite;
        }
      `}</style>

      {/* ── Background photo — Ken Burns ── */}
      <img
        src={`${base}nostalgia-moodboard.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: 'kenBurns6 16s ease-out forwards' }}
        alt="Nostalgia Pasar Rakyat"
      />
      <img
        src={`${base}wayang-deco.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.15, animation: 'fadeIn6 2s ease 0.5s both' }}
        alt="" aria-hidden="true"
      />

      {/* gradient overlay — heavier on left */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(110deg, rgba(12,5,2,0.96) 0%, rgba(12,5,2,0.82) 45%, rgba(12,5,2,0.35) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(12,5,2,0.8) 0%, transparent 40%)',
      }} />

      {/* orb glow behind title */}
      <div style={{
        position:'absolute', left:'2cqw', top:'15%',
        width:'45cqw', height:'70%',
        background:'radial-gradient(ellipse at 20% 50%, rgba(212,160,23,0.14) 0%, transparent 65%)',
        animation:'orbPulse 5s ease-in-out infinite',
        pointerEvents:'none',
      }} />

      {/* floating particles */}
      {[
        {left:'8%',  bottom:'12%', delay:'0s',   dur:'7s'},
        {left:'18%', bottom:'20%', delay:'1.8s', dur:'6s'},
        {left:'32%', bottom:'15%', delay:'3.5s', dur:'8s'},
        {left:'45%', bottom:'10%', delay:'0.9s', dur:'6.5s'},
        {left:'55%', bottom:'18%', delay:'2.6s', dur:'7.5s'},
      ].map((p,i) => (
        <div key={i} style={{
          position:'absolute', width:'0.28cqw', height:'0.28cqw',
          borderRadius:'50%', background:'#D4A017',
          left:p.left, bottom:p.bottom,
          animation:`floatPart ${p.dur} ease-in-out ${p.delay} infinite`,
          pointerEvents:'none',
        }} />
      ))}

      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent z-10" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col justify-center h-full px-[6cqw] pt-[7.5cqh] pb-[7cqh]" style={{ maxWidth:'68cqw' }}>

        {/* BIG IDEA pill */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1.5cqw', marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'slideLeft6 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          <div style={{
            padding:'0.55cqh 1.4cqw', background:'#D4A017', flexShrink:0,
          }}>
            <span style={{
              fontFamily:'var(--font-body,sans-serif)', fontWeight:700,
              color:'#120800', textTransform:'uppercase', letterSpacing:'0.3em',
              fontSize:'0.85cqw',
            }}>Big Idea</span>
          </div>
          <div style={{
            flex:1, height:'0.08cqh', background:'rgba(212,160,23,0.4)',
            transformOrigin:'left',
            animation: go ? 'growX6 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both' : 'none',
          }} />
        </div>

        {/* Title line 1: Nostalgia */}
        <div style={{ overflow:'hidden', marginBottom:'0.3cqh' }}>
          <h2 style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'7.2cqw', lineHeight:0.92, letterSpacing:'-0.025em',
            color:'rgba(255,245,220,0.97)',
            opacity: go ? 1 : 0,
            animation: go ? 'slideUp6 0.75s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }}>
            Nostalgia
          </h2>
        </div>

        {/* Title line 2: Pasar Rakyat — shimmer */}
        <div style={{ overflow:'hidden', marginBottom:'3cqh' }}>
          <h2 className="shimmer-title" style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'7.2cqw', lineHeight:0.92, letterSpacing:'-0.025em',
            opacity: go ? 1 : 0,
            animation: go ? 'slideUp6 0.75s cubic-bezier(0.22,1,0.36,1) 0.44s both, goldShimmer6 3.5s ease infinite' : 'none',
          }}>
            Pasar Rakyat
          </h2>
        </div>

        {/* gold rule */}
        <div style={{
          width:'5cqw', height:'0.25cqh',
          background:'linear-gradient(90deg, #D4A017, transparent)',
          transformOrigin:'left', marginBottom:'2.5cqh',
          animation: go ? 'growX6 0.7s cubic-bezier(0.22,1,0.36,1) 0.7s both' : 'none',
        }} />

        {/* Description — word by word */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          fontSize:'1.65cqw', lineHeight:1.65,
          color:'rgba(255,245,220,0.82)',
          maxWidth:'52cqw', marginBottom:'3.5cqh',
        }}>
          {descWords.map((w, i) => (
            <span key={i} style={{
              display:'inline-block', marginRight:'0.3em',
              opacity: go ? 1 : 0,
              animation: go ? `wordDrop 0.45s cubic-bezier(0.22,1,0.36,1) ${0.75 + i * 0.04}s both` : 'none',
            }}>{w}</span>
          ))}
        </p>

        {/* Tag chips with Lucide icons */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'1cqw' }}>
          {tags.map((tag, i) => {
            const isH = hovered === i;
            return (
              <div
                key={tag.label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display:'flex', alignItems:'center', gap:'0.55cqw',
                  padding:'0.65cqh 1.3cqw',
                  border:`0.07cqw solid ${isH ? 'rgba(212,160,23,0.65)' : 'rgba(212,160,23,0.35)'}`,
                  borderRadius:'0.3cqw',
                  background: isH ? 'rgba(212,160,23,0.14)' : 'rgba(212,160,23,0.06)',
                  transform: isH ? 'translateY(-0.4cqh)' : 'translateY(0)',
                  transition:'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default',
                  opacity: go ? 1 : 0,
                  animation: go ? `tagPop 0.55s cubic-bezier(0.22,1,0.36,1) ${1.8 + i * 0.1}s both` : 'none',
                  boxShadow: isH ? '0 0.5cqh 1.5cqh rgba(212,160,23,0.2)' : 'none',
                }}
              >
                <tag.Icon
                  size="1.05cqw"
                  color={isH ? '#D4A017' : 'rgba(212,160,23,0.5)'}
                  strokeWidth={1.5}
                  style={{
                    transition:'color 0.3s ease',
                    animation: isH ? 'tagIconSpin 4s linear infinite' : 'none',
                  }}
                />
                <span style={{
                  fontFamily:'var(--font-body,sans-serif)',
                  fontSize:'1.15cqw',
                  color: isH ? 'rgba(255,245,220,0.95)' : 'rgba(255,245,220,0.72)',
                  transition:'color 0.3s ease',
                  letterSpacing:'0.03em',
                }}>
                  {tag.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={6} />
    </div>
  );
}
