import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import { VehiculeAPIRoutes } from './routes/index.js';
import swaggerSetup from './swagger.js';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

const logger = pino({
    level: process.env.LOG_LEVEL || 'info'
});

app.use(pinoHttp({ logger }));

swaggerSetup(app);

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
app.get('/', (req, res) => {
    res.json({
        message: 'Vehicle Management API - Read Operations',
        version: '1.0.0',
        status: 'running'
    });
});

app.get('/test', (req, res) => {
    res.json({ status: 'API is working' });
});

VehiculeAPIRoutes(app);

export default app;