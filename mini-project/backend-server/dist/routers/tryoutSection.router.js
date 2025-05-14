import express from 'express';
import tryoutController from "../controllers/tryoutSection.controller.js";
const router = express.Router();
router.get("/", tryoutController.getAllTryoutSections);
export default router;
