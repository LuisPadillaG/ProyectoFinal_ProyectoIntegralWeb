<?php
session_start();
include("conexion.php");

header("Content-Type: application/json");

// Validar sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(["status" => "NO_SESION"]);
    exit();
}

// Verificar método
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "METODO_INVALIDO"]);
    exit();
}

// Obtener datos
$data = json_decode(file_get_contents("php://input"), true);

$nombre = trim($data["nombre"] ?? "");
$descripcion = trim($data["descripcion"] ?? "");
$privado = !empty($data["privado"]) ? 1 : 0;
$color = $data["color"] ?? "#ffffff";

if ($nombre === "") {
    echo json_encode(["status" => "ERROR", "mensaje" => "El nombre es obligatorio"]);
    exit();
}

$stmt = $conexion->prepare("INSERT INTO albumes (usuario_id, nombre, descripcion, privado, color) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issis", $_SESSION['id'], $nombre, $descripcion, $privado, $color);

if ($stmt->execute()) {
    echo json_encode(["status" => "OK"]);
} else {
    echo json_encode(["status" => "ERROR", "mensaje" => $stmt->error]);
}
