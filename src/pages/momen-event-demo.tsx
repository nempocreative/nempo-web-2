import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Mic2, Pause, Play, Send, Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Link } from '@/lib/wouter';
import { Reveal } from '@/lib/yearbook-motion';
import { WALL_NAME_MAX, WALL_TEXT_MAX, type WallNote } from '@/data/year-book';
import {
  angkaEvent, buatPesanEvent, divisiEvent, eventMeta as meta, fotoEvent, kesanPengunjung, langkahSlide,
  lineupEvent, panitiaInti, persiapanEvent, pesanEvent, rundownEvent, totalPanitia, type KategoriFoto,
} from '@/data/momen-event';

function Heading({ label, children }: { label: string; children: ReactNode }) {
  return <Reveal><p className="me-label">{label}</p><h2 className="me-title">{children}</h2></Reveal>;
}

function Cuplikan() {
  const [aktif, setAktif] = useState(0);
  const [main, setMain] = useState(false);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setMain(true);
  }, []);
  useEffect(() => {
    if (!main) return;
    const id = window.setInterval(() => setAktif(i => langkahSlide(i, 1, fotoEvent.length)), 4500);
    return () => window.clearInterval(id);
  }, [main]);
  const foto = fotoEvent[aktif];
  return <section id="cuplikan" className="me-wrap me-section">
    <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end">
      <Heading label="01 / After-movie">Kalau harus diputar ulang, <em>begini rasanya.</em></Heading>
      <p className="text-sm leading-7 text-muted-foreground">Cuplikan foto dari gerbang dibuka sampai lampu ponsel menyala. Di halaman milikmu, bagian ini bisa diisi video dokumentasi acara.</p>
    </div>
    <div className="me-reel" aria-roledescription="carousel" aria-label="Cuplikan foto Festival Lembah Senja">
      {fotoEvent.map((f, i) => <img key={f.id} src={f.foto} alt={i === aktif ? f.judul : ''} aria-hidden={i !== aktif} data-active={i === aktif} width={f.lebar} height={f.tinggi} loading={i === 0 ? 'eager' : 'lazy'} />)}
      <div className="me-reel-shade" />
      <div className="me-reel-caption" aria-live={main ? 'off' : 'polite'}>
        <p className="me-mono text-xs text-primary">{foto.waktu} · {foto.kategori}</p>
        <p className="mt-2 max-w-xl text-xl font-bold leading-snug sm:text-3xl">{foto.judul}</p>
      </div>
      <div className="me-reel-controls">
        <Button size="icon" variant="secondary" onClick={() => setAktif(i => langkahSlide(i, -1, fotoEvent.length))} aria-label="Foto sebelumnya"><ChevronLeft /></Button>
        <Button size="icon" variant="secondary" onClick={() => setMain(m => !m)} aria-label={main ? 'Jeda cuplikan' : 'Putar cuplikan'}>{main ? <Pause /> : <Play />}</Button>
        <Button size="icon" variant="secondary" onClick={() => setAktif(i => langkahSlide(i, 1, fotoEvent.length))} aria-label="Foto berikutnya"><ChevronRight /></Button>
        <div className="me-reel-bars">{fotoEvent.map((f, i) => <button key={f.id} type="button" aria-label={`Foto ${i + 1}: ${f.judul}`} aria-current={i === aktif} onClick={() => setAktif(i)} />)}</div>
      </div>
    </div>
  </section>;
}

