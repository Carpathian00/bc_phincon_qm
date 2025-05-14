import express from 'express';
import courseControllers from "../controllers/course.controller.js";

const router = express.Router();

// Get all courses
router.get("/", courseControllers.getAllCourses);

// Mass create/update courses
router.post("/mass-create", courseControllers.massCreateCourses)

// Download courses (xlsx)
router.get("/download", courseControllers.downloadCourses)

export default router;

