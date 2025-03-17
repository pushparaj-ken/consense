
/**
 * @swagger
 * tags:
 *   name: Adminlocation
 *   description: Adminlocation management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     locationRequestBody:
 *       type: object
 *       required:
 *         - LOCATION_NAME
 *         - LOCATION_TYPE
 *         - LOCATION_CUSTOMERID
 *       properties:
 *         LOCATION_NAME:
 *           type: string
 *           example: chennai
 *         LOCATION_TYPE:
 *           type: number
 *           example: 0
 *         LOCATION_CUSTOMERID:
 *           type: number
 *           example: 1
 *     locationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */
/**
 * @swagger
 * /api/admin/location:
 *   post:
 *     summary: Add location
 *     tags: [Adminlocation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/locationRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/admin/location/{id}:
 *   put:
 *     summary: Update location
 *     tags: [Adminlocation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/locationRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/location/{id}:
 *   get:
 *     summary: Get location
 *     tags: [Adminlocation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: location ID
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/location/{id}:
 *   delete:
 *     summary: Delete location
 *     tags: [Adminlocation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: location ID
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/admin/location/list:
 *   get:
 *     summary: List location
 *     tags: [Adminlocation]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter location by id
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter location by name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: type
 *     responses:
 *       200:
 *         description: Success
 */