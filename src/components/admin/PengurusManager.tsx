import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  ArrowLeft,
  Save,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useAppStoreData } from '../../hooks/useAppStoreData';
import { AppStore } from '../../services/appStore';
import { ImageUploader } from './ImageUploader';
import { useToast } from './ToastContext';

interface LeaderItem {
  name: string;
  role?: string;
  image?: string;
  desc?: string;
}

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

  // Top Leaders State (Pembina & Pengawas)
  const rawPembina = siteInfo?.leadership?.pembina;
  const initialPembina: LeaderItem = typeof rawPembina === 'object' && rawPembina !== null
    ? {
        name: rawPembina.name || '',
        role: rawPembina.role || 'Pembina Yayasan',
        image: rawPembina.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
        desc: rawPembina.desc || 'Pondok Pesantren Al-Mursyid Tanggamus, pembina arah kebijakan strategis & kepesantrenan.'
      }
    : {
        name: typeof rawPembina === 'string' ? rawPembina : 'Usman Mursyid',
        role: 'Pembina Yayasan',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
        desc: 'Pondok Pesantren Al-Mursyid Tanggamus, pembina arah kebijakan strategis & kepesantrenan.'
      };

  const rawPengawas = siteInfo?.leadership?.pengawas;
  const initialPengawas: LeaderItem = typeof rawPengawas === 'object' && rawPengawas !== null
    ? {
        name: rawPengawas.name || '',
        role: rawPengawas.role || 'Pengawas Yayasan',
        image: rawPengawas.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
        desc: rawPengawas.desc || 'Memastikan kepatuhan tata kelola, keterbukaan manajerial, dan operasional yayasan.'
      }
    : {
        name: typeof rawPengawas === 'string' ? rawPengawas : 'Budi Setiawan',
        role: 'Pengawas Yayasan',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
        desc: 'Memastikan kepatuhan tata kelola, keterbukaan manajerial, dan operasional yayasan.'
      };

  const [pembinaData, setPembinaData] = useState<LeaderItem>(initialPembina);
  const [pengawasData, setPengawasData] = useState<LeaderItem>(initialPengawas);

  // Modal / Form state for Leader (Pembina / Pengawas)
  const [editingLeaderRole, setEditingLeaderRole] = useState<'pembina' | 'pengawas' | null>(null);
  const [leaderFormData, setLeaderFormData] = useState<LeaderItem>({
    name: '',
    role: '',
    image: '',
    desc: ''
  });

  const handleOpenEditLeader = (type: 'pembina' | 'pengawas') => {
    setEditingLeaderRole(type);
    const target = type === 'pembina' ? pembinaData : pengawasData;
    setLeaderFormData({
      name: target.name || '',
      role: target.role || (type === 'pembina' ? 'Pembina Yayasan' : 'Pengawas Yayasan'),
      image: target.image || '',
      desc: target.desc || ''
    });
  };

  const handleSaveLeaderModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLeaderRole) return;
    if (!leaderFormData.name.trim()) {
      toast.warning('Form Belum Lengkap', 'Nama lengkap pimpinan wajib diisi.');
      return;
    }

    startLoading(`Menyimpan data ${editingLeaderRole === 'pembina' ? 'Dewan Pembina' : 'Dewan Pengawas'}...`);
    try {
      const updatedLeader = {
        ...leaderFormData,
        name: leaderFormData.name.trim(),
        role: leaderFormData.role?.trim() || (editingLeaderRole === 'pembina' ? 'Pembina Yayasan' : 'Pengawas Yayasan'),
        desc: leaderFormData.desc?.trim() || ''
      };

      if (editingLeaderRole === 'pembina') {
        setPembinaData(updatedLeader);
      } else {
        setPengawasData(updatedLeader);
      }

      const updatedSiteInfo = {
        ...siteInfo,
        leadership: {
          ...siteInfo.leadership,
          [editingLeaderRole]: updatedLeader
        }
      };

      await AppStore.saveSiteInfo(updatedSiteInfo);
      toast.success(
        'Pembaruan Berhasil',
        `Data profil ${editingLeaderRole === 'pembina' ? 'Dewan Pembina' : 'Dewan Pengawas'} berhasil diperbarui.`
      );
      setEditingLeaderRole(null);
    } catch (err: any) {
      toast.error('Gagal Menyimpan', err?.message || 'Terjadi kesalahan sistem.');
    } finally {
      stopLoading();
    }
  };

  // Sync state if siteInfo changes
  React.useEffect(() => {
    if (rawPembina) {
      setPembinaData(typeof rawPembina === 'object' ? {
        name: rawPembina.name || '',
        role: rawPembina.role || 'Pembina Yayasan',
        image: rawPembina.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
        desc: rawPembina.desc || 'Pondok Pesantren Al-Mursyid Tanggamus, pembina arah kebijakan strategis & kepesantrenan.'
      } : {
        name: rawPembina,
        role: 'Pembina Yayasan',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
        desc: 'Pondok Pesantren Al-Mursyid Tanggamus, pembina arah kebijakan strategis & kepesantrenan.'
      });
    }
    if (rawPengawas) {
      setPengawasData(typeof rawPengawas === 'object' ? {
        name: rawPengawas.name || '',
        role: rawPengawas.role || 'Pengawas Yayasan',
        image: rawPengawas.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
        desc: rawPengawas.desc || 'Memastikan kepatuhan tata kelola, keterbukaan manajerial, dan operasional yayasan.'
      } : {
        name: rawPengawas,
        role: 'Pengawas Yayasan',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
        desc: 'Memastikan kepatuhan tata kelola, keterbukaan manajerial, dan operasional yayasan.'
      });
    }
  }, [siteInfo]);

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
    if (!pembinaData.name.trim() || !pengawasData.name.trim()) {
      toast.warning('Form Belum Lengkap', 'Nama Ketua Pembina dan Ketua Pengawas wajib diisi.');
      return;
    }

    startLoading('Menyimpan Dewan Pembina & Pengawas...');
    try {
      const updatedSiteInfo = {
        ...siteInfo,
        leadership: {
          ...siteInfo.leadership,
          pembina: {
            ...pembinaData,
            name: pembinaData.name.trim(),
            role: pembinaData.role?.trim() || 'Pembina Yayasan',
            desc: pembinaData.desc?.trim() || 'Pondok Pesantren Al-Mursyid Tanggamus, pembina arah kebijakan strategis & kepesantrenan.'
          },
          pengawas: {
            ...pengawasData,
            name: pengawasData.name.trim(),
            role: pengawasData.role?.trim() || 'Pengawas Yayasan',
            desc: pengawasData.desc?.trim() || 'Memastikan kepatuhan tata kelola, keterbukaan manajerial, dan operasional yayasan.'
          }
        }
      };
      await AppStore.saveSiteInfo(updatedSiteInfo);
      toast.success('Dewan Utama Disimpan', 'Data Dewan Pembina dan Pengawas Pesantren beserta foto profil berhasil diperbarui.');
    } catch (err: any) {
      toast.error('Gagal Menyimpan', err?.message || 'Terjadi kesalahan sistem.');
    } finally {
      stopLoading();
    }
  };

  // FULL IN-PLACE FORM VIEW UNTUK PENGURUS
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

  // TAMPILAN UTAMA LIST
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

      {/* TABEL PIMPINAN UTAMA YAYASAN (PEMBINA & PENGAWAS) — Sama persis dengan format tabel pengurus */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Pimpinan Utama Yayasan</h2>
              <p className="text-xs text-slate-400">Dewan Pembina &amp; Dewan Pengawas Yayasan (Posisi Kehormatan)</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            2 Pimpinan Terdaftar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-20">Foto</th>
                <th className="py-3.5 px-4">Nama Lengkap &amp; Gelar</th>
                <th className="py-3.5 px-4">Amanah / Jabatan</th>
                <th className="py-3.5 px-4">Status / Tingkat</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1: Dewan Pembina */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-4">
                  <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                    <img 
                      src={pembinaData.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80"} 
                      alt={pembinaData.name} 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                </td>
                <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                  <div className="flex items-center gap-2">
                    <span>{pembinaData.name}</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      Pembina
                    </span>
                  </div>
                  {pembinaData.desc && (
                    <p className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">{pembinaData.desc}</p>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-700 font-semibold text-xs">
                  {pembinaData.role || 'Pembina Yayasan'}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    Amanah Tertinggi
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => handleOpenEditLeader('pembina')}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                    title="Edit Dewan Pembina"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>

              {/* Row 2: Dewan Pengawas */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-4">
                  <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                    <img 
                      src={pengawasData.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"} 
                      alt={pengawasData.name} 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                </td>
                <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                  <div className="flex items-center gap-2">
                    <span>{pengawasData.name}</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-slate-200 text-slate-800 uppercase tracking-wider">
                      Pengawas
                    </span>
                  </div>
                  {pengawasData.desc && (
                    <p className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">{pengawasData.desc}</p>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-700 font-semibold text-xs">
                  {pengawasData.role || 'Pengawas Yayasan'}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    Tata Kelola
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => handleOpenEditLeader('pengawas')}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                    title="Edit Dewan Pengawas"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL EDIT PEMBINA / PENGAWAS (In-place Modal Dialog) */}
      {editingLeaderRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  {editingLeaderRole === 'pembina' ? 'Amanah Tertinggi' : 'Tata Kelola'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Edit {editingLeaderRole === 'pembina' ? 'Dewan Pembina Yayasan' : 'Dewan Pengawas Yayasan'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingLeaderRole(null)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl text-slate-500 hover:bg-slate-100"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSaveLeaderModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                {/* Kolom Kiri: Input Teks (7 col) */}
                <div className="sm:col-span-7 space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Nama Lengkap &amp; Gelar *</label>
                    <input
                      type="text"
                      required
                      value={leaderFormData.name}
                      onChange={(e) => setLeaderFormData({ ...leaderFormData, name: e.target.value })}
                      placeholder={editingLeaderRole === 'pembina' ? "Contoh: Usman Mursyid" : "Contoh: Budi Setiawan"}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Amanah / Jabatan Resmi</label>
                    <input
                      type="text"
                      value={leaderFormData.role || ''}
                      onChange={(e) => setLeaderFormData({ ...leaderFormData, role: e.target.value })}
                      placeholder={editingLeaderRole === 'pembina' ? "Pembina Yayasan" : "Pengawas Yayasan"}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Deskripsi Singkat Peran / Amanah</label>
                    <textarea
                      rows={3}
                      value={leaderFormData.desc || ''}
                      onChange={(e) => setLeaderFormData({ ...leaderFormData, desc: e.target.value })}
                      placeholder="Deskripsi tugas kepengurusan..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Kolom Kanan: Upload Foto (5 col) */}
                <div className="sm:col-span-5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <ImageUploader
                    label={`Foto ${editingLeaderRole === 'pembina' ? 'Pembina' : 'Pengawas'}`}
                    value={leaderFormData.image || ''}
                    onChange={(base64) => setLeaderFormData({ ...leaderFormData, image: base64 })}
                    aspectRatio="portrait"
                    compact={false}
                    description="Upload foto portrait resmi (rasio 3:4)"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingLeaderRole(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-transform active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DAFTAR PENGURUS BERUPA TABEL */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">Jajaran Pengurus & Divisi</h2>
            <p className="text-xs text-slate-400">Total {pengurusList.length} pengurus terdaftar dalam struktur kepengurusan</p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Tabel Ringkas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-20">Foto</th>
                <th className="py-3.5 px-4">Nama Lengkap &amp; Gelar</th>
                <th className="py-3.5 px-4">Amanah / Jabatan</th>
                <th className="py-3.5 px-4">Status Pengurus</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pengurusList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    Belum ada pengurus yang terdaftar.
                  </td>
                </tr>
              ) : (
                pengurusList.map((item: PengurusItem, index: number) => {
                  const hasCustomImage = Boolean(item.image && item.image.trim() !== '');
                  const displayPhoto = hasCustomImage ? item.image : "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80";

                  return (
                    <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                      {/* Foto */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                          <img 
                            src={displayPhoto} 
                            alt={item.name} 
                            className="w-full h-full object-cover object-top" 
                          />
                        </div>
                      </td>

                      {/* Nama Lengkap */}
                      <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                        <div className="flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.highlight && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                              Inti
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Jabatan */}
                      <td className="py-3 px-4 text-slate-700 font-semibold text-xs">
                        {item.role}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {item.highlight ? (
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                            Pengurus Inti
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            Staf / Divisi
                          </span>
                        )}
                      </td>

                      {/* Aksi */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(index)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Data Pengurus"
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
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
