/**
 * @swagger
 * tags:
 *   name: Userslocation
 *   description: Userslocation management
 */

/**
 * @swagger
 * /api/fleet/location/getlocation:
 *   get:
 *     summary: List location
 *     tags: [Userslocation]
 *     parameters:
 *       - in: query
 *         name: LOCATION_TYPE
 *         schema:
 *           LOCATION_TYPE: string
 *         required: false
 *         description: type
 *       - in: query
 *         name: LOCATION_NAME
 *         schema:
 *           LOCATION_TYPE: string
 *         required: false
 *         description: type
 *     responses:
 *       200:
 *         description: Success
 */