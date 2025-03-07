import express from 'express';
import { requireAuth } from '../../middleware/authentification.js';
import { deleteVehicule } from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * @swagger
 * /vehicule/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     description: Remove a vehicle from the database by ID
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
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, vehiculeController.deleteVehiculeById);
export default router;