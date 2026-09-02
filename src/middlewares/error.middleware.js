import multer from 'multer'

const errorHandler = (error, req, res, next) => {
    req.logger?.error(`[${error.name || 'Error'}] ${error.message} - Stack: ${error.stack}`)

    if (error instanceof multer.MulterError) {
        let message = error.message;

        if (error.code === 'LIMIT_FILE_SIZE') {
            message = 'El archivo supera el tamaño máximo permitido.';
        } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            message = 'Campo de archivo inesperado o no permitido.';
        }

        return res.status(400).json({ status: 'error', error: message, code: error.code })
    }

    if (
        error.name === 'InvalidParamsError' || 
        error.name === 'ValidationError' ||
        error.message?.includes('obligatorio')
    ) {
        return res.status(400).json({ status: 'error', error: error.message })
    }

    if (error.name === 'UserNotFoundError' || error.statusCode === 404) {
        return res.status(404).json({ status: 'error', error: error.message })
    }

    res.status(500).json({ status: 'error', error: error.message || 'Unhandled error' })
};

export { errorHandler }
export default errorHandler