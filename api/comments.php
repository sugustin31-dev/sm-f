<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/config.php';

try {
    $pdo  = getPDO();
    $stmt = $pdo->query('SELECT id, name, message, rating, created_at FROM comments ORDER BY created_at DESC');
    $comments = $stmt->fetchAll();

    echo json_encode(['data' => $comments]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
