import { productService } from "../services/product.service.js";

class ProductController {
    async getProducts(req, res, next) {
        try {
            const products = await productService.getAvailableProducts();
            return res.status(200).json({ status: 'success', payload: products });
        } catch (error) {
            next(error)
        }
    }

    async createProduct(req, res, next) {
        try {
            const newProduct = await productService.createProduct(req.body);
            return res.status(201).json({ status: 'success', payload: newProduct });
        } catch (error) {
            next(error)
        }
    }
}

export const productController = new ProductController();