import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, ShieldCheck, FileText, CheckCircle2, UserCheck, 
  BookOpen, HeartHandshake, Compass, MapPin, ArrowRight
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';

export const AboutPage: React.FC = () => {
  const { siteInfo: STORE_SITE_INFO } = useAppStoreData();
  const SITE_INFO = STORE_SITE_INFO || FALLBACK_SITE_INFO;

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HERO SECTION — Inspirasi Gambar 2 (Architectural Editorial Hero) */}
      <section className="relative overflow-hidden border-b border-stone-200/70 pt-8 pb-10 md:pt-12 md:pb-12">
        {/* Subtle Concentric Rings Background (Watermark arsitektural) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
          <div className="w-[600px] h-[600px] rounded-full border border-slate-900"></div>
          <div className="w-[900px] h-[900px] rounded-full border border-slate-900 absolute"></div>
          <div className="w-[1200px] h-[1200px] rounded-full border border-slate-900 absolute"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Headline Utama & Layout Konten Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Sisi Kiri: Main Editorial Headline + Subtext */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-5 max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                  Membangun ekosistem Qur'ani yang tenang & beradab.
                </h1>
                
                <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal">
                  Pondok Pesantren Al-Mursyid didirikan di Tanggamus, Lampung untuk menghadirkan lingkungan belajar bebas distraksi, berdisiplin tinggi, dan berakar pada tradisi keilmuan Ahlussunnah wal Jama'ah.
                </p>
              </div>
            </div>

            {/* Sisi Kanan: Circular Editorial Poster Grid (Inspirasi Gambar 2) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[360px] sm:max-w-[390px] relative">
                
                {/* 2-Column Exact Layout: Kolom Kiri & Kolom Kanan */}
                <div className="grid grid-cols-2 gap-3 items-start">
                  
                  {/* KOLOM KIRI */}
                  <div className="space-y-3">
                    {/* Foto Kiri Atas: Busur Lingkaran 90 Derajat Kiri-Atas */}
                    <div className="relative aspect-[3/4] rounded-tl-[145px] overflow-hidden bg-stone-200 border border-stone-200/80 shadow-2xs group">
                      <span className="absolute top-3 left-4 z-10 text-[11px] font-bold text-stone-700 tracking-wider">
                        '22
                      </span>
                      <img 
                        src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80" 
                        alt="Kawasan Santri Al-Mursyid" 
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    {/* Teks Typography Grid: Pas di bawah foto kiri atas */}
                    <div className="space-y-2.5 pt-1 pr-1">
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 leading-none">
                        TAHFIDZ<br />
                        AKHLAQ<br />
                        MANDIRI
                      </h3>
                    </div>
                  </div>

                  {/* KOLOM KANAN */}
                  <div className="space-y-3">
                    {/* Foto Kanan Atas: Busur Lingkaran 90 Derajat Kanan-Atas */}
                    <div className="relative aspect-[4/3] rounded-tr-[145px] overflow-hidden bg-stone-200 border border-stone-200/80 shadow-2xs group">
                      <img 
                        src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80" 
                        alt="Fasilitas Asrama Al-Mursyid" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    </div>

                    {/* Foto Kanan Tengah: Persegi Landscape */}
                    <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-stone-200 border border-stone-200/80 shadow-2xs group">
                      <img 
                        src="https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80" 
                        alt="Lingkungan Belajar Diniyah" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                  </div>

                </div>

                {/* Teks Memanjang ke Samping di Bawah Grid Foto */}
                <div className="pt-2.5 border-t border-stone-200/80 mt-1">
                  <p className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-stone-700 leading-snug">
                    Menempa adab, memuliakan kalamullah, dan membina kemandirian santri di bumi Way Lalaan Tanggamus.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SAMBUTAN PIMPINAN & LEMBAGA — Editorial Split Clean (Gaya Poster Gambar 2) */}
      <section id="sambutan" className="pt-8 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-stone-100/70 p-4 sm:p-6 lg:p-8 rounded-3xl border border-stone-200/90 shadow-2xs">
          
          {/* Kolom Kiri: Poster Profil Tokoh (4 Kolom - Full Height Sejajar dengan Kolom Kanan) */}
          <div className="lg:col-span-4 flex">
            {/* Foto Tokoh Full Frame */}
            <div className="w-full rounded-3xl overflow-hidden bg-stone-900 border border-emerald-900/50 shadow-md group relative min-h-[350px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
                alt={SITE_INFO.leadership.pembina} 
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent flex flex-col justify-end p-6 text-center">
                <p className="text-lg font-bold tracking-tight text-white drop-shadow-sm">{SITE_INFO.leadership.pembina}</p>
                <p className="text-xs text-emerald-300 font-sans tracking-wide">Pembina & Pendiri Yayasan</p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Slab Hijau Forest Memanjang ke Samping yang Berisi Teks Sambutan (8 Kolom) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#06372b] via-[#0b4839] to-[#06372b] text-white rounded-3xl rounded-tr-[80px] rounded-bl-[80px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-lg space-y-6">
            
            {/* Header Card Hijau */}
            <div className="border-b border-white/20 pb-4">
              <span className="text-[11px] uppercase tracking-widest text-emerald-200 block font-medium">
                Sambutan Pimpinan
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mt-1 drop-shadow-sm">
                Membangun Generasi Penjaga Kalamullah
              </h3>
            </div>

            {/* Isi Teks Sambutan Lengkap */}
            <div className="space-y-4 text-sm sm:text-base text-white/95 leading-relaxed font-normal">
              <p className="font-semibold text-white">
                Assalamu’alaikum Warahmatullahi Wabarakatuh.
              </p>
              <p>
                Pondok Pesantren Al-Mursyid didirikan di bawah naungan Yayasan Almursyid Tanggamus Lampung dengan tekad luhur: menyediakan lingkungan belajar yang aman, kondusif, dan sarat nilai ibadah bagi putra-putri kaum muslimin.
              </p>
              <p>
                Melalui sinergi kurikulum diniyah pesantren, tahfidz 30 juz bersanad, dan pendidikan formal, kami membimbing para santri menjadi pribadi yang mutqin, berakhlakul karimah, serta siap berkontribusi nyata bagi agama dan bangsa.
              </p>
              <p className="font-semibold text-white pt-1">
                Wassalamu’alaikum Warahmatullahi Wabarakatuh.
              </p>
            </div>

            {/* Footer Slab Hijau */}
            <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-emerald-100/90">
              <p>WAY LALAAN, KOTA AGUNG TIMUR</p>
              <p className="text-emerald-200 font-bold">PROVINSI LAMPUNG</p>
            </div>

          </div>

        </div>
      </section>

      {/* VISI & MISI — Architectural Editorial 4-Columns (Inspirasi Gambar 2) */}
      <section id="visi-misi" className="py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Top Row: Heading Kiri & Box Slab Visi Utama di Sebelah Kanan Atas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sisi Kiri Atas: Headline Besar */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Visi & Tiga<br className="hidden sm:inline" /> Pilar Misi
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-md pt-1">
                Arah pandang peradaban dan langkah konkret Pondok Pesantren Al-Mursyid dalam mencetak kader huffadz dan santri berintegritas.
              </p>
            </div>

            {/* Sisi Kanan Atas: Box Slab Visi Utama (Mirip Slab Hitam Gambar 2) */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#06372b] via-[#0b4839] to-[#06372b] text-white p-7 sm:p-9 rounded-3xl border border-white/10 shadow-lg relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-[11px] uppercase tracking-widest text-emerald-200 font-semibold">
                  Visi Utama Lembaga
                </span>
                <span className="text-[11px] text-emerald-300/80">
                  EST. 2022
                </span>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-white">
                “Menjadi Lembaga Pendidikan Islam yang Melahirkan Ulama, Hafidz, dan Pemimpin Umat yang Berakhlakul Karimah serta Berdaya Saing.”
              </blockquote>

              <div className="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-[11px] text-emerald-200/90">
                <span>PONDOK PESANTREN AL-MURSYID</span>
                <span className="text-white font-bold">TANGGAMUS, LAMPUNG</span>
              </div>
            </div>

          </div>

          {/* Bottom Row: 3 Kotak Pilar Misi Membentang Horizontal ala Gambar 2 */}
          <div className="space-y-6">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block">
                  Tiga Pilar Misi Pesantren
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
              </div>
              <span className="text-xs text-stone-700">01 — 03</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Kotak Misi 1 */}
              <div className="group bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-emerald-700/40 transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold">Pilar I</span>
                    <span className="text-xs text-stone-700">01</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    Menyelenggarakan Pendidikan Tahfidz
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Membina hafalan Al-Qur'an secara talaqqi, ziyadah berjenjang, dan muraja'ah intensif demi mencetak santri penghafal Al-Qur'an mutqin.
                  </p>
                </div>
                <div className="pt-3 border-t-2 border-slate-900 group-hover:border-emerald-600 transition-colors flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
                  <span>Tahfidzul Qur'an</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Kotak Misi 2 */}
              <div className="group bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-emerald-700/40 transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold">Pilar II</span>
                    <span className="text-xs text-stone-700">02</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    Mengintegrasikan Ilmu Agama dan Umum
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Memadukan kurikulum turats kitab kuning kepesantrenan dengan sains pendidikan nasional formal agar santri berwawasan seimbang.
                  </p>
                </div>
                <div className="pt-3 border-t-2 border-slate-900 group-hover:border-emerald-600 transition-colors flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
                  <span>Integrasi Kurikulum</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Kotak Misi 3 */}
              <div className="group bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-emerald-700/40 transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold">Pilar III</span>
                    <span className="text-xs text-stone-700">03</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    Membina Kemandirian Santri
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Menumbuhkan kedisiplinan hidup, adab akhlakul karimah, dan jiwa kepemimpinan melalui tata kehidupan asrama 24 jam.
                  </p>
                </div>
                <div className="pt-3 border-t-2 border-slate-900 group-hover:border-emerald-600 transition-colors flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
                  <span>Adab & Mandiri</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* LEGALITAS RESMI NEGARA — Exact 3-Column Editorial Layout (Gambar 2 Referensi) */}
      <section id="legalitas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Layout: Kolom 1 Teks Judul Kiri, Kolom 2 & 3 Dua Card Sejajar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* KOLOM KIRI (4 Kolom): Headline Arsitektur & Narasi Pembuka */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 pr-0 lg:pr-4">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight lg:leading-[1.08]">
              Legalitas Resmi Pesantren
            </h2>

            <div className="space-y-2 pt-1 sm:pt-2">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block">
                  PAYUNG HUKUM RESMI
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
              </div>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Pondok Pesantren Al-Mursyid didirikan dan beroperasi di bawah legalitas penuh ketetapan Kementerian Agama RI serta Kementerian Hukum dan HAM Republik Indonesia.
              </p>
            </div>
          </div>

          {/* DUA KARTU SEJAJAR DI SAMPING KANAN (Ukuran A4 Portrait Minimalis) */}
          <div className="lg:col-span-8 flex justify-center lg:justify-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl w-full">
              
              {/* Card 1: Piagam Kemenag RI */}
              <div className="group bg-emerald-50/40 rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                {/* Gambar A4 Portrait (Rasio 1:1.414 / ~3:4) */}
                <div className="relative aspect-[1/1.4] max-h-72 overflow-hidden bg-stone-200">
                  <img 
                    src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80" 
                    alt="Piagam Terdaftar Pesantren Kemenag RI" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Konten Dokumen Bawah Ringkas Tanpa Deskripsi Panjang */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold block">
                      KEMENTERIAN AGAMA RI
                    </span>
                    
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                      Piagam Terdaftar Pesantren (NSP)
                    </h3>
                  </div>

                  {/* Footer Card ala Gambar 2 (Label Kiri + Tombol Panah Bulat Kanan) */}
                  <div className="pt-3 border-t border-stone-300/60 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-stone-700 block">Ditetapkan</span>
                      <span className="text-[11px] font-bold text-slate-800">{SITE_INFO.legal.establishedDate}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border border-stone-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center text-stone-700 shadow-2xs">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: SK Kemenkumham RI */}
              <div className="group bg-emerald-50/40 rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                {/* Gambar A4 Portrait (Rasio 1:1.414 / ~3:4) */}
                <div className="relative aspect-[1/1.4] max-h-72 overflow-hidden bg-stone-200">
                  <img 
                    src="https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80" 
                    alt="Pengesahan Badan Hukum Yayasan Kemenkumham RI" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Konten Dokumen Bawah Ringkas Tanpa Deskripsi Panjang */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold block">
                      KEMENKUMHAM REPUBLIK INDONESIA
                    </span>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                      Pengesahan Badan Hukum Yayasan
                    </h3>
                  </div>

                  {/* Footer Card ala Gambar 2 (Label Kiri + Tombol Panah Bulat Kanan) */}
                  <div className="pt-3 border-t border-stone-300/60 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-stone-700 block">Status Hukum</span>
                      <span className="text-[11px] font-bold text-emerald-800">Terdaftar & Aktif</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border border-stone-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center text-stone-700 shadow-2xs">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* STRUKTUR PENGURUS & DEWAN — Editorial Bento Cards (Inspirasi Gambar 2) */}
      <section id="pengurus" className="py-20 bg-stone-50/50 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Section ala Gambar 2 (/ Label kecil, Bold Headline Kiri, Deskripsi + Links Kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block">
                  Struktur Kepengurusan
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
                Amanah Dewan &amp; Pengelola Yayasan
              </h2>
            </div>

            <div className="lg:col-span-5 space-y-4 lg:text-left">
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Sinergi dewan pembina, pengawas, dan pengurus harian dalam mengemban amanah pembinaan generasi santri yang berakhlakul karimah dan berwawasan luas.
              </p>
              <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-emerald-800">
                <span className="inline-flex items-center gap-1 hover:text-emerald-950 transition-colors cursor-default">
                  Yayasan Almursyid Tanggamus &rsaquo;
                </span>
                <a href={`https://wa.me/${SITE_INFO.contacts.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                  Hubungi Sekretariat &rsaquo;
                </a>
              </div>
            </div>
          </div>

          {/* Baris 1: Dewan Utama (Pembina & Pengawas) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-700"></div>
              <h3 className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
                Dewan Pembina &amp; Pengawas
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Pembina - Card Profil dengan Frame Foto Rapi & Elegan */}
              <div className="group relative rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between">
                <div className="flex items-start gap-5">
                  {/* Frame Foto Portrait Profil */}
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/80 shadow-2xs">
                    <img
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80"
                      alt={SITE_INFO.leadership.pembina}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
                  </div>

                  {/* Informasi Profil */}
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/70 font-semibold">
                      Amanah Tertinggi
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-800 font-bold block">
                        PEMBINA YAYASAN
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        {SITE_INFO.leadership.pembina}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      Pondok Pesantren Al-Mursyid Tanggamus, pembina arah kebijakan strategis &amp; kepesantrenan.
                    </p>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-700">Yayasan Almursyid Tanggamus</span>
                  <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold shadow-2xs group-hover:bg-emerald-900 transition-colors">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Card Pengawas - Card Profil dengan Frame Foto Rapi & Elegan */}
              <div className="group relative rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between">
                <div className="flex items-start gap-5">
                  {/* Frame Foto Portrait Profil */}
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/80 shadow-2xs">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
                      alt={SITE_INFO.leadership.pengawas}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
                  </div>

                  {/* Informasi Profil */}
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-stone-100 text-stone-700 border border-stone-200 font-semibold">
                      Tata Kelola
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-800 font-bold block">
                        PENGAWAS YAYASAN
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        {SITE_INFO.leadership.pengawas}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      Memastikan kepatuhan tata kelola, keterbukaan manajerial, dan operasional yayasan.
                    </p>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-700">Pengawasan Berkala</span>
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-2xs group-hover:bg-emerald-800 transition-colors">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Baris 2: Jajaran Dewan Pengurus (Card Profil Frame Foto ala Gambar 2) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-700"></div>
                <h3 className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
                  Dewan Pengurus Harian
                </h3>
              </div>
              <span className="text-xs text-stone-800">
                Total {SITE_INFO.leadership.pengurus.length} Bidang Kepengurusan
              </span>
            </div>

            {/* Grid 6 Kartu Profil Sejajar Kesamping dengan Rasio Gambar 3:4 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {SITE_INFO.leadership.pengurus.map((item: any, idx: number) => {
                // Foto profil: gunakan foto upload jika ada, jika tidak fallback ke template bawaan
                const profilePhotos = [
                  "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80", // Pungut Sarifuddin (Ketua)
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80", // Astoya Saimulani (Sekretaris)
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80", // Muhammad Al Ashimi (Bendahara)
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80", // Agus Aftah (Div. Pendidikan)
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80", // Fia Aulia (Kepengurusan Putri & Asrama)
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80", // Novi Yani (Administrasi & Keuangan)
                ];
                const photoSrc = item.image || profilePhotos[idx % profilePhotos.length];
                const isLeader = idx === 0;

                return (
                  <div
                    key={idx}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-2.5 sm:p-3 flex flex-col justify-between"
                  >
                    {/* Frame Foto Profile Rasio Aspect 3:4 */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/70">
                      <img
                        src={photoSrc}
                        alt={item.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Konten Teks Bawah */}
                    <div className="pt-2.5 px-0.5 flex items-end justify-between gap-1.5">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold block truncate">
                          {item.role}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-snug line-clamp-2 mt-0.5" title={item.name}>
                          {item.name}
                        </h4>
                      </div>

                      {/* Tombol Bulat Panah */}
                      <div className="shrink-0 w-7 h-7 rounded-full bg-white border border-stone-300 text-slate-900 flex items-center justify-center font-bold shadow-2xs group-hover:bg-emerald-800 group-hover:text-white group-hover:border-emerald-800 transition-all duration-300">
                        <ArrowRight className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

