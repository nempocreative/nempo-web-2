import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, Bookmark, Check, ChevronLeft, ChevronRight, Copy, Download, Globe, Heart, LayoutGrid, MailOpen, MessageCircle, RotateCcw, Send } from 'lucide-react';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/lib/wouter';
import { Reveal } from '@/lib/yearbook-motion';
import { AKUN_FEED, JUMLAH_SLIDE, captionFeed, geserSlide, namaFileFeed } from '@/data/ucapan-feed';
import { WALL_NAME_MAX, WALL_TEXT_MAX, type WallNote } from '@/data/year-book';
import {
  JUMLAH_LILIN, buatPesanUcapan, isiSurat, semuaLilinPadam, ucapanSpesial, type JenisUcapan, type Ucapan,
} from '@/data/ucapan-spesial';

function Heading({ label, children }: { label: string; children: ReactNode }) {
  return <Reveal><p className="mus-label">{label}</p><h2 className="mus-title">{children}</h2></Reveal>;
}

function Amplop({ ucapan, onOpen }: { ucapan: Ucapan; onOpen: () => void }) {
  const [tahap, setTahap] = useState<'tutup' | 'buka' | 'selesai'>('tutup');
  // Fetch the hero photo while the envelope is still closed so it is ready the moment the card opens.
  useEffect(() => { const img = new Image(); img.src = ucapan.foto; img.decode?.().catch(() => {}); }, [ucapan.foto]);
  function buka() {
    if (tahap !== 'tutup') return;
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { onOpen(); return; }
    setTahap('buka');
    window.setTimeout(() => setTahap('selesai'), 1250);
    window.setTimeout(onOpen, 1500);
  }
  return <section className="mus-stage" aria-label={`Amplop ucapan untuk ${ucapan.penerima}`}>
    <div className="mus-env-scene" data-tahap={tahap}>
      <div className="mus-env-intro">
        <p className="mus-display text-4xl text-primary sm:text-5xl">Ada sesuatu untukmu, {ucapan.penerima}</p>
      </div>
      <div className="mus-envelope">
        <div className="mus-env-back" />
        <div className="mus-env-letter"><p className="mus-hand text-3xl leading-tight">{ucapan.sapaan}</p></div>
        <div className="mus-env-front" />
        <div className="mus-env-flap" />
        <div className="mus-env-seal" aria-hidden="true"><Heart className="size-6" fill="currentColor" /></div>
      </div>
      <div className="mus-env-outro">
        <p className="mus-to mus-hand text-2xl">dari {ucapan.dari}</p>
        <Button size="lg" className="mt-10" onClick={buka} disabled={tahap !== 'tutup'}><MailOpen className="size-4" />Buka ucapannya</Button>
      </div>
    </div>
  </section>;
}

function Alasan({ ucapan }: { ucapan: Ucapan }) {
  const [dibalik, setDibalik] = useState<number[]>([]);
  return <section className="mus-wrap mus-section">
    <Heading label="Ketuk kartunya">{ucapan.alasanJudul}</Heading>
    <div className="mus-reasons mt-10">{ucapan.alasan.map((a, i) => {
      const balik = dibalik.includes(i);
      return <button key={a.depan} type="button" className="mus-flip" aria-pressed={balik} aria-label={balik ? `${a.depan}: ${a.isi}` : `Balik kartu: ${a.depan}`}
        onClick={() => setDibalik(prev => balik ? prev.filter(x => x !== i) : [...prev, i])}>
        <span className="mus-flip-inner">
          <span className="mus-flip-face mus-flip-front"><span className="mus-hand text-2xl text-primary">0{i + 1}</span><span><span className="block text-lg font-bold leading-snug">{a.depan}</span><span className="mt-1 block text-xs text-muted-foreground">Ketuk untuk membalik</span></span></span>
          <span className="mus-flip-face mus-flip-back"><Heart className="size-4" fill="currentColor" /><span className="text-sm leading-6">{a.isi}</span></span>
        </span>
      </button>;
    })}</div>
  </section>;
}

