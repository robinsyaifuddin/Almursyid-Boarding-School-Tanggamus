<?php
/**
 * PPDB API: Pendaftaran Santri Baru & Realtime Management
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET: Ambil daftar pendaftar (Admin Dashboard)
if ($method === 'GET') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $stmt = $pdo->query("SELECT * FROM ppdb_applicants ORDER BY registered_at DESC");
    $applicants = $stmt->fetchAll();

    // Mapping field sesuai interface TypeScript PPDBApplicant
    $formatted = array_map(function($row) {
        return [
            'id'                 => (string)$row['id'],
            'registrationNumber' => $row['registration_number'],
            'fullName'           => $row['full_name'],
            'gender'             => $row['gender'],
            'nisn'               => $row['nisn'] ?? '',
            'birthPlace'         => $row['birth_place'] ?? '',
            'birthDate'          => $row['birth_date'] ?? '',
            'parentName'         => $row['parent_name'],
            'phone'              => $row['phone'],
            'address'            => $row['address'] ?? '',
            'programChoice'      => $row['program_choice'],
            'status'             => $row['status'],
            'notes'              => $row['notes'] ?? '',
            'registeredAt'       => $row['registered_at'],
        ];
    }, $applicants);

    jsonResponse(true, $formatted, 'Data pendaftar PPDB berhasil dimuat.');
}

// POST: Pendaftaran baru dari formulir online santri
if ($method === 'POST') {
    $input = getJsonInput();

    $fullName      = trim($input['fullName'] ?? '');
    $gender        = trim($input['gender'] ?? 'Laki-laki');
    $parentName    = trim($input['parentName'] ?? '');
    $phone         = trim($input['phone'] ?? '');
    $programChoice = trim($input['programChoice'] ?? '');

    if (empty($fullName) || empty($parentName) || empty($phone) || empty($programChoice)) {
        jsonResponse(false, null, 'Nama lengkap, nama orang tua, no telepon, dan pilihan program wajib diisi.', 400);
    }

    // Auto-generate nomor registrasi unik: PPDB-TAHUN-URUTAN
    $year = date('Y');
    $countStmt = $pdo->query("SELECT COUNT(*) as total FROM ppdb_applicants");
    $count = (int)$countStmt->fetch()['total'] + 1;
    $regNum = sprintf("PPDB-%s-%04d", $year, $count);

    $sql = "INSERT INTO ppdb_applicants 
            (registration_number, full_name, gender, nisn, birth_place, birth_date, parent_name, phone, address, program_choice, status, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Menunggu Verifikasi', ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $regNum,
        $fullName,
        $gender,
        $input['nisn'] ?? '',
        $input['birthPlace'] ?? '',
        $input['birthDate'] ?? '',
        $parentName,
        $phone,
        $input['address'] ?? '',
        $programChoice,
        $input['notes'] ?? ''
    ]);

    $newId = $pdo->lastInsertId();

    // Trigger Realtime Event
    recordRealtimeEvent($pdo, 'PPDB_NEW_APPLICATION', 'ppdb_applicants', (string)$newId, [
        'registrationNumber' => $regNum,
        'fullName'           => $fullName,
        'programChoice'      => $programChoice
    ]);

    jsonResponse(true, [
        'id'                 => $newId,
        'registrationNumber' => $regNum,
        'fullName'           => $fullName,
    ], 'Pendaftaran PPDB berhasil dikirim. Simpan nomor pendaftaran Anda.', 201);
}

// PUT: Update status verifikasi santri (Admin)
if ($method === 'PUT') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $input = getJsonInput();
    $id = $input['id'] ?? null;
    $status = $input['status'] ?? null;
    $notes = $input['notes'] ?? null;

    if (!$id || !$status) {
        jsonResponse(false, null, 'ID dan status pendaftaran wajib disertakan.', 400);
    }

    $stmt = $pdo->prepare("UPDATE ppdb_applicants SET status = ?, notes = COALESCE(?, notes) WHERE id = ?");
    $stmt->execute([$status, $notes, $id]);

    recordRealtimeEvent($pdo, 'PPDB_STATUS_UPDATED', 'ppdb_applicants', (string)$id, ['status' => $status]);

    jsonResponse(true, null, 'Status pendaftar berhasil diperbarui.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
