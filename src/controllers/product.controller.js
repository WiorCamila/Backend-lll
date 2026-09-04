import { productService } from "../services/product.service.js"

class ProductController {
    async getProducts(req, res, next) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;

            const products = await productService.getAvailableProducts({ limit, page });
            return res.status(200).json({ status: 'success', payload: products });
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req, res, next) {
        try {
            const newProduct = await productService.createProduct(req.body);
            return res.status(201).json({ status: 'success', payload: newProduct });
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController();