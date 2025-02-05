import { v4 as uuidv4 } from 'uuid';

export default class Vehicule {
    constructor(vehicule) {
        this.id = uuidv4();
        this.brand = vehicule.brand;
        this.model = vehicule.model;
        this.registrationNo = vehicule.registrationNo;
        this.year = vehicule.year;
        this.rentalPrice = vehicule.rentalPrice;
    }
}