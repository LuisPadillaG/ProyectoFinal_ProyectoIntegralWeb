<?php
session_start();
include("conexion.php");

if (!isset($_SESSION['id'])) {
    header("Location: login.php");
    exit();
}

$mensaje_pin = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pin'])) {
    $input_pin = trim((string)$_POST['pin']);

    $stmt = $conexion->prepare("SELECT pin FROM usuarios WHERE id = ? LIMIT 1");
    $stmt->bind_param("i", $_SESSION['id']);
    $stmt->execute();
    $stmt->bind_result($user_pin);
    $stmt->fetch();
    $stmt->close();

    $input_pin = trim((string)$_POST['pin']);
$user_pin  = trim((string)$user_pin);

if ($input_pin == $user_pin) {
    header("Location: ver_album_privado.php");
    exit();
} else {
    $mensaje_pin = "❌ PIN incorrecto";
}
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ingresar PIN</title>
</head>
<body>
<h2>Ingresa tu PIN para ver álbumes privados</h2>
<form method="post" action="">
    <input type="password" name="pin" required>
    <button type="submit">Ver álbumes privados</button>
</form>
<?php if(!empty($mensaje_pin)) echo "<p style='color:red;'>$mensaje_pin</p>"; ?>
<a href="dashboard.php">Cancelar</a>
</body>
</html>