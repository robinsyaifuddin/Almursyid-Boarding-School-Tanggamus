import React, { useState } from 'react';
import { 
  ArrowUpRight, ChevronDown, Check,
  Send, Clock
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "01",
    question: "Kapan jadwal pendaftaran santri baru (PPDB) dibuka?",
    answer: "Pendaftaran santri baru (PPDB) dibuka dalam beberapa gelombang setiap tahun ajaran baru, dimulai dari gelombang inden pada bulan Oktober hingga kuota terpenuhi. Kami menyarankan pendaftaran lebih awal karena kuota asrama terbatas."
  },
  {
    id: "02",
    question: "Apakah santri diperbolehkan dijenguk oleh wali santri?",
    answer: "Tentu. Pondok Pesantren Al-Mursyid menetapkan jadwal kunjungan rutin dua pekan sekali pada hari Ahad untuk menjaga konsentrasi, kedisiplinan belajar, dan ritme halaqah santri."
  },
  {
    id: "03",
    question: "Apa saja kurikulum yang dipelajari di Pondok Al-Mursyid?",
    answer: "Kami menerapkan kurikulum terpadu yang memadukan Kurikulum Merdeka (Kementerian Pendidikan / Kemenag) untuk jalur formal SMP/SMA dengan kurikulum kepesantrenan (Tahfidzul Qur'an bersanad, Dirosah Islamiyah, dan pendalaman Kitab Kuning)."
  },
  {
    id: "04",
    question: "Bagaimana prosedur silaturahmi atau survei langsung ke kampus?",
    answer: "Wali calon santri dipersilakan berkunjung pada jam operasional sekretariat (Senin - Sabtu pukul 07.30 - 16.30 WIB). Untuk pendampingan tur fasilitas pondok, kami sarankan konfirmasi melalui WhatsApp terlebih dahulu."
  },
  {
    id: "05",
    question: "Apakah tersedia beasiswa bagi santri berprestasi atau yatim/dhuafa?",
    answer: "Ya, Yayasan Almursyid menyediakan program beasiswa jalur tahfidz mutqin dan bantuan santri dhuafa berprestasi melalui seleksi administrasi dan uji kompetensi hafalan."
  }
];

