import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { CommunityApplicationForm } from "@/components/community-application-form";
import { KegiatanSlider } from "@/components/kegiatan-slider";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  Code2,
  Footprints,
  GraduationCap,
  Instagram,
  Lightbulb,
  MapPin,
  Megaphone,
  Mic2,
  Music2,
  Palette,
  School,
  Clapperboard,
  Users,
} from "lucide-react";
import communityHeroImage from "@/assets/komunitas-hero.jpg";
import communityMusicImage from "@/assets/komunitas-musik.jpg";
import communityArtImage from "@/assets/komunitas-seni.jpg";
import communityCreatorImage from "@/assets/komunitas-kreator.jpg";
import communityWebImage from "@/assets/komunitas-webdev.jpg";
import communityMarketingImage from "@/assets/komunitas-marketing.jpg";
import { hobbyOptions, interestOptions, originOptions } from "@/data/community-recruitment";
import kegiatanDapoer from "@/assets/kalamuda-kegiatan-dapoer-nyunda.webp";
import kegiatanMakan from "@/assets/kalamuda-kegiatan-makan-bersama.webp";
import kegiatanPodcast from "@/assets/kalamuda-kegiatan-podcast-malam.webp";
import kegiatanAkustik from "@/assets/kalamuda-kegiatan-akustik.webp";
import kegiatanTari from "@/assets/kalamuda-kegiatan-tari-musicomedy.webp";
import kegiatanNongkrongOutdoor from "@/assets/kalamuda-kegiatan-nongkrong-outdoor.jpg";
import kegiatanBasecamp from "@/assets/kalamuda-kegiatan-basecamp.jpg";
import kegiatanGoodStory from "@/assets/kalamuda-kegiatan-good-story-cafe.jpg";
import kegiatanHunting from "@/assets/kalamuda-kegiatan-hunting-foto.jpg";

const kegiatanPhotos = [
  { src: kegiatanDapoer, caption: "Dapoer Nyunda", tag: "Kuliner" },
  { src: kegiatanMakan, caption: "Makan bersama", tag: "Kebersamaan" },
  { src: kegiatanPodcast, caption: "Rekaman podcast malam", tag: "Kreator" },
  { src: kegiatanAkustik, caption: "Jamming akustik", tag: "Musik" },
  { src: kegiatanTari, caption: "Tari di MusiComedy Night", tag: "Tari" },
  { src: kegiatanNongkrongOutdoor, caption: "Nongkrong sore bareng", tag: "Kebersamaan" },
  { src: kegiatanBasecamp, caption: "Kumpul di basecamp", tag: "Kebersamaan" },
  { src: kegiatanGoodStory, caption: "Nongkrong di Good Story Cafe", tag: "Nongkrong" },
  { src: kegiatanHunting, caption: "Foto bareng satu tim", tag: "Kebersamaan" },
];

// Kategori asal — sama dengan pilihan "Asal" di formulir pendaftaran.
const focusAreas = [
  {
    icon: School,
    title: "Sekolah",
    description:
      "Pelajar SMP, SMA, atau SMK. Cukup tulis nama sekolahmu di formulir — mulai berkarya sejak sekarang.",
  },
  {
    icon: GraduationCap,
    title: "Kuliah / Univ",
    description:
      "Mahasiswa dari kampus mana pun. Tulis nama kampusmu, lalu bawa ilmu dan idemu ke proyek nyata.",
  },
  {
    icon: Users,
    title: "Umum",
    description:
      "Sudah bekerja, freelance, atau sedang cari kegiatan baru? Tetap boleh daftar dan ikut bergerak.",
  },
];

// Pilihan minat — urutan & nama sama dengan pilihan "Minat" di formulir.
type Track = {
  icon: typeof Palette;
  title: string;
  description: string;
  accent: string;
  tag: string;
  image: string;
};

