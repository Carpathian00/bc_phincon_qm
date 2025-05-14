import express from 'express';
import tryoutController from "../controllers/tryout.section.controller.js";
const router = express.Router();
// Get all tryout sections
router.get("/", tryoutController.getAllTryoutSections);
// Mass create/update courses
router.post("/mass-create", tryoutController.massCreateTryoutSections);
// Download courses (xlsx)
router.get("/download", tryoutController.downloadTryoutSections);
export default router;
