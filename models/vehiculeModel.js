import { v4 as uuidv4 } from 'uuid';

export default class Vehicule {
    constructor(vehicule) {
        if (typeof vehicule.brand !== 'string' || 
            typeof vehicule.model !== 'string' || 
            typeof vehicule.licensePlate !== 'string') {
            throw new Error('Invalid input data type');
        }
        if (typeof vehicule.year !== 'number' || 
            typeof vehicule.rentalPrice !== 'number') {
            throw new Error('Invalid input data type');
        }

        this.id = uuidv4();
        this.brand = vehicule.brand;
        this.model = vehicule.model;
        this.licensePlate = vehicule.licensePlate;
        this.year = vehicule.year;
        this.rentalPrice = vehicule.rentalPrice;
    }
}