import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import { VehiculeAPIRoutes } from './routes/index.js';
import swaggerSetup from './swagger.js';

const app = express();


app.use(bodyParser.json());

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            destination: 1
        }
    },
});

app.use(pinoHttp({ logger }));

//swaggerUi
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
 *               type: string
 *               example: "Vehicle Management API - Read Operations"
 *       500:
 *         description: Server error
 */
app.get('/', (req, res) => {
    res.send('Vehicle Management API - Read Operations');
});

// Initialize routes
VehiculeAPIRoutes(app);

export default app;