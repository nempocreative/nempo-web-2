import { useState, type ReactNode, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Heart, MapPin, Music2, Send } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/lib/wouter";
import { Reveal } from "@/lib/yearbook-motion";
import { WALL_NAME_MAX, WALL_TEXT_MAX, type WallNote } from "@/data/year-book";
import { albumGrup, anggotaGrup, buatPesanGrup, cariLaguUrl, ceritaGrup, grupMeta, kebiasaanGrup, pesanGrup, playlistGrup } from "@/data/momen-grup";

function Heading({ label, children }: { label: string; children: ReactNode }) {
  return <Reveal><p className="mg-eyebrow">{label}</p><h2 className="mg-title">{children}</h2></Reveal>;
}

function Album() {
  const [kategori, setKategori] = useState("Semua");
  const [selected, setSelected] = useState<(typeof albumGrup)[number] | null>(null);
  return <section id="album" className="mg-wrap mg-section">
    <Heading label="02 / Album kecil kita">Bukan cuma foto bagus.<br />Ini hari-hari yang ingin diulang.</Heading>
    <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Ada yang berawal dari rencana dadakan, ada yang cuma makan bareng. Semuanya punya satu kesamaan: pulangnya selalu bawa cerita.</p>
    <div className="my-7 flex gap-2" role="group" aria-label="Kategori foto">
      {["Semua", "Nongkrong", "Jalan bareng"].map((tag) => <Button key={tag} size="sm" variant={kategori === tag ? "default" : "outline"} aria-pressed={kategori === tag} onClick={() => setKategori(tag)}>{tag}</Button>)}
    </div>
    <div className="grid gap-7 sm:grid-cols-2">
      {albumGrup.filter((foto) => kategori === "Semua" || foto.kategori === kategori).map((foto) => <Reveal key={foto.id}>
        <Button variant="ghost" className="mg-album-shot" aria-label={`Buka foto ${foto.judul}`} onClick={() => setSelected(foto)}>
          <img src={foto.src} alt={foto.judul} width={800} height={600} loading="lazy" />
          <span className="block px-2 pb-2 pt-4"><span className="flex items-center justify-between gap-2 text-xs text-muted-foreground"><span>{foto.tanggal} · {foto.kategori}</span><Camera className="size-4" /></span><span className="mg-hand mt-2 block text-foreground">{foto.judul}</span><span className="mt-2 block text-sm font-normal leading-6 text-muted-foreground">{foto.cerita.split('. ')[0]}.</span></span>
        </Button>
      </Reveal>)}
    </div>
    <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <DialogContent className="mg-page mg-modal">
        {selected && <><DialogTitle className="mg-serif pr-6 text-2xl">{selected.judul}</DialogTitle><img src={selected.src} alt={selected.judul} /><DialogDescription className="text-base leading-7">{selected.cerita}</DialogDescription><p className="text-xs text-muted-foreground">{selected.tanggal} · {selected.kategori}</p></>}
      </DialogContent>
    </Dialog>
  </section>;
}

