import { orderRepository } from "../repositories/order.repository.js"
import { CustomError } from "../utils/custom.error.js"
import { EErrors } from "../constants/error.constants.js"

class OrderService {
    async getAllOrders() {
        return await orderRepository.getAll();
    }

    async getOrderById(id) {
        const order = await orderRepository.getById(id);
        if (!order) {
            CustomError.createError({
                name: 'NotFoundError',
                message: `No se encontró la orden con id ${id}`,
                statusCode: EErrors.NOT_FOUND.code,
                code: EErrors.NOT_FOUND.type
            });
        }
        return order;
    }

    async createOrder(orderData) {
        if (!orderData.user || !orderData.products || orderData.products.length === 0) {
            CustomError.createError({
                name: 'InvalidParamsError',
                message: 'La orden requiere un usuario y al menos un producto.',
                statusCode: EErrors.INVALID_TYPES_ERROR.code,
                code: EErrors.INVALID_TYPES_ERROR.type
            });
        }
        return await orderRepository.create(orderData);
    }
}

export const orderService = new OrderService();