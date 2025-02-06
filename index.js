import app from './app.js';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Connect to MongoDB before starting the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});