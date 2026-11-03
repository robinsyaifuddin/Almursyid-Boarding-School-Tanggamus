<?php
/**
 * CORS & Response Utility
 */

declare(strict_types=1);

// Handle CORS
$allowedOrigins = ['*']; // Saat production bisa diperketat ke domain Hostinger Anda
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array('*', $allowedOrigins) || in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Handle Preflight Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function jsonResponse(bool $success, mixed $data = null, string $message = '', int $statusCode = 200, array $headers = []): void {
    http_response_code($statusCode);
    foreach ($headers as $hKey => $hVal) {
        header("{$hKey}: {$hVal}");
    }
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    if (empty($raw)) {
        return $_POST;
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function recordRealtimeEvent(PDO $pdo, string $eventType, string $entity, ?string $entityId = null, array $payload = []): void {
    try {
        $stmt = $pdo->prepare("INSERT INTO realtime_events (event_type, entity, entity_id, payload) VALUES (?, ?, ?, ?)");
        $stmt->execute([$eventType, $entity, $entityId, json_encode($payload)]);
    } catch (Exception $e) {
        // Silent fail so it won't break the main transaction
    }
}
