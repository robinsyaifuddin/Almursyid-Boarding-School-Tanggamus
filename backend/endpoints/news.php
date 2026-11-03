<?php
/**
 * News API: Publik cepat (Cache enabled) + CRUD Admin
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// GET: Berita Publik (Super cepat dengan HTTP Caching)
if ($method === 'GET') {
    $slug = $_GET['slug'] ?? null;

    if ($slug) {
        $stmt = $pdo->prepare("SELECT * FROM news WHERE slug = ? AND status = 'published' LIMIT 1");
        $stmt->execute([$slug]);
        $item = $stmt->fetch();

        if (!$item) {
            jsonResponse(false, null, 'Berita tidak ditemukan.', 404);
        }

        // Cache 60 detik untuk artikel spesifik
        jsonResponse(true, $item, 'Berita ditemukan.', 200, [
            'Cache-Control' => 'public, max-age=60, stale-while-revalidate=300'
        ]);
    }

    // Ambil semua berita published
    $stmt = $pdo->query("SELECT id, title, slug, category, excerpt, content, image_url as imageUrl, author, published_at as date, status FROM news WHERE status = 'published' ORDER BY id DESC");
    $newsList = $stmt->fetchAll();

    // Cache header: Cepat langsung dari browser & LiteSpeed RAM
    jsonResponse(true, $newsList, 'Daftar berita berhasil dimuat.', 200, [
        'Cache-Control' => 'public, max-age=30, stale-while-revalidate=180'
    ]);
}

// POST: Tambah atau Update Berita (Admin Only)
if ($method === 'POST') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $input = getJsonInput();
    $id        = !empty($input['id']) ? (int)$input['id'] : null;
    $title     = trim($input['title'] ?? '');
    $category  = trim($input['category'] ?? 'Kegiatan');
    $excerpt   = trim($input['excerpt'] ?? $input['summary'] ?? '');
    $content   = trim($input['content'] ?? $input['summary'] ?? '');
    $imageUrl  = trim($input['imageUrl'] ?? $input['image_url'] ?? $input['image'] ?? '');
    $author    = trim($input['author'] ?? 'Humas Pesantren');
    $date      = trim($input['date'] ?? date('d M Y'));

    if (empty($title) || empty($content)) {
        jsonResponse(false, null, 'Judul dan ringkasan berita wajib diisi.', 400);
    }

    // Generate slug otomatis
    $slugBase = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title), '-'));

    if ($id) {
        $stmt = $pdo->prepare("UPDATE news SET title = ?, category = ?, excerpt = ?, content = ?, image_url = ?, author = ?, published_at = ? WHERE id = ?");
        $stmt->execute([$title, $category, $excerpt, $content, $imageUrl, $author, $date, $id]);
        recordRealtimeEvent($pdo, 'NEWS_UPDATED', 'news', (string)$id, ['title' => $title]);
        jsonResponse(true, ['id' => $id], 'Berita berhasil diperbarui.', 200);
    } else {
        $slug = $slugBase . '-' . substr(bin2hex(random_bytes(3)), 0, 5);
        $stmt = $pdo->prepare("INSERT INTO news (title, slug, category, excerpt, content, image_url, author, published_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published')");
        $stmt->execute([$title, $slug, $category, $excerpt, $content, $imageUrl, $author, $date]);

        $newId = $pdo->lastInsertId();
        recordRealtimeEvent($pdo, 'NEWS_CREATED', 'news', (string)$newId, ['title' => $title, 'slug' => $slug]);

        jsonResponse(true, ['id' => (int)$newId, 'slug' => $slug], 'Berita berhasil diterbitkan.', 201);
    }
}

// DELETE: Hapus Berita (Admin Only)
if ($method === 'DELETE') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(false, null, 'ID berita wajib disertakan.', 400);
    }

    $stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
    $stmt->execute([$id]);

    recordRealtimeEvent($pdo, 'NEWS_DELETED', 'news', (string)$id);

    jsonResponse(true, null, 'Berita berhasil dihapus.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