function Kenangan({ ucapan }: { ucapan: Ucapan }) {
  return <section className="mus-wrap mus-section">
    <Heading label="Kenangan">Beberapa hari yang <span className="text-primary">tidak terlupa</span></Heading>
    <div className="mus-memories mt-10">{ucapan.kenangan.map(k => <Reveal key={k.judul}>
      <article className={k.foto ? 'mus-memory' : 'mus-memory mus-memory-solo'}>
        {k.foto && <img src={k.foto} alt={k.judul} width={k.lebar} height={k.tinggi} loading="lazy" />}
        <div className="mus-memory-note"><p className="mus-label">{k.waktu}</p><h3 className="text-2xl font-bold">{k.judul}</h3><p className="mt-3 leading-7 text-muted-foreground">{k.cerita}</p></div>
      </article>
    </Reveal>)}</div>
  </section>;
}

function Lilin({ ucapan }: { ucapan: Ucapan }) {
  const [menyala, setMenyala] = useState<boolean[]>(() => Array(JUMLAH_LILIN).fill(true));
  const selesai = semuaLilinPadam(menyala);
  return <>
    <div className="mus-cake" role="group" aria-label="Lilin di atas kue">
      <div className="mus-candles">{menyala.map((n, i) => <button key={i} type="button" className="mus-candle" aria-pressed={!n} aria-label={n ? `Tiup lilin ${i + 1}` : `Lilin ${i + 1} sudah padam`}
        onClick={() => setMenyala(prev => prev.map((v, j) => j === i ? false : v))} />)}</div>
      <div className="mus-cake-top" /><div className="mus-cake-body" /><div className="mus-cake-plate" />
    </div>
    <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">{selesai ? '' : `${menyala.filter(Boolean).length} lilin masih menyala — ketuk satu per satu.`}</p>
    {selesai && <div className="mus-reveal" role="status"><p className="mus-display mt-2 text-3xl text-primary sm:text-4xl">{ucapan.aksiSelesai}</p>
      <Button variant="outline" size="sm" className="mt-6" onClick={() => setMenyala(Array(JUMLAH_LILIN).fill(true))}><RotateCcw className="size-4" />Nyalakan lagi</Button></div>}
  </>;
}

function Toga({ ucapan }: { ucapan: Ucapan }) {
  const [pindah, setPindah] = useState(false);
  return <>
    <div className="mus-cap">
      <div className="mus-cap-board" /><div className="mus-cap-base" /><div className="mus-cap-button" />
      <button type="button" className="mus-tassel" aria-pressed={pindah} aria-label={pindah ? 'Tali toga sudah di kanan' : 'Pindahkan tali toga ke kanan'} onClick={() => setPindah(p => !p)} />
    </div>
    <p className="mt-8 text-sm text-muted-foreground">{pindah ? '' : 'Ketuk tali togamu.'}</p>
    {pindah && <p role="status" className="mus-reveal mus-display text-3xl text-primary sm:text-4xl">{ucapan.aksiSelesai}</p>}
  </>;
}

