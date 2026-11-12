interface SlideFooterProps {
  slide: number;
  total?: number;
}

export default function SlideFooter({ slide, total = 38 }: SlideFooterProps) {
  const num = String(slide).padStart(2, '0');
  const tot = String(total).padStart(2, '0');
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50 flex items-center justify-between px-[3cqw] py-[1.2cqh]"
      style={{
        borderTop: '0.05cqw solid rgba(212,160,23,0.35)',
        background: 'rgba(26,13,6,0.65)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Left: branding */}
      <p className="font-psg-body text-psg-text/45" style={{ fontSize: '1cqw', letterSpacing: '0.08em' }}>
        Nempo Garut
      </p>

      {/* Center: thin gold line */}
      <div className="flex-1 mx-[2cqw] h-[0.05cqh]" style={{ background: 'rgba(212,160,23,0.2)' }} />

      {/* Right: slide counter */}
      <p className="font-psg-body text-psg-text/40" style={{ fontSize: '1.05cqw', letterSpacing: '0.08em' }}>
        <span className="text-psg-accent/70 font-semibold">{num}</span>
        <span className="mx-[0.3cqw]">/</span>
        {tot}
      </p>
    </div>
  );
}
