const errorHandler = (error, req, res, next) => {
    req.logger?.error(`[${error.name || 'Error'}] ${error.message} - Stack: ${error.stack}`);

    if (
        error.name === 'InvalidParamsError' || 
        error.name === 'ValidationError' ||
        error.message?.includes('obligatorio')
    ) {
        return res.status(400).send({ status: 'error', error: error.message });
    }

    res.status(500).send({ status: 'error', error: error.message || 'Unhandled error' });
};

export { errorHandler };
export default errorHandler;