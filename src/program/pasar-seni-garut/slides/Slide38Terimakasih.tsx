import { useEffect, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const sparks = [
  { left:'8%',  top:'20%', dur:'3.4s', delay:'0.3s' },
  { left:'22%', top:'55%', dur:'4.1s', delay:'1.0s' },
  { left:'48%', top:'10%', dur:'3.7s', delay:'0.6s' },
  { left:'15%', top:'80%', dur:'2.9s', delay:'1.7s' },
  { left:'38%', top:'72%', dur:'4.0s', delay:'0.1s' },
  { left:'55%', top:'88%', dur:'3.2s', delay:'2.2s' },
  { left:'5%',  top:'42%', dur:'3.6s', delay:'0.8s' },
  { left:'30%', top:'30%', dur:'2.8s', delay:'1.4s' },
];

export default function Slide38Terimakasih() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0c0804] flex">
      <style>{`
        @keyframes gradShift38 {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .ty-gradient {
          background: linear-gradient(90deg,
            #fffbe8 0%, #D4A017 18%, #f5c842 33%,
            #fff8dc 50%, #c8860a 65%, #f0b429 80%, #fffbe8 100%
          );
          background-size: 260% 260%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift38 4.5s ease infinite;
        }
        @keyframes spark38 {
          0%   { transform:scale(0) rotate(0deg);   opacity:0; }
          20%  { opacity:0.6; }
          60%  { transform:scale(1.4) rotate(180deg); opacity:0.35; }
          100% { transform:scale(0) rotate(360deg); opacity:0; }
        }
        @keyframes fadeUp38 {
          from { opacity:0; transform:translateY(2cqh); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes popIn38 {
          from { opacity:0; transform:scale(0.9); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes photoIn38 {
          from { opacity:0; transform:translateX(4cqw) scale(0.97); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }
        @keyframes photoFloat38 {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-7px); }
        }
        @keyframes linePulse38 {
          0%,100% { opacity:1; }
          50%     { opacity:0.35; }
        }
        @keyframes glowPulse38 {
          0%,100% { opacity:0.15; }
          50%     { opacity:0.28; }
        }
        @keyframes scan38 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }
        @keyframes growX38 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
      `}</style>

      {/* Background radial warm glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 60%, rgba(70,35,5,0.55) 0%, rgba(12,8,4,1) 65%)',
      }} />

      {/* Right-side photo glow */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '50cqw',
        background: 'radial-gradient(ellipse at 70% 80%, rgba(212,160,23,0.14) 0%, transparent 65%)',
        animation: 'glowPulse38 5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Scan line */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.3cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.06) 40%, transparent)',
          animation:'scan38 14s linear infinite',
        }} />
      </div>

      {/* Top accent bar */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.4cqh',
        background:'linear-gradient(to right, transparent, rgba(212,160,23,0.5) 30%, rgba(212,160,23,0.5) 70%, transparent)',
        zIndex:10,
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp38 0.6s ease 0.1s both' : 'none',
      }} />

      {/* Sparks */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.38cqw', height:'0.38cqw', borderRadius:'50%',
          background:'#D4A017',
          boxShadow:'0 0 0.5cqw rgba(212,160,23,0.55)',
          animation:`spark38 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:2,
        }} />
      ))}

      {/* ── LEFT: Text panel ── */}
      <div style={{
        position:'relative', zIndex:10,
        width:'52%', height:'100%',
        display:'flex', flexDirection:'column',
        justifyContent:'center',
        paddingLeft:'7cqw', paddingRight:'3cqw',
        paddingBottom:'6cqh',
      }}>

        {/* Badge */}
        <div style={{
          display:'inline-flex', alignSelf:'flex-start',
          padding:'0.55cqh 1.6cqw',
          border:'0.07cqw solid rgba(212,160,23,0.5)',
          borderRadius:'0.2cqw',
          marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp38 0.55s ease 0.15s both' : 'none',
        }}>
          <span style={{
            fontFamily:'var(--font-body,sans-serif)',
            color:'rgba(212,160,23,0.82)', letterSpacing:'0.35em',
            textTransform:'uppercase', fontSize:'0.9cqw', fontWeight:600,
          }}>
            Proposal Kolaborasi · Pasar Seni Garut 2026
          </span>
        </div>

        {/* Title */}
        <h1 className="ty-gradient" style={{
          fontFamily:'var(--font-display,serif)', fontWeight:900,
          fontSize:'7.8cqw', lineHeight:0.88,
          letterSpacing:'-0.02em',
          marginBottom:'1.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'popIn38 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both' : 'none',
        }}>
          Terima<br />Kasih
        </h1>

        {/* Italic sub */}
        <p style={{
          fontFamily:'var(--font-display,serif)', fontStyle:'italic',
          color:'#D4A017', fontSize:'1.85cqw',
          marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp38 0.6s ease 0.4s both' : 'none',
        }}>
          Dari Juara Untuk Para Juara
        </p>

        {/* Gold rule */}
        <div style={{
          width:'6cqw', height:'0.18cqh', background:'#D4A017',
          marginBottom:'2.5cqh', transformOrigin:'left',
          opacity: go ? 1 : 0,
          animation: go ? 'growX38 0.7s cubic-bezier(0.22,1,0.36,1) 0.48s both, linePulse38 3s ease-in-out 1.5s infinite' : 'none',
        }} />

        {/* Body */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(245,230,200,0.62)', fontSize:'1.2cqw',
          lineHeight:1.75, maxWidth:'36cqw',
          marginBottom:'2.8cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp38 0.65s ease 0.55s both' : 'none',
        }}>
          Pasar Seni Garut hadir sebagai ruang kolaborasi antara budaya, UMKM, komunitas, dan generasi kreatif untuk menciptakan dampak ekonomi serta kebanggaan lokal yang berkelanjutan.
        </p>

        {/* Closing */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(245,230,200,0.35)', fontSize:'1.05cqw',
          letterSpacing:'0.06em',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp38 0.6s ease 0.7s both' : 'none',
        }}>
          Sampai bertemu di Pasar Seni Garut 2026
        </p>
      </div>

      {/* Vertical divider */}
      <div style={{
        position:'absolute', left:'52%', top:'10cqh', bottom:'10cqh',
        width:'0.05cqw',
        background:'linear-gradient(to bottom, transparent, rgba(212,160,23,0.25) 30%, rgba(212,160,23,0.25) 70%, transparent)',
        zIndex:8,
        opacity: go ? 1 : 0,
        animation: go ? 'fadeUp38 1s ease 0.5s both' : 'none',
      }} />

      {/* ── RIGHT: Photo ── */}
      <div style={{
        position:'relative', zIndex:6,
        width:'48%', height:'100%',
        display:'flex', alignItems:'flex-end', justifyContent:'center',
        paddingBottom:0,
        overflow:'hidden',
      }}>
        {/* Ambient glow behind photo */}
        <div style={{
          position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
          width:'80%', height:'60%',
          background:'radial-gradient(ellipse at 50% 100%, rgba(212,160,23,0.18) 0%, transparent 70%)',
          pointerEvents:'none',
        }} />

        <img
          src={`${base}thankyou-duo.webp`}
          style={{
            height:'88cqh', width:'auto',
            display:'block',
            objectFit:'contain',
            filter:'drop-shadow(0 0 2.5cqw rgba(212,160,23,0.35))',
            opacity: go ? 1 : 0,
            animation: go
              ? 'photoIn38 1.0s cubic-bezier(0.22,1,0.36,1) 0.3s both, photoFloat38 9s ease-in-out 1.5s infinite'
              : 'none',
          }}
          alt="Terima Kasih"
        />

        {/* Fade bottom edge */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:'18%',
          background:'linear-gradient(to top, rgba(12,8,4,1) 0%, transparent 100%)',
          pointerEvents:'none',
        }} />
      </div>

      <SlideHeader />
      <SlideFooter slide={38} />
    </div>
  );
}
