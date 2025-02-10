import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * @swagger
 * /vehicule/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     description: Deletes a vehicle from the system by its ID
 *     tags:
 *      - Vehicles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle deleted successfully"
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */

router.delete('/vehicule/:id', vehiculeController.deleteVehiculeById)

export default router;
