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
 *         - rentalPricePerDay
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
 *         rentalPricePerDay:
 *           type: number
 *           description: The rental price of the vehicle
 *         rentalDates:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date of the rental period
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date of the rental period
 *       example:
 *         brand: Toyota
 *         model: Corolla
 *         licensePlate: 123ABC
 *         year: 2019
 *         rentalPricePerDay: 50
 *         rentalDates: [
 *           {
 *             startDate: "2024-01-01T00:00:00Z",
 *             endDate: "2024-01-05T00:00:00Z"
 *           }
 *         ]
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
    rentalPricePerDay: {
        type: Number,
        required: true,
        min: 0,
    },
    rentalDates: {
        type: [{
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            }
        }],
        required: false,
        default: undefined
    }
}, {
    timestamps: true
});

const VehiculeModel = mongoose.model('Vehicules', VehiculeSchema);
export default VehiculeModel;