import app from "./app.js"
import mongoose from "mongoose"
import { envConfig } from "./config/env.config.js"

const PORT = envConfig.PORT || 3000;
const MONGO_URI = envConfig.MONGODB_URI

mongoose.connect(envConfig.MONGODB_URI)
    .then(() => {
        console.log('🌱 Conexión exitosa a MongoDB');
        
        app.listen(envConfig.PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${envConfig.PORT}`)
        });
    })
    .catch((error) => {
        console.error('❌ Error al conectar a MongoDB:', error.message)
    });
