<?php
session_start(); // Iniciamos sesión
include("conexion.php");
$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = trim($_POST['correo']);
    $contrasena = trim($_POST['contrasena']);

    // Validar campos vacíos
    if (empty($correo) || empty($contrasena)) {
        $mensaje = "❌ Por favor completa todos los campos";
    } else {
        // Buscar usuario por correo
        $stmt = $conexion->prepare("SELECT id, nombre, `contraseña` FROM usuarios WHERE correo = ? LIMIT 1");
        if (!$stmt) die("Error prepare: " . $conexion->error);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 1) {
            $stmt->bind_result($id, $nombre, $hash_pass);
            $stmt->fetch();

            // Verificar contraseña
            if (password_verify($contrasena, $hash_pass)) {
                // Login exitoso: crear sesión
                $_SESSION['id'] = $id;
                $_SESSION['nombre'] = $nombre;
                header("Location: dashboard.php"); // Redirige al panel
                exit();
            } else {
                $mensaje = "❌ Contraseña incorrecta";
            }
        } else {
            $mensaje = "❌ Usuario no encontrado";
        }
        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<h2>Iniciar sesión</h2>

<?php if(!empty($mensaje)) echo "<p style='color:red;'>$mensaje</p>"; ?>

<form method="post" action="">
    <p>Correo:</p>
    <input type="email" name="correo" required>
    <p>Contraseña:</p>
    <input type="password" name="contrasena" required>
    <br><br>
    <button type="submit">Iniciar sesión</button>
</form>

<p>¿No tienes cuenta? <a href="registro.php">Regístrate aquí</a></p>
</body>
</html>