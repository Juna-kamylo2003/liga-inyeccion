/**
 * @swagger
 * tags:
 *   name: Temporadas
 *   description: Gestión de temporadas
 */
/**
 * @swagger
 * /temporadas:
 *   get:
 *     summary: Obtiene todas las temporadas
 *     tags: [Temporadas]
 *     responses:
 *       200:
 *         description: Lista de temporadas
 *   post:
 *     summary: Crea una nueva temporada
 *     tags: [Temporadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Temporada'
 *     responses:
 *       201:
 *         description: Temporada creada
 *
 * /temporadas/{id}:
 *   get:
 *     summary: Obtiene una temporada por ID
 *     tags: [Temporadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Temporada encontrada
 *       404:
 *         description: Temporada no encontrada
 *   put:
 *     summary: Actualiza una temporada
 *     tags: [Temporadas]
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
 *             $ref: '#/components/schemas/Temporada'
 *     responses:
 *       200:
 *         description: Temporada actualizada
 *       404:
 *         description: Temporada no encontrada
 *   delete:
 *     summary: Elimina una temporada
 *     tags: [Temporadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Temporada eliminada
 *       404:
 *         description: Temporada no encontrada
 *
 * components:
 *   schemas:
 *     Temporada:
 *       type: object
 *       required:
 *         - anio
 *         - liga_id
 *       properties:
 *         id:
 *           type: integer
 *         anio:
 *           type: integer
 *         liga_id:
 *           type: integer
 */
