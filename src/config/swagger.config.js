import swaggerJSDoc from "swagger-jsdoc"

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ShipNow API - Documentación',
            version: '1.0.0',
            description: 'API RESTful para la gestión de envíos, usuarios, pedidos y entregas en ShipNow.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local de Desarrollo'
            }
        ],
        tags: [
            { name: 'Users', description: 'Gestión de usuarios y roles' },
            { name: 'Products', description: 'Gestión del catálogo de productos' },
            { name: 'Orders', description: 'Gestión de pedidos de envío' },
            { name: 'Deliveries', description: 'Asignación y seguimiento de entregas' },
            { name: 'Mocks', description: 'Generación de datos simulados y carga masiva' },
            { name: 'Logger', description: 'Herramienta de diagnóstico y prueba de logs' }
        ]
    },
    apis: ['./src/docs/*.yaml', './src/docs/**/*.yaml']
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);