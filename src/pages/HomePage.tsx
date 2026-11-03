import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, BookOpen, GraduationCap, 
  Building2, Users, CheckCircle2,
  Award, Compass, PhoneCall, Calendar, Sparkles, Languages,
  Library, HeartHandshake, MapPin, Check, ChevronRight, Clock,
  X, ZoomIn, MousePointerClick
} from 'lucide-react';
import { SITE_INFO, PROGRAMS, FACILITIES, NEWS_DATA, LATEST_POSTS, GALLERY_ITEMS } from '../data/siteData';
import { createSlug } from '../utils/slug';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80",
    title: "Mencetak Generasi Qur'ani, Berakhlak, dan Berprestasi",
    subtitle: "Pondok Pesantren Al-Mursyid Islamic Boarding School Tanggamus memadukan keutamaan Tahfidzul Qur'an, Madrasah Diniyah, dan Pendidikan Formal Terpadu.",
    badge: "Penerimaan Santri Baru Telah Dibuka"
  },
  {
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1920&q=80",
    title: "Tahfidzul Qur'an Bersanad & Turats Keilmuan Ulama",
    subtitle: "Target hafalan mutqin 30 juz diiringi penguasaan kaidah kitab klasik dan pembiasaan aktif bahasa Arab & Inggris untuk menyiapkan generasi pemimpin umat.",
    badge: "Sanad Keilmuan Muttashil & Terakreditasi"
  },
  {
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1920&q=80",
    title: "Pendidikan Holistik Berkarakter Ahlussunnah wal Jama'ah",
    subtitle: "Didampingi asatidz berkompeten dalam lingkungan asrama yang asri, islami, disiplin, dan aman di kaki pegunungan Way Lalaan Tanggamus.",
    badge: "Legalitas Terdaftar Resmi Kemenkumham & Kemenag"
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
  const [activeProgram, setActiveProgram] = useState(0);
  const [newsHeroIndex, setNewsHeroIndex] = useState(0);
  const [previewModal, setPreviewModal] = useState<{
    image: string;
    title: string;
    category?: string;
  } | null>(null);

  // Close preview on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const newsHeroSlides = [
    NEWS_DATA[0], // Wisuda Akbar
    NEWS_DATA[1], // Kajian Akbar
    NEWS_DATA[2], // PPDB Online
    NEWS_DATA[3]  // Olimpiade Sains
  ];
  const currentNewsSlide = newsHeroSlides[newsHeroIndex] || newsHeroSlides[0];

  const PROGRAM_DATA = [
    {
      id: "tahfidz",
      category: "Program Inti",
      number: "01",
      title: "Tahfidzul Qur'an 30 Juz",
      subtitle: "Talaqqi, Ziyadah & Sanad Muttashil",
      desc: "Bimbingan talaqqi intensif, ziyadah hafalan baru berjenjang, serta muraja'ah 5 waktu dengan standar sanad muttashil bersama para ustadz huffadz berkompeten.",
      highlights: [
        "Target Mutqin 30 Juz Bersanad",
        "Halaqah Intensif Maksimal 12 Santri",
        "Karantina & Ujian Tasmi' Berkala",
        "Bimbingan Tajwid & Makharijul Huruf"
      ],
      link: "/program#tahfidz",
      linkLabel: "Pelajari Kurikulum Tahfidz",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80",
      quote: "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya.",
      quoteSource: "HR. Bukhari",
      icon: BookOpen,
      badge: "Target 30 Juz Mutqin",
      stats: { value: "12", label: "Santri / Halaqah" }
    },
    {
      id: "diniyah",
      category: "Turats Salaf",
      number: "02",
      title: "Madrasah Diniyah",
      subtitle: "Kajian Kitab Kuning & Dirasah Islamiyah",
      desc: "Pendalaman komprehensif gramatika Arab (Nahwu & Sharaf), fiqih madzhab Syafi'i, aqidah Ahlussunnah wal Jama'ah, adab thalabul ilmi, serta hadits nabawi.",
      highlights: [
        "Metode Tradisional Sorogan & Bandongan",
        "Pemahaman Fiqih & Aqidah Aswaja Kokoh",
        "Kajian Kitab Jurumiyyah, Taqrib & Riyadlus Shalihin",
        "Pembiasaan Adab & Etika Santri Nusantara"
      ],
      link: "/program#diniyah",
      linkLabel: "Silabus Kitab Kuning",
      image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=1200&q=80",
      quote: "Menuntut ilmu adalah kewajiban bagi setiap muslim dan pembuka jalan ke surga.",
      quoteSource: "HR. Ibnu Majah",
      icon: Award,
      badge: "Turats Pesantren",
      stats: { value: "100%", label: "Berpijak Aswaja" }
    },
    {
      id: "formal",
      category: "Resmi Terakreditasi",
      number: "03",
      title: "SMP & SMA Islam",
      subtitle: "Integrasi Kurikulum Nasional & Karakter",
      desc: "Pendidikan formal terakreditasi resmi Kemendikbud yang mensinergikan sains modern, matematika, dan literasi teknologi dengan integritas nilai moral kepesantrenan.",
      highlights: [
        "Ijazah Resmi Kemendikbudristek",
        "Laboratorium Komputer & Praktikum Sains",
        "Persiapan Lanjut Studi ke PTN & Timur Tengah",
        "Tenaga Pengajar Profesional Berdedikasi"
      ],
      link: "/program#formal",
      linkLabel: "Kurikulum Formal & Fasilitas",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      quote: "Pendidikan adalah senjata paling ampuh untuk mengubah dunia dan membentuk adab.",
      quoteSource: "Visi Pendidikan",
      icon: GraduationCap,
      badge: "Kemendikbud Resmi",
      stats: { value: "A", label: "Standar Akreditasi" }
    },
    {
      id: "bilingual",
      category: "Global Readiness",
      number: "04",
      title: "Bilingual & Soft Skills",
      subtitle: "Kecakapan Bahasa Dunia & Pengembangan Minat",
      desc: "Pembiasaan percakapan harian Arab dan Inggris (*Yaumul Lughah*), kepanduan Pramuka, seni kaligrafi Islam kontemporer, bela diri, serta public speaking (khitobah).",
      highlights: [
        "Conversation Harian Bahasa Arab & Inggris",
        "Pelatihan Khitobah 3 Bahasa & Public Speaking",
        "Klub Seni Kaligrafi Islam & Kepanduan",
        "Bimbingan Karakter Mandiri & Kepemimpinan"
      ],
      link: "/program#bilingual",
      linkLabel: "Eksplorasi Ekstrakurikuler",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      quote: "Bahasa adalah kunci jendela dunia, adab adalah pemandu langkah manusia.",
      quoteSource: "Prinsip Global",
      icon: Languages,
      badge: "Arab & Inggris Aktif",
      stats: { value: "24h", label: "Lingkungan Bahasa" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="space-y-0 w-full overflow-x-hidden bg-white text-slate-800">
      
      {/* 1. HERO SLIDER SECTION (Full Viewport Screen Fit) */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] bg-[#070c09] overflow-hidden flex flex-col justify-center pt-8 sm:pt-10 pb-20 sm:pb-28">
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
                background: 'linear-gradient(90deg, rgba(7, 12, 9, 0.98) 0%, rgba(6, 28, 20, 0.90) 38%, rgba(6, 28, 20, 0.45) 72%, rgba(7, 12, 9, 0.15) 100%)'
              }}
            />
            {/* Penyeimbang bayangan bawah untuk perangkat mobile */}
            <div 
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{
                background: 'linear-gradient(to top, rgba(7, 12, 9, 0.95) 0%, transparent 60%)'
              }}
            />
          </div>
        ))}

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 my-auto">
          <div className="max-w-2xl relative min-h-[220px] sm:min-h-[200px]">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 space-y-3 sm:space-y-4 ${
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
                    className="bg-aurora-btn text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Daftar Santri Baru</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/90" />
                  </Link>
                  
                  <Link
                    to="/kontak"
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-semibold px-5 py-2.5 rounded-full text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm"
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
                    <span>NSP Kemenag: <strong className="text-white ">{SITE_INFO.legal.nsp}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-28 sm:bottom-36 right-6 sm:right-12 flex items-center gap-2 z-20">
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

      {/* 2. VALUE PILLARS MARQUEE (Clean Typography, Teks & Icon Putih Tanpa Box/Shape) */}
      <section className="relative -mt-14 sm:-mt-16 z-20 w-full overflow-hidden border-y border-white/10 bg-black/25 backdrop-blur-[2px] py-2.5 sm:py-3">
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex w-max animate-marquee-rtl items-center">
            {[...STRIP_PILLARS, ...STRIP_PILLARS, ...STRIP_PILLARS, ...STRIP_PILLARS].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 sm:px-6 py-1 transition-opacity group cursor-default"
                >
                  <Icon className="w-4 h-4 text-white shrink-0 stroke-[2] drop-shadow-sm group-hover:scale-110 transition-transform duration-150" />
                  <span className="text-xs sm:text-sm font-medium text-white drop-shadow-sm tracking-wide whitespace-nowrap">
                    {item.title}
                  </span>
                  <span className="text-white/40 ml-4 sm:ml-6 select-none">•</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PROFIL INSTITUSI & SAMBUTAN (Layout 60/40 dengan Proporsi Ringkas & Presisi) */}
      <section className="py-12 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Foto Kolase Artistik Bertingkat (Multi-frame Slice Mosaic - Compact Scale) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end lg:pr-4">
            <div className="relative w-full max-w-[310px] sm:max-w-[340px] h-[330px] sm:h-[360px]">
              {/* Gambar dasar / latar utama */}
              <div className="absolute inset-x-5 inset-y-4 overflow-hidden rounded-xl shadow-md border border-slate-200/80 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80"
                  alt="Pondok Pesantren Al-Mursyid"
                  className="w-full h-full object-cover filter contrast-[1.03]"
                />
              </div>

              {/* Panel pecahan kiri atas (overlap frame dengan garis border putih) */}
              <div className="absolute -top-1 left-0 w-3/5 h-3/5 rounded-xl overflow-hidden shadow-xl border-[2.5px] border-white bg-slate-100 transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80"
                  alt=""
                  className="w-[170%] h-[170%] max-w-none object-cover -translate-x-3 -translate-y-3"
                />
              </div>

              {/* Panel pecahan vertikal kanan */}
              <div className="absolute top-5 right-0 w-[27%] h-3/5 rounded-xl overflow-hidden shadow-lg border-[2.5px] border-white bg-slate-100 transition-transform duration-500 hover:translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80"
                  alt=""
                  className="w-[360%] h-[170%] max-w-none object-cover -translate-x-[68%] -translate-y-8"
                />
              </div>

              {/* Panel pecahan kanan bawah */}
              <div className="absolute bottom-0 right-2 w-7/12 h-1/2 rounded-xl overflow-hidden shadow-xl border-[2.5px] border-white bg-slate-100 transition-transform duration-500 hover:translate-x-1">
                <img
                  src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80"
                  alt=""
                  className="w-[175%] h-[200%] max-w-none object-cover -translate-x-[42%] -translate-y-[48%]"
                />
              </div>

              {/* Aksen pecahan kecil kiri bawah */}
              <div className="absolute bottom-3 left-2 w-14 h-14 rounded-lg overflow-hidden shadow-md border-2 border-white bg-slate-100 transition-transform duration-500 hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80"
                  alt=""
                  className="w-[500%] h-[500%] max-w-none object-cover -translate-x-[15%] -translate-y-[80%]"
                />
              </div>
            </div>
          </div>

          {/* Kolom Informasi & Nilai Keunggulan */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              Pendidikan Pesantren Modern Berakar pada <span className="text-emerald-800">Tradisi Keilmuan Salaf</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Yayasan Almursyid Tanggamus Lampung berikhtiar membangun pusat kaderisasi generasi Qur'ani yang kokoh dalam akidah Ahlussunnah wal Jama'ah, berwawasan global, dan berakhlaqul karimah di lingkungan asri kaki pegunungan Way Lalaan.
            </p>



            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/tentang-kami"
                className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Baca Profil & Visi Misi</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </Link>
              <Link
                to="/tentang-kami#legalitas"
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-emerald-800 text-slate-700 hover:text-emerald-900 font-semibold text-xs px-5 py-3.5 rounded-full transition-colors bg-white"
              >
                <span>Dokumen Legalitas Yayasan</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROGRAM UNGGULAN & KURIKULUM (Clean White Section with Modern Glassmorphism Cards) */}
      <section className="relative pt-20 pb-10 lg:pt-24 lg:pb-12 bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header Minimalist Clean Frame */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                  Kurikulum & Pendidikan
                </span>
                <span className="h-[2px] w-16 bg-emerald-600 block rounded-full"></span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
                Program Unggulan.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Keseimbangan mutqin tahfidz Al-Qur'an, kedalaman turats kitab kuning salaf, kurikulum resmi terpadu, dan kecakapan bahasa global.
              </p>
            </div>
          </div>

          {/* Interactive instruction hint positioned right above the cards */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium -mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Klik kartu untuk membuka detail program</span>
          </div>

          {/* INTERACTIVE EXPANDING ACCORDION (Desktop: Horizontal Expansion with Emerald Glass Gradient Card) */}
          <div className="hidden lg:flex gap-3.5 h-[490px] w-full items-stretch transition-all duration-500">
            {PROGRAM_DATA.map((prog, idx) => {
              const isSelected = activeProgram === idx;
              const IconComp = prog.icon;
              
              // Heights offset sesuai estetika arsitektur Gambar 2
              const heightClass = 
                idx === 0 ? "h-[88%] self-end" :
                idx === 1 ? "h-[94%] self-end" :
                idx === 2 ? "h-full self-end" : "h-[92%] self-end";

              return (
                <div
                  key={prog.id}
                  onClick={() => setActiveProgram(idx)}
                  className={`group/card relative overflow-hidden cursor-pointer transition-[flex] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl ${heightClass} ${
                    isSelected 
                      ? 'flex-[3.2] bg-gradient-to-br from-[#06372b] via-[#0b4839] to-[#28594d] text-white shadow-2xl border border-emerald-500/30 ring-1 ring-emerald-400/20' 
                      : 'flex-1 bg-gradient-to-b from-[#e8f0ec] via-[#d7e5de] to-[#c2d6cc] text-slate-800 border border-emerald-200/60 hover:bg-emerald-900/90 hover:border-emerald-600 hover:shadow-lg'
                  }`}
                >
                  {/* Background Image with overlay */}
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                      isSelected ? 'scale-105 opacity-25 filter contrast-125' : 'opacity-15 filter grayscale group-hover/card:opacity-30 group-hover/card:scale-105'
                    }`}
                  />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isSelected 
                      ? 'bg-gradient-to-t from-[#06372b]/95 via-[#0b4839]/80 to-transparent' 
                      : 'bg-gradient-to-t from-[#c2d6cc]/80 via-[#d7e5de]/40 to-white/40 group-hover/card:bg-gradient-to-t group-hover/card:from-[#06372b]/90 group-hover/card:via-[#0b4839]/80 group-hover/card:to-[#0b4839]/70'
                  }`} />

                  {/* KONDISI EXPANDED: Melebar ke Samping dengan Emerald Gradient & Glass Tiles */}
                  {isSelected ? (
                    <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between animate-fadeIn text-white">
                      
                      {/* Top Bar: Bersih, Minimalis, Putih Terang */}
                      <div className="flex items-center justify-between border-b border-white/20 pb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl font-bold text-white">
                            {prog.number}.
                          </span>
                          <span className="text-[11px] tracking-wider uppercase text-white font-normal">
                            {prog.category}
                          </span>
                          {/* Button di samping kanan Program Inti */}
                          <Link
                            to={prog.link}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-[11px] font-normal text-white hover:text-white transition-colors group/btn py-1 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md ml-1"
                          >
                            <span>{prog.linkLabel}</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform stroke-[1.75]" />
                          </Link>
                        </div>
                        {/* Icon murni tanpa shape tebal */}
                        <IconComp className="w-4 h-4 text-white stroke-[1.75]" />
                      </div>

                      {/* Middle Body: Tipografi Standar Selaras, Putih Terang */}
                      <div className="space-y-3 my-auto py-1.5">
                        <div className="space-y-0.5">
                          <p className="text-[11px] uppercase tracking-widest text-white/90 font-normal">
                            {prog.subtitle}
                          </p>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                            {prog.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13px] text-white/95 font-normal leading-relaxed max-w-xl">
                          {prog.desc}
                        </p>

                        {/* Highlights Grid: Glassmorphism Tiles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {prog.highlights.map((item, hIdx) => (
                            <div 
                              key={hIdx} 
                              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[2]" />
                              <span className="text-[11px] text-white font-normal">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Bar: Quote */}
                      <div className="pt-3.5 border-t border-white/20 flex items-center justify-between gap-4">
                        <div className="max-w-md">
                          <p className="text-[11px] text-white font-normal italic">
                            "{prog.quote}"
                          </p>
                          <span className="text-[10px] text-white/80 block mt-0.5">
                            — {prog.quoteSource}
                          </span>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* KONDISI COLLAPSED: Strip Vertikal Hijau Keputihan dengan Teks Bersih & Hover State Hijau */
                    <div className="relative z-10 h-full p-5 flex flex-col justify-between items-center text-center transition-colors duration-300">
                      <div className="flex flex-col items-center gap-2.5">
                        <span className="text-sm font-bold text-emerald-950 group-hover/card:text-white transition-colors">
                          {prog.number}
                        </span>
                        {/* Icon murni tanpa shape kaku */}
                        <IconComp className="w-3.5 h-3.5 text-emerald-900 group-hover/card:text-emerald-200 stroke-[2] transition-colors" />
                      </div>

                      {/* Icon klik murni tanpa shape bulatan, berwarna putih */}
                      <div className="opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform scale-90 group-hover/card:scale-105 flex flex-col items-center gap-1 py-1">
                        <MousePointerClick className="w-5 h-5 text-white stroke-[2] drop-shadow-md animate-bounce" />
                        <span className="text-[10px] font-medium text-white/90 tracking-wider">
                          Klik
                        </span>
                      </div>

                      {/* Teks Vertikal Reguler Selaras */}
                      <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-2.5 transition-colors">
                        <span className="text-[10px] uppercase tracking-widest text-emerald-800/80 group-hover/card:text-emerald-200/90 font-normal">
                          {prog.category}
                        </span>
                        <span className="text-xs font-semibold text-emerald-950 group-hover/card:text-white tracking-wide whitespace-nowrap">
                          {prog.title}
                        </span>
                      </div>

                      {/* Indicator titik hijau segar */}
                      <div className="w-2 h-2 rounded-full bg-emerald-700/60 group-hover/card:bg-emerald-400 group-hover/card:scale-125 transition-all" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* TAMPILAN MOBILE / TABLET (Glassmorphism Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {PROGRAM_DATA.map((prog, idx) => {
              const isSelected = activeProgram === idx;
              const IconComp = prog.icon;
              return (
                <div
                  key={prog.id}
                  onClick={() => setActiveProgram(idx)}
                  className={`group/mcard rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isSelected 
                      ? 'bg-gradient-to-br from-[#06372b] via-[#0b4839] to-[#28594d] text-white border-emerald-500/30 shadow-2xl' 
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-[#0b4839] hover:text-white hover:border-emerald-600 shadow-sm'
                  }`}
                >
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className={`flex items-center justify-between border-b pb-3 ${isSelected ? 'border-white/20' : 'border-slate-100 group-hover/mcard:border-white/20'}`}>
                      <div className="flex items-center gap-2.5">
                        <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-400 group-hover/mcard:text-white'}`}>
                          {prog.number}.
                        </span>
                        <span className={`text-[11px] font-normal uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-500 group-hover/mcard:text-white/80'}`}>
                          {prog.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isSelected && (
                          <span className="text-[10px] py-0.5 px-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 group-hover/mcard:bg-white/20 group-hover/mcard:text-white group-hover/mcard:border-white/30 font-medium">
                            Klik kartu
                          </span>
                        )}
                        <IconComp className={`w-4 h-4 stroke-[1.75] ${isSelected ? 'text-white' : 'text-slate-500 group-hover/mcard:text-white'}`} />
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-lg font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900 group-hover/mcard:text-white'}`}>
                        {prog.title}
                      </h3>
                      <p className={`text-xs mt-1 leading-relaxed font-normal ${isSelected ? 'text-white' : 'text-slate-600 group-hover/mcard:text-white/90'}`}>
                        {prog.desc}
                      </p>
                    </div>

                    {/* Extended Details when expanded */}
                    {isSelected && (
                      <div className="space-y-4 pt-3 border-t border-white/20 animate-fadeIn">
                        <div className="space-y-2">
                          {prog.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-xs text-white font-normal py-1.5 px-2.5 rounded-lg bg-white/10 border border-white/20">
                              <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[2]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-end border-t border-white/15">
                          <Link
                            to={prog.link}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-normal text-white hover:underline"
                          >
                            <span>{prog.linkLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>



        </div>
      </section>

      {/* 5. SECTION CARD DOKUMENTASI & GALERI ARSITEKTURAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 lg:pb-16">
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center justify-center max-w-5xl mx-auto">
            
            {/* Kolom 1 Kiri: Galeri Mosaik Arsitektural */}
            <div className="lg:col-span-7 w-full max-w-[490px] lg:max-w-[530px] mx-auto lg:mx-0">
              <div className="space-y-3.5">
                {/* Accent mini header dengan tombol Jelajahi Galeri di kanan atas */}
                <div className="flex items-center justify-between pb-1.5 border-b border-emerald-900/10">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-900/80">
                    Dokumentasi & Kampus
                  </span>
                  <Link
                    to="/galeri"
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-900 hover:text-emerald-700 transition-colors group"
                  >
                    <span>Jelajahi Galeri</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-800 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="relative">
                  {/* Geometric notches */}
                  <div className="absolute -top-1.5 left-1/4 w-2.5 h-2.5 bg-slate-800 rounded-xs z-20 pointer-events-none hidden sm:block" />
                  <div className="absolute top-1/2 -right-1 w-2.5 h-2.5 bg-slate-800 rounded-xs z-20 pointer-events-none hidden sm:block" />

                  <div className="grid grid-cols-12 gap-2.5">
                    {/* Baris 1: 3 Foto Berjajar (Frame 1, 2, 3) */}
                    <div 
                      onClick={() => setPreviewModal({ image: GALLERY_ITEMS[0].image, title: GALLERY_ITEMS[0].title, category: GALLERY_ITEMS[0].category })}
                      className="col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${GALLERY_ITEMS[0].title}`}
                    >
                      <img
                        src={GALLERY_ITEMS[0].image}
                        alt={GALLERY_ITEMS[0].title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-950" />
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setPreviewModal({ image: GALLERY_ITEMS[1].image, title: GALLERY_ITEMS[1].title, category: GALLERY_ITEMS[1].category })}
                      className="col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${GALLERY_ITEMS[1].title}`}
                    >
                      <img
                        src={GALLERY_ITEMS[1].image}
                        alt={GALLERY_ITEMS[1].title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-950" />
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setPreviewModal({ image: GALLERY_ITEMS[2].image, title: GALLERY_ITEMS[2].title, category: GALLERY_ITEMS[2].category })}
                      className="col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${GALLERY_ITEMS[2].title}`}
                    >
                      <img
                        src={GALLERY_ITEMS[2].image}
                        alt={GALLERY_ITEMS[2].title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-950" />
                        </div>
                      </div>
                    </div>

                    {/* Baris 2: Foto Kiri Melebar (Frame 4 - 8 kolom) & Frame Foto Kanan (Frame 5 - 4 kolom) */}
                    <div 
                      onClick={() => setPreviewModal({ image: GALLERY_ITEMS[6].image, title: GALLERY_ITEMS[6].title, category: GALLERY_ITEMS[6].category })}
                      className="col-span-8 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${GALLERY_ITEMS[6].title}`}
                    >
                      <img
                        src={GALLERY_ITEMS[6].image}
                        alt={GALLERY_ITEMS[6].title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-950" />
                        </div>
                      </div>
                    </div>

                    {/* Frame Foto Kanan Bawah */}
                    <div 
                      onClick={() => setPreviewModal({ image: GALLERY_ITEMS[7].image, title: GALLERY_ITEMS[7].title, category: GALLERY_ITEMS[7].category })}
                      className="col-span-4 aspect-[8/10] rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${GALLERY_ITEMS[7].title}`}
                    >
                      <img
                        src={GALLERY_ITEMS[7].image}
                        alt={GALLERY_ITEMS[7].title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-950" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom 2 Kanan: Card Visual Ringkas PPDB */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-start">
              <div className="w-full max-w-[280px] sm:max-w-[310px] bg-white rounded-2xl shadow-sm hover:shadow-md overflow-hidden border border-slate-200/80 p-3 transition-all duration-300">
                
                {/* Visual Image Container (Rasio Tetap 3:4) */}
                <div 
                  onClick={() => setPreviewModal({ image: FACILITIES[1].image, title: "Fasilitas dan Asrama Santri", category: "PPDB & Kampus" })}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 group cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="Lihat foto Fasilitas dan Lingkungan Pondok Pesantren"
                >
                  <img
                    src={FACILITIES[1].image}
                    alt="Fasilitas dan Lingkungan Pondok Pesantren Al-Mursyid"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-9 h-9 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-4 h-4 text-emerald-950" />
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Action Ringkas & Sejajar */}
                <div className="pt-3 pb-0.5 px-0.5 flex items-center justify-between gap-2">
                  <span className="text-[12px] text-slate-500">
                    Mau daftar <strong className="font-semibold text-slate-900">sekarang?</strong>
                  </span>
                  <Link
                    to="/ppdb"
                    className="inline-flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-950 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full transition-all active:scale-95 shadow-xs shrink-0"
                  >
                    <span>PPDB Online</span>
                    <ArrowRight className="w-3 h-3 text-white/90" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FASILITAS KAMPUS (Mood Board / Arch Bento Style ala Gambar 2) */}
      <section className="pt-2 pb-16 lg:pt-4 lg:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mood Board Layout - Bersih Tanpa Shape Background */}
        <div className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sisi Kiri: Editorial Spec Sheet & Bullet Points */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                      Sarana & Prasarana
                    </span>
                    <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-emerald-950 tracking-tight leading-tight">
                    Lingkungan Belajar Asri & Representatif
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Kawasan sejuk di kaki pegunungan Way Lalaan Tanggamus, dirancang untuk mendukung kenyamanan santri dalam menghafal Al-Qur'an dan beraktivitas.
                </p>

                {/* Key Checklist Points ala Gambar Unggulan (Hijau Lembut) */}
                <div className="space-y-3 pt-3 border-t border-emerald-200/60">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-emerald-600/40 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 bg-emerald-50/80">
                      <svg className="w-3 h-3 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-950">Masjid Jami' Berkapasitas Luas</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">Pusat shalat berjamaah 5 waktu, kajian turats, dan halaqah tahfidz.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-emerald-600/40 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 bg-emerald-50/80">
                      <svg className="w-3 h-3 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-950">Asrama Putra & Putri Terpisah</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">Hunian aman bertata tertib disiplin dengan pengawasan musyrif 24 jam.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-emerald-600/40 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 bg-emerald-50/80">
                      <svg className="w-3 h-3 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-950">Dapur & Sanitasi Terstandarisasi</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">Menu 3x sehari bergizi seimbang dengan air bersih pegunungan.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Mood/Palette Circles & Button Lihat Semua Fasilitas */}
              <div className="pt-4 border-t border-emerald-200/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e8f0ec] border border-emerald-200/60 shadow-xs" title="Soft Sage"></span>
                  <span className="w-5 h-5 rounded-full bg-[#c2d6cc] border border-emerald-300/60 shadow-xs" title="Mint Moss"></span>
                  <span className="w-5 h-5 rounded-full bg-[#0b4839] border border-emerald-700/40 shadow-xs" title="Deep Forest"></span>
                  <span className="w-5 h-5 rounded-full bg-[#06372b] border border-emerald-900/60 shadow-xs" title="Emerald Night"></span>
                </div>
                <Link
                  to="/fasilitas"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-white bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] border border-emerald-700 px-4 py-2 rounded-full transition-all shadow-sm"
                >
                  <span>Lihat Semua Fasilitas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Sisi Kanan: Mood Board Arch Gallery (Frame lebih ringkas & proporsional) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              {/* Top Row: Arch Top (Kubah Melengkung Atas) */}
              <div 
                onClick={() => setPreviewModal({ image: FACILITIES[0].image, title: FACILITIES[0].name, category: FACILITIES[0].category })}
                className="relative group overflow-hidden bg-slate-200 shadow-sm hover:shadow-md border border-slate-200/80 rounded-t-[70px] sm:rounded-t-[90px] rounded-b-xl h-48 sm:h-56 cursor-pointer transition-all duration-300"
                role="button"
                tabIndex={0}
                aria-label={`Lihat foto ${FACILITIES[0].name}`}
              >
                <img
                  src={FACILITIES[0].image}
                  alt={FACILITIES[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-300">
                    {FACILITIES[0].category}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold mt-0.5">
                    {FACILITIES[0].name}
                  </h4>
                </div>
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-4 h-4 text-emerald-950" />
                  </div>
                </div>
              </div>

              {/* Bottom Row: 3 Kolom dengan Pola Bentuk Gambar 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-stretch">
                
                {/* 1. Left: Arch Top-Left Curve */}
                <div 
                  onClick={() => setPreviewModal({ image: FACILITIES[1].image, title: FACILITIES[1].name, category: FACILITIES[1].category })}
                  className="sm:col-span-4 relative group overflow-hidden bg-slate-200 shadow-sm hover:shadow-md border border-slate-200/80 rounded-tl-[50px] rounded-xl h-[160px] cursor-pointer transition-all duration-300"
                  role="button"
                  tabIndex={0}
                  aria-label={`Lihat foto ${FACILITIES[1].name}`}
                >
                  <img
                    src={FACILITIES[1].image}
                    alt={FACILITIES[1].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                      {FACILITIES[1].category}
                    </span>
                    <h4 className="text-[11px] sm:text-xs font-bold mt-0.5 line-clamp-2">
                      {FACILITIES[1].name}
                    </h4>
                  </div>
                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-3.5 h-3.5 text-emerald-950" />
                    </div>
                  </div>
                </div>

                {/* 2. Center: Arch Top + Round Badge Overlay */}
                <div 
                  onClick={() => setPreviewModal({ image: FACILITIES[2].image, title: FACILITIES[2].name, category: FACILITIES[2].category })}
                  className="sm:col-span-4 relative group overflow-hidden bg-slate-200 shadow-sm hover:shadow-md border border-slate-200/80 rounded-t-[50px] rounded-b-xl h-[160px] cursor-pointer transition-all duration-300"
                  role="button"
                  tabIndex={0}
                  aria-label={`Lihat foto ${FACILITIES[2].name}`}
                >
                  <img
                    src={FACILITIES[2].image}
                    alt={FACILITIES[2].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating badge */}
                  <div className="absolute top-1.5 right-1.5 w-10 h-10 rounded-full bg-forest-900 text-white flex flex-col items-center justify-center font-bold shadow-md border border-white text-center leading-none z-10 pointer-events-none">
                    <span className="text-[10px] font-bold">100%</span>
                    <span className="text-[7px] uppercase tracking-tighter opacity-90">Asri</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                      {FACILITIES[2].category}
                    </span>
                    <h4 className="text-[11px] sm:text-xs font-bold mt-0.5 line-clamp-1">
                      {FACILITIES[2].name}
                    </h4>
                  </div>
                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-3.5 h-3.5 text-emerald-950" />
                    </div>
                  </div>
                </div>

                {/* 3. Right: Arch Top-Right Curve */}
                <div 
                  onClick={() => setPreviewModal({ image: FACILITIES[3].image, title: FACILITIES[3].name, category: FACILITIES[3].category })}
                  className="sm:col-span-4 relative group overflow-hidden bg-slate-200 shadow-sm hover:shadow-md border border-slate-200/80 rounded-tr-[50px] rounded-xl h-[160px] cursor-pointer transition-all duration-300"
                  role="button"
                  tabIndex={0}
                  aria-label={`Lihat foto ${FACILITIES[3].name}`}
                >
                  <img
                    src={FACILITIES[3].image}
                    alt={FACILITIES[3].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                      {FACILITIES[3].category}
                    </span>
                    <h4 className="text-[11px] sm:text-xs font-bold mt-0.5 line-clamp-1">
                      {FACILITIES[3].name}
                    </h4>
                  </div>
                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-3.5 h-3.5 text-emerald-950" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. BERITA & KEGIATAN PESANTREN */}
      <section className="py-12 md:py-16 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Main Featured News Card (Left - 8 cols) */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-sm border border-slate-900/10 min-h-[380px] md:min-h-[420px] flex flex-col justify-end p-5 sm:p-8 group bg-slate-900">
              {/* Background Image with Overlay */}
              <img 
                src={currentNewsSlide.image} 
                alt={currentNewsSlide.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent"></div>
              <div className="absolute inset-0 bg-[#064e3b]/25 mix-blend-multiply"></div>

              {/* Content Box */}
              <div className="relative z-10 space-y-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#059669] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-sm">
                    {currentNewsSlide.category}
                  </span>
                  <span className="text-emerald-300 text-[11px] font-semibold tracking-wide">
                    {currentNewsSlide.subCategory || "Kabar Pilihan"}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                  {currentNewsSlide.title}
                </h2>

                <p className="text-xs sm:text-[13px] text-slate-200 line-clamp-2 leading-relaxed">
                  {currentNewsSlide.summary}
                </p>

                {/* Bottom CTA and Dots Indicator */}
                <div className="pt-1.5 flex flex-wrap items-center justify-between gap-4">
                  <Link 
                    to={`/berita/${createSlug(currentNewsSlide.title)}`}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5">
                    {newsHeroSlides.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setNewsHeroIndex(dotIdx)}
                        aria-label={`Slide ${dotIdx + 1}`}
                        className={`h-1.5 transition-all rounded-full ${
                          dotIdx === newsHeroIndex 
                            ? 'w-5 bg-emerald-400' 
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Postingan Terbaru Sidebar (Right - 4 cols) */}
            <div className="lg:col-span-4 bg-white text-slate-800 rounded-2xl p-5 flex flex-col justify-between border border-slate-200/90 shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
                    <h3 className="font-bold text-xs tracking-wide text-slate-900 uppercase">
                      Postingan Terbaru
                    </h3>
                  </div>
                  <Link 
                    to="/berita" 
                    className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    Lihat Semua
                  </Link>
                </div>

                {/* List of Latest Posts */}
                <div className="divide-y divide-slate-100">
                  {LATEST_POSTS.map((post, idx) => (
                    <Link 
                      key={idx} 
                      to={`/berita/${createSlug(post.title)}`}
                      className="py-2.5 flex items-center gap-3 group cursor-pointer block"
                    >
                      {/* Mini Thumbnail */}
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span className="text-emerald-700 font-semibold">{post.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-slate-400" />
                            {post.timeAgo}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Link */}
              <div className="pt-3 mt-1 border-t border-slate-100 text-center">
                <Link 
                  to="/berita"
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 group/link"
                >
                  <span>Jelajahi seluruh kabar pondok</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox / Modal Kotak Foto Sesuai Desain Editorial */}
      {previewModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setPreviewModal(null)}
        >
          {/* Top Bar: close button */}
          <div className="w-full max-w-xl flex items-center justify-between pb-3 px-1 text-white">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/80">
              {previewModal.category || "Dokumentasi Kampus"}
            </span>

            <button
              onClick={() => setPreviewModal(null)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all active:scale-95"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Card Modal Kotak */}
          <div 
            className="relative w-full max-w-xl bg-white p-1 sm:p-1.5 rounded-[22px] sm:rounded-[26px] shadow-2xl overflow-hidden border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Image Container with Rounded Corners */}
            <div className="relative w-full aspect-[4/3.5] sm:aspect-[4/3] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-stone-950">
              <img
                src={previewModal.image}
                alt={previewModal.title}
                className="w-full h-full object-cover animate-in fade-in zoom-in-[0.98] duration-200"
              />

              {/* Floating Judul Pojok Kanan Bawah */}
              <div className="absolute bottom-0 right-0 bg-white pt-2.5 pb-2 px-4 rounded-tl-[18px] shadow-sm max-w-[88%] sm:max-w-[78%]">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                  Al-Mursyid
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight leading-snug truncate">
                  {previewModal.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Subtext Footer */}
          <div className="w-full max-w-xl text-center pt-3 text-[11px] text-white/60 tracking-wider">
            <span>Klik area luar atau tombol silang untuk menutup foto</span>
          </div>
        </div>
      )}

    </div>
  );
};

