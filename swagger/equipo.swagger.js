/**
 * @swagger
 * tags:
 *   name: Equipos
 *   description: Gestión de equipos
 */
/**
 * @swagger
 * /equipos:
 *   get:
 *     summary: Obtiene todos los equipos
 *     tags: [Equipos]
 *     responses:
 *       200:
 *         description: Lista de equipos
 *   post:
 *     summary: Crea un nuevo equipo
 *     tags: [Equipos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipo'
 *     responses:
 *       201:
 *         description: Equipo creado
 *
 * /equipos/{id}:
 *   get:
 *     summary: Obtiene un equipo por ID
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipo encontrado
 *       404:
 *         description: Equipo no encontrado
 *   put:
 *     summary: Actualiza un equipo
 *     tags: [Equipos]
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
 *             $ref: '#/components/schemas/Equipo'
 *     responses:
 *       200:
 *         description: Equipo actualizado
 *       404:
 *         description: Equipo no encontrado
 *   delete:
 *     summary: Elimina un equipo
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipo eliminado
 *       404:
 *         description: Equipo no encontrado
 *
 * components:
 *   schemas:
 *     Equipo:
 *       type: object
 *       required:
 *         - nombre
 *         - ciudad
 *         - temporada_id
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         ciudad:
 *           type: string
 *         temporada_id:
 *           type: integer
 */
