<?php
// contact.php - PHP backend for contact form
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['name']) && isset($input['email']) && isset($input['message'])) {
        $name = htmlspecialchars($input['name']);
        $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
        $message = htmlspecialchars($input['message']);

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // In a real application, you would:
            // 1. Save to database
            // 2. Send email
            // 3. Log the submission

            // Simulate database save
            $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from: $name ($email)\n";
            file_put_contents('contact_submissions.log', $log_entry, FILE_APPEND | LOCK_EX);

            echo json_encode(['status' => 'success', 'message' => 'Message received successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>