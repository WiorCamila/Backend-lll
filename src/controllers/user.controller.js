import { userService } from "../services/user.service.js";

class UserController {
    async getUsers(req, res) {
        try {
        const users = await userService.getUsers();
        return res.status(200).json({ status: 'success', payload: users })
        } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
        }
    }

    async createUser(req, res) {
        try {
        const newUser = await userService.registerUser(req.body)
        return res.status(201).json({ status: 'success', payload: newUser })
        } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message })
        }
    }
}

export const userController = new UserController()