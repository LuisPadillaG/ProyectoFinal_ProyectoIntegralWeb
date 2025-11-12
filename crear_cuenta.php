<?php
session_start();
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST['nombre'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $contrasena = $_POST['contraseña'] ?? '';
    $pin = $_POST['PIN'] ?? '';
    $imagenSubida = $_FILES['imagen'] ?? null;

    if (empty($nombre) || empty($correo) || empty($contrasena) || empty($pin)) {
        echo "FALTAN_DATOS";
        exit();
    }

    if (!preg_match('/^\d{4}$/', $pin)) {
        echo "PIN_INVALIDO";
        exit();
    }

    // Verificar si ya existe el correo
    $stmt = $conexion->prepare("SELECT id FROM usuarios WHERE correo = ? LIMIT 1");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "CORREO_EXISTE";
        exit();
    }

    $stmt->close();

    $hash_pass = password_hash($contrasena, PASSWORD_DEFAULT);

    $nombreImagen = "usuario_predeterminado.png";
    $rutaCarpeta = "recursos/img/usuarios/";

    if ($imagenSubida && $imagenSubida["error"] == UPLOAD_ERR_OK) {
        $extension = pathinfo($imagenSubida["name"], PATHINFO_EXTENSION);
        $nombreImagen = "perfil_" . time() . "." . $extension;
        move_uploaded_file($imagenSubida["tmp_name"], $rutaCarpeta . $nombreImagen);
    }
    
    $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, `contraseña`, pin, imagen) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nombre, $correo, $hash_pass, $pin, $nombreImagen);

    if ($stmt->execute()) {
        // Obtener el ID recién creado
        $nuevoId = $stmt->insert_id;

        // Iniciar sesión automáticamente
        $_SESSION['id'] = $nuevoId;
        $_SESSION['nombre'] = $nombre;
        $_SESSION['correo'] = $correo;
        $_SESSION['imagen'] = $rutaCarpeta . $nombreImagen;

        echo "OK";
    } else {
        echo "ERROR";
    }

    $stmt->close();
}
?>
