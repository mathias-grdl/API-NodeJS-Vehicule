import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * Update a vehicle by ID
 * @route PUT /vehicule/:id
 */
router.put('/vehicule/:id', vehiculeController.updateVehiculeById)

export default router;
