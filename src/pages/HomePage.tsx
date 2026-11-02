import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, BookOpen, GraduationCap, 
  Building2, Users, CheckCircle2,
  Award, Compass, PhoneCall, Calendar, Sparkles, Languages,
  Library, HeartHandshake, MapPin, Check
} from 'lucide-react';
import { SITE_INFO, PROGRAMS, FACILITIES, NEWS_DATA } from '../data/siteData';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80",
    title: "Mencetak Generasi Qur'ani, Berakhlak, dan Berprestasi",
    subtitle: "Pondok Pesantren Al-Mursyid Islamic Boarding School Tanggamus memadukan keutamaan Tahfidzul Qur'an, Madrasah Diniyah, dan Pendidikan Formal Terpadu.",
    badge: "Penerimaan Santri Baru Telah Dibuka"
  },
  {
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80",
    title: "Pendidikan Holistik Berkarakter Ahlussunnah wal Jama'ah",
    subtitle: "Didampingi asatidz berkompeten dalam lingkungan asrama yang islami, disiplin, dan aman di kaki pegunungan Way Lalaan Tanggamus.",
    badge: "Legalitas Terdaftar Resmi Kemenkumham & Kemenag"
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80",
    title: "Tahfidzul Qur'an Bersanad & Penguasaan Bahasa Asing",
    subtitle: "Target hafalan mutqin 30 juz diiringi pembiasaan aktif bahasa Arab & Inggris untuk menyiapkan generasi pemimpin umat masa depan.",
    badge: "Kurikulum Terpadu & Terakreditasi"
  }
];

