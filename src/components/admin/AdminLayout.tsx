import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Newspaper, 
  Image as ImageIcon, 
  Users, 
  BookOpen, 
  Building2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Bell,
  Search,
  Menu,
  X,
  RotateCcw,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppStore } from '../../services/appStore';
import { useAppStoreData } from '../../hooks/useAppStoreData';
import { clearAuthToken } from '../../services/apiClient';

interface AdminLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  children
}) => {
  const { ppdbApplicants } = useAppStoreData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari sesi Admin?')) {
      clearAuthToken();
      window.location.reload();
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'ppdb', label: 'PPDB Online', icon: UserCheck, badge: null },
    { id: 'news', label: 'Berita & Artikel', icon: Newspaper, badge: null },
    { id: 'gallery', label: 'Galeri Kegiatan', icon: ImageIcon, badge: null },
    { id: 'pengurus', label: 'Profil Pengurus', icon: Users, badge: null },
    { id: 'program', label: 'Program Unggulan', icon: BookOpen, badge: null },
    { id: 'facilities', label: 'Fasilitas Pondok', icon: Building2, badge: null },
  ];

  const handleResetData = () => {
    if (window.confirm('Kembalikan semua data ke setelan awal bawaan pesantren? Perubahan yang belum dicatat akan direset.')) {
      AppStore.resetAll();
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans antialiased flex flex-col justify-start">
      {/* Top Bar Floating / Rounded App Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                M
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  Al-Mursyid
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-700 block">
                  Admin CMS & PPDB
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Header Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Lihat website publik"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Lihat Web</span>
            </Link>

            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
              title="Reset data demo ke bawaan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>

            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-emerald-500/20">
                AD
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-semibold text-slate-800 leading-tight">Admin Mursyid</p>
                <p className="text-[10px] text-slate-400">Pengelola Web</p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-1.5 ml-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Keluar / Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Nav (Desktop & Mobile) */}
        <aside className={`
          lg:w-64 shrink-0 
          ${mobileMenuOpen ? 'block' : 'hidden lg:block'}
        `}>
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 sticky top-20">
            <div className="px-3 pt-2 pb-3">
              <p className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Menu Utama</p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150
                      ${isActive 
                        ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/10' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                        {item.badge}
                      </span>
                    ) : (
                      isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-4 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-100 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Sinkron Otomatis</span>
                  </div>
                  <p className="text-[11px] text-emerald-50 leading-relaxed">
                    Setiap perubahan berita, pengurus, atau program langsung terlihat di website publik santri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};
