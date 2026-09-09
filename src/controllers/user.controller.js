import { userService } from "../services/user.service.js"
import { CustomError } from "../utils/custom.error.js"
import { EErrors } from "../constants/error.constants.js"

class UserController {
    async getUsers(req, res, next) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;

            const users = await userService.getUsers({ limit, page })
            return res.status(200).json({ status: 'success', payload: users })
        } catch (error) {
            next(error);
        }
    }

    async createUser(req, res, next) {
        try {
            const newUser = await userService.registerUser(req.body);
            return res.status(201).json({ status: 'success', payload: newUser })
        } catch (error) {
            next(error);
        }
    }

    async uploadDocument(req, res, next) {
        try {
            const { uid } = req.params;
            const { docType } = req.body;
            const file = req.file;

            if (!file) {
                CustomError.createError({
                    name: "FileRequiredError",
                    message: "El archivo es obligatorio.",
                    statusCode: EErrors.INVALID_TYPES_ERROR.code,
                    code: EErrors.INVALID_TYPES_ERROR.type
                });
            }

            const validDocTypes = ['identification', 'address_proof', 'account_statement', 'license'];
            if (!docType || !validDocTypes.includes(docType)) {
                CustomError.createError({
                    name: "InvalidDocTypeError",
                    message: "Tipo de documento inválido o no proporcionado.",
                    statusCode: EErrors.INVALID_TYPES_ERROR.code,
                    code: EErrors.INVALID_TYPES_ERROR.type
                });
            }

            const documentMetadata = {
                name: file.originalname,
                originalName: file.originalname,
                filename: file.filename,
                reference: file.path,
                docType,
                mimetype: file.mimetype,
                size: file.size,
                uploadedAt: new Date()
            };

            const updatedUser = await userService.addDocument(uid, documentMetadata);

            req.logger?.info(`Documento '${docType}' guardado para el usuario ${uid}`);

            return res.status(200).json({
                status: 'success',
                message: 'Documento subido y metadatos registrados correctamente',
                payload: documentMetadata
            });
        } catch (error) {
            req.logger?.error(`Error en uploadDocument: ${error.message}`);
            next(error);
        }
    }
}

export const userController = new UserController()