import React, { useState } from 'react';
import { 
  Newspaper, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Eye, 
  ArrowLeft,
  Save,
  Pin,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { useAppStoreData } from '../../hooks/useAppStoreData';
import { AppStore } from '../../services/appStore';
import { Link } from 'react-router-dom';
import { ImageUploader } from './ImageUploader';
import { useToast } from './ToastContext';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  timeAgo?: string;
  category: string;
  subCategory?: string;
  summary: string;
  image: string;
  isFeatured?: boolean;
}

export const NewsManager: React.FC = () => {
  const { news } = useAppStoreData();
  const typedNews: NewsItem[] = news as NewsItem[];
  const { toast, startLoading, stopLoading } = useToast();
  
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  
  // Tampilan halaman: 'list' atau 'form' (in-place full page, sidebar tetap ada)
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<NewsItem, 'id'>>({
    title: '',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    timeAgo: 'Baru saja',
    category: 'Prestasi Santri',
    subCategory: 'Umum',
    summary: '',
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
  });

  const categories = ['Semua', 'Prestasi Santri', 'Agenda Pondok', 'Informasi PPDB', 'Prestasi Akademik', 'Kewirausahaan', 'Bahasa & Literasi', 'Teknologi'];

  const filteredNews = typedNews.filter((item: NewsItem) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                        item.summary.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'Semua' || item.category === filterCategory;
    return matchSearch && matchCat;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      timeAgo: 'Baru saja',
      category: 'Prestasi Santri',
      subCategory: 'Umum',
      summary: '',
      image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80',
      isFeatured: false,
    });
    setViewMode('form');
  };

  const handleOpenEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      date: item.date,
      timeAgo: item.timeAgo || 'Baru saja',
      category: item.category,
      subCategory: item.subCategory || '',
      summary: item.summary,
      image: item.image,
      isFeatured: item.isFeatured || false,
    });
    setViewMode('form');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim()) {
      toast.warning('Validasi Form', 'Judul dan ringkasan berita wajib diisi.');
      return;
    }

    startLoading(editingId ? 'Menyimpan pembaruan artikel...' : 'Menerbitkan artikel baru...');
    try {
      if (editingId) {
        await AppStore.updateNewsRemote(editingId, formData);
        toast.success('Pembaruan Berhasil', `Artikel "${formData.title}" telah berhasil diperbarui.`);
      } else {
        await AppStore.createNewsRemote(formData);
        toast.success('Publikasi Berhasil', `Artikel "${formData.title}" telah diterbitkan.`);
      }
      setViewMode('list');
    } catch (err: any) {
      toast.error('Gagal Menyimpan', err?.message || 'Terjadi kesalahan sistem saat menyimpan.');
    } finally {
      stopLoading();
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Hapus berita "${title}"?`)) {
      startLoading('Menghapus artikel...');
      try {
        await AppStore.deleteNewsRemote(id);
        toast.success('Penghapusan Berhasil', `Artikel "${title}" telah dihapus.`);
      } catch (err: any) {
        toast.error('Gagal Menghapus', err?.message || 'Terjadi kesalahan saat menghapus data.');
      } finally {
        stopLoading();
      }
    }
  };

  // FULL IN-PLACE FORM VIEW
  if (viewMode === 'form') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Kembali ke Daftar Berita"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                {editingId ? 'Edit Artikel' : 'Tulis Baru'}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {editingId ? 'Edit Berita & Publikasi' : 'Tulis Artikel Berita Baru'}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            Batal
          </button>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Judul Artikel Berita *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    placeholder="Contoh: Wisuda Akbar Tahfidz Qur'an 30 Juz & Penganugerahan Sanad..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Kategori Berita</label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none pr-9"
                      >
                        {categories.filter(c => c !== 'Semua').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Tanggal Terbit</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                      placeholder="Contoh: 03 November 2026"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Ringkasan & Isi Berita *</label>
                  <textarea
                    rows={8}
                    required
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none leading-relaxed"
                    placeholder="Tuliskan isi berita, detail kegiatan santri, sambutan pimpinan, atau informasi penting lainnya..."
                  />
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <ImageUploader
                    label="Upload Gambar Cover Berita"
                    required
                    value={formData.image}
                    onChange={(base64) => setFormData({ ...formData, image: base64 })}
                    aspectRatio="landscape"
                    description="Pilih foto sampul berita dari komputer atau HP"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="featuredCheck"
                      checked={formData.isFeatured || false}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Jadikan Berita Utama (Highlight)
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 pl-6">
                    Akan tampil sebagai slide utama di bagian paling atas halaman Berita.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-2xl shadow-sm transition-transform active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Simpan & Terbitkan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // TAMPILAN UTAMA TABEL BERITA
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Manajemen Berita & Artikel</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publikasikan siaran pers, prestasi santri, agenda kegiatan pondok, dan artikel kajian.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul berita atau topik..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>

        {/* Dropdown Kategori */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 shrink-0 hidden sm:inline">Kategori:</span>
          <div className="relative w-full md:w-56">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Semua' ? 'Semua Kategori' : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-emerald-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* DAFTAR BERITA BERUPA TABEL / KARTU RESPONSIVE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Mobile View: Clean Card List */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredNews.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Tidak ada artikel berita yang ditemukan.
            </div>
          ) : (
            filteredNews.map((item: NewsItem) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex gap-3">
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {item.category}
                      </span>
                      {item.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <Pin className="w-2.5 h-2.5 text-emerald-700" />
                          <span>Utama</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
                  <Link
                    to={`/berita/${item.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Lihat di Web</span>
                  </Link>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-20">Cover</th>
                <th className="py-3.5 px-4">Judul Artikel & Ringkasan</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Tanggal Terbit</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Tidak ada artikel berita yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredNews.map((item: NewsItem) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-md">
                      <p className="font-bold text-slate-900 text-sm line-clamp-1 leading-snug">{item.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.summary}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-medium">
                      {item.date}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.isFeatured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <Pin className="w-3 h-3 text-emerald-700" />
                          <span>Utama</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standar</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/berita/${item.id}`}
                          target="_blank"
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Lihat di Web"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
