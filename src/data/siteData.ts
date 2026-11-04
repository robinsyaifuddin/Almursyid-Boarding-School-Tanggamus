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
      { 
        name: "Pungut Sarifuddin Ash-Shajili", 
        role: "Ketua Pengurus", 
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80",
        highlight: true 
      },
      { 
        name: "Astoya Saimulani", 
        role: "Sekretaris",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
      },
      { 
        name: "Muhammad Al Ashimi", 
        role: "Bendahara & Hubungan Umat",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
      },
      { 
        name: "Agus Aftah", 
        role: "Divisi Pendidikan & Kurikulum",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80"
      },
      { 
        name: "Fia Aulia", 
        role: "Kepengurusan Putri & Asrama",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80"
      },
      { 
        name: "Novi Yani", 
        role: "Administrasi & Keuangan",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80"
      },
    ]
  },
  contacts: {
    phone: "+62 838-4847-8150",
    whatsapp: "+62 838-4847-8150",
    email: "info@almursyidtanggamus.sch.id",
    ppdbWa: "https://wa.me/6283848478150?text=Halo%20Admin%20Pondok%20Pesantren%20Al-Mursyid,%20saya%20ingin%20konsultasi%20dan%20informasi%20pendaftaran%20santri%20baru.",
    ppdbFormUrl: "https://forms.gle/almursyid-ppdb", // Ganti dengan URL Google Form resmi
    mapsUrl: "https://maps.app.goo.gl/3FVjebPp1YaSYvom7",
    instagram: "https://www.instagram.com/ponpes_almursyid",
    instagramHandle: "@ponpes_almursyid",
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
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Program", href: "/program" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "PPDB Online", href: "/ppdb" },
  { label: "Berita", href: "/berita" },
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
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Asrama Santri Putra & Putri Terpisah",
    category: "Tempat Tinggal",
    desc: "Gedung asrama bersih, nyaman, dengan sirkulasi udara pegunungan Tanggamus yang segar, dilengkapi ranjang tingkat dan lemari mandiri.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Ruang Kelas & Madrasah Diniyah",
    category: "Pendidikan",
    desc: "Ruang belajar representatif berfasilitas modern untuk pembelajaran formal, kajian kitab kuning, sains, dan literasi teknologi.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Dapur & Ruang Makan Higienis",
    category: "Nutrisi & Konsumsi",
    desc: "Penyediaan menu makanan santri 3 kali sehari yang terjamin gizi seimbang, halal, dan disiapkan dengan standar kebersihan tinggi.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Lapangan Olahraga & Area Terbuka",
    category: "Kebugaran & Bakat",
    desc: "Fasilitas olahraga futsal, bulu tangkis, voli, panahan sunnah, dan area apel upacara berlatar pemandangan alam Way Lalaan yang asri.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Perpustakaan Islam & Maktabah Turats",
    category: "Literasi",
    desc: "Koleksi ratusan kitab turats, terjemahan tafsir Al-Qur'an, buku penunjang kurikulum nasional, ensiklopedia, dan karya sastra santri.",
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=1000&q=80"
  }
];

