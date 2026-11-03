<?php
/**
 * Programs API: Publik (Cache) + CRUD Admin
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET: Ambil semua program unggulan (Publik & Cepat)
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT id, title, tagline, description, icon, highlights, sort_order FROM programs ORDER BY sort_order ASC, id ASC");
    $programs = $stmt->fetchAll();

    foreach ($programs as &$p) {
        if (!empty($p['highlights']) && is_string($p['highlights'])) {
            $p['highlights'] = json_decode($p['highlights'], true);
        }
    }

    jsonResponse(true, $programs, 'Program berhasil dimuat.', 200, [
        'Cache-Control' => 'public, max-age=60, stale-while-revalidate=300'
    ]);
}

// POST: Tambah Program Baru
if ($method === 'POST') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $input = getJsonInput();
    $id = trim($input['id'] ?? '');
    $title = trim($input['title'] ?? '');
    $tagline = trim($input['tagline'] ?? '');
    $description = trim($input['description'] ?? '');
    $icon = trim($input['icon'] ?? 'BookOpen');
    $highlights = isset($input['highlights']) ? json_encode($input['highlights'], JSON_UNESCAPED_UNICODE) : json_encode([]);
    $sortOrder = (int)($input['sort_order'] ?? 0);

    if (empty($id)) {
        $id = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title), '-'));
    }

    if (empty($title) || empty($description)) {
        jsonResponse(false, null, 'Judul dan deskripsi program wajib diisi.', 400);
    }

    $stmt = $pdo->prepare("REPLACE INTO programs (id, title, tagline, description, icon, highlights, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$id, $title, $tagline, $description, $icon, $highlights, $sortOrder]);

    recordRealtimeEvent($pdo, 'PROGRAM_UPDATED', 'programs', $id, ['title' => $title]);

    jsonResponse(true, ['id' => $id], 'Program berhasil disimpan.', 200);
}

// DELETE: Hapus Program
if ($method === 'DELETE') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(false, null, 'ID program wajib disertakan.', 400);
    }

    $stmt = $pdo->prepare("DELETE FROM programs WHERE id = ?");
    $stmt->execute([$id]);

    recordRealtimeEvent($pdo, 'PROGRAM_DELETED', 'programs', $id);

    jsonResponse(true, ['id' => $id], 'Program berhasil dihapus.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
