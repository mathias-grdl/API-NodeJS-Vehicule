import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicule from '../../../models/vehiculeModel.js';

dotenv.config();

describe('DELETE /vehicule/:id', () => {
    let connection;
    let testVehicule;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGODB_URI);
    });

    beforeEach(async () => {
        testVehicule = new Vehicule({
            brand: 'Test Brand',
            model: 'Test Model',
            licensePlate: 'DELETE1',
            year: 2020,
            rentalPrice: 100
        });
        await testVehicule.save();
    });

    afterEach(async () => {
        await Vehicule.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should delete vehicle successfully', async () => {
        const response = await Vehicule.findByIdAndDelete(testVehicule._id);
        expect(response).toBeTruthy();
        expect(response.brand).toBe('Test Brand');

        const deletedVehicule = await Vehicule.findById(testVehicule._id);
        expect(deletedVehicule).toBeNull();
    });

    test('should return null when trying to delete non-existent vehicle', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const response = await Vehicule.findByIdAndDelete(fakeId);
        expect(response).toBeNull();
    });

    test('should throw error with invalid ID format', async () => {
        const invalidId = 'invalid-id';

        try {
            await Vehicule.findByIdAndDelete(invalidId);
            fail('Should have thrown an error');
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.name).toBe('CastError');
        }
    });
});
