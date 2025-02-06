import express from 'express';
import vehiculeController from '../../controllers/vehiculeController.js';

const router = express.Router();

router.post('/vehicule', vehiculeController.createVehicule)


export default router;