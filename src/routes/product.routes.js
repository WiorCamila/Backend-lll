// src/routes/product.router.js
import { Router } from 'express'
import { productController } from "../controllers/product.controller.js"

const router = Router()

router.get('/', productController.getProducts)
router.post('/', productController.createProduct)

export default router;