const trackDetails: Record<(typeof interestOptions)[number], Omit<Track, "title">> = {
  Designer: {
    icon: Palette,
    description: "Desain grafis, ilustrasi, dan visual untuk poster, feed, serta kebutuhan brand dan acara.",
    accent: "#6e4bb4",
    tag: "Desain",
    image: communityArtImage,
  },
  "Web Developer": {
    icon: Code2,
    description: "Bikin website dan aplikasi untuk event, UMKM, dan komunitas — dari tampilan sampai sistemnya.",
    accent: "#1f7a6d",
    tag: "Web",
    image: communityWebImage,
  },
  "Content Creator": {
    icon: Clapperboard,
    description: "Ide konten, naskah, dan tampil di depan kamera untuk Instagram, TikTok, dan podcast.",
    accent: "#bd4d8b",
    tag: "Konten",
    image: kegiatanPodcast,
  },
  "Videografer dan Fotographer": {
    icon: Camera,
    description: "Dokumentasi acara, foto produk, dan video highlight — belajar langsung di lapangan.",
    accent: "#2563c7",
    tag: "Visual",
    image: communityCreatorImage,
  },
  Marketing: {
    icon: Megaphone,
    description: "Strategi promosi, sosmed, dan kerja sama sponsor supaya acara dan karya dikenal lebih luas.",
    accent: "#c2581f",
    tag: "Promosi",
    image: communityMarketingImage,
  },
  "Event Management": {
    icon: CalendarDays,
    description: "Rundown, koordinasi tim, dan panggung — jadi bagian dari tim di balik acara Nempo.",
    accent: "#b33a82",
    tag: "Event",
    image: communityMusicImage,
  },
};

const communityTracks: Track[] = interestOptions.map((title) => ({
  title,
  ...trackDetails[title],
}));

const hobbyIcons: Record<string, typeof Palette> = {
  Tari: Footprints,
  Bernyanyi: Mic2,
  Musik: Music2,
  Lainnya: Lightbulb,
};

const waysToJoin = [
  {
    number: "01",
    title: "Datang dan kenalan",
    description:
      "Ikuti kegiatan yang paling dekat dengan minatmu. Tidak perlu menunggu jadi ahli untuk mulai datang.",
  },
  {
    number: "02",
    title: "Bawa sesuatu",
    description:
      "Bisa karya, ide, pengalaman, atau sekadar waktu dan tenaga. Semua punya tempat di sini.",
  },
  {
    number: "03",
    title: "Ajak yang lain",
    description:
      "Komunitas tumbuh dari orang-orang yang mau saling mengenalkan, membantu, dan membuka ruang.",
  },
];

const marqueeWords = [...interestOptions, ...hobbyOptions.filter((h) => h !== "Lainnya")];

