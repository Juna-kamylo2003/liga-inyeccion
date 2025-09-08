/**
 * @swagger
 * tags:
 *   name: Jugadores
 *   description: Gestión de jugadores
 */
/**
 * @swagger
 * /jugadores:
 *   get:
 *     summary: Obtiene todos los jugadores
 *     tags: [Jugadores]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 *   post:
 *     summary: Crea un nuevo jugador
 *     tags: [Jugadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jugador'
 *     responses:
 *       201:
 *         description: Jugador creado
 *
 * /jugadores/{id}:
 *   get:
 *     summary: Obtiene un jugador por ID
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugador encontrado
 *       404:
 *         description: Jugador no encontrado
 *   put:
 *     summary: Actualiza un jugador
 *     tags: [Jugadores]
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
 *             $ref: '#/components/schemas/Jugador'
 *     responses:
 *       200:
 *         description: Jugador actualizado
 *       404:
 *         description: Jugador no encontrado
 *   delete:
 *     summary: Elimina un jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugador eliminado
 *       404:
 *         description: Jugador no encontrado
 *
 * components:
 *   schemas:
 *     Jugador:
 *       type: object
 *       required:
 *         - nombre
 *         - posicion
 *         - edad
 *         - equipo_id
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         posicion:
 *           type: string
 *         edad:
 *           type: integer
 *         equipo_id:
 *           type: integer
 */
