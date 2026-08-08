export class CustomError extends Error {
    constructor({ name = "Error", cause, message, statusCode = 500, code = "INTERNAL_SERVER_ERROR" }) {
        super(message);
        this.name = name;
        this.cause = cause;
        this.statusCode = statusCode;
        this.code = code;
    }

    static createError({ name = "CustomError", cause, message, statusCode = 500, code = "INTERNAL_SERVER_ERROR" }) {
        const error = new CustomError({ name, cause, message, statusCode, code });
        throw error;
    }
}