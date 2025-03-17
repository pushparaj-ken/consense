/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: Driver management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DriverRequestBody:
 *       type: object
 *       required:
 *         - DRIVER_FIRSTNAME
 *         - DRIVER_LASTNAME
 *         - DRIVER_EMAIL
 *         - DRIVER_CUSTOMERID
 *         - DRIVER_PASSWORD
 *       properties:
 *         DRIVER_FIRSTNAME:
 *           type: string
 *           example: First Name
 *         DRIVER_LASTNAME:
 *           type: string
 *           example: Company Name
 *         DRIVER_EMAIL:
 *           type: string
 *           example: sample@gmail.com
 *         DRIVER_CUSTOMERID:
 *           type: number
 *           example: 12
 *         DRIVER_PASSWORD:
 *           type: string
 *           example: Abcd@1234$
 *     DriverResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */



/**
 * @swagger
 * /api/admin/driver/add:
 *   post:
 *     summary: Add Driver
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/admin/driver/{id}:
 *   put:
 *     summary: Update Driver
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Driver ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/admin/driver/delete/{id}:
 *   delete:
 *     summary: Delete Driver
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/driver/list:
 *   get:
 *     summary: List Driver
 *     tags: [Driver]
 *     parameters:
 *       - in: query
 *         name: DRIVER_CUSTOMERID
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter By customers
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         required: false
 *         description: No of records
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: false
 *         description: page no
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/driver/sendemail:
 *   post:
 *     summary: Send Email
 *     tags: [Driver]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *     responses:
 *       200:
 *         description: Data Saved Success
 */


/**
 * @swagger
 * /api/admin/driver/verifyemail:
 *   post:
 *     summary: Verify Email
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               code:
 *                 type: number
 *                 example: 1565758
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/admin/updatepassword:
 *   put:
 *     summary: Update Password
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: 123456
 *               cpassword:
 *                 type: string
 *                 example: 123456s     
 *     responses:
 *       200:
 *         description: Success
 */