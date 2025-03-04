import vehiculeRoutes from './vehicules/index.js';

export const VehiculeAPIRoutes = (app) => {
    app.use('/', vehiculeRoutes);
};