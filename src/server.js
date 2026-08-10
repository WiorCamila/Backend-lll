import app from "./app.js"
import mongoose from 'mongoose'
import { logger } from "./utils/logger.js"

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        logger.info('🌱 Conexión a MongoDB establecida');
        
        app.listen(PORT, () => {
            logger.info(`🚀 Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        logger.fatal(`❌ Falló la conexión inicial con MongoDB: ${error.message}`);
        process.exit(1);
    });