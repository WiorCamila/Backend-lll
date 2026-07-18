import { productRepository } from "../repositories/product.repository.js"
import { PRODUCT_STATUS } from "../constants/index.js"

class ProductService {
    async getAvailableProducts() {
        const allProducts = await productRepository.getAll()
        return allProducts.filter(prod => prod.stock > 0 && prod.status !== PRODUCT_STATUS.OUT_OF_STOCK)
    }

    async createProduct(productData) {
        if (productData.stock === 0) {
        productData.status = PRODUCT_STATUS.OUT_OF_STOCK;
        }
        return await productRepository.create(productData)
    }
}

export const productService = new ProductService()