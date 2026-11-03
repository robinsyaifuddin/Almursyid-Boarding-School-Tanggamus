import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ZoomIn, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/siteData';

export const GalleryPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Touch gesture state for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % GALLERY_ITEMS.length;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    });
  }, []);

  // Keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setActiveIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handleNext, handlePrev]);

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45; // px threshold

    if (distance > minSwipeDistance) {
      // Swiped left -> next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeItem: GalleryItem | null = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Header editorial ala Bento */}
        <header className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block">
              Our Stories
            </span>
            <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.08]">
              Photo Gallery
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xs sm:text-right leading-relaxed font-normal">
              Dokumentasi visual keseharian dan ragam kegiatan santri Al-Mursyid Islamic Boarding School.
            </p>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="space-y-3 sm:space-y-4">
          
          {/* Row 1 (Wide 8/12 + Normal 4/12) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {GALLERY_ITEMS[0] && (
              <div 
                onClick={() => setActiveIndex(0)}
                className="md:col-span-8 group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <img 
                  src={GALLERY_ITEMS[0].image} 
                  alt={GALLERY_ITEMS[0].title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {GALLERY_ITEMS[1] && (
              <div 
                onClick={() => setActiveIndex(1)}
                className="md:col-span-4 group relative aspect-[4/3] md:aspect-auto md:h-full rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <img 
                  src={GALLERY_ITEMS[1].image} 
                  alt={GALLERY_ITEMS[1].title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Row 2 (3 Equal Cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[2, 3, 4].map((idx) => {
              const item = GALLERY_ITEMS[idx];
              if (!item) return null;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/3.5] rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 3 (Inverted: Normal 4/12 + Wide 8/12) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {GALLERY_ITEMS[5] && (
              <div 
                onClick={() => setActiveIndex(5)}
                className="md:col-span-4 group relative aspect-[4/3] md:aspect-auto md:h-full rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <img 
                  src={GALLERY_ITEMS[5].image} 
                  alt={GALLERY_ITEMS[5].title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {GALLERY_ITEMS[6] && (
              <div 
                onClick={() => setActiveIndex(6)}
                className="md:col-span-8 group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <img 
                  src={GALLERY_ITEMS[6].image} 
                  alt={GALLERY_ITEMS[6].title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Row 4 (3 Equal Cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[7, 8, 9].map((idx) => {
              const item = GALLERY_ITEMS[idx];
              if (!item) return null;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/3.5] rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remaining Items (10, 11) */}
          {[10, 11].some((idx) => GALLERY_ITEMS[idx]) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1">
              {[10, 11].map((idx) => {
                const item = GALLERY_ITEMS[idx];
                if (!item) return null;
                return (
                  <div 
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Lightbox Instagram / Editorial Slider Card ala Gambar 2 */}
      {activeItem && activeIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setActiveIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Top Bar: swipe indicator & close button */}
          <div className="w-full max-w-xl flex items-center justify-between pb-3 px-1 text-white">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold tracking-wide text-white/90 hover:text-white transition-opacity active:scale-95"
            >
              <span>swipe</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setActiveIndex(null)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Card ala Gambar 2 (Thin White Outer Border, Clean & Modern) */}
          <div 
            className="relative w-full max-w-xl bg-white p-1 sm:p-1.5 rounded-[22px] sm:rounded-[26px] shadow-2xl overflow-hidden border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Image Container with Rounded Corners */}
            <div className="relative w-full aspect-[4/4] sm:aspect-[4/3.8] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-stone-950">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                key={activeItem.id}
                className="w-full h-full object-cover animate-in fade-in zoom-in-[0.98] duration-200"
              />

              {/* Counter Badge Pojok Kiri Atas ala Gambar 2 (3/7 style) */}
              <div className="absolute top-0 left-0 bg-white pt-2 pb-1.5 px-3 sm:px-3.5 rounded-br-[16px] shadow-xs flex items-center gap-0.5">
                <span className="text-xs sm:text-sm font-extrabold text-stone-900 leading-none">
                  {activeIndex + 1}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-400 leading-none">
                  /{GALLERY_ITEMS.length}
                </span>
              </div>

              {/* Floating Judul Pojok Kanan Bawah ala Badge 'Open Living' Gambar 2 */}
              <div className="absolute bottom-0 right-0 bg-white pt-2 pb-2 px-3.5 sm:px-4 rounded-tl-[18px] shadow-sm max-w-[85%] sm:max-w-[75%]">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight leading-snug truncate">
                  {activeItem.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Subtext Footer Info di Bawah Card */}
          <div className="w-full max-w-xl text-center pt-3 text-[11px] text-white/60 tracking-wider">
            <span>Klik swipe &gt; di atas atau geser (swipe) layar untuk berpindah foto</span>
          </div>

        </div>
      )}

    </div>
  );
};
