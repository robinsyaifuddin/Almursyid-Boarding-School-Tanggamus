import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, CheckCircle2, Award, 
  Users, MapPin, Building, ArrowRight, UserCheck
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner Halaman */}
      <section className="bg-forest-950 text-white py-16 border-b-4 border-gold-500 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 border border-gold-500/40 px-3 py-1 rounded text-xs font-semibold">
            <span>Profil Lembaga & Legalitas</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Tentang Pondok Pesantren Al-Mursyid
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Menyelenggarakan pendidikan Islam terpadu yang berakar pada tradisi keilmuan Ahlussunnah wal Jama'ah dan berorientasi pada kemajuan peradaban.
          </p>
        </div>
      </section>

      {/* Profil Singkat & Sambutan Pimpinan */}
      <section id="profil" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-36 h-36 mx-auto rounded-full bg-forest-900 border-4 border-gold-500 flex items-center justify-center text-white text-4xl font-serif font-bold shadow-md">
              UM
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">{SITE_INFO.leadership.pembina}</h3>
              <p className="text-xs text-gold-600 font-semibold uppercase tracking-wider">Pembina & Pendiri Yayasan</p>
            </div>
            <p className="text-xs text-slate-500 italic">
              "Pendidikan terbaik adalah yang menanamkan kecintaan kepada Allah dan Rasul-Nya, memuliakan Al-Qur'an, dan memupuk kemandirian hidup."
            </p>
            <div className="pt-2 border-t border-slate-100 text-left text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Yayasan Almursyid Tanggamus Lampung</p>
              <p className="text-[11px] text-slate-500">Way Lalaan Kampung Baru, Kota Agung Timur</p>
            </div>
          </div>

          <div id="sambutan" className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                Sambutan Pembina & Pimpinan
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Membangun Generasi Penjaga Kalamullah
              </h2>
            </div>
            
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Assalamu’alaikum Warahmatullahi Wabarakatuh.</strong>
              </p>
              <p>
                Segala puji bagi Allah Subhanahu wa Ta’ala yang telah memberikan karunia taufik dan hidayah-Nya. Shalawat serta salam senantiasa tercurah kepada junjungan kita Nabi Muhammad Shalallahu ‘Alaihi Wassalam, keluarga, sahabat, dan umatnya yang istiqamah hingga akhir zaman.
              </p>
              <p>
                Pondok Pesantren Al-Mursyid didirikan di bawah naungan Yayasan Almursyid Tanggamus Lampung dengan tekad luhur: menyediakan lingkungan belajar yang aman, bersih, kondusif, dan sarat nilai ibadah bagi putra-putri kaum muslimin. Di tengah tantangan era modern, benteng pertahanan terbaik generasi muda adalah hafalan Al-Qur'an yang mutqin, pemahaman syariat Islam yang kokoh, serta keteladanan akhlakul karimah.
              </p>
              <p>
                Melalui sinergi antara kurikulum diniyah pesantren, tahfidz 30 juz, dan pendidikan formal, kami berkomitmen mengantarkan para santri menjadi pribadi yang bermanfaat bagi agama, orang tua, nusa, dan bangsa. Kami menyambut kehadiran para calon santri dan para wali santri untuk bersama-sama mendidik tunas peradaban di Pondok Pesantren Al-Mursyid.
              </p>
              <p>
                <strong className="text-slate-900">Wassalamu’alaikum Warahmatullahi Wabarakatuh.</strong>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Visi & Misi */}
      <section id="visi-misi" className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
              Pedoman & Nilai Luhur
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Visi & Misi Lembaga
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Box Visi */}
            <div className="bg-forest-950 text-white rounded-2xl p-8 border-2 border-forest-900 shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  Visi Pesantren
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  "Menjadi Lembaga Pendidikan Islam yang Melahirkan Ulama, Hafidz, dan Pemimpin Umat yang Berakhlakul Karimah serta Berdaya Saing."
                </h3>
              </div>
              <div className="pt-6 border-t border-forest-850 text-xs text-slate-300">
                Pondok Pesantren Al-Mursyid Islamic Boarding School Tanggamus Lampung
              </div>
            </div>

            {/* Box Misi */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-forest-800 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                Misi Utama
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                  <span>Menyelenggarakan pendidikan Tahfidzul Qur'an 30 Juz secara berjenjang, intensif, mutqin, dan bersanad.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                  <span>Mengintegrasikan ilmu agama (Madrasah Diniyah & kajian kitab kuning) dengan ilmu pengetahuan umum kurikulum nasional.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                  <span>Membina kemandirian, kedisiplinan, jiwa kepemimpinan, dan kecakapan hidup santri melalui tata tertib asrama terpadu.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                  <span>Menumbuhkan penguasaan bahasa Arab dan Inggris sebagai instrumen dakwah global dan pembuka literatur keilmuan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seksi Legalitas Resmi & Dokumen Negara (Highlight Utama) */}
      <section id="legalitas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-l-4 border-gold-500 pl-4 space-y-1">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
            Keabsahan Hukum & Izin Operasional
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Legalitas Resmi Yayasan & Piagam Pesantren
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Seluruh operasional pendidikan berada di bawah payung hukum yang sah dan diakui Kementerian Agama RI serta Kementerian Hukum dan HAM RI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Legalitas 1: Kemenag RI */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">Piagam Terdaftar Pesantren</h3>
                <p className="text-xs text-emerald-700 font-semibold">Kementerian Agama Republik Indonesia</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Nomor Piagam:</span>
                <span className="font-mono font-bold text-slate-800">{SITE_INFO.legal.piagamKemenag}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Nomor Statistik Pesantren (NSP):</span>
                <span className="font-mono font-bold text-forest-850 bg-emerald-100/60 px-2 py-0.5 rounded text-sm">{SITE_INFO.legal.nsp}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Tanggal Ditetapkan:</span>
                <span className="font-semibold text-slate-800">{SITE_INFO.legal.establishedDate}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Instansi Penerbit:</span>
                <span className="font-semibold text-slate-800">Ditjen Pendidikan Islam Kemenag RI</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              *Piagam Statistik Pesantren merupakan bukti legalitas sah bagi santri dalam mengikuti program ujian formal, ijazah negara, maupun beasiswa resmi.
            </p>
          </div>

          {/* Card Legalitas 2: Kemenkumham RI */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-gold-700 flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">Pengesahan Badan Hukum Yayasan</h3>
                <p className="text-xs text-gold-700 font-semibold">Kemenkumham Republik Indonesia</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Nama Yayasan:</span>
                <span className="font-bold text-slate-800">{SITE_INFO.foundation}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Nomor SK Pengesahan:</span>
                <span className="font-mono font-bold text-slate-800 text-[11px]">{SITE_INFO.legal.kemenkumham}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Tanggal Pengesahan:</span>
                <span className="font-semibold text-slate-800">{SITE_INFO.legal.kemenkumhamDate}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Status Kelembagaan:</span>
                <span className="font-semibold text-emerald-700">Badan Hukum Aktif & Resmi</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              *Demi menjaga privasi dan keamanan identitas para pendiri, Nomor Induk Kependudukan (NIK) pada berkas publik dilindungi.
            </p>
          </div>

        </div>
      </section>

      {/* Susunan Pengurus & Dewan Yayasan */}
      <section id="pengurus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-l-4 border-forest-800 pl-4 space-y-1">
          <span className="text-xs font-bold text-forest-800 uppercase tracking-widest">
            Amanah Kepemimpinan
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Struktur Organisasi Yayasan Almursyid
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Dikelola oleh para tokoh, asatidz, dan praktisi pendidikan yang berdedikasi tinggi untuk kemajuan santri.
          </p>
        </div>

        {/* Pendiri, Pembina, Pengawas Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-gold-600 tracking-wider">Pendiri Yayasan</span>
            <h4 className="font-serif font-bold text-slate-900 text-sm">
              {SITE_INFO.leadership.founders.join(', ')}
            </h4>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-forest-800 tracking-wider">Pembina</span>
            <h4 className="font-serif font-bold text-slate-900 text-sm">
              {SITE_INFO.leadership.pembina}
            </h4>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">Pengawas</span>
            <h4 className="font-serif font-bold text-slate-900 text-sm">
              {SITE_INFO.leadership.pengawas}
            </h4>
          </div>
        </div>

        {/* Jajaran Pengurus Harian */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            Jajaran Dewan Pengurus Yayasan & Pengelola Pesantren
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE_INFO.leadership.pengurus.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <UserCheck className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-gold-600 font-medium">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
