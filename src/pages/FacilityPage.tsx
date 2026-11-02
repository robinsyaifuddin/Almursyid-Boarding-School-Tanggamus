import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Sparkles, CheckCircle2, ShieldCheck, 
  MapPin, ArrowRight 
} from 'lucide-react';
import { FACILITIES, SITE_INFO } from '../data/siteData';

export const FacilityPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-aurora-mesh border-b border-emerald-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center text-emerald-800 text-xs font-bold tracking-wider uppercase pb-1.5 border-b border-emerald-200">
            <span>Infrastruktur & Sarana Kampus</span>
          </div>
          <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Fasilitas Pondok Pesantren
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Menghadirkan lingkungan hunian dan pendidikan yang representatif, bersih, asri, serta aman di kawasan Way Lalaan, Tanggamus, Lampung.
          </p>
        </div>
      </section>

      {/* Grid Galeri Fasilitas Lengkap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-md text-gold-300 text-[11px] font-bold px-2.5 py-1 rounded-md border border-forest-800">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className=" font-bold text-lg text-slate-900 group-hover:text-forest-800 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-normal">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Terawat & Higienis
                </span>
                <span className="text-[11px] font-bold text-gold-600">Al-Mursyid Kampus</span>
              </div>
            </div>
          ))}
        </div>

        {/* Keamanan & Tata Tertib Pesantren */}
        <div className="bg-aurora-banner text-white rounded-2xl p-8 border border-emerald-500/20 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" /> Keamanan 24 Jam & Pendampingan Penuh
            </span>
            <h3 className=" text-xl sm:text-2xl font-bold text-white">
              Lingkungan Asrama Aman, Sehat, dan Terbimbing
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Pesantren dijaga sistem keamanan terpadu, pemisahan total area santri putra dan santri putri, pengawasan musyrif/musyrifah 24 jam, serta layanan kesehatan pertolongan pertama (P3K) di lingkungan pondok.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/ppdb"
              className="bg-white hover:bg-emerald-50 text-forest-950 font-bold px-6 py-3 rounded-lg text-xs tracking-wider inline-flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span>Daftarkan Putra-Putri Anda</span>
              <ArrowRight className="w-4 h-4 text-forest-900" />
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
};
