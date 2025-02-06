import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';

const router = express.Router();

router.delete('/vehicule/:id', vehiculeController.deleteVehiculeById)

export default router;
