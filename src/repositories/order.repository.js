import { OrderModel } from '../models/order.model.js'

export class OrderRepository {
    async getAll() {
        return await OrderModel.find();
    }

    async getById(id) {
        return await OrderModel.findById(id);
    }

    async create(orderData) {
        return await OrderModel.create(orderData);
    }

    async createMany(ordersData) {
        return await OrderModel.insertMany(ordersData);
    }
}

export const orderRepository = new OrderRepository();