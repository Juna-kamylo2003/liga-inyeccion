/**
 * @swagger
 * tags:
 *   name: Ligas
 *   description: Gestión de ligas
 */
/**
 * @swagger
 * /ligas:
 *   get:
 *     summary: Obtiene todas las ligas
 *     tags: [Ligas]
 *     responses:
 *       200:
 *         description: Lista de ligas
 *   post:
 *     summary: Crea una nueva liga
 *     tags: [Ligas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Liga'
 *     responses:
 *       201:
 *         description: Liga creada
 *
 * /ligas/{id}:
 *   get:
 *     summary: Obtiene una liga por ID
 *     tags: [Ligas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liga encontrada
 *       404:
 *         description: Liga no encontrada
 *   put:
 *     summary: Actualiza una liga
 *     tags: [Ligas]
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
 *             $ref: '#/components/schemas/Liga'
 *     responses:
 *       200:
 *         description: Liga actualizada
 *       404:
 *         description: Liga no encontrada
 *   delete:
 *     summary: Elimina una liga
 *     tags: [Ligas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liga eliminada
 *       404:
 *         description: Liga no encontrada
 *
 * components:
 *   schemas:
 *     Liga:
 *       type: object
 *       required:
 *         - nombre
 *         - pais
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         pais:
 *           type: string
 *         creada_en:
 *           type: string
 *           format: date
 */
