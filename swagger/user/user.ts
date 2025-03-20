/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
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
 *           type: number
 *           example: 98765432
 *     UsersForgotPasswordBody:
 *       type: object
 *       required:
 *         - DRIVER_EMAIL  
 *       properties:
 *         DRIVER_EMAIL:
 *           type: string
 *           example: admin@gmail.com
 *     UsersPasswordBody:
 *       type: object
 *       required:
 *         - DRIVER_PASSWORD  
 *       properties:
 *         DRIVER_PASSWORD:
 *           type: string
 *           example: 123456
 *     UsersRegisterBody:
 *       type: object
 *       required:
 *         - DRIVER_FIRSTNAME
 *         - DRIVER_LASTNAME 
 *         - DRIVER_EMAIL
 *         - CUSTOMER_CODE
 *       properties:
 *         DRIVER_FIRSTNAME:
 *           type: string
 *           example: smaple Name
 *         DRIVER_LASTNAME:
 *           type: string
 *           example: company Name
 *         DRIVER_EMAIL:
 *           type: string
 *           example: admin@gmail.com
 *         CUSTOMER_CODE:
 *           type: number
 *           example: 98765432
 *     UsersverifyBody:
 *       type: object
 *       required:
 *         - CUSTOMER_CODE
 *       properties:
 *         CUSTOMER_CODE:
 *           type: string
 *           example: 123456 
 *     UpdateUsersBody:
 *       type: object
 *       required:
 *         - DRIVER_FIRSTNAME
 *         - DRIVER_LASTNAME
 *         - DRIVER_ADDRESS1
 *         - DRIVER_ADDRESS2
 *         - DRIVER_ADDRESS3
 *         - DRIVER_ADDRESS4
 *         - DRIVER_ZIPCODE
 *         - DRIVER_EMAIL
 *         - DRIVER_PHONENO
 *       properties:
 *         DRIVER_FIRSTNAME:
 *           type: string
 *           example: Vor Name
 *         DRIVER_LASTNAME:
 *           type: string
 *           example: nach Name
 *         DRIVER_ADDRESS1:
 *           type: string
 *           example: StraBeundHausnummer
 *         DRIVER_ADDRESS2:
 *           type: string
 *           example: Ort
 *         DRIVER_ADDRESS3:
 *           type: string
 *           example: Kennzeichen
 *         DRIVER_COUNTRYCODE:
 *           type: string
 *           example: "+91"
 *         DRIVER_EMAIL:
 *           type: string
 *           example: admin@gmail.com
 *         DRIVER_ZIPCODE:
 *           type: number
 *           example: 600015
 *         DRIVER_PHONENO:
 *           type: string
 *           example: 9876543210
 *     UsersResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/users/login:
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
 * /api/users/register:
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
 * /api/users/password:
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
 *                 example: 123456s     
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/users/forgotPassword:
 *   post:
 *     summary: Forgot Password
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersForgotPasswordBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/users/resetPassword/{token}:
 *   put:
 *     summary: Update Password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersPasswordBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/users/verify:
 *   post:
 *     summary: Verify
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersverifyBody'
 *     responses:
 *       200:
 *         description: Email verification successful
 */

/**
 * @swagger
 * /api/users/updateProfile:
 *   put:
 *     summary: Update Profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUsersBody'
 *     responses:
 *       200:
 *         description: Success
 */



/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/users/sendemail:
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
 * /api/users/verifyemail:
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
 * /api/users/refresh-token:
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