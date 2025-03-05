import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * @swagger
 * /vehicule:
 *   post:
 *     summary: Create a new vehicule
 *     description: Creates a new vehicle in the system with the provided details
 *     tags: 
 *      - Vehicles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicule'
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle created successfully"
 *       500:
 *         description: Server error
 */
router.post('/vehicule', vehiculeController.createVehicule);

export default router;