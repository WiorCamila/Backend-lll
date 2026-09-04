import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const PORT = process.env.PORT || '3000';
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shipnow'

process.env.PORT = PORT;
process.env.NODE_ENV = NODE_ENV;
process.env.MONGODB_URI = MONGODB_URI;

const requiredVariables = ['PORT', 'MONGODB_URI', 'NODE_ENV']

for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        console.error(`❌ CONFIG ERROR: La variable de entorno '${variable}' es obligatoria.`)
        process.exit(1);
    }
}

export const envConfig = Object.freeze({
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV
});