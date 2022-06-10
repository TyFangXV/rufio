import { Router } from "express";
import githubRouter from './auth/github'

const router = Router();


router.use("/github", githubRouter);

export default router;