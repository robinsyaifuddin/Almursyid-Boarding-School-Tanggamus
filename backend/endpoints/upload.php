<?php
/**
 * Upload Endpoint (Hostinger Storage Link & Direct Files)
 * Menyimpan file/gambar ke folder /uploads/ dan mengembalikan URL publik permanen
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../middleware/auth.php';

// Pastikan hanya admin yang bisa upload
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
}

// 1. Tentukan direktori penyimpanan fisik (Root/uploads)
$uploadDir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// 2. Deteksi base URL otomatis di Hostinger
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$publicUrlPrefix = "{$protocol}{$host}/uploads/";

// Tipe upload: Multipart Form File ATAU Base64 JSON
$uploadedUrls = [];

if (!empty($_FILES['file'])) {
    $file = $_FILES['file'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        jsonResponse(false, null, 'Terjadi kesalahan saat mengunggah file.', 400);
    }

    // Validasi ekstensi & mime
    $allowed = ['jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp', 'pdf' => 'application/pdf', 'svg' => 'image/svg+xml'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!array_key_exists($ext, $allowed)) {
        jsonResponse(false, null, 'Format file tidak didukung (Gunakan JPG, PNG, WEBP, PDF, SVG).', 400);
    }

    // Maksimal 5MB
    if ($file['size'] > 5 * 1024 * 1024) {
        jsonResponse(false, null, 'Ukuran file terlalu besar. Maksimal 5 MB.', 400);
    }

    $fileName = 'abs_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $finalUrl = $publicUrlPrefix . $fileName;
        jsonResponse(true, [
            'url' => $finalUrl,
            'fileName' => $fileName,
            'size' => $file['size']
        ], 'File berhasil diunggah.');
    } else {
        jsonResponse(false, null, 'Gagal menyimpan file ke penyimpanan server.', 500);
    }
}

// Alternatif: Menerima Base64 string dari frontend
$input = getJsonInput();
if (!empty($input['base64'])) {
    $data = $input['base64'];
    if (preg_match('/^data:(image\/(\w+)|application\/pdf);base64,/', $data, $type)) {
        $data = substr($data, strpos($data, ',') + 1);
        $ext = strtolower($type[2] ?? 'jpg');
        if ($ext === 'jpeg') $ext = 'jpg';
        
        $decoded = base64_decode($data);
        if ($decoded === false) {
            jsonResponse(false, null, 'Data gambar base64 tidak valid.', 400);
        }

        $fileName = 'abs_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
        $targetPath = $uploadDir . $fileName;

        if (file_put_contents($targetPath, $decoded) !== false) {
            $finalUrl = $publicUrlPrefix . $fileName;
            jsonResponse(true, [
                'url' => $finalUrl,
                'fileName' => $fileName
            ], 'Gambar berhasil disimpan.');
        } else {
            jsonResponse(false, null, 'Gagal menulis file ke disk server.', 500);
        }
    }
}

jsonResponse(false, null, 'Tidak ada file atau data gambar yang dikirim.', 400);
