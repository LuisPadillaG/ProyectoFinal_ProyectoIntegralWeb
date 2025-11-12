<?php
session_start();
include("conexion.php");

if (!isset($_SESSION['id'])) {
    header("Location: login.php");
    exit();
}

// Obtener álbumes privados
$albums = [];
$stmt = $conexion->prepare("SELECT id, nombre, descripcion, color FROM albumes WHERE usuario_id = ? AND privado = 1 ORDER BY fecha_creacion DESC");
$stmt->bind_param("i", $_SESSION['id']);
$stmt->execute();
$result = $stmt->get_result();
if ($result) $albums = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Álbumes Privados</title>
    <style>
        .album-card { border:2px solid; padding:10px; margin:10px; width:200px; text-align:center; display:inline-block; }
    </style>
</head>
<body>
<h1>Mis álbumes privados 🔒</h1>
<a href="dashboard.php">⬅ Volver al Dashboard</a>
<div>
<?php
if (empty($albums)) echo "<p>No tienes álbumes privados.</p>";
else {
    foreach ($albums as $album) {
        echo "<div class='album-card' style='border-color:{$album['color']}'>";
        echo "<h3>" . htmlspecialchars($album['nombre']) . "</h3>";
        echo "<p>" . htmlspecialchars($album['descripcion']) . "</p>";
        echo "<a href='ver_album.php?id={$album['id']}'>Ver álbum</a>";
        echo "</div>";
    }
}
?>
</div>
</body>
</html>
