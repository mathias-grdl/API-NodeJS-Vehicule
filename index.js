import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Configure mongoose
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Connect to MongoDB before starting the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Handle application termination
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (error) {
        console.error('Error during MongoDB disconnection:', error);
        process.exit(1);
    }
});