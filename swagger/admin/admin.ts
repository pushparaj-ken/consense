/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminLoginBody:
 *       type: object
 *       required:
 *         - USER_EMAIL
 *         - USER_PASSWORD 
 *       properties:
 *         USER_EMAIL:
 *           type: string
 *           example: admin@gmail.com
 *         USER_PASSWORD:
 *           type: string
 *           example: 123456
 *     AdminRegisterBody:
 *       type: object
 *       required:
 *         - USER_FIRSTNAME
 *         - USER_LASTNAME 
 *         - USER_PASSWORD
 *         - USER_EMAIL 
 *         - USER_PHONENO
 *         - ROLE_ID
 *       properties:
 *         USER_FIRSTNAME:
 *           type: string
 *           example: smaple Name
 *         USER_LASTNAME:
 *           type: string
 *           example: smaple Name
 *         USER_PASSWORD:
 *           type: string
 *           example: 123456
 *         USER_EMAIL:
 *           type: string
 *           example: admin@gmail.com
 *         USER_PHONENO:
 *           type: number
 *           example: 9876543210
 *         ROLE_ID:
 *           type: number
 *           example: 1
 *     AdminUpdateBody:
 *       type: object
 *       required:
 *         - USER_FIRSTNAME
 *         - USER_LASTNAME 
 *         - USER_PHONENO
 *       properties:
 *         USER_FIRSTNAME:
 *           type: string
 *           example: smaple Name
 *         USER_LASTNAME:
 *           type: string
 *           example: smaple Name
 *         USER_PASSWORD:
 *           type: string
 *           example: 123456
 *         USER_PHONENO:
 *           type: number
 *           example: 9876543210
 *     AdminResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login
 *     tags: [Admin]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/AdminLoginBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register
 *     tags: [Admin]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/AdminRegisterBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */


/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Dashboard
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/updatepassword:
 *   put:
 *     summary: Update Password
 *     tags: [Admin]
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

/**
 * @swagger
 * /api/admin/damagelist:
 *   get:
 *     summary: Damage List
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: damageNo
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by damageNo
 *       - in: query
 *         name: driverId
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by driverId
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/sync-customers:
 *   get:
 *     summary: Sync Customers
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/sync-drivers:
 *   get:
 *     summary: Sync Drivers
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/refresh-token:
 *   post:
 *     summary: Refresh Token
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/get/{id}:
 *   get:
 *     summary: Get a Admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Admin ID.
 *     responses:
 *       200:
 *         description: Role data.
 */

/**
 * @swagger
 * /api/admin/update/{id}:
 *   put:
 *     summary: Update Admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUpdateBody'
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/admin/delete/{id}:
 *   delete:
 *     summary: Delete Admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/list:
 *   get:
 *     summary: List Admin
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: USER_ID
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter By user
 *       - in: query
 *         name: USER_EMAIL
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter By EMail
 *       - in: query
 *         name: USER_PHONENO
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter By phone
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