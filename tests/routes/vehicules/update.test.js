import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicule from '../../../models/vehiculeModel.js';

dotenv.config();

describe('PUT /vehicule/:id', () => {
    let connection;
    let testVehicule;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGODB_URI);
    });

    beforeEach(async () => {
        testVehicule = new Vehicule({
            brand: 'Test Brand',
            model: 'Test Model',
            licensePlate: 'UPDATE1',
            year: 2020,
            rentalPricePerDay: 100
        });
        await testVehicule.save();
    });

    afterEach(async () => {
        await Vehicule.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should update vehicle successfully', async () => {
        const updateData = {
            brand: 'Updated Brand',
            rentalPricePerDay: 150
        };

        const response = await Vehicule.findByIdAndUpdate(
            testVehicule._id,
            updateData,
            { new: true }
        );

        expect(response).toBeTruthy();
        expect(response.brand).toBe('Updated Brand');
        expect(response.rentalPricePerDay).toBe(150);
        expect(response.model).toBe('Test Model');
    });

    test('should return null when trying to update non-existent vehicle', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const updateData = { brand: 'Updated Brand' };

        const response = await Vehicule.findByIdAndUpdate(fakeId, updateData, { new: true });
        expect(response).toBeNull();
    });

    test('should throw error with invalid data', async () => {
        const invalidData = {
            year: 'invalid-year'
        };

        try {
            await Vehicule.findByIdAndUpdate(testVehicule._id, invalidData, { new: true });
            fail('Should have thrown an error');
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.name).toBe('CastError');
        }
    });

    test('should validate required fields', async () => {
        const invalidData = {
            brand: '',
            rentalPricePerDay: -100
        };

        try {
            await Vehicule.findByIdAndUpdate(testVehicule._id, invalidData, {
                new: true,
                runValidators: true
            });
            fail('Should have thrown a validation error');
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.name).toBe('ValidationError');
        }
    });
});
