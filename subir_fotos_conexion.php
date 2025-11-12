<?php
session_start();
include("conexion.php");

// 🔒 Verificamos si hay sesión iniciada
if (!isset($_SESSION['id'])) {
    echo json_encode(["status" => "NO_SESION"]);
    exit();
}

// 🔢 ID del álbum
$album_id = $_GET['id'] ?? 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 🧩 Datos enviados desde el JS
    $descripciones = $_POST['descripcion'] ?? [];
    $emociones = $_POST['emocion'] ?? [];
    $fotos = $_FILES['foto'] ?? null;

    // Validación básica
    if (!$fotos || !isset($fotos['name']) || count($fotos['name']) === 0) {
        echo json_encode(["status" => "ERROR", "mensaje" => "No se recibieron fotos."]);
        exit();
    }

    // 📁 Crear carpeta si no existe
    $carpetaUploads = __DIR__ . "/uploads";
    if (!is_dir($carpetaUploads)) {
        mkdir($carpetaUploads, 0777, true);
    }

    // 🚀 Procesar cada imagen
    for ($i = 0; $i < count($fotos['name']); $i++) {

        if ($fotos['error'][$i] === 0) {

            $ext = pathinfo($fotos['name'][$i], PATHINFO_EXTENSION);
            $archivo = "album_" . $album_id . "_" . time() . "_" . rand(1000, 9999) . "." . $ext;
            $rutaSubida = $carpetaUploads . "/" . $archivo;

            // Mover archivo temporal al destino
            if (!move_uploaded_file($fotos['tmp_name'][$i], $rutaSubida)) {
                echo json_encode(["status" => "ERROR", "mensaje" => "No se pudo mover la foto $i"]);
                exit();
            }

            // 🔧 Extraer descripción y emoción correctas
            $descripcion = $descripciones[$i] ?? "";
            $emocion = $emociones[$i] ?? "feliz";

            // 💾 Guardar en la base de datos
            $stmt = $conexion->prepare("INSERT INTO fotos (album_id, archivo, emocion, nombre) VALUES (?, ?, ?, ?)");
            if (!$stmt) {
                echo json_encode(["status" => "ERROR", "mensaje" => "Error en prepare: " . $conexion->error]);
                exit();
            }

            $stmt->bind_param("isss", $album_id, $archivo, $emocion, $descripcion);

            if (!$stmt->execute()) {
                echo json_encode(["status" => "ERROR", "mensaje" => "Error al ejecutar: " . $stmt->error]);
                exit();
            }

            $stmt->close();
        }
    }

    // ✅ Éxito
    echo json_encode(["status" => "OK", "mensaje" => "Fotos guardadas correctamente"]);
    exit();
}
?>
