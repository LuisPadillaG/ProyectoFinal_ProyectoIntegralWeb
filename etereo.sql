-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-10-2025 a las 10:35:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `etereo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `albumes`
--

CREATE TABLE `albumes` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `privado` tinyint(1) DEFAULT 0,
  `color` varchar(7) DEFAULT '#FFFFFF',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `albumes`
--

INSERT INTO `albumes` (`id`, `usuario_id`, `nombre`, `descripcion`, `privado`, `color`, `fecha_creacion`) VALUES
(1, 12, 's+l', 'buenos momentotos', 0, '#ff66fa', '2025-10-05 05:49:18'),
(2, 12, 'privado', 'privado', 1, '#ff0f0f', '2025-10-05 05:50:10'),
(3, 13, 'chestappen', 'sadasdd dsad', 0, '#e60a0a', '2025-10-05 07:56:45'),
(4, 13, 'amante', 'jijija', 1, '#2dbe4a', '2025-10-05 07:58:55'),
(5, 12, 'escuela', 'sdasdas', 0, '#29adff', '2025-10-06 02:01:00'),
(6, 12, 'pieGrande01', 'asdasa', 1, '#f70808', '2025-10-06 02:02:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos`
--

CREATE TABLE `fotos` (
  `id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `archivo` varchar(255) NOT NULL,
  `fecha_subida` timestamp NOT NULL DEFAULT current_timestamp(),
  `emocion` varchar(50) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fotos`
--

INSERT INTO `fotos` (`id`, `album_id`, `nombre`, `archivo`, `fecha_subida`, `emocion`) VALUES
(2, 2, 'jamon', 'album_2_1759643856.JPG', '2025-10-05 05:57:36', 'feliz'),
(3, 2, 'jamon2', 'album_2_1759643962.JPG', '2025-10-05 05:59:22', ''),
(4, 2, 'OLA', 'album_2_1759646209.png', '2025-10-05 06:36:49', ''),
(5, 2, 'OLA', 'album_2_1759646435.png', '2025-10-05 06:40:35', ''),
(6, 2, 'OLA', 'album_2_1759646671.png', '2025-10-05 06:44:31', NULL),
(7, 2, 'OLA', 'album_2_1759646700.png', '2025-10-05 06:45:00', NULL),
(8, 2, 'OLA', 'album_2_1759646764.png', '2025-10-05 06:46:04', NULL),
(9, 2, 'OLA', 'album_2_1759647046.png', '2025-10-05 06:50:46', NULL),
(10, 2, 'OLA', 'album_2_1759647170.png', '2025-10-05 06:52:50', 'Feliz'),
(11, 3, 'agarrade de rifle', 'album_3_1759651104.jpg', '2025-10-05 07:58:24', 'Sorprendido'),
(12, 4, 'el baltery y yo ', 'album_4_1759651223.jfif', '2025-10-05 08:00:23', 'Feliz'),
(13, 1, 'jamon', 'album_1_1759716088.jfif', '2025-10-06 02:01:28', 'Feliz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `pin` int(255) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombre`, `correo`, `contraseña`, `pin`, `imagen`) VALUES
(10, 'salma', 'salma@yo.com', '$2y$10$8jyk8yTBtQjLDZvKUOxvVOeIm0Fi1UrMjXGmrjtXESdoqxYzcRMXu', 2546, ''),
(12, 'salma', 'admin@yo.com', '$2y$10$ceiy6/c7HzziegSjH9k0MOo9hSvZKuAK1S1DdONM.L0cod4n3ld1e', 8956, 'perfil_12.jpg'),
(13, 'pieGrande01', 'checoteamo12@gmai.com', '$2y$10$gbUsuS2gxF3LzJSxACy/sOxEHwh5k7s.wxpiITylpAUnNAuZZKk.K', 124, 'perfil_13.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `album_id` (`album_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `albumes`
--
ALTER TABLE `albumes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD CONSTRAINT `albumes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fotos_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albumes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
