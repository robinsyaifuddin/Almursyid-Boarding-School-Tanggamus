import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Clock, ShieldCheck, 
  ArrowRight, ExternalLink 
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-slate-300 pt-16 pb-8 border-t-2 border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-900">
          
          {/* Kolom 1: Profil Pondok & Legalitas */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-900 border border-forest-800 flex items-center justify-center text-gold-400 font-bold text-xl shadow">
                M
              </div>
              <div>
                <h3 className="font-bold text-base text-white tracking-tight">
                  {SITE_INFO.name}
                </h3>
                <p className="text-xs text-gold-400 uppercase tracking-wider font-semibold">
                  {SITE_INFO.foundation}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Lembaga pendidikan Islam terpadu yang memadukan kedalaman ilmu agama (Tahfidzul Qur'an & Kitab Kuning) dengan kurikulum nasional, melahirkan generasi hafidz yang berakhlakul karimah, mandiri, dan berwawasan masa depan.
            </p>

            <div className="bg-forest-900/60 rounded-xl p-3.5 border border-forest-850 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-gold-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Legalitas Resmi Terdaftar</span>
              </div>
              <p className="text-slate-300">
                <span className="text-slate-400">SK Kemenkumham:</span> {SITE_INFO.legal.kemenkumham}
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">NSP Kemenag RI:</span> <span className="font-mono text-gold-300 font-bold">{SITE_INFO.legal.nsp}</span> (Izin Operasional Resmi)
              </p>
            </div>
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
                <Link to="/ppdb" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Informasi PPDB
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Program Unggulan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-forest-900 pb-2">
              Program Unggulan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200 transition-colors">• Tahfidzul Qur'an 30 Juz Mutqin</li>
              <li className="hover:text-slate-200 transition-colors">• Madrasah Diniyah & Kajian Kitab</li>
              <li className="hover:text-slate-200 transition-colors">• SMP & SMA Islam Terpadu</li>
              <li className="hover:text-slate-200 transition-colors">• Bilingual Arab & English Daily</li>
              <li className="hover:text-slate-200 transition-colors">• Pembinaan Karakter & Adab</li>
              <li className="hover:text-slate-200 transition-colors">• Ekstrakurikuler Kaligrafi & Bela Diri</li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami */}
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
              <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
                <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{SITE_INFO.contacts.operationalHours}</span>
              </div>

              <div className="pt-2">
                <a
                  href={SITE_INFO.contacts.ppdbWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  <span>Chat WhatsApp Resmi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Hak Cipta */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {SITE_INFO.name}. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/tentang-kami#legalitas" className="hover:text-slate-300 transition-colors">
              Izin Operasional & Legalitas
            </Link>
            <span>•</span>
            <Link to="/kontak" className="hover:text-slate-300 transition-colors">
              Peta Lokasi
            </Link>
            <span>•</span>
            <Link to="/ppdb" className="hover:text-slate-300 transition-colors text-gold-400 font-medium">
              Portal PPDB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