function Pesan({ ucapan }: { ucapan: Ucapan }) {
  const [notes, setNotes] = useState<WallNote[]>(ucapan.pesanAwal);
  const [nama, setNama] = useState(''); const [teks, setTeks] = useState('');
  const [error, setError] = useState(''); const [sent, setSent] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault(); const result = buatPesanUcapan(ucapan, nama, teks);
    if (!result.ok) { setError(result.error); setSent(false); return; }
    setNotes(prev => [result.note, ...prev]); setNama(''); setTeks(''); setError(''); setSent(true);
  }
  return <section className="mus-wrap mus-section"><Heading label="Ucapan dari yang lain">Tambahkan ucapanmu untuk {ucapan.penerima}</Heading>
    <div className="mt-10 grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
      <form onSubmit={submit} className="space-y-5">
        <div><label htmlFor="ucapan-nama" className="mb-2 block text-sm font-semibold">Namamu</label><Input id="ucapan-nama" value={nama} onChange={e => setNama(e.target.value)} maxLength={WALL_NAME_MAX} placeholder="Teman, saudara, atau keluarga" className="bg-card" /></div>
        <div><label htmlFor="ucapan-pesan" className="mb-2 block text-sm font-semibold">Ucapan untuk {ucapan.penerima}</label><textarea id="ucapan-pesan" value={teks} onChange={e => setTeks(e.target.value)} maxLength={WALL_TEXT_MAX} rows={4} placeholder="Selamat ya…" className="w-full rounded-md border border-input bg-card px-3 py-3 text-sm leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /><p className="mt-1 text-right text-xs text-muted-foreground">{teks.length}/{WALL_TEXT_MAX}</p></div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit"><Send className="size-4" />Kirim ucapan</Button>
        {sent && <p role="status" className="text-sm font-semibold text-primary">Ucapanmu sudah tampil di halaman ini.</p>}
        <p className="max-w-sm text-xs leading-5 text-muted-foreground">Ucapan hanya tampil selama halaman ini terbuka; belum tersimpan atau dikirim ke {ucapan.penerima}.</p>
      </form>
      <div className="grid gap-5 sm:grid-cols-2" aria-live="polite">{notes.map((n, i) => <blockquote key={`${n.dari}-${i}`} className="mus-note"><p>{n.teks}</p><footer className="mt-4 text-xs font-bold uppercase text-muted-foreground">— {n.dari}</footer></blockquote>)}</div>
    </div>
  </section>;
}

function IsiUcapan({ ucapan }: { ucapan: Ucapan }) {
  return <div className="mus-reveal">
    <section className="mus-wrap mus-hero">
      <figure className="mus-polaroid"><span className="mus-tape" aria-hidden="true" /><img src={ucapan.foto} alt={ucapan.fotoAlt} width={640} height={800} fetchPriority="high" /><figcaption>{ucapan.penerima} · {ucapan.tanggal}</figcaption></figure>
      <div>
        <p className="mus-label">{ucapan.acara}</p>
        <h1>{ucapan.judul}</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{ucapan.sapaan}.</p>
        <p className="mus-hand mt-4 text-2xl">{ucapan.keterangan}</p>
      </div>
    </section>

    <section className="mus-wrap mus-section"><Reveal><article className="mus-letter">
      {ucapan.surat.map(p => <p key={p}>{isiSurat(ucapan, p)}</p>)}
      <p className="mus-penutup">{ucapan.penutup}</p>
      <p className="mus-sign">{ucapan.tandaTangan}</p>
    </article></Reveal></section>

    <Alasan ucapan={ucapan} />
    <Kenangan ucapan={ucapan} />

    <section className="mus-wrap mus-section"><div className="mus-moment">
      <p className="mus-label">Satu momen kecil</p>
      <h2 className="mus-title">{ucapan.aksiJudul}</h2>
      {ucapan.aksi === 'lilin' ? <Lilin ucapan={ucapan} /> : <Toga ucapan={ucapan} />}
    </div></section>

    <Pesan ucapan={ucapan} />

    <footer className="mus-footer mus-wrap">
      <p className="mus-display text-4xl text-primary sm:text-5xl">Dengan sayang, {ucapan.dari}</p>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">Satu halaman, satu orang, satu hari yang layak dirayakan. Mau buat ucapan seperti ini untuk orang tersayangmu?</p>
      <Button asChild variant="outline" className="mt-8"><Link href="/year-book"><ArrowLeft className="size-4" />Kembali ke Momen Digital</Link></Button>
    </footer>
  </div>;
}

