import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from "../app.js"

describe('Suite de Tests Funcionales - ShipNow API', () => {

    beforeEach(async () => {
        if (mongoose.connection.readyState === 1) {
            const collections = mongoose.connection.collections;
            for (const key in collections) {
                await collections[key].deleteMany({});
            }
        }
    });

    describe('Endpoints /api/users', () => {
        it('GET /api/users - Debería obtener la lista de usuarios (200 OK)', async () => {
            const response = await request(app).get('/api/users');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.payload).to.be.an('array');
        });

        it('POST /api/users - Debería crear un usuario correctamente (201 Created)', async () => {
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
                .send(newUser);

            expect(response.status).to.equal(201);
        });

        it('POST /api/users - Debería responder 400 Bad Request al enviar datos incompletos', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({});

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error');
        });

        it('POST /api/users/:uid/documents - Debería subir un documento correctamente (200 OK)', async () => {
            const userRes = await request(app).post('/api/users').send({
                name: "Usuario Documentos",
                first_name: "Usuario",
                last_name: "Documentos",
                email: "docs.user@shipnow.com",
                password: "password123",
                role: "USER"
            });

            const userId = userRes.body.payload._id;
            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .field('docType', 'identification')
                .attach('document', Buffer.from('contenido de prueba en pdf'), 'documento-test.pdf');

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.payload).to.have.property('docType', 'identification');
            expect(response.body.payload).to.have.property('filename');
        });

        it('POST /api/users/:uid/documents - Debería responder 400 Bad Request si no se adjunta archivo', async () => {
            const fakeId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .post(`/api/users/${fakeId}/documents`)
                .field('docType', 'identification');

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('status', 'error');
            expect(response.body.error).to.equal('El archivo es obligatorio.');
        });
    });

    describe('Endpoints /api/products', () => {
        it('GET /api/products - Debería obtener el catálogo de productos (200 OK)', async () => {
            const response = await request(app).get('/api/products');
            expect(response.status).to.equal(200);
        });

        it('POST /api/products - Debería crear un producto exitosamente (201 Created)', async () => {
            const newProduct = {
                title: "Caja Grande Express",
                description: "Caja reforzada para envíos",
                price: 3500,
                code: "PKG-TEST-01",
                stock: 20
            };

            const response = await request(app)
                .post('/api/products')
                .send(newProduct);

            expect(response.status).to.equal(201);
        });

        it('POST /api/products - Debería responder 400 Bad Request si faltan campos obligatorios', async () => {
            const response = await request(app)
                .post('/api/products')
                .send({ price: 100 });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('status', 'error');
        });
    });

    describe('Endpoints /api/orders & /api/deliveries', () => {
        it('GET /api/orders - Debería obtener la lista de pedidos (200 OK)', async () => {
            const response = await request(app).get('/api/orders');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.payload).to.be.an('array');
        });

        it('GET /api/deliveries - Debería obtener la lista de entregas (200 OK)', async () => {
            const response = await request(app).get('/api/deliveries');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.payload).to.be.an('array');
        });

        it('GET /api/orders/:id - Debería responder 404 Not Found ante un ID inexistente', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app).get(`/api/orders/${fakeId}`);

            expect(response.status).to.equal(404);
        });
    });

    describe('Endpoints de Apoyo, Mocks y Documentación', () => {
        it('POST /api/mocks/generateData - Debería responder 201 Created tras generar datos', async () => {
            const response = await request(app)
                .post('/api/mocks/generateData')
                .send({ users: 5, products: 5 });

            expect(response.status).to.equal(201);
        });

        it('GET /loggerTest - Debería ejecutar el test de logs correctamente (200 OK)', async () => {
            const response = await request(app).get('/loggerTest');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
        });

        it('GET /api/docs/ - Debería responder la interfaz de Swagger UI (200 OK)', async () => {
            const response = await request(app).get('/api/docs/');
            expect(response.status).to.equal(200);
        });

        it('GET /api/ruta-inexistente - Debería responder 404 Not Found', async () => {
            const response = await request(app).get('/api/ruta-inexistente-12345');
            expect(response.status).to.equal(404);
        });
    });
});