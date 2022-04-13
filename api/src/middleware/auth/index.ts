import { Router } from "express";
import discordRouter from './discord'
const router = Router();

router.use("/discord", discordRouter);


export default router;