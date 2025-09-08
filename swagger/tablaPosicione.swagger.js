/**
 * @swagger
 * components:
 *   schemas:
 *     TablaPosicione:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         temporada_id:
 *           type: integer
 *         equipo_id:
 *           type: integer
 *         puntos:
 *           type: integer
 *         goles_a_favor:
 *           type: integer
 *         goles_en_contra:
 *           type: integer
 *       required:
 *         - temporada_id
 *         - equipo_id
 */

/**
 * @swagger
 * /tabla-posiciones:
 *   get:
 *     summary: Obtener todas las posiciones
 *     tags: [TablaPosicione]
 *     responses:
 *       200:
 *         description: Lista de posiciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TablaPosicione'
 *   post:
 *     summary: Crear una posición
 *     tags: [TablaPosicione]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TablaPosicione'
 *     responses:
 *       201:
 *         description: Posición creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TablaPosicione'
 */

/**
 * @swagger
 * /tabla-posiciones/{id}:
 *   get:
 *     summary: Obtener una posición por ID
 *     tags: [TablaPosicione]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la posición
 *     responses:
 *       200:
 *         description: Una posición
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TablaPosicione'
 *       404:
 *         description: No encontrado
 *   put:
 *     summary: Actualizar una posición
 *     tags: [TablaPosicione]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la posición
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TablaPosicione'
 *     responses:
 *       200:
 *         description: Posición actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TablaPosicione'
 *       404:
 *         description: No encontrado
 *   delete:
 *     summary: Eliminar una posición
 *     tags: [TablaPosicione]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la posición
 *     responses:
 *       200:
 *         description: Posición eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar la posición"
 *               required:
 *                 - success
 *                 - message
 */