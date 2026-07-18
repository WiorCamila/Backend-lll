import { UserModel } from "../models/user.model.js"

class UserRepository {
    async getAll() {
        return await UserModel.find()
    }

    async create(userData) {
        return await UserModel.create(userData)
    }

    async getByEmail(email) {
        return await UserModel.findOne({ email })
    }
}

export const userRepository = new UserRepository()