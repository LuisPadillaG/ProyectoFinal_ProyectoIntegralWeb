<?php
session_start();
include("conexion.php");

if (!isset($_SESSION['id'])) {
    header("Location: login.php");
    exit();
}

$album_id = $_GET['id'] ?? 0;

// Obtener información del álbum
$stmt = $conexion->prepare("SELECT nombre, descripcion, privado, color, usuario_id FROM albumes WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $album_id);
$stmt->execute();
$stmt->bind_result($nombre, $descripcion, $privado, $color, $usuario_id);
if (!$stmt->fetch()) {
    die("Álbum no encontrado");
}
$stmt->close();

// Verificar que el usuario sea dueño si el álbum es privado
if ($privado && $usuario_id != $_SESSION['id']) {
    die("No tienes permiso para ver este álbum");
}

// Manejar subida de fotos
$mensaje = "";
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['foto'])) {
    $foto = $_FILES['foto'];
    if ($foto['error'] === 0) {
        $ext = pathinfo($foto['name'], PATHINFO_EXTENSION);
        $archivo = "album_" . $album_id . "_" . time() . "." . $ext;

        // Asegúrate de que la carpeta uploads exista
        if (!is_dir("uploads")) {
            mkdir("uploads", 0777, true);
        }

        move_uploaded_file($foto['tmp_name'], "uploads/" . $archivo);

        $stmt = $conexion->prepare("INSERT INTO fotos (album_id, nombre, archivo, emocion) VALUES (?, ?, ?, ?)");
        $nombre_foto = $_POST['nombre_foto'] ?? '';
        $emocion = $_POST['emocion'] ?? '';
        $stmt->bind_param("isss", $album_id, $nombre_foto, $archivo, $emocion);
        $stmt->execute();
        $stmt->close();

        $mensaje = "✅ Foto subida correctamente";
    } else {
        $mensaje = "❌ Error al subir la foto";
    }
}

// Obtener fotos del álbum
$stmt = $conexion->prepare("SELECT id, nombre, archivo, fecha_subida, emocion FROM fotos WHERE album_id = ? ORDER BY fecha_subida DESC");
$stmt->bind_param("i", $album_id);
$stmt->execute();
$result = $stmt->get_result();
$photos = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($nombre); ?></title>
    <style>
        .foto {
            width: 150px;
            height: 150px;
            object-fit: cover;
            margin: 5px;
        }
        .photo-card {
            margin: 10px;
            display: inline-block;
            text-align: center;
        }
    </style>
</head>
<body>
<h2 style="color:<?php echo $color; ?>"><?php echo htmlspecialchars($nombre); ?></h2>
<p><?php echo htmlspecialchars($descripcion); ?></p>

<?php if(!empty($mensaje)) echo "<p>$mensaje</p>"; ?>

<h3>Subir nueva foto</h3>
<form method="post" action="" enctype="multipart/form-data">
    <p>Nombre de la foto:</p>
    <input type="text" name="nombre_foto">

    <p>Archivo:</p>
    <input type="file" name="foto" accept="image/*" required>

    <p>Emoción:</p>
    <select name="emocion" required>
        <option value="">Selecciona una emoción</option>
        <option value="Feliz">Feliz</option>
        <option value="Triste">Triste</option>
        <option value="Enojado">Enojado</option>
        <option value="Sorprendido">Sorprendido</option>
        <option value="Amor">Amor</option>
    </select>

    <br><br>
    <button type="submit">Subir foto</button>
</form>

<h3>Fotos del álbum</h3>
<div style="display:flex; flex-wrap:wrap;">
<?php
foreach ($photos as $p) {
    echo "<div class='photo-card'>";
    echo "<img src='uploads/{$p['archivo']}' class='foto' alt='".htmlspecialchars($p['nombre'])."'>";
    echo "<p>".htmlspecialchars($p['nombre'])."</p>";
    if (!empty($p['emocion'])) {
        echo "<p>Emoción: <strong>" . htmlspecialchars($p['emocion']) . "</strong></p>";
    }
    echo "</div>";
}
?>
</div>

<a href="dashboard.php">Volver al panel</a>
<a href="logout.php">Cerrar sesión</a>
</body>
</html>
