import { deliveryService } from '../services/delivery.service.js'

export class DeliveryController {
    static async getAll(req, res, next) {
        try {
            const deliveries = await deliveryService.getAllDeliveries();
            res.status(200).json({ status: 'success', payload: deliveries });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { did } = req.params;
            const delivery = await deliveryService.getDeliveryById(did);
            res.status(200).json({ status: 'success', payload: delivery });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const newDelivery = await deliveryService.createDelivery(req.body);
            res.status(201).json({ status: 'success', payload: newDelivery });
        } catch (error) {
            next(error);
        }
    }
}