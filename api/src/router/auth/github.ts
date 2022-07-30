
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
            process.env.GITHUB_CLIENT_SECRET as string,
        );

        try {
            const { status, data } = await githubAuth.getAccessToken(code as string);
            if (status === "success") {
                const userData = await githubAuth.callback(data.access_token);
                const authSession = await githubAuth.generateTokenSession(userData.data.user._id);
                
                return res.status(200).cookie("auth", authSession).send(userData);
            }
        } catch (error) {
            return res.status(500).send(error);
        }
        
    }
})


export default router;