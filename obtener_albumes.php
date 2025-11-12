<?php
session_start();
include("conexion.php");

if (!isset($_SESSION['id'])) {
    echo json_encode(["error" => "NO_SESION"]);
    exit();
}

$stmt = $conexion->prepare("SELECT * FROM albumes WHERE usuario_id = ? ORDER BY fecha_creacion DESC");
$stmt->bind_param("i", $_SESSION['id']);
$stmt->execute();
$resultado = $stmt->get_result();

$albums = [];
if ($resultado) {
    $albums = $resultado->fetch_all(MYSQLI_ASSOC);
}
$stmt->close();

echo json_encode($albums);
