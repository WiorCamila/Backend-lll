import { deliveryModel } from '../models/delivery.model.js'

export class DeliveryRepository {
    async getAll() {
        return await deliveryModel.find();
    }

    async getById(id) {
        return await deliveryModel.findById(id);
    }

    async create(deliveryData) {
        return await deliveryModel.create(deliveryData);
    }

    async createMany(deliveriesData) {
        return await deliveryModel.insertMany(deliveriesData);
    }
}

export const deliveryRepository = new DeliveryRepository();