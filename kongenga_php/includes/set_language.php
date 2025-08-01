<?php
session_start();

if ($_POST && isset($_POST['lang'])) {
    $allowedLanguages = ['fr', 'en'];
    $lang = $_POST['lang'];
    
    if (in_array($lang, $allowedLanguages)) {
        $_SESSION['lang'] = $lang;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid language']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No language specified']);
}
?>