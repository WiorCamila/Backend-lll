import { userService } from "../services/user.service.js";

class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json({ status: 'success', payload: users });
        } catch (error) {
            next(error); // Pasa el error al middleware global
        }
    }

    async createUser(req, res, next) {
        try {
            const newUser = await userService.registerUser(req.body);
            return res.status(201).json({ status: 'success', payload: newUser });
        } catch (error) {
            next(error); // Pasa el error al middleware global
        }
    }
}

export const userController = new UserController();