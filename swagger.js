import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Vehicle API Propelize",
            version: "1.0.0",
            description: "Express API for vehicle rentals",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development Server"
            },
            {
                url: "url-server-production",
                description: "Production Server"
            },
        ],
    },
    apis: [
        "./models/VehiculeModel.js",
        "./routes/**/*.js",
        "./app.js",
    ],
};

const specs = swaggerJSDoc(options);

export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}