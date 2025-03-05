import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicule from '../../../models/vehiculeModel.js';

dotenv.config();

describe('GET /vehicule routes', () => {
    let connection;
    let testVehicules;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGODB_URI);
    });

    beforeEach(async () => {
        testVehicules = [
            {
                brand: 'Brand1',
                model: 'Model1',
                licensePlate: 'READ1',
                year: 2020,
                rentalPricePerDay: 100
            },
            {
                brand: 'Brand2',
                model: 'Model2',
                licensePlate: 'READ2',
                year: 2021,
                rentalPricePerDay: 150
            },
            {
                brand: 'Brand3',
                model: 'Model3',
                licensePlate: 'READ3',
                year: 2022,
                rentalPricePerDay: 200
            }
        ];

        await Vehicule.insertMany(testVehicules);
    });

    afterEach(async () => {
        await Vehicule.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should get all vehicles', async () => {
        const vehicles = await Vehicule.find();
        expect(vehicles).toHaveLength(3);
        expect(vehicles[0].brand).toBe('Brand1');
        expect(vehicles[1].brand).toBe('Brand2');
        expect(vehicles[2].brand).toBe('Brand3');
    });

    test('should get vehicle by ID', async () => {
        const vehicle = await Vehicule.findOne({ licensePlate: 'READ1' });
        const foundVehicle = await Vehicule.findById(vehicle._id);

        expect(foundVehicle).toBeTruthy();
        expect(foundVehicle.brand).toBe('Brand1');
        expect(foundVehicle.licensePlate).toBe('READ1');
    });

    test('should return null for non-existent ID', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const vehicle = await Vehicule.findById(fakeId);
        expect(vehicle).toBeNull();
    });

    test('should get vehicle by license plate', async () => {
        const vehicle = await Vehicule.findOne({ licensePlate: 'READ2' });
        expect(vehicle).toBeTruthy();
        expect(vehicle.brand).toBe('Brand2');
        expect(vehicle.model).toBe('Model2');
    });

    test('should return null for non-existent license plate', async () => {
        const vehicle = await Vehicule.findOne({ licensePlate: 'NOTEXIST' });
        expect(vehicle).toBeNull();
    });

    test('should get vehicles by max price', async () => {
        const vehicles = await Vehicule.find({ rentalPricePerDay: { $lte: 150 } });
        expect(vehicles).toHaveLength(2);
        expect(vehicles[0].rentalPricePerDay).toBeLessThanOrEqual(150);
        expect(vehicles[1].rentalPricePerDay).toBeLessThanOrEqual(150);
    });

    test('should return empty array when no vehicles below max price', async () => {
        const vehicles = await Vehicule.find({ rentalPricePerDay: { $lte: 50 } });
        expect(vehicles).toHaveLength(0);
    });
});
