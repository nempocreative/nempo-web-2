import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, Heart, MailOpen, RotateCcw, Send } from 'lucide-react';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/lib/wouter';
import { Reveal } from '@/lib/yearbook-motion';
import { WALL_NAME_MAX, WALL_TEXT_MAX, type WallNote } from '@/data/year-book';
import {
  JUMLAH_LILIN, buatPesanUcapan, isiSurat, semuaLilinPadam, ucapanSpesial, type JenisUcapan, type Ucapan,
} from '@/data/ucapan-spesial';

function Heading({ label, children }: { label: string; children: ReactNode }) {
  return <Reveal><p className="mus-label">{label}</p><h2 className="mus-title">{children}</h2></Reveal>;
}

function Amplop({ ucapan, onOpen }: { ucapan: Ucapan; onOpen: () => void }) {
  const [terbuka, setTerbuka] = useState(false);
  function buka() {
    setTerbuka(true);
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(onOpen, reduced ? 0 : 750);
  }
  return <section className="mus-stage" aria-label={`Amplop ucapan untuk ${ucapan.penerima}`}>
    <div className="text-center">
      <p className="mus-label">{ucapan.label} · {ucapan.tanggal}</p>
      <p className="mus-display mb-10 text-4xl text-primary sm:text-5xl">Ada sesuatu untukmu, {ucapan.penerima}</p>
      <div className="mus-envelope mx-auto" data-open={terbuka}>
        <div className="mus-env-back" />
        <div className="mus-env-letter"><p className="mus-hand text-3xl leading-tight">{ucapan.sapaan}</p></div>
        <div className="mus-env-front" />
        <div className="mus-env-flap" />
        <div className="mus-env-seal" aria-hidden="true"><Heart className="size-6" fill="currentColor" /></div>
      </div>
      <p className="mus-to mus-hand text-2xl">dari {ucapan.dari}</p>
      <Button size="lg" className="mt-12" onClick={buka} disabled={terbuka}><MailOpen className="size-4" />Buka ucapannya</Button>
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
        <p className="mus-label">{ucapan.acara} · {ucapan.tanggal}</p>
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

export default function UcapanSpesialDemoPage() {
  const [jenis, setJenis] = useState<JenisUcapan>('pacar');
  const [dibuka, setDibuka] = useState(false);
  const ucapan = ucapanSpesial.find(u => u.id === jenis) ?? ucapanSpesial[0];
  function pilih(id: JenisUcapan) {
    if (id === jenis) return;
    setJenis(id); setDibuka(false); window.scrollTo({ top: 0 });
  }
  return <Layout minimalChrome hideBottomNav>
    <SEO title="Ucapan Spesial — Momen Digital Nempo" description="Contoh halaman ucapan untuk satu orang: ulang tahun pacar, ulang tahun sahabat, dan wisuda — lengkap dengan surat, kenangan, dan ucapan dari teman." path="/year-book/ucapan-spesial" />
    <main className="mus-page min-h-screen overflow-x-clip" data-tema={ucapan.id}>
      <nav className="mus-bar" aria-label="Pilih contoh ucapan"><div className="mus-wrap mus-bar-inner">
        <Button asChild variant="ghost" size="sm" className="mus-bar-back"><Link href="/year-book"><ArrowLeft className="size-4" /><span>Momen Digital</span></Link></Button>
        <div className="mus-switch" role="group" aria-label="Contoh ucapan">{ucapanSpesial.map(u => <Button key={u.id} size="sm" variant={u.id === jenis ? 'default' : 'outline'} aria-pressed={u.id === jenis} onClick={() => pilih(u.id)}>{u.label}</Button>)}</div>
      </div></nav>
      {dibuka ? <IsiUcapan key={ucapan.id} ucapan={ucapan} /> : <Amplop key={ucapan.id} ucapan={ucapan} onOpen={() => setDibuka(true)} />}
    </main>
  </Layout>;
}
