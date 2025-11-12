<?php
session_start();
include("conexion.php");

header("Content-Type: application/json");

if (!isset($_SESSION['id'])) {
    echo json_encode(["error" => "NO_SESION"]);
    exit();
}

$album_id = intval($_GET['id'] ?? 0);

// Obtener datos del álbum
$stmt = $conexion->prepare("
    SELECT nombre, descripcion, privado, color, usuario_id 
    FROM albumes WHERE id = ? LIMIT 1
");
$stmt->bind_param("i", $album_id);
$stmt->execute();
$album = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$album) {
    echo json_encode(["error" => "ALBUM_NO_ENCONTRADO"]);
    exit();
}

// Si es privado y no eres el dueño
if ($album['privado'] && $album['usuario_id'] != $_SESSION['id']) {
    echo json_encode(["error" => "SIN_PERMISO"]);
    exit();
}

// Obtener fotos
$stmt = $conexion->prepare("
    SELECT id, nombre, archivo, fecha_subida, emocion 
    FROM fotos 
    WHERE album_id = ? ORDER BY fecha_subida DESC
");
$stmt->bind_param("i", $album_id);
$stmt->execute();
$fotos = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode([
    "status" => "OK",
    "album" => $album,
    "fotos" => $fotos
]);
