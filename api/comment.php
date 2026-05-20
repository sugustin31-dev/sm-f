<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/config.php';

$input = $_POST;

if (empty($input['name']) || empty($input['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name and message are required']);
    exit;
}

$name    = trim(strip_tags($input['name']));
$message = trim(strip_tags($input['message']));

if (mb_strlen($name) > 60) {
    $name = mb_substr($name, 0, 60);
}

if (mb_strlen($message) > 500) {
    $message = mb_substr($message, 0, 500);
}

if ($name === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name and message cannot be empty after sanitization']);
    exit;
}

try {
    $pdo  = getPDO();
    $stmt = $pdo->prepare('INSERT INTO comments (name, message) VALUES (:name, :message)');
    $stmt->execute([':name' => $name, ':message' => $message]);

    echo json_encode(['success' => true, 'id' => (int) $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
