import request from 'supertest';
import express from 'express';
import router from '../../../routes/vehicules/index.js';

describe('Vehicle Router Index', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(router);
    });

    test('should combine all vehicle routes', () => {
        const routes = router.stack
            .filter(layer => layer.route || (layer.name === 'router'))
            .reduce((acc, layer) => {
                if (layer.route) {
                    acc.push(layer.route.path);
                } else if (layer.name === 'router') {
                    const paths = layer.handle.stack
                        .filter(r => r.route)
                        .map(r => r.route.path);
                    acc.push(...paths);
                }
                return acc;
            }, []);

        expect(routes).toEqual(
            expect.arrayContaining([
                '/vehicules',
                '/vehicule/:id',
                '/vehicule/search/:licensePlate',
                '/vehicule/price/:max'
            ])
        );
    });

    test('should have correct HTTP methods', () => {
        const methods = new Set();
        
        const findMethods = (stack) => {
            stack.forEach(layer => {
                if (layer.route) {
                    Object.keys(layer.route.methods).forEach(method => {
                        methods.add(method.toLowerCase());
                    });
                } else if (layer.name === 'router') {
                    findMethods(layer.handle.stack);
                }
            });
        };

        findMethods(router.stack);

        expect(Array.from(methods)).toEqual(
            expect.arrayContaining(['get', 'post', 'put', 'delete'])
        );
    });
});
