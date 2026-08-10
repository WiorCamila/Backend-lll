import express from "express"
import { envConfig } from "./config/env.config.js"
import productRouter from "./routes/product.routes.js"
import userRouter from "./routes/user.routes.js"
import mockRouter from "./routes/mock.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import { addLogger } from "./utils/logger.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(addLogger);

app.get('/loggerTest', (req, res) => {
    req.logger.debug('Prueba de log nivel DEBUG');
    req.logger.http('Prueba de log nivel HTTP');
    req.logger.info('Prueba de log nivel INFO');
    req.logger.warning('Prueba de log nivel WARNING');
    req.logger.error('Prueba de log nivel ERROR');
    req.logger.fatal('Prueba de log nivel FATAL');

    res.json({ 
        status: 'success', 
        message: 'Logs ejecutados correctamente. Revisa la consola y la carpeta /logs.' 
    });
});

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/mocks', mockRouter)

app.use(errorHandler)

export default app