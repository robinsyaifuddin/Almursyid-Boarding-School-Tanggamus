import React from 'react';
import { 
  Users, 
  UserCheck, 
  Newspaper, 
  Image as ImageIcon, 
  ArrowUpRight, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  PlusCircle,
  ExternalLink,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useAppStoreData } from '../../hooks/useAppStoreData';

interface BentoOverviewProps {
  onNavigate: (tab: string) => void;
  onOpenNewModal: (type: string) => void;
}

export const BentoOverview: React.FC<BentoOverviewProps> = ({
  onNavigate,
  onOpenNewModal
}) => {
  const { ppdbApplicants, news, gallery, programs, facilities, siteInfo } = useAppStoreData();

  const totalPPDB = ppdbApplicants.length;

  return (
    <div className="space-y-6">
      {/* Top Banner Bento Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Portal Administrasi Terpadu
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Assalamu'alaikum, Admin!
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Selamat datang di Dashboard CMS Pondok Pesantren Al-Mursyid Tanggamus. Kelola informasi PPDB, berita, galeri kegiatan, profil pengurus, dan fasilitas pondok.
          </p>
        </div>

        {/* Quick actions top pill */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenNewModal('news')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl transition-transform active:scale-95 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Tulis Berita</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenNewModal('gallery')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl transition-transform active:scale-95 shadow-sm shadow-emerald-600/20"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Upload Foto</span>
          </button>
        </div>
      </div>

      {/* Bento Grid 1: Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: PPDB */}
        <div 
          onClick={() => onNavigate('ppdb')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Halaman PPDB</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xl font-extrabold text-slate-900 tracking-tight">Aktif & Siap</p>
            <p className="text-xs text-slate-500 mt-1">Alur, Biaya & Link Form</p>
          </div>
        </div>

        {/* Card 2: Berita */}
        <div 
          onClick={() => onNavigate('news')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Berita & Rilis</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{news.length}</p>
            <p className="text-xs text-slate-500 mt-1">Artikel tayang di website</p>
          </div>
        </div>

        {/* Card 3: Galeri */}
        <div 
          onClick={() => onNavigate('gallery')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Foto Galeri</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{gallery.length}</p>
            <p className="text-xs text-slate-500 mt-1">Dokumentasi kegiatan</p>
          </div>
        </div>

        {/* Card 4: Pengurus & Program */}
        <div 
          onClick={() => onNavigate('pengurus')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dewan Asatidz</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{siteInfo.leadership.pengurus.length + 2}</p>
            <p className="text-xs text-slate-500 mt-1">Pembina, Pengawas, Pengurus</p>
          </div>
        </div>
      </div>

      {/* Bento Grid 2: Asymmetric Layout (65% vs 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Recent Articles & Content Shortcuts */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Artikel & Publikasi Terakhir</h2>
                <p className="text-xs text-slate-500">Berita dan kegiatan santri yang tampil di halaman depan</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('news')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
              >
                <span>Kelola Berita ({news.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100 mt-2">
              {news.slice(0, 4).map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                      <p className="text-xs text-slate-400 truncate">{item.category} &bull; {item.date}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('news')}
                    className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                    title="Edit Artikel"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Semua konten tersinkron otomatis ke web publik</span>
            </span>
            <span>Update real-time</span>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Highlights & Status */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Card Dark: Financial & Legal Summary */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">Identitas Lembaga</span>
              <h3 className="text-base font-bold mt-1">{siteInfo.name}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                NSP Kemenag: <span className="text-white font-mono">{siteInfo.legal.nsp}</span>
              </p>
              
              <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-400 text-[10px]">Ketua Pengurus</p>
                  <p className="font-semibold text-white truncate">{siteInfo.leadership.pengurus[0]?.name || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px]">Hotline PPDB</p>
                  <p className="font-semibold text-emerald-400 truncate">{siteInfo.contacts.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Info Program & Fasilitas */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Konten Terintegrasi</h4>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-2">
              <button 
                type="button"
                onClick={() => onNavigate('program')}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-left transition-colors"
              >
                <div className="text-xs">
                  <p className="font-semibold text-slate-800">{programs.length} Program Unggulan</p>
                  <p className="text-slate-400">Tahfidz, Diniyah, Formal, dll</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                type="button"
                onClick={() => onNavigate('facilities')}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-left transition-colors"
              >
                <div className="text-xs">
                  <p className="font-semibold text-slate-800">{facilities.length} Sarana & Fasilitas</p>
                  <p className="text-slate-400">Masjid, Asrama, Lab Sains, dll</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
