import React, { useState } from 'react';
import { 
  FileDown, CheckCircle2, Phone, Calendar, 
  HelpCircle, ShieldCheck, ArrowRight, Clock, AlertCircle, Send
} from 'lucide-react';
import { SITE_INFO, PPDB_FEES } from '../data/siteData';

export const PPDBPage: React.FC = () => {
  const [formData, setFormData] = useState({
    santriName: '',
    nik: '',
    gender: 'putra',
    birthPlace: '',
    birthDate: '',
    programChoice: 'tahfidz-formal',
    parentName: '',
    phoneWa: '',
    address: '',
    previousSchool: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi penyimpanan lokal / persiapan koneksi ke API Laravel Hostinger
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 border border-gold-500/40 px-3 py-1 rounded text-xs font-semibold">
            <span>Penerimaan Peserta Didik Baru (PPDB)</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            PPDB Online Santri Baru 2027/2028
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Selamat datang calon santri Pondok Pesantren Al-Mursyid. Ikuti tahapan pendaftaran online yang mudah, transparan, dan terpercaya.
          </p>
        </div>
      </section>

      {/* Alur & Unduh Brosur Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner Aksi Cepat Unduh & WA */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Unduh Brosur Informasi & Rincian Lengkap (PDF)
            </h3>
            <p className="text-xs text-slate-600">
              Pelajari rincian kurikulum, tata tertib santri, jadwal tes wawancara, dan perlengkapan asrama.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#formulir"
              className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-5 py-2.5 rounded text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              <span>Isi Formulir Online</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </a>
            <a
              href={SITE_INFO.contacts.ppdbWa}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded text-xs inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Panitia</span>
            </a>
          </div>
        </div>

        {/* 4 Tahap Alur Pendaftaran */}
        <div className="space-y-6">
          <div className="border-l-4 border-gold-500 pl-4 space-y-1">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
              Tahapan Seleksi
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Alur Pendaftaran Santri Baru
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-gold-600">01</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">Pendaftaran Online</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mengisi formulir online melalui halaman ini atau langsung datang ke sekretariat pondok di Way Lalaan Tanggamus.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-gold-600">02</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">Tes Baca Qur'an & Wawancara</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uji kemampuan membaca Al-Qur'an dasar, tes potensi akademik, serta wawancara kesiapan santri dan wali santri.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-gold-600">03</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">Pengumuman Kelulusan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hasil kelulusan disampaikan melalui WhatsApp resmi panitia dan surat keputusan penerimaan santri baru.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-gold-600">04</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">Daftar Ulang & Masuk Asrama</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyelesaian administrasi daftar ulang, pengambilan seragam, dan penyerahan santri ke asrama pondok.
              </p>
            </div>
          </div>
        </div>

        {/* Tabel Biaya Pendidikan Transparan */}
        <div className="space-y-6">
          <div className="border-l-4 border-forest-800 pl-4 space-y-1">
            <span className="text-xs font-bold text-forest-800 uppercase tracking-widest">
              Transparansi Finansial
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Estimasi Biaya Masuk & SPP Bulanan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Biaya pendidikan disusun secara transparan untuk menjamin kualitas gizi, fasilitas asrama, dan operasional pengajaran.
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-forest-950 text-white font-serif">
                  <tr>
                    <th className="p-4 uppercase tracking-wider">Komponen Pembiayaan</th>
                    <th className="p-4 uppercase tracking-wider">Nominal</th>
                    <th className="p-4 uppercase tracking-wider">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {PPDB_FEES.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">{fee.item}</td>
                      <td className="p-4 font-mono font-bold text-forest-900 text-sm">{fee.amount}</td>
                      <td className="p-4 text-slate-500">{fee.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-gold-600 shrink-0" />
              <span>Tersedia beasiswa santri berprestasi tahfidz dan program keringanan bagi santri yatim dhuafa berprestasi (syarat & ketentuan berlaku).</span>
            </div>
          </div>
        </div>

        {/* FORMULIR PENDAFTARAN ONLINE */}
        <div id="formulir" className="scroll-mt-24 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
              Pendaftaran Mandiri
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Formulir Pendaftaran Online Santri Baru
            </h2>
            <p className="text-xs text-slate-500">
              Silakan lengkapi data calon santri dengan teliti. Data ini akan diproses oleh panitia PPDB resmi.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif font-bold text-xl text-emerald-950">
                Pendaftaran Berhasil Dikirim!
              </h3>
              <p className="text-xs text-emerald-800 max-w-lg mx-auto leading-relaxed">
                Terima kasih atas kepercayaan Anda. Data formulir calon santri <strong>{formData.santriName}</strong> telah berhasil terekam. Panitia PPDB akan menghubungi nomor WhatsApp <strong>{formData.phoneWa}</strong> dalam 1x24 jam untuk verifikasi berkas dan jadwal tes.
              </p>
              <div className="pt-2">
                <a
                  href={SITE_INFO.contacts.ppdbWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded text-xs inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Konfirmasi Cepat via WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Nama Lengkap Santri *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Fatih"
                    value={formData.santriName}
                    onChange={(e) => setFormData({ ...formData, santriName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">NISN / Asal Sekolah *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SD/MI Asal atau SMP/MTs Asal"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Jenis Kelamin *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  >
                    <option value="putra">Santri Putra (Ikhwan)</option>
                    <option value="putri">Santri Putri (Akhwat)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Pilihan Jenjang & Program *</label>
                  <select
                    value={formData.programChoice}
                    onChange={(e) => setFormData({ ...formData, programChoice: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  >
                    <option value="tahfidz-formal">SMP Islam Boarding + Tahfidz Qur'an</option>
                    <option value="sma-formal">SMA Islam Boarding + Tahfidz Qur'an</option>
                    <option value="tahfidz-murni">Takhassus Tahfidz 30 Juz & Kitab Kuning</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Nama Orang Tua / Wali *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap ayah / ibu"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 0821xxxxxxx"
                    value={formData.phoneWa}
                    onChange={(e) => setFormData({ ...formData, phoneWa: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Alamat Lengkap Asal Santri *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Nama jalan, desa/kelurahan, kecamatan, kota/kabupaten, dan provinsi"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-slate-400">
                  *Dengan mengirim formulir ini, Anda menyetujui ketentuan pendaftaran resmi Pondok Pesantren Al-Mursyid.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-forest-950 hover:bg-forest-900 text-white font-bold px-8 py-3 rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Kirim Formulir Pendaftaran</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </section>

    </div>
  );
};
