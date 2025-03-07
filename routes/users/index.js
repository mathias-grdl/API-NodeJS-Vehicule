import express from 'express';
import createUserRoute from './create.js';
import loginRoute from './read.js';

const router = express.Router();

router.use([
    createUserRoute,
    loginRoute,
]);

export default router;