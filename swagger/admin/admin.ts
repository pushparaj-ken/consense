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
 *         name: userId
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by userId
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * tags:
 *   name: Vehicle
 *   description: Vehicle management
 */

