<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$form = isset($_POST['form']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', trim($_POST['form'])) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if (!$form || !$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Form and email are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

$safeName = str_replace([",", "\n", "\r"], ' ', $name);
$safeEmail = str_replace([",", "\n", "\r"], ' ', $email);
$safeMessage = str_replace([",", "\n", "\r"], ' ', $message);

$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$line = date('Y-m-d H:i:s') . ',' . $form . ',' . $safeEmail . ',' . $safeName . ',' . $safeMessage . "\n";
$file = $dataDir . '/' . $form . '.csv';
file_put_contents($file, $line, FILE_APPEND | LOCK_EX);

$mailSent = false;
if (ADMIN_EMAIL) {
    $subject = 'New ' . $form . ' submission on Behold the Hand';
    $body = "Form: " . $form . "\n";
    $body .= "Name: " . ($name ?: '-') . "\n";
    $body .= "Email: " . $email . "\n";
    if ($message) {
        $body .= "Message:\n" . $message . "\n";
    }
    $body .= "Time: " . date('Y-m-d H:i:s') . "\n";
    $headers = 'From: noreply@' . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost') . "\r\n";
    $mailSent = @mail(ADMIN_EMAIL, $subject, $body, $headers);
}

echo json_encode(['success' => true, 'emailSent' => $mailSent]);
