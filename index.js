import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import seedData from './data/seedData.js';
import Vehicule from './models/vehiculeModel.js';


const vehiculesData = [];

const seed = () => {
    vehiculesData.push(...seedData);
}

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

// seed des données
seed();

// Main route - API Test
app.get('/', (req, res) => {
    res.send('vehicule Management API');
});

// Create a new vehicle
app.post('/vehicule', (req, res) => {
    try {
        const { brand, model, licensePlate, year, rentalPrice } = req.body;

        // Validate required fields
        if (!brand || !model || !licensePlate || !year || !rentalPrice) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                error: 'All fields are mandatory'
            });
        }

        // Check for duplicate license plate
        const existingVehicle = vehiculesData.find(v => v.licensePlate === licensePlate);
        if (existingVehicle) {
            return res.status(409).json({
                success: false,
                message: 'Vehicle with this license plate already exists',
                error: 'Duplicate license plate'
            });
        }

        // Create new vehicle by passing the request body directly
        const vehicule = new Vehicule(req.body);
        vehiculesData.push(vehicule);

        // Return success response with created vehicle
        return res.status(201).json({
            success: true,
            message: 'Vehicle created successfully',
            data: vehicule
        });
    }
    catch (error) {
        console.error('Error creating vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get list of all vehicles
app.get('/vehicules', (req, res) => {
    try {
        const vehicules = vehiculesData

        if (!vehicules || vehicules.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No vehicles found',
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            count: vehicules.length,
            data: vehicules
        });
    }
    catch (error) {
        console.error('Error fetching vehicles:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Update a vehicle
app.put('/vehicule/:id', (req, res) => {

    try {
        const index = vehiculesData.findIndex(vehicule => vehicule.id === req.params.id);
        if (index !== -1) {
            vehiculesData[index] = { ...vehiculesData[index], ...req.body };
            // res.send(vehiculesData[index]);
            res.status(200).json({
                success: true,
                message: 'Vehicle updated successfully',
                data: vehiculesData[index]
            });

        }
        return res.status(404).json({
            success: false,
            message: 'Vehicle not found',
            error: 'Vehicle with this ID does not exist'
        });
    }
    catch (error) {
        console.error('Error updating vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Delete a vehicle
app.delete('/vehicule/:id', (req, res) => {
    try {
        const index = vehiculesData.findIndex(v => v.id === req.params.id);
        if (index !== -1) {
            const deletedVehicule = vehiculesData.splice(index, 1)[0];
            return res.status(204).json({
                success: true,
                message: 'Vehicle deleted successfully',
                data: deletedVehicule
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Vehicle not found',
            error: 'Vehicle with this ID does not exist',
            data: null
        });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
            data: null
        });
    }
});

// Get vehicle by ID
app.get('/vehicule/:id', (req, res) => {
    try {
        const vehicule = vehiculesData.find(v => v.id === req.params.id);
        if (vehicule) {
            return res.status(200).json({
                success: true,
                message: 'Vehicle found',
                data: vehicule
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Vehicle not found',
            error: 'Vehicle with this ID does not exist',
            data: null
        });
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
            data: null
        });
    }
});

// Search vehicle by registration number
app.get('/vehicule/search/:immatriculation', (req, res) => {
    try {
        const vehicule = vehiculesData.find(v => v.licensePlate === req.params.immatriculation);
        if (vehicule) {
            return res.status(200).json({
                success: true,
                message: 'Vehicle found',
                data: vehicule
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Vehicle not found',
            error: 'Vehicle with this license plate does not exist',
            data: null
        });
    } catch (error) {
        console.error('Error searching vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
            data: null
        });
    }
});

// Get vehicles by price range
app.get('/vehicule/price/:max', (req, res) => {
    try {
        const maxPrice = parseInt(req.params.max);
        if (isNaN(maxPrice)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid price value',
                error: 'Price must be a number',
                data: null
            });
        }

        const vehicules = vehiculesData.filter(v => v.rentalPrice <= maxPrice);
        if (vehicules.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'Vehicles found',
                data: vehicules
            });
        }
        return res.status(404).json({
            success: false,
            message: 'No vehicles found in this price range',
            data: []
        });
    } catch (error) {
        console.error('Error fetching vehicles by price:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
            data: null
        });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});