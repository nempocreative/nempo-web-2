import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight, Bike, MapPin, Mountain, Send } from 'lucide-react';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Link } from '@/lib/wouter';
import { Reveal } from '@/lib/yearbook-motion';
import { WALL_NAME_MAX, WALL_TEXT_MAX, type WallNote } from '@/data/year-book';
import {
  albumKomunitas, angkaKomunitas, anggotaSekarang, buatPesanKomunitas, kataAnggota, komunitasMeta as meta,
  penggerakKomunitas, perjalananKomunitas, pesanKomunitas, prinsipKomunitas, rutinitasKomunitas, ruteFavorit,
  selisihAnggota, tinggiBatang, type KategoriAlbum,
} from '@/data/momen-komunitas';

function Heading({ label, children }: { label: string; children: ReactNode }) {
  return <Reveal><p className="mkt-label">{label}</p><h2 className="mkt-title">{children}</h2></Reveal>;
}

function Perjalanan() {
  const [aktif, setAktif] = useState(perjalananKomunitas.length - 1);
  const bab = perjalananKomunitas[aktif];
  const baru = selisihAnggota(aktif);
  return <section id="perjalanan" className="mkt-contour"><div className="mkt-wrap mkt-section">
    <div className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end">
      <Heading label="02 / Perjalanan">Dari delapan orang <em>jadi {anggotaSekarang}.</em></Heading>
      <p className="text-sm leading-7 text-muted-foreground">Pilih satu tahun untuk membuka ceritanya. Tinggi batang menunjukkan jumlah anggota di akhir tahun itu.</p>
    </div>
    <div className="mkt-chart" role="group" aria-label="Pilih tahun perjalanan komunitas">
      {perjalananKomunitas.map((p, i) => <button key={p.tahun} type="button" aria-pressed={i === aktif} onClick={() => setAktif(i)} aria-label={`${p.tahun}: ${p.anggota} anggota`}>
        <span className="mkt-bar" style={{ height: `${tinggiBatang(p.anggota, anggotaSekarang)}%` }}><small>{p.anggota}</small></span>
        <span className="mkt-year">{p.tahun}</span>
      </button>)}
    </div>
    <article className="mkt-chapter" aria-live="polite">
      <img src={bab.foto} alt={bab.judul} width={1600} height={1008} loading="lazy" />
      <div className="mkt-chapter-copy">
        <p className="mkt-hand text-3xl font-bold text-secondary">{bab.tahun}</p>
        <h3 className="mt-1 text-3xl font-extrabold leading-tight">{bab.judul}</h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{bab.cerita}</p>
        <div className="mt-6 flex flex-wrap gap-2"><span className="mkt-chip">{bab.capaian}</span><span className="mkt-chip">{aktif === 0 ? `${baru} anggota pendiri` : `+${baru} anggota baru`}</span></div>
      </div>
    </article>
  </div></section>;
}