export const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>("01");
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Pendaftaran Santri Baru (PPDB)',
    schedule: 'Segera',
    message: ''
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-white text-stone-900 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-20 pb-10 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block">
                  Hubungi Kami &middot; 01
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.08]">
                Mari Terhubung <br />
                <span className="font-normal">Dengan Al-Mursyid</span>
              </h1>
            </div>
            <div className="lg:col-span-5 pb-1">
              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                Punya pertanyaan seputar kurikulum, pendaftaran santri baru, silaturahmi wali santri, atau agenda kunjungan langsung ke kampus pesantren di Tanggamus? Kami siap menyambut Anda.
              </p>
            </div>
          </div>

          {/* Panoramic Campus Hero Visual */}
          <div className="mt-10 sm:mt-12 rounded-xl sm:rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] relative bg-stone-200 border border-stone-300/70 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1800&q=85" 
              alt="Kampus Pondok Pesantren Al-Mursyid Tanggamus" 
              className="w-full h-full object-cover grayscale-[15%] contrast-[1.02] hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-1.5 rounded bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] ">
              Kampus Al-Mursyid &bull; Kota Agung Timur, Tanggamus
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SPLIT: CONTACT INFO + FORM */}
      <section className="py-16 sm:py-24 border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Side: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
                    Kontak Resmi
                  </h2>
                  <span className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">02</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-light">
                  {SITE_INFO.foundation} &bull; Way Lalaan, Tanggamus
                </p>
              </div>

              {/* Boxed cards with green accent accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 hover:border-emerald-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Email
                  </span>
                  <a 
                    href={`mailto:${SITE_INFO.contacts.email}`} 
                    className="text-xs sm:text-sm font-medium text-stone-900 hover:text-emerald-700 transition-colors block break-words"
                  >
                    {SITE_INFO.contacts.email}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 hover:border-emerald-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Telepon & WhatsApp
                  </span>
                  <a 
                    href={`tel:${SITE_INFO.contacts.phone}`} 
                    className="text-xs sm:text-sm font-medium text-stone-900 hover:text-emerald-700 transition-colors block"
                  >
                    {SITE_INFO.contacts.phone}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 sm:col-span-2 hover:border-emerald-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Alamat Kampus
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {SITE_INFO.address.full}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 sm:col-span-2 hover:border-emerald-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Jam Pelayanan
                  </span>
                  <p className="text-xs text-stone-700 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{SITE_INFO.contacts.operationalHours}</span>
                  </p>
                </div>
              </div>

              {/* Social Link & Maps Shortcut */}
              <div className="flex flex-wrap items-center gap-3 text-xs pt-2">
                <a 
                  href={SITE_INFO.contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-emerald-800 hover:border-emerald-300 transition-colors shadow-2xs"
                >
                  <span>Instagram {SITE_INFO.contacts.instagramHandle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                </a>

                <a 
                  href={SITE_INFO.contacts.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-emerald-800 hover:border-emerald-300 transition-colors shadow-2xs"
                >
                  <span>Buka di Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                </a>
              </div>
            </div>

            {/* Right Side: Form Card with Boxed Inputs */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
                {sent ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900">
                      Pesan Berhasil Terkirim
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                      Terima kasih, <strong>{formData.name}</strong>. Tim sekretariat Al-Mursyid akan segera meninjau pesan Anda dan merespons via WhatsApp atau telepon dalam kurun waktu 1x24 jam.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
                    >
                      Kirim pesan lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-5">
                    
                    {/* Row 1: Nama & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                          Nama Lengkap *
                        </label>
                        <input 
                          type="text"
                          required
                          placeholder="Contoh: Fulan bin Fulan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                          Email
                        </label>
                        <input 
                          type="email"
                          placeholder="nama@email.com (opsional)"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: WhatsApp & Topik */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                          No. WhatsApp / HP *
                        </label>
                        <input 
                          type="tel"
                          required
                          placeholder="08xxxxxxxxxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                          Topik Kebutuhan
                        </label>
                        <select
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10 transition-all cursor-pointer"
                        >
                          <option value="Pendaftaran Santri Baru (PPDB)">Pendaftaran Santri Baru (PPDB)</option>
                          <option value="Konsultasi Program Tahfidz">Konsultasi Program Tahfidz</option>
                          <option value="Kunjungan / Silaturahmi Pesantren">Kunjungan / Silaturahmi Pesantren</option>
                          <option value="Wakaf & Infaq Sarana">Wakaf & Infaq Sarana</option>
                          <option value="Pertanyaan Umum">Pertanyaan Umum Lainnya</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Rencana Kunjungan / Timeline */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                        Waktu Respons / Jadwal Kunjungan yang Diharapkan
                      </label>
                      <input 
                        type="text"
                        placeholder="Contoh: Akhir pekan ini / Bulan depan / Segera"
                        value={formData.schedule}
                        onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10 transition-all"
                      />
                    </div>

                    {/* Row 4: Pesan / Keterangan */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                        Tuliskan Pesan / Pertanyaan *
                      </label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Jelaskan secara singkat kebutuhan atau pertanyaan Anda..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button: Aurora Green Pill Button sesuai tema web */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-aurora-btn text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                      >
                        <span>Kirim Pesan</span>
                        <Send className="w-3.5 h-3.5 text-white/90" />
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EDITORIAL ACCORDION FAQ SECTION */}
      <section className="py-16 sm:py-24 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FAQ Title */}
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
                  FAQ
                </h2>
                <span className="text-[11px] text-stone-700">03</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-light max-w-xs">
                Pertanyaan yang paling sering diajukan seputar pendaftaran santri, kehidupan asrama, dan kunjungan.
              </p>
            </div>

            {/* FAQ Accordion List */}
            <div className="lg:col-span-8 divide-y divide-stone-200 border-t border-b border-stone-200">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div key={faq.id} className="py-5 sm:py-6 transition-colors">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left flex items-start justify-between gap-4 group cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-start gap-4 sm:gap-6">
                        <span className="text-xs text-stone-700 pt-0.5 select-none">
                          {faq.id}
                        </span>
                        <span className="text-sm sm:text-base font-normal text-stone-900 group-hover:text-stone-600 transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <span className="text-stone-700 group-hover:text-stone-700 transition-transform duration-200 shrink-0 pt-0.5">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pl-8 sm:pl-12 pr-4 pt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. MAP SECTION (CLEAN & INTEGRATED) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-[11px] tracking-widest uppercase text-stone-700 block mb-1">
                Lokasi &middot; 04
              </span>
              <h3 className="text-2xl font-light text-stone-900">
                Peta Kampus Al-Mursyid
              </h3>
            </div>
            <a
              href={SITE_INFO.contacts.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-950 underline underline-offset-4"
            >
              <span>Petunjuk Arah Lengkap di Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-xl overflow-hidden border border-stone-300/80 h-[380px] sm:h-[440px] w-full bg-stone-200">
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


