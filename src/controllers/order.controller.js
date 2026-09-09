import { orderService } from '../services/order.service.js'

export class OrderController {
    static async getAll(req, res, next) {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json({ status: 'success', payload: orders });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { oid } = req.params;
            const order = await orderService.getOrderById(oid);
            res.status(200).json({ status: 'success', payload: order });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const newOrder = await orderService.createOrder(req.body);
            res.status(201).json({ status: 'success', payload: newOrder });
        } catch (error) {
            next(error);
        }
    }
}