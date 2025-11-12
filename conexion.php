<?php
$conexion = new mysqli("localhost", "root", "patata12", "etereo", "3307"); // cambiar esto

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>
