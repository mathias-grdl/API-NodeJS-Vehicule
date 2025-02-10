import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicule from '../../../models/vehiculeModel.js';

dotenv.config();

describe('POST /vehicule', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGODB_URI);
    });

    afterEach(async () => {
        await Vehicule.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should create vehicle successfully', async () => {
        const vehiculeData = {
            brand: 'Test Brand',
            model: 'Test Model',
            licensePlate: 'CREATE1',
            year: 2020,
            rentalPrice: 100
        };

        const vehicule = new Vehicule(vehiculeData);
        const savedVehicule = await vehicule.save();

        expect(savedVehicule._id).toBeDefined();
        expect(savedVehicule.brand).toBe(vehiculeData.brand);
        expect(savedVehicule.model).toBe(vehiculeData.model);
        expect(savedVehicule.licensePlate).toBe(vehiculeData.licensePlate);
        expect(savedVehicule.year).toBe(vehiculeData.year);
        expect(savedVehicule.rentalPrice).toBe(vehiculeData.rentalPrice);
    });

    test('should fail when required field is missing', async () => {
        const incompletVehicule = new Vehicule({
            brand: 'Test Brand',
        });

        try {
            await incompletVehicule.save();
            fail('Should have thrown a validation error');
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.name).toBe('ValidationError');
        }
    });

    test('should fail when license plate already exists', async () => {
        const vehiculeData = {
            brand: 'Test Brand',
            model: 'Test Model',
            licensePlate: 'CREATE2',
            year: 2020,
            rentalPrice: 100
        };

        await new Vehicule(vehiculeData).save();

        try {
            await new Vehicule(vehiculeData).save();
            fail('Should have thrown a duplicate key error');
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.code).toBe(11000);
        }
    });

    test('should fail with invalid year', async () => {
        const invalidVehicule = new Vehicule({
            brand: 'Test Brand',
            model: 'Test Model',
            licensePlate: 'TEST123',
            year: 1800,
            rentalPrice: 100
        });

        try {
            await invalidVehicule.save();
            fail('Should have thrown a validation error');
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.name).toBe('ValidationError');
        }
    });

    test('should fail with negative rental price', async () => {
        const invalidVehicule = new Vehicule({
            brand: 'Test Brand',
            model: 'Test Model',
            licensePlate: 'TEST123',
            year: 2020,
            rentalPrice: -50
        });

        try {
            await invalidVehicule.save();
            fail('Should have thrown a validation error');
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.name).toBe('ValidationError');
        }
    });
});
