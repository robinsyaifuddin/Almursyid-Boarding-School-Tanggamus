import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Award, GraduationCap, Languages, 
  CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { PROGRAMS } from '../data/siteData';

export const ProgramPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 border border-gold-500/40 px-3 py-1 rounded text-xs font-semibold">
            <span>Kurikulum & Pengembangan Santri</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Program Pendidikan Terpadu
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Memadukan hafalan Al-Qur'an 30 Juz mutqin, penguasaan kitab kuning, kurikulum pendidikan nasional berijazah resmi, serta keterampilan bahasa internasional.
          </p>
        </div>
      </section>

      {/* Rincian 4 Program Utama */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Tahfidzul Qur'an */}
        <div id="tahfidz" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Program Unggulan Utama
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Tahfidzul Qur'an 30 Juz Bersanad
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Program pembinaan hafalan Al-Qur'an intensif yang mengedepankan ketepatan makharijul huruf, tajwid, dan kelancaran (mutqin). Santri dibimbing langsung dalam kelompok halaqah kecil (maksimal 12 santri) oleh para ustadz hafidz yang berpengalaman.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-slate-800">Metode Ziyadah & Talaqqi</strong>
                  <span className="text-slate-500">Setoran hafalan baru setiap subuh & maghrib</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-slate-800">Muraja'ah Terstruktur</strong>
                  <span className="text-slate-500">Pengulangan hafalan harian, mingguan, & bulanan</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-slate-800">Tasmi' 5 - 30 Juz Sekali Duduk</strong>
                  <span className="text-slate-500">Uji ketahanan hafalan di hadapan masyayikh</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-slate-800">Syahadah & Wisuda Tahfidz</strong>
                  <span className="text-slate-500">Ijazah sanad tahfidz bagi santri purna</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80"
              alt="Halaqah Tahfidz Qur'an"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* 2. Madrasah Diniyah & Kitab Kuning */}
        <div id="diniyah" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-5 order-2 lg:order-1 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80"
              alt="Kajian Kitab Kuning"
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4" /> Khazanah Keilmuan Ulama
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Madrasah Diniyah & Kajian Kitab Kuning
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Mewarisi tradisi keilmuan pesantren dengan mempelajari literatur Islam klasik (kitab gundul) berjenjang. Melatih kemampuan membaca teks Arab, memahami hukum fiqih amaliah, kemurnian aqidah, dan keluhuran tasawuf.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <strong className="text-forest-900 block mb-0.5">Materi Kajian:</strong>
                <p className="text-slate-600">Nahwu & Shorof (Al-Ajurumiyyah, Imrithi), Fiqih (Safinatun Najah, Fathul Qorib), Aqidah (Aqidatul Awwam, Tijan ad-Darori), Hadits (Arba'in An-Nawawiyyah), dan Akhlak (Ta'lim Muta'allim).</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SMP & SMA Islam Terpadu */}
        <div id="formal" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Kurikulum Nasional & Terakreditasi
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              SMP & SMA Islam Boarding School
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Menyelenggarakan pembelajaran umum berbasis Kurikulum Merdeka yang diperkaya nilai-nilai Islam. Lulusan memperoleh ijazah resmi negara, berdaya saing tinggi untuk menembus Perguruan Tinggi Negeri (PTN), sekolah kedinasan, maupun universitas terkemuka di Timur Tengah.
            </p>

            <ul className="space-y-2 pt-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Penguatan Literasi Sains, Matematika, dan Teknologi Komputer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bimbingan intensif persiapan UTBK-SNBT & seleksi beasiswa Timur Tengah</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tenaga pengajar berdedikasi, lulusan perguruan tinggi ternama</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
              alt="Santri Belajar Formal"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* 4. Ekstrakurikuler & Bahasa */}
        <div id="ekskul" className="scroll-mt-24 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest flex items-center gap-2">
              <Languages className="w-4 h-4" /> Pengembangan Minat & Bakat
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Ekstrakurikuler & Pembiasaan Bahasa
            </h2>
            <p className="text-sm text-slate-600">
              Membekali santri keterampilan komunikasi internasional serta ragam kegiatan ekstrakurikuler yang menyehatkan raga dan mengasah kreativitas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-2">
              <h4 className="font-serif font-bold text-sm text-slate-900">Bilingual Daily</h4>
              <p className="text-xs text-slate-600">Pemberian kosakata (mufradat/vocabulary) setiap ba'da subuh dan hari wajib berbahasa Arab & Inggris.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-2">
              <h4 className="font-serif font-bold text-sm text-slate-900">Pramuka Pesantren</h4>
              <p className="text-xs text-slate-600">Gugus depan kepanduan untuk menanamkan kedisiplinan, survival skill, gotong royong, dan cinta tanah air.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-2">
              <h4 className="font-serif font-bold text-sm text-slate-900">Khat & Kaligrafi</h4>
              <p className="text-xs text-slate-600">Seni menulis mushaf Al-Qur'an dan kaidah khat Riq'ah, Naskhi, dan Tsuluts berstandar seni islami.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-2">
              <h4 className="font-serif font-bold text-sm text-slate-900">Khitobah & Pidato</h4>
              <p className="text-xs text-slate-600">Latihan public speaking 3 bahasa (Indonesia, Arab, Inggris) untuk melatih keberanian berdakwah.</p>
            </div>
          </div>
        </div>

      </section>

      {/* CTA Pendaftaran */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-forest-950 text-white rounded-2xl p-8 sm:p-12 border-2 border-gold-500/40 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Siap Menjadi Bagian dari Keluarga Besar Al-Mursyid?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Pendaftaran dibuka setiap tahun ajaran baru dengan kuota selektif. Konsultasikan jalur pendaftaran bersama tim panitia kami.
          </p>
          <div className="pt-2">
            <Link
              to="/ppdb"
              className="bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold px-6 py-3 rounded text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
            >
              <span>Daftar Santri Baru Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
