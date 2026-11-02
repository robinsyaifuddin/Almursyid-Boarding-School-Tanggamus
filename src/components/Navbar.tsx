import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Menu, X, ChevronDown, 
  ArrowRight, ShieldCheck, Award
} from 'lucide-react';
import { SITE_INFO, NAV_LINKS } from '../data/siteData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-slate-200/80">
      {/* Top Bar - Info Resmi & Kontak */}
      <div className="bg-forest-950 text-slate-300 text-xs border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-2 gap-2">
          {/* Kontak & Lokasi */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300">
            <a 
              href={`tel:${SITE_INFO.contacts.phone}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span className="font-medium">{SITE_INFO.contacts.phone}</span>
            </a>
            <span className="hidden sm:inline text-forest-800">|</span>
            <a 
              href={`mailto:${SITE_INFO.contacts.email}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              <span>{SITE_INFO.contacts.email}</span>
            </a>
            <span className="hidden sm:inline text-forest-800">|</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span className="truncate max-w-[280px] md:max-w-none">Kota Agung Timur, Tanggamus, Lampung</span>
            </div>
          </div>

          {/* Quick Info & Action Bar */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              NSP: <strong className="text-white font-mono">{SITE_INFO.legal.nsp}</strong>
            </span>
            <span className="hidden lg:inline text-forest-800">|</span>
            <Link 
              to="/tentang-kami#legalitas" 
              className="text-slate-300 hover:text-white transition-colors text-[11px]"
            >
              Legalitas Kemenkumham
            </Link>
            <span className="text-forest-800">|</span>
            <Link 
              to="/ppdb" 
              className="bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-all active:scale-95 inline-flex items-center gap-1"
            >
              <Award className="w-3 h-3" />
              PPDB Online
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Institusi Branding */}
          <Link to="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-11 h-11 rounded-lg bg-forest-950 border border-forest-800 flex items-center justify-center text-gold-400 font-bold text-xl shadow-sm">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 leading-tight">
                AL-MURSYID
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-600">
                Islamic Boarding School
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Tanggamus • Lampung
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              
              if (item.children) {
                return (
                  <div key={item.label} className="relative group">
                    <Link
                      to={item.href}
                      className={`px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${
                        isActive 
                          ? 'text-forest-900 font-semibold bg-slate-50' 
                          : 'hover:text-forest-900 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 group-hover:rotate-180 transition-transform duration-200" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full hidden group-hover:block w-72 pt-2 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 divide-y divide-slate-100">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-4 py-2.5 hover:bg-slate-50 transition-colors group/item"
                          >
                            <div className="text-xs font-semibold text-slate-800 group-hover/item:text-forest-900 flex items-center justify-between">
                              {child.label}
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity text-gold-500" />
                            </div>
                            {child.desc && (
                              <p className="text-[11px] text-slate-500 mt-0.5">{child.desc}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'text-forest-900 font-bold border-b-2 border-forest-900 rounded-none' 
                      : 'hover:text-forest-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              to="/kontak"
              className="text-xs font-semibold text-slate-700 border border-slate-300 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Hubungi Kami
            </Link>
            <Link
              to="/ppdb"
              className="text-xs font-bold bg-forest-950 hover:bg-forest-900 text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>Daftar Santri</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/ppdb"
              className="text-xs font-bold bg-gold-500 text-forest-950 px-2.5 py-1.5 rounded"
            >
              PPDB
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-1">
          {NAV_LINKS.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-slate-800 text-left"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-4 py-1 space-y-1 border-l-2 border-gold-400 my-1 bg-slate-50/70 rounded-r">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-xs text-slate-600 hover:text-forest-900"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-semibold text-slate-800 hover:text-forest-900"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/ppdb"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-forest-950 text-white font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <span>Formulir PPDB Online</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
            <a
              href={SITE_INFO.contacts.ppdbWa}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center border border-slate-300 text-slate-700 font-semibold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Panitia PPDB</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
