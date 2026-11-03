import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, BookOpen, 
  GraduationCap, Globe2, Compass, ShieldCheck, Award
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';

export const ProgramPage: React.FC = () => {
  const { siteInfo: STORE_SITE_INFO, programs } = useAppStoreData();
  const SITE_INFO = STORE_SITE_INFO || FALLBACK_SITE_INFO;

  // Temukan program dari store berdasarkan ID
  const tahfidzProg = programs.find((p: any) => p.id === 'tahfidz');
  const diniyahProg = programs.find((p: any) => p.id === 'diniyah');
  const formalProg = programs.find((p: any) => p.id === 'formal');
  const ekskulProg = programs.find((p: any) => p.id === 'ekskul');
  return (
    <div className="space-y-16 pt-8 pb-20">
      {/* Program Showcase List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* ---------------------------------------------------- */}
        {/* PROGRAM 01: TAHFIDZUL QUR'AN (Teks Kiri, Foto Kanan) */}
        {/* ---------------------------------------------------- */}
        <article id="tahfidz" className="scroll-mt-24 border-b border-emerald-100/70 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Category Breadcrumb */}
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Program Unggulan Utama</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-semibold">Tahfidz Bersanad</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Tahfidzul Qur'an 30 Juz Bersanad
                </h2>
                <p className="text-sm sm:text-base text-emerald-800 font-medium">
                  Mencetak penghafal Al-Qur'an mutqin dengan sanad keilmuan yang bersambung.
                </p>
              </div>

              {/* Horizontal Inset Image with Floating Pill */}
              <div className="relative group overflow-hidden rounded-2xl border border-emerald-100 shadow-sm bg-slate-50">
                <img
                  src={tahfidzProg?.image || "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80"}
                  alt="Suasana Halaqah Tahfidz Al-Mursyid"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Action Pill */}
                <div className="absolute right-4 bottom-4">
                  <a
                    href={SITE_INFO.contacts.ppdbWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/95 hover:bg-forest-900 hover:text-white text-forest-900 border border-emerald-200/80 shadow-md px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Konsultasi Program Tahfidz</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                  </a>
                </div>
              </div>

              {/* Two-Column Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div className="space-y-1.5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                    Metode & Halaqah
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bimbingan intensif halaqah kecil (maksimal 12 santri) dengan setoran harian ba'da subuh dan maghrib menggunakan metode Talaqqi dan Ziyadah mandiri.
                  </p>
                </div>
                <div className="space-y-1.5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Uji & Sanad
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Evaluasi berkala tasmi' 5 hingga 30 juz sekali duduk di hadapan dewan asatidz dan pengijazahan sanad tahfidz bagi santri purna yang telah teruji mutqin.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Tall Feature Photo with Side Label & Large Number */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-200/80 shadow-md bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1000&q=80"
                  alt="Mushaf Al-Qur'an dan Pembinaan Santri"
                  className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                
                {/* Vertical Side Tag */}
                <div className="absolute top-6 left-6 [writing-mode:vertical-lr] rotate-180 text-[10px] uppercase font-bold tracking-widest text-white/95 drop-shadow bg-forest-950/40 px-1 py-2 rounded backdrop-blur-xs">
                  Est. 2022 — Al-Mursyid
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent p-6 flex items-end justify-between text-white pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-300">Kota Agung Timur</p>
                    <p className="text-xs font-medium text-slate-200">Tanggamus, Lampung</p>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white/90">
                    01
                  </div>
                </div>
              </div>
            </div>

          </div>
        </article>


        {/* ---------------------------------------------------- */}
        {/* PROGRAM 02: KAJIAN KITAB KUNING (Foto Kiri, Teks Kanan) */}
        {/* ---------------------------------------------------- */}
        <article id="diniyah" className="scroll-mt-24 border-b border-emerald-100/70 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Tall Feature Photo */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-200/80 shadow-md bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=1000&q=80"
                  alt="Kajian Kitab Kuning Pesantren"
                  className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                
                {/* Vertical Side Tag */}
                <div className="absolute top-6 left-6 [writing-mode:vertical-lr] rotate-180 text-[10px] uppercase font-bold tracking-widest text-white/95 drop-shadow bg-forest-950/40 px-1 py-2 rounded backdrop-blur-xs">
                  Turats Salafus Shalih
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent p-6 flex items-end justify-between text-white pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-300">Madrasah Diniyah</p>
                    <p className="text-xs font-medium text-slate-200">Dirasah Islamiyah</p>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white/90">
                    02
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-between space-y-6">
              {/* Category Breadcrumb */}
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Khazanah Keilmuan Ulama</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-semibold">Dirasah Turats</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Madrasah Diniyah & Kajian Kitab Kuning
                </h2>
                <p className="text-sm sm:text-base text-emerald-800 font-medium">
                  Mendalami literatur klasik berjenjang demi kedalaman ilmu fikih dan keluhuran akhlak.
                </p>
              </div>

              {/* Horizontal Inset Image with Floating Pill */}
              <div className="relative group overflow-hidden rounded-2xl border border-emerald-100 shadow-sm bg-slate-50">
                <img
                  src={diniyahProg?.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80"}
                  alt="Kitab Turats dan Kajian Pesantren"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Action Pill */}
                <div className="absolute right-4 bottom-4">
                  <a
                    href={SITE_INFO.contacts.ppdbWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/95 hover:bg-forest-900 hover:text-white text-forest-900 border border-emerald-200/80 shadow-md px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Detail Silabus Diniyah</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                  </a>
                </div>
              </div>

              {/* Two-Column Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div className="space-y-1.5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Tata Bahasa & Nahwu Shorof
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Penguatan kaidah tata bahasa Arab melalui kitab Al-Ajurumiyyah, Nadhom Imrithi, hingga Alfiyah Ibnu Malik sebagai kunci memahami teks gundul.
                  </p>
                </div>
                <div className="space-y-1.5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Fikih & Tasawuf
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kajian hukum amaliyah bermazhab Syafi'i (Safinatun Najah, Fathul Qorib) berpadu dengan kemurnian tauhid dan adab penuntut ilmu (Ta'lim Muta'allim).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </article>


        {/* ---------------------------------------------------- */}
        {/* PROGRAM 03: PENDIDIKAN FORMAL (Teks Kiri, Foto Kanan) */}
        {/* ---------------------------------------------------- */}
        <article id="formal" className="scroll-mt-24 border-b border-emerald-100/70 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Category Breadcrumb */}
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Pendidikan Formal Terakreditasi</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-semibold">SMP & SMA IT</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  SMP & SMA Islam Boarding School
                </h2>
                <p className="text-sm sm:text-base text-emerald-800 font-medium">
                  Kurikulum nasional Kurikulum Merdeka yang diperkaya wawasan sains, komputer, dan teknologi.
                </p>
              </div>

              {/* Horizontal Inset Image with Floating Pill */}
              <div className="relative group overflow-hidden rounded-2xl border border-emerald-100 shadow-sm bg-slate-50">
                <img
                  src={formalProg?.image || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"}
                  alt="Laboratorium dan Ruang Belajar Formal"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Action Pill */}
                <div className="absolute right-4 bottom-4">
                  <Link
                    to="/ppdb"
                    className="bg-white/95 hover:bg-forest-900 hover:text-white text-forest-900 border border-emerald-200/80 shadow-md px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Informasi Jalur Masuk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                  </Link>
                </div>
              </div>

              {/* Two-Column Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div className="space-y-1.5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                    Ijazah & Jalur PTN
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lulusan menerima ijazah resmi negara berakreditasi lengkap, siap bersaing dalam seleksi masuk PTN unggulan, sekolah kedinasan, maupun beasiswa internasional.
                  </p>
                </div>
                <div className="space-y-1.5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-700" />
                    Sains & Literasi Digital
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Didukung sarana komputer modern, penguatan sains-matematika, serta pembekalan intensif persiapan UTBK-SNBT oleh para tenaga pendidik berpengalaman.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Tall Feature Photo with Side Label & Large Number */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-200/80 shadow-md bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                  alt="Santri Berprestasi di Kelas Formal"
                  className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                
                {/* Vertical Side Tag */}
                <div className="absolute top-6 left-6 [writing-mode:vertical-lr] rotate-180 text-[10px] uppercase font-bold tracking-widest text-white/95 drop-shadow bg-forest-950/40 px-1 py-2 rounded backdrop-blur-xs">
                  Kurikulum Merdeka — Terakreditasi
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent p-6 flex items-end justify-between text-white pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-300">Jenjang Menengah</p>
                    <p className="text-xs font-medium text-slate-200">Ijazah Resmi Nasional</p>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white/90">
                    03
                  </div>
                </div>
              </div>
            </div>

          </div>
        </article>


        {/* ---------------------------------------------------- */}
        {/* PROGRAM 04: BAHASA & EKSTRAKURIKULER (Foto Kiri, Teks Kanan) */}
        {/* ---------------------------------------------------- */}
        <article id="ekskul" className="scroll-mt-24 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Tall Feature Photo */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-200/80 shadow-md bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
                  alt="Aktivitas Pengembangan Kepribadian dan Kepanduan"
                  className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                
                {/* Vertical Side Tag */}
                <div className="absolute top-6 left-6 [writing-mode:vertical-lr] rotate-180 text-[10px] uppercase font-bold tracking-widest text-white/95 drop-shadow bg-forest-950/40 px-1 py-2 rounded backdrop-blur-xs">
                  Life Skills & Language
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent p-6 flex items-end justify-between text-white pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-300">Arab & Inggris</p>
                    <p className="text-xs font-medium text-slate-200">Kemandirian & Karakter</p>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white/90">
                    04
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-between space-y-6">
              {/* Category Breadcrumb */}
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>Pengembangan Minat & Bakat</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-semibold">Bahasa & Kepemimpinan</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Pembiasaan Bahasa & Ekstrakurikuler
                </h2>
                <p className="text-sm sm:text-base text-emerald-800 font-medium">
                  Membangun kemandirian raga, jiwa kepemimpinan, dan kecakapan komunikasi global.
                </p>
              </div>

              {/* Horizontal Inset Image with Floating Pill */}
              <div className="relative group overflow-hidden rounded-2xl border border-emerald-100 shadow-sm bg-slate-50">
                <img
                  src={ekskulProg?.image || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"}
                  alt="Aktivitas Bahasa dan Komunikasi Santri"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Action Pill */}
                <div className="absolute right-4 bottom-4">
                  <a
                    href={SITE_INFO.contacts.ppdbWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/95 hover:bg-forest-900 hover:text-white text-forest-900 border border-emerald-200/80 shadow-md px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Ragam Kegiatan Santri</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                  </a>
                </div>
              </div>

              {/* Two-Column Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div className="space-y-1.5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
                    Bilingual Atmosphere
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pembiasaan bahasa Arab & Inggris aktif dalam kehidupan harian asrama dengan dukungan kosa kata tematik harian dan pelatihan pidato (khitobah) 3 bahasa.
                  </p>
                </div>
                <div className="space-y-1.5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    Khat & Kepramukaan
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ekstrakurikuler seni kaligrafi Islam (khat mushaf), pramuka pesantren, bela diri praktis, olahraga sunnah, dan pembentukan karakter kepemimpinan.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </article>

      </main>

      {/* CTA Pendaftaran Selaras dengan Bagian Lain Web */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-aurora-banner text-white rounded-2xl p-8 sm:p-12 border border-emerald-500/20 shadow-lg space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Siap Menjadi Bagian dari Keluarga Besar Al-Mursyid?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
            Pendaftaran dibuka setiap tahun ajaran baru dengan kuota selektif. Konsultasikan jalur pendaftaran bersama tim panitia kami.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/ppdb"
              className="bg-white hover:bg-emerald-50 text-forest-950 font-bold px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 shadow-sm transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <span>Daftar Santri Baru Sekarang</span>
              <ArrowRight className="w-4 h-4 text-forest-900" />
            </Link>
            <a
              href={SITE_INFO.contacts.ppdbWa}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-forest-900/80 hover:bg-forest-900 border border-emerald-400/30 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <span>Hubungi Panitia PPDB</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
