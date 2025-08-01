<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'kongenga_db');

// Create connection
function getConnection() {
    static $connection = null;
    
    if ($connection === null) {
        try {
            $connection = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            die("Database connection failed. Please try again later.");
        }
    }
    
    return $connection;
}

// Initialize database
function initializeDatabase() {
    $pdo = getConnection();
    
    // Create tables if they don't exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            role ENUM('student', 'site_manager') DEFAULT 'student',
            university VARCHAR(255),
            field VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ");
    
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS sectors (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name_fr VARCHAR(255) NOT NULL,
            name_en VARCHAR(255),
            name_ln VARCHAR(255),
            name_sw VARCHAR(255),
            name_kg VARCHAR(255),
            description_fr TEXT,
            description_en TEXT,
            description_ln TEXT,
            description_sw TEXT,
            description_kg TEXT,
            icon VARCHAR(10),
            gradient VARCHAR(100),
            job_count INT DEFAULT 0,
            growth VARCHAR(50),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");
    
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sector_id INT,
            title_fr VARCHAR(255) NOT NULL,
            title_en VARCHAR(255),
            title_ln VARCHAR(255),
            title_sw VARCHAR(255),
            title_kg VARCHAR(255),
            description_fr TEXT,
            description_en TEXT,
            description_ln TEXT,
            description_sw TEXT,
            description_kg TEXT,
            required_studies_fr TEXT,
            required_studies_en TEXT,
            required_studies_ln TEXT,
            required_studies_sw TEXT,
            required_studies_kg TEXT,
            salary_min INT,
            salary_max INT,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sector_id) REFERENCES sectors(id)
        )
    ");
    
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS companies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description_fr TEXT,
            description_en TEXT,
            description_ln TEXT,
            description_sw TEXT,
            description_kg TEXT,
            website_url VARCHAR(255),
            website_name VARCHAR(255),
            logo_url VARCHAR(255),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");
    
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS user_favorites (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            job_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
            UNIQUE KEY unique_favorite (user_id, job_id)
        )
    ");
    
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS testimonials (
            id INT AUTO_INCREMENT PRIMARY KEY,
            job_id INT,
            user_name VARCHAR(255) NOT NULL,
            user_role VARCHAR(255),
            quote_fr TEXT NOT NULL,
            quote_en TEXT,
            quote_ln TEXT,
            quote_sw TEXT,
            quote_kg TEXT,
            status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (job_id) REFERENCES jobs(id)
        )
    ");
}

// Initialize database on first load
initializeDatabase();
?>