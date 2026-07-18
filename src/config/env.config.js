import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!process.env.PORT) process.env.PORT = '3000';
if (!process.env.MONGODB_URI) process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/shipnow';
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const requiredVariables = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        throw new Error(`❌ CONFIG ERROR: La variable de entorno '${variable}' es obligatoria en el archivo .env`);
    }
}

export const envConfig = Object.freeze({
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV
});