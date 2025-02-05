import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import { pinoHttp } from 'pino-http';


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

//logger pino
app.use(pinoHttp({ logger }));

// Main route - API Test
app.get('/', (req, res) => {
    res.send('vehicule Management API');
});

// Create a new vehicle
app.post('/vehicule', (req, res) => {
    res.send('Create a new vehicule');
});

// Get list of all vehicles
app.get('/vehicules', (req, res) => {
    res.send('Get list of all vehicules');
});

// Get vehicle by ID
app.get('/vehicule/:id', (req, res) => {
    res.send('Get vehicule by ID');
});

// Update a vehicle
app.put('/vehicule/:id', (req, res) => {
    res.send('Update a vehicules');
});

// Delete a vehicle
app.delete('/vehicule/:id', (req, res) => {
    res.send('Delete a vehicule');
});

// Search vehicle by registration number
app.get('/vehicule/search/:immatriculation', (req, res) => {
    res.send('Search vehicule by registration number');
});

// Get vehicles by price range
app.get('/vehicule/price/:max', (req, res) => {
    res.send('Get vehicule by price range');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});