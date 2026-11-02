# Almursyid Islamic Boarding School - Tanggamus Lampung

Portal Resmi Website Pondok Pesantren Al-Mursyid Tanggamus Lampung.

- **Domain Utama**: `almursyidtanggamus.sch.id`
- **Domain Staging (Hostinger Preview)**: `dimgrey-llama-869405.hostingersite.com`
- **Repository**: [Almursyid-Boarding-School-Tanggamus](https://github.com/robinsyaifuddin/Almursyid-Boarding-School-Tanggamus.git)

---

## 🏛️ Arsitektur Hosting (Hostinger)

Arsitektur penempatan file di Hostinger dirancang aman dan terstruktur:

```text
/home/uXXXXXXX/
├── public_html/              <-- FRONTEND (Hasil build 'dist': index.html, assets, .htaccess)
└── backend/                  <-- BACKEND (Sejajar public_html: Core API/Laravel/Node, aman dari akses publik langsung)
```

### Routing SPA (.htaccess di public_html)
File `.htaccess` disertakan pada folder build frontend agar route React Router tidak menghasilkan 404 saat direfresh:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 💻 Teknologi & Arsitektur Frontend
- **Frontend**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS v4 (Desain Modern Anti-Slop: Deep Forest Green `#03140e` & Warm Gold `#d4972c`)
- **Icons**: Lucide React
- **Routing**: React Router DOM v7 (Single Page Application dengan 7 menu lengkap)
- **Deployment**: Hostinger `public_html` / Vercel ready

---

## 📜 Legalitas Resmi Terintegrasi
- **SK Kemenkumham RI**: `AHU-0014511.AH.01.04.Tahun 2020` (28 Agustus 2020)
- **Piagam Terdaftar Pesantren**: Nomor `030299` - Ditjen Pendidikan Islam Kemenag RI
- **NSP (Nomor Statistik Pesantren)**: `510018060046` (01 Juli 2022)
- **Alamat**: Way Lalaan Kampung Baru, Desa Kampung Baru, Kec. Kota Agung Timur, Kab. Tanggamus, Provinsi Lampung.

---

## 🧭 Struktur Halaman
1. `/` : **Beranda** (Hero Slider, Floating 5-Feature Bar, Sambutan Pimpinan, Statistik Kemenag, Grid Program, Fasilitas, Banner PPDB, Warta Pesantren)
2. `/tentang-kami` : **Tentang Kami** (Visi-Misi, Dokumen Legalitas Kemenag & SK Kemenkumham, Struktur Kepengurusan Yayasan)
3. `/program` : **Program Pendidikan** (Tahfidzul Qur'an 30 Juz Bersanad, Madrasah Diniyah, Kitab Kuning, SMP & SMA Islam Terpadu, Bahasa Arab & Inggris)
4. `/fasilitas` : **Fasilitas** (Masjid Jami', Asrama Putra-Putri terpisah, Kelas Representatif, Ruang Makan Higienis, Lapangan Olahraga, Perpustakaan)
5. `/ppdb` : **PPDB Online** (Alur Pendaftaran 4 Tahap, Rincian Biaya Transparan, Brosur PDF, WhatsApp Panitia, Formulir Online)
6. `/berita` : **Berita & Kegiatan** (Dokumentasi wisuda tahfidz, kajian, dan agenda santri)
7. `/kontak` : **Kontak & Lokasi** (Alamat Way Lalaan Tanggamus, Google Maps interaktif, form pesan, jam operasional)

---

## 🚀 Panduan Pengembangan Lokal

```bash
# Install dependencies
npm install

# Jalankan server development
npm run dev

# Build untuk produksi (output folder: dist/)
npm run build
```
