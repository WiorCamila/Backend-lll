import { OrderModel } from '../models/order.model.js';

export class OrderRepository {
    async createMany(ordersData) {
        return await OrderModel.insertMany(ordersData);
    }
}

export const orderRepository = new OrderRepository();