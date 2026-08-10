import { productRepository } from "../repositories/product.repository.js"
import { PRODUCT_STATUS } from "../constants/index.js"
import { CustomError } from "../utils/custom.error.js"
import { EErrors } from "../constants/error.constants.js"

class ProductService {
    async getAvailableProducts() {
        const allProducts = await productRepository.getAll()
        
        if (!allProducts) {
            CustomError.createError({
                name: "DatabaseError",
                message: "No se pudieron obtener los productos de la base de datos.",
                statusCode: EErrors.DATABASE_ERROR.code,
                code: EErrors.DATABASE_ERROR.type
            });
        }

        return allProducts.filter(prod => prod.stock > 0 && prod.status !== PRODUCT_STATUS.OUT_OF_STOCK);
    }

    async createProduct(productData) {
        const name = productData.name || productData.title;
        const { price, stock } = productData;

        if (!name || price === undefined || stock === undefined) {
            CustomError.createError({
                name: "InvalidParamsError",
                message: "Faltan campos obligatorios para crear el producto (name, price, stock).",
                statusCode: EErrors.INVALID_TYPES_ERROR.code,
                code: EErrors.INVALID_TYPES_ERROR.type,
                cause: `Campos recibidos: ${JSON.stringify(productData)}`
            });
        }

        if (typeof price !== 'number' || typeof stock !== 'number' || price < 0 || stock < 0) {
            CustomError.createError({
                name: "InvalidParamsError",
                message: "El precio y el stock deben ser valores numéricos mayores o iguales a cero.",
                statusCode: EErrors.INVALID_TYPES_ERROR.code,
                code: EErrors.INVALID_TYPES_ERROR.type,
                cause: `Valores recibidos: price=${price}, stock=${stock}`
            });
        }

        if (stock === 0) {
            productData.status = PRODUCT_STATUS.OUT_OF_STOCK;
        }

        return await productRepository.create({
            ...productData,
            name
        });
    }
}

export const productService = new ProductService();