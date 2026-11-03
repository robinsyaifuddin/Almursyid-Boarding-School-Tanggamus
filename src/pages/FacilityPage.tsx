import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  X, 
  ChevronRight, 
  Maximize2, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { FACILITIES } from '../data/siteData';

// Extended curated data for the bento gallery
interface FacilityItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  desc: string;
  image: string;
  badge?: string;
  highlightPoints?: string[];
}

const GALLERY_FACILITIES: FacilityItem[] = [
  {
    id: "masjid",
    name: "Masjid Jami' Al-Mursyid",
    category: "Ibadah & Halaqah",
    tagline: "Pusat spiritual santri & halaqah Quran",
    desc: "Pusat spiritual utama santri untuk salat berjamaah 5 waktu, tahsin bersanad, kajian kitab kuning turats, dan qiyamul lail dengan suasana hening kaki bukit Tanggamus.",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80",
    badge: "Pusat Ibadah",
    highlightPoints: ["Kapasitas 500+ jamaah", "Sirkulasi sejuk alami", "Halaqah tahfidz 24 jam"]
  },
  {
    id: "asrama",
    name: "Asrama Santri Terpadu",
    category: "Hunian Santri",
    tagline: "Hunian nyaman & beradab putra-putri",
    desc: "Gedung asrama santri putra dan putri terpisah mandiri. Kamar tidur tertata higienis, ranjang bertingkat kokoh, lemari perorangan, dan sirkulasi angin pegunungan yang menyehatkan.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    badge: "Hunian Nyaman",
    highlightPoints: ["Gedung putra & putri terpisah", "Pengawasan musyrif 24 jam", "Sanitasi bersih terawat"]
  },
  {
    id: "kelas",
    name: "Ruang Kelas & Lab Komputer",
    category: "Pendidikan Formal",
    tagline: "Kombinasi sains, bahasa & teknologi",
    desc: "Ruang belajar representatif berfasilitas modern untuk kurikulum nasional dan pesantren, dilengkapi proyektor, papan interaktif, serta laboratorium komputer berbasis literasi digital.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80",
    badge: "Sains & Teknologi",
    highlightPoints: ["Ruang belajar ergonomis", "Lab komputer & multimedia", "Akses jaringan edukasi"]
  },
  {
    id: "perpustakaan",
    name: "Perpustakaan Islam & Turats",
    category: "Pustaka & Riset",
    tagline: "Khazanah ilmu salaf dan kontemporer",
    desc: "Menyediakan ratusan koleksi kitab kuning mu'tabarah, tafsir, ensiklopedia sains islam, buku teks kurikulum, dan sudut baca hening untuk menumbuhkan minat literasi riset santri.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
    badge: "Khazanah Literasi",
    highlightPoints: ["Koleksi kitab kuning salaf", "Buku referensi sains modern", "Ruang baca kondusif"]
  },
  {
    id: "lapangan",
    name: "Sarana Olahraga & Area Terbuka",
    category: "Kebugaran & Olahraga",
    tagline: "Tubuh sehat, jiwa tangguh & disiplin",
    desc: "Lapangan multifungsi untuk futsal, voli, bulu tangkis, latihan bela diri, serta area upacara dan apel pramuka dengan panorama asri perbukitan Way Lalaan.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80",
    badge: "Kebugaran Santri",
    highlightPoints: ["Lapangan futsal & voli", "Area latihan bela diri", "Udara pegunungan segar"]
  },
  {
    id: "dapur",
    name: "Dapur & Ruang Makan Halal",
    category: "Gizi & Konsumsi",
    tagline: "Nutrisi sehat terjamin 3x sehari",
    desc: "Dapur pengolahan pangan berstandar kebersihan tinggi, menjamin asupan makanan halal, lezat, dan bergizi seimbang untuk menopang stamina dan kecerdasan para santri.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
    badge: "Gizi Seimbang",
    highlightPoints: ["Menu 3 kali sehari", "Bahan segar & halal", "Penyajian higienis"]
  },
  {
    id: "taman",
    name: "Kawasan Hijau & Lanskap Alami",
    category: "Lingkungan Pesantren",
    tagline: "Suasana asri penyejuk pikiran santri",
    desc: "Pekarangan asri berlatar kaki Gunung Tanggamus yang mendukung suasana tadabbur alam, ketenangan batin dalam menghafal Al-Qur'an, dan lingkungan bebas polusi perkotaan.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
    badge: "Asri Pegunungan",
    highlightPoints: ["Jauh dari kebisingan kota", "Ekosistem sejuk & hijau", "Area tadabbur alam"]
  }
];

