import express from 'express';
import userRouter from "./user.router.js";
import tryoutSectionRouter from "./tryout_section.router.js";
import courseRouter from "./course.router.js";
const appRouter = express.Router();
appRouter.use("/api/users", userRouter);
appRouter.use("/api/courses", courseRouter);
appRouter.use("/api/tryout-sections", tryoutSectionRouter);
export default appRouter;
