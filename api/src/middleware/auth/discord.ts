import { Router } from "express";
import * as dotenv from 'dotenv'
import axios from "axios";
const router = Router();

dotenv.config();


const redirect = encodeURIComponent(`${process.env.DISCORD_REDIRECT_URL}`);

router.get("/login", (req, res) => {
    res.redirect(
        `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=identify`
    );
})


router.get("/callback", async (req, res) => {
    const code = req.query.code;

    if (code) {
        console.log(code.toString());
        
        try {
            const reqData = {
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: "authorization_code",
                code : code.toString(),
                redirect_uri: redirect

            }
            const {data} = await axios.post(`https://discordapp.com/api/oauth2/token?client_id=${process.env.DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`, reqData, {
                headers : {
                    Authorization : `Basic ${Buffer.from(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`).toString('base64')}`
                }
            })

            res.send(data);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    } else {
        res.send("Error");
    }
})

export default router;