import { 
    generateMockUsers, 
    generateMockDeliveriesStaff, 
    generateMockOrders, 
    generateMockDeliveries 
} from "../utils/mock.util.js";

import { userRepository } from "../repositories/user.repository.js";
import { orderRepository } from "../repositories/order.repository.js";
import { deliveryRepository } from "../repositories/delivery.repository.js";

export class MockService {

    static async getMockData(numUsers = 5, numOrders = 10) {
        const users = generateMockUsers(numUsers);
        const deliveriesStaff = generateMockDeliveriesStaff(2);
        const orders = generateMockOrders([], numOrders);
        const deliveries = generateMockDeliveries(orders.map(o => o.user));

        return {
            users,
            deliveriesStaff,
            orders,
            deliveries
        };
    }

    static async generateAndSaveData({ usersCount = 5, ordersCount = 10 }) {

        const mockUsers = generateMockUsers(usersCount);
        const mockStaff = generateMockDeliveriesStaff(2);
        
        const createdUsers = await userRepository.createMany(mockUsers);
        const createdStaff = await userRepository.createMany(mockStaff);

        const userIds = createdUsers.map(u => u._id);
        const staffIds = createdStaff.map(s => s._id);

        const mockOrders = generateMockOrders(userIds, ordersCount);
        const createdOrders = await orderRepository.createMany(mockOrders);

        const orderIds = createdOrders.map(o => o._id);

        const mockDeliveries = generateMockDeliveries(orderIds, staffIds);
        const createdDeliveries = await deliveryRepository.createMany(mockDeliveries);

        return {
            message: 'Carga de datos realizada con éxito',
            summary: {
                usersGenerated: createdUsers.length + createdStaff.length,
                ordersGenerated: createdOrders.length,
                deliveriesGenerated: createdDeliveries.length
            }
        };
    }
}