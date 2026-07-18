import { productService } from "../services/product.service.js"

class ProductController {
    async getProducts(req, res) {
        try {
        const products = await productService.getAvailableProducts()
        return res.status(200).json({ status: 'success', payload: products })
        } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
        }
    }

    async createProduct(req, res) {
        try {
        const newProduct = await productService.createProduct(req.body)
        return res.status(201).json({ status: 'success', payload: newProduct })
        } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message })
        }
    }
}

export const productController = new ProductController()