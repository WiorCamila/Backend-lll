import { deliveryModel } from '../models/delivery.model.js';

export class DeliveryRepository {
    async createMany(deliveriesData) {
        return await deliveryModel.insertMany(deliveriesData);
    }
}

export const deliveryRepository = new DeliveryRepository();