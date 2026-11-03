<?php
/**
 * Quick Seed & Setup Database
 * Mengeksekusi pembuatan tabel dan menyematkan akun admin jika belum ada.
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();

// Baca schema.sql
$schemaFile = __DIR__ . '/../schema.sql';
if (file_exists($schemaFile)) {
    $sql = file_get_contents($schemaFile);
    $pdo->exec($sql);
}

// Pastikan admin default terbuat (admin / admin123)
$adminPass = password_hash('admin123', PASSWORD_BCRYPT);
$checkAdmin = $pdo->prepare("SELECT id FROM users WHERE username = 'admin' LIMIT 1");
$checkAdmin->execute();
if (!$checkAdmin->fetch()) {
    $insertAdmin = $pdo->prepare("INSERT INTO users (username, password_hash, name, role) VALUES ('admin', ?, 'Administrator Pesantren', 'admin')");
    $insertAdmin->execute([$adminPass]);
} else {
    // Perbarui password hash admin agar dipastikan cocok dengan admin123
    $updateAdmin = $pdo->prepare("UPDATE users SET password_hash = ? WHERE username = 'admin'");
    $updateAdmin->execute([$adminPass]);
}

jsonResponse(true, [
    'status' => 'ready',
    'database' => 'connected',
    'admin_username' => 'admin',
    'admin_password' => 'admin123'
], 'Inisialisasi Database dan Akun Admin Berhasil.');
