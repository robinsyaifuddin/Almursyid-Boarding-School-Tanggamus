<?php
/**
 * Realtime Updates Polling & Notification Sync
 * Cepat & ringan (eksekusi < 5ms)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();

// Mengambil event perubahan data terbaru sejak ID terakhir (last_id)
$lastId = isset($_GET['last_id']) ? (int)$_GET['last_id'] : 0;

$stmt = $pdo->prepare("SELECT id, event_type, entity, entity_id, payload, created_at FROM realtime_events WHERE id > ? ORDER BY id ASC LIMIT 50");
$stmt->execute([$lastId]);
$events = $stmt->fetchAll();

foreach ($events as &$evt) {
    if (!empty($evt['payload'])) {
        $evt['payload'] = json_decode($evt['payload'], true);
    }
}

jsonResponse(true, [
    'events' => $events,
    'latestId' => !empty($events) ? end($events)['id'] : $lastId,
    'serverTime' => date('Y-m-d H:i:s')
], 'Sync realtime berhasil.');
