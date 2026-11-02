import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  Clock
} from 'lucide-react';
import { 
  NEWS_DATA, 
  TICKER_NEWS, 
  LATEST_POSTS, 
  DONT_MISS_NEWS
} from '../data/siteData';
import { createSlug } from '../utils/slug';

export const NewsPage: React.FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  // List headline pilihan untuk slide / carousel hero
  const heroSlides = [
    NEWS_DATA[0], // Wisuda Akbar
    NEWS_DATA[1], // Kajian Akbar
    NEWS_DATA[2], // PPDB Online
    NEWS_DATA[3]  // Olimpiade Sains
  ];

  const currentSlide = heroSlides[heroIndex] || heroSlides[0];

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-20">
      
      {/* 1. TOP TICKER STRIP (Marquee Infinite Scroll - Pause on Hover) */}
      <section className="bg-white border-b border-slate-200/80 overflow-hidden py-2.5 relative group">
        {/* Subtle Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee-rtl flex items-center">
          {/* Double array to create seamless loop */}
          {[...TICKER_NEWS, ...TICKER_NEWS].map((item, idx) => (
            <Link 
              key={idx} 
              to={`/berita/${createSlug(item.title)}`}
              className="flex items-center gap-3 pr-8 group/card cursor-pointer shrink-0 border-r border-slate-100 last:border-r-0 max-w-[320px] sm:max-w-[360px]"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[12px] font-semibold text-slate-800 line-clamp-1 leading-snug group-hover/card:text-emerald-700 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400">
                  <span className="font-semibold text-emerald-700">{item.category}</span>
                  <span>•</span>
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
        
        {/* 2. HERO SECTION: Big Headline Banner (Left 65%) + Upcoming Schedules / Top Scores (Right 35%) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Banner (7 Col) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-sm border border-slate-800/10 min-h-[420px] md:min-h-[460px] flex flex-col justify-end p-6 sm:p-10 group">
            {/* Background Image dengan Dark Gradient Overlay */}
            <img 
              src={currentSlide.image} 
              alt={currentSlide.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="absolute inset-0 bg-forest-950/20 mix-blend-multiply"></div>

            {/* Content Info */}
            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-sm">
                  {currentSlide.category}
                </span>
                <span className="text-emerald-300 text-xs font-semibold tracking-wide">
                  {currentSlide.subCategory || "Kabar Pilihan"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                {currentSlide.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {currentSlide.summary}
              </p>

              {/* Action & Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <Link 
                  to={`/berita/${createSlug(currentSlide.title)}`}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-emerald-500 hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Dot Pagination indicators */}
                <div className="flex items-center gap-1.5">
                  {heroSlides.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setHeroIndex(dotIdx)}
                      aria-label={`Slide ${dotIdx + 1}`}
                      className={`h-1.5 transition-all rounded-full ${
                        dotIdx === heroIndex 
                          ? 'w-6 bg-emerald-400' 
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Post Terbaru (Right Box - 4 Col, Light Clean Theme) */}
          <div className="lg:col-span-4 bg-white text-slate-800 rounded-2xl p-6 flex flex-col justify-between border border-slate-200/90 shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
                  <h3 className="font-bold text-sm tracking-wide text-slate-900 uppercase">
                    Postingan Terbaru
                  </h3>
                </div>
                <a 
                  href="#terbaru" 
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  Lihat Semua
                </a>
              </div>

              {/* List of Latest Posts */}
              <div className="divide-y divide-slate-100">
                {LATEST_POSTS.map((post, idx) => (
                  <Link 
                    key={idx} 
                    to={`/berita/${createSlug(post.title)}`}
                    className="py-3 flex items-center gap-3.5 group cursor-pointer block"
                  >
                    {/* Mini Thumbnail */}
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
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

            <div className="pt-4 mt-2 border-t border-slate-100 text-center">
              <a 
                href="#arsip"
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 group/link"
              >
                <span>Jelajahi seluruh kabar pondok</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </section>

        {/* 3. SECTION "Kabar Terhangat (Don't Miss)" - Full Width Bento Grid */}
        <section className="space-y-5">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4 bg-emerald-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Kabar Terhangat
              </h3>
            </div>
            <a 
              href="#semua-berita" 
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group/link"
            >
              <span>Lihat Seluruh Berita</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Tall Lead Feature Card (md:col-span-4 atau 5) */}
            <Link 
              to={`/berita/${createSlug(DONT_MISS_NEWS.tallLead.title)}`}
              className="md:col-span-5 relative rounded-2xl overflow-hidden min-h-[340px] md:min-h-[420px] group cursor-pointer border border-slate-200/90 shadow-sm flex flex-col justify-end p-6 block"
            >
              <img 
                src={DONT_MISS_NEWS.tallLead.image} 
                alt={DONT_MISS_NEWS.tallLead.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"></div>
              <div className="relative z-10 space-y-2.5">
                <span className="inline-block bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                  {DONT_MISS_NEWS.tallLead.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                  {DONT_MISS_NEWS.tallLead.title}
                </h4>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{DONT_MISS_NEWS.tallLead.timeAgo}</span>
                </p>
              </div>
            </Link>

            {/* 4 Cards Grid (md:col-span-7 -> 2 Kolom x 2 Baris) */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DONT_MISS_NEWS.gridItems.map((item, idx) => (
                <Link 
                  key={idx}
                  to={`/berita/${createSlug(item.title)}`}
                  className="relative rounded-2xl overflow-hidden h-48 sm:h-auto min-h-[195px] group cursor-pointer border border-slate-200/80 shadow-sm flex flex-col justify-end p-4 block"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"></div>
                  <div className="relative z-10 space-y-1.5">
                    <span className="inline-block bg-slate-900/80 backdrop-blur-sm border border-white/20 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-300 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-slate-400" />
                      <span>{item.timeAgo}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </section>

      </div>

    </div>
  );
};
