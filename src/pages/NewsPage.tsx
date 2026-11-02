import React from 'react';
import { Calendar, Tag, ArrowRight, User } from 'lucide-react';
import { NEWS_DATA } from '../data/siteData';

export const NewsPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 border border-gold-500/40 px-3 py-1 rounded text-xs font-semibold">
            <span>Kabar Pesantren & Agenda</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Berita & Kegiatan Santri
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Ikuti informasi terkini seputar dinamika dakwah, prestasi tahfidz santri, kajian akbar, dan agenda resmi Pondok Pesantren Al-Mursyid Tanggamus.
          </p>
        </div>
      </section>

      {/* Grid Berita */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_DATA.map((item) => (
            <article 
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-md text-gold-300 text-[10px] font-bold px-2.5 py-1 rounded border border-forest-800">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="text-slate-500">Humas Al-Mursyid</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900 leading-snug hover:text-forest-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50">
                <button
                  type="button"
                  className="text-xs font-bold text-forest-800 hover:text-gold-600 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Baca Liputan Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
