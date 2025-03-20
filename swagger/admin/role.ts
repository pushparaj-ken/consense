/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Roles management
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - ROLES_NAME
 *       properties:
 *         ROLES_NAME:
 *           type: string
 *           description: The name of the role.
 *           enum:
 *             - Admin
 *             - Fleet
 *             - Driver
 *             - Customer
 *           example: Admin
 *         ROLES_DESCRIPTION:
 *           type: string
 *           description: The role's description.
 *           example: Administrator role with full access.
 * 
 *     AssignRole:
 *       type: object
 *       required:
 *         - DRIVER_ID
 *         - ROLE_ID
 *       properties:
 *         DRIVER_ID:
 *           type: number
 *           description: The ID of the user being assigned a role.
 *           example: 1
 *         ROLE_ID:
 *           type: number
 *           description: The ID of the role being assigned.
 *           example: 1
 */



/**
 * @swagger
 * /api/admin/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: The created role.
 */

/**
 * @swagger
 * /api/admin/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of all roles.
 */

/**
 * @swagger
 * /api/admin/roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
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
 * /api/admin/roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The role ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: The updated role.
 */

/**
 * @swagger
 * /api/admin/roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The role ID.
 *     responses:
 *       204:
 *         description: Role deleted.
 */

/**
 * @swagger
 * /api/admin/roles/assign-role:
 *   post:
 *     summary: Assign a Role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignRole'
 *     responses:
 *       200:
 *         description: Assign a Role.
 */