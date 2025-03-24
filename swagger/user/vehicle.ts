/**
 * @swagger
 * tags:
 *   name: Vehicle
 *   description: Vehicle management
 */

/**
 * @swagger
 * /api/users/vehicle/list:
 *   get:
 *     summary: Vehicle List
 *     tags: [Vehicle]
 *     parameters:
 *       - in: query
 *         name: VEHICLE_ID
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Vehicle  by id
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           example: 20
 *         required: false
 *         description: No of Records
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           example: 1
 *         required: false
 *         description: page No
 *     responses:
 *       200:
 *         description: Success
 */