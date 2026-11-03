import React, { useState } from 'react';
import { 
  Phone, ArrowRight, AlertCircle, ExternalLink,
  CheckCircle2, ChevronRight, ChevronDown,
  Sparkles, FileText, Download, GraduationCap
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';

export const PPDBPage: React.FC = () => {
  const { ppdbSettings, siteInfo } = useAppStoreData();
  const [openStepIndex, setOpenStepIndex] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setOpenStepIndex(prev => prev === index ? null : index);
  };

  const steps = ppdbSettings?.steps || [];
  const fees = ppdbSettings?.fees || [];
  const heroImage = ppdbSettings?.heroImage || "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80";
  const whatsappNumber = ppdbSettings?.whatsappNumber || siteInfo?.contacts?.phone || "0838-4847-8150";
  const formUrl = ppdbSettings?.formUrl || siteInfo?.contacts?.ppdbFormUrl || "https://forms.gle/almursyid-ppdb";
  const brochurePdfUrl = ppdbSettings?.brochurePdfUrl || formUrl;

  const waLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Halo%20Panitia%20PPDB%20Al-Mursyid,%20saya%20ingin%20konsultasi%20pendaftaran%20santri%20baru.`;

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-emerald-500 selection:text-white pb-24">
      
      {/* Top Hero Section */}
      <section className="relative pt-4 sm:pt-6 pb-6 lg:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Main Grid: Left Typography & Cards + Right Framed Hero Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Kolom Kiri (lg:col-span-7): Header, Deskripsi, Tombol Aksi, & Mini Bento Card */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            
            {/* Top Headings */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Pendaftaran <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 via-forest-800 to-emerald-700">
                  Santri Baru
                </span> Al-Mursyid
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Bentuk karakter generasi Qur'ani berakhlak mulia, mandiri, dan berwawasan luas dengan kurikulum terpadu di kawasan asri Way Lalaan Tanggamus.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-forest-900 hover:bg-forest-950 text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
              >
                <span>Daftar Sekarang</span>
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </a>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-semibold text-slate-700 hover:text-emerald-900 bg-white border border-slate-200/90 hover:border-emerald-200 hover:bg-emerald-50/40 shadow-xs transition-all active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Konsultasi Panitia</span>
              </a>
            </div>

            {/* Dokumen Panduan Santri Banner/Card */}
            <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-stretch gap-3.5">
                <div className="flex items-center justify-center shrink-0 text-emerald-800">
                  <FileText className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div className="flex flex-col justify-between py-0.5 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    Dokumen Panduan Santri
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Brosur & Panduan Pendaftaran (PDF)
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Panduan kurikulum, tata tertib santri, jadwal tes wawancara, & perlengkapan.
                  </p>
                </div>
              </div>

              <a
                href={brochurePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-forest-900 hover:bg-forest-950 text-white shadow-sm hover:shadow transition-all shrink-0 active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Unduh Panduan</span>
              </a>
            </div>

          </div>

          {/* Kolom Kanan: Clean Visual Frame 3:4 yang pas di viewport */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] xl:max-w-[360px] aspect-[3/4] max-h-[calc(100vh-170px)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200/90 bg-slate-100 group">
              <img
                src={heroImage}
                alt="Pondok Pesantren Al-Mursyid"
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>

      </section>

      {/* Rincian Alur Pendaftaran & Biaya Masuk */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-8 space-y-12">
        
        {/* Grid 2 Kolom: Alur Pendaftaran (Kiri) & Estimasi Biaya (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Kolom Kiri: Alur Pendaftaran Santri Baru */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                  Tahapan Seleksi
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Alur Pendaftaran Santri Baru
              </h2>
            </div>

            {/* Accordion Alur Pendaftaran */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
              {steps.map((step, index) => {
                const isOpen = openStepIndex === index;
                return (
                  <div key={step.num} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => toggleStep(index)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/70 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`text-sm font-black rounded-lg w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? 'bg-forest-900 text-white' : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {step.num}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">{step.title}</h4>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        isOpen 
                          ? 'rotate-180 bg-forest-900 border-forest-950 text-white shadow-xs' 
                          : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200/90 text-emerald-800'
                      }`}>
                        <ChevronDown className="w-4.5 h-4.5 stroke-[2.5]" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-0 pl-15 sm:pl-16">
                        <p className="text-xs sm:text-[13px] font-medium text-slate-900 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                          {step.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kolom Kanan: Estimasi Biaya Masuk & SPP Bulanan */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                  Transparansi Finansial
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Estimasi Biaya Masuk & SPP Bulanan
              </h2>
              <p className="text-xs text-slate-600">
                Biaya pendidikan disusun secara transparan untuk menjamin kualitas asupan gizi, fasilitas asrama, dan operasional pengajaran.
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-emerald-50/70 text-slate-800 border-b border-emerald-100">
                    <tr>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-emerald-950">Komponen Pembiayaan</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-emerald-950">Nominal</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-emerald-950">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {fees.map((fee, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">{fee.item}</td>
                        <td className="p-3.5 font-bold text-emerald-900 text-sm whitespace-nowrap">{fee.amount}</td>
                        <td className="p-3.5 text-slate-500">{fee.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-emerald-50/40 p-3.5 border-t border-slate-100 text-[11px] text-slate-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Tersedia beasiswa santri berprestasi tahfidz dan program keringanan bagi santri yatim dhuafa berprestasi (syarat & ketentuan berlaku).</span>
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};

