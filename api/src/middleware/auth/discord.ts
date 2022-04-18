import { Request, Response, Router } from 'express';
import FormData from 'form-data';
import * as dotenv from 'dotenv';
import axios from 'axios';
import passport from 'passport';

const router = Router();
dotenv.config();
const redirect = encodeURIComponent(`${process.env.DISCORD_REDIRECT_URL}`);

const verifyURL = async(url:string) => {
    try {
        const {status} = await axios.get(url);
        if(status === 200) return true;
        return false        
    } catch (error) {
        return false;
    }
;
}


router.get("/login", (req:Request, res:Response) => {
    const redirectURL = req.query.redirectURL;
    if(!redirectURL) {
        res.status(400).send("Redirect URL is required");
        return;
    }

    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=identify&state=${encodeURIComponent(redirectURL as string)}`);
})

router.get('/callback', passport.authenticate('discord',{failureRedirect: '/failed', session : false }), async(req, res) => {
    const redirectURL = req.query.state;

    
    if(!redirectURL) {
        res.status(400).send("failed");
    } else {
        const urlStatus = await verifyURL(redirectURL as string)
        if(urlStatus) 
        {
            res.redirect(redirectURL as string);
        }else{
            res.status(400).send("failed to verify url, please check your url");
        }
    }

});


router.get("/user", async(req, res) => {
    const accessToken = req.query.access_token;
    try {
        const {data:response} = await axios.get(`https://discordapp.com/api/users/@me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.send(response);
    } catch (error) {
        res.send(error);
    }
})

router.post
export default router;
