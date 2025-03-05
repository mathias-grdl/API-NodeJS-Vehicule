import Vehicule from "../models/vehiculeModel.js";

const seedData = [];

const brands = ["Toyota", "Mercedes", "BMW", "Audi", "Volkswagen", "Renault", "Peugeot", "Citroën"];
const models = {
    "Toyota": ["Corolla", "RAV4", "Yaris", "Camry"],
    "Mercedes": ["C-Class", "E-Class", "A-Class", "GLA"],
    "BMW": ["Serie 3", "Serie 5", "X3", "X5"],
    "Audi": ["A3", "A4", "Q3", "Q5"],
    "Volkswagen": ["Golf", "Polo", "Passat", "Tiguan"],
    "Renault": ["Clio", "Megane", "Captur", "Kadjar"],
    "Peugeot": ["208", "308", "3008", "5008"],
    "Citroën": ["C3", "C4", "C5", "C5 Aircross"]
};

function generateRandomLicensePlate() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let plate = "";
    for (let i = 0; i < 2; i++) {
        plate += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
        plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    for (let i = 0; i < 2; i++) {
        plate += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return plate;
}

function generateRandomYear() {
    return Math.floor(Math.random() * (2024 - 2015 + 1)) + 2015;
}

for (let i = 0; i < 5; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[brand][Math.floor(Math.random() * models[brand].length)];
    const rentalPricePerDay = Math.floor(Math.random() * 50000) + 15000;
    const licensePlate = generateRandomLicensePlate();
    const year = generateRandomYear();
    //     const vehicule = new Vehicule({
    //         brand,
    //         model,
    //         rentalPricePerDay,
    //         licensePlate,
    //         year
    //     });
    //     seedData.push(vehicule);
}

export default seedData;