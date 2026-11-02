export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

export const SITE_INFO = {
  name: "Al-Mursyid Islamic Boarding School",
  subName: "Pondok Pesantren Al-Mursyid Tanggamus",
  foundation: "Yayasan Almursyid Tanggamus Lampung",
  tagline: "Mencetak Generasi Qur'ani, Berakhlak, dan Berprestasi",
  legal: {
    kemenkumham: "SK Kemenkumham RI No. AHU-0014511.AH.01.04.Tahun 2020",
    kemenkumhamDate: "28 Agustus 2020",
    piagamKemenag: "Nomor 030299 - Kemenag RI, Ditjen Pendidikan Islam",
    nsp: "510018060046",
    establishedDate: "01 Juli 2022",
  },
  address: {
    village: "Way Lalaan Kampung Baru, Desa Kampung Baru",
    district: "Kec. Kota Agung Timur",
    regency: "Kabupaten Tanggamus",
    province: "Provinsi Lampung",
    full: "Way Lalaan Kampung Baru, Desa Kampung Baru, Kec. Kota Agung Timur, Kab. Tanggamus, Lampung 35384"
  },
  leadership: {
    pembina: "Usman Mursyid",
    pengawas: "Budi Setiawan",
    founders: ["Agus Aftah", "Muhammad Al Ashimi", "Usman Mursyid"],
    pengurus: [
      { name: "Pungut Sarifuddin Ash-Shajili", role: "Ketua Pengurus" },
      { name: "Astoya Saimulani", role: "Sekretaris" },
      { name: "Muhammad Al Ashimi", role: "Bendahara & Hubungan Umat" },
      { name: "Agus Aftah", role: "Divisi Pendidikan & Kurikulum" },
      { name: "Fia Aulia", role: "Kepengurusan Putri & Asrama" },
      { name: "Novi Yani", role: "Administrasi & Keuangan" },
    ]
  },
  contacts: {
    phone: "+62 821-7890-1234",
    whatsapp: "+62 821-7890-1234",
    email: "info@almursyidtanggamus.sch.id",
    ppdbWa: "https://wa.me/6282178901234?text=Halo%20Panitia%20PPDB%20Al-Mursyid,%20saya%20ingin%20konsultasi%20pendaftaran",
    operationalHours: "Senin - Sabtu: 07.30 - 16.30 WIB"
  },
  stats: [
    { value: "510018060046", label: "NSP Kemenag RI", sub: "Terdaftar Resmi" },
    { value: "30 Juz", label: "Program Tahfidz", sub: "Bersanad Mutqin" },
    { value: "1:12", label: "Rasio Ustadz : Santri", sub: "Bimbingan Intensif" },
    { value: "100%", label: "Boarding Terpadu", sub: "Adab & Kemandirian" },
  ]
};

