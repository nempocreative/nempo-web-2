import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { ArrowRight, CalendarDays, Lock, MapPin, MessageCircle, Presentation } from "lucide-react";
import { PROGRAM_NEMPO } from "@/data/program";

export default function ProgramPage() {
  return (
    <Layout>
      <SEO
        title="Program Nempo Organizer"
        description="Program dan proposal kolaborasi Nempo Organizer, mulai dari Pasar Seni Garut 2027."
        keywords="program Nempo, Pasar Seni Garut, proposal kolaborasi Nempo"
        path="/program"
      />
      <main className="min-h-screen bg-white text-[#17233a]">
        <section className="text-white" style={{ background: "linear-gradient(145deg, #0F766E 0%, #14B8A6 100%)" }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/60">Nempo Organizer</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">Program</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Program yang sedang kami siapkan bersama mitra. Proposal lengkap bisa dibuka dengan kata sandi dari tim Nempo.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAM_NEMPO.map((p) => (
              <Link
                key={p.slug}
                href={`/program/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden bg-psg-bg">
                  <img src={p.sampul} alt={p.judul} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-psg-bg/90 via-psg-bg/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-psg-accent">{p.mitra}</p>
                    <p className="font-psg-display text-2xl font-black text-psg-text">{p.judul}</p>
                  </div>
                  {p.terkunci && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-psg-bg/80 px-2.5 py-1 text-[11px] font-semibold text-psg-text backdrop-blur">
                      <Lock className="h-3 w-3" /> Pakai kata sandi
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-psg-display text-sm italic text-[#0F766E]">{p.tagline}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.ringkas}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.sorotan.map((s) => (
                      <li key={s} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{s}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {p.tahun}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.lokasi}</span>
                    <span className="inline-flex items-center gap-1"><Presentation className="h-3.5 w-3.5" /> {p.jumlahSlide} slide</span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0F766E]">
                    Buka proposal <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-xl text-center">
            <h2 className="text-lg font-black">Mau ikut atau jadi mitra?</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Hubungi tim Nempo untuk kata sandi proposal atau ajakan kerja sama.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0F766E] px-5 py-3 text-sm font-bold text-white">
              <MessageCircle className="h-4 w-4" /> Hubungi kami
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
