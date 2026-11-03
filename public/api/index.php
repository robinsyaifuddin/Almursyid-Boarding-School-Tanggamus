<?php
/**
 * Entry point jembatan dari public_html/api/ ke folder ../backend/
 * Arsitektur Terisolasi Hostinger: backend/ sejajar dengan public_html/
 */

declare(strict_types=1);

// Lokasi folder backend yang berada 1 tingkat di atas public_html
$backendDir = dirname(__DIR__, 2) . '/backend';

// Jika fallback lokal (saat development di folder dist)
if (!is_dir($backendDir)) {
    $backendDir = __DIR__;
}

// Ambil path request, contoh: /api/news.php atau /api/endpoints/news.php
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$file = basename($uri);

// Cari file endpoint yang dituju
$targetFile = $backendDir . '/endpoints/' . $file;

if (file_exists($targetFile)) {
    require_once $targetFile;
    exit;
}

// 404 jika file endpoint tidak ada
http_response_code(404);
header('Content-Type: application/json');
echo json_encode([
    'success' => false,
    'message' => "Endpoint API '{$file}' tidak ditemukan di backend."
]);
exit;
