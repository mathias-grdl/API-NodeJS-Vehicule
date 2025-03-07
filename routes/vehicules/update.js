import express from 'express';
import { requireAuth } from '../../middleware/authentification.js';
import { updateVehicule } from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * @swagger
 * /vehicule/{id}:
 *   put:
 *     summary: Update a vehicle
 *     description: Update an existing vehicle by ID
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
router.put('/:id', requireAuth, vehiculeController.updateVehiculeById);
export default router;