function Pesan() {
  const [notes, setNotes] = useState<WallNote[]>(pesanGrup);
  const [nama, setNama] = useState("");
  const [teks, setTeks] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent) {
    event.preventDefault();
    const result = buatPesanGrup(nama, teks);
    if (!result.ok) { setError(result.error); setSent(false); return; }
    setNotes((prev) => [result.note, ...prev]);
    setNama(""); setTeks(""); setError(""); setSent(true);
  }
  return <section id="pesan" className="mg-wrap mg-section">
    <Heading label="05 / Titip satu pesan">Kalau nanti kita baca lagi…</Heading>
    <div className="mt-9 grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
      <form onSubmit={submit} className="space-y-5">
        <div><label htmlFor="grup-nama" className="mb-2 block text-sm font-semibold">Namamu</label><Input id="grup-nama" value={nama} onChange={(e) => setNama(e.target.value)} maxLength={WALL_NAME_MAX} placeholder="Teman satu meja" className="bg-card" /></div>
        <div><label htmlFor="grup-pesan" className="mb-2 block text-sm font-semibold">Pesan untuk teman-teman</label><textarea id="grup-pesan" value={teks} onChange={(e) => setTeks(e.target.value)} maxLength={WALL_TEXT_MAX} rows={4} placeholder="Jangan lupa sisakan satu kursi buat aku." className="w-full rounded-md border border-input bg-card px-3 py-3 text-sm leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /><p className="mt-1 text-right text-xs text-muted-foreground">{teks.length}/{WALL_TEXT_MAX}</p></div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit"><Send />Titip pesan</Button>
        {sent && <p role="status" className="text-sm text-primary">Pesanmu sudah ditempel di layar ini.</p>}
        <p className="max-w-sm text-xs leading-5 text-muted-foreground">Pesan hanya tampil selama halaman ini terbuka; belum tersimpan atau dikirim ke teman.</p>
      </form>
      <div className="grid gap-4 sm:grid-cols-2" aria-live="polite">
        {notes.map((note, i) => <blockquote className="mg-note" key={`${note.dari}-${i}`}><Heart className="mb-3 size-4 text-primary" /><p>{note.teks}</p><footer className="mt-5 text-xs font-semibold">— {note.dari}</footer></blockquote>)}
      </div>
    </div>
  </section>;
}

