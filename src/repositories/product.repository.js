import { ProductModel } from "../models/product.model.js"

class ProductRepository {
    async getAll() {
        return await ProductModel.find()
    }

    async create(productData) {
        return await ProductModel.create(productData)
    }
}

export const productRepository = new ProductRepository()