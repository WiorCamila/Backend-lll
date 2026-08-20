import { UserModel } from '../models/user.model.js';

export class UserRepository {
    async create(userData) {
        return await UserModel.create(userData);
    }

    async createMany(usersData) {
        return await UserModel.insertMany(usersData);
    }

    async getByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async getAll() {
        return await UserModel.find();
    }
}

export const userRepository = new UserRepository();