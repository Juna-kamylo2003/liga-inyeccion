/**
 * @swagger
 * tags:
 *   name: Partidos
 *   description: Gestión de partidos
 */
/**
 * @swagger
 * /partidos:
 *   get:
 *     summary: Obtiene todos los partidos
 *     tags: [Partidos]
 *     responses:
 *       200:
 *         description: Lista de partidos
 *   post:
 *     summary: Crea un nuevo partido
 *     tags: [Partidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partido'
 *     responses:
 *       201:
 *         description: Partido creado
 *
 * /partidos/{id}:
 *   get:
 *     summary: Obtiene un partido por ID
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partido encontrado
 *       404:
 *         description: Partido no encontrado
 *   put:
 *     summary: Actualiza un partido
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partido'
 *     responses:
 *       200:
 *         description: Partido actualizado
 *       404:
 *         description: Partido no encontrado
 *   delete:
 *     summary: Elimina un partido
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partido eliminado
 *       404:
 *         description: Partido no encontrado
 *
 * components:
 *   schemas:
 *     Partido:
 *       type: object
 *       required:
 *         - fecha
 *         - equipo_local
 *         - equipo_visitante
 *         - temporada_id
 *       properties:
 *         id:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date
 *         equipo_local:
 *           type: integer
 *         equipo_visitante:
 *           type: integer
 *         temporada_id:
 *           type: integer
 */
