/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Cars management
 */


/**
 * @swagger
 * /api/users/cars/carkmstand:
 *   post:
 *     summary: Cars KM Stand
 *     tags: [Cars]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carid:
 *                 type: string
 *                 example: 2321adada
 *               carno:
 *                 type: string
 *                 example: DC25W
 *     responses:
 *       200:
 *         description: Data Saved Success
 */
