import { Router } from "express"
import { MockController } from "../controllers/mock.controller.js"

const router = Router();

router.get('/mockingdata', MockController.getMockingData);

router.post('/generateData', MockController.generateData);

export default router