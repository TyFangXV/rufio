import {Router} from "express";
import authHandler from '../auth';


const router = Router();
router.use("/auth", authHandler);

export default router;