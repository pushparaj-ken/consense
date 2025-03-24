/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BookingRequestBody:
 *       type: object
 *       required:
 *         - BOOKING_VEHICLEID
 *         - BOOKING_STARTDATE
 *         - BOOKING_ENDDATE
 *       properties:
 *         BOOKING_VEHICLEID:
 *           type: number
 *           example: 2569
 *         BOOKING_STARTDATE:
 *           type: string  # Date should be string type for Swagger
 *           example: "2024-07-21 08:00:00"
 *         BOOKING_ENDDATE:
 *           type: string  # Date should be string type for Swagger
 *           example: "2024-07-25 17:00:00"
*         generalInformation:
*            type: object
*            properties:
*              BOOKING_COSTCENTER:
*                type: string
*                example : costCenter
*              BOOKING_TRAVELREASON:
*                type: string
*                example : travelReason
*              BOOKING_DEPARTMENT: 
*                type: string
*                example : department
*              BOOKING_PROJECT: 
*                type: string
*                example : project
 *         passenger:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *              BOOKINGPASSENGER_FIRSTNAME:
 *                type: string
 *                example : S
 *              BOOKINGPASSENGER_LASTNAME:
 *                type: string
 *                example : lastName
 *              BOOKINGPASSENGER_DEPARTMENT: 
 *                type: string
 *                example : department
 *              BOOKINGPASSENGER_PROJECT: 
 *                type: string
 *                example : project
 *         licenseDetails:
*            type: object
*            properties:
*              BOOKING_LICENSENO:
*                type: string
*                example : licenseNumber
*              BOOKING_LICENSEVEHICLECLASS:
*                type: string
*                example : vehicleClass
*              BOOKING_LICENSEDATEOFISSUE: 
*                type: date
*                example : 2024-01-03 13:12:01
*              BOOKING_LICENSEEXPIRYDATE: 
*                type: date
*                example : 2024-01-03 13:12:01
*              BOOKING_LICENSECOUNTRYISSUE:
*                type: string
*                example : countryIssue
*              BOOKING_LICENSEPLACEOFISSUE:
*                type: string
*                example : placeOfIssue
 *     ReturnVehicleBody:
 *       type: object
 *       properties:
 *         BOOKING_VEHICLEID:
 *           type: number
 *           example: 2569
 *         BOOKINGRETURN_VEHICLEMILEAGE:
 *           type: number
 *           example: 15
 *         BOOKINGRETURN_VEHICLELOCATION:
 *           type: string
 *           example: guindy
 *         BOOKINGRETURN_VEHICLEANYDAMAGE: 
 *           type: string
 *           example: yes
 *         BOOKING_ID: 
 *           type: number
 *           example:  1
 *     BookingResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/fleet/booking/book:
 *   post:
 *     summary: Add Booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/fleet/booking/update/{id}:
 *   put:
 *     summary: Update Booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/fleet/booking/delete/{id}:
 *   delete:
 *     summary: Delete Booking
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/fleet/booking/list:
 *   get:
 *     summary: List Booking
 *     tags: [Booking]
 *     parameters:
 *       - in: query
 *         name: BOOKING_ID
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Booking by id
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           example: 20
 *         required: false
 *         description: No of Records
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           example: 1
 *         required: false
 *         description: page No
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *         required: false
 *         description: Sort the results in ascending (asc) or descending (desc) order.
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/fleet/booking/availability:
 *   get:
 *     summary: List availability
 *     tags: [Booking]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2024-07-16 10:00:00
 *         required: false
 *         description: Filter Booking by startDate
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2024-07-18 10:00:00
 *         required: false
 *         description: Filter Booking by endDate
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           example: 20
 *         required: false
 *         description: No of Records
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           example: 1
 *         required: false
 *         description: page No
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *         required: false
 *         description: Sort the results in ascending (asc) or descending (desc) order.
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/fleet/booking/updatereturn:
 *   post:
 *     summary: Add Booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReturnVehicleBody'
 *     responses:
 *       200:
 *         description: Success
 */
