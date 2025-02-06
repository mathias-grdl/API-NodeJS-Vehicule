import { v4 as uuidv4 } from 'uuid';

export default class Vehicule {
    constructor({ brand, model, licensePlate, year, rentalPrice }) {
        if (typeof brand !== 'string' || 
            typeof model !== 'string' || 
            typeof licensePlate !== 'string') {
            throw new Error('Invalid input data type');
        }
        if (typeof year !== 'number' || 
            typeof rentalPrice !== 'number') {
            throw new Error('Invalid input data type');
        }

        this.id = uuidv4();
        this.brand = brand;
        this.model = model;
        this.licensePlate = licensePlate;
        this.year = year;
        this.rentalPrice = rentalPrice;
    }
}