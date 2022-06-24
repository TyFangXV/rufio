import { Router } from "express";
import githubRouter from './auth/github'
import userRouter from "./auth/user";
const router = Router();


router.use("/github", githubRouter);
router.use("/user", userRouter)

export default router;