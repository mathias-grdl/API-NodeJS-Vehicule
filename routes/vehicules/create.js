import express from 'express';
import { requireAuth } from '../../middleware/authentification.js';
import { createVehicule } from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * @swagger
 * /vehicule:
 *   post:
 *     summary: Create new vehicle
 *     description: Add a new vehicle to the database
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - licensePlate
 *               - year
 *               - rentalPrice
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               licensePlate:
 *                 type: string
 *               year:
 *                 type: number
 *               rentalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, vehiculeController.createVehicule);
export default router;