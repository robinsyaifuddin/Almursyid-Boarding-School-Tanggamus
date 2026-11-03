<?php
/**
 * Auth Middleware
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

function requireAuth(): array {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (!preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
        jsonResponse(false, null, 'Akses ditolak: Token autentikasi tidak ditemukan.', 401);
    }

    $token = $matches[1];
    $pdo = Database::getConnection();

    $stmt = $pdo->prepare("SELECT id, username, name, role FROM users WHERE token = ? AND token_expires > NOW() LIMIT 1");
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(false, null, 'Sesi telah berakhir atau token tidak valid. Silakan login kembali.', 401);
    }

    return $user;
}
