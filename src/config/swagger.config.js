import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ShipNow API',
            version: '1.0.0',
            description: 'Documentación de la API de envíos y gestión de usuarios'
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '660a871a5d8b6898b45c1c5a' },
                        first_name: { type: 'string', example: 'Mariana' },
                        last_name: { type: 'string', example: 'Gonzalez' },
                        email: { type: 'string', example: 'marianagonzalez@example.com' },
                        role: { type: 'string', example: 'user' },
                        documents: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string', example: 'identification' },
                                    reference: { type: 'string', example: '/uploads/documents/id.pdf' }
                                }
                            }
                        }
                    }
                },
                Delivery: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '660a871a5d8b6898b45c1c5b' },
                        order: { type: 'string', example: '660a871a5d8b6898b45c1c5c' },
                        address: { type: 'string', example: 'Av. Corrientes 1234' },
                        status: { type: 'string', example: 'pending' },
                        trackingCode: { type: 'string', example: 'SN-98765432' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'error' },
                        error: { type: 'string', example: 'NotFoundError' },
                        message: { type: 'string', example: 'El recurso solicitado no existe.' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);