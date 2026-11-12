import { useEffect, useRef, useState } from 'react';
import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const hashtags = [
  { tag: '#PasarParaJuara',        featured: true  },
  { tag: '#DariTradisiLahirJuara', featured: false },
  { tag: '#PasarSeniGarut',        featured: false },
  { tag: '#JuaraLocalChampion',     featured: false },
  { tag: '#JuaraDariGarut',        featured: false },
];

const TAGLINE = '"Dari Tradisi Lahir Juara"';

/* floating ghost hashtags in background */
const ghosts = [
  { tag:'#PasarParaJuara',        x:'5%',  y:'18%', dur:'22s', delay:'0s',   size:'2.6cqw', op:0.035 },
  { tag:'#JuaraLocalChampion',     x:'68%', y:'8%',  dur:'27s', delay:'3s',   size:'1.8cqw', op:0.03  },
  { tag:'#JuaraDariGarut',        x:'82%', y:'55%', dur:'19s', delay:'1.5s', size:'2.2cqw', op:0.04  },
  { tag:'#DariTradisiLahirJuara', x:'2%',  y:'68%', dur:'24s', delay:'5s',   size:'1.5cqw', op:0.025 },
  { tag:'#PasarSeniGarut',        x:'48%', y:'82%', dur:'20s', delay:'2s',   size:'2cqw',   op:0.03  },
  { tag:'#PasarParaJuara',        x:'90%', y:'28%', dur:'31s', delay:'7s',   size:'1.6cqw', op:0.025 },
];

/* sparks */
const sparks = [
  { left:'9%',  top:'30%', dur:'3.2s', delay:'0.3s' },
  { left:'32%', top:'12%', dur:'4.0s', delay:'1.1s' },
  { left:'61%', top:'20%', dur:'3.6s', delay:'0.7s' },
  { left:'80%', top:'52%', dur:'3.1s', delay:'1.9s' },
  { left:'46%', top:'78%', dur:'4.3s', delay:'1.4s' },
  { left:'93%', top:'35%', dur:'3.5s', delay:'0.5s' },
  { left:'18%', top:'85%', dur:'2.9s', delay:'2.3s' },
  { left:'74%', top:'70%', dur:'4.1s', delay:'0.9s' },
];

/* orbs */
const orbs = [
  { left:'6%',  top:'14%', r:'24cqw', dur:'18s', delay:'0s'   },
  { left:'78%', top:'68%', r:'20cqw', dur:'14s', delay:'2s'   },
  { left:'52%', top:'52%', r:'11cqw', dur:'11s', delay:'3.5s' },
  { left:'14%', top:'78%', r:'9cqw',  dur:'13s', delay:'1.5s' },
  { left:'87%', top:'9%',  r:'8cqw',  dur:'10s', delay:'4s'   },
];

