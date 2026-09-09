import { deliveryRepository } from '../repositories/delivery.repository.js'
import { CustomError } from '../utils/custom.error.js'
import { EErrors } from '../constants/error.constants.js'

class DeliveryService {
    async getAllDeliveries() {
        return await deliveryRepository.getAll()
    }

    async getDeliveryById(id) {
        const delivery = await deliveryRepository.getById(id)
        if (!delivery) {
            CustomError.createError({
                name: 'NotFoundError',
                message: `No se encontró el envío con id ${id}`,
                statusCode: EErrors.NOT_FOUND.code,
                code: EErrors.NOT_FOUND.type
            });
        }
        return delivery;
    }

    async createDelivery(deliveryData) {
        if (!deliveryData.order || !deliveryData.address) {
            CustomError.createError({
                name: 'InvalidParamsError',
                message: 'Faltan datos obligatorios para registrar la entrega.',
                statusCode: EErrors.INVALID_TYPES_ERROR.code,
                code: EErrors.INVALID_TYPES_ERROR.type
            });
        }
        return await deliveryRepository.create(deliveryData)
    }
}

export const deliveryService = new DeliveryService()