import express from 'express';
import { requireAuth } from '../../middleware/authentification.js';
import { readVehicules, readVehiculeById, readVehiculeByLicensePlate, readVehiculeByPrice } from '../../controllers/vehiculeController.js';

const router = express.Router();
/**
 * @swagger
 * /vehicule:
 *   get:
 *     summary: Get all vehicles
 *     description: Retrieve a list of all vehicles in the system
 *     tags:
 *       - Vehicles
 *     responses:
 *       200:
 *         description: List of vehicles retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', vehiculeController.readVehicules);

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
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id', vehiculeController.readVehiculeById);

/**
 * @swagger
 * /vehicule/search/{licensePlate}:
 *   get:
 *     summary: Search vehicle by license plate
 *     description: Find a vehicle by its license plate number
 *     tags:
 *       - Vehicles
 *     parameters:
 *       - in: path
 *         name: licensePlate
 *         required: true
 *         schema:
 *           type: string
 *         description: License plate number
 *     responses:
 *       200:
 *         description: Vehicle found successfully
 *       404:
 *         description: No vehicle found with this license plate
 */
router.get('/search/:licensePlate', vehiculeController.readVehiculeByLicensePlate);

/**
 * @swagger
 * /vehicule/price/{max}:
 *   get:
 *     summary: Get vehicles by maximum price
 *     description: Filter vehicles by a maximum rental price value
 *     tags:
 *       - Vehicles
 *     parameters:
 *       - in: path
 *         name: max
 *         required: true
 *         schema:
 *           type: number
 *         description: Maximum rental price
 *     responses:
 *       200:
 *         description: Vehicles retrieved successfully
 *       404:
 *         description: No vehicles found within price range
 */
router.get('/price/:max', vehiculeController.readVehiculeByMaxPrice);
export default router;