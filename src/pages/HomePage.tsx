import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, BookOpen, GraduationCap, 
  Building2, Users, CheckCircle2, ChevronRight, ChevronLeft,
  Award, Compass, PhoneCall, Calendar
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
    <div className="space-y-0 w-full overflow-x-hidden">
      
      {/* 1. HERO SLIDER SECTION (Clean Modern Typography) */}
      <section className="relative w-full min-h-[520px] lg:h-[620px] bg-forest-950 overflow-hidden flex items-center">
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
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/85 to-forest-950/50" />
          </div>
        ))}

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-0 z-10">
          <div className="max-w-2xl text-white space-y-6">
            
            {/* Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
              <span className="w-2 h-2 rounded-full bg-gold-400"></span>
              <span>{HERO_SLIDES[currentSlide].badge}</span>
            </div>

            {/* Heading Modern Reguler */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl font-normal">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/ppdb"
                className="bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold px-6 py-3 rounded-lg text-xs sm:text-sm uppercase tracking-wider shadow-sm flex items-center gap-2 transition-all transform active:scale-95"
              >
                <span>Daftar Santri Baru</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/kontak"
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold px-6 py-3 rounded-lg text-xs sm:text-sm tracking-wider flex items-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-gold-400" />
                <span>Lihat Lokasi Pondok</span>
              </Link>
            </div>

            {/* Mini Info */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>SK Kemenkumham 2020</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold-400" />
                <span>NSP Kemenag: {SITE_INFO.legal.nsp}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/30 hover:bg-black/60 text-white items-center justify-center transition-all backdrop-blur-sm z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/30 hover:bg-black/60 text-white items-center justify-center transition-all backdrop-blur-sm z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-gold-400' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. FLOATING FEATURE BAR (Icon Minimalis Terpadu: Monokrom & Emas Halus) */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
          
          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50/70 transition-colors">
            <div className="w-10 h-10 rounded-lg border border-slate-200 text-forest-950 flex items-center justify-center mb-2.5 group-hover:border-forest-900 group-hover:text-forest-900 transition-colors">
              <BookOpen className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">Tahfidzul Qur'an</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">Target 30 Juz mutqin dengan talaqqi intensif</p>
          </div>

          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50/70 transition-colors">
            <div className="w-10 h-10 rounded-lg border border-slate-200 text-forest-950 flex items-center justify-center mb-2.5 group-hover:border-forest-900 group-hover:text-forest-900 transition-colors">
              <Award className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">Madrasah Diniyah</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">Kajian turats kitab kuning & nahwu shorof</p>
          </div>

          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50/70 transition-colors">
            <div className="w-10 h-10 rounded-lg border border-slate-200 text-forest-950 flex items-center justify-center mb-2.5 group-hover:border-forest-900 group-hover:text-forest-900 transition-colors">
              <GraduationCap className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">Kurikulum Terpadu</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">Sains, literasi teknologi, dan ijazah resmi</p>
          </div>

          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50/70 transition-colors">
            <div className="w-10 h-10 rounded-lg border border-slate-200 text-forest-950 flex items-center justify-center mb-2.5 group-hover:border-forest-900 group-hover:text-forest-900 transition-colors">
              <Building2 className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">Boarding Asri</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">Asrama putra-putri terpisah di Way Lalaan</p>
          </div>

          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50/70 transition-colors col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-lg border border-slate-200 text-forest-950 flex items-center justify-center mb-2.5 group-hover:border-forest-900 group-hover:text-forest-900 transition-colors">
              <Users className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">Karakter & Adab</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">Kemandirian, kedisiplinan & adab islami</p>
          </div>

        </div>
      </section>

      {/* 3. SAMBUTAN & PROFIL RESMI */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80"
                alt="Santri Al-Mursyid Belajar"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-sm text-slate-800">
                <div className="flex items-center gap-2 text-forest-950 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Izin Operasional Resmi Kemenag RI</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Nomor Statistik Pesantren (NSP): <span className="font-mono font-bold text-forest-950">{SITE_INFO.legal.nsp}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block">
                Selamat Datang di Portal Resmi
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Pondok Pesantren <span className="text-forest-850">Al-Mursyid</span> Boarding School
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Yayasan Almursyid Tanggamus Lampung berikhtiar membangun pusat pendidikan Islam yang berakar kuat pada nilai-nilai tradisi ulama salafus shalih dan berwawasan masa depan. Kami mendampingi setiap santri untuk menemukan potensi terbaiknya melalui bimbingan akhlakul karimah, hafalan Al-Qur'an mutqin, serta penguasaan ilmu pengetahuan umum.
            </p>

            <div className="border-l-4 border-forest-950 pl-4 py-2 bg-slate-50 rounded-r-lg">
              <p className="italic text-xs sm:text-sm text-slate-700">
                "Menjadi Lembaga Pendidikan Islam yang melahirkan Ulama, Hafidz, dan Pemimpin Umat yang Berakhlakul Karimah serta Mandiri."
              </p>
              <span className="block text-[11px] not-italic font-semibold text-slate-500 mt-1">— Visi Utama Pondok Pesantren Al-Mursyid</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="block text-xl sm:text-2xl font-bold text-forest-950">30 Juz</span>
                <span className="text-[11px] font-medium text-slate-500">Program Tahfidz</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="block text-xl sm:text-2xl font-bold text-forest-950">1 : 12</span>
                <span className="text-[11px] font-medium text-slate-500">Rasio Ustadz : Santri</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="block text-xl sm:text-2xl font-bold text-forest-950">2020</span>
                <span className="text-[11px] font-medium text-slate-500">SK Yayasan</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="block text-xl sm:text-2xl font-bold text-forest-950">100%</span>
                <span className="text-[11px] font-medium text-slate-500">Terdaftar Kemenag</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/tentang-kami"
                className="inline-flex items-center gap-2 bg-forest-950 hover:bg-forest-900 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                <span>Baca Profil Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </Link>
              <Link
                to="/tentang-kami#legalitas"
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 font-medium text-xs px-4 py-2.5 rounded-lg transition-colors"
              >
                <span>Dokumen Legalitas & SK</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROGRAM UNGGULAN PENDIDIKAN */}
      <section className="py-20 bg-slate-100/60 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block">
              Kurikulum Holistik
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Program Pendidikan Al-Mursyid
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Integrasi seimbang antara hafalan Al-Qur'an mutqin, pendalaman kitab kuning, pendidikan formal SMP/SMA, dan pengembangan kecakapan global.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((prog) => (
              <div 
                key={prog.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-forest-950 text-gold-400 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 tracking-tight">
                      {prog.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-gold-600 mt-0.5">
                      {prog.tagline}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prog.desc}
                  </p>
                  <ul className="space-y-1.5 pt-3 border-t border-slate-100">
                    {prog.highlights.slice(0, 3).map((hl, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    to={`/program#${prog.id}`}
                    className="text-xs font-bold text-forest-950 hover:text-gold-600 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Pelajari Rincian</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FASILITAS KAMPUS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block">
              Sarana & Prasarana
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Lingkungan Belajar Asri & Representatif
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Terletak di kawasan Way Lalaan yang sejuk dan asri, mendukung fokus santri dalam menghafal Al-Qur'an dan menuntut ilmu.
            </p>
          </div>
          <Link
            to="/fasilitas"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-forest-950 border border-slate-300 px-4 py-2 rounded-lg transition-colors self-start md:self-auto"
          >
            <span>Lihat Semua Fasilitas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.slice(0, 4).map((fac, idx) => (
            <div key={idx} className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-forest-950/85 backdrop-blur-sm text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  {fac.category}
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-forest-950 transition-colors">
                  {fac.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {fac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER PPDB (LAYOUT RAPI & BUTTON CLEAN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-forest-950 rounded-2xl p-6 sm:p-10 lg:p-12 border border-forest-900 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-2xl text-center lg:text-left z-10 w-full">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Tahun Ajaran 2027 / 2028</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Penerimaan Santri Baru (PPDB Online) Dibuka
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Daftarkan putra-putri Anda untuk menimba ilmu agama, menghafal Al-Qur'an, dan meraih prestasi akademik di lingkungan pesantren yang mandiri dan berkarakter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto z-10 shrink-0">
            <Link
              to="/ppdb"
              className="w-full sm:w-auto text-center bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold px-6 py-3.5 rounded-lg text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-transform active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <span>Daftar Sekarang Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SITE_INFO.contacts.ppdbWa}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center border border-white/30 hover:bg-white/10 text-white font-medium px-5 py-3.5 rounded-lg text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Konsultasi WA Panitia</span>
            </a>
          </div>

        </div>
      </section>

      {/* 7. BERITA & AGENDA KEGIATAN */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block">
                Warta & Dokumentasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Berita & Kegiatan Pesantren
              </h2>
            </div>
            <Link
              to="/berita"
              className="text-xs font-bold text-forest-950 hover:text-gold-600 inline-flex items-center gap-1"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_DATA.map((news) => (
              <article key={news.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-gold-600 font-bold">{news.category}</span>
                      <span>{news.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug hover:text-forest-950 transition-colors">
                      <Link to="/berita">{news.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3">
                      {news.summary}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    to="/berita"
                    className="text-xs font-bold text-forest-950 hover:text-gold-600 inline-flex items-center gap-1"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3 h-3" />
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
