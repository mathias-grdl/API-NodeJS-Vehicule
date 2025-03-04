import serverless from 'serverless-http';
import mongoose from 'mongoose';
import pino from 'pino';
import app from '../../app.js';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info'
});

let conn = null;

const connectDB = async () => {
    if (!conn) {
        try {
            logger.info('Attempting MongoDB connection...');
            conn = await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 10000,
                connectTimeoutMS: 5000
            });
            logger.info('MongoDB connected successfully');
        } catch (error) {
            logger.error({ err: error }, 'MongoDB connection error');
            conn = null;
            throw error;
        }
    }
    return conn;
};

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        logger.info({
            path: event.path,
            method: event.httpMethod
        }, 'Handler invoked');

        await connectDB();
        const handler = serverless(app);
        const result = await handler(event, context);
        
        logger.info({
            statusCode: result.statusCode,
            path: event.path
        }, 'Request completed');
        
        return result;
    } catch (error) {
        logger.error({ err: error }, 'Handler error');
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Database connection failed',
                details: error.message
            })
        };
    }
};