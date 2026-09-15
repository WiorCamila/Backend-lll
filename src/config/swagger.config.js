import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ShipNow API',
            version: '1.0.0',
            description: 'Documentación oficial de la API de envíos, productos, órdenes y usuarios.'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local'
            }
        ]
    },
    apis: ['./src/docs/*.yaml']
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);