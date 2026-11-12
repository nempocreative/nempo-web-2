import { useEffect, useState, type FormEvent } from "react";
import { Download, LockKeyhole, Mail, Music2, Play, RotateCcw } from "lucide-react";
import { playYearbookSong } from "@/components/yearbook-music-player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { moments } from "@/data/year-book";
import { CAPSULE_MESSAGE_MAX, CAPSULE_STORAGE_KEY, createTimeCapsule, parseTimeCapsule, spotifySearchUrl, yearbookPlaylist, yearbookThemeSong, type TimeCapsule } from "@/lib/yearbook-interactive";

function SectionTitle({ label, title }: { label: string; title: string }) {
  return <div><p className="text-sm font-bold uppercase">{label}</p><h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">{title}</h2></div>;
}

export function YearbookSoundtrack() {
  return <section id="playlist" className="yb-memories px-5 py-20 sm:px-10">
    <div className="mx-auto max-w-6xl">
      <SectionTitle label="Soundtrack angkatan" title="Lagu yang membawa kita pulang" />
      <p className="mt-4 text-muted-foreground">Lagu pilihan angkatan · Angkatan 2026</p>
      <ol className="mt-10 divide-y divide-border">
        {yearbookPlaylist.map((song, index) => <li key={song.title} className="flex items-center gap-4 py-5 sm:gap-6">
          <span className="w-8 shrink-0 font-serif text-2xl text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0 flex-1"><h3 className="text-lg font-bold">{song.title}</h3><p className="text-sm text-muted-foreground">{song.artist}</p><p className="mt-1 text-xs text-primary">{song.moment}</p></div>
          {song.title === yearbookThemeSong.title && song.artist === yearbookThemeSong.artist && <Button size="icon" onClick={playYearbookSong} aria-label={`Putar ${song.title} di halaman ini`} title="Putar di sini"><Play className="fill-current" /></Button>}
          <Button asChild variant="outline" size="icon"><a href={spotifySearchUrl(song.title, song.artist)} target="_blank" rel="noopener noreferrer" aria-label={`Cari ${song.title} di Spotify`} title="Buka di Spotify"><Music2 /></a></Button>
        </li>)}
      </ol>
    </div>
  </section>;
}

export function YearbookFarewellVideo() {
  return <section id="video-perpisahan" className="yb-memories yb-memories-dark px-5 py-20 sm:px-10">
    <div className="mx-auto max-w-6xl">
      <SectionTitle label="Putar kembali" title="Kita pernah sebahagia ini" />
      <p className="mb-8 mt-4 text-muted-foreground">Film kenangan · rangkaian foto sekolah · tanpa musik</p>
      <video className="aspect-video w-full rounded-lg bg-background" controls playsInline preload="metadata" poster={moments[0]?.src} aria-label="Video perpisahan angkatan">
        <source src="/yearbook/perpisahan-angkatan.mp4" type="video/mp4" />
        Browser kamu belum mendukung video.
      </video>
      <Button asChild variant="link" className="mt-4 px-0"><a href="/yearbook/perpisahan-angkatan.mp4" download><Download /> Unduh video</a></Button>
    </div>
  </section>;
}

export function YearbookTimeCapsule() {
  const [capsule, setCapsule] = useState<TimeCapsule | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmReplace, setConfirmReplace] = useState(false);
  useEffect(() => {
    try { setCapsule(parseTimeCapsule(localStorage.getItem(CAPSULE_STORAGE_KEY))); }
    catch { setError("Penyimpanan perangkat tidak tersedia. Coba browser lain."); }
  }, []);
  function submit(event: FormEvent) {
    event.preventDefault();
    const next = createTimeCapsule(name, message, new Date());
    if (!next) { setError("Isi nama dan pesanmu dulu, ya."); return; }
    try { localStorage.setItem(CAPSULE_STORAGE_KEY, JSON.stringify(next)); setCapsule(next); setError(""); }
    catch { setError("Pesan belum tersimpan. Penyimpanan perangkat tidak tersedia."); }
  }
  function download() {
    if (!capsule) return;
    const text = `KAPSUL WAKTU — ANGKATAN 2026\nUntuk: ${capsule.name}\nDibuka: ${new Date(capsule.opensAt).toLocaleDateString("id-ID")}\n\n${capsule.message}\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "kapsul-waktu.txt"; link.click(); URL.revokeObjectURL(url);
  }
  return <section id="kapsul-waktu" className="yb-memories px-5 py-20 sm:px-10">
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
      <div><SectionTitle label="Untuk kamu di masa depan" title="Sampai jumpa, lima tahun lagi." /><p className="mt-5 leading-relaxed text-muted-foreground">Mimpi apa yang sedang kamu kejar? Siapa yang ingin kamu temui lagi? Titipkan cerita hari ini untuk dirimu nanti.</p><p className="mt-5 text-sm text-muted-foreground">Pribadi · tersimpan hanya di browser perangkat ini. Tidak dikirim ke teman atau admin, dan tidak ada pengingat otomatis. Unduh salinan agar tidak hilang saat data browser dibersihkan.</p></div>
      <div>
        {capsule ? <div role="status" className="border-y border-border py-8">
          <LockKeyhole className="h-8 w-8 text-primary" /><h3 className="mt-4 text-2xl font-bold">Suratmu sudah disimpan, {capsule.name}.</h3>
          <p className="mt-3 text-muted-foreground">Untuk dibaca pada <strong>{new Date(capsule.opensAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</strong>.</p>
          <p className="mt-2 text-sm text-muted-foreground">Ini titipan pribadi, bukan surat yang dikunci; salinan unduhan bisa dibaca kapan saja.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button onClick={download}><Download /> Unduh surat</Button><Button variant="outline" onClick={() => setConfirmReplace(true)}><RotateCcw /> Tulis ulang</Button></div>
          {confirmReplace && <div className="mt-5"><p className="text-sm">Ganti surat yang tersimpan di perangkat ini?</p><div className="mt-3 flex gap-3"><Button variant="outline" onClick={() => setConfirmReplace(false)}>Batal</Button><Button onClick={() => { setName(capsule.name); setMessage(capsule.message); setCapsule(null); setConfirmReplace(false); }}>Ya, tulis ulang</Button></div></div>}
        </div> : <form onSubmit={submit} className="space-y-5">
          <div><label htmlFor="capsule-name" className="mb-2 block text-sm font-bold">Namamu</label><Input id="capsule-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={50} required autoComplete="name" /></div>
          <div><label htmlFor="capsule-message" className="mb-2 block text-sm font-bold">Pesan untuk dirimu lima tahun lagi</label><Textarea id="capsule-message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={CAPSULE_MESSAGE_MAX} required rows={7} placeholder="Hai, aku di masa depan…" /><p className="mt-2 text-right text-xs text-muted-foreground">{message.length}/{CAPSULE_MESSAGE_MAX}</p></div>
          <Button type="submit"><Mail /> Simpan kapsul waktu</Button>
        </form>}
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
      </div>
    </div>
  </section>;
}