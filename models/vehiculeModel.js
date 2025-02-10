import mongoose from 'mongoose';

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