<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : 'Nova poruka sa portfolio sajta';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Molim vas popunite sva obavezna polja.']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Neispravna email adresa.']);
    exit;
}

// Email configuration
$to = 'velbyters@gmail.com';
$email_subject = 'Portfolio Contact: ' . $subject;

// Create email content
$email_body = "
Nova poruka sa portfolio sajta:

Ime: {$name}
Email: {$email}
Tema: {$subject}

Poruka:
{$message}

--
Poslato sa portfolio sajta VelByte.rs
Vreme: " . date('Y-m-d H:i:s');

// Email headers
$headers = array(
    'From' => $email,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
);

// Convert headers array to string
$headers_string = '';
foreach ($headers as $key => $value) {
    $headers_string .= $key . ': ' . $value . "\r\n";
}

// Send email
if (mail($to, $email_subject, $email_body, $headers_string)) {
    echo json_encode(['success' => true, 'message' => 'Poruka je uspešno poslata!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Greška pri slanju poruke. Molim vas pokušajte ponovo.']);
}
?>
