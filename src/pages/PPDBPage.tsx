import React from 'react';
import { 
  Phone, ArrowRight, AlertCircle, ExternalLink
} from 'lucide-react';
import { SITE_INFO, PPDB_FEES } from '../data/siteData';

export const PPDBPage: React.FC = () => {

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-aurora-mesh border-b border-emerald-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center text-emerald-800 text-xs font-bold tracking-wider uppercase pb-1.5 border-b border-emerald-200">
            <span>Penerimaan Peserta Didik Baru (PPDB)</span>
          </div>
          <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            PPDB Online Santri Baru 2027/2028
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Selamat datang calon santri Pondok Pesantren Al-Mursyid. Ikuti tahapan pendaftaran online yang mudah, transparan, dan terpercaya.
          </p>
        </div>
      </section>

      {/* Alur & Unduh Brosur Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner Aksi Cepat Unduh & WA */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className=" font-bold text-lg text-slate-900">
              Unduh Brosur Informasi & Rincian Lengkap (PDF)
            </h3>
            <p className="text-xs text-slate-600">
              Pelajari rincian kurikulum, tata tertib santri, jadwal tes wawancara, dan perlengkapan asrama.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SITE_INFO.contacts.ppdbFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-aurora-btn text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <span>Isi Formulir Online (Google Form)</span>
              <ExternalLink className="w-4 h-4 text-white/90" />
            </a>
            <a
              href={SITE_INFO.contacts.ppdbWa}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded text-xs inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Panitia</span>
            </a>
          </div>
        </div>

        {/* Grid 2 Kolom: Alur Pendaftaran (Kiri) & Estimasi Biaya (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Kolom Kiri: Alur Pendaftaran Santri Baru */}
          <div className="space-y-6">
            <div className="border-l-4 border-gold-500 pl-4 space-y-1">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                Tahapan Seleksi
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Alur Pendaftaran Santri Baru
              </h2>
            </div>

            {/* List Alur Berbaris ke Bawah */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 divide-y divide-slate-100">
              <div className="flex items-start gap-4 pb-5">
                <span className="text-xl font-bold text-forest-800 shrink-0 w-8">01</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Pendaftaran Online</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mengisi Google Form pendaftaran online resmi atau langsung datang ke sekretariat pondok di Way Lalaan Tanggamus.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <span className="text-xl font-bold text-forest-800 shrink-0 w-8">02</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Tes Baca Qur'an & Wawancara</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Uji kemampuan membaca Al-Qur'an dasar, tes potensi akademik, serta wawancara kesiapan santri dan wali santri.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <span className="text-xl font-bold text-forest-800 shrink-0 w-8">03</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Pengumuman Kelulusan</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hasil kelulusan disampaikan melalui WhatsApp resmi panitia dan surat keputusan penerimaan santri baru.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5">
                <span className="text-xl font-bold text-forest-800 shrink-0 w-8">04</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Daftar Ulang & Masuk Asrama</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Penyelesaian administrasi daftar ulang, pengambilan seragam, dan penyerahan santri ke asrama pondok.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Estimasi Biaya Masuk & SPP Bulanan */}
          <div className="space-y-6">
            <div className="border-l-4 border-forest-800 pl-4 space-y-1">
              <span className="text-xs font-bold text-forest-800 uppercase tracking-widest">
                Transparansi Finansial
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Estimasi Biaya Masuk & SPP Bulanan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Biaya pendidikan disusun secara transparan untuk menjamin kualitas gizi, fasilitas asrama, dan operasional pengajaran.
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-emerald-50 text-slate-800 border-b border-emerald-100">
                    <tr>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-emerald-900">Komponen Pembiayaan</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-emerald-900">Nominal</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-emerald-900">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {PPDB_FEES.map((fee, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">{fee.item}</td>
                        <td className="p-3.5 font-mono font-bold text-forest-900 text-sm whitespace-nowrap">{fee.amount}</td>
                        <td className="p-3.5 text-slate-500">{fee.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-3.5 border-t border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Tersedia beasiswa santri berprestasi tahfidz dan program keringanan bagi santri yatim dhuafa berprestasi (syarat & ketentuan berlaku).</span>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
