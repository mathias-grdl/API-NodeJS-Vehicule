import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * @swagger
 * /vehicules:
 *   get:
 *     summary: Get all vehicles
 *     description: Retrieve a list of all vehicles in the system
 *     tags:
 *       - Vehicles
 *     responses:
 *       200:
 *         description: List of vehicles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicule'
 *       500:
 *         description: Server error
 */

router.get('/vehicules', vehiculeController.readVehicules)

/**
 * @swagger
 * /vehicule/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     description: Retrieve a specific vehicle by its ID
 *     tags:
 *       - Vehicles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicule'
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */

router.get('/vehicule/:id', vehiculeController.readVehiculeById)

/**
 * @swagger
 * /vehicule/search/{licensePlate}:
 *   get:
 *     summary: Search vehicle by license plate
 *     description: Find a vehicle using its license plate number
 *     tags:
 *       - Vehicles
 *     parameters:
 *       - in: path
 *         name: licensePlate
 *         required: true
 *         description: License plate number to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicule'
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */

router.get('/vehicule/search/:licensePlate', vehiculeController.readVehiculeByLicensePlate)

/**
 * @swagger
 * /vehicule/price/{max}:
 *   get:
 *     summary: Get vehicles by maximum price
 *     description: Retrieve all vehicles with a rental price below the specified maximum
 *     tags:
 *       - Vehicles
 *     parameters:
 *       - in: path
 *         name: max
 *         required: true
 *         description: Maximum rental price
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of vehicles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicule'
 *       400:
 *         description: Invalid maximum price
 *       500:
 *         description: Server error
 */

router.get('/vehicule/price/:max', vehiculeController.readVehiculeByMaxPrice)

const readVehiculeRouter = router;
export default readVehiculeRouter;