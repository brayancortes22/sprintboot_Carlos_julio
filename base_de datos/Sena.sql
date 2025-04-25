-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.7.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para carlos_julio
CREATE DATABASE IF NOT EXISTS `carlos_julio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `carlos_julio`;

-- Volcando estructura para tabla carlos_julio.aprendiz
CREATE TABLE IF NOT EXISTS `aprendiz` (
  `id_aprendiz` int(11) NOT NULL AUTO_INCREMENT,
  `contraseña` varchar(255) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `numero_documento` bigint(20) DEFAULT NULL,
  `tipo_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_aprendiz`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla carlos_julio.aprendiz: ~4 rows (aproximadamente)
INSERT INTO `aprendiz` (`id_aprendiz`, `contraseña`, `correo`, `nombre`, `numero_documento`, `tipo_usuario`) VALUES
	(2, '$2a$10$3BYVaTl8POzD1.OQSRbcFeaT9Z1kzvXoX42svmM6rN/mXUfZdAe8u', 'bscl2@gmail.com', 'stid', 1129844844, 2),
	(8, '$2a$10$lHFeZjRQrJZA23jC3X9Y9.pP.K0Yy9AYT9iPNKa.O/jEEMZkJOriS', 'gggg@gmail.com', 'gg', 1123, 2),
	(9, NULL, 'bscl@gmail.com', 'brayan stid cortes', 1129844804, 2),
	(10, '$2a$10$5hdKA7JpgCOrhErFhmj/E.Biw2wQkTUC/e5i50WpEm4LY.LyrUb9C', 'bscl@gmail.com', 'brayan cortes', 1129844804, 2);

-- Volcando estructura para tabla carlos_julio.aprendiz_curso
CREATE TABLE IF NOT EXISTS `aprendiz_curso` (
  `id_aprendiz_curso` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_inscripcion` datetime(6) DEFAULT NULL,
  `id_aprendiz` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_aprendiz_curso`),
  KEY `FKfpmhivqfs4oss1k8jcjsan65m` (`id_aprendiz`),
  KEY `FK24s9gvwuidw47hh4ai5hv5rjn` (`id_curso`),
  CONSTRAINT `FK24s9gvwuidw47hh4ai5hv5rjn` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`),
  CONSTRAINT `FKfpmhivqfs4oss1k8jcjsan65m` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendiz` (`id_aprendiz`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla carlos_julio.aprendiz_curso: ~0 rows (aproximadamente)
INSERT INTO `aprendiz_curso` (`id_aprendiz_curso`, `fecha_inscripcion`, `id_aprendiz`, `id_curso`) VALUES
	(5, '2025-04-22 14:40:24.649000', 2, 937);

-- Volcando estructura para tabla carlos_julio.certificados
CREATE TABLE IF NOT EXISTS `certificados` (
  `id_certificado` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_fin` datetime(6) DEFAULT NULL,
  `nombre_certificado` varchar(255) DEFAULT NULL,
  `numero_documento_certificado` int(11) DEFAULT NULL,
  `id_aprendiz` int(11) DEFAULT NULL,
  `id_lecciones` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_certificado`),
  KEY `FKbb03eb0664h28s2led2pvlpjw` (`id_aprendiz`),
  KEY `FKclb405945tm259siknwvddss2` (`id_lecciones`),
  CONSTRAINT `FKbb03eb0664h28s2led2pvlpjw` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendiz` (`id_aprendiz`),
  CONSTRAINT `FKclb405945tm259siknwvddss2` FOREIGN KEY (`id_lecciones`) REFERENCES `lecciones` (`id_leccion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla carlos_julio.certificados: ~2 rows (aproximadamente)
INSERT INTO `certificados` (`id_certificado`, `fecha_fin`, `nombre_certificado`, `numero_documento_certificado`, `id_aprendiz`, `id_lecciones`) VALUES
	(1, '2025-04-22 19:00:00.000000', 'certificado', 1129844804, 2, 36),
	(2, '2025-04-29 19:00:00.000000', 'prueba final', 1129844844, 2, 38);

-- Volcando estructura para tabla carlos_julio.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_ficha` int(11) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_fin` datetime(6) DEFAULT NULL,
  `fecha_inicio` datetime(6) DEFAULT NULL,
  `nombre_programa` varchar(150) DEFAULT NULL,
  `activo` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=944 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla carlos_julio.cursos: ~39 rows (aproximadamente)
INSERT INTO `cursos` (`id_curso`, `codigo_ficha`, `descripcion`, `fecha_fin`, `fecha_inicio`, `nombre_programa`, `activo`) VALUES
	(937, 2901817, 'programacion orientada a objetos ', '2025-04-01 19:00:00.000000', '2025-04-17 19:00:00.000000', 'adso', NULL),
	(938, 2901818, 'nose', '2025-04-29 19:00:00.000000', '2025-04-21 19:00:00.000000', 'prueba', NULL),
	(939, 21223, 'huggu', '2025-05-21 19:00:00.000000', '2025-04-21 19:00:00.000000', 'bb', NULL),
	(940, 12121, 'knknsdn', '2025-04-22 19:00:00.000000', '2025-04-22 19:00:00.000000', 'prueba final', NULL),
	(941, 12288, 'hdsbchj', '2025-04-22 19:00:00.000000', '2025-04-21 19:00:00.000000', 'bbsb', NULL),
	(942, 182, 'jdjd', '2025-04-24 19:00:00.000000', '2025-04-23 19:00:00.000000', 'djdj', NULL),
	(943, 8282, 'jjvc', '2025-04-28 19:00:00.000000', '2025-04-22 19:00:00.000000', 'jjj', NULL);

-- Volcando estructura para tabla carlos_julio.lecciones
CREATE TABLE IF NOT EXISTS `lecciones` (
  `id_leccion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre_leccion` varchar(150) DEFAULT NULL,
  `ruta_leccion` varchar(255) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_leccion`),
  KEY `FKe5h5xfr7vokjg6uc95ayho92s` (`id_curso`),
  CONSTRAINT `FKe5h5xfr7vokjg6uc95ayho92s` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla carlos_julio.lecciones: ~2 rows (aproximadamente)
INSERT INTO `lecciones` (`id_leccion`, `descripcion`, `nombre_leccion`, `ruta_leccion`, `id_curso`) VALUES
	(36, 'kkksksskkskkskkaksdp}ad}dc}', 'prueba', 'xd', 937),
	(37, 'hvuv', 'ccd', 'jbj', 939),
	(38, 'debde de salie con ......', 'prueba leccion final', 'aprender a .....', 940);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
