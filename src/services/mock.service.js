import { faker } from '@faker-js/faker';
import { userModel } from '../models/user.model.js';

export const generateAndSaveDataService = async (usersCount = 5, productsCount = 5) => {
    const users = [];
    for (let i = 0; i < usersCount; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: '123',
            role: 'USER',
            documents: []
        });
    }

    const insertedUsers = await userModel.insertMany(users);

    return { users: insertedUsers };
};

export default {
    generateAndSaveDataService
};