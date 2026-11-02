import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, BookOpen, GraduationCap, 
  Building2, Users, CheckCircle2, ChevronRight, ChevronLeft,
  Sparkles, Award, MapPin, Compass, PhoneCall, Calendar
} from 'lucide-react';
import { SITE_INFO, PROGRAMS, FACILITIES, NEWS_DATA } from '../data/siteData';

// Slide hero image
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
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SLIDER SECTION (Mengadopsi Trident Public School Banner) */}
      <section className="relative w-full h-[580px] lg:h-[640px] bg-forest-950 overflow-hidden">
        {/* Background Slide Images with Crossfade */}
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
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms]"
            />
            {/* Dark & Forest Green Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/80 to-transparent" />
            <div className="absolute inset-0 bg-forest-950/40 mix-blend-multiply" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl text-white space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-gold-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{HERO_SLIDES[currentSlide].badge}</span>
            </div>

            {/* Heading Tipografi Serif Mewah */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              {HERO_SLIDES[currentSlide].title.split(' ').map((word, i) => {
                if (word.toLowerCase().includes("qur'ani") || word.toLowerCase().includes("berprestasi") || word.toLowerCase().includes("holistik") || word.toLowerCase().includes("bersanad")) {
                  return <span key={i} className="text-gold-400 italic font-serif"> {word} </span>;
                }
                return ` ${word} `;
              })}
            </h1>

            {/* Deskripsi */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl font-normal">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            {/* Tombol Aksi Cepat */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/ppdb"
                className="bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold px-6 py-3 rounded text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
              >
                <span>Daftar Santri Baru</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/kontak"
                className="bg-transparent hover:bg-white/10 text-white border border-white/40 font-semibold px-6 py-3 rounded text-xs sm:text-sm tracking-wider flex items-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-gold-400" />
                <span>Lihat Lokasi Pondok</span>
              </Link>
            </div>

            {/* Legalitas Mini Badge */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>SK Kemenkumham 2020</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold-400" />
                <span>NSP: {SITE_INFO.legal.nsp}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Slide Controls (Kiri & Kanan) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/30 bg-black/20 hover:bg-black/50 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/30 bg-black/20 hover:bg-black/50 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
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

      {/* 2. FLOATING FEATURE BAR (5 Kartu Putih Minimalis Seperti Trident Public School) */}
      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
          
          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-forest-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-emerald-700" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Tahfidzul Qur'an</h4>
            <p className="text-[11px] text-slate-500 mt-1">Target 30 Juz mutqin dengan talaqqi intensif</p>
          </div>

          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-gold-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Madrasah Diniyah</h4>
            <p className="text-[11px] text-slate-500 mt-1">Kajian turats kitab kuning & nahwu shorof</p>
          </div>

          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-blue-700" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Kurikulum Terpadu</h4>
            <p className="text-[11px] text-slate-500 mt-1">Sains, literasi teknologi, dan ijazah resmi</p>
          </div>

          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6 text-teal-700" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Boarding Asri</h4>
            <p className="text-[11px] text-slate-500 mt-1">Asrama putra-putri terpisah di Way Lalaan</p>
          </div>

          <div className="p-5 flex flex-col items-center text-center group hover:bg-slate-50 transition-colors col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-purple-700" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Karakter & Adab</h4>
            <p className="text-[11px] text-slate-500 mt-1">Kemandirian, kepemimpinan & adab islami</p>
          </div>

        </div>
      </section>

      {/* 3. SAMBUTAN & PROFIL RESMI (Layout Asimetris 60/40 dengan Statistik Kemenag) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Sisi Kiri: Foto Pesantren & Banner Legalitas */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80"
                alt="Santri Al-Mursyid Belajar"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
              
              {/* Badge Legalitas Mengambang */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-lg text-slate-800">
                <div className="flex items-center gap-2 text-forest-800 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Izin Operasional Resmi Kemenag RI</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Nomor Statistik Pesantren (NSP): <span className="font-mono font-bold text-forest-900">{SITE_INFO.legal.nsp}</span>
                </p>
              </div>
            </div>

            {/* Elemen Dekoratif Aksen Gold */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-500/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-forest-800/10 rounded-2xl -z-10" />
          </div>

          {/* Sisi Kanan: Sambutan & Statistik Institusi */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gold-500" />
                Selamat Datang di Portal Resmi
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                Pondok Pesantren <span className="text-forest-800">Al-Mursyid</span> Boarding School
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Yayasan Almursyid Tanggamus Lampung berikhtiar membangun pusat pendidikan Islam yang berakar kuat pada nilai-nilai tradisi ulama salafus shalih dan berwawasan masa depan. Kami mendampingi setiap santri untuk menemukan potensi terbaiknya melalui bimbingan akhlakul karimah, hafalan Al-Qur'an mutqin, serta penguasaan ilmu pengetahuan umum.
            </p>

            <blockquote className="border-l-4 border-gold-500 pl-4 py-1 italic text-xs sm:text-sm text-slate-700 bg-amber-50/50 rounded-r-lg">
              "Menjadi Lembaga Pendidikan Islam yang melahirkan Ulama, Hafidz, dan Pemimpin Umat yang Berakhlakul Karimah serta Mandiri."
              <span className="block text-[11px] not-italic font-semibold text-forest-850 mt-1">— Visi Utama Pondok Pesantren Al-Mursyid</span>
            </blockquote>

            {/* Statistik 4 Angka (Mirip Trident Public School) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-forest-900">30 Juz</span>
                <span className="text-[11px] font-medium text-slate-500">Program Tahfidz</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-forest-900">1 : 12</span>
                <span className="text-[11px] font-medium text-slate-500">Rasio Ustadz Santri</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-forest-900">2020</span>
                <span className="text-[11px] font-medium text-slate-500">SK Yayasan</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-forest-900">100%</span>
                <span className="text-[11px] font-medium text-slate-500">Terdaftar Kemenag</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/tentang-kami"
                className="inline-flex items-center gap-2 bg-forest-950 hover:bg-forest-900 text-white font-semibold text-xs px-5 py-2.5 rounded shadow transition-all"
              >
                <span>Baca Selengkapnya Profil Kami</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </Link>
              <Link
                to="/tentang-kami#legalitas"
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 font-medium text-xs px-4 py-2.5 rounded transition-colors"
              >
                <span>Dokumen Legalitas & SK</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROGRAM UNGGULAN PENDIDIKAN (Grid 4 Kolom Klasik & Elegan) */}
      <section className="py-20 bg-slate-100/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
              Kurikulum Holistik
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
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
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-forest-950 text-gold-400 flex items-center justify-center font-bold">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      {prog.title}
                    </h3>
                    <p className="text-[11px] font-medium text-gold-600 mt-0.5">
                      {prog.tagline}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prog.desc}
                  </p>
                  <ul className="space-y-1.5 pt-2 border-t border-slate-100">
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
                    className="text-xs font-bold text-forest-800 hover:text-gold-600 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Pelajari Rincian</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/program"
              className="inline-flex items-center gap-2 border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-white px-5 py-2.5 rounded text-xs font-bold transition-all"
            >
              <span>Lihat Seluruh Kurikulum & Ekstrakurikuler</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. FASILITAS KAMPUS (Mirip Seksi World-Class Infrastructure di Trident) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
              Sarana & Prasarana
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Lingkungan Belajar Asri & Representatif
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Terletak di kawasan Way Lalaan yang sejuk dan asri, mendukung fokus santri dalam menghafal Al-Qur'an dan menuntut ilmu.
            </p>
          </div>
          <Link
            to="/fasilitas"
            className="inline-flex items-center gap-2 text-xs font-bold text-forest-850 hover:text-gold-600 border border-slate-200 px-4 py-2 rounded transition-colors self-start md:self-auto"
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
                <span className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-sm text-gold-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                  {fac.category}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-forest-800 transition-colors">
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

      {/* 6. CALL TO ACTION BANNER PPDB (Mirip Banner Admissions Open di Referensi) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-forest-950 rounded-2xl p-8 sm:p-12 border-2 border-forest-900 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 border border-gold-500/40 px-3 py-1 rounded-full text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Tahun Ajaran 2027 / 2028</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Penerimaan Santri Baru (PPDB Online) Dibuka
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Daftarkan putra-putri Anda untuk menimba ilmu agama, menghafal Al-Qur'an, dan meraih prestasi akademik di lingkungan pesantren yang mandiri dan berkarakter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto z-10">
            <Link
              to="/ppdb"
              className="w-full sm:w-auto text-center bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold px-6 py-3 rounded text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <span>Daftar Sekarang Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SITE_INFO.contacts.ppdbWa}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center border border-white/30 hover:bg-white/10 text-white font-medium px-5 py-3 rounded text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Konsultasi WA Panitia</span>
            </a>
          </div>

          {/* Background Ornament Pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#d4972c_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        </div>
      </section>

      {/* 7. BERITA & AGENDA KEGIATAN */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                Warta & Dokumentasi
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Berita & Kegiatan Pesantren
              </h2>
            </div>
            <Link
              to="/berita"
              className="text-xs font-bold text-forest-800 hover:text-gold-600 inline-flex items-center gap-1"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_DATA.map((news) => (
              <article key={news.id} className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-gold-600 font-semibold">{news.category}</span>
                      <span>{news.date}</span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-slate-900 leading-snug hover:text-forest-800 transition-colors">
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
                    className="text-xs font-bold text-forest-800 hover:text-gold-600 inline-flex items-center gap-1"
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
