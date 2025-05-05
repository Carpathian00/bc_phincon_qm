import express from 'express';
import productsRouter from './products.router.js';
import categoriesRouter from './categories.router.js';

const appRouter = express.Router();

appRouter.use('/api/products', productsRouter);
appRouter.use('/api/categories', categoriesRouter);

export default appRouter;