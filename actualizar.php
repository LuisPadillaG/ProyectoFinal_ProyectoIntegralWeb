<?php
session_start();
include("conexion.php");

header("Content-Type: application/json");

// Verificar sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(["status" => "NO_SESION"]);
    exit();
}

$nombre = trim($_POST['nombre'] ?? ""); 
$pin_actual = trim($_POST['pin_actual'] ?? "");
$pin_nuevo = trim($_POST['pin_nuevo'] ?? "");
$imagenSubida = $_FILES['imagen'] ?? null;

if ($nombre === "" || $pin_actual === "" || $pin_nuevo === "") {
    echo json_encode(["status" => "ERROR", "mensaje" => "Completa todos los campos"]);
    exit();
}

if (!preg_match('/^\d{4}$/', $pin_nuevo)) {
    echo json_encode(["status" => "ERROR", "mensaje" => "El PIN debe tener 4 dígitos"]);
    exit();
}

// Obtener usuario
$stmt = $conexion->prepare("SELECT pin, imagen FROM usuarios WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $_SESSION['id']);
$stmt->execute();
$stmt->bind_result($pin_db, $imagen_actual);
$stmt->fetch();
$stmt->close();


// Manejar imagen
$nombreImagen = $imagen_actual;
if ($imagenSubida && $imagenSubida['error'] == 0) {
    $ext = pathinfo($imagenSubida['name'], PATHINFO_EXTENSION);
    $nombreImagen = "perfil_" . $_SESSION['id'] . "." . $ext;
    move_uploaded_file($imagenSubida['tmp_name'], "recursos/img/usuarios/" . $nombreImagen);
}

// Actualizar datos
$stmt = $conexion->prepare("UPDATE usuarios SET nombre = ?, pin = ?, imagen = ? WHERE id = ?");
$stmt->bind_param("sssi", $nombre, $pin_nuevo, $nombreImagen, $_SESSION['id']);
$stmt->execute();
$stmt->close();

echo json_encode(["status" => "OK"]);
