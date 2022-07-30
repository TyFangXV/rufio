import { Router } from "express";

const route = Router();

route.post("/", (req, res) => {
    const { token, accountID, event } = req.body;

    if (!token || !accountID || !event)
    {
        res.status(400).json({
            error: "Missing required fields"
        })
    }

})