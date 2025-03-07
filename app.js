import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import { APIRoutes } from './routes/index.js';
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

APIRoutes(app);

export default app;