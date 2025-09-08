/**
 * @swagger
 * tags:
 *   name: Resultados
 *   description: Endpoints para gestionar resultados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Resultado:
 *       type: object
 *       required:
 *         - id
 *         - partidoId
 *         - equipoId
 *         - goles
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del resultado
 *         partidoId:
 *           type: integer
 *           description: ID del partido
 *         equipoId:
 *           type: integer
 *           description: ID del equipo
 *         goles:
 *           type: integer
 *           description: Goles anotados
 *       example:
 *         id: 1
 *         partidoId: 1
 *         equipoId: 2
 *         goles: 3
 */

/**
 * @swagger
 * /resultados:
 *   get:
 *     summary: Obtiene todos los resultados
 *     tags: [Resultados]
 *     responses:
 *       200:
 *         description: Lista de resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resultado'
 *   post:
 *     summary: Crea un nuevo resultado
 *     tags: [Resultados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resultado'
 *     responses:
 *       201:
 *         description: Resultado creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resultado'
 *
 * /resultados/{id}:
 *   get:
 *     summary: Obtiene un resultado por ID
 *     tags: [Resultados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del resultado
 *     responses:
 *       200:
 *         description: Resultado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resultado'
 *       404:
 *         description: Resultado no encontrado
 *   put:
 *     summary: Actualiza un resultado por ID
 *     tags: [Resultados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del resultado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resultado'
 *     responses:
 *       200:
 *         description: Resultado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resultado'
 *       404:
 *         description: Resultado no encontrado
 *   delete:
 *     summary: Elimina un resultado por ID
 *     tags: [Resultados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del resultado
 *     responses:
 *       204:
 *         description: Resultado eliminado
 *       404:
 *         description: Resultado no encontrado
 */
