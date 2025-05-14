import express from 'express';
import { userController} from "../controllers/user.controller.js";

const router = express.Router();

// Get all users
router.get("/", userController.getAllUsers)

// Mass create/update users
router.post("/mass-create", userController.massCreateUsers)

// Download users (xlsx)
router.get("/download", userController.downloadUsers)

export default router;