import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink,
  ArrowLeft,
  Save
} from 'lucide-react';
import { useAppStoreData } from '../../hooks/useAppStoreData';
import { AppStore } from '../../services/appStore';
import { GalleryItem } from '../../data/siteData';
import { ImageUploader } from './ImageUploader';

export const GalleryManager: React.FC = () => {
  const { gallery } = useAppStoreData();
  const [search, setSearch] = useState('');
  
  // Tampilan halaman: 'list' atau 'form' (in-place full page, sidebar tetap ada)
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form sederhana: Hanya Judul dan Foto
  const [formData, setFormData] = useState({
    title: '',
    image: '',
  });

  const filteredItems = gallery.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      image: '',
    });
    setViewMode('form');
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      image: item.image,
    });
    setViewMode('form');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) {
      alert('Judul foto dan upload gambar wajib diisi.');
      return;
    }

    if (editingId) {
      AppStore.updateGalleryRemote(editingId, {
        title: formData.title,
        image: formData.image,
      });
    } else {
      AppStore.createGalleryRemote({
        title: formData.title,
        image: formData.image,
      });
    }

    setViewMode('list');
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Hapus foto "${title}" dari galeri?`)) {
      AppStore.deleteGalleryRemote(id);
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
              title="Kembali ke Galeri"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                {editingId ? 'Edit Dokumentasi' : 'Upload Foto Baru'}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {editingId ? 'Edit Judul & Foto' : 'Tambah Foto Galeri Baru'}
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

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm max-w-3xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Judul / Momen Foto *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                placeholder="Contoh: Suasana Santri Menyetorkan Hafalan Qur'an..."
              />
            </div>

            <ImageUploader
              label="Upload Foto Dokumentasi"
              required
              value={formData.image}
              onChange={(base64) => setFormData({ ...formData, image: base64 })}
              aspectRatio="landscape"
              description="Pilih file foto dari galeri HP atau laptop Anda langsung."
            />

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
                <span>Simpan Foto</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // TAMPILAN UTAMA TABEL GALERI
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Manajemen Galeri Kegiatan</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola judul dan foto dokumentasi kegiatan santri pondok pesantren Al-Mursyid.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Foto Dokumentasi</span>
        </button>
      </div>

      {/* Filter Bar Pencarian */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul momen dokumentasi..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Total {filteredItems.length} foto dokumentasi
        </span>
      </div>

      {/* DAFTAR GALERI BERUPA TABEL */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-24">Foto</th>
                <th className="py-3.5 px-4">Judul Dokumentasi Kegiatan</th>
                <th className="py-3.5 px-4">Pratinjau Asli</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    Tidak ada foto kegiatan yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-20 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900 text-sm leading-snug">{item.title}</p>
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={item.image}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Buka Ukuran Asli</span>
                      </a>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit Judul & Foto"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus Foto"
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
