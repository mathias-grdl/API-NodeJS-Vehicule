import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';
import { requireAuth } from '../../middleware/authentification.js';

const router = express.Router();

// Public routes
router.get('/', vehiculeController.readVehicules);
// Special routes must come BEFORE the parameterized routes
router.get('/search/:licensePlate', vehiculeController.readVehiculeByLicensePlate);
router.get('/price/:max', vehiculeController.readVehiculeByMaxPrice);
// Generic ID route should come AFTER special routes
router.get('/:id', vehiculeController.readVehiculeById);

// Protected routes
router.post('/', requireAuth, vehiculeController.createVehicule);
router.put('/:id', requireAuth, vehiculeController.updateVehiculeById);
router.delete('/:id', requireAuth, vehiculeController.deleteVehiculeById);

export default router;