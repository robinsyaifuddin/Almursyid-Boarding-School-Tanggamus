-- ==============================================================================
-- DATABASE SCHEMA: Almursyid Boarding School
-- Target Engine: MySQL 5.7+ / 8.0+ / MariaDB (Hostinger)
-- Karakter: utf8mb4_unicode_ci
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. TABEL USER ADMIN
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'admin',
  `token` VARCHAR(255) DEFAULT NULL,
  `token_expires` DATETIME DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin default: admin / admin123 (Password hash default bcrypt)
INSERT IGNORE INTO `users` (`id`, `username`, `password_hash`, `name`, `role`)
VALUES (1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator Pesantren', 'admin');

-- 2. TABEL PENGATURAN SITUS (Key-Value ter-index)
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. TABEL BERITA / ARTIKEL (News)
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(50) NOT NULL DEFAULT 'Kegiatan',
  `excerpt` TEXT,
  `content` LONGTEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Humas Pesantren',
  `published_at` VARCHAR(50) NOT NULL,
  `status` ENUM('published', 'draft') DEFAULT 'published',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_category` (`category`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. TABEL GALERI (Dokumentasi Foto)
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'Kegiatan',
  `image_url` VARCHAR(500) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. TABEL PROGRAM UNGGULAN
CREATE TABLE IF NOT EXISTS `programs` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `tagline` VARCHAR(255) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(50) DEFAULT 'BookOpen',
  `highlights` JSON DEFAULT NULL,
  `sort_order` INT DEFAULT 0,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. TABEL FASILITAS
CREATE TABLE IF NOT EXISTS `facilities` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `description` TEXT,
  `image_url` VARCHAR(500),
  `sort_order` INT DEFAULT 0,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. TABEL PENDAFTAR PPDB (Santri Baru)
CREATE TABLE IF NOT EXISTS `ppdb_applicants` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `registration_number` VARCHAR(50) NOT NULL UNIQUE,
  `full_name` VARCHAR(150) NOT NULL,
  `gender` ENUM('Laki-laki', 'Perempuan') NOT NULL,
  `nisn` VARCHAR(20) DEFAULT NULL,
  `birth_place` VARCHAR(100) DEFAULT NULL,
  `birth_date` VARCHAR(30) DEFAULT NULL,
  `parent_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `address` TEXT,
  `program_choice` VARCHAR(100) NOT NULL,
  `status` ENUM('Menunggu Verifikasi', 'Lolos Berkas', 'Diterima', 'Ditolak') DEFAULT 'Menunggu Verifikasi',
  `notes` TEXT DEFAULT NULL,
  `registered_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_reg_num` (`registration_number`),
  INDEX `idx_status` (`status`),
  INDEX `idx_registered_at` (`registered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. TABEL LOG UPDATE REALTIME (Mendukung SSE / Realtime Polling kilat)
CREATE TABLE IF NOT EXISTS `realtime_events` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `event_type` VARCHAR(50) NOT NULL,
  `entity` VARCHAR(50) NOT NULL,
  `entity_id` VARCHAR(100) DEFAULT NULL,
  `payload` JSON DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
