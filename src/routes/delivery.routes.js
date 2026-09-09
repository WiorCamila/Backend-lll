import { Router } from 'express';
import { DeliveryController } from "../controllers/delivery.controller.js"

const router = Router();

router.get('/', DeliveryController.getAll)
router.get('/:did', DeliveryController.getById)
router.post('/', DeliveryController.create)

export default router;