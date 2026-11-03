<?php
/**
 * Settings API: Simpan dan baca pengaturan situs (Site Info, PPDB Settings, dll)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// GET: Ambil setting berdasarkan key atau semua setting
if ($method === 'GET') {
    $key = $_GET['key'] ?? null;

    if ($key) {
        $stmt = $pdo->prepare("SELECT setting_value FROM site_settings WHERE setting_key = ? LIMIT 1");
        $stmt->execute([$key]);
        $row = $stmt->fetch();
        $val = $row ? json_decode($row['setting_value'], true) : null;
        jsonResponse(true, $val, 'Setting berhasil dimuat.');
    }

    $stmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
    $rows = $stmt->fetchAll();
    $result = [];
    foreach ($rows as $r) {
        $result[$r['setting_key']] = json_decode($r['setting_value'], true);
    }

    jsonResponse(true, $result, 'Semua setting berhasil dimuat.');
}

// POST: Simpan Setting (Admin Only)
if ($method === 'POST') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $input = getJsonInput();
    $key = trim($input['key'] ?? '');
    $value = $input['value'] ?? null;

    if (empty($key)) {
        jsonResponse(false, null, 'Setting key wajib disertakan.', 400);
    }

    $jsonVal = json_encode($value, JSON_UNESCAPED_UNICODE);
    $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
    $stmt->execute([$key, $jsonVal]);

    recordRealtimeEvent($pdo, 'SETTINGS_UPDATED', 'site_settings', $key);

    jsonResponse(true, ['key' => $key], 'Pengaturan berhasil disimpan.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
