@echo off
REM Script para ejecutar migraciones en testing sin variables de entorno de producción

REM Limpiar variables de entorno que interfieren
set DB_NAME=
set DB_HOST=
set DB_USER=
set DB_PASSWORD=
set DB_DIALECT=

REM Configurar entorno de testing
set NODE_ENV=test

REM Ejecutar migraciones
npx sequelize-cli db:migrate

REM Verificar estado
npx sequelize-cli db:migrate:status
