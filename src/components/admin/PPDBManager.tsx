import React, { useState } from 'react';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Phone, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  DollarSign, 
  ListOrdered, 
  Save, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useAppStoreData } from '../../hooks/useAppStoreData';
import { AppStore, PPDBSettings, PPDBStep, PPDBFeeItem } from '../../services/appStore';
import { ImageUploader } from './ImageUploader';
import { useToast } from './ToastContext';

export const PPDBManager: React.FC = () => {
  const { ppdbSettings } = useAppStoreData();
  const { toast, startLoading, stopLoading } = useToast();
  
  // State untuk Pengaturan Halaman PPDB (Foto 3:4, Kontak WA, Link Form, Alur, Biaya)
  const [settingsData, setSettingsData] = useState<PPDBSettings>(ppdbSettings);

  // Synchronize when ppdbSettings updates
  React.useEffect(() => {
    if (ppdbSettings) {
      setSettingsData(ppdbSettings);
    }
  }, [ppdbSettings]);

  // Handlers for PPDB Page Settings
  const handleSaveAllSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading('Menyimpan pengaturan PPDB...');
    try {
      await AppStore.savePPDBSettings(settingsData);
      toast.success('Pengaturan Disimpan', 'Konfigurasi PPDB, brosur, kontak, dan alur pendaftaran berhasil diperbarui.');
    } catch (err: any) {
      toast.error('Gagal Menyimpan', err?.message || 'Terjadi kesalahan saat menyimpan pengaturan PPDB.');
    } finally {
      stopLoading();
    }
  };

  // Step Helpers
  const handleStepChange = (index: number, field: keyof PPDBStep, value: string) => {
    const updatedSteps = [...settingsData.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSettingsData({ ...settingsData, steps: updatedSteps });
  };

  const addStep = () => {
    const nextNum = String(settingsData.steps.length + 1).padStart(2, '0');
    setSettingsData({
      ...settingsData,
      steps: [
        ...settingsData.steps,
        { num: nextNum, title: 'Tahap Baru', desc: 'Penjelasan tahapan...' }
      ]
    });
  };

  const removeStep = (index: number) => {
    const updatedSteps = settingsData.steps.filter((_, idx) => idx !== index);
    setSettingsData({ ...settingsData, steps: updatedSteps });
  };

  // Fee Helpers
  const handleFeeChange = (index: number, field: keyof PPDBFeeItem, value: string) => {
    const updatedFees = [...settingsData.fees];
    updatedFees[index] = { ...updatedFees[index], [field]: value };
    setSettingsData({ ...settingsData, fees: updatedFees });
  };

  const addFee = () => {
    setSettingsData({
      ...settingsData,
      fees: [
        ...settingsData.fees,
        { item: 'Komponen Baru', amount: 'Rp 500.000', note: 'Keterangan pembayaran' }
      ]
    });
  };

  const removeFee = (index: number) => {
    const updatedFees = settingsData.fees.filter((_, idx) => idx !== index);
    setSettingsData({ ...settingsData, fees: updatedFees });
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bento */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Manajemen Konten PPDB
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Pengaturan Halaman PPDB Online</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola foto 3:4, nomor WhatsApp panitia, link Google Form pendaftaran, alur tahapan seleksi, dan rincian estimasi biaya/SPP.
          </p>
        </div>

        <a
          href="/ppdb"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Lihat Halaman PPDB</span>
        </a>
      </div>

      <form onSubmit={handleSaveAllSettings} className="space-y-6">
        
        {/* Section 1: Foto 3:4 & Link Kontak */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Box Foto 3:4 Hero PPDB (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Foto Kanan 3:4 Halaman PPDB</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Foto ini tampil di bingkai rasio 3:4 sebelah kanan headline "Pendaftaran Santri Baru".
              </p>

              <ImageUploader
                label="Upload Foto Brosur / Poster 3:4"
                required
                value={settingsData.heroImage}
                onChange={(base64) => setSettingsData({ ...settingsData, heroImage: base64 })}
                aspectRatio="portrait"
                description="Pilih foto dari komputer atau HP (Rasio portrait 3:4)"
              />
            </div>
          </div>

          {/* Box Kontak WhatsApp & Link Form Pendaftaran (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <LinkIcon className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Kontak Panitia & Tautan Pendaftaran</h3>
            </div>
            <p className="text-xs text-slate-500">
              Atur tujuan tombol <strong>"Daftar Sekarang"</strong>, <strong>"Konsultasi Panitia"</strong>, dan <strong>"Unduh Panduan"</strong>.
            </p>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nomor WhatsApp Panitia PPDB *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={settingsData.whatsappNumber}
                    onChange={(e) => setSettingsData({ ...settingsData, whatsappNumber: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    placeholder="Contoh: 0838-4847-8150"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Pengunjung yang mengklik "Konsultasi Panitia" akan otomatis diarahkan ke chat nomor WhatsApp ini.
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Link Formulir Pendaftaran (Google Form / Portal Resmi) *
                </label>
                <input
                  type="url"
                  required
                  value={settingsData.formUrl}
                  onChange={(e) => setSettingsData({ ...settingsData, formUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  placeholder="https://forms.gle/..."
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Tautan tujuan ketika pengunjung mengklik tombol utama "Daftar Sekarang".
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Link Brosur / Dokumen Panduan Pendaftaran (PDF / Drive)
                </label>
                <input
                  type="url"
                  value={settingsData.brochurePdfUrl}
                  onChange={(e) => setSettingsData({ ...settingsData, brochurePdfUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  placeholder="https://drive.google.com/... atau link PDF langsung"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Tautan tombol "Unduh Panduan" di kartu Dokumen Panduan Santri.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: Poin-Poin Alur Pendaftaran */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-emerald-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Alur Pendaftaran Santri Baru (Accordion)</h3>
                <p className="text-xs text-slate-400">Tahapan seleksi yang tampil di kolom kiri halaman PPDB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={addStep}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tahap</span>
            </button>
          </div>

          <div className="space-y-3">
            {settingsData.steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 flex flex-col md:flex-row items-start gap-3">
                <div className="w-16 shrink-0">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">No. Urut</label>
                  <input
                    type="text"
                    value={step.num}
                    onChange={(e) => handleStepChange(idx, 'num', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-center font-bold bg-white border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Judul Tahapan</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 font-bold bg-white border border-slate-200 rounded-xl text-xs outline-none"
                      placeholder="Contoh: Tes Baca Qur'an & Wawancara"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Penjelasan Singkat</label>
                    <textarea
                      rows={2}
                      value={step.desc}
                      onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                      placeholder="Uji kemampuan membaca Al-Qur'an..."
                    />
                  </div>
                </div>

                {settingsData.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(idx)}
                    className="p-2 text-slate-400 hover:text-rose-500 self-center md:self-start mt-2 md:mt-6"
                    title="Hapus Tahapan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Estimasi Biaya Masuk & SPP Bulanan */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Tabel Estimasi Biaya Masuk & SPP Bulanan</h3>
                <p className="text-xs text-slate-400">Rincian tabel transparansi finansial di kolom kanan halaman PPDB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={addFee}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Komponen</span>
            </button>
          </div>

          <div className="space-y-3">
            {settingsData.fees.map((fee, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Komponen Pembiayaan</label>
                  <input
                    type="text"
                    value={fee.item}
                    onChange={(e) => handleFeeChange(idx, 'item', e.target.value)}
                    className="w-full px-3 py-1.5 font-bold bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    placeholder="Contoh: Seragam Lengkap (3 Setel)"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nominal (Rp)</label>
                  <input
                    type="text"
                    value={fee.amount}
                    onChange={(e) => handleFeeChange(idx, 'amount', e.target.value)}
                    className="w-full px-3 py-1.5 font-bold text-emerald-800 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    placeholder="Rp 950.000"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Keterangan</label>
                  <input
                    type="text"
                    value={fee.note}
                    onChange={(e) => handleFeeChange(idx, 'note', e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    placeholder="Termasuk atribut pondok"
                  />
                </div>

                <div className="md:col-span-1 flex justify-end">
                  {settingsData.fees.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFee(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                      title="Hapus Biaya"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Save Bar Bottom */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-sm transition-transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Halaman PPDB</span>
          </button>
        </div>

      </form>
    </div>
  );
};
