import express from 'express';
import productsRouter from './products.router.js';
import categoriesRouter from './categories.router.js';
import authRouter from './auth.router.js';

const appRouter = express.Router();

appRouter.use('/api/products', productsRouter);
appRouter.use('/api/categories', categoriesRouter);
appRouter.use('/api/auth', authRouter);

export default appRouter;