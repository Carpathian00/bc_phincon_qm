import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

// Example of how to create protected routes
const router = express.Router();

// Protected routes for all authenticated users
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({
    message: "This is a protected route",
    user: req.user
  });
});

// Protected routes only for admin users
router.get('/admin-dashboard', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({
    message: "This is an admin-only route",
    user: req.user
  });
});

export default router;