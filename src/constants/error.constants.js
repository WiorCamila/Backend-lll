export const EErrors = {
    INVALID_TYPES_ERROR: { code: 400, type: 1 },
    DATABASE_ERROR: { code: 500, type: 2 },
    ROUTING_ERROR: { code: 404, type: 3 },
    FILE_UPLOAD_ERROR: { code: 400, type: 4 },
    NOT_FOUND: { code: 404, type: 5 }
};

export const ERROR_MESSAGES = {
    FILE_REQUIRED: 'El archivo es obligatorio.',
    INVALID_FILE_TYPE: 'Tipo de archivo no permitido.',
    INVALID_DOC_TYPE: 'El tipo de documento proporcionado no es válido.',
    USER_NOT_FOUND: 'El usuario especificado no existe.',
    ORDER_NOT_FOUND: 'La orden/entrega especificada no existe.'
};