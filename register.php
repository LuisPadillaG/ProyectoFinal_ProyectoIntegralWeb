
<?php
include("conexion.php");
$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];
    $pin = $_POST['pin'];

    // Validar que todos los campos estén llenos
    if (empty($nombre) || empty($correo) || empty($contraseña) || empty($pin)) {
        $mensaje = "❌ Por favor, completa todos los campos";
    } 

    // 1️⃣ Validar que el PIN tenga exactamente 4 números
    if (!preg_match('/^\d{4}$/', $pin)) {
        $mensaje = "❌ El PIN debe tener exactamente 4 números";
    } else {
        // 2️⃣ Validar que el correo no exista
        $stmt = $conexion->prepare("SELECT id FROM usuarios WHERE correo = ? LIMIT 1");
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $mensaje = "❌ Este correo ya está registrado";
        } else {
            $stmt->close();

            // 3️⃣ Insertar usuario
            $hash_pass = password_hash($contraseña, PASSWORD_DEFAULT);
           $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, `contraseña`, pin) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $nombre, $correo, $hash_pass, $pin);

            if ($stmt->execute()) {
                // 4️⃣ Redirigir al login si todo fue correcto
                header("Location: login.php");
                exit();
            } else {
                $mensaje = "❌ Error: " . $stmt->error;
            }
        }
        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro</title>
</head>
<body>
<h2>Crear cuenta</h2>

<?php if(!empty($mensaje)) echo "<p style='color:red;'>$mensaje</p>"; ?>

<form method="post" action="">
    <p>Nombre:</p>
    <input type="text" name="nombre" required>
    <p>Correo:</p>
    <input type="email" name="correo" required>
    <p>Contraseña:</p>
    <input type="password" name="contraseña" required>
    <p>PIN (4 dígitos):</p>
    <input type="text" name="pin" required>
    <br><br>
    <button type="submit">Crear cuenta</button>
</form>

<p>¿Ya tienes cuenta? <a href="login.php">Inicia sesión aquí</a></p>
</body>
</html>