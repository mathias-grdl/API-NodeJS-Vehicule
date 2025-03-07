import express from 'express';
import vehiculeRoutes from './vehicules/index.js';
import userRoutes from './users/index.js';

const mainRouter = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Health Check
 *     summary: API Entry Point
 *     description: Check API health status
 *     responses:
 *       200:
 *         description: API server is running normally
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 status:
 *                   type: string
 */
mainRouter.get('/', (req, res) => {
    res.json({
        message: 'Vehicle Management API - Read Operations',
        version: '1.0.0',
        status: 'running'
    });
});

mainRouter.get('/test', (req, res) => {
    res.json({ status: 'API is working' });
});

export const APIRoutes = (app) => {
    app.use('/', mainRouter);
    app.use('/vehicule', vehiculeRoutes); // Use plural form for RESTful convention
    app.use('/users', userRoutes);
};