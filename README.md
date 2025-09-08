# Ligas API

API RESTful para la gestión de ligas, equipos, jugadores, partidos y resultados.

## Tecnologías principales
- Node.js (JavaScript)
- Express
- Sequelize (ORM y migraciones)
- MariaDB
- InversifyJS (inyección de dependencias)
- Swagger (documentación)
- Jest (pruebas unitarias)

## Estructura de carpetas
- `src/models` — Modelos Sequelize
- `src/repositories` — Acceso a datos
- `src/services` — Lógica de negocio
- `src/controllers` — Controladores de endpoints
- `src/routes` — Definición de rutas
- `src/config` — Configuración
- `migrations` — Migraciones de base de datos
- `swagger` — Documentación OpenAPI
- `tests` — Pruebas unitarias

## Instalación

1. Instala dependencias:
   ```sh
   npm install
   ```
2. Configura el archivo `.env` con tus credenciales de base de datos.
3. Ejecuta migraciones:
   ```sh
   npx sequelize-cli db:migrate
   ```
4. Inicia el servidor:
   ```sh
   npm run dev
   ```
5. Documentación Swagger disponible en `/api-docs`.
