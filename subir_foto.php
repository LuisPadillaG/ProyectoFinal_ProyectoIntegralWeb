<?php
session_start();
include("conexion.php");

header("Content-Type: application/json");

if (!isset($_SESSION['id'])) {
    echo json_encode(["error" => "NO_SESION"]);
    exit();
}

$album_id = intval($_POST['album_id'] ?? 0);
$nombre_foto = trim($_POST['nombre_foto'] ?? '');
$emocion = trim($_POST['emocion'] ?? '');
$foto = $_FILES['foto'] ?? null;

if (!$foto || $foto['error'] !== 0) {
    echo json_encode(["error" => "ERROR_FOTO"]);
    exit();
}

$ext = pathinfo($foto['name'], PATHINFO_EXTENSION);
$archivo = "album_" . $album_id . "_" . time() . "." . $ext;

if (!is_dir("uploads")) mkdir("uploads", 0777, true);

move_uploaded_file($foto['tmp_name'], "uploads/" . $archivo);

$stmt = $conexion->prepare("
    INSERT INTO fotos (album_id, nombre, archivo, emocion)
    VALUES (?, ?, ?, ?)
");
$stmt->bind_param("isss", $album_id, $nombre_foto, $archivo, $emocion);
$stmt->execute();
$stmt->close();

echo json_encode(["status" => "OK"]);
