export default function SlideHeader() {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-[3cqw] py-[1.2cqh]"
      style={{
        borderBottom: '0.05cqw solid rgba(212,160,23,0.25)',
        background: 'rgba(26,13,6,0.55)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Left: taglines */}
      <div className="flex flex-col gap-[0.1cqh]">
        <p className="font-psg-body text-psg-text/50 uppercase tracking-[0.22em]" style={{ fontSize: '0.75cqw' }}>
          Juara dari Pasar Rakyat
        </p>
        <p className="font-psg-display italic text-psg-text/35" style={{ fontSize: '0.8cqw' }}>
          Dari Tradisi Lahir Juara
        </p>
      </div>

      {/* Center: thin gold line */}
      <div className="flex-1 mx-[2cqw] h-[0.05cqh]" style={{ background: 'rgba(212,160,23,0.2)' }} />

      {/* Right: branding */}
      <p className="font-psg-body text-psg-accent/60" style={{ fontSize: '1cqw', letterSpacing: '0.08em' }}>
        Juara <span className="text-psg-text/30 mx-[0.2cqw]">×</span> Nempo Garut
      </p>
    </div>
  );
}
