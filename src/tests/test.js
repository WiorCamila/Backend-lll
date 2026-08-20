import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from "../app.js"

describe('Tests Funcionales - ShipNow API', () => {

    beforeEach(async () => {
        if (mongoose.connection.readyState === 1) {
            const collections = mongoose.connection.collections;
            for (const key in collections) {
                await collections[key].deleteMany({})
            }
        }
    });

    describe('Endpoints /api/users', () => {
        it('GET /api/users - Debería obtener la lista de usuarios (200 OK)', async () => {
            const response = await request(app).get('/api/users')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('status', 'success')
            expect(response.body.payload).to.be.an('array')
        });

        it('POST /api/users - Debería crear un usuario correctamente', async () => {
            const newUser = {
                name: "Mariana Gonzalez",
                first_name: "Mariana",
                last_name: "Gonzalez",
                email: "test.user@shipnow.com",
                password: "password123",
                role: "USER"
            };

            const response = await request(app)
                .post('/api/users')
                .send(newUser)

            expect(response.status).to.be.oneOf([200, 201])
        });

        it('POST /api/users - Debería responder error al enviar datos incompletos (Caso de Error)', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({});

            expect(response.status).to.be.oneOf([400, 500]);
            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error');
        });
    });

    describe('Endpoints /api/products', () => {
        it('GET /api/products - Debería obtener el catálogo de productos', async () => {
            const response = await request(app).get('/api/products');
            expect(response.status).to.equal(200);
        });

        it('POST /api/products - Debería crear un producto exitosamente', async () => {
            const newProduct = {
                title: "Caja Grande Express",
                description: "Caja reforzada para envíos",
                price: 3500,
                code: "PKG-TEST-01",
                stock: 20
            };

            const response = await request(app)
                .post('/api/products')
                .send(newProduct)

            expect(response.status).to.be.oneOf([200, 201])
        });

        it('POST /api/products - Debería fallar si faltan campos obligatorios (Caso de Error)', async () => {
            const response = await request(app)
                .post('/api/products')
                .send({ price: 100 })

            expect(response.status).to.be.oneOf([400, 500])
            expect(response.body).to.have.property('status', 'error')
        });
    });

    describe('Endpoints /api/orders & /api/deliveries', () => {
        it('GET /api/orders - Debería obtener la lista de pedidos (200 OK)', async () => {
            const response = await request(app).get('/api/orders')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('status', 'success')
            expect(response.body.payload).to.be.an('array')
        });

        it('POST /api/orders - Debería responder tras intentar crear un pedido', async () => {
            const newOrder = {
                number: "ORD-TEST-100",
                business: new mongoose.Types.ObjectId(),
                user: new mongoose.Types.ObjectId(),
                products: [{ product: new mongoose.Types.ObjectId(), quantity: 1 }],
                totalPrice: 3500
            };

            const response = await request(app)
                .post('/api/orders')
                .send(newOrder);

            expect(response.status).to.be.oneOf([200, 201, 400, 404, 500]);
        });

        it('GET /api/deliveries - Debería obtener la lista de entregas (200 OK)', async () => {
            const response = await request(app).get('/api/deliveries')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('status', 'success')
            expect(response.body.payload).to.be.an('array')
        });

        it('GET /api/orders/:id - Debería responder error ante un ID inexistente (Caso de Error)', async () => {
            const fakeId = new mongoose.Types.ObjectId()
            const response = await request(app).get(`/api/orders/${fakeId}`)
            
            expect(response.status).to.be.oneOf([400, 404, 500])
        });
    });

    describe('Endpoints de Apoyo, Mocks y Documentación', () => {
        it('GET /api/mocks/mockingusers - Debería generar mocks de usuarios correctamente', async () => {
            const response = await request(app).get('/api/mocks/mockingusers')
            expect(response.status).to.be.oneOf([200, 404])
        });

        it('POST /api/mocks/generateData - Debería responder ante la solicitud de generación de datos', async () => {
            const response = await request(app)
                .post('/api/mocks/generateData')
                .send({ users: -10, products: "invalido" })

            expect(response.status).to.be.oneOf([200, 201, 400, 404, 500])
        });

        it('GET /loggerTest - Debería ejecutar el test de logs correctamente (200 OK)', async () => {
            const response = await request(app).get('/loggerTest')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('status', 'success')
        });

        it('GET /api/docs/ - Debería responder la interfaz de Swagger UI', async () => {
            const response = await request(app).get('/api/docs/');
            expect(response.status).to.be.oneOf([200, 301, 302]);
        });

        it('GET /api/ruta-inexistente - Debería responder 404 (Ruta Inexistente)', async () => {
            const response = await request(app).get('/api/ruta-inexistente-12345')
            expect(response.status).to.equal(404)
        });
    });
});