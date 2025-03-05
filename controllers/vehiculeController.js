import Vehicule from '../models/vehiculeModel.js';

async function createVehicule(req, res) {
    const data = req.body;
    try {
        const vehicule = new Vehicule(data);
        await vehicule.save();

        res.status(201).json({
            success: true,
            message: 'Vehicle created successfully',
            data: vehicule
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

async function readVehicules(req, res) {
    try {
        const vehicules = await Vehicule.find();
        return res.status(200).json({
            success: true,
            count: vehicules.length,
            data: vehicules
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

async function readVehiculeById(req, res) {
    try {
        const vehicule = await Vehicule.findById(req.params.id);
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

async function readVehiculeByLicensePlate(req, res) {
    try {
        const vehicule = await Vehicule.findOne({
            licensePlate: req.params.licensePlate
        });
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

async function readVehiculeByMaxPrice(req, res) {
    try {
        const maxPrice = parseFloat(req.params.max);
        if (isNaN(maxPrice)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid price value',
                error: 'Price must be a number'
            });
        }
        const vehicules = await Vehicule.find({ rentalPricePerDayPerDay: { $lte: maxPrice } });
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

async function updateVehiculeById(req, res) {
    try {
        const updatedVehicle = await Vehicule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
                error: 'Vehicle with this ID does not exist'
            });
        }

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

async function deleteVehiculeById(req, res) {
    try {
        const deletedVehicle = await Vehicule.findByIdAndDelete(req.params.id);

        if (!deletedVehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
                error: 'Vehicle with this ID does not exist'
            });
        }

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
    readVehiculeByLicensePlate,
    readVehiculeByMaxPrice,
    updateVehiculeById,
    deleteVehiculeById
}