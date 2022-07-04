
import { Router } from "express";
import { config } from "dotenv";
import GithubAuth from "../../utils/auth/github";

config();
const router = Router();

router.post("/cb", async (req, res) => {

    const { code } = req.query;

    if (!code) {
        return res.status(400).send("No code provided");
    }else{
        const githubAuth = new GithubAuth(
            process.env.GITHUB_CLIENT_ID as string,
            process.env.GITHUB_CLIENT_SECRET as string
        );

        const {access_token} = await (await githubAuth.getAccessToken(code as string)).data;

        const userData = await githubAuth.login(access_token);
        
        res.status(200).send(userData);
    }
})

export default router;