import SlideFooter from '../components/SlideFooter';
import SlideHeader from '../components/SlideHeader';

const base = '/media/pasar-seni-garut/';

const benefit = [
  { program: 'Koin Juara',          manfaat: 'Brand muncul di seluruh transaksi festival', highlight: true },
  { program: 'Booth Penukaran',     manfaat: 'Traffic tinggi dari seluruh pengunjung' },
  { program: 'Juara Exchange',      manfaat: 'Engagement konsumen langsung' },
  { program: "People's Champion",   manfaat: 'Interaksi aktif seluruh pengunjung' },
  { program: 'Champion Awards',     manfaat: 'Keterkaitan brand dengan tema acara' },
  { program: 'Festival Para Juara', manfaat: 'Penyatuan identitas brand & event', highlight: true },
];

const taglines = [
  { text: 'Belanja Juara, Dukung Juara', main: false },
  { text: 'Satu Koin Untuk Para Juara', main: false },
  { text: 'Koin Juara, Penggerak UMKM Lokal', main: false },
  { text: 'Dari Juara Untuk Para Juara', main: true },
  { text: 'Tukar, Belanja, Jadi Juara', main: false },
];

export default function Slide36KoinBenefit() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-psg-bg flex flex-col">
      <img
        src={`${base}batik-texture.webp`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06]"
        alt=""
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-[0.5cqh] bg-psg-accent z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-[0.5cqw] bg-psg-accent" />

      <div className="relative flex w-full h-full pl-[0.5cqw]">

        {/* ── LEFT: Benefit table ── */}
        <div className="flex flex-col flex-1 px-[3.5cqw] pt-[8cqh] pb-[6.5cqh]">
          <div className="flex items-center gap-[1.2cqw] mb-[1.8cqh]">
            <div className="flex items-center gap-[0.5cqw]">
              <div className="w-[0.3cqw] h-[2.5cqh] bg-psg-accent rounded-full" />
              <span className="font-psg-body text-psg-accent tracking-[0.28em] uppercase" style={{ fontSize: '0.78cqw' }}>
                Benefit untuk Juara / Juara
              </span>
            </div>
            <div className="flex-1 h-[0.08cqh] bg-psg-accent/25" />
          </div>

          <h2 className="font-psg-display font-bold text-psg-text mb-[3cqh]" style={{ fontSize: '3.2cqw', lineHeight: 1.0, letterSpacing: '-0.01em' }}>
            Nilai <span className="text-psg-accent">Koin Juara</span><br />
            <span className="text-psg-text/60" style={{ fontSize: '2cqw' }}>untuk Brand</span>
          </h2>

          {/* Table */}
          <div
            className="flex-1 flex flex-col"
            style={{ border: '0.07cqw solid rgba(212,160,23,0.2)', borderRadius: '0.5cqw', overflow: 'hidden' }}
          >
            {/* Header */}
            <div
              className="grid px-[1.5cqw] py-[1cqh]"
              style={{
                gridTemplateColumns: '36% 64%',
                background: 'rgba(212,160,23,0.12)',
                borderBottom: '0.07cqw solid rgba(212,160,23,0.25)',
              }}
            >
              {['Program', 'Manfaat untuk Brand'].map(h => (
                <p key={h} className="font-psg-body text-psg-accent/60 uppercase tracking-[0.18em]" style={{ fontSize: '0.72cqw' }}>{h}</p>
              ))}
            </div>

            {/* Rows */}
            <div className="flex flex-col flex-1">
              {benefit.map((r, i) => (
                <div
                  key={i}
                  className="grid items-center px-[1.5cqw] flex-1"
                  style={{
                    gridTemplateColumns: '36% 64%',
                    background: r.highlight
                      ? 'linear-gradient(90deg, rgba(212,160,23,0.14) 0%, rgba(212,160,23,0.03) 100%)'
                      : i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent',
                    borderLeft: r.highlight ? '0.3cqw solid rgba(212,160,23,0.75)' : '0.3cqw solid transparent',
                    borderBottom: i < benefit.length - 1 ? '0.05cqw solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <p
                    className="font-psg-display font-semibold"
                    style={{
                      fontSize: '1.2cqw',
                      color: r.highlight ? '#D4A017' : 'rgba(255,235,180,0.8)',
                    }}
                  >
                    {r.program}
                  </p>
                  <div className="flex items-center gap-[0.7cqw]">
                    {r.highlight && (
                      <svg viewBox="0 0 16 16" width="0.85cqw" height="0.85cqw" fill="none" style={{ flexShrink: 0 }}>
                        <polyline points="3,8 6.5,11.5 13,4.5" stroke="#D4A017" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <p
                      className="font-psg-body"
                      style={{
                        fontSize: '1.1cqw',
                        color: r.highlight ? 'rgba(255,235,180,0.95)' : 'rgba(255,235,180,0.62)',
                        fontWeight: r.highlight ? 500 : 400,
                      }}
                    >
                      {r.manfaat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Coin + Taglines ── */}
        <div
          className="flex flex-col w-[38%] px-[3cqw] pt-[7.5cqh] pb-[6.5cqh]"
          style={{ background: 'linear-gradient(150deg, #221505 0%, #130B03 60%, #0C0701 100%)' }}
        >
          {/* Coin */}
          <div className="flex justify-center mb-[2.5cqh] relative">
            <div
              className="absolute"
              style={{
                width: '24cqw', height: '24cqw',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(212,160,23,0.16) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            <img
              src={`${base}koin-juara2.webp?v=2`}
              alt="Koin Juara"
              style={{
                width: '13cqw',
                height: '13cqw',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 2cqw rgba(212,160,23,0.5)) drop-shadow(0 0.6cqw 1.2cqw rgba(0,0,0,0.65))',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </div>

          {/* Label */}
          <div className="flex items-center gap-[1.2cqw] mb-[2.5cqh]">
            <div className="flex items-center gap-[0.5cqw]">
              <div className="w-[0.3cqw] h-[2cqh] bg-psg-accent rounded-full" />
              <p className="font-psg-body text-psg-accent tracking-[0.28em] uppercase" style={{ fontSize: '0.75cqw' }}>
                Tagline Koin Juara
              </p>
            </div>
            <div className="flex-1 h-[0.08cqh] bg-psg-accent/20" />
          </div>

          {/* Taglines */}
          <div className="flex flex-col gap-[1.2cqh] flex-1 justify-center">
            {taglines.map((t, i) => (
              <div
                key={i}
                className="relative px-[1.4cqw] py-[1.1cqh]"
                style={{
                  background: t.main
                    ? 'linear-gradient(135deg, rgba(212,160,23,0.15) 0%, rgba(212,160,23,0.05) 100%)'
                    : 'rgba(255,255,255,0.03)',
                  border: `0.07cqw solid ${t.main ? 'rgba(212,160,23,0.45)' : 'rgba(255,255,255,0.07)'}`,
                  borderLeft: `${t.main ? '0.3cqw' : '0.07cqw'} solid ${t.main ? 'rgba(212,160,23,0.85)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '0 0.35cqw 0.35cqw 0',
                }}
              >
                {t.main && (
                  <p className="font-psg-body text-psg-accent/50 uppercase tracking-[0.2em] mb-[0.3cqh]" style={{ fontSize: '0.62cqw' }}>
                    Tagline Utama
                  </p>
                )}
                <p
                  className="font-psg-display"
                  style={{
                    fontSize: t.main ? '1.35cqw' : '1.1cqw',
                    fontWeight: t.main ? 700 : 500,
                    color: t.main ? '#D4A017' : 'rgba(255,235,180,0.5)',
                    lineHeight: 1.3,
                    fontStyle: 'italic',
                  }}
                >
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <div className="flex items-center gap-[0.7cqw] mt-[2cqh]">
            <div className="h-[0.08cqh] flex-1 bg-psg-accent/15" />
            <p className="font-psg-body italic text-psg-text/30" style={{ fontSize: '0.82cqw' }}>Pasar Seni Garut 2027</p>
            <div className="h-[0.08cqh] flex-1 bg-psg-accent/15" />
          </div>
        </div>
      </div>

      <SlideHeader />
      <SlideFooter slide={36} total={38} />
    </div>
  );
}
