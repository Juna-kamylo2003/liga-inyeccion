# SCRIPT PARA LIMPIAR BASES DE DATOS EN XAMPP
# Ejecutar en phpMyAdmin o cliente MySQL

# ================================
# LIMPIAR BASE DE DATOS DE DESARROLLO
# ================================

USE ligas_db;

-- Desactivar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 0;

-- Eliminar todas las tablas existentes
DROP TABLE IF EXISTS `Usuarios`;
DROP TABLE IF EXISTS `TablaPosiciones`;
DROP TABLE IF EXISTS `Resultados`;
DROP TABLE IF EXISTS `Partidos`;
DROP TABLE IF EXISTS `Jugadores`;
DROP TABLE IF EXISTS `Equipos`;
DROP TABLE IF EXISTS `Temporadas`;
DROP TABLE IF EXISTS `Ligas`;
DROP TABLE IF EXISTS `SequelizeMeta`;

-- Eliminar tablas duplicadas si existen
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `tablaposiciones`;
DROP TABLE IF EXISTS `resultados`;
DROP TABLE IF EXISTS `partidos`;
DROP TABLE IF EXISTS `jugadores`;
DROP TABLE IF EXISTS `equipos`;
DROP TABLE IF EXISTS `temporadas`;
DROP TABLE IF EXISTS `ligas`;

-- Reactivar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- Verificar que no queden tablas
SHOW TABLES;

# ================================
# LIMPIAR BASE DE DATOS DE TESTING
# ================================

USE ligas_db_test;

-- Desactivar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 0;

-- Eliminar todas las tablas existentes
DROP TABLE IF EXISTS `Usuarios`;
DROP TABLE IF EXISTS `TablaPosiciones`;
DROP TABLE IF EXISTS `Resultados`;
DROP TABLE IF EXISTS `Partidos`;
DROP TABLE IF EXISTS `Jugadores`;
DROP TABLE IF EXISTS `Equipos`;
DROP TABLE IF EXISTS `Temporadas`;
DROP TABLE IF EXISTS `Ligas`;
DROP TABLE IF EXISTS `SequelizeMeta`;

-- Eliminar tablas duplicadas si existen
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `tablaposiciones`;
DROP TABLE IF EXISTS `resultados`;
DROP TABLE IF EXISTS `partidos`;
DROP TABLE IF EXISTS `jugadores`;
DROP TABLE IF EXISTS `equipos`;
DROP TABLE IF EXISTS `temporadas`;
DROP TABLE IF EXISTS `ligas`;

-- Reactivar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- Verificar que no queden tablas
SHOW TABLES;