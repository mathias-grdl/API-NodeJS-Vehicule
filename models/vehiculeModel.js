import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicule:
 *       type: object
 *       required:
 *         - brand
 *         - model
 *         - licensePlate
 *         - year
 *         - rentalPrice
 *       properties:
 *         brand:
 *           type: string
 *           description: The brand of the vehicle
 *         model:
 *           type: string
 *           description: The model of the vehicle
 *         licensePlate:
 *           type: string
 *           description: The license plate of the vehicle
 *         year:
 *           type: integer
 *           description: The year of the vehicle
 *         rentalPrice:
 *           type: number
 *           description: The rental price of the vehicle
 *       example:
 *         brand: Toyota
 *         model: Corolla
 *         licensePlate: 123ABC
 *         year: 2019
 *         rentalPrice: 50
 */

const VehiculeSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },
    rentalPrice: {
        type: Number,
        required: true,
        min: 0,
    }
},
    {
        timestamps: true
    });

const VehiculeModel = mongoose.model('Vehicules', VehiculeSchema);
export default VehiculeModel;