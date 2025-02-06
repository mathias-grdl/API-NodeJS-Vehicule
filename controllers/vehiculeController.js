import Vehicule from '../models/vehiculeModel.js';
import { vehiculesData } from '../data/vehiculesData.js';

function createVehicule(req, res) {
    try {
        const { brand, model, licensePlate, year, rentalPrice } = req.body;

        // Enhanced validation
        const requiredFields = ['brand', 'model', 'licensePlate', 'year', 'rentalPrice'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                error: `Missing fields: ${missingFields.join(', ')}`,
            });
        }

        // Validate year format
        if (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid year format',
                error: 'Year must be a valid number between 1900 and current year',
            });
        }

        // Check for duplicate license plate
        const existingVehicle = vehiculesData.find(v => v.licensePlate === req.body.licensePlate);
        if (existingVehicle) {
            return res.status(409).json({
                success: false,
                message: 'Vehicle with this license plate already exists',
                error: 'Duplicate license plate',
            });
        }

        // Create new vehicle using the Vehicule class
        const vehicule = new Vehicule(req.body);
        vehiculesData.push(vehicule);

        return res.status(201).json({
            success: true,
            message: 'Vehicle created successfully',
            data: vehicule,
        });
    } catch (error) {
        console.error('Error creating vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}

function readVehicules(req, res) {
    try {
        return res.status(200).json({
            success: true,
            count: vehiculesData.length,
            data: vehiculesData
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

function readVehiculeById(req, res) {
    try {
        const vehicule = vehiculesData.find(v => v.id === req.params.id);

        if (!vehicule) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
                error: 'Vehicle with this ID does not exist'
            });
        }

        return res.status(200).json({
            success: true,
            data: vehicule
        });
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

function readVehiculeByImmatriculation(req, res) {
    try {
        const vehicule = vehiculesData.find(
            v => v.licensePlate === req.params.immatriculation
        );

        if (!vehicule) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
                error: 'Vehicle with this license plate does not exist'
            });
        }

        return res.status(200).json({
            success: true,
            data: vehicule
        });
    } catch (error) {
        console.error('Error searching vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

function readVehiculeByMaxPrice(req, res) {
    try {
        const maxPrice = parseFloat(req.params.max);

        if (isNaN(maxPrice)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid price value',
                error: 'Price must be a number'
            });
        }

        const vehicules = vehiculesData.filter(v => v.rentalPrice <= maxPrice);

        return res.status(200).json({
            success: true,
            count: vehicules.length,
            data: vehicules
        });
    } catch (error) {
        console.error('Error fetching vehicles by price:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

function updateVehiculeById(req, res) {
    try {
        const { brand, model, licensePlate, year, rentalPrice } = req.body;

        // Validate data types if provided
        if (brand && typeof brand !== 'string' ||
            model && typeof model !== 'string' ||
            licensePlate && typeof licensePlate !== 'string' ||
            year && !Number.isInteger(year) ||
            rentalPrice && typeof rentalPrice !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'Invalid data types',
                error: 'Please check the data types of your inputs'
            });
        }

        // Validate year if provided
        if (year && (year < 1900 || year > new Date().getFullYear())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid year',
                error: 'Year must be between 1900 and current year'
            });
        }

        const index = vehiculesData.findIndex(v => v.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
                error: 'Vehicle with this ID does not exist'
            });
        }

        // Check for duplicate license plate if it's being updated
        if (licensePlate) {
            const duplicatePlate = vehiculesData.find(v =>
                v.licensePlate === licensePlate && v.id !== req.params.id
            );
            if (duplicatePlate) {
                return res.status(409).json({
                    success: false,
                    message: 'License plate already exists',
                    error: 'Cannot update to an existing license plate'
                });
            }
        }

        // Update vehicle
        const updatedVehicle = { ...vehiculesData[index], ...req.body };
        vehiculesData[index] = updatedVehicle;

        return res.status(200).json({
            success: true,
            message: 'Vehicle updated successfully',
            data: updatedVehicle
        });
    } catch (error) {
        console.error('Error updating vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

function deleteVehiculeById(req, res) {
    try {
        const index = vehiculesData.findIndex(v => v.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
                error: 'Vehicle with this ID does not exist'
            });
        }

        // Remove vehicle and store it
        const deletedVehicle = vehiculesData.splice(index, 1)[0];

        // Return 200 to show the deleted vehicle
        return res.status(200).json({
            success: true,
            message: 'Vehicle deleted successfully',
            data: deletedVehicle
        });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

export default {
    createVehicule,
    readVehicules,
    readVehiculeById,
    readVehiculeByImmatriculation,
    readVehiculeByMaxPrice,
    updateVehiculeById,
    deleteVehiculeById
}