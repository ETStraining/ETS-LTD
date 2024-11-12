import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

const PORT: number = 3000;
const ProdURL = process.env.ProdURL;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ETS LTD',
            version: '2.1.7',
            description: 'API documentation for ETS API',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server',
            },
            {
                url: `${ProdURL}`,
                description: 'Production server',
            },
        ],
    },
    apis: ['./src/docs/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;