export const FacilityPage: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  // Quick pointers matching the minimalist list style in Image 2
  const highlights = [
    { label: "Ruang Ibadah Khusyuk", category: "Masjid & Halaqah", targetId: "masjid" },
    { label: "Asrama Bersih & Higienis", category: "Hunian Santri", targetId: "asrama" },
    { label: "Lab & Kelas Ergonomis", category: "Fasilitas Formal", targetId: "kelas" },
    { label: "Alam Asri Way Lalaan", category: "Lingkungan Hijau", targetId: "taman" },
  ];

  const openModal = (facility: FacilityItem) => {
    setSelectedFacility(facility);
  };

  const closeModal = () => {
    setSelectedFacility(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24">
      {/* Container utama dengan layout asimetris bento ala referensi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        
        {/* Bento Grid Gallery sesuai komposisi referensi Gambar 2 */}
        {/* Grid 12 kolom untuk desktop, adaptif untuk tablet & mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* KOLOM KIRI ATAS: Header Typography & Headline Hero */}
          <div className="md:col-span-8 flex flex-col justify-between py-2 sm:py-4 pr-0 lg:pr-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block">
                  Infrastruktur & Sarana Kampus
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-emerald-600 block rounded-full"></span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Fasilitas Nyaman. <br />
                Lingkungan Berkah.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed pt-1">
                Sarana hunian, ibadah, dan pembelajaran modern terintegrasi di kawasan pegunungan sejuk Way Lalaan, Tanggamus, Lampung.
              </p>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/ppdb"
                className="bg-slate-900 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 active:scale-95 shadow-sm inline-flex items-center gap-2"
              >
                <span>Daftar Sekarang</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <button
                type="button"
                onClick={() => openModal(GALLERY_FACILITIES[0])}
                className="border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs sm:text-sm font-medium px-5 py-3 rounded-full transition-all duration-200 active:scale-95 inline-flex items-center gap-2"
              >
                <span>Lihat Foto Fasilitas</span>
                <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* KOLOM KANAN ATAS (Item 1): Card Vertikal Foto Portrait Kanan Atas */}
          <div className="md:col-span-4">
            <div 
              onClick={() => openModal(GALLERY_FACILITIES[0])}
              className="group relative h-64 sm:h-80 md:h-[340px] w-full rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={GALLERY_FACILITIES[0].image}
                alt={GALLERY_FACILITIES[0].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-300 block mb-1">
                  {GALLERY_FACILITIES[0].category}
                </span>
                <h3 className="text-lg font-bold leading-snug">
                  {GALLERY_FACILITIES[0].name}
                </h3>
              </div>
            </div>
          </div>

          {/* BARIS TENGAH - KIRI (Item 2): Foto Asrama */}
          <div className="md:col-span-3">
            <div 
              onClick={() => openModal(GALLERY_FACILITIES[1])}
              className="group relative h-56 sm:h-64 md:h-[290px] w-full rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={GALLERY_FACILITIES[1].image}
                alt={GALLERY_FACILITIES[1].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-300 block mb-0.5">
                  {GALLERY_FACILITIES[1].category}
                </span>
                <h3 className="text-base font-bold leading-tight">
                  {GALLERY_FACILITIES[1].name}
                </h3>
              </div>
            </div>
          </div>

          {/* BARIS TENGAH - TENGAH (Item 3): Foto Ruang Kelas / Laboratorium */}
          <div className="md:col-span-3">
            <div 
              onClick={() => openModal(GALLERY_FACILITIES[2])}
              className="group relative h-56 sm:h-64 md:h-[290px] w-full rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={GALLERY_FACILITIES[2].image}
                alt={GALLERY_FACILITIES[2].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-300 block mb-0.5">
                  {GALLERY_FACILITIES[2].category}
                </span>
                <h3 className="text-base font-bold leading-tight">
                  {GALLERY_FACILITIES[2].name}
                </h3>
              </div>
            </div>
          </div>

          {/* BARIS TENGAH - KANAN (Item 4 - Teks List Panah sesuai Desain Referensi) */}
          <div className="md:col-span-2 flex flex-col justify-center py-4 px-2 space-y-4">
            {highlights.map((h, idx) => {
              const matched = GALLERY_FACILITIES.find(f => f.id === h.targetId);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => matched && openModal(matched)}
                  className="group flex items-start gap-2.5 text-left transition-transform duration-200 hover:translate-x-1"
                >
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-colors shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-forest-900 transition-colors">
                      {h.label}
                    </span>
                    <span className="block text-[11px] text-slate-500 font-normal">
                      {h.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* BARIS TENGAH & BAWAH KANAN (Item 5): Card Tower Vertikal Besar */}
          <div className="md:col-span-4 md:row-span-2">
            <div 
              onClick={() => openModal(GALLERY_FACILITIES[3])}
              className="group relative h-72 sm:h-96 md:h-full min-h-[380px] w-full rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={GALLERY_FACILITIES[3].image}
                alt={GALLERY_FACILITIES[3].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="inline-block bg-white/20 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md text-emerald-300 border border-white/10">
                  {GALLERY_FACILITIES[3].category}
                </span>
                <h3 className="text-xl font-bold leading-snug">
                  {GALLERY_FACILITIES[3].name}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-3 font-normal leading-relaxed">
                  {GALLERY_FACILITIES[3].desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                  <span>Klik untuk detail sarana</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* BARIS BAWAH - KIRI (Item 6): Lapangan Olahraga */}
          <div className="md:col-span-3">
            <div 
              onClick={() => openModal(GALLERY_FACILITIES[4])}
              className="group relative h-56 sm:h-64 md:h-[260px] w-full rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={GALLERY_FACILITIES[4].image}
                alt={GALLERY_FACILITIES[4].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-300 block mb-0.5">
                  {GALLERY_FACILITIES[4].category}
                </span>
                <h3 className="text-base font-bold leading-tight">
                  {GALLERY_FACILITIES[4].name}
                </h3>
              </div>
            </div>
          </div>

          {/* BARIS BAWAH - TENGAH (Item 7): Dapur & Ruang Makan */}
          <div className="md:col-span-3">
            <div 
              onClick={() => openModal(GALLERY_FACILITIES[5])}
              className="group relative h-56 sm:h-64 md:h-[260px] w-full rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={GALLERY_FACILITIES[5].image}
                alt={GALLERY_FACILITIES[5].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-300 block mb-0.5">
                  {GALLERY_FACILITIES[5].category}
                </span>
                <h3 className="text-base font-bold leading-tight">
                  {GALLERY_FACILITIES[5].name}
                </h3>
              </div>
            </div>
          </div>

          {/* BARIS BAWAH - KANAN BAWAH (Item 8): Lanskap Hijau Way Lalaan */}
          <div className="md:col-span-2">
            <div 
              onClick={() => openModal(GALLERY_FACILITIES[6])}
              className="group relative h-56 sm:h-64 md:h-[260px] w-full rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={GALLERY_FACILITIES[6].image}
                alt={GALLERY_FACILITIES[6].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-300 block mb-0.5">
                  {GALLERY_FACILITIES[6].category}
                </span>
                <h3 className="text-base font-bold leading-tight">
                  {GALLERY_FACILITIES[6].name}
                </h3>
              </div>
            </div>
          </div>

        </div>

        {/* Banner Penjaminan Mutu & Keamanan */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Standar Kebersihan, Keamanan & Kenyamanan
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Lingkungan Belajar Asri & Bebas Distraksi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Seluruh fasilitas dirawat secara berkala oleh staf kebersihan dan diawasi musyrif 24 jam untuk memastikan kenyamanan belajar serta istirahat santri.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Link
              to="/ppdb"
              className="bg-forest-900 hover:bg-forest-950 text-white font-semibold px-6 py-3 rounded-full text-xs sm:text-sm tracking-wide transition-all active:scale-95 shadow-sm inline-flex items-center gap-2"
            >
              <span>Konsultasi Kunjungan Kampus</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* MODAL LIGHTBOX / DETAIL DIALOG KETIKA FOTO DIKLIK */}
      {selectedFacility && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Foto Modal */}
            <div className="relative h-64 sm:h-80 w-full bg-slate-900 shrink-0">
              <img
                src={selectedFacility.image}
                alt={selectedFacility.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-emerald-300 text-xs font-semibold">
                {selectedFacility.category}
              </div>
            </div>

            {/* Isi Konten Modal */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedFacility.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-emerald-800 mt-1">
                  {selectedFacility.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedFacility.desc}
              </p>

              {/* Poin Keunggulan */}
              {selectedFacility.highlightPoints && (
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Keunggulan Fasilitas:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedFacility.highlightPoints.map((point, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Way Lalaan, Tanggamus
                </span>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-full transition-colors"
                >
                  Tutup Pratinjau
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