function Album() {
  const [filter, setFilter] = useState<'Semua' | KategoriAlbum>('Semua');
  const [dipilih, setDipilih] = useState<(typeof albumKomunitas)[number] | null>(null);
  const kategori: ('Semua' | KategoriAlbum)[] = ['Semua', 'Gowes', 'Sosial', 'Kebersamaan'];
  return <section id="album" className="mkt-wrap mkt-section">
    <Heading label="06 / Album">Foto yang <em>paling sering dibuka lagi.</em></Heading>
    <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="Kategori album komunitas">{kategori.map(k => <Button key={k} size="sm" variant={k === filter ? 'default' : 'outline'} aria-pressed={k === filter} onClick={() => setFilter(k)}>{k}</Button>)}</div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{albumKomunitas.filter(f => filter === 'Semua' || f.kategori === filter).map(f => <Button key={f.id} variant="ghost" className="mkt-shot" onClick={() => setDipilih(f)} aria-label={`Buka cerita foto: ${f.judul}`}><img src={f.foto} alt={f.judul} width={1600} height={1008} loading="lazy" /><span className="block p-5"><span className="block text-xs font-extrabold uppercase text-secondary">{f.tanggal} · {f.kategori}</span><span className="mt-2 block text-lg font-bold leading-snug">{f.judul}</span><span className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">Cerita di balik foto<ArrowUpRight className="size-3.5" /></span></span></Button>)}</div>
    <Dialog open={Boolean(dipilih)} onOpenChange={open => { if (!open) setDipilih(null); }}><DialogContent className="mkt-page mkt-modal">{dipilih && <><DialogTitle className="pr-6 text-2xl font-extrabold">{dipilih.judul}</DialogTitle><img src={dipilih.foto} alt={dipilih.judul} width={1600} height={1008} /><DialogDescription className="text-base leading-7 text-foreground/85">{dipilih.cerita}</DialogDescription><p className="text-xs font-bold uppercase text-muted-foreground">{dipilih.tanggal} · {dipilih.kategori}</p></>}</DialogContent></Dialog>
  </section>;
}

function Pesan() {
  const [notes, setNotes] = useState<WallNote[]>(pesanKomunitas);
  const [nama, setNama] = useState(''); const [teks, setTeks] = useState('');
  const [error, setError] = useState(''); const [sent, setSent] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault(); const result = buatPesanKomunitas(nama, teks);
    if (!result.ok) { setError(result.error); setSent(false); return; }
    setNotes(prev => [result.note, ...prev]); setNama(''); setTeks(''); setError(''); setSent(true);
  }
  return <section id="pesan" className="mkt-wrap mkt-section"><Heading label="08 / Dinding pesan">Tulis sesuatu <em>untuk lima tahun ini.</em></Heading><div className="mt-10 grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
    <form onSubmit={submit} className="space-y-5"><div><label htmlFor="komunitas-nama" className="mb-2 block text-sm font-semibold">Namamu</label><Input id="komunitas-nama" value={nama} onChange={e => setNama(e.target.value)} maxLength={WALL_NAME_MAX} placeholder="Anggota, keluarga, atau warga" className="bg-card" /></div><div><label htmlFor="komunitas-pesan" className="mb-2 block text-sm font-semibold">Pesan untuk Kayuh Garut</label><textarea id="komunitas-pesan" value={teks} onChange={e => setTeks(e.target.value)} maxLength={WALL_TEXT_MAX} rows={4} placeholder="Gowes yang paling aku ingat…" className="w-full rounded-md border border-input bg-card px-3 py-3 text-sm leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /><p className="mt-1 text-right text-xs text-muted-foreground">{teks.length}/{WALL_TEXT_MAX}</p></div>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit"><Send className="size-4" />Tempel di dinding</Button>{sent && <p role="status" className="text-sm font-semibold text-primary">Pesanmu sudah tampil di dinding ini.</p>}<p className="max-w-sm text-xs leading-5 text-muted-foreground">Pesan hanya tampil selama halaman ini terbuka; belum tersimpan atau dikirim ke komunitas.</p></form>
    <div className="grid gap-5 sm:grid-cols-2" aria-live="polite">{notes.map((n, i) => <blockquote key={`${n.dari}-${i}`} className="mkt-note"><p>{n.teks}</p><footer className="mt-4 text-xs font-bold uppercase text-muted-foreground">— {n.dari}</footer></blockquote>)}</div></div></section>;
}

export default function MomenKomunitasDemoPage() {
  const maksTanjakan = Math.max(...ruteFavorit.map(r => r.tanjakan));
  return <Layout minimalChrome hideBottomNav><SEO title="5 Tahun Kayuh Garut — Momen Digital Komunitas Nempo" description="Halaman anniversary satu komunitas sepeda: cerita awal, perjalanan anggota tiap tahun, agenda rutin, penggerak, rute favorit, album, dan pesan." path={meta.halaman} /><main className="mkt-page min-h-screen overflow-x-clip">
    <section className="mkt-hero">
      <img src={meta.foto} alt="Puluhan anggota komunitas sepeda berjersey hijau berfoto bersama di jalan kebun teh dengan latar gunung" width={1600} height={1008} fetchPriority="high" />
      <Button asChild variant="outline" size="sm" className="mkt-back"><Link href="/year-book"><ArrowLeft />Momen Digital</Link></Button>
      <div className="mkt-hero-copy"><div className="mkt-wrap mkt-hero-grid">
        <div className="mkt-stamp" aria-hidden="true"><div><b>{meta.usia}</b><small>Tahun</small></div></div>
        <div>
          <h1>{meta.nama}<span>Lima tahun, {meta.semboyan.toLowerCase()}</span></h1>
          <div className="mkt-hero-meta"><span className="inline-flex items-center gap-2"><Bike className="size-4" />{meta.tempat}</span><span>{meta.berdiri} — {meta.perayaan}</span></div>
        </div>
      </div></div>
    </section>
    <nav className="mkt-nav" aria-label="Bagian halaman komunitas"><div className="mkt-wrap mkt-nav-inner"><span className="mkt-nav-brand text-lg font-extrabold">Kayuh Garut <span className="mkt-hand text-2xl text-secondary">5th</span></span><div className="mkt-nav-links">{[['cerita', 'Cerita'], ['perjalanan', 'Perjalanan'], ['agenda', 'Agenda'], ['penggerak', 'Penggerak'], ['rute', 'Rute'], ['album', 'Album'], ['pesan', 'Pesan']].map(([id, nama]) => <Button asChild key={id} variant="ghost" size="sm"><a href={`#${id}`}>{nama}</a></Button>)}</div></div></nav>
    <div className="mkt-wrap"><div className="mkt-stats">{angkaKomunitas.map(a => <div key={a.angka}><strong>{a.angka}</strong><span>{a.ket}</span></div>)}</div></div>

    <section id="cerita" className="mkt-wrap mkt-section"><div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
      <Heading label="01 / Cerita awal">Semuanya dimulai dari <em>satu ajakan sepulang kerja.</em></Heading>
      <div className="space-y-4 text-base leading-8 text-muted-foreground"><p>Juni 2021, Pak Asep mengirim pesan ke grup kantornya: “Rabu malam gowes keliling kota, yuk. Pelan saja.” Delapan orang datang. Tidak ada yang punya jersey yang sama, dan separuhnya meminjam sepeda tetangga.</p><p>Lima tahun kemudian, Kayuh Garut punya {anggotaSekarang} anggota — dari pelajar SMP sampai pensiunan. Yang tidak berubah hanya satu: kalimat “pelan saja” itu masih jadi aturan paling penting.</p></div>
    </div>
      <div className="mkt-principles">{prinsipKomunitas.map((p, i) => <Reveal key={p.judul}><article><b>0{i + 1}</b><h3 className="mt-2 text-xl font-extrabold">{p.judul}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{p.isi}</p></article></Reveal>)}</div>
    </section>

    <Perjalanan />

    <section id="agenda" className="mkt-wrap mkt-section"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <div><Heading label="03 / Agenda rutin">Yang membuat kami <em>tetap bertemu.</em></Heading><p className="mt-5 text-sm leading-7 text-muted-foreground">Komunitas bertahan bukan karena acara besar, tapi karena jadwal kecil yang terus ditepati — minggu demi minggu, hujan atau cerah.</p></div>
      <ol className="mkt-routine">{rutinitasKomunitas.map(r => <li key={r.nama}><time>{r.kapan}</time><div><h3 className="text-lg font-extrabold">{r.nama}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{r.isi}</p></div><span className="mkt-dist">{r.jarak}</span></li>)}</ol>
    </div></section>

    <section id="penggerak" className="mkt-wrap mkt-section border-t border-border"><Heading label="04 / Penggerak">Wajah-wajah <em>di balik grup obrolan.</em></Heading><p className="mb-10 mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Enam orang yang menjaga roda tetap berputar: dari yang mengajak pertama kali sampai yang memastikan setiap rantai terpasang.</p>
      <div className="mkt-crew">{penggerakKomunitas.map(p => <article key={p.id}><div className="mkt-crew-photo"><img src={p.foto} alt={`${p.nama}, ${p.peran} Kayuh Garut`} width={640} height={800} loading="lazy" /><span className="mkt-since">Sejak {p.sejak}</span></div><div className="p-6"><p className="mkt-role">{p.peran}</p><h3 className="mt-1 text-2xl font-extrabold">{p.nama}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{p.tugas}</p><p className="mt-4 border-t border-dashed border-border pt-4 text-sm leading-7">{p.cerita}</p><p className="mkt-hand mt-4 text-2xl font-bold leading-7 text-primary">“{p.kesan}”</p></div></article>)}</div>
    </section>

    <section id="rute" className="mkt-contour"><div className="mkt-wrap mkt-section"><Heading label="05 / Rute favorit">Jalan yang <em>hafal suara rem kami.</em></Heading><p className="mb-10 mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Empat rute yang paling sering diulang, dari yang ramah pemula sampai yang jadi cerita kebanggaan.</p>
      <div className="mkt-routes">{ruteFavorit.map(r => <article key={r.nama}><span className="mkt-level">{r.tingkat}</span><h3 className="mt-4 flex items-start gap-2 text-lg font-extrabold leading-snug"><MapPin className="mt-1 size-4 shrink-0 text-secondary" />{r.nama}</h3><strong className="mt-5">{r.jarak}<span className="text-base font-bold"> km</span></strong><p className="mt-4 flex items-center gap-2 text-xs font-bold text-muted-foreground"><Mountain className="size-4" />Naik {r.tanjakan.toLocaleString('id-ID')} m</p><div className="mkt-elev" aria-hidden="true"><span style={{ width: `${tinggiBatang(r.tanjakan, maksTanjakan)}%` }} /></div><p className="mt-5 text-sm leading-6 text-muted-foreground">{r.cerita}</p></article>)}</div>
    </div></section>

    <Album />

    <section className="mkt-band"><div className="mkt-wrap mkt-section"><p className="mkt-label">07 / Kata anggota</p><h2 className="mkt-title">Alasan mereka <em>terus datang.</em></h2><div className="mkt-voices mt-10">{kataAnggota.map(k => <blockquote key={k.dari}><p>“{k.teks}”</p><footer className="mt-4 text-xs font-bold uppercase">— {k.dari}</footer></blockquote>)}</div></div></section>

    <Pesan />

    <footer className="mkt-footer"><div className="mkt-wrap"><p className="text-xs font-extrabold uppercase text-secondary">{meta.nama} · 2021 — 2026</p><h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">Jalannya masih panjang. <span className="mkt-hand text-primary">Untung kita bareng.</span></h2><p className="mt-4 text-sm text-muted-foreground">Sampai jumpa di gowes Minggu pagi berikutnya.</p><Button asChild variant="outline" className="mt-8"><Link href="/year-book"><ArrowLeft />Kembali ke Momen Digital</Link></Button><p className="mt-8 text-xs text-muted-foreground">Arsip lima tahun komunitas oleh Nempo</p></div></footer>
  </main></Layout>;
}
