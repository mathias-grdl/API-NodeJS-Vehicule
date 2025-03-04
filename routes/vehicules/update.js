import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * @swagger
 * /vehicule/{id}:
 *   put:
 *     summary: Update a vehicle
 *     description: Updates an existing vehicle's information in the system
 *     tags:
 *      - Vehicles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicule'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle updated successfully"
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */

router.put('/vehicule/:id', vehiculeController.updateVehiculeById)

export default router;
