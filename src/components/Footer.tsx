import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Clock, 
  ArrowRight, ExternalLink 
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-slate-300 pt-16 pb-8 border-t-2 border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-900">
          
          {/* Kolom 1: Profil Pondok */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Logo Al-Mursyid" 
                className="w-12 h-12 object-contain"
                width="48"
                height="48"
                loading="lazy"
              />
              <div>
                <h3 className=" font-bold text-lg text-white tracking-tight">
                  {SITE_INFO.name}
                </h3>
                <p className="text-xs text-gold-400 uppercase tracking-widest font-bold">
                  {SITE_INFO.foundation}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Lembaga pendidikan Islam terpadu yang memadukan kedalaman ilmu agama (Tahfidzul Qur'an & Kitab Kuning) dengan kurikulum nasional, melahirkan generasi hafidz yang berakhlakul karimah, mandiri, dan berwawasan masa depan.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-forest-900 pb-2">
              Menu Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang-kami" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Profil & Sambutan
                </Link>
              </li>
              <li>
                <Link to="/tentang-kami#legalitas" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Legalitas & Pengurus
                </Link>
              </li>
              <li>
                <Link to="/program" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Program Pendidikan
                </Link>
              </li>
              <li>
                <Link to="/fasilitas" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Fasilitas Kampus
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Galeri Kegiatan
                </Link>
              </li>
              <li>
                <Link to="/ppdb" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Informasi PPDB
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-forest-900 pb-2">
              Alamat & Kontak
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">
                  {SITE_INFO.address.full}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${SITE_INFO.contacts.phone}`} className="hover:text-gold-400">
                  {SITE_INFO.contacts.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${SITE_INFO.contacts.email}`} className="hover:text-gold-400 break-all">
                  {SITE_INFO.contacts.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-gold-400 shrink-0" />
                <a 
                  href={SITE_INFO.contacts.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold-400 font-normal"
                >
                  {SITE_INFO.contacts.instagramHandle}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
                <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{SITE_INFO.contacts.operationalHours}</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={SITE_INFO.contacts.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-gold-400 text-xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Hak Cipta */}
        <div className="pt-6 flex items-center justify-center text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {SITE_INFO.name}. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};
