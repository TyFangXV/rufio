import { Router } from "express";
import authRouter from './auth'

const router = Router();

router.use("/auth", authRouter);
router.get("/", (req, res) => res.send(200))


export default router;