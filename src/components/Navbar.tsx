import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ArrowRight
} from 'lucide-react';
import { SITE_INFO, NAV_LINKS } from '../data/siteData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Institusi Branding - Ramping & Proporsional */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 py-1">
            <img 
              src="/logo.png" 
              alt="Logo Al-Mursyid" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-200 group-hover:scale-105"
              width="40"
              height="40"
              loading="eager"
            />
            <div className="flex flex-col justify-center">
              <span className="font-bold text-sm sm:text-base tracking-tight text-stone-900 group-hover:text-forest-900 leading-tight transition-colors">
                Al–Mursyid Islamic Boarding School
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-700 leading-tight mt-0.5">
                YAYASAN ALMURSYID TANGGAMUS LAMPUNG
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Clean Underline Animation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group relative px-3 py-2 text-sm font-semibold tracking-normal transition-colors duration-200 ${
                    isActive 
                      ? 'text-forest-950 font-bold' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle Underline */}
                  <span 
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'bg-forest-950 scale-x-100 opacity-100' 
                        : 'bg-gold-500 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Button: Hubungi Kami */}
          <div className="hidden lg:flex items-center">
            <Link 
              to="/kontak"
              className="text-xs font-bold bg-aurora-btn text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-forest-950/20"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  isActive 
                    ? 'text-forest-950 bg-stone-100 font-bold border-l-2 border-forest-950 pl-2.5' 
                    : 'text-stone-700 hover:text-forest-950 hover:bg-stone-50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-950" />
                )}
              </Link>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-100">
            <Link
              to="/kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-aurora-btn text-white font-bold py-2.5 rounded-full text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
