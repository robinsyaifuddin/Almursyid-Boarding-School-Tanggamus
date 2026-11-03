<?php
/**
 * Database Singleton Connection (PDO)
 * Almursyid Boarding School
 */

declare(strict_types=1);

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            // Ketika berjalan langsung di dalam server Hostinger, 'localhost' jauh lebih cepat (< 1ms).
            // Jika diakses dari luar (misal lokal dev), fallback ke IP remote.
            $isLocalServer = in_array($_SERVER['SERVER_ADDR'] ?? '', ['127.0.0.1', '::1']) || ($_SERVER['HTTP_HOST'] ?? '') === 'localhost';
            
            // Konfigurasi Database Hostinger Resmi
            $host = getenv('DB_HOST') ?: ($isLocalServer ? '153.92.15.84' : 'localhost');
            $port = (int)(getenv('DB_PORT') ?: 3306);
            $db   = getenv('DB_NAME') ?: 'u503475479_almursyid';
            $user = getenv('DB_USER') ?: 'u503475479_almursyid';
            $pass = getenv('DB_PASS') ?: 'Almursyid123';

            $dsn = "mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4";
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::ATTR_TIMEOUT            => 5,
                PDO::ATTR_PERSISTENT         => true,
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // Jika localhost gagal saat di server, fallback coba ke IP langsung
                if ($host === 'localhost') {
                    try {
                        $dsnRemote = "mysql:host=153.92.15.84;port={$port};dbname={$db};charset=utf8mb4";
                        self::$instance = new PDO($dsnRemote, $user, $pass, $options);
                        return self::$instance;
                    } catch (PDOException $e2) {
                        // ignore and report below
                    }
                }

                http_response_code(500);
                header('Content-Type: application/json');
                echo json_encode([
                    'success' => false,
                    'message' => 'Koneksi Database Gagal: ' . $e->getMessage()
                ]);
                exit;
            }
        }

        return self::$instance;
    }
}
