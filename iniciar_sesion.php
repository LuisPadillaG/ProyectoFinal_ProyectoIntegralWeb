<?php
session_start();
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $correo = trim($_POST['correo']);
    $contrasena = trim($_POST['contrasena']);

    if (empty($correo) || empty($contrasena)) {
        echo "FALTAN_DATOS";
        exit();
    }

    $stmt = $conexion->prepare("SELECT id, nombre, `contraseña` FROM usuarios WHERE correo = ? LIMIT 1");
    if (!$stmt) {
        echo "ERROR";
        exit();
    }

    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {

        $stmt->bind_result($id, $nombre, $hash_pass);
        $stmt->fetch();

        if (password_verify($contrasena, $hash_pass)) {
            // Guardar datos en sesión
            $_SESSION['id'] = $id;
            $_SESSION['nombre'] = $nombre;

            echo "OK";
            exit();
        } else {
            echo "CONTRASENA_INCORRECTA";
            exit();
        }
    } else {
        echo "NO_ENCONTRADO";
        exit();
    }

    $stmt->close();
}
?>
