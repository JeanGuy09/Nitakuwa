<?php
session_start();
require_once '../config/database.php';
require_once '../includes/functions.php';

header('Content-Type: application/json');

if (!isLoggedIn()) {
    echo json_encode(['success' => false, 'error' => 'Not authenticated']);
    exit;
}

if ($_POST && isset($_POST['job_id'])) {
    $jobId = (int)$_POST['job_id'];
    $userId = $_SESSION['user_id'];
    
    if ($jobId > 0) {
        $action = toggleFavorite($userId, $jobId);
        echo json_encode(['success' => true, 'action' => $action]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid job ID']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No job ID provided']);
}
?>