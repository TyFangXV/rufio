import { Router } from "express";
import githubRouter from './github'
import userRouter from "./user";
const router = Router();


router.use("/github", githubRouter);
router.use("/user", userRouter);
router.get("/", )

export default router;