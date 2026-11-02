import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, 
  Send, ExternalLink, CheckCircle2
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-aurora-mesh border-b border-emerald-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center text-emerald-800 text-xs font-bold tracking-wider uppercase pb-1.5 border-b border-emerald-200">
            <span>Sekretariat & Pelayanan Informasi</span>
          </div>
          <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Kontak & Lokasi Pondok
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Silakan hubungi kami untuk informasi seputar pendaftaran santri baru, silaturahmi, kunjungan pesantren, maupun konsultasi program tahfidz.
          </p>
        </div>
      </section>

      {/* Info Kontak & Formulir Pesan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sisi Kiri: Rincian Kontak Lengkap */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                Informasi Resmi
              </span>
              <h2 className=" text-2xl font-bold text-slate-900">
                Pondok Pesantren Al-Mursyid
              </h2>
              <p className="text-xs text-slate-500 font-bold uppercase">
                {SITE_INFO.foundation}
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <MapPin className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-slate-900 ">Alamat Kampus Pesantren:</strong>
                  <p className="text-slate-600 leading-relaxed">{SITE_INFO.address.full}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Phone className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-slate-900 ">Telepon & WhatsApp:</strong>
                  <a href={`tel:${SITE_INFO.contacts.phone}`} className="block text-slate-600 hover:text-gold-600 font-mono">
                    {SITE_INFO.contacts.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <InstagramIcon className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-slate-900 ">Instagram Resmi:</strong>
                  <a 
                    href={SITE_INFO.contacts.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-gold-600 font-normal"
                  >
                    <span>{SITE_INFO.contacts.instagramHandle}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Mail className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-slate-900 ">Email Resmi:</strong>
                  <a href={`mailto:${SITE_INFO.contacts.email}`} className="block text-slate-600 hover:text-gold-600">
                    {SITE_INFO.contacts.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Clock className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-slate-900 ">Waktu Layanan Sekretariat:</strong>
                  <p className="text-slate-600">{SITE_INFO.contacts.operationalHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Formulir Kirim Pesan */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <h3 className=" font-bold text-lg text-slate-900">Kirim Pesan / Pertanyaan</h3>
              <p className="text-xs text-slate-500">
                Punya pertanyaan terkait pendaftaran atau kunjungan? Tuliskan pesan Anda di bawah ini.
              </p>
            </div>

            {sent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className=" font-bold text-emerald-950 text-base">Pesan Anda Terkirim</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Terima kasih <strong>{formData.name}</strong>. Pesan Anda telah kami terima dan staf sekretariat Al-Mursyid akan segera menindaklanjuti.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">No. WhatsApp / HP *</label>
                    <input
                      type="tel"
                      required
                      placeholder="08xxxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Alamat Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com (opsional)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Topik Pesan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Informasi Pendaftaran Santri Baru / Kunjungan"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Isi Pesan *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pertanyaan Anda secara jelas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-aurora-btn text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <Send className="w-4 h-4 text-white/90" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Google Maps Embed Interaktif / Responsif */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-l-4 border-gold-500 pl-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                Akses & Navigasi Lokasi
              </span>
              <h3 className=" text-xl font-bold text-slate-900">
                Peta Lokasi Ponpes Al-Mursyid Tanggamus
              </h3>
            </div>
            <a
              href={SITE_INFO.contacts.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 bg-forest-950 text-white rounded-lg text-xs font-bold hover:bg-forest-900 transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>Buka Petunjuk Arah di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-md h-[420px] w-full bg-slate-100">
            <iframe
              title="Peta Lokasi Ponpes Al-Mursyid Tanggamus"
              src={`https://maps.google.com/maps?q=Ponpes+Al-Mursyid,+Kp.+Baru,+Kota+Agung+Barat,+Tanggamus&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </section>

    </div>
  );
};
