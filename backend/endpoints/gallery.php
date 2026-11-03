<?php
/**
 * Gallery API: Read Fast + Admin Add & Delete
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// GET: Galeri (Cached)
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT id, title, category, image_url as imageUrl FROM gallery ORDER BY id DESC");
    $items = $stmt->fetchAll();

    jsonResponse(true, $items, 'Galeri berhasil dimuat.', 200, [
        'Cache-Control' => 'public, max-age=60, stale-while-revalidate=300'
    ]);
}

// POST: Tambah atau Update Foto Galeri (Admin Only)
if ($method === 'POST') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $input = getJsonInput();
    $id       = !empty($input['id']) ? (int)$input['id'] : null;
    $title    = trim($input['title'] ?? '');
    $category = trim($input['category'] ?? 'Kegiatan');
    $imageUrl = trim($input['imageUrl'] ?? $input['image_url'] ?? $input['image'] ?? '');

    if (empty($title) || empty($imageUrl)) {
        jsonResponse(false, null, 'Judul dan URL Foto wajib diisi.', 400);
    }

    if ($id) {
        $stmt = $pdo->prepare("UPDATE gallery SET title = ?, category = ?, image_url = ? WHERE id = ?");
        $stmt->execute([$title, $category, $imageUrl, $id]);
        recordRealtimeEvent($pdo, 'GALLERY_ITEM_UPDATED', 'gallery', (string)$id, ['title' => $title]);
        jsonResponse(true, ['id' => $id], 'Item galeri berhasil diperbarui.', 200);
    } else {
        $stmt = $pdo->prepare("INSERT INTO gallery (title, category, image_url) VALUES (?, ?, ?)");
        $stmt->execute([$title, $category, $imageUrl]);

        $newId = $pdo->lastInsertId();
        recordRealtimeEvent($pdo, 'GALLERY_ITEM_ADDED', 'gallery', (string)$newId, ['title' => $title]);

        jsonResponse(true, ['id' => (int)$newId], 'Item galeri berhasil ditambahkan.', 201);
    }
}

// DELETE: Hapus Foto Galeri
if ($method === 'DELETE') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(false, null, 'ID foto galeri wajib disertakan.', 400);
    }

    $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = ?");
    $stmt->execute([$id]);

    recordRealtimeEvent($pdo, 'GALLERY_ITEM_DELETED', 'gallery', (string)$id);

    jsonResponse(true, null, 'Foto galeri berhasil dihapus.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