export const NEWS_DATA = [
  {
    id: "wisuda-tahfidz-2026",
    title: "Wisuda Akbar Tahfidz Qur'an 30 Juz & Penganugerahan Sanad Angkatan VI",
    date: "28 Oktober 2026",
    timeAgo: "1 jam yang lalu",
    category: "Prestasi Santri",
    subCategory: "Tahfidz & Sanad",
    summary: "Sebanyak 42 santriwan dan santriwati resmi diwisuda dan menerima syahadah sanad muttashil dalam prosesi khidmat yang dihadiri ulama dan wali santri.",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true
  },
  {
    id: "kajian-akbar-tanggamus",
    title: "Kajian Akbar Bulanan & Muhasabah Wali Santri Bersama Majelis Masyaikh",
    date: "25 Oktober 2026",
    timeAgo: "3 jam yang lalu",
    category: "Agenda Pondok",
    summary: "Mempererat sinergi antara orang tua dan dewan asatidz dalam menumbuhkan generasi berakhlak mulia serta mandiri di era digital.",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "penerimaan-santri-baru-2027",
    title: "PPDB Online Gelombang 1 Resmi Dibuka: Kuota Terbatas untuk Angkatan 2027/2028",
    date: "20 Oktober 2026",
    timeAgo: "5 jam yang lalu",
    category: "Informasi PPDB",
    summary: "Pendaftaran santri baru jalur reguler dan beasiswa prestasi tahfidz kini dapat diakses secara online melalui portal resmi website pondok.",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "olimpiade-sains-santri",
    title: "Santri Al-Mursyid Raih Medali Emas Olimpiade Sains & Matematika Nasional",
    date: "18 Oktober 2026",
    timeAgo: "Kemarin",
    category: "Prestasi Akademik",
    summary: "Kombinasi sains modern dan nilai pesantren membuktikan santri mampu bersaing unggul di kancah olimpiade bergengsi tingkat nasional.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "panen-hidroponik-santri",
    title: "Program Kemandirian Santri: Panen Sayur Hidroponik & Budidaya Ikan Air Tawar",
    date: "15 Oktober 2026",
    timeAgo: "2 hari lalu",
    category: "Kewirausahaan",
    summary: "Santri memanen ratusan kilogram sayuran hijau segar dari kebun hidroponik pesantren untuk kebutuhan konsumsi mandiri.",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lomba-pidato-tiga-bahasa",
    title: "Gebyar Muhadhoroh: Festival Pidato Bahasa Arab, Inggris, dan Indonesia",
    date: "12 Oktober 2026",
    timeAgo: "3 hari lalu",
    category: "Bahasa & Literasi",
    summary: "Ajang unjuk kemampuan public speaking santri dalam tiga bahasa dengan gaya orasi meyakinkan dan wawasan global.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pelatihan-robotik-santri",
    title: "Workshop Robotika & Coding Dasar untuk Santri Tingkat Menengah",
    date: "10 Oktober 2026",
    timeAgo: "4 hari lalu",
    category: "Teknologi",
    summary: "Pengenalan logika pemrograman mikrokontroler dan otomasi teknologi terapan sebagai bekal literasi digital generasi santri.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
  }
];

// Data untuk ticker strip bagian atas
export const TICKER_NEWS = [
  {
    title: "Juara 1 Musabaqah Hifdzil Qur'an Tingkat Provinsi Lampung",
    category: "Tahfidz",
    timeAgo: "1 jam lalu",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=200&q=80"
  },
  {
    title: "Santri Kirim Delegasi Debat Bahasa Arab Nasional",
    category: "Bahasa",
    timeAgo: "2 jam lalu",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=200&q=80"
  },
  {
    title: "Kunjungan Studi Banding Forum Pesantren Se-Sumbagsel",
    category: "Kelembagaan",
    timeAgo: "3 jam lalu",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=200&q=80"
  },
  {
    title: "Peresmian Laboratorium Komputer & Studio Multimedia Baru",
    category: "Sarpras",
    timeAgo: "4 jam lalu",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=200&q=80"
  },
  {
    title: "Pemberian Beasiswa Santri Berprestasi Bidang Sains & Riset",
    category: "Beasiswa",
    timeAgo: "5 jam lalu",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=200&q=80"
  },
  {
    title: "Klinik Santri Resmikan Layanan Konseling & Cek Medis Berkala",
    category: "Kesehatan",
    timeAgo: "6 jam lalu",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80"
  }
];

// Data untuk Postingan Terbaru (Sisi Kanan Hero)
export const LATEST_POSTS = [
  {
    title: "Kunjungan Studi Banding Forum Pengasuh Pesantren Se-Sumbagsel",
    category: "Kelembagaan",
    timeAgo: "25 mnt lalu",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Peresmian Laboratorium Komputer & Studio Multimedia Baru",
    category: "Fasilitas",
    timeAgo: "1 jam lalu",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Santri Al-Mursyid Raih Medali Emas Olimpiade Sains Nasional",
    category: "Prestasi",
    timeAgo: "3 jam lalu",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Program Kemandirian: Panen Sayur Hidroponik Perdana",
    category: "Kemandirian",
    timeAgo: "5 jam lalu",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Gebyar Muhadhoroh: Festival Orasi Tiga Bahasa Santriwan",
    category: "Bahasa",
    timeAgo: "6 jam lalu",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=300&q=80"
  }
];

