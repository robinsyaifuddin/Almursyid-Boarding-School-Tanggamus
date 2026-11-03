import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  ArrowLeft,
  Save,
  X
} from 'lucide-react';
import { useAppStoreData } from '../../hooks/useAppStoreData';
import { AppStore } from '../../services/appStore';
import { ImageUploader } from './ImageUploader';

interface ProgramItem {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  image?: string;
  icon?: string;
  highlights: string[];
}

export const ProgramManager: React.FC = () => {
  const { programs } = useAppStoreData();
  const typedPrograms: ProgramItem[] = programs as ProgramItem[];
  
  // Tampilan halaman: 'list' atau 'form' (in-place full page, sidebar tetap ada)
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProgramItem>({
    id: '',
    title: '',
    tagline: '',
    desc: '',
    image: '',
    icon: 'BookOpen',
    highlights: ['']
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      id: `prog-${Date.now()}`,
      title: '',
      tagline: '',
      desc: '',
      image: '',
      icon: 'BookOpen',
      highlights: ['', '']
    });
    setViewMode('form');
  };

  const handleOpenEdit = (prog: ProgramItem) => {
    setEditingId(prog.id);
    setFormData({
      ...prog,
      image: prog.image || '',
      highlights: prog.highlights && prog.highlights.length > 0 ? [...prog.highlights] : ['']
    });
    setViewMode('form');
  };

  const handleHighlightChange = (idx: number, val: string) => {
    const list = [...formData.highlights];
    list[idx] = val;
    setFormData({ ...formData, highlights: list });
  };

  const addHighlightField = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ''] });
  };

  const removeHighlightField = (idx: number) => {
    const list = formData.highlights.filter((_, i) => i !== idx);
    setFormData({ ...formData, highlights: list.length ? list : [''] });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.desc.trim()) {
      alert('Judul program dan deskripsi wajib diisi.');
      return;
    }

    const cleanHighlights = formData.highlights.map(h => h.trim()).filter(Boolean);

    if (editingId) {
      const updated = typedPrograms.map((p: ProgramItem) => {
        if (p.id === editingId) {
          return {
            ...p,
            ...formData,
            highlights: cleanHighlights
          };
        }
        return p;
      });
      AppStore.savePrograms(updated);
    } else {
      const newProgram: ProgramItem = {
        ...formData,
        id: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `prog-${Date.now()}`,
        highlights: cleanHighlights
      };
      AppStore.savePrograms([...typedPrograms, newProgram]);
    }

    setViewMode('list');
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Hapus program "${title}"?`)) {
      const updated = typedPrograms.filter((p: ProgramItem) => p.id !== id);
      AppStore.savePrograms(updated);
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
              title="Kembali ke Daftar Program"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                {editingId ? 'Edit Program' : 'Tambah Program Baru'}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {editingId ? 'Edit Kurikulum Program' : 'Form Program Unggulan'}
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
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Kolom Kiri: Informasi Program (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Nama Program Pendidikan *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    placeholder="Contoh: Tahfidzul Qur'an 30 Juz"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Tagline / Sub Judul</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    placeholder="Contoh: Metode Talaqqi, Ziyadah & Muraja'ah Harian"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Deskripsi Lengkap *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none leading-relaxed"
                    placeholder="Jelaskan output kurikulum, target capaian santri, dan keunggulannya..."
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Poin Keunggulan (Highlights)</label>
                    <button
                      type="button"
                      onClick={addHighlightField}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      + Tambah Poin
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => handleHighlightChange(idx, e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600"
                          placeholder={`Keunggulan ke-${idx + 1}`}
                        />
                        {formData.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHighlightField(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Upload Foto Program (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <ImageUploader
                    label="Upload Foto Program Unggulan"
                    value={formData.image || ''}
                    onChange={(base64) => setFormData({ ...formData, image: base64 })}
                    aspectRatio="landscape"
                    description="Upload foto kegiatan atau materi pendukung program ini"
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
                <span>Simpan Program</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // TAMPILAN UTAMA LIST PROGRAM
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Manajemen Program Pendidikan</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Atur kurikulum unggulan pesantren: Tahfidz, Madrasah Diniyah, Formal SMP/SMA, dan Ekstrakurikuler.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Program Baru</span>
        </button>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {typedPrograms.map((item: ProgramItem) => (
          <div 
            key={item.id} 
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between group hover:border-slate-300 transition-all"
          >
            <div>
              {item.image && (
                <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 border border-slate-200 bg-slate-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">{item.tagline}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>

              {item.highlights && item.highlights.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Poin Keunggulan:</p>
                  {item.highlights.map((h: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Kode identifier: <span className="font-mono">{item.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
