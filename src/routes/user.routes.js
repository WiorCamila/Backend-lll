import { Router } from 'express'
import { userController } from "../controllers/user.controller.js"
import { uploader } from "../middlewares/uploader.middleware.js"

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.post('/:uid/documents', uploader.single('document'), userController.uploadDocument)

export default router;