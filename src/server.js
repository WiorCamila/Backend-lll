import app from "./app.js"
import mongoose from 'mongoose'
import { logger } from "./utils/logger.js"

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // 2. Usás logger.info para eventos exitosos
        logger.info('🌱 Conexión a MongoDB establecida');
        
        app.listen(PORT, () => {
            logger.info(`🚀 Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        // 3. Usás logger.fatal para fallas críticas de arranque
        logger.fatal(`❌ Falló la conexión inicial con MongoDB: ${error.message}`);
        process.exit(1);
    });