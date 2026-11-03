<?php
/**
 * Quick Seed & Setup Database
 * Mengeksekusi pembuatan tabel dan menyematkan akun admin jika belum ada.
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();

// Baca schema.sql
$schemaFile = __DIR__ . '/../schema.sql';
if (file_exists($schemaFile)) {
    $sql = file_get_contents($schemaFile);
    $pdo->exec($sql);
}

// Pastikan admin default terbuat (admin / admin123)
$adminPass = password_hash('admin123', PASSWORD_BCRYPT);
$checkAdmin = $pdo->prepare("SELECT id FROM users WHERE username = 'admin' LIMIT 1");
$checkAdmin->execute();
if (!$checkAdmin->fetch()) {
    $insertAdmin = $pdo->prepare("INSERT INTO users (username, password_hash, name, role) VALUES ('admin', ?, 'Administrator Pesantren', 'admin')");
    $insertAdmin->execute([$adminPass]);
} else {
    // Perbarui password hash admin agar dipastikan cocok dengan admin123
    $updateAdmin = $pdo->prepare("UPDATE users SET password_hash = ? WHERE username = 'admin'");
    $updateAdmin->execute([$adminPass]);
}

// Seed default Programs jika masih kosong
$checkProg = $pdo->query("SELECT COUNT(*) as c FROM programs")->fetch()['c'] ?? 0;
if ((int)$checkProg === 0) {
    $initialPrograms = [
        [
            'id' => 'tahfidz',
            'title' => "Tahfidzul Qur'an 30 Juz",
            'tagline' => 'Metode Talaqqi, Ziyadah & Muraja\'ah Harian',
            'desc' => "Program unggulan mencetak santri hafidz-hafidzah berjiwa Qur'ani dengan tajwid makharijul huruf yang fasih, bimbingan ustadz mutqin, serta sertifikasi syahadah resmi.",
            'icon' => 'BookOpen',
            'highlights' => json_encode(["Target 30 Juz bersanad", "Muraja'ah teratur 5 waktu", "Karantina Qur'an berkala", "Halaqah intensif maks. 12 santri"], JSON_UNESCAPED_UNICODE),
            'sort_order' => 1
        ],
        [
            'id' => 'diniyah',
            'title' => 'Madrasah Diniyah & Kitab Kuning',
            'tagline' => 'Turats Keilmuan Ulama Ahlussunnah',
            'desc' => 'Pembelajaran mendalam kitab-kitab klasik berbahasa gundul, meliputi ilmu Nahwu, Shorof, Fiqih (Safinah, Taqrib), Aqidah, Tarikh, dan Hadits (Arba\'in Nawawi).',
            'icon' => 'Scroll',
            'highlights' => json_encode(["Metode bandongan & sorogan", "Penguasaan dasar bahasa Arab", "Pembentukan akhlakul karimah", "Ujian diniyah berjenjang"], JSON_UNESCAPED_UNICODE),
            'sort_order' => 2
        ],
        [
            'id' => 'formal',
            'title' => 'SMP & SMA Islam Boarding',
            'tagline' => 'Sinergi Kurikulum Nasional & Pesantren',
            'desc' => 'Pendidikan formal terakreditasi yang mengintegrasikan sains modern, literasi numerik, kepemimpinan, dan nilai-nilai keislaman untuk lulusan berdaya saing global.',
            'icon' => 'GraduationCap',
            'highlights' => json_encode(["Ijazah resmi diakui negara", "Guru profesional & kompeten", "Laboratorium komputer & sains", "Persiapan masuk PTN & Universitas Timur Tengah"], JSON_UNESCAPED_UNICODE),
            'sort_order' => 3
        ],
        [
            'id' => 'ekskul',
            'title' => 'Bilingual & Pengembangan Bakat',
            'tagline' => 'Bahasa Internasional & Soft Skills',
            'desc' => 'Membekali santri kemampuan komunikasi aktif bahasa Arab dan Inggris sehari-hari, serta ekstrakurikuler kepanduan (Pramuka), seni Kaligrafi Islam, dan bela diri.',
            'icon' => 'Languages',
            'highlights' => json_encode(["Yaumul Lughah (Hari Wajib Berbahasa)", "Klub Kaligrafi & Tilawah", "Pramuka Gugus Depan Pesantren", "Pelatihan Public Speaking & Khitobah"], JSON_UNESCAPED_UNICODE),
            'sort_order' => 4
        ]
    ];
    $stmtProg = $pdo->prepare("INSERT INTO programs (id, title, tagline, description, icon, highlights, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
    foreach ($initialPrograms as $prog) {
        $stmtProg->execute([$prog['id'], $prog['title'], $prog['tagline'], $prog['desc'], $prog['icon'], $prog['highlights'], $prog['sort_order']]);
    }
}

// Seed default Facilities jika masih kosong
$checkFac = $pdo->query("SELECT COUNT(*) as c FROM facilities")->fetch()['c'] ?? 0;
if ((int)$checkFac === 0) {
    $initialFacilities = [
        [
            'name' => "Masjid Jami' Al-Mursyid",
            'category' => 'Ibadah & Halaqah',
            'desc' => 'Pusat spiritual santri untuk salat berjamaah 5 waktu, kajian diniyah, wirid, dan halaqah tahfidz yang sejuk dan luas.',
            'image_url' => 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80',
            'sort_order' => 1
        ],
        [
            'name' => 'Asrama Santri Putra & Putri Terpisah',
            'category' => 'Tempat Tinggal',
            'desc' => 'Gedung asrama bersih, nyaman, dengan sirkulasi udara pegunungan Tanggamus yang segar, dilengkapi ranjang tingkat dan lemari mandiri.',
            'image_url' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
            'sort_order' => 2
        ],
        [
            'name' => 'Ruang Kelas & Madrasah Diniyah',
            'category' => 'Pendidikan',
            'desc' => 'Ruang belajar representatif berfasilitas modern untuk pembelajaran formal, kajian kitab kuning, sains, dan literasi teknologi.',
            'image_url' => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
            'sort_order' => 3
        ],
        [
            'name' => 'Dapur & Ruang Makan Higienis',
            'category' => 'Nutrisi & Konsumsi',
            'desc' => 'Penyediaan menu makanan santri 3 kali sehari yang terjamin gizi seimbang, halal, dan disiapkan dengan standar kebersihan tinggi.',
            'image_url' => 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
            'sort_order' => 4
        ],
        [
            'name' => 'Lapangan Olahraga & Area Terbuka',
            'category' => 'Kebugaran & Bakat',
            'desc' => 'Fasilitas olahraga futsal, bulu tangkis, voli, panahan sunnah, dan area apel upacara berlatar pemandangan alam Way Lalaan yang asri.',
            'image_url' => 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
            'sort_order' => 5
        ],
        [
            'name' => 'Perpustakaan Islam & Maktabah Turats',
            'category' => 'Literasi',
            'desc' => 'Koleksi ratusan kitab turats, terjemahan tafsir Al-Qur\'an, buku penunjang kurikulum nasional, ensiklopedia, dan karya sastra santri.',
            'image_url' => 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=1000&q=80',
            'sort_order' => 6
        ]
    ];
    $stmtFac = $pdo->prepare("INSERT INTO facilities (name, category, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?)");
    foreach ($initialFacilities as $fac) {
        $stmtFac->execute([$fac['name'], $fac['category'], $fac['desc'], $fac['image_url'], $fac['sort_order']]);
    }
}

jsonResponse(true, [
    'status' => 'ready',
    'database' => 'connected',
    'admin_username' => 'admin',
    'admin_password' => 'admin123'
], 'Inisialisasi Database dan Akun Admin Berhasil.');