export default function Slide26TaglineHashtag() {
  const [go,   setGo]   = useState(false);
  const [hov,  setHov]  = useState<number | null>(null);
  const [typed, setTyped] = useState('');
  const [cursorOn, setCursorOn] = useState(true);
  const typingDone = useRef(false);

  /* entrance trigger */
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* typewriter after go */
  useEffect(() => {
    if (!go || typingDone.current) return;
    let i = 0;
    const speed = 52;
    const startDelay = 600;
    const tid = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setTyped(TAGLINE.slice(0, i));
        if (i >= TAGLINE.length) {
          clearInterval(iv);
          typingDone.current = true;
        }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(tid);
  }, [go]);

  /* cursor blink */
  useEffect(() => {
    const iv = setInterval(() => setCursorOn(p => !p), 530);
    return () => clearInterval(iv);
  }, []);

  const typingComplete = typed.length >= TAGLINE.length;

  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col items-center justify-center">
      <style>{`
        /* ── background drift ── */
        @keyframes bgDrift26 {
          0%   { transform:scale(1.08) translate(0px,0px); }
          33%  { transform:scale(1.13) translate(-14px,-9px); }
          66%  { transform:scale(1.10) translate(9px,-15px); }
          100% { transform:scale(1.08) translate(0px,0px); }
        }

        /* ── ghost float ── */
        @keyframes ghostFloat26 {
          0%   { transform:translateY(0px)   rotate(-1deg); opacity:0; }
          8%   { opacity:1; }
          50%  { transform:translateY(-22px) rotate(1deg); }
          92%  { opacity:1; }
          100% { transform:translateY(0px)   rotate(-1deg); opacity:0; }
        }

        /* ── marquee ── */
        @keyframes marquee26 {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }

        /* ── entrance ── */
        @keyframes fadeUp26 {
          from { opacity:0; transform:translateY(3.5cqh) scale(0.96); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes fadeIn26  {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes growX26 {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes chipPop26 {
          0%   { opacity:0; transform:translateY(1.8cqh) scale(0.84); }
          60%  { transform:translateY(-0.4cqh) scale(1.04); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── ambient ── */
        @keyframes orbGlow26 {
          0%,100% { transform:scale(1);    opacity:0.07; }
          50%     { transform:scale(1.28); opacity:0.14; }
        }
        @keyframes spark26 {
          0%   { transform:scale(0) rotate(0deg);    opacity:0; }
          18%  { opacity:0.6; }
          65%  { transform:scale(1.8) rotate(220deg); opacity:0.25; }
          100% { transform:scale(0) rotate(360deg);  opacity:0; }
        }
        @keyframes scan26 {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100cqh); }
        }

        /* ── accent bars ── */
        @keyframes barPulse26 {
          0%,100% { opacity:1; }
          50%     { opacity:0.4; }
        }

        /* ── tagline shimmer (after typing done) ── */
        @keyframes shimmer26 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        .tagline-shimmer26 {
          background: linear-gradient(90deg,
            rgba(245,230,200,0.97) 0%,
            #f5c842 18%, #fffbe8 32%,
            rgba(245,230,200,0.97) 48%,
            #D4A017 64%, #fffbe8 78%,
            rgba(245,230,200,0.97) 100%
          );
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer26 4.5s ease infinite;
        }
        .tagline-plain26 {
          color: rgba(245,230,195,0.95);
        }

        /* ── divider pulse ── */
        @keyframes divPulse26 {
          0%,100% { opacity:1; transform:scaleX(1);    box-shadow:none; }
          50%     { opacity:0.55; transform:scaleX(0.75); box-shadow:0 0 1.8cqw rgba(212,160,23,0.45); }
        }

        /* ── label pulse ── */
        @keyframes labelPulse26 {
          0%,100% { opacity:0.55; letter-spacing:0.35em; }
          50%     { opacity:0.95; letter-spacing:0.43em; }
        }

        /* ── featured chip pulse ── */
        @keyframes featuredPulse26 {
          0%,100% { box-shadow:0 0 0 rgba(212,160,23,0), 0 0 0 0 rgba(212,160,23,0); }
          50%     { box-shadow:0 0 2.5cqw rgba(212,160,23,0.28), 0 0 0 0.25cqw rgba(212,160,23,0.12); }
        }

        /* ── ring ripple on featured ── */
        @keyframes ripple26 {
          0%   { transform:scale(0.88); opacity:0.55; }
          100% { transform:scale(2.0);  opacity:0; }
        }

        /* ── chip shimmer on hover ── */
        @keyframes chipShimmer26 {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }

        /* ── vignette pulse ── */
        @keyframes vignettePulse26 {
          0%,100% { opacity:0.90; }
          50%     { opacity:0.76; }
        }

        /* ── quote marks drift ── */
        @keyframes quoteDrift26 {
          0%,100% { transform:translateY(0px); opacity:0.05; }
          50%     { transform:translateY(-10px); opacity:0.10; }
        }
      `}</style>

      {/* ── Background images ── */}
      <img src={`${base}cover-hero.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity:0.16, animation:'bgDrift26 24s ease-in-out infinite' }}
        alt="" aria-hidden="true" />
      <img src={`${base}wayang-deco.webp`} crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity:0.07, animation:'bgDrift26 30s ease-in-out 5s infinite' }}
        alt="" aria-hidden="true" />

      {/* ── Dark overlay ── */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(22,11,4,0.97) 0%, rgba(22,11,4,0.70) 50%, rgba(22,11,4,0.93) 100%)',
        animation:'vignettePulse26 9s ease-in-out infinite',
      }} />

      {/* ── Marquee band (subtle) ── */}
      <div style={{
        position:'absolute', bottom:'18%', left:0, right:0,
        overflow:'hidden', pointerEvents:'none', zIndex:2,
        opacity:0.04,
      }}>
        <div style={{
          display:'flex', whiteSpace:'nowrap',
          animation:'marquee26 28s linear infinite',
        }}>
          {[...Array(6)].map((_,k) => (
            <span key={k} style={{
              fontFamily:'var(--font-display,serif)', fontWeight:800,
              fontSize:'4cqw', color:'#D4A017',
              letterSpacing:'0.04em', marginRight:'4cqw',
            }}>
              {hashtags.map(h => h.tag).join('  ·  ')}
            </span>
          ))}
        </div>
      </div>

      {/* ── Floating ghost hashtags ── */}
      {ghosts.map((g, i) => (
        <p key={i} style={{
          position:'absolute', left:g.x, top:g.y,
          fontFamily:'var(--font-display,serif)', fontWeight:700,
          fontSize:g.size, color:`rgba(212,160,23,${g.op})`,
          pointerEvents:'none', zIndex:3,
          animation:`ghostFloat26 ${g.dur} ease-in-out ${g.delay} infinite`,
          whiteSpace:'nowrap',
        }}>{g.tag}</p>
      ))}

      {/* ── Ambient orbs ── */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.left, top:o.top,
          width:o.r, height:o.r, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,160,23,1) 0%, transparent 70%)',
          animation:`orbGlow26 ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents:'none', zIndex:1,
        }} />
      ))}

      {/* ── Sparks ── */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position:'absolute', left:s.left, top:s.top,
          width:'0.5cqw', height:'0.5cqw', borderRadius:'50%',
          background:'#D4A017', boxShadow:'0 0 1cqw rgba(212,160,23,0.65)',
          animation:`spark26 ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:'none', zIndex:4,
        }} />
      ))}

      {/* ── Scan line ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:5, overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:0, right:0, height:'0.35cqh',
          background:'linear-gradient(to right, transparent, rgba(212,160,23,0.08) 40%, transparent)',
          animation:'scan26 14s linear infinite',
        }} />
      </div>

      {/* ── Top & bottom accent bars ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'0.55cqh',
        background:'linear-gradient(to right, transparent 0%, #D4A017 25%, #fffbe8 50%, #D4A017 75%, transparent 100%)',
        animation:'barPulse26 4s ease-in-out infinite', zIndex:10,
      }} />
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'0.55cqh',
        background:'linear-gradient(to right, transparent 0%, #D4A017 25%, #fffbe8 50%, #D4A017 75%, transparent 100%)',
        animation:'barPulse26 4s ease-in-out 2s infinite', zIndex:10,
      }} />

      {/* ── Decorative quote marks ── */}
      <p style={{
        position:'absolute', left:'4cqw', top:'10cqh',
        fontFamily:'var(--font-display,serif)', fontWeight:900,
        fontSize:'20cqw', color:'rgba(212,160,23,0.04)',
        lineHeight:1, userSelect:'none', pointerEvents:'none', zIndex:4,
        animation:'quoteDrift26 8s ease-in-out infinite',
      }}>"</p>
      <p style={{
        position:'absolute', right:'4cqw', bottom:'10cqh',
        fontFamily:'var(--font-display,serif)', fontWeight:900,
        fontSize:'20cqw', color:'rgba(212,160,23,0.04)',
        lineHeight:1, userSelect:'none', pointerEvents:'none', zIndex:4,
        animation:'quoteDrift26 8s ease-in-out 4s infinite',
        transform:'rotate(180deg)',
      }}>"</p>

      {/* ════════════════════════════════════
          CONTENT
      ════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center text-center px-[10cqw]">

        {/* Section label */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
          letterSpacing:'0.38em', fontSize:'0.95cqw',
          marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn26 0.6s ease 0.1s both, labelPulse26 4.5s ease-in-out 1s infinite' : 'none',
        }}>Tagline Resmi</p>

        {/* Flanking lines + TYPEWRITER tagline */}
        <div style={{
          display:'flex', alignItems:'center', gap:'2.5cqw', marginBottom:'2cqh', width:'100%',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeUp26 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
        }}>
          <div style={{
            flex:1, height:'0.12cqh',
            background:'linear-gradient(to left, rgba(212,160,23,0.45), transparent)',
            transformOrigin:'right',
            animation: go ? 'growX26 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }} />

          {/* Typewriter text */}
          <h2 style={{
            fontFamily:'var(--font-display,serif)', fontWeight:900,
            fontSize:'5.5cqw', lineHeight:1.1, letterSpacing:'-0.01em',
            whiteSpace:'nowrap', flexShrink:0, minWidth:'38cqw', textAlign:'center',
          }}>
            <span className={typingComplete ? 'tagline-shimmer26' : 'tagline-plain26'}>
              {typed}
            </span>
            {/* cursor */}
            <span style={{
              display:'inline-block', width:'0.12em', marginLeft:'0.06em',
              background: typingComplete ? '#D4A017' : 'rgba(245,230,195,0.9)',
              height:'0.85em', verticalAlign:'middle', borderRadius:'0.04em',
              opacity: cursorOn ? (typingComplete ? 0 : 1) : 0,
              transition:'opacity 0.08s',
              boxShadow: cursorOn ? '0 0 0.8cqw rgba(212,160,23,0.6)' : 'none',
            }} />
          </h2>

          <div style={{
            flex:1, height:'0.12cqh',
            background:'linear-gradient(to right, rgba(212,160,23,0.45), transparent)',
            transformOrigin:'left',
            animation: go ? 'growX26 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s both' : 'none',
          }} />
        </div>

        {/* Gold divider bar */}
        <div style={{
          width:'6cqw', height:'0.3cqh', background:'#D4A017',
          marginBottom:'4.5cqh',
          opacity: go ? 1 : 0,
          animation: go
            ? 'growX26 0.7s cubic-bezier(0.22,1,0.36,1) 0.6s both, divPulse26 3.8s ease-in-out 1.4s infinite'
            : 'none',
        }} />

        {/* Hashtag section label */}
        <p style={{
          fontFamily:'var(--font-body,sans-serif)',
          color:'rgba(212,160,23,0.65)', textTransform:'uppercase',
          letterSpacing:'0.38em', fontSize:'0.95cqw',
          marginBottom:'2.5cqh',
          opacity: go ? 1 : 0,
          animation: go ? 'fadeIn26 0.6s ease 0.6s both, labelPulse26 4.5s ease-in-out 2.5s infinite' : 'none',
        }}>Hashtag Resmi</p>

        {/* Hashtag chips */}
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', gap:'1cqw 2cqw' }}>
          {hashtags.map((h, i) => {
            const isH   = hov === i;
            const isDim = hov !== null && !isH;
            const isFeat = h.featured;
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  padding:`${isFeat ? '1cqh' : '0.7cqh'} ${isFeat ? '2.4cqw' : '2cqw'}`,
                  background: isH
                    ? 'linear-gradient(90deg, rgba(212,160,23,0.35) 0%, rgba(212,160,23,0.18) 100%)'
                    : isFeat
                      ? 'linear-gradient(90deg, rgba(212,160,23,0.22) 0%, rgba(212,160,23,0.10) 100%)'
                      : 'rgba(255,255,255,0.05)',
                  border: `0.07cqw solid ${isH
                    ? 'rgba(212,160,23,0.90)'
                    : isFeat ? 'rgba(212,160,23,0.60)' : 'rgba(255,255,255,0.11)'}`,
                  borderRadius:'0.4cqw',
                  opacity: isDim ? 0.22 : 1,
                  transform: isH ? 'translateY(-0.6cqh) scale(1.06)' : 'scale(1)',
                  transition:'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                  cursor:'default', position:'relative', overflow:'visible',
                  boxShadow: isH
                    ? '0 1cqh 2.5cqw rgba(212,160,23,0.32)'
                    : isFeat && !isDim ? '0 0 1.8cqw rgba(212,160,23,0.18)' : 'none',
                  animation: go
                    ? `chipPop26 0.55s cubic-bezier(0.22,1,0.36,1) ${0.7 + i * 0.1}s both${isFeat && !isH && !isDim ? ', featuredPulse26 4s ease-in-out 2s infinite' : ''}`
                    : 'none',
                }}
              >
                {/* Ring ripple on featured chip */}
                {isFeat && !isH && (
                  <>
                    <div style={{
                      position:'absolute', inset:'-0.4cqh -0.4cqw',
                      borderRadius:'0.7cqw',
                      border:'0.08cqw solid rgba(212,160,23,0.40)',
                      animation:'ripple26 2.8s ease-out 2s infinite',
                      pointerEvents:'none',
                    }} />
                    <div style={{
                      position:'absolute', inset:'-0.4cqh -0.4cqw',
                      borderRadius:'0.7cqw',
                      border:'0.08cqw solid rgba(212,160,23,0.30)',
                      animation:'ripple26 2.8s ease-out 3.4s infinite',
                      pointerEvents:'none',
                    }} />
                  </>
                )}

                {/* Shimmer sweep on hover */}
                {isH && (
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    borderRadius:'0.35cqw',
                    background:'linear-gradient(110deg, transparent 28%, rgba(212,160,23,0.15) 50%, transparent 72%)',
                    animation:'chipShimmer26 1.5s ease-in-out infinite',
                  }} />
                )}

                <p style={{
                  position:'relative',
                  fontFamily:'var(--font-display,serif)', fontWeight:600,
                  fontSize: isFeat ? '1.9cqw' : '1.45cqw',
                  color: isH
                    ? '#f5c842'
                    : isFeat ? 'rgba(212,160,23,0.97)' : 'rgba(255,235,180,0.60)',
                  letterSpacing:'0.02em',
                  transition:'color 0.28s ease',
                  textShadow: isH ? '0 0 1.5cqw rgba(212,160,23,0.45)' : 'none',
                }}>{h.tag}</p>
              </div>
            );
          })}
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={26} total={38} />
    </div>
  );
}
