import express from 'express';
import auth from '../controllers/auth.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', auth.register);
router.post('/login', auth.login);

// Protected routes
router.get('/me', verifyToken, auth.getCurrentUser);

export default router;
