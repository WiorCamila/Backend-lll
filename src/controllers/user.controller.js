import { userService } from "../services/user.service.js"

class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json({ status: 'success', payload: users })
        } catch (error) {
            next(error);
        }
    }

    async createUser(req, res, next) {
        try {
            const newUser = await userService.registerUser(req.body)
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
                return res.status(400).json({ status: 'error', error: 'El archivo es obligatorio.' })
            }

            const validDocTypes = ['identification', 'address_proof', 'account_statement', 'license'];
            if (!docType || !validDocTypes.includes(docType)) {
                return res.status(400).json({ status: 'error', error: 'Tipo de documento inválido o no proporcionado.' })
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
            
            if (!updatedUser) {
                return res.status(404).json({ status: 'error', error: 'Usuario no encontrado.' })
            }

            req.logger?.info(`Documento '${docType}' guardado en MongoDB para el usuario ${uid}`)

            return res.status(200).json({
                status: 'success',
                message: 'Documento subido y metadatos registrados correctamente',
                payload: documentMetadata
            });
        } catch (error) {
            req.logger?.error(`Error en uploadDocument: ${error.message}`)
            next(error)
        }
    }
}

export const userController = new UserController()