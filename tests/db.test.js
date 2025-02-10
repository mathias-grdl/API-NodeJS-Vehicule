import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

describe('Database Connection Tests', () => {
    let client;

    beforeEach(() => {
        client = new MongoClient(process.env.MONGODB_URI);
    });

    afterEach(async () => {
        if (client) {
            await client.close();
        }
    });

    test('should connect to database successfully', async () => {
        await client.connect();
        const result = await client.db("admin").command({ ping: 1 });
        expect(result).toEqual({ ok: 1 });
    });

    test('should throw error with invalid connection string', async () => {
        const invalidClient = new MongoClient('mongodb://nonexistent:27017/test', {
            serverSelectionTimeoutMS: 1000,
        });
        
        try {
            await invalidClient.connect();
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.message).toMatch(/Server selection timed out/);
        } finally {
            await invalidClient.close();
        }
    });
});
