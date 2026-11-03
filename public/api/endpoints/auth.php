<?php
/**
 * Auth API: Login & Session Check
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = getJsonInput();
    $username = trim($input['username'] ?? '');
    $password = trim($input['password'] ?? '');

    if (empty($username) || empty($password)) {
        jsonResponse(false, null, 'Username dan password wajib diisi.', 400);
    }

    $stmt = $pdo->prepare("SELECT id, username, password_hash, name, role FROM users WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        jsonResponse(false, null, 'Username atau password salah.', 401);
    }

    // Generate secure token (valid 7 hari)
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+7 days'));

    $updateStmt = $pdo->prepare("UPDATE users SET token = ?, token_expires = ? WHERE id = ?");
    $updateStmt->execute([$token, $expires, $user['id']]);

    jsonResponse(true, [
        'token' => $token,
        'user'  => [
            'id'       => $user['id'],
            'username' => $user['username'],
            'name'     => $user['name'],
            'role'     => $user['role'],
        ],
        'expires' => $expires
    ], 'Login berhasil.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