// Data Don't Miss (Bento Grid)
export const DONT_MISS_NEWS = {
  tallLead: {
    title: "Ekspedisi Santri Pecinta Alam & Tadabbur Alam Air Terjun Way Lalaan Tanggamus",
    category: "Ekstrakurikuler",
    timeAgo: "2 jam lalu",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  gridItems: [
    {
      title: "Uji Publik Hafalan Al-Qur'an Santri Menjelang Evaluasi Tengah Semester",
      category: "Akademik",
      timeAgo: "3 jam lalu",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Pelatihan Kaligrafi Kontemporer & Pameran Karya Seni Islami",
      category: "Kesenian",
      timeAgo: "4 jam lalu",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Latihan Gabungan Pramuka Santri Gugus Depan Al-Mursyid",
      category: "Kepanduan",
      timeAgo: "5 jam lalu",
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Eksplorasi Lab Komputer: Santri Ciptakan Website Karya Majalah Dinding Digital",
      category: "Digital",
      timeAgo: "6 jam lalu",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

// Data Top Stories (List bernomor 1-5 di sisi kanan)
export const TOP_STORIES = [
  {
    rank: 1,
    title: "Alumni Al-Mursyid Tembus Universitas Al-Azhar Kairo Jalur Beasiswa Penuh",
    timeAgo: "1 jam lalu",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=200&q=80"
  },
  {
    rank: 2,
    title: "Profil Ustadz Pembina: Membangun Karakter Qur'ani di Era Distraksi Digital",
    timeAgo: "2 jam lalu",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=200&q=80"
  },
  {
    rank: 3,
    title: "Kunjungan Silaturahmi Tokoh Masyarakat & Ulama Tanggamus",
    timeAgo: "3 jam lalu",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=200&q=80"
  },
  {
    title: "Tips Mendampingi Anak Masuk Pondok Pesantren Bagi Orang Tua Baru",
    rank: 4,
    timeAgo: "4 jam lalu",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=200&q=80"
  },
  {
    rank: 5,
    title: "Juara Umum POSPEDA Tingkat Kabupaten: Dominasi Cabor Panahan & Silat",
    timeAgo: "5 jam lalu",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=200&q=80"
  }
];

// Data Dokumentasi Video & Liputan (Bagian Bawah)
export const VIDEO_GALLERY = {
  main: {
    title: "Dokumentasi Khutbah Ikhtitam & Pelepasan Santri Angkatan Terbaru",
    status: "Video Utama",
    views: "1.2k tayangan",
    duration: "18:45",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80"
  },
  items: [
    {
      title: "Lantunan Murottal Santri Al-Mursyid Surat Ar-Rahman di Alam Terbuka",
      duration: "04:32",
      timeAgo: "2 jam lalu",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Tur Fasilitas Asrama & Lingkungan Belajar Al-Mursyid Boarding School",
      duration: "08:15",
      timeAgo: "4 jam lalu",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Highlights Kegiatan Ekstrakurikuler Memanah & Beladiri Tapak Suci",
      duration: "05:50",
      timeAgo: "6 jam lalu",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=400&q=80"
    }
  ]
};

export const PPDB_FEES = [
  { item: "Infaq Pengembangan Fasilitas & Sarpras", amount: "Rp 3.500.000", note: "Dibayar sekali saat masuk" },
  { item: "Seragam Lengkap (3 Setel + Almamater)", amount: "Rp 950.000", note: "Termasuk atribut pondok" },
  { item: "Buku Paket & Modul Diniyah 1 Tahun", amount: "Rp 650.000", note: "Kitab & modul kurikulum" },
  { item: "Perlengkapan Asrama (Kasur, Sprei, Loker)", amount: "Rp 850.000", note: "Fasilitas pribadi santri" },
  { item: "Syahriah / SPP Bulanan (Makan 3x + Asrama)", amount: "Rp 950.000", note: "Per bulan (All-in)" },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: "Tahfidz & Ibadah" | "Akademik & Formal" | "Ekstrakurikuler" | "Kemandirian & Sosial" | "Peringatan Hari Besar";
  date: string;
  location: string;
  image: string;
  desc: string;
}

export const GALLERY_CATEGORIES = [
  "Semua",
  "Tahfidz & Ibadah",
  "Akademik & Formal",
  "Ekstrakurikuler",
  "Kemandirian & Sosial",
  "Peringatan Hari Besar",
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Halaqah Tahfidzul Qur'an & Talaqqi Ba'da Subuh",
    category: "Tahfidz & Ibadah",
    date: "28 Oktober 2026",
    location: "Masjid Jami' Al-Mursyid",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80",
    desc: "Suasana syahdu santri menyetorkan ziyadah hafalan Al-Qur'an dan muraja'ah bersama asatidz pengampu tahfidz."
  },
  {
    id: "gal-2",
    title: "Praktikum Sains & Eksperimen Biologi Terpadu",
    category: "Akademik & Formal",
    date: "24 Oktober 2026",
    location: "Laboratorium Sains SMP-SMA Islam",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    desc: "Santri mempraktikkan pengamatan mikroskopis dan formulasi kimia ramah lingkungan dalam pembelajaran sains terpadu."
  },
  {
    id: "gal-3",
    title: "Tadabbur Alam & Survival Camp di Alam Way Lalaan",
    category: "Ekstrakurikuler",
    date: "19 Oktober 2026",
    location: "Kawasan Alam Way Lalaan, Tanggamus",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    desc: "Eksplorasi alam santri pecinta alam mengasah ketahanan fisik, kerja sama regu, dan tadabbur keagungan ciptaan Allah."
  },
  {
    id: "gal-4",
    title: "Kemandirian Santri: Panen Kebun Hidroponik & Ikan Air Tawar",
    category: "Kemandirian & Sosial",
    date: "15 Oktober 2026",
    location: "Kebun Edukasi Agropreneur Santri",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=80",
    desc: "Edukasi budidaya sayuran hijau dan sistem perikanan mandiri guna membekali santri jiwa wirausaha dan ketahanan pangan."
  },
  {
    id: "gal-5",
    title: "Latihan Rutin Seni Bela Diri Tapak Suci & Panahan Tradisional",
    category: "Ekstrakurikuler",
    date: "12 Oktober 2026",
    location: "Lapangan Serbaguna Kampus Al-Mursyid",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
    desc: "Melatih kebugaran, kedisiplinan gerak, serta sunnah berolahraga memanah bagi para santriwan dan santriwati."
  },
  {
    id: "gal-6",
    title: "Peringatan Hari Santri Nasional & Apel Akbar Keikhlasan",
    category: "Peringatan Hari Besar",
    date: "22 Oktober 2026",
    location: "Plaza Utama Al-Mursyid",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80",
    desc: "Semarak upacara Hari Santri Nasional bersama segenap masyaikh, dewan guru, dan wali santri dalam balutan ukhuwah."
  },
  {
    id: "gal-7",
    title: "Sorogan Kitab Kuning & Muwajjahah Diniyah Sore Hari",
    category: "Tahfidz & Ibadah",
    date: "08 Oktober 2026",
    location: "Serambi Madrasah Diniyah",
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=1200&q=80",
    desc: "Pendalaman kaidah nahwu, sharaf, dan fiqih klasik dengan metode sorogan talaqqi langsung kepada para asatidz."
  },
  {
    id: "gal-8",
    title: "Pelatihan Kaligrafi Kontemporer & Pameran Seni Khath",
    category: "Ekstrakurikuler",
    date: "03 Oktober 2026",
    location: "Studio Seni & Kaligrafi Islam",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    desc: "Mengasah kepekaan estetika dan kecintaan terhadap seni tulisan mushaf Al-Qur'an gaya Tsuluts, Naskhi, dan Diwani."
  },
  {
    id: "gal-9",
    title: "Muhadhoroh Tiga Bahasa (Arab, Inggris, dan Indonesia)",
    category: "Akademik & Formal",
    date: "29 September 2026",
    location: "Aula Pertemuan Utama",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    desc: "Latihan rutin orasi ilmiah santri di hadapan khalayak umum guna membentuk mental kepemimpinan dan public speaking internasional."
  },
  {
    id: "gal-10",
    title: "Literasi Digital & Coding Lab Santri Masa Depan",
    category: "Akademik & Formal",
    date: "22 September 2026",
    location: "Laboratorium Komputer & Multimedia",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    desc: "Pengenalan teknologi digital, dasar algoritma pemrograman, dan publikasi konten dakwah santri berbasis web."
  },
  {
    id: "gal-11",
    title: "Bakti Sosial Santri Peduli Warga Kampung Sekitar Way Lalaan",
    category: "Kemandirian & Sosial",
    date: "17 September 2026",
    location: "Desa Kampung Baru, Kota Agung Timur",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    desc: "Penyaluran paket sembako, gotong royong kebersihan lingkungan, serta edukasi kesehatan bersama santri dan pemuda desa."
  },
  {
    id: "gal-12",
    title: "Peringatan Maulid Nabi Muhammad SAW & Gema Sholawat",
    category: "Peringatan Hari Besar",
    date: "12 September 2026",
    location: "Masjid Jami' Al-Mursyid",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80",
    desc: "Malam mahabbah melantunkan qasidah Burdah dan Simthuddurar dalam suasana khusyuk berbalut cahaya pendar lampu asrama."
  }
];
