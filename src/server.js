import { envConfig } from "./config/env.config.js"
import app from "./app.js"
import mongoose from 'mongoose'
import { logger } from "./utils/logger.js"

mongoose.connect(envConfig.MONGODB_URI)
    .then(() => {
        logger.info('🌱 Conexión a MongoDB establecida')
        
        app.listen(envConfig.PORT, () => {
            logger.info(`🚀 Servidor escuchando en el puerto ${envConfig.PORT}`)
        });
    })
    .catch((error) => {
        logger.fatal(`❌ Falló la conexión inicial con MongoDB: ${error.message}`)
        process.exit(1);
    });