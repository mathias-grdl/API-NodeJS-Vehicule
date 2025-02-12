import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vehicles API',
            version: '1.0.0',
            description: 'A simple Express Vehicles API',
        },
        servers: [
            {
                url: 'https://api-vehicles-nodejs.netlify.app',
                description: 'Production server',
            },
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ]
    },
    apis: ['./models/**/*.js', './app.js', './routes/**/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerSetup = (app) => {
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-feeling-blue.css'
    }));

    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

export default swaggerSetup;