export default function KomunitasPage() {
  return (
    <Layout>
      <SEO
        title="Kala Muda — Komunitas Anak Muda Jawa Barat"
        description="Kala Muda adalah ruang anak muda Jawa Barat untuk menemukan karya, event, komunitas, dan peluang untuk berkarya bersama."
        keywords="Kala Muda, komunitas anak muda Jawa Barat, event Jawa Barat, karya anak muda"
        path="/komunitas"
      />

      <main className="min-h-screen overflow-hidden bg-[#f5f5ff] text-[#37215b]">
        {/* ===== HERO ===== */}
        <section className="relative border-b border-[#dce4fb] bg-[#eaf0ff]">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#d85da4]/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#6e4bb4]/10 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-20 lg:pt-20">
            <div>
              <span className="inline-flex items-center rounded-full border border-[#a62f78]/25 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a62f78]">
                Komunitas oleh Kala Muda
              </span>
              <h1 className="mt-5 max-w-xl text-[clamp(2.5rem,5.4vw,4.6rem)] font-black leading-[1.02] tracking-[-0.045em] text-[#182b39]">
                Bikin sesuatu.
                <br />
                <span className="bg-gradient-to-r from-[#a62f78] via-[#b33a82] to-[#6e4bb4] bg-clip-text text-transparent">
                  Bareng-bareng.
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-[#5f6b6f] sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
                Kala Muda adalah ruang untuk anak muda Jawa Barat yang suka
                berkarya, datang ke acara, bertemu orang baru, dan punya cerita
                untuk dibagikan.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <a
                  href="https://www.kalamuda.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#a62f78] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7b2866]/25 transition hover:-translate-y-0.5 hover:bg-[#862761] sm:w-auto"
                >
                  Kenali Kala Muda
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/kalamudacom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#c8c8e7] bg-white/80 px-6 py-3.5 text-sm font-bold text-[#49346e] transition hover:-translate-y-0.5 hover:border-[#a62f78]/50 hover:bg-white sm:w-auto"
                >
                  <Instagram className="h-4 w-4" />
                  Ikuti kabarnya
                </a>
              </div>
              <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-[#d8def5] pt-6 sm:mt-10">
                {[
                  { value: String(interestOptions.length), label: "Pilihan minat" },
                  { value: String(originOptions.length), label: "Kategori asal" },
                  { value: "0", label: "Biaya daftar" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-2xl font-black tracking-tight text-[#37215b] sm:text-3xl">
                      {stat.value}
                    </dd>
                    <dd className="mt-1 text-[11px] font-semibold text-[#778084] sm:text-xs">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div
                aria-hidden
                className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full border-2 border-dashed border-[#b9c8f4] sm:-bottom-7 sm:-left-7"
              />
              <figure className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_70px_rgba(59,45,112,.22)]">
                <img
                  src={communityHeroImage}
                  alt="Anak muda berkumpul, bermusik, dan berkarya bersama di alam terbuka"
                  width={1600}
                  height={1200}
                  className="aspect-[4/3.4] h-full w-full object-cover object-center sm:aspect-[4/3.1]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#39205f]/45 via-transparent to-transparent"
                />
                <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl bg-[#39205f]/90 px-4 py-3 text-white backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-4">
                  <span className="text-[11px] font-semibold sm:text-xs">
                    Ruang untuk saling menemukan
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-white/60 sm:text-[10px] sm:tracking-[0.18em]">
                    <MapPin className="h-3 w-3" />
                    Jawa Barat
                  </span>
                </figcaption>
              </figure>
              <div className="absolute right-3 -top-4 rounded-2xl border border-[#d8cfee] bg-white px-3.5 py-3 shadow-lg shadow-[#3d2a71]/10 sm:-right-6 sm:-top-6 sm:px-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#a62f78]">
                  Bukan penonton
                </p>
                <p className="mt-1 text-xs font-black text-[#39205f] sm:text-sm">
                  Jadi bagian.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MARQUEE ===== */}
        <div className="overflow-hidden border-b border-[#e3dcd3] bg-[#39205f] py-3.5">
          <div className="flex w-max animate-[komunitas-marquee_28s_linear_infinite] items-center gap-8">
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="flex items-center gap-8 text-sm font-bold uppercase tracking-[0.22em] text-white/80"
              >
                {word}
                <span className="h-1.5 w-1.5 rounded-full bg-[#d85da4]" />
              </span>
            ))}
          </div>
        </div>

        {/* ===== FOCUS AREAS ===== */}
        <section className="border-b border-[#e3dcd3] bg-white">
          <div className="mx-auto max-w-7xl px-4 pt-9 sm:px-6 lg:px-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a62f78]">
              Siapa yang bisa daftar
            </span>
          </div>
          <div className="mx-auto grid max-w-7xl gap-px bg-[#dfe5f8] px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {focusAreas.map((area, index) => (
              <article
                key={area.title}
                className="group bg-white px-1 py-9 transition sm:px-6 sm:py-11 lg:px-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee5fb] text-[#a62f78] transition group-hover:scale-105 group-hover:bg-[#a62f78] group-hover:text-white">
                    <area.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-[#a62f78]">
                    0{index + 1}
                  </span>
                </div>
                <h2 className="mt-5 text-lg font-black text-[#37215b]">
                  {area.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#62677c]">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ===== COMMUNITY TRACKS ===== */}
        <section className="bg-[#f5f5ff]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex flex-col gap-5 border-b border-[#dedff5] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a62f78]">
                  Pilihan minat
                </span>
                <h2 className="mt-2 max-w-2xl text-2xl font-black leading-tight tracking-[-0.035em] text-[#37215b] sm:text-3xl lg:text-4xl">
                  Pilih minatmu saat mendaftar.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#62677c]">
                Enam pilihan ini sama persis dengan pilihan minat di formulir.
                Pilih yang paling dekat denganmu — belum ahli juga tidak apa-apa.
              </p>
            </div>

            <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
              {communityTracks.map((track, index) => (
                <article
                  key={track.title}
                  className="group relative w-[82%] shrink-0 snap-center sm:w-auto overflow-hidden rounded-3xl bg-white shadow-[0_8px_25px_rgba(61,42,113,.07)] transition hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(61,42,113,.15)]"
                >
                  {track.image ? (
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={track.image}
                        alt={track.title}
                        width={1024}
                        height={768}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"
                      />
                      <span
                        className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
                        style={{ backgroundColor: `${track.accent}cc` }}
                      >
                        {track.tag}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="h-2 w-full"
                      style={{
                        background: `linear-gradient(90deg, ${track.accent}, ${track.accent}55)`,
                      }}
                    />
                  )}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          color: track.accent,
                          backgroundColor: `${track.accent}16`,
                        }}
                      >
                        <track.icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold text-[#aaa9bf]">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <h3 className="text-base font-black text-[#37215b]">
                        {track.title}
                      </h3>
                      {!track.image && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.14em]"
                          style={{ color: track.accent }}
                        >
                          {track.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#62677c]">
                      {track.description}
                    </p>
                    <a
                      href="#gabung"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#a62f78] transition hover:gap-2"
                    >
                      Daftar sebagai {track.title}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Hobi — sama dengan pilihan "Hobi" di formulir */}
            <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-[#dedff5] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a62f78]">
                  Punya hobi?
                </p>
                <p className="mt-1 text-sm font-semibold text-[#3f3564]">
                  Ceritakan juga di formulir — boleh pilih lebih dari satu.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {hobbyOptions.map((hobby) => {
                  const Icon = hobbyIcons[hobby] ?? Lightbulb;
                  return (
                    <span
                      key={hobby}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f0ff] px-3.5 py-2 text-xs font-bold text-[#37215b]"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#a62f78]" />
                      {hobby === "Lainnya" ? "Lainnya (isi sendiri)" : hobby}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ===== STORY / QUOTE ===== */}
        <section className="relative overflow-hidden border-y border-[#d9daf3] bg-[#e8eaff]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#d85da4]/10 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-8">
            <div>
              <h2 className="max-w-md text-2xl font-black leading-tight tracking-[-0.04em] text-[#37215b] sm:text-3xl lg:text-4xl">
                Datang dengan rasa ingin tahu.
                <br />
                <span className="text-[#a62f78]">Pulang bawa cerita.</span>
              </h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-base font-semibold leading-7 text-[#3f3564] sm:text-lg sm:leading-8 lg:text-xl">
                Komunitas bukan sekadar tempat berkumpul. Ia dibangun dari
                obrolan kecil, orang yang mau membantu, dan keberanian untuk
                mulai memperkenalkan diri.
              </p>
              <p className="mt-5 text-sm leading-7 text-[#62677c]">
                Kala Muda membuka ruang untuk musik, seni, komunitas, dan
                ide-ide baru. Kegiatannya dibuat agar kamu bisa datang sebagai
                dirimu sendiri, mencoba hal baru, lalu menemukan orang-orang
                yang punya semangat serupa.
              </p>
              <a
                href="https://www.instagram.com/kalamudacom/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#a62f78] transition hover:gap-3"
              >
                Lihat kegiatan Kala Muda
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a62f78]">
              Kegiatan
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#37215b] sm:text-3xl lg:text-4xl">
              Momen bersama Kala Muda
            </h2>
            <KegiatanSlider photos={kegiatanPhotos} />
          </div>
        </section>

        {/* ===== WAYS TO JOIN ===== */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a62f78]">
                Cara ikut
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#37215b] sm:text-3xl lg:text-4xl">
                Tidak perlu menunggu semuanya siap.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#62677c]">
                Hal-hal baik biasanya dimulai dari langkah yang sederhana.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {waysToJoin.map((way) => (
                <article
                  key={way.number}
                  className="group relative overflow-hidden rounded-3xl border border-[#e5e2f5] bg-[#faf9ff] p-6 transition hover:-translate-y-1 hover:border-[#a62f78]/30 hover:shadow-[0_16px_40px_rgba(61,42,113,.10)] sm:p-7"
                >
                  <span className="text-4xl font-black tracking-tight text-[#e3dcf5] transition group-hover:text-[#a62f78]/25 sm:text-5xl">
                    {way.number}
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[#37215b]">
                    {way.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#62677c]">
                    {way.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OPEN RECRUITMENT FORM ===== */}
        <section id="gabung" className="border-y border-[#d9daf3] bg-[#f5f5ff]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.85fr_1.15fr] lg:gap-16 lg:px-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a62f78]">
                Open recruitment
              </span>
              <h2 className="mt-2 max-w-md text-2xl font-black leading-tight tracking-[-0.04em] text-[#37215b] sm:text-3xl lg:text-4xl">
                Daftar jadi bagian
                <br />
                <span className="text-[#a62f78]">Kala Muda Community.</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#62677c]">
                Isi formulir singkat ini dan ceritakan minatmu. Tim kami akan
                menghubungimu lewat WhatsApp untuk langkah berikutnya.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Asal: Sekolah, Kuliah / Univ, atau Umum",
                  `Pilih satu dari ${interestOptions.length} minat: ${interestOptions.join(", ")}`,
                  "Hobi boleh lebih dari satu: Tari, Bernyanyi, Musik, atau isi sendiri",
                  "Tanpa biaya — isian langsung terkirim ke WhatsApp tim kami",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm font-semibold text-[#3f3564]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a62f78]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <CommunityApplicationForm />
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="relative overflow-hidden bg-[#39205f] text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#d85da4]/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#6e4bb4]/25 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f0a9d0]">
                <Users className="h-3.5 w-3.5" />
                Terbuka untuk semua
              </span>
              <h2 className="mt-5 max-w-2xl text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl lg:text-4xl">
                Punya ide, karya, atau acara yang ingin dibawa ke lebih banyak
                orang?
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                Ceritakan ke kami. Bisa mulai dari pesan singkat di Instagram.
                Kami terbuka untuk bertemu dengan komunitas, kreator, dan anak
                muda yang ingin membuat sesuatu di Jawa Barat.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#gabung"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d85da4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#c44791]"
                >
                  Daftar sekarang
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/kalamudacom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                >
                  Sapa Kala Muda
                  <Instagram className="h-4 w-4" />
                </a>
                <Link
                  href="/event"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                >
                  Lihat event di Nempo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="border-l border-white/15 pl-6 lg:pl-10">
              <p className="text-4xl font-black leading-none tracking-[-0.06em] text-[#f0a9d0] sm:text-5xl lg:text-6xl">
                Ayo,
                <br />
                mulai.
              </p>
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
                Satu perkenalan bisa menjadi awal dari banyak hal yang baik.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
