import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  ArrowLeft,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useAppStoreData } from '../../hooks/useAppStoreData';
import { AppStore } from '../../services/appStore';
import { ImageUploader } from './ImageUploader';
import { useToast } from './ToastContext';

interface PengurusItem {
  name: string;
  role: string;
  image?: string;
  highlight?: boolean;
}

export const PengurusManager: React.FC = () => {
  const { siteInfo } = useAppStoreData();
  const { toast, startLoading, stopLoading } = useToast();
  
  // Tampilan halaman: 'list' atau 'form' (in-place full page, sidebar tetap ada)
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState<PengurusItem>({
    name: '',
    role: '',
    image: '',
    highlight: false
  });

  // Top Leaders State
  const [pembina, setPembina] = useState(siteInfo.leadership.pembina);
  const [pengawas, setPengawas] = useState(siteInfo.leadership.pengawas);

  const pengurusList: PengurusItem[] = (siteInfo.leadership.pengurus || []) as PengurusItem[];

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      name: '',
      role: '',
      image: '',
      highlight: false
    });
    setViewMode('form');
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setFormData({ 
      image: '',
      ...pengurusList[index] 
    });
    setViewMode('form');
  };

  const handleSavePengurus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      toast.warning('Form Belum Lengkap', 'Nama dan jabatan pengurus wajib diisi.');
      return;
    }

    startLoading(editingIndex !== null ? 'Menyimpan profil pengurus...' : 'Menambahkan pengurus...');
    try {
      let updatedPengurus = [...pengurusList];
      if (editingIndex !== null) {
        updatedPengurus[editingIndex] = { ...formData };
      } else {
        updatedPengurus.push({ ...formData });
      }

      const updatedSiteInfo = {
        ...siteInfo,
        leadership: {
          ...siteInfo.leadership,
          pengurus: updatedPengurus
        }
      };

      await AppStore.saveSiteInfo(updatedSiteInfo);
      toast.success(
        editingIndex !== null ? 'Pembaruan Berhasil' : 'Pengurus Ditambahkan',
        `Data profil "${formData.name}" berhasil disimpan.`
      );
      setViewMode('list');
    } catch (err: any) {
      toast.error('Gagal Menyimpan', err?.message || 'Terjadi kesalahan saat menyimpan data pengurus.');
    } finally {
      stopLoading();
    }
  };

  const handleDeletePengurus = async (index: number, name: string) => {
    if (window.confirm(`Hapus pengurus "${name}"?`)) {
      startLoading('Menghapus data pengurus...');
      try {
        const updatedPengurus = pengurusList.filter((_: PengurusItem, idx: number) => idx !== index);
        const updatedSiteInfo = {
          ...siteInfo,
          leadership: {
            ...siteInfo.leadership,
            pengurus: updatedPengurus
          }
        };
        await AppStore.saveSiteInfo(updatedSiteInfo);
        toast.success('Pengurus Dihapus', `Data "${name}" berhasil dihapus dari struktur kepengurusan.`);
      } catch (err: any) {
        toast.error('Gagal Menghapus', err?.message || 'Terjadi kesalahan saat menghapus data.');
      } finally {
        stopLoading();
      }
    }
  };

  const handleSaveTopLeaders = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading('Menyimpan Dewan Pembina & Pengawas...');
    try {
      const updatedSiteInfo = {
        ...siteInfo,
        leadership: {
          ...siteInfo.leadership,
          pembina,
          pengawas
        }
      };
      await AppStore.saveSiteInfo(updatedSiteInfo);
      toast.success('Dewan Utama Disimpan', 'Data Dewan Pembina dan Pengawas Pesantren berhasil diperbarui.');
    } catch (err: any) {
      toast.error('Gagal Menyimpan', err?.message || 'Terjadi kesalahan sistem.');
    } finally {
      stopLoading();
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
              title="Kembali ke Daftar Pengurus"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                {editingIndex !== null ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {editingIndex !== null ? 'Perbarui Profil Pengurus' : 'Form Pengurus & Asatidz'}
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

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm max-w-4xl">
          <form onSubmit={handleSavePengurus} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Kolom Kiri: Nama & Jabatan (7 Cols) */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Nama Lengkap & Gelar *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    placeholder="Contoh: Ustadz Ahmad Fauzi, Lc."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Amanah / Jabatan Bidang *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    placeholder="Contoh: Kepala Kepengurusan Putri & Asrama"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="highlightCheck"
                      checked={formData.highlight || false}
                      onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="highlightCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Tandai sebagai Pengurus Inti (Highlight)
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 pl-6">
                    Akan diberi penekanan visual khusus di daftar kepengurusan.
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: Upload Foto Profil (5 Cols) */}
              <div className="md:col-span-5">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <ImageUploader
                    label="Upload Foto Profil Pengurus"
                    value={formData.image || ''}
                    onChange={(base64) => setFormData({ ...formData, image: base64 })}
                    aspectRatio="portrait"
                    description="Upload foto resmi asatidz/pengurus (rasio portrait 3:4)"
                  />
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
                <span>Simpan Pengurus</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // TAMPILAN UTAMA LIST PENGURUS
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Profil Pengurus & Asatidz</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola dewan pembina, pengawas yayasan, dan jajaran dewan asatidz pondok pesantren.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengurus</span>
        </button>
      </div>

      {/* Top Leaders Card (Pembina & Pengawas) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">Pimpinan Utama Yayasan</h2>
              <p className="text-[11px] text-slate-400">Tampil di posisi kehormatan halaman Tentang Kami</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveTopLeaders} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Ketua Pembina Yayasan</label>
            <input
              type="text"
              value={pembina}
              onChange={(e) => setPembina(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Ketua Pengawas Yayasan</label>
            <input
              type="text"
              value={pengawas}
              onChange={(e) => setPengawas(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-transform active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Perbarui Pimpinan</span>
            </button>
          </div>
        </form>
      </div>

      {/* List of Pengurus Cards */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Jajaran Pengurus & Divisi</h2>
            <p className="text-xs text-slate-400">Total {pengurusList.length} pengurus terdaftar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pengurusList.map((item: PengurusItem, index: number) => {
            const hasCustomImage = Boolean(item.image && item.image.trim() !== '');
            const displayPhoto = hasCustomImage ? item.image : "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80";

            return (
              <div 
                key={index}
                className={`p-3 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  item.highlight 
                    ? 'bg-emerald-50/50 border-emerald-200/80' 
                    : 'bg-white border-slate-200/80 shadow-2xs hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-13 h-16 sm:w-14 sm:h-18 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-2xs">
                    <img 
                      src={displayPhoto} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-900 truncate flex items-center gap-1.5">
                      <span className="truncate">{item.name}</span>
                      {item.highlight && (
                        <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider shrink-0">
                          Inti
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-emerald-800 font-semibold truncate mt-0.5">{item.role}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {hasCustomImage ? 'Foto khusus terpasang' : 'Foto bawaan'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(index)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Profil & Foto"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePengurus(index, item.name)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
