import express from 'express';
import createVehiculeRoute from './create.js';
import readVehiculeRoute from './read.js';
import updateVehiculeRoute from './update.js';
import deleteVehiculeRoute from './delete.js';

const router = express.Router();

router.use([
    createVehiculeRoute,
    readVehiculeRoute,
    updateVehiculeRoute,
    deleteVehiculeRoute
]);

export default router;
