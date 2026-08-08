import { EErrors } from "../constants/error.constants.js"

export const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || EErrors.INTERNAL_SERVER_ERROR.code;
    const code = error.code || EErrors.INTERNAL_SERVER_ERROR.type;

    console.error(`❌ [Error ${statusCode}] ${error.name || 'Error'}: ${error.message}`);

    return res.status(statusCode).json({
        status: 'error',
        error: {
            name: error.name || 'UnhandledError',
            code: code,
            message: error.message || 'Ocurrió un error inesperado en el servidor.',
            ...(error.cause && { cause: error.cause })
        }
    });
};