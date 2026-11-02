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
      <section className="bg-aurora-mesh border-b border-emerald-100 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center text-emerald-800 text-xs font-bold tracking-wider uppercase pb-1.5 border-b border-emerald-200">
            <span>Profil Lembaga & Legalitas</span>
          </div>
          <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Tentang Pondok Pesantren Al-Mursyid
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Menyelenggarakan pendidikan Islam terpadu yang berakar pada tradisi keilmuan Ahlussunnah wal Jama'ah dan berorientasi pada kemajuan peradaban.
          </p>
        </div>
      </section>

      {/* Profil Singkat & Sambutan Pimpinan */}
      <section id="profil" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-36 h-36 mx-auto rounded-full bg-forest-900 border-4 border-gold-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
              UM
            </div>
            <div>
              <h3 className=" font-bold text-lg text-slate-900">{SITE_INFO.leadership.pembina}</h3>
              <p className="text-xs text-gold-600 font-bold uppercase tracking-wider">Pembina & Pendiri Yayasan</p>
            </div>
            <p className="text-xs text-slate-500 italic">
              "Pendidikan terbaik adalah yang menanamkan kecintaan kepada Allah dan Rasul-Nya, memuliakan Al-Qur'an, dan memupuk kemandirian hidup."
            </p>
            <div className="pt-2 border-t border-slate-100 text-left text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">Yayasan Almursyid Tanggamus Lampung</p>
              <p className="text-[11px] text-slate-500">Way Lalaan Kampung Baru, Kota Agung Timur</p>
            </div>
          </div>

          <div id="sambutan" className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                Sambutan Pembina & Pimpinan
              </span>
              <h2 className=" text-2xl sm:text-3xl font-bold text-slate-900">
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

      {/* Visi & Misi — Architectural Editorial Split */}
      <section id="visi-misi" className="py-24 bg-cream-50/60 border-y border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/80">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-bold text-gold-600 uppercase tracking-widest block">
                Fondasi Filosofi & Nilai Luhur
              </span>
              <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                Visi & Misi Lembaga
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed font-normal">
              Arah pandang masa depan dan komitmen konkret Pondok Pesantren Al-Mursyid dalam mencetak kader ulama dan pemimpin bangsa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Visi — Monolithic Deep Forest Anchor */}
            <div className="lg:col-span-5 bg-aurora-surface text-slate-900 rounded-2xl p-8 sm:p-10 flex flex-col justify-between border border-emerald-200/70 shadow-sm relative overflow-hidden">
              <div className="space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Visi Utama</span>
                </div>
                
                <blockquote className=" text-2xl sm:text-3xl text-slate-900 font-bold leading-relaxed tracking-tight">
                  “Menjadi Lembaga Pendidikan Islam yang Melahirkan Ulama, Hafidz, dan Pemimpin Umat yang Berakhlakul Karimah serta Berdaya Saing.”
                </blockquote>
              </div>

              <div className="pt-8 mt-8 border-t border-emerald-100 text-xs text-slate-500 font-normal leading-relaxed relative z-10">
                Pondok Pesantren Al-Mursyid Islamic Boarding School · Tanggamus, Lampung
              </div>
            </div>

            {/* Misi — Clean Editorial List with Hairline Borders */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Empat Pilar Realisasi Misi
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">01 — 04</span>
                </div>

                <div className="divide-y divide-stone-100">
                  <div className="py-5 flex items-start gap-5 group">
                    <span className=" text-lg font-bold text-gold-600 shrink-0 w-8">01</span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-stone-900">Tahfidzul Qur'an Bersanad</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Menyelenggarakan pendidikan Tahfidzul Qur'an 30 Juz secara berjenjang, intensif, mutqin, dan bersambung sanad keilmuannya.
                      </p>
                    </div>
                  </div>

                  <div className="py-5 flex items-start gap-5 group">
                    <span className=" text-lg font-bold text-gold-600 shrink-0 w-8">02</span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-stone-900">Integrasi Turats & Sains</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Mengintegrasikan kajian kitab kuning klasik (Madrasah Diniyah) dengan kurikulum sains modern pendidikan nasional terakreditasi.
                      </p>
                    </div>
                  </div>

                  <div className="py-5 flex items-start gap-5 group">
                    <span className=" text-lg font-bold text-gold-600 shrink-0 w-8">03</span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-stone-900">Kemandirian & Adab Kepemimpinan</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Membina kedisiplinan hidup, jiwa kepemimpinan, dan kemandirian santri melalui kultur tata tertib asrama terpadu 24 jam.
                      </p>
                    </div>
                  </div>

                  <div className="py-5 flex items-start gap-5 group">
                    <span className=" text-lg font-bold text-gold-600 shrink-0 w-8">04</span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-stone-900">Penguasaan Bahasa Internasional</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Menumbuhkan keterampilan aktif berbahasa Arab dan Inggris sebagai instrumen dakwah global dan pembuka wawasan literatur dunia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Seksi Legalitas Resmi & Dokumen Negara (Prestige Trust Section) */}
      <section id="legalitas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-gold-600 uppercase tracking-widest block">
              Keabsahan Hukum & Ketetapan Negara
            </span>
            <h2 className=" text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Legalitas Resmi & Piagam Operasional
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
            Pondok Pesantren Al-Mursyid menyelenggarakan pendidikan di bawah ketetapan hukum Republik Indonesia melalui izin resmi Kemenag RI dan Kemenkumham RI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card Legalitas 1: Kemenag RI */}
          <div className="bg-aurora-surface text-slate-900 rounded-2xl p-8 border border-emerald-200/70 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-emerald-800 font-bold">Pemerintah RI · Dokumen I</span>
                <h3 className="font-bold text-xl text-slate-900">Piagam Terdaftar Pesantren</h3>
                <p className="text-xs font-semibold text-emerald-700">Kementerian Agama Republik Indonesia</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-white text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between py-2 border-b border-emerald-100 text-xs">
                <span className="text-slate-600 font-normal">Nomor Statistik Pesantren (NSP)</span>
                <span className="font-bold text-sm text-slate-900 bg-white px-2.5 py-1 rounded border border-emerald-200">
                  {SITE_INFO.legal.nsp}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-emerald-100 text-xs">
                <span className="text-slate-600 font-normal">Nomor Piagam</span>
                <span className="font-bold text-slate-900">{SITE_INFO.legal.piagamKemenag}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-emerald-100 text-xs">
                <span className="text-slate-600 font-normal">Tanggal Ditetapkan</span>
                <span className="font-bold text-slate-900">{SITE_INFO.legal.establishedDate}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-xs">
                <span className="text-slate-600 font-normal">Instansi Penerbit</span>
                <span className="font-bold text-slate-900">Ditjen Pendidikan Islam Kemenag RI</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic pt-2 border-t border-emerald-100 leading-relaxed">
              *Piagam Statistik Pesantren menjadi payung hukum resmi bagi santri dalam mengikuti ujian formal, memperoleh ijazah resmi, dan mengakses program beasiswa nasional.
            </p>
          </div>

          {/* Card Legalitas 2: Kemenkumham RI */}
          <div className="bg-aurora-surface text-slate-900 rounded-2xl p-8 border border-emerald-200/70 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-emerald-800 font-bold">Pemerintah RI · Dokumen II</span>
                <h3 className="font-bold text-xl text-slate-900">Pengesahan Badan Hukum Yayasan</h3>
                <p className="text-xs font-semibold text-emerald-700">Kementerian Hukum dan HAM Republik Indonesia</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-white text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <FileText className="w-5 h-5 stroke-[1.75]" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between py-2 border-b border-emerald-100 text-xs">
                <span className="text-slate-600 font-normal">Nama Badan Hukum</span>
                <span className="font-bold text-slate-900 text-right">{SITE_INFO.foundation}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-emerald-100 text-xs">
                <span className="text-slate-600 font-normal">Nomor SK Pengesahan</span>
                <span className="font-bold text-slate-900 text-right text-xs">{SITE_INFO.legal.kemenkumham}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-emerald-100 text-xs">
                <span className="text-slate-600 font-normal">Tanggal Pengesahan</span>
                <span className="font-bold text-slate-900">{SITE_INFO.legal.kemenkumhamDate}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-xs">
                <span className="text-slate-600 font-normal">Status Badan Hukum</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded text-[11px] border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Terdaftar & Aktif
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic pt-2 border-t border-emerald-100 leading-relaxed">
              *Akta notaris pendirian dan ketetapan menteri menjamin seluruh tata kelola aset wakaf, sarana pendidikan, dan manajemen yayasan terlindungi secara yuridis.
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
          <h2 className=" text-2xl sm:text-3xl font-bold text-slate-900">
            Struktur Organisasi Yayasan Almursyid
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Dikelola oleh para tokoh, asatidz, dan praktisi pendidikan yang berdedikasi tinggi untuk kemajuan santri.
          </p>
        </div>

        {/* Pendiri, Pembina, Pengawas Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-gold-600 tracking-wider">Pendiri Yayasan</span>
            <h4 className=" font-bold text-slate-900 text-sm">
              {SITE_INFO.leadership.founders.join(', ')}
            </h4>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-forest-800 tracking-wider">Pembina</span>
            <h4 className=" font-bold text-slate-900 text-sm">
              {SITE_INFO.leadership.pembina}
            </h4>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">Pengawas</span>
            <h4 className=" font-bold text-slate-900 text-sm">
              {SITE_INFO.leadership.pengawas}
            </h4>
          </div>
        </div>

        {/* Jajaran Pengurus Harian */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className=" font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            Jajaran Dewan Pengurus Yayasan & Pengelola Pesantren
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE_INFO.leadership.pengurus.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-stone-200 shadow-sm">
                <UserCheck className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-gold-600 font-normal">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