const STRIP_PILLARS = [
  {
    icon: BookOpen,
    title: "Tahfidzul Qur'an",
    desc: "Target 30 Juz mutqin bersanad muttashil",
    tag: "30 Juz"
  },
  {
    icon: Award,
    title: "Madrasah Diniyah",
    desc: "Kajian turats salaf & fiqih tematik",
    tag: "Kitab Kuning"
  },
  {
    icon: GraduationCap,
    title: "SMP & SMA Islam",
    desc: "Kurikulum nasional terakreditasi resmi",
    tag: "Formal"
  },
  {
    icon: Languages,
    title: "Bilingual Habit",
    desc: "Aktif bahasa Arab & Inggris sehari-hari",
    tag: "Arab & Inggris"
  },
  {
    icon: HeartHandshake,
    title: "Karakter Mandiri",
    desc: "Adab Islami 24 jam di kaki pegunungan",
    tag: "Boarding"
  }
];

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="space-y-0 w-full overflow-x-hidden bg-[#fafaf8] text-slate-800">
      
      {/* 1. HERO SLIDER SECTION (TETAP UTUH TANPA DIUBAH SAMA SEKALI) */}
      <section className="relative w-full min-h-[410px] sm:min-h-[425px] lg:h-[435px] bg-[#070c09] overflow-hidden flex items-start pt-8 sm:pt-9 lg:pt-11 pb-4">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[8000ms]"
            />
            {/* Gradasi Elegan: Hitam Pekat & Emerald Halus di Kiri ke Transparan di Kanan */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(7, 12, 9, 0.98) 0%, rgba(6, 28, 20, 0.90) 35%, rgba(6, 28, 20, 0.45) 70%, rgba(7, 12, 9, 0.15) 100%)'
              }}
            />
            {/* Penyeimbang bayangan bawah untuk perangkat mobile */}
            <div 
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{
                background: 'linear-gradient(to top, rgba(7, 12, 9, 0.92) 0%, transparent 60%)'
              }}
            />
          </div>
        ))}

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-2xl relative min-h-[220px] sm:min-h-[200px]">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 space-y-3 ${
                  index === currentSlide
                    ? 'opacity-100 relative pointer-events-auto'
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                {/* Heading Modern Reguler & Terang Synchronized */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white drop-shadow-sm leading-[1.18]">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg text-stone-100 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                  {slide.subtitle}
                </p>

                {/* Modern Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-0.5">
                  <Link
                    to="/ppdb"
                    className="bg-aurora-btn text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Daftar Santri Baru</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/90" />
                  </Link>
                  
                  <Link
                    to="/kontak"
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-semibold px-5 py-2.5 rounded-xl text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Lihat Lokasi Pondok</span>
                  </Link>
                </div>

                {/* Mini Trust Bar */}
                <div className="pt-2 border-t border-white/20 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-white/90">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SK Kemenkumham 2020</span>
                  </div>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>NSP Kemenag: <strong className="text-white font-mono">{SITE_INFO.legal.nsp}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-10 sm:bottom-12 right-6 sm:right-12 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-gold-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. REFINED FLOATING VALUE PILLARS (Gaya Gambar Trident Public School) */}
      <section className="relative -mt-7 sm:-mt-9 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/90 divide-y md:divide-y-0 md:divide-x divide-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 overflow-hidden">
          {STRIP_PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-5 lg:p-6 flex flex-col items-center text-center group hover:bg-[#f8fbf9] transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 border border-emerald-100 group-hover:scale-105 group-hover:bg-emerald-900 group-hover:text-amber-300 transition-all duration-200 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-emerald-900 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[12px] text-slate-500 mt-1 leading-relaxed max-w-[200px]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PROFIL INSTITUSI & SAMBUTAN (Layout 60/40 dengan Statistik Angka Berkelas) */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Foto Kampus dengan Kartu Badge Terpadu */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80"
                alt="Pondok Pesantren Al-Mursyid"
                className="w-full h-[460px] object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent pointer-events-none" />
              
              {/* Badge Legalitas & Lokasi */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-slate-900">Legalitas & SK Kemenag RI</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Aktif & Terdaftar
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                  <span>NSP Resmi: <strong className="font-mono text-emerald-900">{SITE_INFO.legal.nsp}</strong></span>
                  <span className="text-slate-400">Tanggamus, Lampung</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Informasi & Nilai Keunggulan */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-emerald-900 text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Selamat Datang di Al-Mursyid</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                Pendidikan Pesantren Modern Berakar pada <span className="text-emerald-800">Tradisi Keilmuan Salaf</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Yayasan Almursyid Tanggamus Lampung berikhtiar membangun pusat kaderisasi generasi Qur'ani yang kokoh dalam akidah Ahlussunnah wal Jama'ah, berwawasan global, dan berakhlaqul karimah di lingkungan asri kaki pegunungan Way Lalaan.
            </p>

            {/* Metrik Statistik Eksklusif & Proporsional */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-200/80">
              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 transition-all hover:border-emerald-200/60">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">30 Juz</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Target Mutqin</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Sanad Muttashil</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 transition-all hover:border-emerald-200/60">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">1 : 12</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Rasio Halaqah</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Asatidz Berkompeten</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 transition-all hover:border-emerald-200/60">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">2 Bahasa</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Arab & Inggris</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Pembiasaan 24 Jam</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 transition-all hover:border-emerald-200/60">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">100%</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Ijazah Resmi</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Formal & Pesantren</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/tentang-kami"
                className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Baca Profil & Visi Misi</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </Link>
              <Link
                to="/tentang-kami#legalitas"
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-emerald-800 text-slate-700 hover:text-emerald-900 font-semibold text-xs px-5 py-3.5 rounded-xl transition-colors bg-white"
              >
                <span>Dokumen Legalitas Yayasan</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROGRAM UNGGULAN & KURIKULUM (Layout Seimbang dengan Featured Hero Card) */}
      <section className="py-20 lg:py-24 bg-[#f3f6f4] border-y border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                Akademik & Keagamaan
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Program Pendidikan Unggulan
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              Keseimbangan antara tahfidz Al-Qur'an mutqin, penguasaan kitab turats kuning, kurikulum sekolah resmi, dan pembiasaan bahasa dunia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1: Tahfidz (Pilar Utama) */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-emerald-700">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-900 group-hover:text-amber-300 transition-colors">
                  <BookOpen className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Program Inti</span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors mt-0.5">
                    Tahfidzul Qur'an 30 Juz
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bimbingan talaqqi intensif, ziyadah berjenjang, dan muraja'ah 5 waktu dengan standar sanad muttashil.
                </p>
                <ul className="space-y-1.5 pt-2 text-xs text-slate-700 border-t border-slate-100">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Target Mutqin 30 Juz</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Halaqah Maksimal 12 Santri</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-100">
                <Link to="/program#tahfidz" className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5">
                  <span>Pelajari Kurikulum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Madrasah Diniyah */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-emerald-700">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-900 group-hover:text-amber-300 transition-colors">
                  <Award className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Turats Salaf</span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors mt-0.5">
                    Madrasah Diniyah
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kajian gramatika Arab (Nahwu & Sharaf), fiqih madzhab Syafi'i, tauhid, hadits, dan adab thalabul ilmi.
                </p>
                <ul className="space-y-1.5 pt-2 text-xs text-slate-700 border-t border-slate-100">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sorogan & Bandongan Kitab</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Pemahaman Aqidah Aswaja</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-100">
                <Link to="/program#diniyah" className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5">
                  <span>Silabus Kitab Kuning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Sekolah Formal SMP & SMA */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-emerald-700">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-900 group-hover:text-amber-300 transition-colors">
                  <GraduationCap className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Resmi Terakreditasi</span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors mt-0.5">
                    SMP & SMA Islam
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Integrasi kurikulum nasional, sains, matematika, serta persiapan lanjut studi ke perguruan tinggi unggulan.
                </p>
                <ul className="space-y-1.5 pt-2 text-xs text-slate-700 border-t border-slate-100">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Ijazah Resmi Kemendikbud</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Laboratorium Komputer & Sains</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-100">
                <Link to="/program#formal" className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5">
                  <span>Kurikulum Formal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Bilingual & Minat Bakat */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-emerald-700">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-900 group-hover:text-amber-300 transition-colors">
                  <Languages className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Global Readiness</span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors mt-0.5">
                    Bilingual & Soft Skills
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pembiasaan percakapan harian Arab-Inggris (*Yaumul Lughah*), seni kaligrafi Islam, dan public speaking.
                </p>
                <ul className="space-y-1.5 pt-2 text-xs text-slate-700 border-t border-slate-100">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Conversation Harian Wajib</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Khitobah & Kaligrafi Santri</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-100">
                <Link to="/program#bilingual" className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5">
                  <span>Ekstrakurikuler</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FASILITAS KAMPUS (Layout Bersih dengan Badging & Foto Jernih) */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Sarana & Prasarana
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lingkungan Belajar Asri & Representatif
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Kawasan sejuk di kaki pegunungan Way Lalaan Tanggamus, dirancang untuk mendukung kenyamanan santri dalam menghafal Al-Qur'an dan beraktivitas.
            </p>
          </div>
          <Link
            to="/fasilitas"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-amber-600 border border-slate-300 hover:border-emerald-800 px-4 py-2.5 rounded-xl transition-all self-start md:self-auto bg-white shadow-xs"
          >
            <span>Lihat Semua Fasilitas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.slice(0, 4).map((fac, idx) => (
            <div key={idx} className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-950/85 backdrop-blur-sm text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-emerald-800">
                  {fac.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {fac.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER PPDB (Deep Emerald & Warm Gold Button ala Gambar 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#063323] rounded-2xl p-7 sm:p-10 lg:p-12 border border-emerald-600/30 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-2xl text-center lg:text-left z-10 w-full">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Penerimaan Santri Baru Tahun Ajaran 2027 / 2028</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Penerimaan Santri Baru (PPDB Online) Resmi Dibuka
            </h2>
            
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              Daftarkan putra-putri Anda untuk menimba ilmu agama, menghafal Al-Qur'an, dan meraih prestasi akademik di lingkungan pesantren yang mandiri dan berkarakter. Kuota santri terbatas setiap tahunnya.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto z-10 shrink-0">
            <Link
              to="/ppdb"
              className="w-full sm:w-auto text-center bg-[#d4973b] hover:bg-[#c2872f] text-slate-950 font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
            <a
              href={SITE_INFO.contacts.ppdbWa}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium px-5 py-3.5 rounded-xl text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>Konsultasi Panitia</span>
            </a>
          </div>

        </div>
      </section>

      {/* 7. BERITA & KEGIATAN PESANTREN */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Warta & Dokumentasi
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Berita & Kegiatan Pesantren
              </h2>
            </div>
            <Link
              to="/berita"
              className="text-xs font-bold text-emerald-900 hover:text-amber-600 inline-flex items-center gap-1.5 border border-slate-300 px-4 py-2 rounded-xl transition-colors"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {NEWS_DATA.map((news) => (
              <article key={news.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{news.date}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-emerald-900 transition-colors">
                      <Link to="/berita">{news.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    to="/berita"
                    className="text-xs font-bold text-emerald-800 group-hover:text-amber-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
