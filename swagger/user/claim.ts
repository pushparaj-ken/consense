/**
 * @swagger
 * tags:
 *   name: Damage
 *   description: Damage management
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     PostDamageBody:
 *       type: object
 *       properties:
 *         damageType:
 *           type: string
 *           example: Person
 *           description: Type of Damage
 *         damageGroup:
 *           type: string
 *           example: Glass Break RockFall
 *           description: Damage Group
 *         causeOfDamage:
 *           type: string
 *           example: RockFall in field of vision
 *           description: Cause of Damage
 *         damageStatus:
 *           type: string
 *           example: Recorded
 *           description: Damage Status
 *         vehicleId:
 *           type: number
 *           example: 2
 *           description: Vehicle ID
 *         vehicleNo:
 *           type: string
 *           example: TN15U7396
 *           description: Vehicle Number
 *         damageDescription:
 *           type: string
 *           description: Description of Damage
 *         damageDate:
 *           type: date
 *           example: 2024-01-03 13:12:01
 *           description: Date/Time of Damage
 *         damageReportDate:
 *           type: date
 *           example: 2024-01-04 13:16:01
 *           description: Date/Time of Claim Notification
 *         street:
 *           type: string
 *           description: Street & House Number
 *         pincode:
 *           type: number
 *           description: Pincode
 *         city:
 *           type: string
 *           description: Location
 *         workshopInfo:
 *           type: string
 *           description: Further Information
 *         country:
 *           type: string
 *           description: Country
 *         mileage:
 *           type: number
 *           description: Mileage
 *         tripType:
 *           type: string
 *           description: Business Trip/Private Trip
 *         isAlcohol:
 *           type: string
 *           description: Yes/No
 *         party:
 *           type: string
 *           description: Yes/No
 *         police:
 *           type: string
 *           description: Yes/No
 *         parts:
 *           type: string
 *           description: Yes/No
 *         partyName:
 *           type: string
 *           description: Party Name
 *         partyAddress:
 *           type: string
 *           description: Party Address
 *         partyCompany:
 *           type: string
 *           description: Party Company
 *         partyEmail:
 *           type: string
 *           description: Party Email
 *         partyTelephone:
 *           type: string
 *           description: Party Telephone
 *         partyInsurance:
 *           type: string
 *           description: Party Insurance
 *         partyInsurancenumber:
 *           type: string
 *           description: Party Insurance Number
 *         policeInvestigationfileN:
 *           type: string
 *           description: Police Investigation File Number
 *         policeDiarynumber:
 *           type: string
 *           description: Police Diary Number
 *         policeDepartment:
 *           type: string
 *           description: Police Department
 *         policeStreet:
 *           type: string
 *           description: Police Street
 *         policePincode:
 *           type: number
 *           description: Police Pincode
 *         policeCity:
 *           type: string
 *           description: Police City
 *         parkingStreet:
 *           type: string
 *           description: Parking Street
 *         parkingPincode:
 *           type: number
 *           description: Parking Pincode
 *         parkingCity:
 *           type: string
 *           description: Parking City
 *         parkingWorkshopInfo:
 *           type: string
 *           description: Parking Workshop Info
 *         parkingCountry:
 *           type: string
 *           description: Parking Country
 *         frontViewLicencePlate:
 *           type: array
 *           example: ["https://placehold.jp/150x150.png","https://placehold.jp/250x250.png","https://placehold.jp/350x350.png"]
 *         vehicleDiagonal:
 *           type: array
 *           example: ["https://placehold.jp/150x150.png","https://placehold.jp/250x250.png","https://placehold.jp/350x350.png"]
 *         damageArea:
 *           type: array
 *           example: ["https://placehold.jp/150x150.png","https://placehold.jp/250x250.png","https://placehold.jp/350x350.png"]
 *         detailDamageArea:
 *           type: array
 *           example: ["https://placehold.jp/150x150.png","https://placehold.jp/250x250.png","https://placehold.jp/350x350.png"]
 *         registrationCertificate:
 *           type: array
 *           example: ["https://placehold.jp/150x150.png","https://placehold.jp/250x250.png","https://placehold.jp/350x350.png"]
 *         speedMeterMileage:
 *           type: array
 *           example: ["https://placehold.jp/150x150.png","https://placehold.jp/250x250.png","https://placehold.jp/350x350.png"]
 *         otherDamageDocument:
 *           type: array
 *           example: ["https://placehold.jp/150x150.png","https://placehold.jp/250x250.png","https://placehold.jp/350x350.png"]
 *         tire_Front_Left:
 *           type: number
 *           example: 0
 *         headlight_Front_Left:
 *           type: number
 *           example: 0
 *         rim_Front_Left:
 *           type: number
 *           example: 0
 *         bumper_Front_Left:
 *           type: number
 *           example: 0
 *         headlight_Front_Right:
 *           type: number
 *           example: 0
 *         rim_Front_Right:
 *           type: number
 *           example: 0
 *         tire_Front_Right:
 *           type: number
 *           example: 0
 *         fender_Left:
 *           type: number
 *           example: 0
 *         side_Mirror_Left:
 *           type: number
 *           example: 0
 *         door_Front_Left:
 *           type: number
 *           example: 0
 *         sill_Left:
 *           type: number
 *           example: 0
 *         door_Rear_Left:
 *           type: number
 *           example: 0
 *         side_Window_Rear_Left:
 *           type: number
 *           example: 0
 *         side_Panel_Rear_Left:
 *           type: number
 *           example: 0
 *         side_Window_Front_Left:
 *           type: number
 *           example: 0
 *         engine_Hood:
 *           type: number
 *           example: 0
 *         windshield:
 *           type: number
 *           example: 0
 *         roof:
 *           type: number
 *           example: 0
 *         window_Rear:
 *           type: number
 *           example: 0
 *         tailgate:
 *           type: number
 *           example: 0
 *         side_Window_Front_Right:
 *           type: number
 *           example: 0
 *         fender_Right:
 *           type: number
 *           example: 0
 *         side_Mirror_Right:
 *           type: number
 *           example: 0
 *         door_Front_Right:
 *           type: number
 *           example: 0
 *         sill_Right:
 *           type: number
 *           example: 0
 *         door_Rear_Right:
 *           type: number
 *           example: 0
 *         side_Window_Rear_Right:
 *           type: number
 *           example: 0
 *         sidePanel_Rear_Right:
 *           type: number
 *           example: 0
 *         tire_Rear_Left:
 *           type: number
 *           example: 0
 *         headlight_Rear_Left:
 *           type: number
 *           example: 0
 *         rim_Rear_Left:
 *           type: number
 *           example: 0
 *         bumper_Rear_Left:
 *           type: number
 *           example: 0
 *         headlight_Rear_Right:
 *           type: number
 *           example: 0
 *         rim_Rear_Right:
 *           type: number
 *           example: 0
 *         tire_Rear_Right:
 *           type: number
 *           example: 0
 *     UsersResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */


/**
 * @swagger
 * /api/users/damage/add:
 *   post:
 *     summary: Add Damage
 *     tags: [Damage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostDamageBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */


/**
 * @swagger
 * /api/users/damage/list:
 *   get:
 *     summary: List Damage
 *     tags: [Damage]
 *     parameters:
 *       - in: query
 *         name: damageNo
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by damageNo
 *     responses:
 *       200:
 *         description: Success
 */
