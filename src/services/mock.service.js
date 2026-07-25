import { 
    generateMockUsers, 
    generateMockDeliveriesStaff, 
    generateMockOrders, 
    generateMockDeliveries 
} from "../utils/mock.util.js"

import { fakerES as faker } from '@faker-js/faker'


export class MockService {
    static async getMockData(numUsers = 5, numOrders = 10) {
        const users = generateMockUsers(numUsers);
        const deliveriesStaff = generateMockDeliveriesStaff(2);
        const orders = generateMockOrders([], numOrders);
        
        const fakeOrderIds = orders.map(() => faker.database.mongodbObjectId());
        const deliveries = generateMockDeliveries(fakeOrderIds);

        return {
        users,
        deliveriesStaff,
        orders,
        deliveries
        }
    }

  // POST= Genera de prueba en MongoDB
    static async generateAndSaveData({ usersCount = 5, ordersCount = 10 }) {
    // 1. Generar usuarios y repartidores simulados
    const mockUsers = generateMockUsers(usersCount)
    const mockStaff = generateMockDeliveriesStaff(2)

    const allUsersToCreate = [...mockUsers, ...mockStaff]

    return {
        message: 'Carga de datos realizada con éxito',
        summary: {
            usersGenerated: allUsersToCreate.length,
            ordersGenerated: ordersCount,
            deliveriesGenerated: ordersCount
        }
        };
    }
}