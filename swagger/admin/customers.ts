/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customers management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomersRequestBody:
 *       type: object
 *       required:
 *         - CUSTOMER_EMAIL
 *         - CUSTOMER_FIRSTNAME
 *         - CUSTOMER_LASTNAME 
 *         - CUSTOMER_COMPANYNAME
 *         - CUSTOMER_PASSWORD
 *       properties:
 *         CUSTOMER_EMAIL:
 *           type: string
 *           example: sadmin@gmail.com
 *         CUSTOMER_FIRSTNAME:
 *           type: string
 *           example: Test
 *         CUSTOMER_LASTNAME:
 *           type: string
 *           example: T
 *         CUSTOMER_COMPANYNAME:
 *           type: string
 *           example: sample
 *         CUSTOMER_PASSWORD:
 *           type: string
 *           example: Sampl@1234
 *     AdminResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */



/**
 * @swagger
 * /api/admin/customers/add:
 *   post:
 *     summary: Add Customers
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomersRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/customers/{id}:
 *   get:
 *     summary: Get a customers by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The role ID.
 *     responses:
 *       200:
 *         description: Role data.
 */

/**
 * @swagger
 * /api/admin/customers/update/{id}:
 *   put:
 *     summary: Update Customers
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customers ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomersRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/admin/customers/delete/{id}:
 *   delete:
 *     summary: Delete Customers
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customers ID
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/customers/list:
 *   get:
 *     summary: List Customers
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: CUSTOMER_ID
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Customers CUSTOMER_ID
 *       - in: query
 *         name: CUSTOMER_CODE
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Customers CUSTOMER_CODE
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