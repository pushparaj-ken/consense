/**
 * @swagger
 * tags:
 *   name: Vehicle
 *   description: Vehicle management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VehicleRequestBody:
 *       type: object
 *       required:
 *         - VEHICLE_CUSTOMERID
 *         - VEHICLE_DRIVERID
 *         - VEHICLE_NAME 
 *         - VEHICLE_VIN
 *       properties:
 *         VEHICLE_CUSTOMERID:
 *           type: number
 *           example: 1
 *         VEHICLE_DRIVERID:
 *           type: number
 *           example: 1
 *         VEHICLE_NAME:
 *           type: string
 *           example: T
 *         VEHICLE_VIN:
 *           type: string
 *           example: sample
 *         VEHICLE_REGISTRATIONNO:
 *           type: string
 *         VEHICLE_MAKE:
 *           type: string
 *         VEHICLE_MODEL:
 *           type: string
 *         VEHICLE_YEAR:
 *           type: string
 *         VEHICLE_COLOR:
 *           type: string
 *         VEHICLE_TYPE:
 *           type: string
 *         VEHICLE_CAPACITY:
 *           type: string
 *         VEHICLE_FUELTYPE:
 *           type: string
 *         VEHICLE_ENGINENO:
 *           type: string
 *         VEHICLEDETAIL_LASTMAINTENANCEDATE:
 *           type: date
 *           example: 2024-07-18 10:00:00
 *         VEHICLEDETAIL_NEXTMAINTENANCEDATE:
 *           type: date
 *           example: 2024-07-18 10:00:00
 *         VEHICLEDETAIL_INSURANCEPOLICYNO:
 *           type: string
 *         VEHICLEDETAIL_INSURANCEEXPIARYDATE:
 *           type: date
 *           example: 2024-07-18 10:00:00
 *         VEHICLEDETAIL_REGISTRATIONEXPIARYDATE:
 *           type: date
 *           example: 2024-07-18 10:00:00
 *         VEHICLEDETAIL_INSECPTIONEXPIARYDATE:
 *           type: date
 *           example: 2024-07-18 10:00:00
 *     AdminResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */



/**
 * @swagger
 * /api/admin/vehicle/add:
 *   post:
 *     summary: Add Vehicle
 *     tags: [Vehicle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/vehicle/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicle]
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
 * /api/admin/vehicle/update/{id}:
 *   put:
 *     summary: Update Vehicle
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/admin/vehicle/delete/{id}:
 *   delete:
 *     summary: Delete Vehicle
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/vehicle/list:
 *   get:
 *     summary: List Vehicle
 *     tags: [Vehicle]
 *     parameters:
 *       - in: query
 *         name: VEHICLE_ID
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Vehicle VEHICLE_ID
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