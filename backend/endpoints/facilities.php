<?php
/**
 * Facilities API: Publik (Cache) + CRUD Admin
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET: Ambil fasilitas
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT id, name, category, description, image_url as imageUrl, sort_order FROM facilities ORDER BY sort_order ASC, id ASC");
    $facilities = $stmt->fetchAll();

    jsonResponse(true, $facilities, 'Fasilitas berhasil dimuat.', 200, [
        'Cache-Control' => 'public, max-age=60, stale-while-revalidate=300'
    ]);
}

// POST: Tambah Fasilitas Baru
if ($method === 'POST') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $input = getJsonInput();
    $name = trim($input['name'] ?? '');
    $category = trim($input['category'] ?? 'Umum');
    $description = trim($input['description'] ?? '');
    $imageUrl = trim($input['imageUrl'] ?? $input['image_url'] ?? '');
    $sortOrder = (int)($input['sort_order'] ?? 0);

    if (empty($name)) {
        jsonResponse(false, null, 'Nama fasilitas wajib diisi.', 400);
    }

    $stmt = $pdo->prepare("INSERT INTO facilities (name, category, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $category, $description, $imageUrl, $sortOrder]);
    $newId = $pdo->lastInsertId();

    recordRealtimeEvent($pdo, 'FACILITY_ADDED', 'facilities', (string)$newId, ['name' => $name]);

    jsonResponse(true, ['id' => $newId], 'Fasilitas berhasil ditambahkan.', 201);
}

// DELETE: Hapus Fasilitas
if ($method === 'DELETE') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(false, null, 'ID fasilitas wajib disertakan.', 400);
    }

    $stmt = $pdo->prepare("DELETE FROM facilities WHERE id = ?");
    $stmt->execute([$id]);

    recordRealtimeEvent($pdo, 'FACILITY_DELETED', 'facilities', (string)$id);

    jsonResponse(true, ['id' => $id], 'Fasilitas berhasil dihapus.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