export default function MomenGrupDemoPage() {
  return <Layout minimalChrome hideBottomNav>
    <SEO title="Teman Sore — Momen Digital Geng & Grup Nempo" description="Album pertemanan Teman Sore: empat teman, cerita sejak 2023, galeri, lagu kenangan, dan pesan bersama." path={grupMeta.halaman} />
    <main className="mg-page min-h-screen overflow-x-clip">
      <section className="mg-hero">
        <img className="mg-hero-photo" src={grupMeta.foto} alt="Empat teman berbagi cerita di meja kafe di Garut" width={1536} height={1024} fetchPriority="high" />
        <Button asChild variant="outline" size="sm" className="mg-back"><Link href="/year-book"><ArrowLeft />Momen Digital</Link></Button>
        <p className="mg-hero-tag">ALBUM PERTEMANAN / SEJAK {grupMeta.sejak}</p>
        <div className="mg-hero-copy"><div className="mg-wrap"><p className="mb-3 flex items-center gap-2 text-xs"><MapPin className="size-3.5" />{grupMeta.tempat}</p><h1 className="mg-serif font-bold">{grupMeta.nama}</h1><p className="mg-hand mt-3 text-3xl">{grupMeta.motto}</p><p className="mt-4 text-sm leading-6">Untuk hari biasa yang jadi istimewa,<br />cuma karena ada kalian di dalamnya.</p></div></div>
      </section>
      <nav className="mg-nav" aria-label="Bagian album pertemanan"><div className="mg-wrap mg-nav-inner"><span className="mg-nav-brand mg-serif text-lg font-semibold">Teman Sore<span className="text-primary">.</span></span><div className="mg-nav-links">{[["anggota", "Orangnya"], ["album", "Album"], ["cerita", "Cerita"], ["playlist", "Playlist"], ["pesan", "Pesan"]].map(([id, title]) => <Button key={id} asChild variant="ghost" size="sm"><a href={`#${id}`}>{title}</a></Button>)}</div></div></nav>
      <div className="mg-wrap"><div className="mg-stats"><div><strong>{anggotaGrup.length} teman</strong><span>Banyak cara saling jaga</span></div><div><strong>Sejak {grupMeta.sejak}</strong><span>Berawal dari satu meja</span></div><div><strong>∞ cerita</strong><span>Belum selesai ditulis</span></div></div></div>
      <section id="anggota" className="mg-wrap mg-section">
        <Heading label="01 / Orang-orangnya">Bukan geng paling ramai.<br />Tapi selalu ada.</Heading>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Satu suka merencanakan, satu suka mendengarkan. Satu menyimpan foto, satu memilih lagu. Entah bagaimana, semuanya pas kalau duduk bersama.</p>
        <div className="mt-9 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">{anggotaGrup.map((a, i) => <article className="mg-member" key={a.id}><div className="mg-portrait"><img src={a.foto} alt={`Foto ${a.nama}, anggota Teman Sore`} width={400} height={500} loading="lazy" /><span className="mg-portrait-number">0{i + 1}</span></div><div className="p-5"><h3>{a.nama}</h3><p className="mg-member-label mt-1">{a.julukan}</p><p className="mt-3 text-xs font-semibold text-primary">{a.kesibukan}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{a.kebiasaan}</p><div className="mt-5 border-t border-border pt-4"><p className="text-[10px] font-semibold uppercase text-muted-foreground">Pesanan yang sudah kami hafal</p><p className="mt-2 text-sm">{a.pesanan}</p></div><p className="mg-hand mt-5 text-2xl leading-snug">“{a.quote}”</p></div></article>)}</div>
        <div className="mg-rituals mt-14"><p className="mg-hand text-3xl text-primary">Hal-hal kecil yang bikin kita tetap kita.</p><div className="mt-7 grid gap-8 md:grid-cols-3">{kebiasaanGrup.map((k) => <div key={k.nomor}><span className="mg-serif text-2xl text-primary">{k.nomor}</span><h3 className="mt-3 text-base font-semibold">{k.judul}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{k.teks}</p></div>)}</div></div>
      </section>
      <Album />
      <section id="cerita" className="mg-story-band"><div className="mg-wrap mg-section"><Heading label="03 / Dari dulu sampai sekarang">Kita nggak langsung sedekat ini.</Heading><ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{ceritaGrup.map((c) => <li key={c.tahun} className="border-t border-primary/30 pt-5"><p className="mg-serif text-4xl text-primary">{c.tahun}</p><h3 className="mt-5 text-lg font-semibold leading-6">{c.judul}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{c.teks}</p></li>)}</ol><p className="mg-hand mt-10 text-3xl text-primary">Ada yang berubah. Ada yang tetap: kita.</p></div></section>
      <section id="playlist" className="mg-wrap mg-section"><Heading label="04 / Soundtrack pertemanan">Kalau lagu ini diputar,<br />rasanya kembali ke sana.</Heading><div className="mt-9 divide-y divide-border border-y border-border">{playlistGrup.map((lagu, i) => <a key={lagu.judul} href={cariLaguUrl(lagu.judul, lagu.artis)} target="_blank" rel="noopener noreferrer" aria-label={`Cari ${lagu.judul} oleh ${lagu.artis} di Spotify`} className="group flex items-center gap-4 py-6"><span className="w-6 shrink-0 text-xs text-muted-foreground">0{i + 1}</span><Music2 className="size-6 shrink-0 text-primary" /><span className="min-w-0 flex-1"><span className="block text-base font-semibold">{lagu.judul}</span><span className="mt-1 block text-xs text-muted-foreground">{lagu.artis} · Pilihan {lagu.dari}</span><span className="mt-2 block text-sm text-muted-foreground">{lagu.cerita}</span></span><ArrowUpRight className="mg-playlist-link size-5 shrink-0 transition-transform group-hover:-translate-y-0.5" /></a>)}</div></section>
      <Pesan />
      <footer className="mg-closing"><div className="mg-wrap"><Heart className="mx-auto mb-5 size-6 text-primary" /><p className="mg-serif text-3xl font-semibold">Sampai ketemu di sore berikutnya.</p><p className="mg-hand mt-3 text-3xl text-primary">Satu kursi selalu disisakan buat kamu.</p><Button asChild variant="outline" className="mt-8"><Link href="/year-book"><ArrowLeft />Momen Digital<ArrowRight /></Link></Button><p className="mt-9 text-xs text-muted-foreground">Teman Sore · Sebuah album oleh Nempo</p></div></footer>
    </main>
  </Layout>;
}