function Galeri() {
  const [filter, setFilter] = useState<'Semua' | KategoriFoto>('Semua');
  const [dipilih, setDipilih] = useState<(typeof fotoEvent)[number] | null>(null);
  const kategori: ('Semua' | KategoriFoto)[] = ['Semua', 'Panggung', 'Penonton', 'Di Balik Layar'];
  return <section id="galeri" className="me-wrap me-section">
    <Heading label="05 / Galeri">Foto terbaik, <em>dan cerita di baliknya.</em></Heading>
    <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="Kategori galeri event">{kategori.map(k => <Button key={k} size="sm" variant={k === filter ? 'default' : 'outline'} aria-pressed={k === filter} onClick={() => setFilter(k)}>{k}</Button>)}</div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{fotoEvent.filter(f => filter === 'Semua' || f.kategori === filter).map(f => <Button key={f.id} variant="ghost" className="me-shot" onClick={() => setDipilih(f)} aria-label={`Buka cerita foto: ${f.judul}`}><img src={f.foto} alt={f.judul} width={f.lebar} height={f.tinggi} loading="lazy" /><span className="block p-5"><span className="me-mono block text-xs text-primary">{f.waktu} · {f.kategori}</span><span className="mt-2 block text-lg font-bold leading-snug">{f.judul}</span><span className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">Cerita di balik foto<ArrowUpRight className="size-3.5" /></span></span></Button>)}</div>
    <Dialog open={Boolean(dipilih)} onOpenChange={open => { if (!open) setDipilih(null); }}><DialogContent className="me-page me-modal">{dipilih && <><DialogTitle className="pr-6 text-2xl font-bold">{dipilih.judul}</DialogTitle><img src={dipilih.foto} alt={dipilih.judul} width={dipilih.lebar} height={dipilih.tinggi} /><DialogDescription className="text-base leading-7 text-foreground/85">{dipilih.cerita}</DialogDescription><p className="me-mono text-xs text-muted-foreground">{dipilih.waktu} · {dipilih.kategori}</p></>}</DialogContent></Dialog>
  </section>;
}

function Pesan() {
  const [notes, setNotes] = useState<WallNote[]>(pesanEvent);
  const [nama, setNama] = useState(''); const [teks, setTeks] = useState('');
  const [error, setError] = useState(''); const [sent, setSent] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault(); const result = buatPesanEvent(nama, teks);
    if (!result.ok) { setError(result.error); setSent(false); return; }
    setNotes(prev => [result.note, ...prev]); setNama(''); setTeks(''); setError(''); setSent(true);
  }
  return <section id="pesan" className="me-wrap me-section border-t border-border"><Heading label="07 / Dinding pesan">Untuk yang datang, <em>dan yang bekerja di belakang.</em></Heading><div className="mt-10 grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
    <form onSubmit={submit} className="space-y-5"><div><label htmlFor="event-nama" className="mb-2 block text-sm font-semibold">Namamu</label><Input id="event-nama" value={nama} onChange={e => setNama(e.target.value)} maxLength={WALL_NAME_MAX} placeholder="Pengunjung, penampil, atau panitia" className="bg-card" /></div><div><label htmlFor="event-pesan" className="mb-2 block text-sm font-semibold">Pesan untuk Festival Lembah Senja</label><textarea id="event-pesan" value={teks} onChange={e => setTeks(e.target.value)} maxLength={WALL_TEXT_MAX} rows={4} placeholder="Momen yang paling aku ingat…" className="w-full rounded-md border border-input bg-card px-3 py-3 text-sm leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /><p className="mt-1 text-right text-xs text-muted-foreground">{teks.length}/{WALL_TEXT_MAX}</p></div>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit"><Send className="size-4" />Kirim ke dinding</Button>{sent && <p role="status" className="text-sm text-primary">Pesanmu sudah tampil di dinding ini.</p>}<p className="max-w-sm text-xs leading-5 text-muted-foreground">Pesan hanya tampil selama halaman ini terbuka; belum tersimpan atau dikirim ke panitia.</p></form>
    <div className="grid gap-4 sm:grid-cols-2" aria-live="polite">{notes.map((n, i) => <blockquote key={`${n.dari}-${i}`} className="me-note"><Sparkles className="mb-3 size-4 text-primary" /><p>{n.teks}</p><footer className="me-mono mt-4 text-xs text-muted-foreground">— {n.dari}</footer></blockquote>)}</div></div></section>;
}

export default function MomenEventDemoPage() {
  return <Layout minimalChrome hideBottomNav><SEO title="Festival Lembah Senja 2026 — Momen Digital Event Nempo" description="After-movie digital satu festival: cuplikan foto, susunan acara, cerita persiapan, panitia, galeri, dan pesan pengunjung." path={meta.halaman} /><main className="me-page min-h-screen overflow-x-clip">
    <section className="me-hero">
      <img src={meta.foto} alt="Band tampil di panggung kayu saat senja, ditonton ratusan pengunjung dengan latar gunung" width={1600} height={1008} fetchPriority="high" />
      <Button asChild variant="outline" size="sm" className="me-back"><Link href="/year-book"><ArrowLeft />Momen Digital</Link></Button>
      <div className="me-hero-copy"><div className="me-wrap">
        <p className="me-mono mb-4 text-xs text-primary">{meta.edisi.toUpperCase()} · {meta.tahun}</p>
        <h1>Lembah Senja<span>{meta.tagline}</span></h1>
        <div className="me-ticket"><div><small>Tanggal</small><strong>{meta.tanggal}</strong></div><div><small>Waktu</small><strong>{meta.jam}</strong></div><div><small>Lokasi</small><strong>{meta.tempat}</strong></div></div>
      </div></div>
    </section>
    <nav className="me-nav" aria-label="Bagian halaman event"><div className="me-wrap me-nav-inner"><span className="me-nav-brand font-extrabold uppercase">Lembah Senja<span className="text-primary">.</span></span><div className="me-nav-links">{[['cuplikan', 'Cuplikan'], ['acara', 'Acara'], ['persiapan', 'Persiapan'], ['panitia', 'Panitia'], ['galeri', 'Galeri'], ['pesan', 'Pesan']].map(([id, nama]) => <Button asChild key={id} variant="ghost" size="sm"><a href={`#${id}`}>{nama}</a></Button>)}</div></div></nav>
    <div className="me-wrap"><div className="me-stats">{angkaEvent.map(a => <div key={a.angka}><strong>{a.angka}</strong><span>{a.ket}</span></div>)}</div></div>

    <Cuplikan />

    <section id="acara" className="me-wrap me-section border-t border-border"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
      <div><Heading label="02 / Susunan acara">Dari gerbang dibuka <em>sampai lampu terakhir.</em></Heading><p className="mt-5 text-sm leading-7 text-muted-foreground">Delapan setengah jam yang disusun ulang tujuh kali. Inilah yang akhirnya benar-benar terjadi pada hari itu.</p>
        <p className="me-label mt-10">Line-up</p><div className="me-lineup">{lineupEvent.map(l => <div key={l.nama}><Mic2 className="mb-3 size-4 text-primary" /><p className="font-bold leading-snug">{l.nama}</p><p className="mt-1 text-xs text-muted-foreground">{l.genre}</p></div>)}</div></div>
      <ol className="me-rundown">{rundownEvent.map(r => <li key={r.jam}><time>{r.jam}</time><div><h3 className="text-lg font-bold">{r.judul}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{r.ket}</p></div></li>)}</ol>
    </div></section>

    <section id="persiapan" className="me-story-band"><div className="me-wrap me-section"><Heading label="03 / Di balik layar">Tiga bulan untuk <em>satu malam.</em></Heading><p className="mb-10 mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Penonton datang saat semuanya sudah siap. Ini cerita sebelum dan sesudahnya — bagian yang biasanya hanya tersimpan di grup obrolan panitia.</p>
      <div className="me-countdown">{persiapanEvent.map(p => <article key={p.waktu}><b>{p.waktu}</b><h3 className="mt-4 text-xl font-bold">{p.judul}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{p.cerita}</p></article>)}</div>
    </div></section>

    <section id="panitia" className="me-wrap me-section"><Heading label="04 / Panitia">{totalPanitia} orang, <em>satu frekuensi handy talky.</em></Heading><p className="mb-10 mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Enam koordinator inti dan puluhan relawan yang memastikan semuanya berjalan — sering tanpa sempat menonton satu lagu pun dengan tenang.</p>
      <div className="me-crew">{panitiaInti.map(p => <article key={p.id}><div className="me-crew-photo"><img src={p.foto} alt={`${p.nama}, ${p.peran} Festival Lembah Senja`} width={640} height={800} loading="lazy" /><span className="me-crew-tag">{p.peran}</span></div><div className="p-6"><h3 className="text-2xl font-bold">{p.nama}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{p.tugas}</p><p className="mt-4 border-t border-border pt-4 text-sm leading-7">{p.cerita}</p><p className="mt-5 font-serif text-lg italic leading-7 text-primary" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>“{p.kesan}”</p></div></article>)}</div>
      <div className="me-divisi">{divisiEvent.map(d => <div key={d.nama}><strong>{d.jumlah}</strong><span className="text-xs text-muted-foreground">{d.nama}</span></div>)}</div>
    </section>

    <Galeri />

    <section className="me-story-band"><div className="me-wrap me-section"><Heading label="06 / Kata mereka">Yang pulang <em>membawa cerita.</em></Heading><div className="me-voices mt-10">{kesanPengunjung.map(k => <blockquote key={k.dari}><p>“{k.teks}”</p><footer className="me-mono mt-4 text-xs text-muted-foreground">— {k.dari}</footer></blockquote>)}</div></div></section>

    <Pesan />

    <footer className="me-footer"><div className="me-wrap"><p className="me-mono text-xs text-primary">{meta.nama.toUpperCase()} · {meta.tahun}</p><h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">Lampunya sudah padam. <em className="font-serif font-medium text-primary" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Ceritanya belum.</em></h2><p className="mt-4 text-sm text-muted-foreground">Sampai jumpa di Lembah Senja berikutnya.</p><Button asChild variant="outline" className="mt-8"><Link href="/year-book"><ArrowLeft />Kembali ke Momen Digital</Link></Button><p className="mt-8 text-xs text-muted-foreground">Arsip satu acara oleh Nempo</p></div></footer>
  </main></Layout>;
}
