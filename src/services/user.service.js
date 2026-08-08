import { userRepository } from "../repositories/user.repository.js";
import { CustomError } from "../utils/custom.error.js";
import { EErrors } from "../constants/error.constants.js";

class UserService {
    async getUsers() {
        const users = await userRepository.getAll();
        return users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });
    }

    async registerUser(userData) {
        if (!userData.email) {
            CustomError.createError({
                name: "InvalidParamsError",
                message: "El campo email es obligatorio.",
                statusCode: EErrors.INVALID_TYPES_ERROR.code,
                code: EErrors.INVALID_TYPES_ERROR.type
            });
        }

        userData.email = userData.email.toLowerCase();

        const existingUser = await userRepository.getByEmail(userData.email);
        if (existingUser) {
            CustomError.createError({
                name: "UserAlreadyExistsError",
                message: "El email ya se encuentra registrado.",
                statusCode: EErrors.INVALID_TYPES_ERROR.code,
                code: EErrors.INVALID_TYPES_ERROR.type,
                cause: `Email ingresado: ${userData.email}`
            });
        }

        return await userRepository.create(userData);
    }
}

export const userService = new UserService();