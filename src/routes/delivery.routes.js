import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        res.json({ status: 'success', payload: [] });
    } catch (error) {
        next(error);
    }
});

export default router;