<?php
/**
 * Auth Middleware
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

function requireAuth(): array {
    $authHeader = '';
    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }
    
    if (empty($authHeader)) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    }

    if (!preg_match('/Bearer\s+(\S+)/i', $authHeader, $matches)) {
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
