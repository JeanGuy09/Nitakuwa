<?php
require_once 'config/database.php';

// Authentication functions
function login($email, $password) {
    $pdo = getConnection();
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name'] = $user['full_name'];
        $_SESSION['user_role'] = $user['role'];
        return true;
    }
    
    return false;
}

function register($email, $password, $fullName, $university = '', $field = '') {
    $pdo = getConnection();
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        return false; // Email already exists
    }
    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("
        INSERT INTO users (email, password, full_name, university, field) 
        VALUES (?, ?, ?, ?, ?)
    ");
    
    return $stmt->execute([$email, $hashedPassword, $fullName, $university, $field]);
}

function logout() {
    session_destroy();
    header('Location: ../index.php');
    exit;
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'site_manager';
}

// Data retrieval functions
function getStatistics() {
    $pdo = getConnection();
    
    $stats = [
        'jobs' => 0,
        'students' => 0,
        'companies' => 0,
        'success' => 0
    ];
    
    // Get job count
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM jobs WHERE is_active = TRUE");
    $stats['jobs'] = $stmt->fetch()['count'];
    
    // Get student count
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    $stats['students'] = $stmt->fetch()['count'];
    
    // Get company count
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM companies WHERE is_active = TRUE");
    $stats['companies'] = $stmt->fetch()['count'];
    
    // Get approved testimonials count (success stories)
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM testimonials WHERE status = 'approved'");
    $stats['success'] = $stmt->fetch()['count'];
    
    return $stats;
}

function getSectors($limit = null) {
    $pdo = getConnection();
    
    $sql = "SELECT * FROM sectors WHERE is_active = TRUE ORDER BY name_fr";
    if ($limit) {
        $sql .= " LIMIT " . (int)$limit;
    }
    
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function getSector($id) {
    $pdo = getConnection();
    
    $stmt = $pdo->prepare("SELECT * FROM sectors WHERE id = ? AND is_active = TRUE");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

function getJobs($sectorId = null, $limit = null) {
    $pdo = getConnection();
    
    $sql = "SELECT j.*, s.name_fr as sector_name FROM jobs j 
            LEFT JOIN sectors s ON j.sector_id = s.id 
            WHERE j.is_active = TRUE";
    
    $params = [];
    if ($sectorId) {
        $sql .= " AND j.sector_id = ?";
        $params[] = $sectorId;
    }
    
    $sql .= " ORDER BY j.created_at DESC";
    
    if ($limit) {
        $sql .= " LIMIT " . (int)$limit;
    }
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll();
}

function getJob($id) {
    $pdo = getConnection();
    
    $stmt = $pdo->prepare("
        SELECT j.*, s.name_fr as sector_name, s.icon as sector_icon 
        FROM jobs j 
        LEFT JOIN sectors s ON j.sector_id = s.id 
        WHERE j.id = ? AND j.is_active = TRUE
    ");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

function getUserFavorites($userId) {
    $pdo = getConnection();
    
    $stmt = $pdo->prepare("
        SELECT j.*, s.name_fr as sector_name 
        FROM user_favorites uf
        JOIN jobs j ON uf.job_id = j.id
        LEFT JOIN sectors s ON j.sector_id = s.id
        WHERE uf.user_id = ? AND j.is_active = TRUE
        ORDER BY uf.created_at DESC
    ");
    $stmt->execute([$userId]);
    return $stmt->fetchAll();
}

function toggleFavorite($userId, $jobId) {
    $pdo = getConnection();
    
    // Check if already favorite
    $stmt = $pdo->prepare("SELECT id FROM user_favorites WHERE user_id = ? AND job_id = ?");
    $stmt->execute([$userId, $jobId]);
    
    if ($stmt->fetch()) {
        // Remove from favorites
        $stmt = $pdo->prepare("DELETE FROM user_favorites WHERE user_id = ? AND job_id = ?");
        $stmt->execute([$userId, $jobId]);
        return 'removed';
    } else {
        // Add to favorites
        $stmt = $pdo->prepare("INSERT INTO user_favorites (user_id, job_id) VALUES (?, ?)");
        $stmt->execute([$userId, $jobId]);
        return 'added';
    }
}

function isFavorite($userId, $jobId) {
    if (!$userId) return false;
    
    $pdo = getConnection();
    $stmt = $pdo->prepare("SELECT id FROM user_favorites WHERE user_id = ? AND job_id = ?");
    $stmt->execute([$userId, $jobId]);
    return $stmt->fetch() !== false;
}

// Utility functions
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

function generateCsrfToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
?>