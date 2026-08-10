import { generateMockUsers, generateMockDeliveriesStaff, generateMockOrders, generateMockDeliveries } from "../utils/mock.util.js";
import { fakerES as faker } from '@faker-js/faker';
import { CustomError } from "../utils/custom.error.js";
import { EErrors } from "../constants/error.constants.js";
import { userRepository } from "../repositories/user.repository.js"

export const getMockDataService = (usersCount = 5, ordersCount = 10) => {
    const numUsers = Number(usersCount);
    const numOrders = Number(ordersCount);

    if (isNaN(numUsers) || isNaN(numOrders)) {
        CustomError.createError({
            name: "InvalidMockParamsError",
            message: "Los parámetros de cantidad deben ser valores numéricos válidos.",
            statusCode: EErrors.INVALID_TYPES_ERROR.code,
            code: EErrors.INVALID_TYPES_ERROR.type,
            cause: `Se recibió usersCount: ${usersCount}, ordersCount: ${ordersCount}`
        });
    }

    if (numUsers < 0 || numOrders < 0) {
        CustomError.createError({
            name: "InvalidMockParamsError",
            message: "Las cantidades para generar mocks no pueden ser valores negativos.",
            statusCode: EErrors.INVALID_TYPES_ERROR.code,
            code: EErrors.INVALID_TYPES_ERROR.type,
            cause: `Se recibió usersCount: ${numUsers}, ordersCount: ${numOrders}`
        });
    }

    const users = generateMockUsers(numUsers);
    const usersWithIds = users.map(u => ({ _id: faker.database.mongodbObjectId(), ...u }));

    const deliveryStaff = generateMockDeliveriesStaff(3);
    const staffWithIds = deliveryStaff.map(s => ({ _id: faker.database.mongodbObjectId(), ...s }));

    const userIds = usersWithIds.map(u => u._id);
    const orders = generateMockOrders(userIds, numOrders);
    const ordersWithIds = orders.map(o => ({ _id: faker.database.mongodbObjectId(), ...o }));

    const orderIds = ordersWithIds.map(o => o._id);
    const deliveryStaffIds = staffWithIds.map(s => s._id);
    const deliveries = generateMockDeliveries(orderIds, deliveryStaffIds);

    return {
        users: usersWithIds,
        deliveryStaff: staffWithIds,
        orders: ordersWithIds,
        deliveries
    };
};

export const generateAndSaveDataService = async ({ usersCount = 5, ordersCount = 10 }) => {
    const mockData = getMockDataService(usersCount, ordersCount);

    try {
        const insertedUsers = await userRepository.createMany(mockData.users);
        
        return {
            insertedUsersCount: insertedUsers.length,
            users: insertedUsers
        };
    } catch (error) {
        CustomError.createError({
            name: "DatabaseError",
            message: "Error al guardar la información simulada en la base de datos.",
            statusCode: EErrors.DATABASE_ERROR.code,
            code: EErrors.DATABASE_ERROR.type,
            cause: error.message
        });
    }
};