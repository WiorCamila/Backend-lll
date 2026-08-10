import { logger } from "../utils/logger.js"

export const errorHandler = (error, req, res, next) => {
    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        logger.warning(`[${error.name}] ${error.message} - Causa: ${error.cause || 'N/A'}`);
    } else {

        logger.error(`[${error.name || 'UnhandledError'}] ${error.message} - Stack: ${error.stack}`);
    }

    return res.status(error.statusCode || 500).json({
        status: 'error',
        error: {
            name: error.name || 'InternalServerError',
            code: error.code || 'INTERNAL_SERVER_ERROR',
            message: error.message || 'Ocurrió un error inesperado en el servidor.'
        }
    });
};