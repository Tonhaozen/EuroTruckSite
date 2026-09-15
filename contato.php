<?php
// ─────────────────────────────────────────────────────────────
// Euro Truck — recebimento do formulário de contato.
// Único PHP do site (o resto é 100% estático). Envia por e-mail via
// mail() nativo do PHP — funciona na maioria das hospedagens
// compartilhadas (Locaweb inclusa). Se o e-mail cair em spam ou não
// chegar, o próximo passo é trocar mail() por SMTP autenticado
// (ex.: PHPMailer + credenciais de uma caixa @eurotruck.ind.br).
// ─────────────────────────────────────────────────────────────

$to = 'comercial@eurotruck.ind.br';
$subjectText = 'Novo contato pelo site — Eurotruck';
$redirectOk = '/obrigado.html';
$redirectError = '/index.html#contato';

header('X-Content-Type-Options: nosniff');

function eurotruck_is_ajax() {
    $xrw = isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) : '';
    $accept = isset($_SERVER['HTTP_ACCEPT']) ? $_SERVER['HTTP_ACCEPT'] : '';
    return $xrw === 'xmlhttprequest' || strpos($accept, 'application/json') !== false;
}

function eurotruck_respond($ok, $message, $redirect) {
    if (eurotruck_is_ajax()) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 422);
        echo json_encode(array('ok' => $ok, 'message' => $message));
        exit;
    }
    header('Location: ' . $redirect);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    eurotruck_respond(false, 'Método não permitido.', $redirectError);
}

// Honeypot: campo invisível que só um bot preenche. Se vier preenchido,
// finge sucesso (não entrega e-mail nem avisa o bot que foi barrado).
if (!empty($_POST['bot-field'])) {
    eurotruck_respond(true, 'Mensagem enviada.', $redirectOk);
}

$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$telefone = isset($_POST['telefone']) ? trim($_POST['telefone']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$servico = isset($_POST['servico']) ? trim($_POST['servico']) : '';
$mensagem = isset($_POST['mensagem']) ? trim($_POST['mensagem']) : '';

if ($nome === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    eurotruck_respond(false, 'Preencha nome e um e-mail válido.', $redirectError);
}

// Remove quebras de linha dos campos usados em cabeçalhos do e-mail,
// pra evitar header injection (alguém injetando "Bcc:" etc. via nome/e-mail).
$nome = str_replace(array("\r", "\n"), '', $nome);
$email = str_replace(array("\r", "\n"), '', $email);

$body = "Novo contato pelo site Eurotruck\n\n"
    . "Nome: " . $nome . "\n"
    . "Telefone: " . $telefone . "\n"
    . "E-mail: " . $email . "\n"
    . "Serviço de interesse: " . ($servico !== '' ? $servico : 'Não informado') . "\n\n"
    . "Mensagem:\n" . $mensagem . "\n";

$headers = "From: Site Eurotruck <no-reply@eurotruck.ind.br>\r\n"
    . "Reply-To: " . $nome . " <" . $email . ">\r\n"
    . "Content-Type: text/plain; charset=UTF-8";

$encodedSubject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$sent = @mail($to, $encodedSubject, $body, $headers);

if (!$sent) {
    eurotruck_respond(false, 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou ligue para (41) 3656-6193.', $redirectError);
}

eurotruck_respond(true, 'Mensagem enviada com sucesso!', $redirectOk);
