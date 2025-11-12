<?php
session_start();
include("conexion.php");

// Validar sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(["error" => "NO_SESION"]);
    exit();
}

$stmt = $conexion->prepare("SELECT nombre, correo, imagen, pin FROM usuarios WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $_SESSION['id']);
$stmt->execute();
$stmt->bind_result($nombre, $correo, $imagen, $pin);
$stmt->fetch();
$stmt->close();

// Si no tiene imagen, usar imagen predeterminada
if (!$imagen) {
    $imagen = "recursos/img/usuario_predeterminado.png";
} else {
    $imagen = "recursos/img/usuarios/" . $imagen;
}

echo json_encode([
    "nombre" => $nombre,
    "correo" => $correo,
    "imagen" => $imagen,
    "pin" => $pin
]);
