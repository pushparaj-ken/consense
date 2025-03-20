/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsersRegisterBody:
 *       type: object
 *       required:
 *         - CUSTOMER_CODE
 *         - DRIVER_FIRSTNAME
 *         - DRIVER_LASTNAME
 *         - DRIVER_ADDRESS1
 *         - DRIVER_ADDRESS2
 *         - DRIVER_ADDRESS3
 *         - DRIVER_ADDRESS4 
 *         - DRIVER_EMAIL
 *         - DRIVER_PASSWORD 
 *         - DRIVER_PHONENO
 *         - DRIVER_COUNTRYCODE 
 *       properties:
 *         CUSTOMER_CODE:
 *           type: number
 *           example: 98765432
 *         DRIVER_FIRSTNAME:
 *           type: string
 *           example: smaple Name
 *         DRIVER_LASTNAME:
 *           type: string
 *           example: last Name
 *         DRIVER_ADDRESS1:
 *           type: string
 *           example: StraBeundHausnummer
 *         DRIVER_ADDRESS2:
 *           type: string
 *           example: zugehorigesUnternehmen
 *         DRIVER_EMAIL:
 *           type: string
 *           example: admin@gmail.com
 *         DRIVER_PASSWORD:
 *           type: string
 *           example: 123456
 *         DRIVER_ADDRESS3:
 *           type: number
 *           example: 600015
 *         DRIVER_ADDRESS4:
 *           type: string
 *           example: Ort
 *         DRIVER_PHONENO:
 *           type: string
 *           example: 9876543210
 *         DRIVER_COUNTRYCODE:
 *           type: string
 *           example: "+91"
 *     Usersupdateprofile:
 *       type: object
 *       required:
 *         - DRIVER_FIRSTNAME
 *         - DRIVER_LASTNAME
 *         - DRIVER_ADDRESS1
 *         - DRIVER_ADDRESS2
 *         - DRIVER_ADDRESS3
 *         - DRIVER_ADDRESS4
 *         - DRIVER_EMAIL
 *         - DRIVER_PHONENO
 *         - DRIVER_COUNTRYCODE 
 *         - DRIVER_PASSWORD 
 *       properties:
 *         DRIVER_FIRSTNAME:
 *           type: string
 *           example: smaple Name
 *         DRIVER_LASTNAME:
 *           type: string
 *           example: last Name
 *         DRIVER_ADDRESS1:
 *           type: string
 *           example: StraBeundHausnummer
 *         DRIVER_ADDRESS2:
 *           type: string
 *           example: zugehorigesUnternehmen
 *         DRIVER_EMAIL:
 *           type: string
 *           example: admin@gmail.com
 *         DRIVER_ADDRESS3:
 *           type: number
 *           example: 600015
 *         DRIVER_ADDRESS4:
 *           type: string
 *           example: Ort
 *         DRIVER_PHONENO:
 *           type: number
 *           example: 9876543210
 *         DRIVER_COUNTRYCODE:
 *           type: string
 *           example: "+91"
 *         DRIVER_PASSWORD:
 *           type: string
 *           example: 123456
 *     UsersLoginBody:
 *       type: object
 *       required:
 *         - DRIVER_EMAIL
 *         - DRIVER_PASSWORD 
 *         - CUSTOMER_CODE 
 *       properties:
 *         DRIVER_EMAIL:
 *           type: string
 *           example: admin@gmail.com
 *         DRIVER_PASSWORD:
 *           type: string
 *           example: 123456
 *         CUSTOMER_CODE:
 *           type: string
 *           example: 98765432
 *     UsersResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/fleet/register:
 *   post:
 *     summary: Register
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersRegisterBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/fleet/login:
 *   post:
 *     summary: login
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersLoginBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/fleet/updateprofile:
 *   put:
 *     summary: Update Users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usersupdateprofile'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/fleet/profile:
 *   get:
 *     summary: List Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/fleet/password:
 *   put:
 *     summary: Update Password
 *     tags: [Users]
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
 *                 example: 123456
 *             
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/fleet/sendemail:
 *   post:
 *     summary: Send Email
 *     tags: [Users]
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
 * /api/fleet/verifyemail:
 *   put:
 *     summary: Verify Email
 *     tags: [Users]
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
 *                 example: 1428582
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/fleet/refresh-token:
 *   post:
 *     summary: Refresh Token
 *     tags: [Users]
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