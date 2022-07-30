import { Router } from "express";
import EventCreateRoute from "./create";

const router = Router();


router.use("/create", EventCreateRoute);

export default router;