export const NAV_LINKS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { 
    label: "Tentang Kami", 
    href: "/tentang-kami",
    children: [
      { label: "Profil & Sejarah", href: "/tentang-kami#profil", desc: "Mengenal pondok pesantren dan yayasan" },
      { label: "Sambutan Pimpinan", href: "/tentang-kami#sambutan", desc: "Pesan dari pimpinan & pembina" },
      { label: "Visi & Misi", href: "/tentang-kami#visi-misi", desc: "Arah pembinaan santri Al-Mursyid" },
      { label: "Legalitas Yayasan & NSP", href: "/tentang-kami#legalitas", desc: "SK Kemenkumham & Izin Kemenag" },
      { label: "Struktur Pengurus", href: "/tentang-kami#pengurus", desc: "Jajaran pembina, pengawas & pengurus" },
    ]
  },
  { 
    label: "Program Pendidikan", 
    href: "/program",
    children: [
      { label: "Tahfidzul Qur'an 30 Juz", href: "/program#tahfidz", desc: "Hafalan intensif dengan metode mutqin" },
      { label: "Madrasah Diniyah & Kitab Kuning", href: "/program#diniyah", desc: "Kajian fiqih, aqidah, nahwu shorof" },
      { label: "SMP & SMA Boarding School", href: "/program#formal", desc: "Kurikulum nasional terintegrasi" },
      { label: "Ekstrakurikuler & Bahasa", href: "/program#ekskul", desc: "Arab, Inggris, Pramuka, Kaligrafi" },
    ]
  },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "PPDB Online", href: "/ppdb" },
  { label: "Berita & Kegiatan", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

export const PROGRAMS = [
  {
    id: "tahfidz",
    title: "Tahfidzul Qur'an 30 Juz",
    tagline: "Metode Talaqqi, Ziyadah & Muraja'ah Harian",
    desc: "Program unggulan mencetak santri hafidz-hafidzah berjiwa Qur'ani dengan tajwid makharijul huruf yang fasih, bimbingan ustadz mutqin, serta sertifikasi syahadah resmi.",
    icon: "BookOpen",
    highlights: ["Target 30 Juz bersanad", "Muraja'ah teratur 5 waktu", "Karantina Qur'an berkala", "Halaqah intensif maks. 12 santri"]
  },
  {
    id: "diniyah",
    title: "Madrasah Diniyah & Kitab Kuning",
    tagline: "Turats Keilmuan Ulama Ahlussunnah",
    desc: "Pembelajaran mendalam kitab-kitab klasik berbahasa gundul, meliputi ilmu Nahwu, Shorof, Fiqih (Safinah, Taqrib), Aqidah, Tarikh, dan Hadits (Arba'in Nawawi).",
    icon: "Scroll",
    highlights: ["Metode bandongan & sorogan", "Penguasaan dasar bahasa Arab", "Pembentukan akhlakul karimah", "Ujian diniyah berjenjang"]
  },
  {
    id: "formal",
    title: "SMP & SMA Islam Boarding",
    tagline: "Sinergi Kurikulum Nasional & Pesantren",
    desc: "Pendidikan formal terakreditasi yang mengintegrasikan sains modern, literasi numerik, kepemimpinan, dan nilai-nilai keislaman untuk lulusan berdaya saing global.",
    icon: "GraduationCap",
    highlights: ["Ijazah resmi diakui negara", "Guru profesional & kompeten", "Laboratorium komputer & sains", "Persiapan masuk PTN & Universitas Timur Tengah"]
  },
  {
    id: "ekskul",
    title: "Bilingual & Pengembangan Bakat",
    tagline: "Bahasa Internasional & Soft Skills",
    desc: "Membekali santri kemampuan komunikasi aktif bahasa Arab dan Inggris sehari-hari, serta ekstrakurikuler kepanduan (Pramuka), seni Kaligrafi Islam, dan bela diri.",
    icon: "Languages",
    highlights: ["Yaumul Lughah (Hari Wajib Berbahasa)", "Klub Kaligrafi & Tilawah", "Pramuka Gugus Depan Pesantren", "Pelatihan Public Speaking & Khitobah"]
  }
];

export const FACILITIES = [
  {
    name: "Masjid Jami' Al-Mursyid",
    category: "Ibadah & Halaqah",
    desc: "Pusat spiritual santri untuk salat berjamaah 5 waktu, kajian diniyah, wirid, dan halaqah tahfidz yang sejuk dan luas.",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Asrama Santri Putra & Putri Terpisah",
    category: "Tempat Tinggal",
    desc: "Gedung asrama bersih, nyaman, dengan sirkulasi udara pegunungan Tanggamus yang segar, dilengkapi ranjang tingkat dan lemari mandiri.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ruang Kelas & Laboratorium",
    category: "Pendidikan",
    desc: "Ruang belajar representatif berfasilitas modern untuk pembelajaran formal, sains, dan literasi teknologi.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Dapur & Ruang Makan Higienis",
    category: "Nutrisi & Konsumsi",
    desc: "Penyediaan menu makanan santri 3 kali sehari yang terjamin gizi seimbang, halal, dan disiapkan dengan standar kebersihan tinggi.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Lapangan Olahraga & Area Terbuka",
    category: "Kebugaran & Bakat",
    desc: "Fasilitas olahraga futsal, bulu tangkis, voli, dan area apel upacara berlatar pemandangan alam Way Lalaan yang asri.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Perpustakaan Islam & Bacaan Umum",
    category: "Literasi",
    desc: "Koleksi ratusan kitab turats, terjemahan tafsir, buku penunjang kurikulum nasional, ensiklopedia, dan karya sastra santri.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
  }
];

export const NEWS_DATA = [
  {
    id: "wisuda-tahfidz-2026",
    title: "Wisuda Tahfidz Qur'an & Syahadah Al-Mursyid Tahun Ajaran Terbaru",
    date: "25 Oktober 2026",
    category: "Prestasi Santri",
    summary: "Alhamdulillah puluhan santri telah menyelesaikan setoran hafalan 30 Juz dan juz pilihan dalam prosesi wisuda yang dihadiri wali santri dan pimpinan.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kajian-akbar-tanggamus",
    title: "Kajian Akbar & Silaturahmi Wali Santri Bersama Majelis Masyaikh",
    date: "14 Oktober 2026",
    category: "Agenda Pondok",
    summary: "Mempererat sinergi antara orang tua dan dewan asatidz dalam menumbuhkan generasi berakhlak mulia serta mandiri di era digital.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "penerimaan-santri-baru-2027",
    title: "PPDB Online Resmi Dibuka: Kuota Terbatas untuk Angkatan Baru",
    date: "01 Oktober 2026",
    category: "Informasi PPDB",
    summary: "Pendaftaran santri baru jalur reguler dan beasiswa prestasi tahfidz kini dapat diakses secara online melalui portal resmi website pondok.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
  }
];

export const PPDB_FEES = [
  { item: "Infaq Pengembangan Fasilitas & Sarpras", amount: "Rp 3.500.000", note: "Dibayar sekali saat masuk" },
  { item: "Seragam Lengkap (3 Setel + Almamater)", amount: "Rp 950.000", note: "Termasuk atribut pondok" },
  { item: "Buku Paket & Modul Diniyah 1 Tahun", amount: "Rp 650.000", note: "Kitab & modul kurikulum" },
  { item: "Perlengkapan Asrama (Kasur, Sprei, Loker)", amount: "Rp 850.000", note: "Fasilitas pribadi santri" },
  { item: "Syahriah / SPP Bulanan (Makan 3x + Asrama)", amount: "Rp 950.000", note: "Per bulan (All-in)" },
];
