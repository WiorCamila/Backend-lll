import { UserModel } from '../models/user.model.js';

export class UserRepository {
    async createMany(usersData) {
        return await UserModel.insertMany(usersData);
    }

    async getAll() {
        return await UserModel.find();
    }

    async findAll() {
        return await UserModel.find();
    }
}

export const userRepository = new UserRepository();