function DesainFeed({ ucapan }: { ucapan: Ucapan }) {
  const [urls, setUrls] = useState<string[]>([]);
  const [gagal, setGagal] = useState(false);
  const [aktif, setAktif] = useState(0);
  const [tersalin, setTersalin] = useState(false);
  const [sentuh, setSentuh] = useState<number | null>(null);
  const caption = captionFeed(ucapan);
  const akun = AKUN_FEED[ucapan.id];

  useEffect(() => {
    let batal = false; const dibuat: string[] = [];
    setUrls([]); setGagal(false); setAktif(0);
    import('@/lib/ucapan-feed-canvas').then(async ({ renderFeedSlide }) => {
      for (let i = 0; i < JUMLAH_SLIDE; i++) {
        const blob = await renderFeedSlide(ucapan, i);
        if (batal) return;
        const url = URL.createObjectURL(blob); dibuat.push(url);
        setUrls(prev => [...prev, url]);
      }
    }).catch(() => { if (!batal) setGagal(true); });
    return () => { batal = true; dibuat.forEach(u => URL.revokeObjectURL(u)); };
  }, [ucapan]);

  function unduh(i: number) {
    const url = urls[i]; if (!url) return;
    const a = document.createElement('a'); a.href = url; a.download = namaFileFeed(ucapan, i); document.body.appendChild(a); a.click(); a.remove();
  }
  function unduhSemua() { urls.forEach((_, i) => window.setTimeout(() => unduh(i), i * 400)); }
  async function salin() {
    try { await navigator.clipboard.writeText(caption); setTersalin(true); window.setTimeout(() => setTersalin(false), 2000); } catch { setTersalin(false); }
  }
  const siap = urls.length === JUMLAH_SLIDE;
  const geser = (arah: number) => setAktif(i => geserSlide(i, arah));

  return <section className="mus-wrap mus-section mus-reveal">
    <div className="mus-feed">
      <article className="mus-post" aria-label={`Contoh postingan feed untuk ${ucapan.penerima}`}>
        <header className="mus-post-head">
          <span className="mus-post-avatar"><img src={ucapan.foto} alt="" width={40} height={40} /></span>
          <span className="min-w-0"><span className="block truncate text-sm font-bold">{akun}</span><span className="block text-xs text-muted-foreground">Garut</span></span>
        </header>
        <div className="mus-post-media" onTouchStart={e => setSentuh(e.touches[0]?.clientX ?? null)}
          onTouchEnd={e => { const x = e.changedTouches[0]?.clientX; if (sentuh !== null && x !== undefined && Math.abs(x - sentuh) > 40) geser(x < sentuh ? 1 : -1); setSentuh(null); }}>
          {urls[aktif] ? <img src={urls[aktif]} alt={`Slide ${aktif + 1} dari ${JUMLAH_SLIDE}: ucapan untuk ${ucapan.penerima}`} width={1080} height={1350} />
            : <div className="mus-post-wait">{gagal ? 'Gambar belum bisa dibuat di perangkat ini.' : 'Menyiapkan desain…'}</div>}
          <span className="mus-post-count">{aktif + 1}/{JUMLAH_SLIDE}</span>
          <button type="button" className="mus-post-nav mus-post-prev" onClick={() => geser(-1)} aria-label="Slide sebelumnya"><ChevronLeft className="size-5" /></button>
          <button type="button" className="mus-post-nav mus-post-next" onClick={() => geser(1)} aria-label="Slide berikutnya"><ChevronRight className="size-5" /></button>
        </div>
        <div className="mus-post-actions">
          <span className="flex gap-4" aria-hidden="true"><Heart className="size-6" /><MessageCircle className="size-6" /><Send className="size-6" /></span>
          <span className="mus-post-dots" aria-hidden="true">{Array.from({ length: JUMLAH_SLIDE }, (_, i) => <span key={i} data-on={i === aktif} />)}</span>
          <Bookmark className="size-6" aria-hidden="true" />
        </div>
        <p className="mus-post-caption"><b>{akun}</b> {caption}</p>
      </article>

      <div>
        <p className="mus-label">Versi feed Instagram</p>
        <h2 className="mus-title">Ucapan yang sama, siap diunggah</h2>
        <p className="mt-5 leading-7 text-muted-foreground">Tiga slide berukuran 1080 × 1350 untuk feed: sampul dengan foto, potongan surat, lalu hal-hal kecil tentang {ucapan.penerima}. Geser fotonya atau pilih slide di bawah.</p>
        <div className="mus-feed-thumbs mt-6" role="group" aria-label="Pilih slide">
          {Array.from({ length: JUMLAH_SLIDE }, (_, i) => <button key={i} type="button" aria-pressed={i === aktif} aria-label={`Lihat slide ${i + 1}`} onClick={() => setAktif(i)}>
            {urls[i] ? <img src={urls[i]} alt="" width={1080} height={1350} /> : <span />}
          </button>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => unduh(aktif)} disabled={!urls[aktif]}><Download className="size-4" />Unduh slide {aktif + 1}</Button>
          <Button variant="outline" onClick={unduhSemua} disabled={!siap}><Download className="size-4" />Unduh semua ({JUMLAH_SLIDE})</Button>
          <Button variant="outline" onClick={salin}>{tersalin ? <Check className="size-4" /> : <Copy className="size-4" />}{tersalin ? 'Caption tersalin' : 'Salin caption'}</Button>
        </div>
        <p className="mt-4 max-w-md text-xs leading-5 text-muted-foreground">Gambar dibuat langsung di perangkatmu dan tidak diunggah ke mana pun.</p>
      </div>
    </div>
  </section>;
}

export default function UcapanSpesialDemoPage() {
  const [jenis, setJenis] = useState<JenisUcapan>('pacar');
  const [dibuka, setDibuka] = useState(false);
  const [format, setFormat] = useState<'situs' | 'feed'>('situs');
  const ucapan = ucapanSpesial.find(u => u.id === jenis) ?? ucapanSpesial[0];
  function pilih(id: JenisUcapan) {
    if (id === jenis) return;
    setJenis(id); setDibuka(false); window.scrollTo({ top: 0 });
  }
  return <Layout minimalChrome hideBottomNav>
    <SEO title="Ucapan Spesial — Momen Digital Nempo" description="Contoh ucapan untuk satu orang — ulang tahun pacar, sahabat, dan wisuda — dalam bentuk situs maupun desain feed Instagram." path="/year-book/ucapan-spesial" />
    <main className="mus-page min-h-screen overflow-x-clip" data-tema={ucapan.id}>
      <nav className="mus-bar" aria-label="Pilih contoh ucapan"><div className="mus-wrap mus-bar-inner">
        <Button asChild variant="ghost" size="sm" className="mus-bar-back"><Link href="/year-book"><ArrowLeft className="size-4" /><span>Momen Digital</span></Link></Button>
        <div className="mus-format" role="group" aria-label="Pilih format">
          <button type="button" aria-pressed={format === 'situs'} onClick={() => { setFormat('situs'); window.scrollTo({ top: 0 }); }}><Globe className="size-4" />Situs</button>
          <button type="button" aria-pressed={format === 'feed'} onClick={() => { setFormat('feed'); window.scrollTo({ top: 0 }); }}><LayoutGrid className="size-4" />Desain feed</button>
        </div>
        <div className="mus-switch" role="group" aria-label="Contoh ucapan">{ucapanSpesial.map(u => <Button key={u.id} size="sm" variant={u.id === jenis ? 'default' : 'outline'} aria-pressed={u.id === jenis} onClick={() => pilih(u.id)}>{u.label}</Button>)}</div>
      </div></nav>
      {format === 'feed' ? <DesainFeed key={ucapan.id} ucapan={ucapan} />
        : dibuka ? <IsiUcapan key={ucapan.id} ucapan={ucapan} /> : <Amplop key={ucapan.id} ucapan={ucapan} onOpen={() => setDibuka(true)} />}
    </main>
  </Layout>;
}
