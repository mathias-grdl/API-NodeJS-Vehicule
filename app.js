import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import seedData from './data/seedData.js';
import { VehiculeAPIRoutes } from './routes/index.js';
import { vehiculesData } from './data/vehiculesData.js';

const app = express();

const seed = () => {
    vehiculesData.push(...seedData);
}

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

// Test route for API health check
app.get('/', (req, res) => {
    res.send('Vehicle Management API - Read Operations');
});

// Seed the data
seed();

// Initialize routes
VehiculeAPIRoutes(app);

export default app;