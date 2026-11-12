import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { CalendarRange, MessageCircle } from "lucide-react";

export default function ProgramPage() {
  return (
    <Layout>
      <SEO
        title="Program Nempo Organizer"
        description="Daftar program Nempo Organizer yang bisa Anda ikuti atau ajak kerja sama."
        keywords="program Nempo, program Nempo Organizer, kegiatan Nempo"
        path="/program"
      />
      <main className="min-h-screen bg-white text-[#17233a]">
        <section className="text-white" style={{ background: "linear-gradient(145deg, #0F766E 0%, #14B8A6 100%)" }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/60">Nempo Organizer</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">Program</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Program-program Nempo akan tampil di sini.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <CalendarRange className="mx-auto h-12 w-12 text-[#0F766E]" />
          <h2 className="mt-4 text-xl font-black">Daftar program sedang disiapkan</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">Ingin tahu program terbaru atau mengajak kerja sama? Hubungi tim Nempo.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F766E] px-5 py-3 text-sm font-bold text-white">
            <MessageCircle className="h-4 w-4" /> Hubungi kami
          </Link>
        </section>
      </main>
    </Layout>
  );
}
