import { userRepository } from "../repositories/user.repository.js";

class UserService {
    async getUsers() {
        const users = await userRepository.getAll();
        return users.map(user => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
        });
    }

    async registerUser(userData) {
        userData.email = userData.email.toLowerCase();

        const existingUser = await userRepository.getByEmail(userData.email);
        if (existingUser) {
        throw new Error('El email ya se encuentra registrado');
        }

        return await userRepository.create(userData)
    }
}

export const userService = new UserService()