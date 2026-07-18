import express from 'express';
import { envConfig } from './config/env.config.js';
import productRouter from './routes/product.routes.js'
import userRouter from './routes/user.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

export default app