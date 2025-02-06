import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';

const router = express.Router();

/**
 * Get all vehicles
 * @route GET /vehicules
 */
router.get('/vehicules', vehiculeController.readVehicules)

/**
 * Get vehicle by ID
 * @route GET /vehicule/:id
 */
router.get('/vehicule/:id', vehiculeController.readVehiculeById)


/**
 * Search vehicle by license plate
 * @route GET /vehicule/search/:immatriculation
 */
router.get('/vehicule/search/:immatriculation', vehiculeController.readVehiculeByImmatriculation)


/**
 * Get vehicles by maximum price
 * @route GET /vehicule/price/:max
 */
router.get('/vehicule/price/:max', vehiculeController.readVehiculeByMaxPrice)


// Export with descriptive name
const readVehiculeRouter = router;
export default readVehiculeRouter;