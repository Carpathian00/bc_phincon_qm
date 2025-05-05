import express from 'express';
import categories from '../controllers/category.controller.js';

const router = express.Router();

router.get("/", categories.findAll);
router.post("/insert", categories.insert);

export default router;

